import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressCircle from "@/components/ProgressCircle";
import ModuleCard from "@/components/ModuleCard";
import PerformanceChart from "@/components/PerformanceChart";
import BadgeDisplay from "@/components/BadgeDisplay";
import { PlayCircle, Target, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const mockPerformanceData = [
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 78 },
    { day: 'Wed', score: 75 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 91 },
    { day: 'Sun', score: 94 },
  ];

  const mockModules = [
    {
      title: 'Active Listening Techniques',
      duration: '20 min',
      progress: 0,
      difficulty: 'beginner' as const,
      xp: 50
    },
    {
      title: 'Conflict De-escalation',
      duration: '35 min',
      progress: 65,
      difficulty: 'intermediate' as const,
      xp: 100
    },
    {
      title: 'Advanced Problem Solving',
      duration: '45 min',
      progress: 0,
      difficulty: 'advanced' as const,
      xp: 150
    }
  ];

  const mockBadges = [
    { id: '1', name: 'First Perfect Score', icon: 'trophy', unlocked: true, description: 'Score 100%' },
    { id: '2', name: '7-Day Streak', icon: 'flame', unlocked: true, description: '7 days in a row' },
    { id: '3', name: 'Peer Helper', icon: 'users', unlocked: false, description: 'Help 5 agents' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Welcome back, Agent!</h1>
          <p className="text-muted-foreground">Let's continue your training journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1" data-testid="card-progress">
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressCircle progress={67} />
              <p className="text-sm text-muted-foreground mt-4 text-center">
                You're 67% ready for production
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Target className="w-4 h-4 text-success" />
                <span className="text-success font-medium">On track for 21-day completion</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2" data-testid="card-quick-start">
            <CardHeader>
              <CardTitle>Quick Start Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Jump into a live scenario and practice your skills right now
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setLocation('/simulation')}
                    data-testid="button-sim-beginner"
                  >
                    <Zap className="w-5 h-5 text-success" />
                    <div className="text-sm font-medium">Beginner</div>
                    <div className="text-xs text-muted-foreground">Password Reset</div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setLocation('/simulation')}
                    data-testid="button-sim-intermediate"
                  >
                    <Zap className="w-5 h-5 text-warning" />
                    <div className="text-sm font-medium">Intermediate</div>
                    <div className="text-xs text-muted-foreground">Complaint Handling</div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setLocation('/simulation')}
                    data-testid="button-sim-advanced"
                  >
                    <Zap className="w-5 h-5 text-destructive" />
                    <div className="text-sm font-medium">Advanced</div>
                    <div className="text-xs text-muted-foreground">Crisis Management</div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Today's Learning Path</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {mockModules.map((module, index) => (
                <ModuleCard
                  key={index}
                  {...module}
                  onStart={() => setLocation('/training')}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
            <BadgeDisplay badges={mockBadges} />
          </div>
        </div>

        <div className="mb-8">
          <PerformanceChart data={mockPerformanceData} />
        </div>
      </main>
    </div>
  );
}
