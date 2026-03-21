"use client";

import { Agent } from "@/lib/types";
import { AgentCard } from "./agent-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AgentListProps {
  agents: Agent[];
  onChange: (agents: Agent[]) => void;
}

const COLORS = ["#e11d48", "#2563eb", "#16a34a", "#9333ea", "#ea580c", "#0891b2", "#ca8a04", "#dc2626"];

export function AgentList({ agents, onChange }: AgentListProps) {
  const addAgent = () => {
    const id = `agent-${Date.now()}`;
    const color = COLORS[agents.length % COLORS.length];
    onChange([...agents, { id, name: "", role: "", character: "", color }]);
  };

  const updateAgent = (index: number, agent: Agent) => {
    const updated = [...agents];
    updated[index] = agent;
    onChange(updated);
  };

  const removeAgent = (index: number) => {
    onChange(agents.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {agents.map((agent, i) => (
        <AgentCard
          key={agent.id}
          agent={agent}
          onChange={(a) => updateAgent(i, a)}
          onRemove={() => removeAgent(i)}
          canRemove={agents.length > 2}
        />
      ))}
      {agents.length < 8 && (
        <Button variant="outline" onClick={addAgent} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Agent hinzufügen
        </Button>
      )}
    </div>
  );
}
