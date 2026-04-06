import { Proposal, ProposalResponse } from "./types";

const PROPOSAL_PATTERNS = [
  /I propose\b/i,
  /my offer is\b/i,
  /I suggest\b.*(?:CHF|salary|compensation|\d+[''']?\d*)/i,
  /Ich schlage vor\b/i,
  /Mein Angebot\b/i,
  /Ich biete\b/i,
  /let me put forward\b/i,
  /here'?s (?:my|a) (?:concrete )?(?:proposal|offer)\b/i,
  /konkret(?:er)? Vorschlag\b/i,
];

const ACCEPT_PATTERNS = [
  /I accept\b/i,
  /deal\b/i,
  /agreed\b/i,
  /Ich akzeptiere\b/i,
  /Einverstanden\b/i,
  /Ich nehme.*an\b/i,
  /I('m| am) (?:happy|willing) to accept\b/i,
];

const REJECT_PATTERNS = [
  /I (?:can'?t|cannot|won'?t) accept\b/i,
  /that'?s (?:not acceptable|a dealbreaker)\b/i,
  /Ich lehne.*ab\b/i,
  /(?:Das |Dies )(?:ist )?(?:nicht akzeptabel|kommt nicht in Frage)\b/i,
];

const COUNTER_PATTERNS = [
  /counter.?(?:proposal|offer)\b/i,
  /instead,? I (?:would |could )?(?:propose|suggest|offer)\b/i,
  /Gegenvorschlag\b/i,
  /stattdessen.*(?:schlage|biete)\b/i,
  /how about\b.*(?:CHF|\d+)/i,
  /what if\b.*(?:CHF|\d+)/i,
];

export function extractProposal(
  content: string,
  agentId: string,
  round: number
): Proposal | null {
  const isProposal = PROPOSAL_PATTERNS.some((p) => p.test(content));
  if (!isProposal) return null;

  return {
    id: `proposal-${round}-${agentId}`,
    round,
    fromAgentId: agentId,
    terms: content,
    status: "open",
    responses: [],
  };
}

export function extractProposalResponse(
  content: string,
  agentId: string,
  round: number,
  existingProposals: Proposal[]
): ProposalResponse | null {
  const openProposals = existingProposals.filter(
    (p) => p.status === "open" && p.fromAgentId !== agentId
  );
  if (openProposals.length === 0) return null;

  const isCounter = COUNTER_PATTERNS.some((p) => p.test(content));
  if (isCounter) {
    return { agentId, action: "counter", counterTerms: content, round };
  }

  const isAccept = ACCEPT_PATTERNS.some((p) => p.test(content));
  if (isAccept) {
    return { agentId, action: "accept", round };
  }

  const isReject = REJECT_PATTERNS.some((p) => p.test(content));
  if (isReject) {
    return { agentId, action: "reject", round };
  }

  return null;
}

export function updateProposals(
  proposals: Proposal[],
  targetProposalId: string,
  response: ProposalResponse
): Proposal[] {
  return proposals.map((p) => {
    if (p.id !== targetProposalId) return p;
    const newStatus =
      response.action === "accept"
        ? "accepted"
        : response.action === "reject"
          ? "rejected"
          : "countered";
    return {
      ...p,
      status: newStatus as Proposal["status"],
      responses: [...p.responses, response],
    };
  });
}
