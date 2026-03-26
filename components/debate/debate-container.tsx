"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { DebateConfig } from "@/lib/types";
import { useDebate } from "@/hooks/use-debate";
import { exportToMarkdown } from "@/lib/export";
import { MessageList } from "./message-list";
import { IntensityPanel } from "./intensity-panel";
import { RoundIndicator } from "./round-indicator";
import { DebateControls } from "./debate-controls";
import { DebateSummary } from "./debate-summary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/i18n";

export function DebateContainer() {
  const router = useRouter();
  const { t } = useLocale();
  const [config, setConfig] = useState<DebateConfig | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("debateConfig");
    if (stored) {
      setConfig(JSON.parse(stored));
    } else {
      router.push("/");
    }
  }, [router]);

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen text-muted-foreground">
        {t("loadingConfig")}
      </div>
    );
  }

  return <DebateView config={config} />;
}

function DebateView({ config }: { config: DebateConfig }) {
  const router = useRouter();
  const { state, streamingText, streamingSpeaker, start, pause, resume, stop } =
    useDebate(config);

  const startedRef = useRef(false);
  useEffect(() => {
    if (state.status === "idle" && !startedRef.current) {
      startedRef.current = true;
      start();
    }
  }, [state.status, start]);

  const handleExport = () => {
    const md = exportToMarkdown(config, state.messages);
    const blob = new Blob([md], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-board-meeting.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const streamingAgent = config.agents.find((a) => a.id === streamingSpeaker);

  return (
    <div className="h-screen flex flex-col max-w-[1440px] mx-auto w-full">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold leading-tight">{config.topic}</h1>
            <p className="text-xs text-muted-foreground">{config.goal}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RoundIndicator current={state.currentRound} max={config.maxRounds} />
          <DebateControls
            status={state.status}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            onExport={handleExport}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat area */}
        <div className="flex flex-col min-w-0 w-full max-w-[700px]">
          <MessageList
            messages={state.messages}
            streamingSpeaker={streamingSpeaker}
            streamingText={streamingText}
            streamingRound={state.currentRound}
            agentColor={streamingAgent?.color ?? "#888"}
            agentName={streamingAgent?.name ?? ""}
            agentRole={streamingAgent?.role ?? ""}
            streamingEmoji={streamingSpeaker ? (state.emojis[streamingSpeaker] || "") : ""}
          />
        </div>

        {/* Sidebar */}
        <div className="flex-1 min-w-[300px] border-l p-4 space-y-4 overflow-y-auto hidden md:block">
          <IntensityPanel
            intensities={state.intensities}
            agents={config.agents}
            currentSpeakerId={streamingSpeaker}
            emojis={state.emojis}
          />
          {state.status === "ended" && (
            <DebateSummary config={config} messages={state.messages} />
          )}
        </div>
        {/* Mobile summary - shown below chat on small screens */}
        {state.status === "ended" && (
          <div className="md:hidden p-4 border-t">
            <DebateSummary config={config} messages={state.messages} />
          </div>
        )}
      </div>
    </div>
  );
}
