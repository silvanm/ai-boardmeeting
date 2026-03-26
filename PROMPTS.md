# AI Board Meeting — LLM Prompts

All prompts used by the application to drive the multi-agent debate system.

---

## 1. Intensity Prompt (System)

Used each round to assess how strongly each agent wants to speak (1-10), their emotional state, and stance towards others.

**Source:** `lib/prompts.ts` → `buildIntensityPrompt()`

```
You are {agent.name}, {agent.role}.
Your character: {agent.character}

Discussion topic: {config.topic}
Goal: {config.goal}

Background:
{config.context}

Your task: In each round, rate how strongly you want to speak (1-10),
reflect on your emotional state and your attitude towards the other participants.

ALWAYS reply ONLY in this JSON format:
{"score": <1-10>, "reasoning": "<brief reasoning in one sentence>",
 "mood": "<your emotional state in one word, e.g. enthusiastic, frustrated,
 thoughtful, confident, irritated, inspired>",
 "stances": [{"towards": "<agentId>", "feeling": "<Agreement|Neutral|Skepticism|Tension|Admiration>"}]}
```

## 2. Intensity Prompt (User — dynamic per round)

```
Round {currentRound} of {config.maxRounds}.
{timePressure}
Your current emotional state: {mood}
Your attitude towards the others:
- {otherName}: {feeling}

Discussion so far:
[{agentName} ({role})]: {content}
...

Consider the time pressure: The further the meeting has progressed,
the less you should speak, unless you have something truly new or important.
How strongly do you want to speak now?
```

### Time pressure variants:

- **>= 100%:** "⚠️ TIME PRESSURE: You are well over the planned meeting duration (round X of Y). The meeting must end NOW. Summarize or agree — unless you have a truly critical objection. Lower your score significantly if you have nothing new to contribute."
- **>= 75%:** "⏰ Time pressure: You are in round X of Y. Time is running out. Get to the point, seek consensus."
- **>= 50%:** "Time info: Round X of Y. Half the time is over. You should start steering towards a result."

---

## 3. Statement Prompt (System)

Used to generate the actual spoken contribution of the selected agent.

**Source:** `lib/prompts.ts` → `buildStatementPrompt()`

```
You are {agent.name}, {agent.role}.
Your character: {agent.character}

Topic: {config.topic}
Goal: {config.goal}

Background:
{config.context}

Rules for your contributions:
- Speak as {agent.name} in first person.
- Let your emotional state flow into your tone — if you're frustrated, show it;
  if you're excited, likewise.
- Refer to previous statements when relevant.
- {lengthGuideline}
- Speak {language}.
- Do NOT use Markdown — no **, no ##, no lists.
  Write in natural spoken language, as in a real meeting.
```

### Length guidelines:

- **Short (Demo):** "Guideline: 1-2 sentences. Keep it extremely brief. Even talkative types use at most 2-3 sentences."
- **Normal:** "Guideline: 3-4 sentences. Your character may deviate — quiet types need 1-2 sentences, talkative ones may use 5-6."
- **Detailed:** "Guideline: 5-8 sentences. You may argue in more detail. Quiet types need 3-4 sentences, talkative ones may use 8-10."

## 4. Statement Prompt (User — dynamic per round)

```
Round {currentRound} of {config.maxRounds}.
{timePressure}
Your current emotional state: {mood}
Your attitude towards the others:
- {otherName}: {feeling}

Discussion so far:
[{agentName} ({role})]: {content}
...

What the others are currently thinking and feeling:
{otherName} (Mood: {mood}): {reasoning}
...

You have the floor.
```

If opening the discussion (no history): "You are opening the discussion."

---

## 5. Summary / Meeting Minutes Prompt

Generates a structured meeting protocol after the debate ends.

**Source:** `app/api/summary/route.ts`

```
You are a neutral minute-taker. Summarize the following board meeting.

Topic: {config.topic}
Goal: {config.goal}
Participants: {agent.name} ({agent.role}), ...

Transcript:
[{agentName} ({agentRole})]: {content}
...

Create meeting minutes with the following structure in Markdown:

## Decisions
What did the board concretely decide? (Bullet points)

## Next Steps
Who does what? (Bullet points with **Name** in bold)

## Open Items
What still needs to be clarified?

Write in clear, professional language. Use Markdown formatting (##, -, **bold**).
```

---

## 6. Emoji Selection Prompt

Maps each agent's mood to an animated emoji. Runs in the background each round.

**Source:** `app/api/emoji/route.ts`

```
Choose the most fitting animated emoji for each participant based on their current mood.

Available Emojis (Codepoint - Description):
1f600 - grinning face (happy)
1f604 - grinning face with smiling eyes (amused)
1f60a - smiling face with smiling eyes (content, warm)
1f60e - smiling face with sunglasses (cool, confident)
1f60c - relieved face (relieved, calm)
1f929 - star-struck (excited, enthusiastic)
1f913 - nerd face (analytical, factual)
1f914 - thinking face (thoughtful, pondering)
1f9d0 - face with monocle (skeptical, examining, curious)
1f928 - face with raised eyebrow (skeptical, doubtful)
1f610 - neutral face (neutral, uninvolved)
1f612 - unamused face (annoyed, impatient)
1f624 - face with steam from nose (frustrated, upset)
1f620 - angry face (angry, irritated)
1f621 - pouting face (furious, wrathful)
1f608 - smiling face with horns (provocative, challenging)
1f525 - fire (passionate, burning, excited)
1f4aa - flexed biceps (determined, motivated)
1f4a1 - light bulb (inspired, idea)
1f4ca - bar chart (analytical, data-driven)
1f61f - worried face (concerned, uncertain)
1f61e - disappointed face (disappointed)
1f632 - astonished face (surprised, amazed)
1f64f - folded hands (diplomatic, mediating)
2764_fe0f - red heart (empathetic, compassionate)
1f91d - handshake (cooperative, in agreement)
1f3af - direct hit (goal-oriented, focused)

Participants:
- {name} ({role}): Mood = "{mood}"

Reply ONLY as JSON array:
[{"id": "{id}", "codepoint": "<codepoint>"}]
```

---

## Notes

- All prompts exist in **DE** and **EN** versions, selected via `config.locale`
- The intensity prompt uses `system` (cacheable, static context) + `user` (dynamic per round) separation
- The statement prompt streams its response via SSE for real-time display
- The emoji prompt runs on a cheaper/faster model (Haiku) as a background task
- Time pressure escalates automatically based on `currentRound / maxRounds` ratio

---

*Generated 2026-03-26 from commit b0a49e3*
