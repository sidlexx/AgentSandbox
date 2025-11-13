import { useState } from "react";
import Header from "@/components/Header";
import SimulationChat from "@/components/SimulationChat";
import FeedbackPanel from "@/components/FeedbackPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlayCircle, RotateCcw } from "lucide-react";

export default function Simulation() {
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [isActive, setIsActive] = useState(false);
  const [sentiment, setSentiment] = useState(75);
  const [responseTime, setResponseTime] = useState(18);

  const scenarios = {
    beginner: "Password Reset Request",
    intermediate: "Billing Complaint",
    advanced: "Service Outage Crisis"
  };

  const mockHints = [
    'Show empathy towards customer frustration',
    'Provide clear step-by-step instructions',
    'Confirm understanding before proceeding'
  ];

  const handleStartSimulation = () => {
    setIsActive(true);
    console.log('Simulation started with difficulty:', difficulty);
  };

  const handleResetSimulation = () => {
    setIsActive(false);
    setSentiment(75);
    setResponseTime(0);
    console.log('Simulation reset');
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    setSentiment(Math.min(100, sentiment + Math.floor(Math.random() * 10)));
    setResponseTime(responseTime + Math.floor(Math.random() * 5 + 3));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Live Simulation</h1>
          <p className="text-muted-foreground">Practice with AI-powered customer scenarios</p>
        </div>

        {!isActive ? (
          <Card className="max-w-2xl mx-auto" data-testid="card-simulation-setup">
            <CardHeader>
              <CardTitle>Start New Simulation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Difficulty</label>
                <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                  <SelectTrigger data-testid="select-difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - Password Reset</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Billing Complaint</SelectItem>
                    <SelectItem value="advanced">Advanced - Service Outage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="font-semibold">Scenario Preview</h3>
                <p className="text-sm text-muted-foreground">
                  {difficulty === 'beginner' && "A customer has forgotten their password and needs assistance resetting it. They're calm but need clear guidance."}
                  {difficulty === 'intermediate' && "A customer is upset about an unexpected charge on their bill. They're frustrated and want an immediate resolution."}
                  {difficulty === 'advanced' && "Multiple customers are reporting a critical service outage. Tensions are high and you need to manage expectations while providing updates."}
                </p>
              </div>

              <Button 
                className="w-full" 
                size="lg"
                onClick={handleStartSimulation}
                data-testid="button-start-simulation"
              >
                <PlayCircle className="w-5 h-5 mr-2" />
                Start Simulation
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div>
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                onClick={handleResetSimulation}
                data-testid="button-reset-simulation"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Simulation
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SimulationChat
                  difficulty={difficulty}
                  scenario={scenarios[difficulty]}
                  onSendMessage={handleSendMessage}
                />
              </div>

              <div className="lg:col-span-1">
                <FeedbackPanel
                  sentiment={sentiment}
                  responseTime={responseTime}
                  hints={mockHints}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
