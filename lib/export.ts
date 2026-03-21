import { DebateConfig, DebateMessage } from "./types";

export function exportToMarkdown(
  config: DebateConfig,
  messages: DebateMessage[]
): string {
  const lines: string[] = [
    `# AI Board Meeting`,
    "",
    `**Thema:** ${config.topic}`,
    `**Ziel:** ${config.goal}`,
    `**Teilnehmer:** ${config.agents.map((a) => `${a.name} (${a.role})`).join(", ")}`,
    `**Runden:** ${messages.length > 0 ? messages[messages.length - 1].round : 0}`,
    `**Datum:** ${new Date().toLocaleDateString("de-CH")}`,
    "",
    "---",
    "",
    "## Diskussion",
    "",
  ];

  for (const msg of messages) {
    lines.push(`### ${msg.agentName} (Runde ${msg.round})`);
    lines.push("");
    lines.push(msg.content);
    lines.push("");
  }

  return lines.join("\n");
}
