import ModuleCard from '../ModuleCard';

export default function ModuleCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ModuleCard
        title="Customer Communication Basics"
        duration="25 min"
        progress={45}
        difficulty="beginner"
        xp={50}
        onStart={() => console.log('Module started')}
      />
    </div>
  );
}
