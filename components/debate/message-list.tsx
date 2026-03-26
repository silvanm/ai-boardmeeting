"use client";

import { useEffect, useRef } from "react";
import { DebateMessage } from "@/lib/types";
import { MessageBubble } from "./message-bubble";
import { useLocale } from "@/lib/i18n";

interface MessageListProps {
  messages: DebateMessage[];
  streamingSpeaker: string | null;
  streamingText: string;
  streamingRound: number;
  agentColor: string;
  agentName: string;
  agentRole: string;
  streamingEmoji: string;
}

export function MessageList({
  messages,
  streamingSpeaker,
  streamingText,
  streamingRound,
  agentColor,
  agentName,
  agentRole,
  streamingEmoji,
}: MessageListProps) {
  const { t } = useLocale();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
      {messages.length === 0 && !streamingSpeaker && (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          {t("debateStarting")}
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          agentName={msg.agentName}
          agentRole={msg.agentRole}
          agentColor={msg.agentColor}
          emojiCodepoint={msg.emojiCodepoint}
          content={msg.content}
          round={msg.round}
        />
      ))}
      {streamingSpeaker && streamingText && (
        <MessageBubble
          agentName={agentName}
          agentRole={agentRole}
          agentColor={agentColor}
          emojiCodepoint={streamingEmoji}
          content={streamingText}
          isStreaming
          round={streamingRound}
        />
      )}
      <div ref={bottomRef} />
    </div>
  );
}
