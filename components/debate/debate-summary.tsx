"use client";

import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { DebateConfig, DebateMessage } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useLocale } from "@/lib/i18n";

interface DebateSummaryProps {
  config: DebateConfig;
  messages: DebateMessage[];
}

export function DebateSummary({ config, messages }: DebateSummaryProps) {
  const { t } = useLocale();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchedRef = useRef(false);
  const summaryRef = useRef<HTMLDivElement>(null);

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

  const handleExportPdf = () => {
    const renderedHtml = summaryRef.current?.innerHTML ?? "";
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<title>${t("meetingProtocol")}</title>
<style>
  body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 700px; margin: 40px auto; color: #1a1a1a; line-height: 1.6; font-size: 14px; }
  h1 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 8px; }
  h2 { font-size: 16px; margin-top: 24px; margin-bottom: 8px; }
  h3 { font-size: 14px; margin-top: 16px; margin-bottom: 6px; }
  ul, ol { padding-left: 24px; margin: 8px 0; }
  ul { list-style-type: disc; }
  ol { list-style-type: decimal; }
  li { margin: 4px 0; }
  p { margin: 6px 0; }
  strong { font-weight: 700; }
  .meta { color: #666; font-size: 13px; margin-bottom: 24px; }
  @media print { body { margin: 20px; } }
</style>
</head>
<body>
<h1>${t("meetingProtocol")}</h1>
<div class="meta">
  <strong>${t("exportTopic")}:</strong> ${config.topic}<br>
  <strong>${t("exportParticipants")}:</strong> ${config.agents.map((a) => `${a.name} (${a.role})`).join(", ")}<br>
  <strong>${t("exportDate")}:</strong> ${new Date().toLocaleDateString("de-CH")}<br>
  <strong>${t("exportRounds")}:</strong> ${totalRounds} (${messages.length} ${t("contributions")})
</div>
${renderedHtml}
</body>
</html>`);
    printWindow.document.close();
    printWindow.onload = () => { printWindow.print(); };
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm">{t("statistics")}</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2">
          <p className="text-xs text-muted-foreground">
            {totalRounds} {t("rounds")}, {messages.length} {t("contributions")}
          </p>
          {speakerCounts.map((s) => (
            <div key={s.name} className="flex items-center justify-between text-xs">
              <span style={{ color: s.color }}>{s.name}</span>
              <span className="text-muted-foreground">{s.count} {t("contributions")}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-white text-black dark:bg-white dark:text-black">
        <CardHeader className="py-3 px-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-black">
              {t("meetingProtocol")}
              {isLoading && <span className="ml-2 text-xs font-normal text-gray-500">{t("protocolLoading")}</span>}
            </CardTitle>
            {summary && !isLoading && (
              <Button variant="ghost" size="sm" onClick={handleExportPdf} className="h-7 px-2 text-gray-600 hover:text-black">
                <FileDown className="h-4 w-4 mr-1" />
                <span className="text-xs">{t("pdf")}</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-3">
          {summary ? (
            <div ref={summaryRef} className="prose prose-sm prose-neutral max-w-none
              [&_h1]:text-base [&_h1]:font-bold [&_h1]:mt-3 [&_h1]:mb-1
              [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1
              [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1
              [&_p]:text-sm [&_p]:my-1
              [&_ul]:text-sm [&_ul]:my-1 [&_ul]:pl-4 [&_ul]:list-disc
              [&_ol]:text-sm [&_ol]:my-1 [&_ol]:pl-4 [&_ol]:list-decimal
              [&_li]:my-0.5
              [&_strong]:font-bold
            ">
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              {isLoading ? t("protocolCreating") : t("protocolUnavailable")}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
