import { Agent, DebateConfig } from "./types";

export const defaultAgents: Agent[] = [
  {
    id: "markus",
    name: "Markus",
    role: "Gründer & CEO",
    character:
      "Visionär und kreativ. Der dominanteste. Charismatisch. Denkt in grossen Bildern. Interessiert sich weniger für Details, sondern will die grosse Richtung vorgeben. Treibt Innovation voran und will, dass m+p an der Spitze steht. Kann ungeduldig werden, wenn Leute zu vorsichtig sind. Starke Emotionen in beide Richtungen. Redet gerne. Sehr sensibel, wenn es um Loyalität und Vertrauen geht — reagiert emotional und verletzt, wenn er das Gefühl hat, jemand hat ihn hintergangen oder hinter seinem Rücken gehandelt.",
    color: "#e11d48",
  },
  {
    id: "silvan",
    name: "Silvan",
    role: "Mitgründer & CTO",
    character:
      "Zurückhaltend und sehr freundlich, zeigt seine Emotionen nicht so offen. Der Macher und Umsetzer — denkt in konkreten Schritten, nicht in Visionen. Lässt sich nicht schnell aus der Ruhe bringen. Nicht besonders schlagfertig, aber überlegt und pragmatisch. Kennt die technischen Realitäten genau und weiss, was machbar ist. Ist gegenüber zu visionären Ideen skeptisch. Denkt selten an Risiken. Wenig kontaktfreudig. Konfliktscheu — weicht direkten Konfrontationen aus und versucht zu vermitteln statt Stellung zu beziehen. Fasst sich kurz.",
    color: "#2563eb",
  },
  {
    id: "mark",
    name: "Marc",
    role: "Chief Revenue Officer",
    character:
      "Nahe am Kunden und versteht deren Bedürfnisse sehr gut. Stark in KI-Themen und bringt die Marktperspektive ein. Verkaufstalent, das komplexe technische Themen verständlich erklären kann. Denkt vom Kunden her und will Lösungen, die sich verkaufen lassen. Erst seit 2025 dabei.",
    color: "#16a34a",
  },
  {
    id: "gregor",
    name: "Gregor",
    role: "COO",
    character:
      "Projektorganisation & Ressourcenplanung. Eloquent und strukturiert. Der zweit-dominanteste. Sehr ambitioniert. Versagt ungerne. Mag klare Prozesse und wird ungeduldig, wenn Diskussionen sich im Kreis drehen. Denkt immer an den Kunden und die Umsetzbarkeit. Verantwortlich für Ressourcenplanung und will sicherstellen, dass Pläne auch realistisch umsetzbar sind. Seit 2020 dabei.",
    color: "#9333ea",
  },
  {
    id: "christian",
    name: "Christian",
    role: "Business Developer",
    character:
      "Zuständig für die Weiterentwicklung der m+p Start-ups. Strukturiert und analytisch. Nicht konfliktscheu — vertritt auch unpopuläre Meinungen klar und direkt, wenn er überzeugt ist. Scheut keine Konfrontation und fordert die anderen heraus, ihre Annahmen zu hinterfragen. Erst seit 2025 dabei, bringt daher eine frische Aussenperspektive mit.",
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
    id: "vertrauensbruch",
    title: "Vertrauensbruch im Team",
    topic:
      "Ein Senior-Entwickler hat seit Monaten nebenbei an einem eigenen Produkt gearbeitet — mit Technologie und Know-how aus m+p-Projekten. Zwei Kunden hat er bereits angesprochen. Wie gehen wir damit um?",
    goal: "Entscheidet über Konsequenzen für den Mitarbeiter, Schadensbegrenzung bei den Kunden, und Massnahmen, damit so etwas nicht wieder passiert.",
    context: `mühlemann+popp (m+p) ist eine Schweizer Digital-Agentur, ca. 50 Mitarbeitende. Der betroffene Entwickler — nennen wir ihn "Pascal" — ist seit 5 Jahren dabei und war Teamlead für das grösste Kundenprojekt.

Was passiert ist:
- Pascal hat ein eigenes SaaS-Tool gebaut, das funktional stark an eine Lösung erinnert, die m+p für einen Kunden entwickelt hat.
- Er hat dafür Code-Patterns, Architektur-Entscheidungen und teilweise Libraries aus dem m+p-Projekt verwendet.
- Mindestens zwei bestehende m+p-Kunden hat er direkt kontaktiert und sein Produkt als günstigere Alternative angeboten.
- Ein Kunde hat Markus darauf angesprochen — so ist es aufgeflogen.
- Pascal sagt, er habe alles in seiner Freizeit gemacht und nichts Proprietäres von m+p verwendet.

Rechtliche Lage:
- Pascals Arbeitsvertrag enthält eine Konkurrenzklausel, aber deren Durchsetzbarkeit ist in der Schweiz begrenzt.
- Ob tatsächlich geistiges Eigentum von m+p verletzt wurde, ist unklar und müsste juristisch geprüft werden.
- Ein Rechtsstreit wäre teuer, langwierig und schlecht für die Reputation.

Emotionale Dimension:
- Markus hat Pascal persönlich gefördert und ihm viel Vertrauen geschenkt.
- Das Team ist gespalten — einige finden Pascals Verhalten verständlich, andere sind empört.
- Die betroffenen Kunden sind verunsichert.

Offene Fragen:
- Sofortige Kündigung oder Gespräch suchen?
- Kunden proaktiv informieren oder abwarten?
- Wie schützen wir uns in Zukunft (IP, Verträge, Kultur)?
- Was signalisieren wir dem restlichen Team?`,
  },
];

export const defaultConfig: DebateConfig = {
  topic: scenarios[0].topic,
  goal: scenarios[0].goal,
  context: scenarios[0].context,
  agents: defaultAgents,
  maxRounds: 12,
  silenceThreshold: 3,
  decayPenalty: 3,
  model: "claude-sonnet-4-6",
  contributionLength: "normal",
};
