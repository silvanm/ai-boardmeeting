"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocale } from "@/lib/i18n";

interface ParametersPanelProps {
  maxRounds: number;
  silenceThreshold: number;
  decayPenalty: number;
  model: string;
  contributionLength: "kurz" | "normal" | "lang";
  webSearch: boolean;
  onChange: (params: { maxRounds: number; silenceThreshold: number; decayPenalty: number; model: string; contributionLength: "kurz" | "normal" | "lang"; webSearch: boolean }) => void;
}

export function ParametersPanel({ maxRounds, silenceThreshold, decayPenalty, model, contributionLength, webSearch, onChange }: ParametersPanelProps) {
  const { t } = useLocale();
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>{t("maxRounds")}</Label>
          <span className="text-sm text-muted-foreground">{maxRounds}</span>
        </div>
        <Slider
          value={[maxRounds]}
          onValueChange={([v]) => onChange({ maxRounds: v, silenceThreshold, decayPenalty, model, contributionLength, webSearch })}
          min={4}
          max={30}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>{t("silenceThreshold")}</Label>
          <span className="text-sm text-muted-foreground">{silenceThreshold}</span>
        </div>
        <Slider
          value={[silenceThreshold]}
          onValueChange={([v]) => onChange({ maxRounds, silenceThreshold: v, decayPenalty, model, contributionLength, webSearch })}
          min={1}
          max={5}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>{t("decayPenalty")}</Label>
          <span className="text-sm text-muted-foreground">{decayPenalty}</span>
        </div>
        <Slider
          value={[decayPenalty]}
          onValueChange={([v]) => onChange({ maxRounds, silenceThreshold, decayPenalty: v, model, contributionLength, webSearch })}
          min={0}
          max={5}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("model")}</Label>
        <Select value={model} onValueChange={(v) => onChange({ maxRounds, silenceThreshold, decayPenalty, model: v, contributionLength, webSearch })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="claude-sonnet-4-6">Claude Sonnet 4.6</SelectItem>
            <SelectItem value="claude-haiku-4-5-20251001">Claude Haiku 4.5</SelectItem>
            <SelectItem value="claude-opus-4-6">Claude Opus 4.6</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("contributionLength")}</Label>
        <Select value={contributionLength} onValueChange={(v) => onChange({ maxRounds, silenceThreshold, decayPenalty, model, contributionLength: v as "kurz" | "normal" | "lang", webSearch })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kurz">{t("lengthShort")}</SelectItem>
            <SelectItem value="normal">{t("lengthNormal")}</SelectItem>
            <SelectItem value="lang">{t("lengthLong")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="web-search">{t("webSearch")}</Label>
        <button
          id="web-search"
          type="button"
          role="switch"
          aria-checked={webSearch}
          onClick={() => onChange({ maxRounds, silenceThreshold, decayPenalty, model, contributionLength, webSearch: !webSearch })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${webSearch ? "bg-primary" : "bg-gray-300"}`}
        >
          <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${webSearch ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      </div>
    </div>
  );
}
