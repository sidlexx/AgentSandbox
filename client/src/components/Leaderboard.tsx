import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  xp: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  const getMedalColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-600";
    return "";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card data-testid="card-leaderboard">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          <CardTitle>Top Performers</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-3 rounded-lg ${
                entry.rank <= 3 ? 'bg-accent' : 'bg-muted/30'
              }`}
              data-testid={`leaderboard-entry-${entry.rank}`}
            >
              <div className="flex items-center justify-center w-8">
                {entry.rank <= 3 ? (
                  <Medal className={`w-6 h-6 ${getMedalColor(entry.rank)}`} />
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">{entry.rank}</span>
                )}
              </div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {getInitials(entry.name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium" data-testid={`text-name-${entry.rank}`}>{entry.name}</div>
                <div className="text-sm text-muted-foreground">{entry.xp} XP</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" data-testid={`text-score-${entry.rank}`}>{entry.score}%</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
