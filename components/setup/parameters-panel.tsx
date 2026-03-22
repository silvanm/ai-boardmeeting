"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ParametersPanelProps {
  maxRounds: number;
  silenceThreshold: number;
  decayPenalty: number;
  model: string;
  contributionLength: "kurz" | "normal" | "lang";
  onChange: (params: { maxRounds: number; silenceThreshold: number; decayPenalty: number; model: string; contributionLength: "kurz" | "normal" | "lang" }) => void;
}

export function ParametersPanel({ maxRounds, silenceThreshold, decayPenalty, model, contributionLength, onChange }: ParametersPanelProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Max. Runden</Label>
          <span className="text-sm text-muted-foreground">{maxRounds}</span>
        </div>
        <Slider
          value={[maxRounds]}
          onValueChange={([v]) => onChange({ maxRounds: v, silenceThreshold, decayPenalty, model, contributionLength })}
          min={4}
          max={30}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Stille-Schwelle</Label>
          <span className="text-sm text-muted-foreground">{silenceThreshold}</span>
        </div>
        <Slider
          value={[silenceThreshold]}
          onValueChange={([v]) => onChange({ maxRounds, silenceThreshold: v, decayPenalty, model, contributionLength })}
          min={1}
          max={5}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label>Decay Penalty</Label>
          <span className="text-sm text-muted-foreground">{decayPenalty}</span>
        </div>
        <Slider
          value={[decayPenalty]}
          onValueChange={([v]) => onChange({ maxRounds, silenceThreshold, decayPenalty: v, model, contributionLength })}
          min={0}
          max={5}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Modell</Label>
        <Select value={model} onValueChange={(v) => onChange({ maxRounds, silenceThreshold, decayPenalty, model: v, contributionLength })}>
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
        <Label>Beitragslänge</Label>
        <Select value={contributionLength} onValueChange={(v) => onChange({ maxRounds, silenceThreshold, decayPenalty, model, contributionLength: v as "kurz" | "normal" | "lang" })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kurz">Kurz (Demo)</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="lang">Ausführlich</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
