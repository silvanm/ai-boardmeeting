"use client";

import { motion } from "framer-motion";
import { AnimatedEmoji } from "./animated-emoji";

interface MessageBubbleProps {
  agentName: string;
  agentRole: string;
  agentColor: string;
  emojiCodepoint: string;
  content: string;
  isStreaming?: boolean;
  round: number;
}

export function MessageBubble({ agentName, agentRole, agentColor, emojiCodepoint, content, isStreaming, round }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-3 py-2"
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 overflow-hidden mt-1"
        style={{ backgroundColor: emojiCodepoint ? "transparent" : agentColor }}
      >
        {emojiCodepoint ? (
          <AnimatedEmoji codepoint={emojiCodepoint} size={36} />
        ) : (
          <span className="text-white font-bold text-sm">{agentName[0]}</span>
        )}
      </div>
      <div
        className="flex-1 min-w-0 rounded-lg bg-secondary/50 px-4 py-3"
        style={{ borderLeft: `3px solid ${agentColor}` }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-semibold text-sm" style={{ color: agentColor }}>
            {agentName}
          </span>
          <span className="text-xs text-muted-foreground">{agentRole}</span>
          <span className="text-xs text-muted-foreground ml-auto">Runde {round}</span>
        </div>
        <div className="text-[15px] leading-relaxed whitespace-pre-wrap text-foreground/90">
          {content}
          {isStreaming && (
            <span className="inline-block w-2 h-4 bg-current animate-pulse ml-0.5 align-middle" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
