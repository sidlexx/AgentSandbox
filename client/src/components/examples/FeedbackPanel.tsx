import FeedbackPanel from '../FeedbackPanel';

export default function FeedbackPanelExample() {
  const mockHints = [
    'Show empathy towards customer frustration',
    'Provide clear step-by-step instructions',
    'Confirm understanding before proceeding'
  ];

  return (
    <div className="p-8 max-w-sm">
      <FeedbackPanel
        sentiment={75}
        responseTime={18}
        hints={mockHints}
      />
    </div>
  );
}
