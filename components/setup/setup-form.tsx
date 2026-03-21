"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DebateConfig } from "@/lib/types";
import { defaultConfig, scenarios, defaultAgents } from "@/lib/defaults";
import { AgentList } from "./agent-list";
import { ParametersPanel } from "./parameters-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw } from "lucide-react";

export function SetupForm() {
  const router = useRouter();
  const [config, setConfig] = useState<DebateConfig>(defaultConfig);
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id);

  const loadDefaults = () => {
    setConfig(defaultConfig);
    setSelectedScenario(scenarios[0].id);
  };

  const selectScenario = (scenarioId: string) => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenarioId);
      setConfig({
        ...config,
        topic: scenario.topic,
        goal: scenario.goal,
        context: scenario.context,
        agents: defaultAgents,
      });
    }
  };

  const startDebate = () => {
    sessionStorage.setItem("debateConfig", JSON.stringify(config));
    router.push("/debate");
  };

  const isValid =
    config.topic.trim() !== "" &&
    config.agents.length >= 2 &&
    config.agents.every((a) => a.name.trim() !== "" && a.role.trim() !== "");

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Board Meeting</h1>
          <p className="text-muted-foreground">Konfiguriere die Teilnehmer und starte die Debatte</p>
        </div>
        <Button variant="outline" onClick={loadDefaults}>
          <RotateCcw className="h-4 w-4 mr-2" /> Defaults laden
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Szenario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {scenarios.map((s) => (
              <Button
                key={s.id}
                variant={selectedScenario === s.id ? "default" : "outline"}
                size="sm"
                onClick={() => selectScenario(s.id)}
              >
                {s.title}
              </Button>
            ))}
            <Button
              variant={selectedScenario === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedScenario("custom")}
            >
              Eigenes Thema
            </Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="topic">Diskussionsthema</Label>
            <Input
              id="topic"
              value={config.topic}
              onChange={(e) => setConfig({ ...config, topic: e.target.value })}
              placeholder="Worüber soll diskutiert werden?"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="goal">Ziel</Label>
            <Textarea
              id="goal"
              value={config.goal}
              onChange={(e) => setConfig({ ...config, goal: e.target.value })}
              placeholder="Was soll am Ende herauskommen?"
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="context">Hintergrund-Kontext</Label>
            <p className="text-xs text-muted-foreground">Wird den Teilnehmern als Hintergrundwissen mitgegeben, aber im Debate-Screen nicht angezeigt.</p>
            <Textarea
              id="context"
              value={config.context}
              onChange={(e) => setConfig({ ...config, context: e.target.value })}
              placeholder="Welchen Kontext sollen die Teilnehmer haben?"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Teilnehmer</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentList agents={config.agents} onChange={(agents) => setConfig({ ...config, agents })} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parameter</CardTitle>
        </CardHeader>
        <CardContent>
          <ParametersPanel
            maxRounds={config.maxRounds}
            silenceThreshold={config.silenceThreshold}
            decayPenalty={config.decayPenalty}
            model={config.model}
            onChange={(params) => setConfig({ ...config, ...params })}
          />
        </CardContent>
      </Card>

      <Button onClick={startDebate} disabled={!isValid} size="lg" className="w-full">
        <Play className="h-5 w-5 mr-2" /> Debatte starten
      </Button>
    </div>
  );
}
