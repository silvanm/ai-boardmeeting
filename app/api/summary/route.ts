import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { DebateConfig, DebateMessage } from "@/lib/types";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { config, messages } = (await req.json()) as {
      config: DebateConfig;
      messages: DebateMessage[];
    };

    const transcript = messages
      .map((m) => `[${m.agentName} (${m.agentRole})]: ${m.content}`)
      .join("\n\n");

    const isEn = config.locale === "en";
    const prompt = isEn
      ? `You are a neutral minute-taker. Summarize the following board meeting.

Topic: ${config.topic}
Goal: ${config.goal}
Participants: ${config.agents.map((a) => `${a.name} (${a.role})`).join(", ")}

Transcript:
${transcript}

Create meeting minutes with the following structure in Markdown:

## Decisions
What did the board concretely decide? (Bullet points)

## Next Steps
Who does what? (Bullet points with **Name** in bold)

## Open Items
What still needs to be clarified?

Write in clear, professional language. Use Markdown formatting (##, -, **bold**). Write in English.`
      : `Du bist ein neutraler Protokollführer. Fasse das folgende GL-Meeting zusammen.

Thema: ${config.topic}
Ziel: ${config.goal}
Teilnehmer: ${config.agents.map((a) => `${a.name} (${a.role})`).join(", ")}

Verlauf:
${transcript}

Erstelle ein Meeting-Protokoll mit folgender Struktur in Markdown:

## Beschlüsse
Was hat das Team konkret beschlossen? (Bullet Points)

## Nächste Schritte
Wer macht was? (Bullet Points mit **Name** fett)

## Offene Punkte
Was muss noch geklärt werden?

Schreibe in klarer, professioneller Sprache. Verwende Markdown-Formatierung (##, -, **fett**). Sprich Deutsch.`;

    const stream = client.messages.stream({
      model: config.model,
      max_tokens: 4096,
      temperature: 0.3,
      messages: [{ role: "user", content: prompt }],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Summary stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Summary error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate summary" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
