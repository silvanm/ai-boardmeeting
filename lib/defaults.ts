import { Agent, DebateConfig } from "./types";
import { Locale } from "./i18n";

export const defaultAgentsDe: Agent[] = [
  {
    id: "markus",
    name: "Markus",
    role: "VR-Präsident & Gründer",
    character:
      "Visionär und kreativ. Der dominanteste im Gremium. Charismatisch. Denkt in grossen Bildern. Interessiert sich weniger für Details, sondern will die strategische Richtung vorgeben. Treibt Innovation voran und will, dass das Unternehmen an der Spitze steht. Kann ungeduldig werden, wenn Leute zu vorsichtig sind. Starke Emotionen in beide Richtungen. Redet gerne. Sehr sensibel, wenn es um Loyalität und Vertrauen geht.",
    color: "#e11d48",
  },
  {
    id: "silvan",
    name: "Silvan",
    role: "VR-Mitglied & Mitgründer (Technologie)",
    character:
      "Zurückhaltend und sehr freundlich, zeigt seine Emotionen nicht so offen. Denkt in konkreten Schritten, nicht in Visionen. Lässt sich nicht schnell aus der Ruhe bringen. Überlegt und pragmatisch. Kennt die technischen Realitäten genau und weiss, was machbar ist. Ist gegenüber zu visionären Ideen skeptisch. Hinterfragt technische Machbarkeit und Implementierungsrisiken. Konfliktscheu — weicht direkten Konfrontationen aus und versucht zu vermitteln statt Stellung zu beziehen. Fasst sich kurz.",
    color: "#2563eb",
  },
  {
    id: "mark",
    name: "Marc",
    role: "VR-Mitglied (Markt & Vertrieb)",
    character:
      "Nahe am Markt und versteht Kundenbedürfnisse sehr gut. Stark in KI-Themen und bringt die Marktperspektive ein. Kann komplexe technische Themen verständlich erklären. Denkt vom Kunden her und hinterfragt den Marktnutzen jeder Investition. Seit 2025 im Verwaltungsrat.",
    color: "#16a34a",
  },
  {
    id: "gregor",
    name: "Gregor",
    role: "VR-Mitglied (Operations & Finanzen)",
    character:
      "Eloquent und strukturiert. Der zweit-dominanteste im Gremium. Übernimmt oft die Moderatorenrolle — fasst Zwischenstände zusammen und bringt die Diskussion zurück auf den Punkt, wenn sie abdriftet. Sehr ambitioniert. Versagt ungerne. Mag klare Prozesse und wird ungeduldig, wenn Diskussionen sich im Kreis drehen. Fokussiert auf finanzielle Tragbarkeit und operative Umsetzbarkeit. Will sicherstellen, dass Investitionen realistisch budgetiert und umsetzbar sind. Seit 2020 im Verwaltungsrat.",
    color: "#9333ea",
  },
  {
    id: "christian",
    name: "Christian",
    role: "VR-Mitglied (Business Development)",
    character:
      "Strukturiert und analytisch. Nicht konfliktscheu — vertritt auch unpopuläre Meinungen klar und direkt, wenn er überzeugt ist. Scheut keine Konfrontation und fordert die anderen heraus, ihre Annahmen zu hinterfragen. Seit 2025 im Verwaltungsrat, bringt daher eine frische Aussenperspektive mit.",
    color: "#ea580c",
  },
];

export const defaultAgentsEn: Agent[] = [
  {
    id: "markus",
    name: "Markus",
    role: "Chairman & Founder",
    character:
      "Visionary and creative. The most dominant on the board. Charismatic. Thinks in big pictures. Less interested in details, wants to set the strategic direction. Drives innovation and wants the company to be at the forefront. Can become impatient when people are too cautious. Strong emotions in both directions. Talks a lot. Very sensitive about loyalty and trust.",
    color: "#e11d48",
  },
  {
    id: "silvan",
    name: "Silvan",
    role: "Board Member & Co-Founder (Technology)",
    character:
      "Reserved and very friendly, doesn't show emotions openly. Thinks in concrete steps, not visions. Hard to rattle. Deliberate and pragmatic. Knows the technical realities and what's feasible. Skeptical of overly visionary ideas. Questions technical feasibility and implementation risks. Conflict-averse — avoids direct confrontation and tries to mediate rather than take sides. Keeps it brief.",
    color: "#2563eb",
  },
  {
    id: "mark",
    name: "Marc",
    role: "Board Member (Market & Sales)",
    character:
      "Close to the market and understands customer needs very well. Strong on AI topics and brings the market perspective. Can explain complex technical topics in plain language. Thinks from the customer's perspective and questions the market value of every investment. On the board since 2025.",
    color: "#16a34a",
  },
  {
    id: "gregor",
    name: "Gregor",
    role: "Board Member (Operations & Finance)",
    character:
      "Eloquent and structured. The second most dominant on the board. Often takes the moderator role — summarizes interim results and brings the discussion back on track when it drifts. Very ambitious. Hates to fail. Likes clear processes and gets impatient when discussions go in circles. Focused on financial viability and operational feasibility. Wants to ensure investments are realistically budgeted. On the board since 2020.",
    color: "#9333ea",
  },
  {
    id: "christian",
    name: "Christian",
    role: "Board Member (Business Development)",
    character:
      "Structured and analytical. Not afraid of conflict — expresses unpopular opinions clearly and directly when convinced. Doesn't shy away from confrontation and challenges others to question their assumptions. On the board since 2025, brings a fresh outside perspective.",
    color: "#ea580c",
  },
];

export interface Scenario {
  id: string;
  title: string;
  topic: string;
  goal: string;
  context: string;
}

export const scenariosDe: Scenario[] = [
  {
    id: "ki-programmierer",
    title: "KI ersetzt Programmierer",
    topic:
      "Die Programmierer werden immer mehr von KI abgelöst, und wir suchen nach den besten Lösungen, um dem zu begegnen.",
    goal: "Findet eine konkrete Strategie, wie m+p sich positionieren soll: Welche Rollen verändern sich, welche neuen Kompetenzen brauchen wir, und was sind die nächsten Schritte?",
    context: `mühlemann+popp (m+p) ist eine Schweizer Digital-Agentur mit Sitz in Zürich, gegründet 2010. Rund 50 Mitarbeitende in der Schweiz und Osteuropa. Kerngeschäft: Strategieberatung, Design, Softwareentwicklung, AI-Lösungen und Infrastruktur für Kunden in Healthcare, Finance und Industrie.

Aktuelle Situation:
- AI-Coding-Tools wie GitHub Copilot, Cursor und Claude Code verändern die Softwareentwicklung fundamental.
- Junior-Entwickler werden weniger benötigt, Senior-Entwickler werden produktiver.
- Kunden fragen sich, ob sie noch gleich viel für Entwicklung bezahlen sollen.
- m+p hat ein starkes Entwicklerteam in Osteuropa — dieses Modell ist durch AI-Coding besonders betroffen.
- Gleichzeitig wächst die Nachfrage nach AI-Beratung und AI-Integration.`,
  },
  {
    id: "saas-investment",
    title: "Investment in SaaS-Produkte",
    topic:
      "Sollen wir als m+p in eigene SaaS-Produkte investieren?",
    goal: "Entscheidet, ob m+p eigene SaaS-Produkte bauen soll, und wenn ja, in welchem Bereich und mit welcher Strategie. Definiert konkrete nächste Schritte.",
    context: `mühlemann+popp (m+p) ist eine Schweizer Digital-Agentur mit Sitz in Zürich, ca. 50 Mitarbeitende. Kerngeschäft ist Beratung und Softwareentwicklung für Kunden. m+p ist KEIN Silicon-Valley-Startup — es gibt keinen VC-Funding, keine Burn-Rate-Mentalität. Jede Investition muss aus dem laufenden Geschäft finanziert oder sehr gezielt aufgenommen werden.

Erfolgsbeispiel: SOBRADO — m+p hat SOBRADO als Prozessautomatisierungs-Tool für Broker und Versicherer entwickelt. SOBRADO wurde zum führenden Produkt in seiner Nische in der Schweiz. Das zeigt, dass m+p SaaS-Produkte erfolgreich bauen KANN.

Herausforderung Agentur vs. Produkt:
- Agenturgeschäft bringt sofortigen Cashflow, aber skaliert linear (mehr Leute = mehr Umsatz).
- SaaS-Produkte brauchen Vorinvestition, skalieren aber exponentiell bei Erfolg.
- Entwicklerzeit, die ins Produkt fliesst, fehlt im Agenturgeschäft — Opportunitätskosten sind real.
- m+p hat begrenzte Ressourcen und muss priorisieren.

Der Einfluss von KI auf SaaS:
- KI senkt die Entwicklungskosten für SaaS massiv — ein kleines Team kann heute bauen, wofür früher 20 Leute nötig waren.
- Gleichzeitig senkt KI auch die Eintrittsbarrieren: Mehr Wettbewerber können schneller SaaS-Produkte launchen.
- Bestehende SaaS-Produkte werden durch KI-Features aufgewertet oder durch KI-native Alternativen bedroht.
- Vertikale SaaS-Nischen (wie SOBRADO) sind widerstandsfähiger gegen KI-Disruption als horizontale Tools.
- "AI-Wrapper"-Produkte (dünne Schicht über GPT/Claude) haben kaum dauerhafte Differenzierung.

Schweizer Markt:
- Kleinerer Markt, aber höhere Zahlungsbereitschaft und stärkere Kundenbindung.
- Regulatorische Anforderungen (Datenschutz, Compliance) können Differenzierungsmerkmal sein.
- Vertrauen und Nähe zum Kunden sind Wettbewerbsvorteile gegenüber US-Produkten.
- Mehrsprachigkeit (DE/FR/IT) als natürliche Barriere für ausländische Konkurrenz.`,
  },
  {
    id: "hypotheken-matching",
    title: "KI-gestütztes Hypotheken-Matching",
    topic:
      "Die GL der FinLink AG beantragt CHF 620'000 für ein KI-gestütztes Hypotheken-Matching-System. Welche 5 kritischen Fragen muss der VR stellen?",
    goal: "Euer konkreter Output: Formuliert genau 5 kritische Fragen, die ihr als Verwaltungsrat der Geschäftsleitung stellen wollt, um diesen KI-Investitionsantrag zu validieren. Nummeriert die Fragen von 1 bis 5. Jede Frage soll scharf und konkret sein — keine allgemeinen Floskeln. Berücksichtigt dabei Pilotresultate, Risiken, regulatorische Aspekte und strategische Implikationen.",
    context: `Die FinLink AG (CHF 25 Mio. Umsatz, 85 MA) ist eine digitale Hypothekenvermittlerin, die Privatkunden mit über 120 Kreditgebern (Banken, Versicherungen, Pensionskassen) vernetzt. Pro Jahr werden rund 4'500 Hypothekenanfragen bearbeitet. Der Kernprozess — Kundendaten aufnehmen, Tragbarkeit berechnen, passende Anbieter auswählen und Offerten einholen — dauert heute im Schnitt 6,5 Stunden pro Dossier und wird von Hypothekarberater:innen manuell durchgeführt.

Die Herausforderungen:
- In 18% der Fälle werden Dossiers von Kreditgebern wegen unvollständiger oder inkonsistenter Unterlagen zurückgewiesen — das kostet im Schnitt 2,4 Stunden Nacharbeit pro Fall und verzögert den Abschluss um 5–8 Arbeitstage.
- Berater:innen schaffen es aktuell nur, pro Dossier 8–12 Anbieter systematisch zu vergleichen, obwohl das Netzwerk 120 umfasst. Kunden erhalten damit nicht garantiert das optimale Angebot.

Die GL möchte ein KI-gestütztes Matching- und Dossier-System einführen:
1. Automatische Extraktion und Validierung von Kundendokumenten (Lohnausweise, Steuerunterlagen, Grundbuchauszüge)
2. Intelligentes Matching über alle 120 Kreditgeber auf Basis von Tragbarkeit, Kundenkriterien und historischen Annahme-Wahrscheinlichkeiten
3. Automatische Generierung eines vollständigen, einreichfähigen Dossiers pro Kreditgeber

Pilotresultate (200 Dossiers, 3 Monate):
- 55% weniger Bearbeitungszeit
- Rückweisungsquote sank von 18% auf 4%
- Durchschnittlicher Zinsvorteil für Kunden stieg um 12 Basispunkte (weil mehr Anbieter verglichen wurden)
- ABER: Der Pilot wurde nur mit Standardfällen durchgeführt (Eigentumswohnungen, Festanstellung, Schweizer Staatsbürger). Komplexe Fälle wie Selbständige, Renovierungen/Neubauten oder Auslandschweizer wurden nicht getestet.

Investition: CHF 620'000 (Entwicklung, Systemintegration, Training)
Laufende Kosten: ca. CHF 95'000/Jahr (API-Gebühren, Wartung, Normenpflege)

Ihre Rolle: Sie sitzen im Verwaltungsrat. Die GL beantragt heute die Freigabe.`,
  },
];

export const scenariosEn: Scenario[] = [
  {
    id: "ai-replaces-developers",
    title: "AI Replaces Developers",
    topic:
      "Developers are increasingly being replaced by AI, and we need to find the best strategies to address this.",
    goal: "Develop a concrete strategy for how the company should position itself: Which roles are changing, what new competencies do we need, and what are the next steps?",
    context: `TechForward AG is a Swiss digital agency based in Zurich, founded in 2010. Around 50 employees in Switzerland and Eastern Europe. Core business: strategy consulting, design, software development, AI solutions and infrastructure for clients in healthcare, finance and industry.

Current situation:
- AI coding tools like GitHub Copilot, Cursor and Claude Code are fundamentally changing software development.
- Junior developers are less needed, senior developers are becoming more productive.
- Clients are questioning whether they should still pay the same for development.
- The company has a strong development team in Eastern Europe — this model is particularly affected by AI coding.
- At the same time, demand for AI consulting and AI integration is growing.`,
  },
  {
    id: "saas-investment",
    title: "Investment in SaaS Products",
    topic:
      "Should we invest in building our own SaaS products?",
    goal: "Decide whether the company should build its own SaaS products, and if so, in which area and with what strategy. Define concrete next steps.",
    context: `TechForward AG is a Swiss digital agency based in Zurich, around 50 employees. Core business is consulting and software development for clients. This is NOT a Silicon Valley startup — there is no VC funding, no burn-rate mentality. Every investment must be funded from ongoing business or very specifically raised.

Success story: The company developed a process automation tool for brokers and insurers that became the leading product in its niche in Switzerland. This shows the company CAN successfully build SaaS products.

Challenge Agency vs. Product:
- Agency business brings immediate cash flow but scales linearly (more people = more revenue).
- SaaS products require upfront investment but scale exponentially if successful.
- Developer time spent on products is missing from agency work — opportunity costs are real.
- Limited resources require prioritization.

The impact of AI on SaaS:
- AI drastically reduces SaaS development costs — a small team can now build what used to require 20 people.
- At the same time, AI lowers barriers to entry: more competitors can launch SaaS products faster.
- Existing SaaS products are enhanced by AI features or threatened by AI-native alternatives.
- Vertical SaaS niches are more resilient against AI disruption than horizontal tools.
- "AI wrapper" products (thin layer over GPT/Claude) have little lasting differentiation.`,
  },
  {
    id: "mortgage-matching",
    title: "AI-Powered Mortgage Matching",
    topic:
      "Management is requesting CHF 620,000 for an AI-powered mortgage matching system. What 5 critical questions must the board ask?",
    goal: "Your concrete output: Formulate exactly 5 critical questions that you as a board want to ask management to validate this AI investment proposal. Number the questions from 1 to 5. Each question should be sharp and specific — no generic platitudes. Consider pilot results, risks, regulatory aspects and strategic implications.",
    context: `FinLink AG (CHF 25M revenue, 85 employees) is a digital mortgage broker connecting private clients with over 120 lenders (banks, insurance companies, pension funds). Around 4,500 mortgage applications are processed per year. The core process — collecting client data, calculating affordability, selecting suitable providers and obtaining quotes — currently takes an average of 6.5 hours per dossier and is done manually by mortgage advisors.

The challenges:
- In 18% of cases, dossiers are rejected by lenders due to incomplete or inconsistent documentation — costing an average of 2.4 hours of rework per case and delaying completion by 5-8 business days.
- Advisors currently manage to systematically compare only 8-12 providers per dossier, although the network has 120. Clients are therefore not guaranteed the optimal offer.

Management wants to introduce an AI-powered matching and dossier system:
1. Automatic extraction and validation of client documents (pay slips, tax records, land registry extracts)
2. Intelligent matching across all 120 lenders based on affordability, client criteria and historical acceptance probabilities
3. Automatic generation of a complete, submission-ready dossier per lender

Pilot results (200 dossiers, 3 months):
- 55% less processing time
- Rejection rate dropped from 18% to 4%
- Average interest rate advantage for clients increased by 12 basis points (because more providers were compared)
- HOWEVER: The pilot was only conducted with standard cases (condominiums, permanent employment, Swiss citizens). Complex cases such as self-employed, renovations/new builds or Swiss abroad were not tested.

Investment: CHF 620,000 (development, system integration, training)
Ongoing costs: approx. CHF 95,000/year (API fees, maintenance, regulatory updates)

Your role: You sit on the board of directors. Management is requesting approval today.`,
  },
];

export function getDefaultAgents(locale: Locale): Agent[] {
  return locale === "en" ? defaultAgentsEn : defaultAgentsDe;
}

export function getScenarios(locale: Locale): Scenario[] {
  return locale === "en" ? scenariosEn : scenariosDe;
}

export function getDefaultConfig(locale: Locale): DebateConfig {
  const scenarios = getScenarios(locale);
  const agents = getDefaultAgents(locale);
  const last = scenarios[scenarios.length - 1];
  return {
    topic: last.topic,
    goal: last.goal,
    context: last.context,
    agents,
    maxRounds: 12,
    silenceThreshold: 3,
    decayPenalty: 3,
    model: "claude-opus-4-6",
    contributionLength: "normal",
    webSearch: false,
    locale,
  };
}

// Legacy exports for compatibility
export const defaultAgents = defaultAgentsDe;
export const scenarios = scenariosDe;
export const defaultConfig = getDefaultConfig("de");
