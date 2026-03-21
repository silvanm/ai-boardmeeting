import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { AgentStance, DebateConfig, DebateMessage, EmotionalState, IntensityResult } from "@/lib/types";
import { buildIntensityPrompt } from "@/lib/prompts";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { config, history, lastSpeakerId, emotions, currentRound } = (await req.json()) as {
      config: DebateConfig;
      history: DebateMessage[];
      lastSpeakerId: string | null;
      emotions: EmotionalState[];
      currentRound: number;
    };

    const results = await Promise.all(
      config.agents.map(async (agent): Promise<IntensityResult> => {
        const { system, user } = buildIntensityPrompt(agent, config, history, emotions || [], currentRound || 1);

        const response = await client.messages.create({
          model: config.model,
          max_tokens: 300,
          temperature: 0.7,
          system: [
            {
              type: "text",
              text: system,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: user }],
        });

        const text =
          response.content[0].type === "text" ? response.content[0].text : "";

        let score = 5;
        let reasoning = "";
        let mood = "neutral";
        let stances: AgentStance[] = [];

        try {
          const parsed = JSON.parse(text);
          score = parsed.score;
          reasoning = parsed.reasoning;
          mood = parsed.mood || "neutral";
          stances = (parsed.stances || []).map((s: { towards: string; feeling: string }) => ({
            towards: s.towards,
            feeling: s.feeling,
          }));
        } catch {
          // Regex fallback
          const scoreMatch = text.match(/"score"\s*:\s*(\d+)/);
          const reasonMatch = text.match(/"reasoning"\s*:\s*"([^"]+)"/);
          const moodMatch = text.match(/"mood"\s*:\s*"([^"]+)"/);
          if (scoreMatch) score = parseInt(scoreMatch[1], 10);
          if (reasonMatch) reasoning = reasonMatch[1];
          if (moodMatch) mood = moodMatch[1];
        }

        score = Math.max(1, Math.min(10, score));
        const penalty = agent.id === lastSpeakerId ? config.decayPenalty : 0;
        const effectiveScore = Math.max(0, score - penalty);

        return { agentId: agent.id, score, reasoning, effectiveScore, mood, stances };
      })
    );

    results.sort((a, b) => b.effectiveScore - a.effectiveScore);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Intensities error:", error);
    return NextResponse.json(
      { error: "Failed to compute intensities" },
      { status: 500 }
    );
  }
}
