import { Badge } from "@/components/ui/badge";

interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  color?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

export const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="text-center p-3 rounded-lg bg-muted/20">
          <div className="text-2xl font-bold text-foreground mb-1">
            {metric.value}
          </div>
          <div className="text-xs text-muted-foreground mb-2">
            {metric.label}
          </div>
          {metric.trend && (
            <Badge 
              variant={metric.trend === "up" ? "default" : metric.trend === "down" ? "destructive" : "secondary"}
              className="text-xs"
            >
              {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};