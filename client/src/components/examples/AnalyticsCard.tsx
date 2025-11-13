import AnalyticsCard from '../AnalyticsCard';

export default function AnalyticsCardExample() {
  return (
    <div className="p-8 grid grid-cols-3 gap-4 max-w-4xl">
      <AnalyticsCard title="Accuracy" value={92} change={5.2} />
      <AnalyticsCard title="Avg Handle Time" value="3:45" change={-8.1} suffix="min" />
      <AnalyticsCard title="Learning Velocity" value={87} change={12.3} />
    </div>
  );
}
