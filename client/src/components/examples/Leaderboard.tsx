import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  const mockEntries = [
    { rank: 1, name: 'Sarah Johnson', score: 98, xp: 2450 },
    { rank: 2, name: 'Michael Chen', score: 96, xp: 2380 },
    { rank: 3, name: 'Emma Williams', score: 94, xp: 2210 },
    { rank: 4, name: 'James Brown', score: 92, xp: 2150 },
    { rank: 5, name: 'Olivia Davis', score: 90, xp: 2050 },
    { rank: 6, name: 'Robert Miller', score: 89, xp: 1980 },
    { rank: 7, name: 'Sophia Wilson', score: 87, xp: 1920 },
    { rank: 8, name: 'David Martinez', score: 86, xp: 1850 },
    { rank: 9, name: 'Isabella Garcia', score: 84, xp: 1780 },
    { rank: 10, name: 'William Lee', score: 82, xp: 1720 },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <Leaderboard entries={mockEntries} />
    </div>
  );
}
