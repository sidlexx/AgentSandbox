import OnboardingWizard from "@/components/OnboardingWizard";
import { useLocation } from "wouter";
import { getCurrentUser, completeOnboarding, setCurrentUser } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleComplete = async (data: any) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setLocation('/login');
      return;
    }

    try {
      const result = await completeOnboarding(
        currentUser.id,
        data.experience,
        data.learningStyle,
        data.role
      );

      // Update local user data
      setCurrentUser({
        ...currentUser,
        experienceLevel: data.experience,
        learningStyle: data.learningStyle,
        role: data.role,
        onboardingCompleted: true
      });

      toast({
        title: "Onboarding complete!",
        description: `Your personalized ${result.personalizedPath.estimatedDays}-day training path is ready`,
      });

      setLocation('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <OnboardingWizard onComplete={handleComplete} />
    </div>
  );
}
