"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { getEmojiUrl } from "@/lib/emoji-map";

interface AnimatedEmojiProps {
  codepoint: string;
  size?: number;
}

export function AnimatedEmoji({ codepoint, size = 28 }: AnimatedEmojiProps) {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    if (!codepoint) return;

    let cancelled = false;
    const url = getEmojiUrl(codepoint);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setAnimationData(data);
      })
      .catch(() => {
        // Silently fail — emoji just won't show
      });

    return () => {
      cancelled = true;
    };
  }, [codepoint]);

  if (!animationData) return null;

  return (
    <div style={{ width: size, height: size }} className="inline-block shrink-0">
      <Lottie animationData={animationData} loop autoplay style={{ width: size, height: size }} />
    </div>
  );
}
