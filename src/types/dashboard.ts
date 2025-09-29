export interface Widget {
  id: string;
  name: string;
  text: string;
  category: string;
  type?: "text" | "donut-chart" | "bar-chart" | "line-chart" | "area-chart" | "pie-chart" | "progress-bars" | "metrics" | "revenue-chart" | "gauge-chart" | "status-grid";
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}

export interface AddWidgetFormData {
  name: string;
  text: string;
  category: string;
}