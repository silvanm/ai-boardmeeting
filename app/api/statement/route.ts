import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { DebateConfig, DebateMessage, EmotionalState, IntensityResult, Proposal } from "@/lib/types";
import { buildStatementPrompt } from "@/lib/prompts";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { config, history, speaker, intensities, emotions, currentRound, proposals } = (await req.json()) as {
      config: DebateConfig;
      history: DebateMessage[];
      speaker: { id: string; name: string; role: string; character: string; color: string; privateContext?: string };
      intensities: IntensityResult[];
      emotions: EmotionalState[];
      currentRound: number;
      proposals?: Proposal[];
    };

    const { system, user } = buildStatementPrompt(speaker, config, history, intensities, emotions || [], currentRound || 1, proposals);

    const stream = client.messages.stream({
      model: config.model,
      max_tokens: config.contributionLength === "kurz" ? 256 : config.contributionLength === "lang" ? 2048 : 1024,
      temperature: 0.8,
      system: [
        {
          type: "text",
          text: system,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: user }],
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
          console.error("Stream error:", error);
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
    console.error("Statement error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate statement" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
