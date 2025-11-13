import BadgeDisplay from '../BadgeDisplay';

export default function BadgeDisplayExample() {
  const mockBadges = [
    { id: '1', name: 'First Perfect Score', icon: 'trophy', unlocked: true, description: 'Score 100% on any module' },
    { id: '2', name: '7-Day Streak', icon: 'flame', unlocked: true, description: 'Complete training 7 days in a row' },
    { id: '3', name: 'Peer Helper', icon: 'users', unlocked: false, description: 'Help 5 fellow agents' },
    { id: '4', name: 'Speed Demon', icon: 'target', unlocked: false, description: 'Complete 10 simulations in under 2 minutes' },
    { id: '5', name: 'Master Trainer', icon: 'star', unlocked: false, description: 'Complete all training modules' },
    { id: '6', name: 'Top Performer', icon: 'award', unlocked: false, description: 'Reach #1 on leaderboard' },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <BadgeDisplay badges={mockBadges} />
    </div>
  );
}
