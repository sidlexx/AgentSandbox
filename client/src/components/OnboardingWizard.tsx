import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

interface OnboardingWizardProps {
  onComplete: (data: any) => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const updateAnswer = (key: string, value: any) => {
    setAnswers({ ...answers, [key]: value });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-4">How much customer service experience do you have?</h3>
              <RadioGroup
                value={answers.experience}
                onValueChange={(value) => updateAnswer('experience', value)}
                data-testid="radio-experience"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="none" id="exp-none" />
                  <Label htmlFor="exp-none" className="flex-1 cursor-pointer">No experience (0-6 months)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="some" id="exp-some" />
                  <Label htmlFor="exp-some" className="flex-1 cursor-pointer">Some experience (6-12 months)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="experienced" id="exp-exp" />
                  <Label htmlFor="exp-exp" className="flex-1 cursor-pointer">Experienced (1-3 years)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="expert" id="exp-expert" />
                  <Label htmlFor="exp-expert" className="flex-1 cursor-pointer">Expert (3+ years)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-4">How do you learn best?</h3>
              <RadioGroup
                value={answers.learningStyle}
                onValueChange={(value) => updateAnswer('learningStyle', value)}
                data-testid="radio-learning-style"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="visual" id="learn-visual" />
                  <Label htmlFor="learn-visual" className="flex-1 cursor-pointer">Visual (videos, diagrams)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="auditory" id="learn-auditory" />
                  <Label htmlFor="learn-auditory" className="flex-1 cursor-pointer">Auditory (listening, discussions)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="kinesthetic" id="learn-kinesthetic" />
                  <Label htmlFor="learn-kinesthetic" className="flex-1 cursor-pointer">Kinesthetic (hands-on practice)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-4">What role are you training for?</h3>
              <RadioGroup
                value={answers.role}
                onValueChange={(value) => updateAnswer('role', value)}
                data-testid="radio-role"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="support" id="role-support" />
                  <Label htmlFor="role-support" className="flex-1 cursor-pointer">Customer Support Representative</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="technical" id="role-technical" />
                  <Label htmlFor="role-technical" className="flex-1 cursor-pointer">Technical Support Specialist</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="sales" id="role-sales" />
                  <Label htmlFor="role-sales" className="flex-1 cursor-pointer">Sales Support Agent</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover-elevate border">
                  <RadioGroupItem value="manager" id="role-manager" />
                  <Label htmlFor="role-manager" className="flex-1 cursor-pointer">Team Lead / Manager</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" data-testid="card-onboarding">
      <CardHeader>
        <CardTitle>Welcome to AgentTrainAI</CardTitle>
        <CardDescription>Let's personalize your training experience</CardDescription>
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="font-medium">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <Progress value={(step / totalSteps) * 100} data-testid="progress-onboarding" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {renderStep()}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            data-testid="button-back"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[step === 1 ? 'experience' : step === 2 ? 'learningStyle' : 'role']}
            data-testid="button-next"
          >
            {step === totalSteps ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
