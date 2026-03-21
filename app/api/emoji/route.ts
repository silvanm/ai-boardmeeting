import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

// Well-known Noto emoji codepoints for emotions
const AVAILABLE_EMOJIS = `
1f600 - grinning face (fröhlich)
1f604 - grinning face with smiling eyes (amüsiert, heiter)
1f60a - smiling face with smiling eyes (zufrieden, warm)
1f60e - smiling face with sunglasses (cool, selbstbewusst)
1f60c - relieved face (erleichtert, gelassen)
1f929 - star-struck (begeistert, enthusiastisch)
1f913 - nerd face (analytisch, sachlich)
1f914 - thinking face (nachdenklich, grübelnd)
1f9d0 - face with monocle (skeptisch, prüfend, neugierig)
1f928 - face with raised eyebrow (skeptisch, zweifelnd)
1f610 - neutral face (neutral, unbeteiligt)
1f612 - unamused face (genervt, ungeduldig)
1f624 - face with steam from nose (frustriert, aufgebracht)
1f620 - angry face (verärgert, gereizt)
1f621 - pouting face (wütend, zornig)
1f608 - smiling face with horns (provokant, herausfordernd)
1f525 - fire (leidenschaftlich, brennend, aufgeregt)
1f4aa - flexed biceps (entschlossen, motiviert, kampfbereit)
1f4a1 - light bulb (inspiriert, Idee)
1f4ca - bar chart (analytisch, datengetrieben)
1f61f - worried face (besorgt, unsicher)
1f61e - disappointed face (enttäuscht)
1f632 - astonished face (überrascht, erstaunt)
1f64f - folded hands (diplomatisch, bittend, vermittelnd)
2764_fe0f - red heart (empathisch, mitfühlend)
1f91d - handshake (kooperativ, einverstanden)
1f3af - direct hit (zielgerichtet, fokussiert)
`;

export async function POST(req: NextRequest) {
  try {
    const { agents } = (await req.json()) as {
      agents: { id: string; name: string; mood: string; role: string }[];
    };

    const prompt = `Wähle für jeden Teilnehmer das passendste animierte Emoji basierend auf seiner aktuellen Stimmung.

Verfügbare Emojis (Codepoint - Beschreibung):
${AVAILABLE_EMOJIS}

Teilnehmer:
${agents.map((a) => `- ${a.name} (${a.role}): Stimmung = "${a.mood}"`).join("\n")}

Antworte NUR als JSON-Array:
[${agents.map((a) => `{"id": "${a.id}", "codepoint": "<codepoint>"}`).join(", ")}]`;

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 200,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "[]";

    let results;
    try {
      results = JSON.parse(text);
    } catch {
      // Fallback: try extracting JSON from text
      const match = text.match(/\[[\s\S]*\]/);
      results = match ? JSON.parse(match[0]) : [];
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Emoji error:", error);
    return NextResponse.json([], { status: 200 }); // graceful degradation
  }
}
