import { X, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Widget } from "@/types/dashboard";
import { useDashboard } from "@/context/DashboardContext";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { ProgressBars } from "@/components/charts/ProgressBars";
import { MetricsGrid } from "@/components/charts/MetricsGrid";
import { StatusGrid } from "@/components/charts/StatusGrid";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface DashboardWidgetProps {
  widget: Widget;
}

const renderWidgetContent = (widget: Widget) => {
  switch (widget.type) {
    case 'donut-chart':
      if (widget.category === 'cwpp') {
        const cwppDonutData = [
          { name: 'Secure', value: 142, color: 'hsl(var(--success))' },
          { name: 'Vulnerable', value: 23, color: 'hsl(var(--warning))' },
          { name: 'Critical', value: 5, color: 'hsl(var(--destructive))' },
          { name: 'Scanning', value: 8, color: 'hsl(var(--info))' }
        ];
        return <DonutChart data={cwppDonutData} />;
      }
      const donutData = [
        { name: 'Connected', value: 2, color: 'hsl(var(--success))' },
        { name: 'Not Connected', value: 2, color: 'hsl(var(--destructive))' }
      ];
      return <DonutChart data={donutData} />;
      
    case 'bar-chart':
      if (widget.category === 'cwpp') {
        const cwppBarData = [
          { name: 'Malware', value: 3, color: 'hsl(var(--destructive))' },
          { name: 'Suspicious', value: 12, color: 'hsl(var(--warning))' },
          { name: 'Blocked', value: 45, color: 'hsl(var(--info))' },
          { name: 'Allowed', value: 234, color: 'hsl(var(--success))' }
        ];
        return <BarChart data={cwppBarData} />;
      }
      const barData = [
        { name: 'Failed', value: 1689, color: 'hsl(var(--destructive))' },
        { name: 'Warning', value: 681, color: 'hsl(var(--warning))' },
        { name: 'Passed', value: 7253, color: 'hsl(var(--success))' },
        { name: 'N/A', value: 36, color: 'hsl(var(--muted))' }
      ];
      return <BarChart data={barData} />;
      
    case 'line-chart':
      const lineData = [
        { name: 'Jan', value: 125430 },
        { name: 'Feb', value: 132890 },
        { name: 'Mar', value: 145320 },
        { name: 'Apr', value: 151200 },
        { name: 'May', value: 142850 },
        { name: 'Jun', value: 165400 }
      ];
      return <LineChart data={lineData} />;
      
    case 'area-chart':
      const areaData = [
        { name: 'Week 1', active: 8234, new: 1456 },
        { name: 'Week 2', active: 8890, new: 1623 },
        { name: 'Week 3', active: 9123, new: 1345 },
        { name: 'Week 4', active: 9567, new: 1789 }
      ];
      return (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="active" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              <Area type="monotone" dataKey="new" stackId="1" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      );
      
    case 'pie-chart':
      const pieData = [
        { name: 'North America', value: 45, color: 'hsl(var(--primary))' },
        { name: 'Europe', value: 32, color: 'hsl(var(--success))' },
        { name: 'Asia Pacific', value: 18, color: 'hsl(var(--warning))' },
        { name: 'Others', value: 5, color: 'hsl(var(--muted))' }
      ];
      return (
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={60}
                dataKey="value"
                label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
      
    case 'progress-bars':
      if (widget.category === 'cwpp') {
        const cwppProgressItems = [
          { label: 'Compliant', value: 89, color: 'hsl(var(--success))' },
          { label: 'Non-compliant', value: 11, color: 'hsl(var(--destructive))' },
          { label: 'Pending Review', value: 23, total: 100, color: 'hsl(var(--warning))' },
          { label: 'Exceptions', value: 5, total: 100, color: 'hsl(var(--info))' }
        ];
        return <ProgressBars items={cwppProgressItems} />;
      }
      const progressItems = [
        { label: 'Critical', value: 9, total: 1470, color: 'hsl(var(--destructive))' },
        { label: 'High', value: 150, total: 1470, color: 'hsl(var(--warning))' },
        { label: 'Medium', value: 680, total: 1470, color: 'hsl(var(--info))' },
        { label: 'Low', value: 631, total: 1470, color: 'hsl(var(--success))' }
      ];
      return <ProgressBars items={progressItems} />;
      
    case 'metrics':
      const metrics = [
        { label: 'Total Images', value: '2', trend: 'up' as const },
        { label: 'High Risk', value: '150', trend: 'down' as const },
        { label: 'Scanned Today', value: '24', trend: 'up' as const },
        { label: 'Clean Images', value: '78%', trend: 'neutral' as const }
      ];
      return <MetricsGrid metrics={metrics} />;
      
    case 'revenue-chart':
      const revenueData = [
        { name: 'Q1', value: 65000 },
        { name: 'Q2', value: 75000 },
        { name: 'Q3', value: 82000 },
        { name: 'Q4', value: 89450 }
      ];
      return <LineChart data={revenueData} />;
      
    case 'gauge-chart':
      if (widget.category === 'cwpp') {
        const cwppGaugeItems = [
          { label: 'CPU Usage', value: 67, color: 'hsl(var(--warning))' },
          { label: 'Memory', value: 84, color: 'hsl(var(--destructive))' },
          { label: 'Network', value: 45, color: 'hsl(var(--success))' },
          { label: 'Disk I/O', value: 32, color: 'hsl(var(--info))' }
        ];
        return <ProgressBars items={cwppGaugeItems} />;
      }
      const gaugeItems = [
        { label: 'CPU Usage', value: 67, color: 'hsl(var(--warning))' },
        { label: 'Memory', value: 84, color: 'hsl(var(--destructive))' },
        { label: 'Disk Space', value: 45, color: 'hsl(var(--success))' },
        { label: 'Network', value: 92, color: 'hsl(var(--info))' }
      ];
      return <ProgressBars items={gaugeItems} />;
      
    case 'status-grid':
      const statusItems = [
        { label: 'Online', value: 24, status: 'success' as const },
        { label: 'Maintenance', value: 2, status: 'warning' as const },
        { label: 'Offline', value: 1, status: 'error' as const },
        { label: 'Uptime', value: '99.8%', status: 'info' as const }
      ];
      return <StatusGrid items={statusItems} />;
      
    default:
      return (
        <div className="text-sm text-muted-foreground whitespace-pre-line">
          {widget.text}
        </div>
      );
  }
};

export const DashboardWidget = ({ widget }: DashboardWidgetProps) => {
  const { removeWidget } = useDashboard();

  return (
    <Card className="relative group bg-dashboard-widget border shadow-lg hover:shadow-xl transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base font-semibold text-card-foreground">
            {widget.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
            onClick={() => removeWidget(widget.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {renderWidgetContent(widget)}
      </CardContent>
    </Card>
  );
};

interface AddWidgetCardProps {
  categoryId: string;
  onAddWidget: (categoryId: string) => void;
}

export const AddWidgetCard = ({ categoryId, onAddWidget }: AddWidgetCardProps) => {
  return (
    <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors cursor-pointer group">
      <CardContent className="flex items-center justify-center p-8">
        <Button
          variant="ghost"
          onClick={() => onAddWidget(categoryId)}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary group-hover:text-primary"
        >
          <Plus className="h-8 w-8" />
          <span className="text-sm">Add Widget</span>
        </Button>
      </CardContent>
    </Card>
  );
};