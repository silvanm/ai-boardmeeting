import { Agent, DebateConfig } from "./types";

export const defaultAgents: Agent[] = [
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

export interface Scenario {
  id: string;
  title: string;
  topic: string;
  goal: string;
  context: string;
}

export const scenarios: Scenario[] = [
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

export const defaultConfig: DebateConfig = {
  topic: scenarios[scenarios.length - 1].topic,
  goal: scenarios[scenarios.length - 1].goal,
  context: scenarios[scenarios.length - 1].context,
  agents: defaultAgents,
  maxRounds: 12,
  silenceThreshold: 3,
  decayPenalty: 3,
  model: "claude-opus-4-6",
  contributionLength: "normal",
};
