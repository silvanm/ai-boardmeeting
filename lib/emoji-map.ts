// Static fallback mapping from common mood words to emoji codepoints
// Used as instant fallback while the AI emoji selection runs async
export const MOOD_EMOJI_FALLBACK: Record<string, string> = {
  // German moods
  enthusiastisch: "1f929",
  begeistert: "1f929",
  zuversichtlich: "1f60a",
  optimistisch: "1f60a",
  nachdenklich: "1f914",
  skeptisch: "1f928",
  frustriert: "1f624",
  gereizt: "1f620",
  verärgert: "1f621",
  wütend: "1f621",
  inspiriert: "1f4a1",
  motiviert: "1f4aa",
  neutral: "1f610",
  gelassen: "1f60c",
  ungeduldig: "1f612",
  besorgt: "1f61f",
  überrascht: "1f632",
  amüsiert: "1f604",
  entschlossen: "1f4aa",
  diplomatisch: "1f64f",
  provokant: "1f608",
  neugierig: "1f9d0",
  enttäuscht: "1f61e",
  erleichtert: "1f60c",
  aufgeregt: "1f525",
  kampflustig: "1f525",
  selbstbewusst: "1f60e",
  vorsichtig: "1f914",
  pragmatisch: "1f4ca",
  analytisch: "1f9d0",
};

export function getEmojiUrl(codepoint: string): string {
  return `https://fonts.gstatic.com/s/e/notoemoji/latest/${codepoint}/lottie.json`;
}

export function getFallbackEmoji(mood: string): string {
  const lower = mood.toLowerCase().trim();
  return MOOD_EMOJI_FALLBACK[lower] || "1f610"; // neutral face as default
}
