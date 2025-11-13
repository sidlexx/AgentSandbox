import Header from "@/components/Header";
import AnalyticsCard from "@/components/AnalyticsCard";
import Leaderboard from "@/components/Leaderboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Download, TrendingUp } from "lucide-react";

export default function Analytics() {
  const skillsData = [
    { skill: 'Communication', score: 92 },
    { skill: 'Empathy', score: 88 },
    { skill: 'Problem Solving', score: 85 },
    { skill: 'Technical Knowledge', score: 78 },
    { skill: 'Speed', score: 90 },
  ];

  const comparisonData = [
    { category: 'Week 1', you: 65, average: 60 },
    { category: 'Week 2', you: 72, average: 65 },
    { category: 'Week 3', you: 85, average: 70 },
    { category: 'Week 4', you: 92, average: 75 },
  ];

  const mockLeaderboard = [
    { rank: 1, name: 'Sarah Johnson', score: 98, xp: 2450 },
    { rank: 2, name: 'Michael Chen', score: 96, xp: 2380 },
    { rank: 3, name: 'Emma Williams', score: 94, xp: 2210 },
    { rank: 4, name: 'You', score: 92, xp: 2150 },
    { rank: 5, name: 'Olivia Davis', score: 90, xp: 2050 },
    { rank: 6, name: 'Robert Miller', score: 89, xp: 1980 },
    { rank: 7, name: 'Sophia Wilson', score: 87, xp: 1920 },
    { rank: 8, name: 'David Martinez', score: 86, xp: 1850 },
    { rank: 9, name: 'Isabella Garcia', score: 84, xp: 1780 },
    { rank: 10, name: 'William Lee', score: 82, xp: 1720 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Track your performance and growth</p>
          </div>
          <Button data-testid="button-export-report">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnalyticsCard title="Accuracy" value={92} change={5.2} />
          <AnalyticsCard title="Avg Handle Time" value="3:45" change={-8.1} suffix="" />
          <AnalyticsCard title="Learning Velocity" value={87} change={12.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card data-testid="card-skills-radar">
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                  />
                  <Radar 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card data-testid="card-peer-comparison">
            <CardHeader>
              <CardTitle>Performance vs Peers</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="category" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px',
                    }}
                  />
                  <Bar dataKey="you" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="average" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span>You</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted rounded" />
                  <span>Peer Average</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <Leaderboard entries={mockLeaderboard} />
          </Card>

          <Card data-testid="card-ai-prediction">
            <CardHeader>
              <CardTitle>AI Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-primary mb-2">14</div>
                <p className="text-muted-foreground">days until production ready</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Above average progress</p>
                    <p className="text-xs text-muted-foreground">You're learning 23% faster than peers</p>
                  </div>
                </div>
                
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-2">Next Focus Areas:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Advanced conflict resolution</li>
                    <li>• Technical troubleshooting</li>
                    <li>• Multi-tasking scenarios</li>
                  </ul>
                </div>
              </div>

              <Button className="w-full" variant="outline" data-testid="button-view-recommendations">
                View Detailed Recommendations
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
