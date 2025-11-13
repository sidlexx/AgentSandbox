import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ProgressCircle from "@/components/ProgressCircle";
import ModuleCard from "@/components/ModuleCard";
import BadgeDisplay from "@/components/BadgeDisplay";
import { PlayCircle, Target, Zap, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { getCurrentUser, getModules, getUserProgress, getUserAchievements, getUserAnalytics } from "@/lib/api";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const currentUser = getCurrentUser();

  if (!currentUser) {
    setLocation('/login');
    return null;
  }

  const { data: modules = [], isLoading: modulesLoading } = useQuery({
    queryKey: ['/api/modules'],
    queryFn: getModules
  });

  const { data: progress = [], isLoading: progressLoading } = useQuery({
    queryKey: ['/api/users', currentUser.id, 'progress'],
    queryFn: () => getUserProgress(currentUser.id)
  });

  const { data: achievements = [], isLoading: achievementsLoading } = useQuery({
    queryKey: ['/api/users', currentUser.id, 'achievements'],
    queryFn: () => getUserAchievements(currentUser.id)
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/users', currentUser.id, 'analytics'],
    queryFn: () => getUserAnalytics(currentUser.id)
  });

  // Combine modules with progress
  const modulesWithProgress = modules.slice(0, 3).map(module => {
    const moduleProgress = progress.find(p => p.moduleId === module.id);
    return {
      id: module.id,
      title: module.title,
      duration: module.duration,
      progress: moduleProgress?.progress || 0,
      difficulty: module.difficulty as 'beginner' | 'intermediate' | 'advanced',
      xp: module.xpReward
    };
  });

  const unlockedBadges = achievements.filter(a => a.unlocked);
  const totalBadges = achievements.length;

  const isLoading = modulesLoading || progressLoading || achievementsLoading || analyticsLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="loader-dashboard" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2" data-testid="text-welcome">Welcome back, {currentUser.username}!</h1>
          <p className="text-muted-foreground">Let's continue your training journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-1" data-testid="card-progress">
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressCircle progress={currentUser.completionPercentage} />
              <p className="text-sm text-muted-foreground mt-4 text-center" data-testid="text-completion">
                You're {currentUser.completionPercentage}% ready for production
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Target className="w-4 h-4 text-success" />
                <span className="text-success font-medium">
                  {analytics?.summary?.daysToReady || 21} days to production ready
                </span>
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
                    onClick={() => setLocation('/simulation?difficulty=beginner')}
                    data-testid="button-sim-beginner"
                  >
                    <Zap className="w-5 h-5 text-success" />
                    <div className="text-sm font-medium">Beginner</div>
                    <div className="text-xs text-muted-foreground">Basic Support</div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setLocation('/simulation?difficulty=intermediate')}
                    data-testid="button-sim-intermediate"
                  >
                    <Zap className="w-5 h-5 text-warning" />
                    <div className="text-sm font-medium">Intermediate</div>
                    <div className="text-xs text-muted-foreground">Complex Issues</div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex-col gap-2"
                    onClick={() => setLocation('/simulation?difficulty=advanced')}
                    data-testid="button-sim-advanced"
                  >
                    <Zap className="w-5 h-5 text-destructive" />
                    <div className="text-sm font-medium">Advanced</div>
                    <div className="text-xs text-muted-foreground">Crisis Handling</div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card data-testid="card-stats">
            <CardHeader>
              <CardTitle>Your Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary" data-testid="text-total-xp">{currentUser.totalXp}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary" data-testid="text-badges">{unlockedBadges.length}/{totalBadges}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary" data-testid="text-avg-score">
                    {analytics?.summary?.avgAccuracy || 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary" data-testid="text-simulations">
                    {analytics?.metrics?.length || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Days Tracked</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-badges">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <CardTitle>Recent Achievements</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLocation('/analytics')}
                data-testid="button-view-all"
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {achievements.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {achievements.slice(0, 6).map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.xpReward} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Complete your first training or simulation to earn badges!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card data-testid="card-continue-learning">
          <CardHeader className="flex flex-row items-center justify-between gap-2">
            <CardTitle>Continue Learning</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setLocation('/training')}
              data-testid="button-browse-all"
            >
              Browse All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modulesWithProgress.map((module) => (
                <ModuleCard 
                  key={module.id} 
                  {...module} 
                  onStart={() => setLocation('/training')}
                />
              ))}
            </div>
            {modulesWithProgress.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No training modules available yet</p>
                <Button onClick={() => setLocation('/training')} data-testid="button-explore">
                  Explore Training
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
