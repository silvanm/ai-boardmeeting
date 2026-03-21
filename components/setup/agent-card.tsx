"use client";

import { Agent } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onChange: (agent: Agent) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function AgentCard({ agent, onChange, onRemove, canRemove }: AgentCardProps) {
  return (
    <Card className="relative" style={{ borderLeftColor: agent.color, borderLeftWidth: 4 }}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <Label htmlFor={`name-${agent.id}`}>Name</Label>
            <Input
              id={`name-${agent.id}`}
              value={agent.name}
              onChange={(e) => onChange({ ...agent, name: e.target.value })}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label htmlFor={`role-${agent.id}`}>Rolle</Label>
            <Input
              id={`role-${agent.id}`}
              value={agent.role}
              onChange={(e) => onChange({ ...agent, role: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor={`color-${agent.id}`}>Farbe</Label>
            <input
              id={`color-${agent.id}`}
              type="color"
              value={agent.color}
              onChange={(e) => onChange({ ...agent, color: e.target.value })}
              className="h-10 w-10 rounded cursor-pointer border border-input"
            />
          </div>
          {canRemove && (
            <Button variant="ghost" size="icon" onClick={onRemove} className="mt-5">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor={`character-${agent.id}`}>Charakter</Label>
          <Textarea
            id={`character-${agent.id}`}
            value={agent.character}
            onChange={(e) => onChange({ ...agent, character: e.target.value })}
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
