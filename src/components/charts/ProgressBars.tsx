import { Progress } from "@/components/ui/progress";

interface ProgressItem {
  label: string;
  value: number;
  color: string;
  total?: number;
}

interface ProgressBarsProps {
  items: ProgressItem[];
}

export const ProgressBars = ({ items }: ProgressBarsProps) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-foreground font-medium">{item.label}</span>
            <span className="text-muted-foreground">
              {item.total ? `${item.value}/${item.total}` : `${item.value}%`}
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={item.total ? (item.value / item.total) * 100 : item.value} 
              className="h-2 bg-muted"
            />
            <div 
              className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${item.total ? (item.value / item.total) * 100 : item.value}%`,
                backgroundColor: item.color
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};