import { CheckCircle2, Lock, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillNode {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "completed";
  xp: number;
}

interface SkillTreeProps {
  nodes: SkillNode[];
  onNodeClick: (nodeId: string) => void;
}

export default function SkillTree({ nodes, onNodeClick }: SkillTreeProps) {
  return (
    <div className="space-y-6" data-testid="skill-tree">
      {nodes.map((node, index) => (
        <div key={node.id} className="flex items-center gap-4">
          {index > 0 && (
            <div className="w-0.5 h-8 bg-border -mt-12 ml-10" />
          )}
          <Button
            variant="outline"
            onClick={() => node.status !== "locked" && onNodeClick(node.id)}
            disabled={node.status === "locked"}
            data-testid={`button-skill-${node.id}`}
            className={`w-full justify-start gap-4 h-auto p-4 ${
              node.status === "completed"
                ? "border-success bg-success/10"
                : node.status === "unlocked"
                ? "border-primary bg-primary/5"
                : "opacity-50"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                node.status === "completed"
                  ? "bg-success text-success-foreground"
                  : node.status === "unlocked"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {node.status === "completed" ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : node.status === "locked" ? (
                <Lock className="w-6 h-6" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className="font-medium">{node.title}</div>
              <div className="text-sm text-muted-foreground">+{node.xp} XP</div>
            </div>
          </Button>
        </div>
      ))}
    </div>
  );
}
