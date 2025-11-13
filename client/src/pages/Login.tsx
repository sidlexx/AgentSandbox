import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Brain } from "lucide-react";
import { login, register } from "@/lib/api";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const user = await login(username, password);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.username}`,
        });
        
        // Check if onboarding is completed
        if (!user.onboardingCompleted) {
          setLocation("/onboarding");
        } else {
          setLocation("/");
        }
      } else {
        await register(username, password, email);
        toast({
          title: "Account created!",
          description: "Please log in to continue",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">AgentTrainAI</CardTitle>
          <CardDescription>
            {isLogin ? "Welcome back! Sign in to continue your training" : "Create an account to start your journey"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading} data-testid="button-submit">
              {loading ? "Loading..." : isLogin ? "Sign In" : "Create Account"}
            </Button>

            <div className="text-center">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                data-testid="button-toggle-mode"
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
              </Button>
            </div>
          </form>

          {isLogin && (
            <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-2">Demo Account:</p>
              <p className="text-muted-foreground">Username: demo</p>
              <p className="text-muted-foreground">Password: demo123</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
