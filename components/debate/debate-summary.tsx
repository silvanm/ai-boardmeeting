"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { DebateConfig, DebateMessage } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DebateSummaryProps {
  config: DebateConfig;
  messages: DebateMessage[];
}

export function DebateSummary({ config, messages }: DebateSummaryProps) {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (messages.length === 0 || fetchedRef.current) return;
    fetchedRef.current = true;
    setIsLoading(true);

    (async () => {
      try {
        const response = await fetch("/api/summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ config, messages }),
        });

        if (!response.ok || !response.body) {
          setIsLoading(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

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
                setSummary(fullText);
              }
            } catch {
              // skip
            }
          }
        }
      } catch (error) {
        console.error("Summary fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [config, messages]);

  const speakerCounts = config.agents.map((agent) => ({
    name: agent.name,
    color: agent.color,
    count: messages.filter((m) => m.agentId === agent.id).length,
  }));

  const totalRounds = messages.length > 0 ? messages[messages.length - 1].round : 0;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm">Statistik</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2">
          <p className="text-xs text-muted-foreground">
            {totalRounds} Runden, {messages.length} Beiträge
          </p>
          {speakerCounts.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs">
              <span style={{ color: s.color }}>{s.name}</span>
              <span className="text-muted-foreground">{s.count} Beiträge</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white text-black dark:bg-white dark:text-black">
        <CardHeader className="py-3 px-4 border-b border-gray-200">
          <CardTitle className="text-sm text-black">
            Meeting-Protokoll
            {isLoading && <span className="ml-2 text-xs font-normal text-gray-500">wird erstellt...</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-3">
          {summary ? (
            <div className="prose prose-sm prose-neutral max-w-none
              [&_h1]:text-base [&_h1]:font-bold [&_h1]:mt-3 [&_h1]:mb-1
              [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1
              [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1
              [&_p]:text-sm [&_p]:my-1
              [&_ul]:text-sm [&_ul]:my-1 [&_ul]:pl-4
              [&_ol]:text-sm [&_ol]:my-1 [&_ol]:pl-4
              [&_li]:my-0.5
              [&_strong]:font-bold
            ">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              {isLoading ? "Protokoll wird erstellt..." : "Kein Protokoll verfügbar."}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
