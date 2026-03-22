import { Agent, DebateConfig, DebateMessage, EmotionalState, IntensityResult } from "./types";

export interface StructuredPrompt {
  system: string;
  user: string;
}

export function buildIntensityPrompt(
  agent: Agent,
  config: DebateConfig,
  history: DebateMessage[],
  previousEmotions: EmotionalState[],
  currentRound: number
): StructuredPrompt {
  // === STATIC (cacheable) ===
  const system = `Du bist ${agent.name}, ${agent.role} bei m+p.
Dein Charakter: ${agent.character}

Thema der Diskussion: ${config.topic}
Ziel: ${config.goal}
${config.context ? `\nHintergrund:\n${config.context}\n` : ""}
Deine Aufgabe: Bewerte in jeder Runde, wie stark du dich zu Wort melden willst (1-10), reflektiere deinen emotionalen Zustand und deine Haltung gegenüber den anderen Teilnehmern.

Antworte IMMER NUR in diesem JSON-Format:
{"score": <1-10>, "reasoning": "<kurze Begründung in einem Satz>", "mood": "<dein emotionaler Zustand in einem Wort, z.B. enthusiastisch, frustriert, nachdenklich, zuversichtlich, gereizt, inspiriert>", "stances": [${config.agents.filter((a) => a.id !== agent.id).map((a) => `{"towards": "${a.id}", "feeling": "<Zustimmung|Neutral|Skepsis|Spannung|Bewunderung>"}`).join(", ")}]}`;

  // === DYNAMIC (changes every round) ===
  const transcript = history
    .map((m) => `[${m.agentName} (${getRoleForAgent(m.agentId, config)})]: ${m.content}`)
    .join("\n\n");

  const myEmotions = previousEmotions.find((e) => e.agentId === agent.id);
  const emotionContext = myEmotions
    ? `Dein aktueller emotionaler Zustand: ${myEmotions.mood}\nDeine Haltung gegenüber den anderen:\n${myEmotions.stances.map((s) => {
        const other = config.agents.find((a) => a.id === s.towards);
        return `- ${other?.name}: ${s.feeling}`;
      }).join("\n")}\n`
    : "";

  const progress = currentRound / config.maxRounds;
  let timePressure = "";
  if (progress >= 1.0) {
    timePressure = `⚠️ ZEITDRUCK: Ihr seid deutlich über der geplanten Meetingdauer (Runde ${currentRound} von ${config.maxRounds}). Das Meeting muss JETZT zum Abschluss kommen. Fasse zusammen oder stimme zu — es sei denn, du hast einen wirklich kritischen Einwand. Senke deinen Score stark ab, wenn du nichts Neues beizutragen hast.\n`;
  } else if (progress >= 0.75) {
    timePressure = `⏰ Zeitdruck: Ihr seid in Runde ${currentRound} von ${config.maxRounds}. Die Zeit wird knapp. Kommt zum Punkt, sucht Konsens. Melde dich nur, wenn du etwas Wichtiges beizutragen hast oder eine Zusammenfassung anbieten kannst.\n`;
  } else if (progress >= 0.5) {
    timePressure = `Zeitinfo: Runde ${currentRound} von ${config.maxRounds}. Die Hälfte der Zeit ist vorbei. Langsam solltet ihr Richtung Ergebnis steuern.\n`;
  }

  const user = `Runde ${currentRound} von ${config.maxRounds}.
${timePressure}${emotionContext}
${
  history.length > 0
    ? `Bisheriger Verlauf:\n${transcript}`
    : "Die Diskussion hat gerade erst begonnen. Noch hat niemand gesprochen."
}

Berücksichtige den Zeitdruck: Je weiter fortgeschritten das Meeting, desto weniger solltest du reden, es sei denn du hast etwas wirklich Neues oder Wichtiges.
Wie stark möchtest du dich jetzt zu Wort melden?`;

  return { system, user };
}

export function buildStatementPrompt(
  agent: Agent,
  config: DebateConfig,
  history: DebateMessage[],
  intensities: IntensityResult[],
  emotions: EmotionalState[],
  currentRound: number
): StructuredPrompt {
  // === STATIC (cacheable) ===
  const system = `Du bist ${agent.name}, ${agent.role} bei m+p.
Dein Charakter: ${agent.character}

Thema: ${config.topic}
Ziel: ${config.goal}
${config.context ? `\nHintergrund:\n${config.context}\n` : ""}
Regeln für deine Wortmeldungen:
- Sprich als ${agent.name} in der Ich-Form.
- Lass deinen emotionalen Zustand in deinen Tonfall einfliessen — wenn du frustriert bist, zeig es; wenn du begeistert bist, ebenso.
- Beziehe dich auf vorherige Aussagen, wenn relevant.
- ${getLengthGuideline(config.contributionLength)}
- Sprich Deutsch.
- Verwende KEIN Markdown — kein **, kein ##, keine Listen. Schreibe in natürlicher gesprochener Sprache, wie in einem echten Meeting.`;

  // === DYNAMIC (changes every round) ===
  const transcript = history
    .map((m) => `[${m.agentName} (${getRoleForAgent(m.agentId, config)})]: ${m.content}`)
    .join("\n\n");

  const myEmotions = emotions.find((e) => e.agentId === agent.id);
  const emotionContext = myEmotions
    ? `Dein aktueller emotionaler Zustand: ${myEmotions.mood}\nDeine Haltung gegenüber den anderen:\n${myEmotions.stances.map((s) => {
        const other = config.agents.find((a) => a.id === s.towards);
        return `- ${other?.name}: ${s.feeling}`;
      }).join("\n")}\n`
    : "";

  const othersIntensity = intensities
    .filter((i) => i.agentId !== agent.id)
    .map((i) => {
      const a = config.agents.find((a) => a.id === i.agentId);
      return `${a?.name} (Stimmung: ${i.mood}): ${i.reasoning}`;
    })
    .join("\n");

  const progress = currentRound / config.maxRounds;
  let timePressure = "";
  if (progress >= 1.0) {
    timePressure = `⚠️ Das Meeting hätte eigentlich schon enden sollen (Runde ${currentRound} von ${config.maxRounds}). Fasse zusammen, schlage konkrete nächste Schritte vor oder stimme einem Vorschlag zu. Halte dich sehr kurz (1-2 Sätze).\n`;
  } else if (progress >= 0.75) {
    timePressure = `Die Zeit wird knapp (Runde ${currentRound} von ${config.maxRounds}). Steuere auf ein Ergebnis zu.\n`;
  }

  const user = `Runde ${currentRound} von ${config.maxRounds}.
${timePressure}${emotionContext}
${
  history.length > 0
    ? `Bisheriger Verlauf:\n${transcript}\n\n`
    : "Du eröffnest die Diskussion.\n\n"
}Was die anderen gerade denken und fühlen:
${othersIntensity}

Du hast jetzt das Wort.`;

  return { system, user };
}

function getLengthGuideline(length: DebateConfig["contributionLength"]): string {
  switch (length) {
    case "kurz":
      return "Richtwert: 1-2 Sätze. Fasse dich extrem kurz. Selbst redselige Typen nutzen maximal 2-3 Sätze.";
    case "lang":
      return "Richtwert: 5-8 Sätze. Du darfst ausführlicher argumentieren. Wortkargen Typen reichen 3-4 Sätze, redselige dürfen 8-10 Sätze nutzen.";
    default:
      return "Richtwert: 3-4 Sätze. Dein Charakter kann davon abweichen — wortkargen Typen reichen 1-2 Sätze, redselige dürfen 5-6 Sätze nutzen.";
  }
}

function getRoleForAgent(agentId: string, config: DebateConfig): string {
  return config.agents.find((a) => a.id === agentId)?.role ?? "";
}
