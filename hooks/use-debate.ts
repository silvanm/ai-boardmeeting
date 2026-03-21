"use client";

import { useState, useCallback, useRef } from "react";
import {
  DebateConfig,
  DebateState,
  DebateMessage,
  IntensityResult,
  EmotionalState,
  DebateStatus,
} from "@/lib/types";
import { getFallbackEmoji } from "@/lib/emoji-map";

const initialState: DebateState = {
  status: "idle",
  currentRound: 0,
  messages: [],
  rounds: [],
  intensities: [],
  emotions: [],
  emojis: {},
  lastSpeakerId: null,
};

export function useDebate(config: DebateConfig) {
  const [state, setState] = useState<DebateState>(initialState);
  const [streamingText, setStreamingText] = useState("");
  const [streamingSpeaker, setStreamingSpeaker] = useState<string | null>(null);
  const pausedRef = useRef(false);
  const abortRef = useRef(false);

  const setStatus = (status: DebateStatus) =>
    setState((s) => ({ ...s, status }));

  const runRound = useCallback(
    async (
      roundNum: number,
      messages: DebateMessage[],
      lastSpeakerId: string | null,
      emotions: EmotionalState[]
    ): Promise<{
      messages: DebateMessage[];
      lastSpeakerId: string | null;
      emotions: EmotionalState[];
      ended: boolean;
    }> => {
      // 1. Get intensities (includes emotional state)
      const intResponse = await fetch("/api/intensities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, history: messages, lastSpeakerId, emotions, currentRound: roundNum }),
      });

      if (!intResponse.ok) throw new Error("Failed to get intensities");
      const intensities: IntensityResult[] = await intResponse.json();

      // Extract updated emotions from intensity results
      const updatedEmotions: EmotionalState[] = intensities.map((i) => ({
        agentId: i.agentId,
        mood: i.mood,
        stances: i.stances,
      }));

      // Set fallback emojis immediately from mood keywords
      const fallbackEmojis: Record<string, string> = {};
      for (const i of intensities) {
        fallbackEmojis[i.agentId] = getFallbackEmoji(i.mood);
      }
      setState((s) => ({
        ...s,
        intensities,
        emotions: updatedEmotions,
        emojis: { ...s.emojis, ...fallbackEmojis },
        currentRound: roundNum,
      }));

      // Every 3 rounds, fire async AI emoji selection (non-blocking)
      if (roundNum === 1 || roundNum % 3 === 0) {
        fetch("/api/emoji", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agents: intensities.map((i) => {
              const a = config.agents.find((a) => a.id === i.agentId);
              return { id: i.agentId, name: a?.name, mood: i.mood, role: a?.role };
            }),
          }),
        })
          .then((res) => res.json())
          .then((results: { id: string; codepoint: string }[]) => {
            const aiEmojis: Record<string, string> = {};
            for (const r of results) {
              if (r.id && r.codepoint) aiEmojis[r.id] = r.codepoint;
            }
            setState((s) => ({ ...s, emojis: { ...s.emojis, ...aiEmojis } }));
          })
          .catch(() => {}); // silently ignore — fallback emojis are already set
      }

      // 2. Check silence threshold
      if (intensities.every((i) => i.effectiveScore < config.silenceThreshold)) {
        return { messages, lastSpeakerId, emotions: updatedEmotions, ended: true };
      }

      // 3. Select speaker (highest effective score, tie-break: longest silence)
      const speaker = selectSpeaker(intensities, messages, config);
      if (!speaker) return { messages, lastSpeakerId, emotions: updatedEmotions, ended: true };

      const agentDef = config.agents.find((a) => a.id === speaker.agentId)!;
      setStreamingSpeaker(agentDef.id);
      setStreamingText("");

      // 4. Stream statement
      const stmtResponse = await fetch("/api/statement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config,
          history: messages,
          speaker: agentDef,
          intensities,
          emotions: updatedEmotions,
          currentRound: roundNum,
        }),
      });

      if (!stmtResponse.ok) throw new Error("Failed to get statement");
      if (!stmtResponse.body) throw new Error("No response body");

      let fullText = "";
      const reader = stmtResponse.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              fullText += parsed.text;
              setStreamingText(fullText);
            }
          } catch {
            // skip
          }
        }
      }

      setStreamingSpeaker(null);
      setStreamingText("");

      const newMessage: DebateMessage = {
        id: `msg-${roundNum}-${agentDef.id}`,
        round: roundNum,
        agentId: agentDef.id,
        agentName: agentDef.name,
        agentRole: agentDef.role,
        agentColor: agentDef.color,
        emojiCodepoint: fallbackEmojis[agentDef.id] || "",
        content: fullText,
        timestamp: Date.now(),
      };

      const updatedMessages = [...messages, newMessage];
      setState((s) => ({
        ...s,
        messages: updatedMessages,
        rounds: [
          ...s.rounds,
          { round: roundNum, intensities, speakerId: agentDef.id, message: newMessage },
        ],
        lastSpeakerId: agentDef.id,
      }));

      return { messages: updatedMessages, lastSpeakerId: agentDef.id, emotions: updatedEmotions, ended: false };
    },
    [config]
  );

  const start = useCallback(async () => {
    setState({ ...initialState, status: "running" });
    pausedRef.current = false;
    abortRef.current = false;

    let messages: DebateMessage[] = [];
    let lastSpeakerId: string | null = null;
    let emotions: EmotionalState[] = [];

    const hardLimit = Math.ceil(config.maxRounds * 1.5);
    for (let round = 1; round <= hardLimit; round++) {
      if (abortRef.current) break;

      // Wait while paused
      while (pausedRef.current && !abortRef.current) {
        await new Promise((r) => setTimeout(r, 200));
      }
      if (abortRef.current) break;

      try {
        const result = await runRound(round, messages, lastSpeakerId, emotions);
        messages = result.messages;
        lastSpeakerId = result.lastSpeakerId;
        emotions = result.emotions;
        if (result.ended) break;
      } catch (error) {
        console.error(`Round ${round} error:`, error);
        break;
      }
    }

    setStatus("ended");
  }, [config, runRound]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
    setStatus("running");
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    setStatus("ended");
  }, []);

  return { state, streamingText, streamingSpeaker, start, pause, resume, stop };
}

function selectSpeaker(
  intensities: IntensityResult[],
  messages: DebateMessage[],
  config: DebateConfig
): IntensityResult | null {
  if (intensities.length === 0) return null;

  const maxScore = intensities[0].effectiveScore;
  if (maxScore < config.silenceThreshold) return null;

  const tied = intensities.filter((i) => i.effectiveScore === maxScore);
  if (tied.length === 1) return tied[0];

  // Tie-break: who has been silent longest
  return tied.reduce((best, current) => {
    const bestLast = findLastSpoke(best.agentId, messages);
    const currentLast = findLastSpoke(current.agentId, messages);
    return currentLast < bestLast ? current : best;
  });
}

function findLastSpoke(agentId: string, messages: DebateMessage[]): number {
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].agentId === agentId) return i;
  }
  return -1;
}
