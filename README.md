# AI Board Meeting

Multi-agent debate system that simulates live board meetings between AI agents. Each agent has its own personality, emotions, and an intensity-based speaking mechanism that creates natural conversation dynamics.

Built as a web app for visual demos at presentations.

## Setup

```bash
pnpm install
cp .env.example .env.local
# Set ANTHROPIC_API_KEY in .env.local
# For Google Auth: set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET
pnpm dev
```

Open http://localhost:3000.

## How It Works

### Core Mechanics (per round)

```
┌─────────────────────────────────────────────────────────┐
│  1. INTENSITY SCORING (parallel, all agents)            │
│     - Each agent rates: "Do I want to speak?" (1-10)    │
│     - Additionally: Mood + Stances towards others       │
│     - Last speaker gets Decay Penalty (-3)              │
│     → Result: Sorted IntensityResult[]                  │
├─────────────────────────────────────────────────────────┤
│  2. SPEAKER SELECTION                                   │
│     - Highest effective score speaks                    │
│     - Tie-break: who has been silent the longest        │
│     - All scores < threshold → debate ends naturally    │
├─────────────────────────────────────────────────────────┤
│  3. STATEMENT (streaming)                               │
│     - Selected speaker gets the full context            │
│     - Including what others are thinking/feeling        │
│     - Response streams token-by-token into the chat     │
├─────────────────────────────────────────────────────────┤
│  4. REPEAT from step 1                                  │
│     - Until Silence Threshold or soft Round Limit       │
└─────────────────────────────────────────────────────────┘
```

### Emotion Simulation

Each agent has an emotional state that evolves across rounds:

- **Mood**: One word (e.g. "enthusiastic", "frustrated", "thoughtful")
- **Stances**: Attitude towards each other participant (Agreement / Neutral / Skepticism / Tension / Admiration)

The previous emotional state feeds into the next prompt. This creates emergent dynamics: alliances, escalations, and compromises arise organically.

### Time Pressure Mechanics

The round limit is **soft**, not hard:

| Progress | Effect |
|----------|--------|
| 0–49% | Free discussion |
| 50–74% | Hint: "Start steering towards a result" |
| 75–99% | Pressure: "Time is running out, seek consensus" |
| 100%+ | Strong pressure: "Meeting must end NOW" |
| 150% | Absolute limit (safety net) |

Agents automatically lower their intensity scores → debate ends organically via the silence threshold.

### Prompt Caching

The static prompt part (agent identity, context, instructions) is sent as a `system` message with `cache_control: ephemeral`. The dynamic part (transcript, emotions, time pressure) comes as the `user` message. This significantly reduces cost and latency from round 2 onwards.

### Animated Emojis

Each agent gets an animated Noto emoji visualizing their current mood:

- **Immediately**: Static fallback mapping (mood word → emoji codepoint)
- **Every 3 rounds**: Async Haiku call selects the best-fitting emoji from ~27 Noto animations

Emojis are loaded as Lottie animations from `fonts.gstatic.com`.

## Architecture

```
app/
  page.tsx                  # Setup page (scenario, agents, parameters)
  debate/page.tsx           # Debate view
  login/page.tsx            # Google OAuth login
  api/
    auth/[...nextauth]/     # NextAuth.js handler
    intensities/route.ts    # Parallel intensity scoring
    statement/route.ts      # SSE stream of the statement
    summary/route.ts        # Meeting minutes generation
    emoji/route.ts          # AI emoji selection

components/
  setup/                    # Agent cards, parameter sliders, scenario selection
  debate/                   # Message bubbles, intensity bars, controls

hooks/
  use-debate.ts             # Core state machine + round loop

lib/
  types.ts                  # TypeScript interfaces
  prompts.ts                # System/User prompt construction (cacheable, DE/EN)
  defaults.ts               # Scenarios + default agents (DE/EN)
  i18n.tsx                  # Localization context (DE/EN)
  auth.ts                   # NextAuth.js config (Google, domain restriction)
  emoji-map.ts              # Mood → Emoji fallback mapping
  export.ts                 # Markdown export
```

## Tech Stack

- **Next.js 15** (App Router, Turbopack)
- **Anthropic SDK** (Server-side, Streaming, Prompt Caching)
- **NextAuth.js v5** (Google OAuth, domain restriction)
- **shadcn/ui** + Tailwind CSS
- **Framer Motion** (Animations)
- **Lottie React** (Animated Noto emojis)
- **next-themes** (Light/Dark mode)

## Scenarios

Three pre-configured scenarios (available in DE and EN):

1. **AI Replaces Developers** — Strategic positioning
2. **Investment in SaaS Products** — Business case with Swiss context
3. **AI-Powered Mortgage Matching** — Board validates a CHF 620K AI investment

Custom scenarios can be created via "Custom Topic".

## Features

- **DE/EN localization** — UI, agent profiles, scenarios, and all LLM prompts
- **Google Auth** — Restricted to @muehlemann-popp.ch domain
- **PDF export** — Meeting minutes as printable PDF
- **Persistent settings** — Saved in localStorage across sessions
- **Browser language detection** — Auto-selects DE or EN

---

*Updated 2026-03-26 | Commit: b0a49e3*
