import OnboardingWizard from "@/components/OnboardingWizard";
import { useLocation } from "wouter";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const handleComplete = (data: any) => {
    console.log('Onboarding completed with data:', data);
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <OnboardingWizard onComplete={handleComplete} />
    </div>
  );
}
