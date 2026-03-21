# AI Board Meeting

Multi-Agent-Debattensystem, das live GL-Meetings zwischen KI-Agenten simuliert. Jeder Agent hat eine eigene Persönlichkeit, Emotionen und einen intensitätsbasierten Sprechmechanismus, der natürliche Gesprächsdynamik erzeugt.

Gebaut als Web-App für visuelle Demos bei Präsentationen.

## Setup

```bash
pnpm install  # oder npm install
cp .env.example .env.local
# ANTHROPIC_API_KEY in .env.local setzen
npm run dev
```

Öffne http://localhost:3000.

## Wie es funktioniert

### Kernmechanik (pro Runde)

```
┌─────────────────────────────────────────────────────────┐
│  1. INTENSITY SCORING (parallel, alle Agents)           │
│     - Jeder Agent bewertet: "Will ich reden?" (1-10)    │
│     - Zusätzlich: Mood + Stances gegenüber anderen      │
│     - Letzter Sprecher bekommt Decay Penalty (-3)       │
│     → Ergebnis: Sortierte IntensityResult[]             │
├─────────────────────────────────────────────────────────┤
│  2. SPRECHER-AUSWAHL                                    │
│     - Höchster effektiver Score spricht                 │
│     - Tie-Break: wer am längsten geschwiegen hat        │
│     - Alle Scores < Schwelle → Debatte endet natürlich  │
├─────────────────────────────────────────────────────────┤
│  3. STATEMENT (streaming)                               │
│     - Gewählter Sprecher bekommt den vollen Kontext     │
│     - Inkl. was die anderen gerade denken/fühlen        │
│     - Antwort streamt token-by-token in die Chat-View   │
├─────────────────────────────────────────────────────────┤
│  4. WIEDERHOLEN ab Schritt 1                            │
│     - Bis Silence Threshold oder soft Round Limit       │
└─────────────────────────────────────────────────────────┘
```

### Emotionssimulation

Jeder Agent hat einen emotionalen Zustand, der sich über die Runden entwickelt:

- **Mood**: Ein Wort (z.B. "enthusiastisch", "frustriert", "nachdenklich")
- **Stances**: Haltung gegenüber jedem anderen Teilnehmer (Zustimmung / Neutral / Skepsis / Spannung / Bewunderung)

Der vorherige emotionale Zustand fliesst in den nächsten Prompt ein. Das erzeugt emergente Dynamik: Allianzen, Eskalationen, Kompromisse entstehen organisch.

### Zeitdruck-Mechanik

Die Rundenlimite ist **weich**, nicht hart:

| Progress | Effekt |
|----------|--------|
| 0–49% | Freie Diskussion |
| 50–74% | Hinweis: "Steuert Richtung Ergebnis" |
| 75–99% | Druck: "Zeit wird knapp, sucht Konsens" |
| 100%+ | Starker Druck: "Meeting muss JETZT enden" |
| 150% | Absolute Grenze (Sicherheitsnetz) |

Agents senken ihre Intensity-Scores automatisch → Debatte endet organisch über Silence Threshold.

### Prompt Caching

Statischer Prompt-Teil (Agent-Identität, Kontext, Instruktionen) wird als `system` Message mit `cache_control: ephemeral` gesendet. Der dynamische Teil (Transcript, Emotionen, Zeitdruck) kommt als `user` Message. Das reduziert Kosten und Latenz ab Runde 2 erheblich.

### Animierte Emojis

Jeder Agent bekommt ein animiertes Noto-Emoji, das seine aktuelle Stimmung visualisiert:

- **Sofort**: Statisches Fallback-Mapping (Mood-Wort → Emoji-Codepoint)
- **Alle 3 Runden**: Async Haiku-Call wählt das passendste Emoji aus ~27 Noto-Animationen

Die Emojis werden als Lottie-Animationen von `fonts.gstatic.com` geladen.

## Architektur

```
app/
  page.tsx                  # Setup-Seite (Szenario, Agents, Parameter)
  debate/page.tsx           # Debate-View
  api/
    intensities/route.ts    # Parallel Intensity Scoring
    statement/route.ts      # SSE-Stream des Statements
    summary/route.ts        # Meeting-Protokoll generieren
    emoji/route.ts          # AI Emoji-Auswahl

components/
  setup/                    # Agent-Cards, Parameter-Sliders, Szenario-Wahl
  debate/                   # Message-Bubbles, Intensity-Bars, Controls

hooks/
  use-debate.ts             # Kern-Statemachine + Rundenschleife

lib/
  types.ts                  # TypeScript Interfaces
  prompts.ts                # System/User Prompt-Aufbau (cacheable)
  defaults.ts               # Szenarien + Default-Agents (m+p GL)
  emoji-map.ts              # Mood → Emoji Fallback-Mapping
```

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **Anthropic SDK** (Server-side, Streaming, Prompt Caching)
- **shadcn/ui** + Tailwind CSS
- **Framer Motion** (Animationen)
- **Lottie React** (Animierte Noto-Emojis)
- **next-themes** (Dark Mode)

## Szenarien

Drei vorkonfigurierte Szenarien:

1. **KI ersetzt Programmierer** — Strategische Positionierung
2. **Investment in SaaS-Produkte** — Business Case mit Schweizer Kontext
3. **Vertrauensbruch im Team** — Emotionale Konfliktsituation

Eigene Szenarien können über "Eigenes Thema" erstellt werden.

---

*Erstellt am 2026-03-21 | Commit: ce966ec*
