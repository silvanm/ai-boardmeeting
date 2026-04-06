"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "de" | "en";

const translations = {
  de: {
    // Setup
    appTitle: "AI Board Meeting",
    appSubtitle: "Konfiguriere die Teilnehmer und starte die Debatte",
    loadDefaults: "Defaults laden",
    scenario: "Szenario",
    customTopic: "Eigenes Thema",
    topic: "Diskussionsthema",
    topicPlaceholder: "Worüber soll diskutiert werden?",
    goal: "Ziel",
    goalPlaceholder: "Was soll am Ende herauskommen?",
    context: "Hintergrund-Kontext",
    contextHelp: "Wird den Teilnehmern als Hintergrundwissen mitgegeben, aber im Debate-Screen nicht angezeigt.",
    contextPlaceholder: "Welchen Kontext sollen die Teilnehmer haben?",
    participants: "Teilnehmer",
    parameters: "Parameter",
    startDebate: "Debatte starten",
    addAgent: "Agent hinzufügen",
    name: "Name",
    role: "Rolle",
    color: "Farbe",
    character: "Charakter",
    // Parameters
    maxRounds: "Max. Runden",
    silenceThreshold: "Stille-Schwelle",
    decayPenalty: "Decay Penalty",
    model: "Modell",
    contributionLength: "Beitragslänge",
    lengthShort: "Kurz (Demo)",
    lengthNormal: "Normal",
    lengthLong: "Ausführlich",
    webSearch: "Web-Suche",
    // Debate
    loadingConfig: "Lade Konfiguration...",
    debateStarting: "Die Debatte beginnt gleich...",
    round: "Runde",
    intensity: "Redeintensität",
    waitingFirstRound: "Warte auf erste Runde...",
    pause: "Pause",
    resume: "Weiter",
    stop: "Stop",
    export: "Export",
    // Summary
    statistics: "Statistik",
    rounds: "Runden",
    contributions: "Beiträge",
    meetingProtocol: "Meeting-Protokoll",
    protocolLoading: "wird erstellt...",
    protocolCreating: "Protokoll wird erstellt...",
    protocolUnavailable: "Kein Protokoll verfügbar.",
    pdf: "PDF",
    // Export
    exportTopic: "Thema",
    exportGoal: "Ziel",
    exportParticipants: "Teilnehmer",
    exportRounds: "Runden",
    exportDate: "Datum",
    exportDiscussion: "Diskussion",
    // Login
    loginTitle: "AI Board Meeting",
    loginSubtitle: "Zugang nur für muehlemann+popp",
    loginAccessDenied: "Zugang nur mit @muehlemann-popp.ch E-Mail möglich.",
    loginError: "Anmeldung fehlgeschlagen. Bitte erneut versuchen.",
    loginButton: "Mit Google anmelden",
    loading: "Laden...",
    // Mode
    mode: "Modus",
    modeDebate: "Debatte",
    modeNegotiation: "Verhandlung",
    privateContextLabel: "Private Information",
    privateContextHelp: "Nur für diesen Agenten sichtbar (BATNA, Red Lines, versteckte Ziele)",
    walkedAway: "hat die Verhandlung verlassen",
    startNegotiation: "Verhandlung starten",
    negotiationEnded: "Verhandlung beendet",
    agreementStatus: "Einigungsstatus",
    keyTerms: "Vereinbarte Bedingungen",
    concessionsMade: "Zugeständnisse",
    unresolvedPoints: "Offene Punkte",
  },
  en: {
    // Setup
    appTitle: "AI Board Meeting",
    appSubtitle: "Configure the participants and start the debate",
    loadDefaults: "Load Defaults",
    scenario: "Scenario",
    customTopic: "Custom Topic",
    topic: "Discussion Topic",
    topicPlaceholder: "What should be discussed?",
    goal: "Goal",
    goalPlaceholder: "What should be the outcome?",
    context: "Background Context",
    contextHelp: "Provided to participants as background knowledge, but not shown on the debate screen.",
    contextPlaceholder: "What context should participants have?",
    participants: "Participants",
    parameters: "Parameters",
    startDebate: "Start Debate",
    addAgent: "Add Agent",
    name: "Name",
    role: "Role",
    color: "Color",
    character: "Character",
    // Parameters
    maxRounds: "Max. Rounds",
    silenceThreshold: "Silence Threshold",
    decayPenalty: "Decay Penalty",
    model: "Model",
    contributionLength: "Contribution Length",
    lengthShort: "Short (Demo)",
    lengthNormal: "Normal",
    lengthLong: "Detailed",
    webSearch: "Web Search",
    // Debate
    loadingConfig: "Loading configuration...",
    debateStarting: "The debate is about to begin...",
    round: "Round",
    intensity: "Speaking Intensity",
    waitingFirstRound: "Waiting for first round...",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    export: "Export",
    // Summary
    statistics: "Statistics",
    rounds: "Rounds",
    contributions: "Contributions",
    meetingProtocol: "Meeting Minutes",
    protocolLoading: "generating...",
    protocolCreating: "Minutes are being generated...",
    protocolUnavailable: "No minutes available.",
    pdf: "PDF",
    // Export
    exportTopic: "Topic",
    exportGoal: "Goal",
    exportParticipants: "Participants",
    exportRounds: "Rounds",
    exportDate: "Date",
    exportDiscussion: "Discussion",
    // Login
    loginTitle: "AI Board Meeting",
    loginSubtitle: "Access restricted to muehlemann+popp",
    loginAccessDenied: "Access only with @muehlemann-popp.ch email.",
    loginError: "Login failed. Please try again.",
    loginButton: "Sign in with Google",
    loading: "Loading...",
    // Mode
    mode: "Mode",
    modeDebate: "Debate",
    modeNegotiation: "Negotiation",
    privateContextLabel: "Private Information",
    privateContextHelp: "Only visible to this agent (BATNA, red lines, hidden goals)",
    walkedAway: "walked away from the negotiation",
    startNegotiation: "Start Negotiation",
    negotiationEnded: "Negotiation ended",
    agreementStatus: "Agreement Status",
    keyTerms: "Key Terms",
    concessionsMade: "Concessions Made",
    unresolvedPoints: "Unresolved Points",
  },
} as const;

export type TranslationKey = keyof typeof translations.de;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const browserLang = navigator.language.split("-")[0];
  return browserLang === "de" ? "de" : "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key],
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
