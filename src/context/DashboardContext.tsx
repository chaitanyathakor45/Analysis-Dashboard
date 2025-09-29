import React, { createContext, useContext, useState, ReactNode } from "react";
import { DashboardData, Widget, Category } from "@/types/dashboard";

interface DashboardContextType {
  dashboardData: DashboardData;
  addWidget: (widget: Omit<Widget, "id">) => void;
  removeWidget: (widgetId: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialDashboardData: DashboardData = {
  categories: [
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "cspm-1",
          name: "Cloud Accounts",
          text: "Connected (2)\nNot Connected (2)\nTotal (4)",
          category: "cspm",
          type: "donut-chart"
        },
        {
          id: "cspm-2", 
          name: "Cloud Account Risk Assessment",
          text: "Failed (1689)\n9659\nWarning (681)\nPassed (7253)\nNot available (36)",
          category: "cspm",
          type: "bar-chart"
        }
      ]
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "cwpp-1",
          name: "Top 5 Namespace Specific Alerts",
          text: "No Graph data available!",
          category: "cwpp",
          type: "text"
        },
        {
          id: "cwpp-2",
          name: "Workload Alerts", 
          text: "No Graph data available!",
          category: "cwpp",
          type: "text"
        },
        {
          id: "cwpp-3",
          name: "Container Security Status",
          text: "Secure: 142\nVulnerable: 23\nCritical: 5\nScanning: 8",
          category: "cwpp",
          type: "donut-chart"
        },
        {
          id: "cwpp-4",
          name: "Runtime Threats",
          text: "Malware: 3\nSuspicious: 12\nBlocked: 45\nAllowed: 234",
          category: "cwpp",
          type: "bar-chart"
        },
        {
          id: "cwpp-5",
          name: "Workload Performance",
          text: "CPU: 67%\nMemory: 84%\nNetwork: 45%\nDisk I/O: 32%",
          category: "cwpp",
          type: "gauge-chart"
        },
        {
          id: "cwpp-6",
          name: "Policy Compliance",
          text: "Compliant: 89%\nNon-compliant: 11%\nPending Review: 23\nExceptions: 5",
          category: "cwpp",
          type: "progress-bars"
        }
      ]
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "registry-1",
          name: "Image Risk Assessment",
          text: "1470 Total Vulnerabilities\nCritical (9)\nCritical (2)",
          category: "registry",
          type: "progress-bars"
        },
        {
          id: "registry-2",
          name: "Image Security Issues",
          text: "2 Total Images\nHigh (150)\nHigh (2)",
          category: "registry",
          type: "metrics"
        }
      ]
    },
    {
      id: "analytics",
      name: "Analytics Dashboard",
      widgets: [
        {
          id: "analytics-1",
          name: "Website Traffic",
          text: "Monthly Visitors: 125,430\nPage Views: 342,850\nBounce Rate: 32%\nAvg Session: 2m 45s",
          category: "analytics",
          type: "line-chart"
        },
        {
          id: "analytics-2",
          name: "User Engagement",
          text: "Active Users: 8,234\nNew Users: 1,456\nReturning: 6,778\nConversion: 3.2%",
          category: "analytics",
          type: "area-chart"
        }
      ]
    },
    {
      id: "sales",
      name: "Sales Performance",
      widgets: [
        {
          id: "sales-1",
          name: "Revenue Overview",
          text: "Total Revenue: $89,450\nMonthly Growth: +12.5%\nTop Product: Dashboard Pro\nGoal Achievement: 87%",
          category: "sales",
          type: "revenue-chart"
        },
        {
          id: "sales-2",
          name: "Sales by Region",
          text: "North America: 45%\nEurope: 32%\nAsia Pacific: 18%\nOthers: 5%",
          category: "sales",
          type: "pie-chart"
        }
      ]
    },
    {
      id: "operations",
      name: "Operations Center",
      widgets: [
        {
          id: "ops-1",
          name: "System Health",
          text: "CPU Usage: 67%\nMemory: 84%\nDisk Space: 45%\nNetwork: 92%",
          category: "operations",
          type: "gauge-chart"
        },
        {
          id: "ops-2",
          name: "Server Status",
          text: "Online: 24\nMaintenance: 2\nOffline: 1\nUptime: 99.8%",
          category: "operations",
          type: "status-grid"
        }
      ]
    }
  ]
};

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);
  const [searchTerm, setSearchTerm] = useState("");

  const addWidget = (widget: Omit<Widget, "id">) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setDashboardData(prev => ({
      categories: prev.categories.map(category => 
        category.id === widget.category
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const removeWidget = (widgetId: string) => {
    setDashboardData(prev => ({
      categories: prev.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => widget.id !== widgetId)
      }))
    }));
  };

  return (
    <DashboardContext.Provider value={{
      dashboardData,
      addWidget,
      removeWidget,
      searchTerm,
      setSearchTerm
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};