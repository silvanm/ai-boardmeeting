import { DebateConfig, DebateMessage } from "./types";

export function exportToMarkdown(
  config: DebateConfig,
  messages: DebateMessage[]
): string {
  const isEn = config.locale === "en";
  const dateLocale = isEn ? "en-GB" : "de-CH";
  const lines: string[] = [
    `# AI Board Meeting`,
    "",
    `**${isEn ? "Topic" : "Thema"}:** ${config.topic}`,
    `**${isEn ? "Goal" : "Ziel"}:** ${config.goal}`,
    `**${isEn ? "Participants" : "Teilnehmer"}:** ${config.agents.map((a) => `${a.name} (${a.role})`).join(", ")}`,
    `**${isEn ? "Rounds" : "Runden"}:** ${messages.length > 0 ? messages[messages.length - 1].round : 0}`,
    `**${isEn ? "Date" : "Datum"}:** ${new Date().toLocaleDateString(dateLocale)}`,
    "",
    "---",
    "",
    `## ${isEn ? "Discussion" : "Diskussion"}`,
    "",
  ];

  for (const msg of messages) {
    lines.push(`### ${msg.agentName} (${isEn ? "Round" : "Runde"} ${msg.round})`);
    lines.push("");
    lines.push(msg.content);
    lines.push("");
  }

  return lines.join("\n");
}
