import { Agent, DebateConfig, DebateMessage, EmotionalState, IntensityResult, Proposal } from "./types";

export interface StructuredPrompt {
  system: string;
  user: string;
}

const promptText = {
  de: {
    youAre: (name: string, role: string) => `Du bist ${name}, ${role}.`,
    yourCharacter: "Dein Charakter:",
    discussionTopic: "Thema der Diskussion:",
    goal: "Ziel:",
    background: "Hintergrund:",
    intensityTask: "Deine Aufgabe: Bewerte in jeder Runde, wie stark du dich zu Wort melden willst (1-10), reflektiere deinen emotionalen Zustand und deine Haltung gegenüber den anderen Teilnehmern.",
    replyJson: "Antworte IMMER NUR in diesem JSON-Format:",
    moodExample: "dein emotionaler Zustand in einem Wort, z.B. enthusiastisch, frustriert, nachdenklich, zuversichtlich, gereizt, inspiriert",
    stanceOptions: "Zustimmung|Neutral|Skepsis|Spannung|Bewunderung",
    yourEmotionalState: "Dein aktueller emotionaler Zustand:",
    yourStances: "Deine Haltung gegenüber den anderen:",
    roundOf: (current: number, max: number) => `Runde ${current} von ${max}.`,
    timeCritical: (current: number, max: number) => `⚠️ ZEITDRUCK: Ihr seid deutlich über der geplanten Meetingdauer (Runde ${current} von ${max}). Das Meeting muss JETZT zum Abschluss kommen. Fasse zusammen oder stimme zu — es sei denn, du hast einen wirklich kritischen Einwand. Senke deinen Score stark ab, wenn du nichts Neues beizutragen hast.\n`,
    timeShort: (current: number, max: number) => `⏰ Zeitdruck: Ihr seid in Runde ${current} von ${max}. Die Zeit wird knapp. Kommt zum Punkt, sucht Konsens. Melde dich nur, wenn du etwas Wichtiges beizutragen hast oder eine Zusammenfassung anbieten kannst.\n`,
    timeHalf: (current: number, max: number) => `Zeitinfo: Runde ${current} von ${max}. Die Hälfte der Zeit ist vorbei. Langsam solltet ihr Richtung Ergebnis steuern.\n`,
    previousDiscussion: "Bisheriger Verlauf:",
    noOneSpoke: "Die Diskussion hat gerade erst begonnen. Noch hat niemand gesprochen.",
    considerTimePressure: "Berücksichtige den Zeitdruck: Je weiter fortgeschritten das Meeting, desto weniger solltest du reden, es sei denn du hast etwas wirklich Neues oder Wichtiges.",
    howMuchSpeak: "Wie stark möchtest du dich jetzt zu Wort melden?",
    topic: "Thema:",
    rulesTitle: "Regeln für deine Wortmeldungen:",
    speakAs: (name: string) => `Sprich als ${name} in der Ich-Form.`,
    showEmotions: "Lass deinen emotionalen Zustand in deinen Tonfall einfliessen — wenn du frustriert bist, zeig es; wenn du begeistert bist, ebenso.",
    referPrevious: "Beziehe dich auf vorherige Aussagen, wenn relevant.",
    speakLanguage: "Sprich Deutsch.",
    noMarkdown: "Verwende KEIN Markdown — kein **, kein ##, keine Listen. Schreibe in natürlicher gesprochener Sprache, wie in einem echten Meeting.",
    mood: "Stimmung",
    youOpenDiscussion: "Du eröffnest die Diskussion.\n\n",
    othersThinking: "Was die anderen gerade denken und fühlen:",
    yourTurn: "Du hast jetzt das Wort.",
    timeShouldEnd: (current: number, max: number) => `⚠️ Das Meeting hätte eigentlich schon enden sollen (Runde ${current} von ${max}). Fasse zusammen, schlage konkrete nächste Schritte vor oder stimme einem Vorschlag zu. Halte dich sehr kurz (1-2 Sätze).\n`,
    timeRunningOut: (current: number, max: number) => `Die Zeit wird knapp (Runde ${current} von ${max}). Steuere auf ein Ergebnis zu.\n`,
    lengthShort: "Richtwert: 1-2 Sätze. Fasse dich extrem kurz. Selbst redselige Typen nutzen maximal 2-3 Sätze.",
    lengthLong: "Richtwert: 5-8 Sätze. Du darfst ausführlicher argumentieren. Wortkargen Typen reichen 3-4 Sätze, redselige dürfen 8-10 Sätze nutzen.",
    lengthNormal: "Richtwert: 3-4 Sätze. Dein Charakter kann davon abweichen — wortkargen Typen reichen 1-2 Sätze, redselige dürfen 5-6 Sätze nutzen.",
    // Negotiation mode
    negotiationTask: "Deine Aufgabe: Du bist in einer echten Verhandlung. Bewerte, wie stark du dich zu Wort melden willst (1-10), reflektiere deinen emotionalen Zustand und deine Strategie. Überlege: Welche Information solltest du jetzt preisgeben? Was hältst du zurück? Ist jetzt der richtige Moment für ein Angebot oder Gegenangebot?",
    privateInfo: "DEINE PRIVATE INFORMATION (nur du weisst das — gib diese Details NICHT direkt preis):",
    walkAwayOption: "Wenn deine roten Linien überschritten wurden und du keinen Weg zu einer Einigung siehst, setze walkAway auf true um die Verhandlung zu beenden.",
    proposalInstruction: "Wenn du ein konkretes Angebot machen willst, formuliere es klar mit spezifischen Bedingungen (z.B. Zahlen, Fristen, Konditionen). Wenn du auf ein bestehendes Angebot reagierst, sage klar ob du es annimmst, ablehnst oder ein Gegenangebot machst.",
    strategicThinking: "Denke strategisch: Was wurde bisher preisgegeben? Was verbergen die anderen wahrscheinlich? Welche Hebel hast du? Wann ist der richtige Moment für Zugeständnisse?",
    negotiationRules: "Verhandle wie in einer echten Verhandlung — sei strategisch, nicht nur diskussionsfreudig. Du darfst bluffen, übertreiben oder Informationen zurückhalten.",
    openProposals: "Aktuelle Vorschläge auf dem Tisch:",
    noProposals: "Es liegen noch keine konkreten Vorschläge vor.",
  },
  en: {
    youAre: (name: string, role: string) => `You are ${name}, ${role}.`,
    yourCharacter: "Your character:",
    discussionTopic: "Discussion topic:",
    goal: "Goal:",
    background: "Background:",
    intensityTask: "Your task: In each round, rate how strongly you want to speak (1-10), reflect on your emotional state and your attitude towards the other participants.",
    replyJson: "ALWAYS reply ONLY in this JSON format:",
    moodExample: "your emotional state in one word, e.g. enthusiastic, frustrated, thoughtful, confident, irritated, inspired",
    stanceOptions: "Agreement|Neutral|Skepticism|Tension|Admiration",
    yourEmotionalState: "Your current emotional state:",
    yourStances: "Your attitude towards the others:",
    roundOf: (current: number, max: number) => `Round ${current} of ${max}.`,
    timeCritical: (current: number, max: number) => `⚠️ TIME PRESSURE: You are well over the planned meeting duration (round ${current} of ${max}). The meeting must end NOW. Summarize or agree — unless you have a truly critical objection. Lower your score significantly if you have nothing new to contribute.\n`,
    timeShort: (current: number, max: number) => `⏰ Time pressure: You are in round ${current} of ${max}. Time is running out. Get to the point, seek consensus. Only speak if you have something important to contribute or can offer a summary.\n`,
    timeHalf: (current: number, max: number) => `Time info: Round ${current} of ${max}. Half the time is over. You should start steering towards a result.\n`,
    previousDiscussion: "Discussion so far:",
    noOneSpoke: "The discussion has just begun. No one has spoken yet.",
    considerTimePressure: "Consider the time pressure: The further the meeting has progressed, the less you should speak, unless you have something truly new or important.",
    howMuchSpeak: "How strongly do you want to speak now?",
    topic: "Topic:",
    rulesTitle: "Rules for your contributions:",
    speakAs: (name: string) => `Speak as ${name} in first person.`,
    showEmotions: "Let your emotional state flow into your tone — if you're frustrated, show it; if you're excited, likewise.",
    referPrevious: "Refer to previous statements when relevant.",
    speakLanguage: "Speak English.",
    noMarkdown: "Do NOT use Markdown — no **, no ##, no lists. Write in natural spoken language, as in a real meeting.",
    mood: "Mood",
    youOpenDiscussion: "You are opening the discussion.\n\n",
    othersThinking: "What the others are currently thinking and feeling:",
    yourTurn: "You have the floor.",
    timeShouldEnd: (current: number, max: number) => `⚠️ The meeting should have ended already (round ${current} of ${max}). Summarize, suggest concrete next steps or agree with a proposal. Keep it very short (1-2 sentences).\n`,
    timeRunningOut: (current: number, max: number) => `Time is running out (round ${current} of ${max}). Steer towards a result.\n`,
    lengthShort: "Guideline: 1-2 sentences. Keep it extremely brief. Even talkative types use at most 2-3 sentences.",
    lengthLong: "Guideline: 5-8 sentences. You may argue in more detail. Quiet types need 3-4 sentences, talkative ones may use 8-10.",
    lengthNormal: "Guideline: 3-4 sentences. Your character may deviate — quiet types need 1-2 sentences, talkative ones may use 5-6.",
    // Negotiation mode
    negotiationTask: "Your task: You are in a real negotiation. Rate how strongly you want to speak (1-10), reflect on your emotional state and your strategy. Consider: What information should you reveal now? What should you hold back? Is now the right moment to make or respond to a proposal?",
    privateInfo: "YOUR PRIVATE INFORMATION (only you know this — do NOT directly reveal these details):",
    walkAwayOption: "If your red lines have been crossed and you see no path to agreement, set walkAway to true to end the negotiation.",
    proposalInstruction: "If you want to make a concrete proposal, state it clearly with specific terms (e.g. numbers, timelines, conditions). If responding to an existing proposal, state clearly whether you accept, reject, or counter it.",
    strategicThinking: "Think strategically: What has been revealed so far? What are the other parties likely hiding? What leverage do you have? When is the right moment for concessions?",
    negotiationRules: "Negotiate as in a real negotiation — be strategic, not just conversational. You may bluff, exaggerate, or withhold information.",
    openProposals: "Current proposals on the table:",
    noProposals: "No concrete proposals have been made yet.",
  },
};

export function buildIntensityPrompt(
  agent: Agent,
  config: DebateConfig,
  history: DebateMessage[],
  previousEmotions: EmotionalState[],
  currentRound: number
): StructuredPrompt {
  const lang = config.locale === "en" ? "en" : "de";
  const p = promptText[lang];
  const isNegotiation = config.mode === "negotiation";

  const privateContext = isNegotiation && agent.privateContext
    ? `\n${p.privateInfo}\n${agent.privateContext}\n`
    : "";

  const taskDescription = isNegotiation ? p.negotiationTask : p.intensityTask;

  const walkAwayField = isNegotiation
    ? `, "walkAway": <true|false>`
    : "";

  const system = `${p.youAre(agent.name, agent.role)}
${p.yourCharacter} ${agent.character}
${privateContext}
${p.discussionTopic} ${config.topic}
${p.goal} ${config.goal}
${config.context ? `\n${p.background}\n${config.context}\n` : ""}
${taskDescription}
${isNegotiation ? `\n${p.walkAwayOption}\n` : ""}
${p.replyJson}
{"score": <1-10>, "reasoning": "<${lang === "de" ? "kurze Begründung in einem Satz" : "brief reasoning in one sentence"}>", "mood": "<${p.moodExample}>", "stances": [${config.agents.filter((a) => a.id !== agent.id).map((a) => `{"towards": "${a.id}", "feeling": "<${p.stanceOptions}>"}`).join(", ")}]${walkAwayField}}`;

  const transcript = history
    .map((m) => `[${m.agentName} (${getRoleForAgent(m.agentId, config)})]: ${m.content}`)
    .join("\n\n");

  const myEmotions = previousEmotions.find((e) => e.agentId === agent.id);
  const emotionContext = myEmotions
    ? `${p.yourEmotionalState} ${myEmotions.mood}\n${p.yourStances}\n${myEmotions.stances.map((s) => {
        const other = config.agents.find((a) => a.id === s.towards);
        return `- ${other?.name}: ${s.feeling}`;
      }).join("\n")}\n`
    : "";

  const progress = currentRound / config.maxRounds;
  let timePressure = "";
  if (progress >= 1.0) {
    timePressure = p.timeCritical(currentRound, config.maxRounds);
  } else if (progress >= 0.75) {
    timePressure = p.timeShort(currentRound, config.maxRounds);
  } else if (progress >= 0.5) {
    timePressure = p.timeHalf(currentRound, config.maxRounds);
  }

  const user = `${p.roundOf(currentRound, config.maxRounds)}
${timePressure}${emotionContext}
${
  history.length > 0
    ? `${p.previousDiscussion}\n${transcript}`
    : p.noOneSpoke
}

${p.considerTimePressure}
${p.howMuchSpeak}`;

  return { system, user };
}

export function buildStatementPrompt(
  agent: Agent,
  config: DebateConfig,
  history: DebateMessage[],
  intensities: IntensityResult[],
  emotions: EmotionalState[],
  currentRound: number,
  proposals?: Proposal[]
): StructuredPrompt {
  const lang = config.locale === "en" ? "en" : "de";
  const p = promptText[lang];
  const isNegotiation = config.mode === "negotiation";

  const privateContext = isNegotiation && agent.privateContext
    ? `\n${p.privateInfo}\n${agent.privateContext}\n`
    : "";

  const negotiationRules = isNegotiation
    ? `- ${p.strategicThinking}\n- ${p.proposalInstruction}\n- ${p.negotiationRules}`
    : "";

  const system = `${p.youAre(agent.name, agent.role)}
${p.yourCharacter} ${agent.character}
${privateContext}
${p.topic} ${config.topic}
${p.goal} ${config.goal}
${config.context ? `\n${p.background}\n${config.context}\n` : ""}
${p.rulesTitle}
- ${p.speakAs(agent.name)}
- ${p.showEmotions}
- ${p.referPrevious}
- ${getLengthGuideline(config.contributionLength, lang)}
- ${p.speakLanguage}
- ${p.noMarkdown}
${negotiationRules}`;

  const transcript = history
    .map((m) => `[${m.agentName} (${getRoleForAgent(m.agentId, config)})]: ${m.content}`)
    .join("\n\n");

  const myEmotions = emotions.find((e) => e.agentId === agent.id);
  const emotionContext = myEmotions
    ? `${p.yourEmotionalState} ${myEmotions.mood}\n${p.yourStances}\n${myEmotions.stances.map((s) => {
        const other = config.agents.find((a) => a.id === s.towards);
        return `- ${other?.name}: ${s.feeling}`;
      }).join("\n")}\n`
    : "";

  // In negotiation mode, hide other agents' emotions/reasoning — infer from transcript only
  const othersSection = isNegotiation
    ? ""
    : `${p.othersThinking}\n${intensities
        .filter((i) => i.agentId !== agent.id)
        .map((i) => {
          const a = config.agents.find((a) => a.id === i.agentId);
          return `${a?.name} (${p.mood}: ${i.mood}): ${i.reasoning}`;
        })
        .join("\n")}\n`;

  // In negotiation mode, show open proposals
  const proposalSection = isNegotiation && proposals
    ? `\n${proposals.length > 0
        ? `${p.openProposals}\n${proposals.filter((pr) => pr.status === "open").map((pr) => {
            const from = config.agents.find((a) => a.id === pr.fromAgentId);
            return `- ${from?.name} (Runde ${pr.round}): ${pr.terms}`;
          }).join("\n") || p.noProposals}`
        : p.noProposals}\n`
    : "";

  const progress = currentRound / config.maxRounds;
  let timePressure = "";
  if (progress >= 1.0) {
    timePressure = p.timeShouldEnd(currentRound, config.maxRounds);
  } else if (progress >= 0.75) {
    timePressure = p.timeRunningOut(currentRound, config.maxRounds);
  }

  const user = `${p.roundOf(currentRound, config.maxRounds)}
${timePressure}${emotionContext}
${
  history.length > 0
    ? `${p.previousDiscussion}\n${transcript}\n\n`
    : p.youOpenDiscussion
}${othersSection}${proposalSection}
${p.yourTurn}`;

  return { system, user };
}

function getLengthGuideline(length: DebateConfig["contributionLength"], lang: "de" | "en"): string {
  const p = promptText[lang];
  switch (length) {
    case "kurz": return p.lengthShort;
    case "lang": return p.lengthLong;
    default: return p.lengthNormal;
  }
}

function getRoleForAgent(agentId: string, config: DebateConfig): string {
  return config.agents.find((a) => a.id === agentId)?.role ?? "";
}
