export interface Agent {
  id: string;
  name: string;
  role: string;
  character: string;
  color: string;
  privateContext?: string;
}

export interface DebateConfig {
  topic: string;
  goal: string;
  context: string;
  agents: Agent[];
  maxRounds: number;
  silenceThreshold: number;
  decayPenalty: number;
  model: string;
  contributionLength: "kurz" | "normal" | "lang";
  webSearch: boolean;
  locale: "de" | "en";
  mode?: "debate" | "negotiation";
}

export interface AgentStance {
  towards: string; // agentId
  feeling: string; // e.g. "Zustimmung", "Spannung", "Neutral"
}

export interface EmotionalState {
  agentId: string;
  mood: string; // e.g. "enthusiastisch", "frustriert", "nachdenklich"
  stances: AgentStance[];
}

export interface IntensityResult {
  agentId: string;
  score: number;
  reasoning: string;
  effectiveScore: number;
  mood: string;
  stances: AgentStance[];
  walkAway?: boolean;
}

export interface Proposal {
  id: string;
  round: number;
  fromAgentId: string;
  terms: string;
  status: "open" | "accepted" | "rejected" | "countered";
  responses: ProposalResponse[];
}

export interface ProposalResponse {
  agentId: string;
  action: "accept" | "reject" | "counter";
  counterTerms?: string;
  round: number;
}

export interface DebateMessage {
  id: string;
  round: number;
  agentId: string;
  agentName: string;
  agentRole: string;
  agentColor: string;
  emojiCodepoint: string;
  content: string;
  timestamp: number;
}

export interface RoundResult {
  round: number;
  intensities: IntensityResult[];
  speakerId: string | null;
  message: DebateMessage | null;
}

export type DebateStatus = "idle" | "running" | "paused" | "ended";

export interface DebateState {
  status: DebateStatus;
  currentRound: number;
  messages: DebateMessage[];
  rounds: RoundResult[];
  intensities: IntensityResult[];
  emotions: EmotionalState[];
  emojis: Record<string, string>; // agentId -> emoji codepoint
  lastSpeakerId: string | null;
  proposals: Proposal[];
  walkedAway: { agentId: string; round: number } | null;
}
