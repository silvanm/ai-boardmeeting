"use client";

import { motion } from "framer-motion";
import { AnimatedEmoji } from "./animated-emoji";

interface IntensityBarProps {
  agentName: string;
  agentColor: string;
  score: number;
  effectiveScore: number;
  reasoning: string;
  mood: string;
  emojiCodepoint: string;
  isCurrentSpeaker: boolean;
}

export function IntensityBar({
  agentName,
  agentColor,
  score,
  effectiveScore,
  reasoning,
  mood,
  emojiCodepoint,
  isCurrentSpeaker,
}: IntensityBarProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className={`flex items-center gap-1 font-medium ${isCurrentSpeaker ? "underline" : ""}`} style={{ color: agentColor }}>
          {emojiCodepoint && <AnimatedEmoji codepoint={emojiCodepoint} size={20} />}
          {agentName}
          {mood && <span className="ml-1 font-normal text-muted-foreground">({mood})</span>}
        </span>
        <span className="text-muted-foreground">
          {effectiveScore} {score !== effectiveScore && `(${score})`}
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: agentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${(effectiveScore / 10) * 100}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      {reasoning && (
        <p className="text-xs text-muted-foreground truncate" title={reasoning}>
          {reasoning}
        </p>
      )}
    </div>
  );
}
