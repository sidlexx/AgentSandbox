import SkillTree from '../SkillTree';

export default function SkillTreeExample() {
  const mockNodes = [
    { id: '1', title: 'Introduction to Customer Service', status: 'completed' as const, xp: 50 },
    { id: '2', title: 'Active Listening Skills', status: 'completed' as const, xp: 75 },
    { id: '3', title: 'Handling Complaints', status: 'unlocked' as const, xp: 100 },
    { id: '4', title: 'Advanced Conflict Resolution', status: 'locked' as const, xp: 150 },
    { id: '5', title: 'Crisis Management', status: 'locked' as const, xp: 200 },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <SkillTree nodes={mockNodes} onNodeClick={(id) => console.log('Clicked node:', id)} />
    </div>
  );
}
