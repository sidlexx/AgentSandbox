import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle } from "lucide-react";

interface ModuleCardProps {
  title: string;
  duration: string;
  progress: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  xp: number;
  onStart: () => void;
}

export default function ModuleCard({ 
  title, 
  duration, 
  progress, 
  difficulty, 
  xp,
  onStart 
}: ModuleCardProps) {
  const difficultyColors = {
    beginner: "bg-success text-success-foreground",
    intermediate: "bg-warning text-warning-foreground",
    advanced: "bg-destructive text-destructive-foreground",
  };

  return (
    <Card className="hover-elevate" data-testid={`card-module-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]} data-testid="badge-difficulty">
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-secondary">+{xp} XP</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium" data-testid="text-progress">{progress}%</span>
          </div>
          <Progress value={progress} data-testid="progress-module" />
        </div>

        <Button 
          onClick={onStart}
          className="w-full gap-2" 
          data-testid="button-start-module"
        >
          <PlayCircle className="w-4 h-4" />
          {progress > 0 ? 'Continue' : 'Start Module'}
        </Button>
      </CardContent>
    </Card>
  );
}
