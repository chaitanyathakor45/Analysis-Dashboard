import React, { useState } from "react";
import { DashboardProvider } from "@/context/DashboardContext";
import { DashboardHeader } from "@/components/DashboardHeader";
import { CategorySection } from "@/components/CategorySection";
import { AddWidgetDialog } from "@/components/AddWidgetDialog";
import { useDashboard } from "@/context/DashboardContext";

const DashboardContent = () => {
  const { dashboardData } = useDashboard();
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleAddWidget = (categoryId?: string) => {
    setSelectedCategory(categoryId);
    setIsAddWidgetOpen(true);
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto px-4 py-6">
        <DashboardHeader onAddWidget={() => handleAddWidget()} />
        
        <div className="space-y-8">
          {dashboardData.categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              onAddWidget={handleAddWidget}
            />
          ))}
        </div>

        <AddWidgetDialog
          isOpen={isAddWidgetOpen}
          onClose={() => {
            setIsAddWidgetOpen(false);
            setSelectedCategory(undefined);
          }}
          initialCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Index;
