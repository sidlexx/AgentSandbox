import PerformanceChart from '../PerformanceChart';

export default function PerformanceChartExample() {
  const mockData = [
    { day: 'Mon', score: 72 },
    { day: 'Tue', score: 78 },
    { day: 'Wed', score: 75 },
    { day: 'Thu', score: 85 },
    { day: 'Fri', score: 88 },
    { day: 'Sat', score: 91 },
    { day: 'Sun', score: 94 },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <PerformanceChart data={mockData} />
    </div>
  );
}
