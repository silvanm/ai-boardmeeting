"use client";

import { DebateStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Pause, Play, Square, Download } from "lucide-react";
import { useLocale } from "@/lib/i18n";

interface DebateControlsProps {
  status: DebateStatus;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onExport: () => void;
}

export function DebateControls({ status, onPause, onResume, onStop, onExport }: DebateControlsProps) {
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-2">
      {status === "running" && (
        <Button variant="outline" size="sm" onClick={onPause}>
          <Pause className="h-4 w-4 mr-1" /> {t("pause")}
        </Button>
      )}
      {status === "paused" && (
        <Button variant="outline" size="sm" onClick={onResume}>
          <Play className="h-4 w-4 mr-1" /> {t("resume")}
        </Button>
      )}
      {(status === "running" || status === "paused") && (
        <Button variant="destructive" size="sm" onClick={onStop}>
          <Square className="h-4 w-4 mr-1" /> {t("stop")}
        </Button>
      )}
      {status === "ended" && (
        <Button variant="outline" size="sm" onClick={onExport}>
          <Download className="h-4 w-4 mr-1" /> {t("export")}
        </Button>
      )}
    </div>
  );
}
