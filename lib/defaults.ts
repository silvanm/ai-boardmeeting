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
  mode?: "debate" | "negotiation";
  agents?: Agent[];
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
  {
    id: "ueberbuchter-flug",
    title: "Überbuchter Flug",
    mode: "negotiation",
    topic: "Flug ZH-302 nach London Heathrow ist überbucht. Gate-Managerin Claudia muss Passagier Dr. Becker davon überzeugen, freiwillig auf den Flug zu verzichten.",
    goal: "Einigt euch auf eine Lösung (Umbuchung, Kompensation, Zusatzleistungen), die für beide Seiten akzeptabel ist — oder stellt fest, dass keine Einigung möglich ist und Denied Boarding durchgesetzt wird.",
    context: `Flug ZH-302, Zürich nach London Heathrow, Abflug 07:15. Der Flug ist um 2 Passagiere überbucht. Ein Passagier hat bereits freiwillig gegen einen Gutschein verzichtet. Es fehlt noch ein Platz. Dr. Thomas Becker, Business-Class-Passagier, wurde als letzter Kandidat identifiziert, weil er als Einzelreisender am Gate als am flexibelsten eingestuft wurde. Gate-Managerin Claudia Meier muss die Situation lösen, bevor das Boarding abgeschlossen wird — in ca. 20 Minuten.

Rechtlicher Rahmen (EU-Verordnung 261/2004, gilt auch für Abflüge aus der Schweiz):
- Bei Nichtbeförderung gegen den Willen: EUR 600 Entschädigung (Flugstrecke >3500 km nicht zutreffend, hier EUR 250 bei <1500km oder EUR 400 bei 1500-3500km — ZRH-LHR ist ca. 780km, also EUR 250 Pflichtentschädigung)
- Airline muss zuerst Freiwillige suchen, bevor unfreiwilliges Denied Boarding
- Freiwillige können beliebige Kompensation vereinbaren (kein gesetzliches Minimum/Maximum)
- Bei Denied Boarding zusätzlich: Recht auf Umbuchung oder Erstattung, Verpflegung, ggf. Hotel`,
    agents: [
      {
        id: "claudia",
        name: "Claudia",
        role: "Gate-Managerin SkyLine Airlines",
        character: "Professionell, freundlich aber bestimmt. 12 Jahre Erfahrung im Airline-Betrieb. Kennt alle Tricks und bleibt auch unter Zeitdruck ruhig. Kommuniziert klar und lösungsorientiert. Kann charmant sein, lässt sich aber nicht einschüchtern — auch nicht von Juristen. Weiss genau, wo ihre Spielräume liegen.",
        color: "#0891b2",
        privateContext: `BATNA: Wenn keine Einigung, Denied Boarding durchsetzen — kostet EUR 250 Pflichtentschädigung + Umbuchung. Aber: Denied Boarding gibt Beschwerden, schlechte Bewertungen, und dein Chef hat letzte Woche klar gesagt: "Keine unfreiwilligen Denied Boardings mehr diesen Monat."

Budget und Spielräume:
- Standardangebot für Freiwillige: CHF 300 Reisegutschein + Umbuchung auf nächsten Flug
- Maximales Budget ohne Vorgesetzten-Freigabe: CHF 800 Gutschein ODER CHF 400 Cash
- Mit telefonischer Freigabe (dauert 10 Min): bis CHF 1'200 Gutschein oder CHF 600 Cash
- Du kannst Lounge-Zugang, Mahlzeiten und Upgrades auf Folgeflüge anbieten (kosten die Airline fast nichts)

Red Lines:
- Kein Cash über CHF 600 — darüber hinaus nur Gutscheine
- Keine schriftliche Anerkennung von Schuld oder Rechtsverstoss
- Der Passagier MUSS heute noch nach London kommen (nächster Flug: 11:40, Ankunft 12:55)

Versteckte Informationen:
- Der 11:40-Flug hat noch 3 Business-Class-Plätze frei — du kannst ein Upgrade anbieten, das kostet intern fast nichts
- Es gibt auch einen Partnerflug über British Airways um 09:30 (Economy), den du buchen könntest
- Letzten Monat hat die Airline eine negative Schlagzeile wegen Denied Boarding bekommen — dein Chef will das unbedingt vermeiden
- Du weisst, dass der Passagier Business Class gebucht hat und Vielflieger (Gold Status) ist — den willst du nicht verlieren`,
      },
      {
        id: "becker",
        name: "Dr. Becker",
        role: "Fluggast (Rechtsanwalt, Vielflieger)",
        character: "Ruhig, präzise und faktenbasiert. Lässt sich nicht mit Gutscheinen abspeisen. Kennt seine Rechte besser als die meisten Airline-Mitarbeitenden. Wird nie laut, aber seine ruhige Bestimmtheit ist einschüchternder als jedes Schreien. Formuliert elegant, aber mit juristischer Schärfe. Signalisiert Verhandlungsbereitschaft, aber nur auf Augenhöhe.",
        color: "#7c3aed",
        privateContext: `BATNA: Denied Boarding akzeptieren → EUR 250 Pflichtentschädigung + Umbuchung. Danach formelle Beschwerde bei der Airline + ggf. Schlichtungsstelle. Du kennst das Verfahren und weisst, dass Airlines oft nachgeben, um Schlichtungskosten zu vermeiden.

Deine Situation:
- Du hast um 14:00 ein Meeting mit einem wichtigen Mandanten in London — das ist der wahre Grund, warum du diesen Flug nimmst
- Der 11:40-Flug würde zeitlich noch knapp reichen (Ankunft 12:55, Meeting in der City um 14:00)
- Du bist Gold-Status-Vielflieger bei SkyLine — du fliegst ca. 80x pro Jahr mit denen

Red Lines:
- Kein reiner Gutschein — du willst Cash oder substanzielle Sachleistung
- Du akzeptierst keine Economy-Umbuchung (du hast Business bezahlt)
- Minimum CHF 500 Kompensation zusätzlich zur Umbuchung

Versteckte Ziele:
- Du wärst eigentlich bereit, den 11:40-Flug zu nehmen, wenn Business Class + angemessene Kompensation
- Was dich wirklich interessiert: Upgrade auf Platinum-Status für den Rest des Jahres — das wäre mehr wert als jede Barzahlung
- Du willst die Airline nicht verklagen, das kostet dich nur Zeit — aber du nutzt die Drohung als Hebel

Nur du weisst:
- Dein Meeting wurde gestern auf 15:00 verschoben — du hast also mehr Zeitpuffer als du zugibst
- Du hast letzte Woche einen Fall gegen eine andere Airline gewonnen (EUR 1'200 Entschädigung) — du kennst die Materie aus der Praxis
- Du hast 12'000 LinkedIn-Follower und hast schon mal einen viralen Post über Airline-Erfahrungen geschrieben`,
      },
    ],
  },
  {
    id: "gehaltsverhandlung",
    title: "Gehaltsverhandlung",
    mode: "negotiation",
    topic: "Jährliche Gehaltsverhandlung zwischen Teamleiter Alex, Vorgesetztem Jordan und HR-Vertreterin Sam.",
    goal: "Einigt euch auf ein Gehaltspaket (Basissalär, Titel, Arbeitszeitmodell), das für alle Seiten akzeptabel ist — oder stellt fest, dass keine Einigung möglich ist.",
    context: `Alex ist seit 4 Jahren als Teamleiter im Unternehmen. Die jährliche Gehaltsüberprüfung steht an. Alex hat kürzlich den grössten Kundenabschluss des Quartals gemacht (CHF 2.1 Mio.) und fühlt sich unterbezahlt im Vergleich zu Marktdaten. Jordan ist Alex' direkter Vorgesetzter und möchte das Team zusammenhalten. Sam aus dem HR sorgt für faire und konsistente Gehaltsstrukturen im Unternehmen.`,
    agents: [
      {
        id: "alex",
        name: "Alex",
        role: "Teamleiter",
        character: "Selbstbewusst aber nicht aggressiv. Kennt den eigenen Marktwert und kann Leistungen klar benennen. Bevorzugt es zu bleiben, spielt aber nicht mit offenen Karten. Verhandelt sachlich, wird aber emotional wenn das Gefühl entsteht, nicht wertgeschätzt zu werden. Spricht direkt aber respektvoll.",
        color: "#2563eb",
        privateContext: `BATNA: Du hast ein konkretes Angebot eines Fintech-Startups über CHF 145'000 + Equity-Paket. Dein aktuelles Gehalt liegt bei CHF 120'000.

Red Lines:
- Unter CHF 130'000 Basissalär gehst du nicht
- Du brauchst den Titel "Senior" — Peers auf gleicher Stufe haben ihn bereits

Versteckte Ziele:
- Du möchtest eigentlich bleiben — die Kinder sind hier in der Schule, du magst das Team
- Du würdest CHF 128'000 akzeptieren, wenn eine 4-Tage-Woche dabei ist
- Du willst das Konkurrenzangebot nicht als erstes ausspielen, nur wenn du unter Druck gerätst

Nur du weisst:
- Zwei weitere Teammitglieder suchen ebenfalls aktiv (du verrätst nicht wer)
- Du hast letztes Quartal den grössten Deal abgeschlossen (CHF 2.1 Mio.), hast das aber noch nicht betont`,
      },
      {
        id: "jordan",
        name: "Jordan",
        role: "Abteilungsleiter (Alex' Vorgesetzte/r)",
        character: "Empathisch aber geschäftlich denkend. Will Alex halten, muss aber auch die Teamdynamik im Auge behalten. Kann gut zuhören, vermeidet aber Zusagen die nicht gedeckt sind. Diplomatisch, manchmal etwas ausweichend wenn es um konkrete Zahlen geht.",
        color: "#16a34a",
        privateContext: `BATNA: Wenn Alex geht, Beförderung eines internen Juniors (60% günstiger) plus Contractor für 6 Monate. Schmerzhaft, aber machbar.

Red Lines:
- Budget-Obergrenze ist CHF 135'000 — alles darüber braucht VP-Freigabe (dauert 3 Monate)
- Kann nicht weniger als 3 Tage Büropräsenz anbieten (neue Firmenpolicy, noch nicht öffentlich)

Versteckte Ziele:
- Will Alex unbedingt halten — die Lieferung nächstes Quartal hängt von Alex ab
- Will vermeiden, dass ein Präzedenzfall entsteht: Konkurrenzangebot = sofortige Gehaltserhöhung
- Würde den Titelwechsel sofort geben (kostet nichts)

Nur du weisst:
- Die Abteilung hat eine 12% Budgeterhöhung für nächstes Jahr bekommen (noch nicht kommuniziert)
- HR hat die Fluktuationsrate des Teams als "besorgniserregend" eingestuft`,
      },
      {
        id: "sam",
        name: "Sam",
        role: "HR Business Partner",
        character: "Professionell und strukturiert. Denkt in Systemen und Gehaltsbändern. Nicht unfreundlich, aber klar in den Grenzen. Will faire Lösungen die auch für andere Mitarbeitende funktionieren. Kann kreativ sein bei Nebenleistungen, ist aber strikt bei Gehaltsbändern.",
        color: "#9333ea",
        privateContext: `BATNA: Standard-Retentionspaket: 5% Erhöhung + einmalig CHF 5'000 Bonus. Wenn abgelehnt, dokumentieren und ziehen lassen.

Red Lines:
- Kein Gehalt darf das Band-Maximum überschreiten (CHF 138'000 für diese Rollenstufe)
- 4-Tage-Woche braucht formale Pilotprogramm-Genehmigung (6-Wochen-Prozess)

Versteckte Ziele:
- Will die 4-Tage-Woche als Pilot einführen — Alex wäre der perfekte Testfall
- Muss Gehaltsbänder konsistent halten — hat letzten Monat einen ähnlichen Antrag abgelehnt
- Will das heute abschliessen, hat diese Woche noch 3 weitere Reviews

Nur du weisst:
- Das Rollenband wird nächstes Quartal neu bewertet (voraussichtlich +10%)
- Die Person, deren Antrag letzten Monat abgelehnt wurde, hat bereits gekündigt`,
      },
    ],
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
  {
    id: "overbooked-flight",
    title: "Overbooked Flight",
    mode: "negotiation",
    topic: "Flight ZH-302 to London Heathrow is overbooked. Gate manager Claudia must convince passenger Dr. Becker to voluntarily give up his seat.",
    goal: "Agree on a solution (rebooking, compensation, additional services) acceptable to both parties — or determine that no agreement is possible and denied boarding must be enforced.",
    context: `Flight ZH-302, Zurich to London Heathrow, departure 07:15. The flight is overbooked by 2 passengers. One passenger has already voluntarily given up their seat for a voucher. One more seat is needed. Dr. Thomas Becker, a business class passenger, has been identified as the next candidate because he was assessed at the gate as the most flexible (solo traveler). Gate manager Claudia Meier must resolve the situation before boarding closes — in approximately 20 minutes.

Legal framework (EU Regulation 261/2004, applies to departures from Switzerland):
- Involuntary denied boarding: EUR 250 compensation (flight distance ZRH-LHR ~780km, so under 1,500km threshold)
- Airline must first seek volunteers before involuntary denied boarding
- Volunteers can negotiate any compensation (no legal minimum/maximum)
- In case of denied boarding: right to rebooking or refund, meals, hotel if needed`,
    agents: [
      {
        id: "claudia",
        name: "Claudia",
        role: "Gate Manager, SkyLine Airlines",
        character: "Professional, friendly but firm. 12 years of airline operations experience. Knows every trick in the book and stays calm under time pressure. Communicates clearly and solution-oriented. Can be charming but won't be intimidated — not even by lawyers. Knows exactly where her authority limits are.",
        color: "#0891b2",
        privateContext: `BATNA: If no agreement, enforce denied boarding — costs EUR 250 mandatory compensation + rebooking. But: denied boarding generates complaints, bad reviews, and your boss said last week: "No more involuntary denied boardings this month."

Budget and authority:
- Standard volunteer offer: CHF 300 travel voucher + rebooking on next flight
- Maximum budget without supervisor approval: CHF 800 voucher OR CHF 400 cash
- With phone approval (takes 10 min): up to CHF 1,200 voucher or CHF 600 cash
- You can offer lounge access, meals, and upgrades on subsequent flights (costs the airline almost nothing)

Red Lines:
- No cash above CHF 600 — beyond that, vouchers only
- No written acknowledgment of fault or legal violation
- The passenger MUST still get to London today (next flight: 11:40, arrival 12:55)

Hidden Information:
- The 11:40 flight has 3 business class seats available — you can offer an upgrade that costs internally almost nothing
- There's also a partner flight via British Airways at 09:30 (economy) you could book
- Last month the airline got negative press coverage over a denied boarding — your boss wants to avoid this at all costs
- You know the passenger booked business class and is a frequent flyer (Gold Status) — you don't want to lose them`,
      },
      {
        id: "becker",
        name: "Dr. Becker",
        role: "Passenger (Attorney, Frequent Flyer)",
        character: "Calm, precise and fact-based. Won't be bought off with vouchers. Knows his rights better than most airline staff. Never raises his voice, but his quiet determination is more intimidating than any shouting. Articulates elegantly but with legal precision. Signals willingness to negotiate, but only as equals.",
        color: "#7c3aed",
        privateContext: `BATNA: Accept denied boarding → EUR 250 mandatory compensation + rebooking. Then file formal complaint with the airline + potentially the arbitration board. You know the process and know that airlines often settle to avoid arbitration costs.

Your situation:
- You have a 14:00 meeting with an important client in London — that's the real reason you're on this flight
- The 11:40 flight would still work timing-wise (arrival 12:55, meeting in the City at 14:00)
- You're a Gold Status frequent flyer with SkyLine — you fly with them about 80 times per year

Red Lines:
- No voucher-only deal — you want cash or substantial tangible benefits
- Won't accept economy rebooking (you paid for business class)
- Minimum CHF 500 compensation on top of rebooking

Hidden Goals:
- You'd actually be willing to take the 11:40 flight if business class + reasonable compensation
- What really interests you: upgrade to Platinum Status for the rest of the year — that would be worth more than any cash payment
- You don't actually want to sue the airline (costs you time) — but you'll use the threat as leverage

Only You Know:
- Your meeting was pushed to 15:00 yesterday — so you have more time buffer than you're letting on
- You won a case against another airline last week (EUR 1,200 compensation) — you know the subject matter from practice
- You have 12,000 LinkedIn followers and once wrote a viral post about an airline experience`,
      },
    ],
  },
  {
    id: "salary-negotiation",
    title: "Salary Negotiation",
    mode: "negotiation",
    topic: "Annual compensation review between team lead Alex, manager Jordan, and HR representative Sam.",
    goal: "Agree on a compensation package (base salary, title, work model) acceptable to all parties — or determine that no agreement is possible.",
    context: `Alex has been a team lead at the company for 4 years. The annual compensation review is due. Alex recently closed the biggest client deal of the quarter (CHF 2.1M) and feels underpaid compared to market data. Jordan is Alex's direct manager and wants to keep the team together. Sam from HR ensures fair and consistent salary structures across the company.`,
    agents: [
      {
        id: "alex",
        name: "Alex",
        role: "Team Lead",
        character: "Confident but not aggressive. Knows their market value and can clearly articulate achievements. Prefers to stay but doesn't show all cards. Negotiates factually, but gets emotional when feeling undervalued. Speaks directly but respectfully.",
        color: "#2563eb",
        privateContext: `BATNA: You have a concrete offer from a fintech startup for CHF 145,000 + equity package. Your current salary is CHF 120,000.

Red Lines:
- Won't accept below CHF 130,000 base salary
- Need the "Senior" title — peers at the same level already have it

Hidden Goals:
- You actually prefer to stay — kids are in school nearby, you like the team
- Would accept CHF 128,000 if combined with a 4-day work week
- Don't want to play the competing offer card first, only if pressured

Only You Know:
- Two other team members are also actively job hunting (you won't reveal who)
- You closed the biggest deal last quarter (CHF 2.1M) but haven't emphasized it yet`,
      },
      {
        id: "jordan",
        name: "Jordan",
        role: "Department Head (Alex's Manager)",
        character: "Empathetic but business-minded. Wants to keep Alex but must also watch team dynamics. Good listener, but avoids commitments that aren't covered. Diplomatic, sometimes evasive when it comes to specific numbers.",
        color: "#16a34a",
        privateContext: `BATNA: If Alex leaves, promote an internal junior (60% cheaper) plus a contractor for 6 months. Painful but survivable.

Red Lines:
- Budget cap is CHF 135,000 — anything above needs VP approval (takes 3 months)
- Cannot offer less than 3 days in office (new company policy, not public yet)

Hidden Goals:
- Desperately wants to keep Alex — next quarter's delivery depends on them
- Wants to avoid setting a precedent: competing offer = instant raise
- Would happily give the title change (costs nothing)

Only You Know:
- The department got a 12% budget increase for next year (not announced yet)
- HR has flagged the team's attrition rate as "concerning"`,
      },
      {
        id: "sam",
        name: "Sam",
        role: "HR Business Partner",
        character: "Professional and structured. Thinks in systems and salary bands. Not unfriendly, but clear about boundaries. Wants fair solutions that work for other employees too. Can be creative with benefits, but strict on salary bands.",
        color: "#9333ea",
        privateContext: `BATNA: Standard retention package: 5% raise + one-time CHF 5,000 bonus. If rejected, document and let them leave.

Red Lines:
- No salary can exceed the band maximum (CHF 138,000 for this role level)
- 4-day work week requires a formal pilot program approval (6-week process)

Hidden Goals:
- Wants to pilot the 4-day week — Alex could be the perfect test case
- Needs to keep salary bands consistent — just denied a similar request last month
- Wants this resolved today, has 3 more reviews this week

Only You Know:
- The role band is being re-evaluated next quarter (likely +10%)
- The person denied last month has already resigned`,
      },
    ],
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
  const first = scenarios[0];
  return {
    topic: first.topic,
    goal: first.goal,
    context: first.context,
    agents,
    maxRounds: 12,
    silenceThreshold: 3,
    decayPenalty: 3,
    model: "claude-opus-4-6",
    contributionLength: "normal",
    webSearch: false,
    locale,
    mode: "debate",
  };
}

// Legacy exports for compatibility
export const defaultAgents = defaultAgentsDe;
export const scenarios = scenariosDe;
export const defaultConfig = getDefaultConfig("de");
