"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DebateConfig } from "@/lib/types";
import { getDefaultConfig, getScenarios, getDefaultAgents, Scenario } from "@/lib/defaults";
import { AgentList } from "./agent-list";
import { ParametersPanel } from "./parameters-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Globe, Handshake, Link } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { useSession } from "next-auth/react";

export function SetupForm() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const { data: session } = useSession();
  const isAdmin = (session as unknown as Record<string, unknown>)?.authType === "google";
  const [config, setConfig] = useState<DebateConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("debateSettings");
      if (saved) {
        try { return JSON.parse(saved) as DebateConfig; } catch { /* ignore */ }
      }
    }
    return getDefaultConfig(locale);
  });
  const [currentScenarios, setCurrentScenarios] = useState<Scenario[]>(getScenarios(locale));
  const [selectedScenario, setSelectedScenario] = useState<string>(currentScenarios[0].id);

  useEffect(() => {
    const newScenarios = getScenarios(locale);
    const newConfig = getDefaultConfig(locale);
    setCurrentScenarios(newScenarios);
    setConfig(newConfig);
    setSelectedScenario(newScenarios[0].id);
  }, [locale]);

  const loadDefaults = () => {
    const newConfig = getDefaultConfig(locale);
    setConfig(newConfig);
    setSelectedScenario(currentScenarios[currentScenarios.length - 1].id);
  };

  const selectScenario = (scenarioId: string) => {
    const scenario = currentScenarios.find((s) => s.id === scenarioId);
    if (scenario) {
      setSelectedScenario(scenarioId);
      setConfig({
        ...config,
        topic: scenario.topic,
        goal: scenario.goal,
        context: scenario.context,
        agents: scenario.agents || getDefaultAgents(locale),
        mode: scenario.mode || "debate",
      });
    }
  };

  const startDebate = () => {
    const fullConfig = { ...config, locale };
    sessionStorage.setItem("debateConfig", JSON.stringify(fullConfig));
    localStorage.setItem("debateSettings", JSON.stringify(fullConfig));
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
          <h1 className="text-3xl font-bold">{t("appTitle")}</h1>
          <p className="text-muted-foreground">{t("appSubtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocale(locale === "de" ? "en" : "de")}
          >
            <Globe className="h-4 w-4 mr-1" />
            {locale === "de" ? "EN" : "DE"}
          </Button>
          {isAdmin && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/magic-links")}
            >
              <Link className="h-4 w-4 mr-1" />
              {t("magicLinkTitle")}
            </Button>
          )}
          <Button variant="outline" onClick={loadDefaults}>
            <RotateCcw className="h-4 w-4 mr-2" /> {t("loadDefaults")}
          </Button>
          <img src="https://storage.googleapis.com/mpom-public/mp-horizontal-black-logo.svg" alt="m+p" className="h-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("scenario")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {currentScenarios.filter((s) => s.mode !== "negotiation").map((s) => (
              <Button
                key={s.id}
                variant={selectedScenario === s.id ? "default" : "outline"}
                size="sm"
                onClick={() => selectScenario(s.id)}
              >
                {s.title}
              </Button>
            ))}
            {currentScenarios.filter((s) => s.mode === "negotiation").map((s) => (
              <Button
                key={s.id}
                variant={selectedScenario === s.id ? "default" : "secondary"}
                size="sm"
                onClick={() => selectScenario(s.id)}
                className={selectedScenario === s.id ? "" : "border border-dashed border-muted-foreground/40"}
              >
                <Handshake className="h-3.5 w-3.5 mr-1" />
                {s.title}
              </Button>
            ))}
            <Button
              variant={selectedScenario === "custom" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedScenario("custom")}
            >
              {t("customTopic")}
            </Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="topic">{t("topic")}</Label>
            <Input
              id="topic"
              value={config.topic}
              onChange={(e) => setConfig({ ...config, topic: e.target.value })}
              placeholder={t("topicPlaceholder")}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="goal">{t("goal")}</Label>
            <Textarea
              id="goal"
              value={config.goal}
              onChange={(e) => setConfig({ ...config, goal: e.target.value })}
              placeholder={t("goalPlaceholder")}
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="context">{t("context")}</Label>
            <p className="text-xs text-muted-foreground">{t("contextHelp")}</p>
            <Textarea
              id="context"
              value={config.context}
              onChange={(e) => setConfig({ ...config, context: e.target.value })}
              placeholder={t("contextPlaceholder")}
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("participants")}</CardTitle>
        </CardHeader>
        <CardContent>
          <AgentList agents={config.agents} onChange={(agents) => setConfig({ ...config, agents })} showPrivateContext={config.mode === "negotiation"} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("parameters")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ParametersPanel
            maxRounds={config.maxRounds}
            silenceThreshold={config.silenceThreshold}
            decayPenalty={config.decayPenalty}
            model={config.model}
            contributionLength={config.contributionLength}
            webSearch={config.webSearch}
            mode={config.mode}
            onChange={(params) => setConfig({ ...config, ...params })}
          />
        </CardContent>
      </Card>

      <Button onClick={startDebate} disabled={!isValid} size="lg" className="w-full">
        <Play className="h-5 w-5 mr-2" /> {config.mode === "negotiation" ? t("startNegotiation") : t("startDebate")}
      </Button>
    </div>
  );
}
