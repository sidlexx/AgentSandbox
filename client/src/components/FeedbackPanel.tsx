import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Smile, Meh, Frown, Clock, Lightbulb } from "lucide-react";

interface FeedbackPanelProps {
  sentiment: number;
  responseTime: number;
  hints: string[];
}

export default function FeedbackPanel({ sentiment, responseTime, hints }: FeedbackPanelProps) {
  const getSentimentIcon = () => {
    if (sentiment >= 70) return <Smile className="w-6 h-6 text-success" />;
    if (sentiment >= 40) return <Meh className="w-6 h-6 text-warning" />;
    return <Frown className="w-6 h-6 text-destructive" />;
  };

  const getSentimentColor = () => {
    if (sentiment >= 70) return "text-success";
    if (sentiment >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <Card data-testid="card-feedback-panel">
      <CardHeader>
        <CardTitle className="text-lg">Real-time Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Customer Sentiment</span>
            {getSentimentIcon()}
          </div>
          <Progress value={sentiment} className={getSentimentColor()} data-testid="progress-sentiment" />
          <span className="text-xs text-muted-foreground" data-testid="text-sentiment">{sentiment}%</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Response Time</span>
            <Clock className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="text-2xl font-bold" data-testid="text-response-time">{responseTime}s</div>
          <span className="text-xs text-muted-foreground">Target: &lt;30s</span>
        </div>

        {hints.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium">Hints</span>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {hints.map((hint, index) => (
                <li key={index} className="flex gap-2" data-testid={`hint-${index}`}>
                  <span>•</span>
                  <span>{hint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
