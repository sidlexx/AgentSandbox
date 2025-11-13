import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change: number;
  suffix?: string;
}

export default function AnalyticsCard({ title, value, change, suffix = "%" }: AnalyticsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card data-testid={`card-analytics-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold" data-testid="text-value">
            {value}{suffix && typeof value === 'number' ? suffix : ''}
          </span>
          <div className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? 'text-success' : 'text-destructive'
          }`} data-testid="text-change">
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(change)}%
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">vs. last week</p>
      </CardContent>
    </Card>
  );
}
