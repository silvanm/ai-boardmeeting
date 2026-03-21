"use client";

import { useState, useCallback } from "react";

export function useStreamingText() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = useCallback(
    async (url: string, body: object): Promise<string> => {
      setText("");
      setIsStreaming(true);
      let fullText = "";

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
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
                setText(fullText);
              }
            } catch {
              // skip malformed lines
            }
          }
        }
      } finally {
        setIsStreaming(false);
      }

      return fullText;
    },
    []
  );

  return { text, isStreaming, startStream };
}
