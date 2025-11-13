import OnboardingWizard from '../OnboardingWizard';

export default function OnboardingWizardExample() {
  return (
    <div className="p-8 min-h-screen flex items-center justify-center">
      <OnboardingWizard onComplete={(data) => console.log('Onboarding completed:', data)} />
    </div>
  );
}
