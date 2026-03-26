"use client";

import { IntensityResult, Agent } from "@/lib/types";
import { IntensityBar } from "./intensity-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/lib/i18n";

interface IntensityPanelProps {
  intensities: IntensityResult[];
  agents: Agent[];
  currentSpeakerId: string | null;
  emojis: Record<string, string>;
}

export function IntensityPanel({ intensities, agents, currentSpeakerId, emojis }: IntensityPanelProps) {
  const { t } = useLocale();
  return (
    <Card>
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm">{t("intensity")}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {intensities.length === 0 ? (
          <p className="text-xs text-muted-foreground">{t("waitingFirstRound")}</p>
        ) : (
          intensities.map((intensity) => {
            const agent = agents.find((a) => a.id === intensity.agentId);
            if (!agent) return null;
            return (
              <IntensityBar
                key={intensity.agentId}
                agentName={agent.name}
                agentColor={agent.color}
                score={intensity.score}
                effectiveScore={intensity.effectiveScore}
                reasoning={intensity.reasoning}
                mood={intensity.mood || ""}
                emojiCodepoint={emojis[intensity.agentId] || ""}
                isCurrentSpeaker={intensity.agentId === currentSpeakerId}
              />
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
