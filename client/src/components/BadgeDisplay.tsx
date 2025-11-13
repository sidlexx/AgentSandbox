import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Flame, Users, Trophy, Star, Target } from "lucide-react";

interface BadgeItem {
  id: string;
  name: string;
  icon: string;
  unlocked: boolean;
  description: string;
}

interface BadgeDisplayProps {
  badges: BadgeItem[];
}

const iconMap: Record<string, any> = {
  award: Award,
  flame: Flame,
  users: Users,
  trophy: Trophy,
  star: Star,
  target: Target,
};

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <Card data-testid="card-badge-display">
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {badges.map((badge) => {
            const Icon = iconMap[badge.icon] || Award;
            return (
              <div
                key={badge.id}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  badge.unlocked
                    ? 'border-primary bg-primary/5'
                    : 'border-muted bg-muted/20 opacity-40 grayscale'
                }`}
                data-testid={`badge-${badge.id}`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    badge.unlocked
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-center">{badge.name}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
