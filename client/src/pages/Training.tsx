import { useState } from "react";
import Header from "@/components/Header";
import SkillTree from "@/components/SkillTree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Brain, PlayCircle } from "lucide-react";

export default function Training() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const mockNodes = [
    { id: '1', title: 'Introduction to Customer Service', status: 'completed' as const, xp: 50 },
    { id: '2', title: 'Active Listening Skills', status: 'completed' as const, xp: 75 },
    { id: '3', title: 'Handling Complaints', status: 'unlocked' as const, xp: 100 },
    { id: '4', title: 'Advanced Conflict Resolution', status: 'locked' as const, xp: 150 },
    { id: '5', title: 'Crisis Management', status: 'locked' as const, xp: 200 },
    { id: '6', title: 'Team Leadership', status: 'locked' as const, xp: 250 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Training Modules</h1>
          <p className="text-muted-foreground">Progress through your personalized learning path</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillTree 
                  nodes={mockNodes} 
                  onNodeClick={(id) => {
                    setSelectedModule(id);
                    console.log('Selected module:', id);
                  }} 
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card data-testid="card-module-content">
              <CardHeader>
                <CardTitle>
                  {selectedModule ? `Module ${selectedModule}: Handling Complaints` : 'Select a Module'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedModule ? (
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
                      <TabsTrigger value="learn" data-testid="tab-learn">Learn</TabsTrigger>
                      <TabsTrigger value="practice" data-testid="tab-practice">Practice</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Video className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">Module Introduction Video</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold">What you'll learn:</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Identify common customer complaints</li>
                          <li>Apply the LEAP framework for resolution</li>
                          <li>Turn negative experiences into positive outcomes</li>
                          <li>Document and escalate when necessary</li>
                        </ul>
                      </div>
                      <Button className="w-full" data-testid="button-start-learning">
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Start Learning
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="learn" className="space-y-4">
                      <div className="prose prose-sm max-w-none">
                        <h3>Understanding Customer Complaints</h3>
                        <p className="text-muted-foreground">
                          Customer complaints are opportunities to build trust and demonstrate value. 
                          This module teaches you proven techniques to handle difficult situations with confidence.
                        </p>
                        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded">
                          <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-foreground">The LEAP Framework</h4>
                              <ul className="mt-2 space-y-1 text-muted-foreground">
                                <li><strong>L</strong>isten actively to the customer</li>
                                <li><strong>E</strong>mpathize with their situation</li>
                                <li><strong>A</strong>pologize and acknowledge the issue</li>
                                <li><strong>P</strong>rovide a solution or path forward</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="practice" className="space-y-4">
                      <div className="text-center py-8">
                        <Brain className="w-16 h-16 mx-auto text-primary mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Interactive Quiz</h3>
                        <p className="text-muted-foreground mb-6">
                          Test your knowledge with 10 scenario-based questions
                        </p>
                        <Button size="lg" data-testid="button-start-quiz">
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Quiz
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-16 text-muted-foreground">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Select a module from your learning path to begin</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
