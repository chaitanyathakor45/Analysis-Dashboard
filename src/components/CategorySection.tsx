import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardWidget, AddWidgetCard } from "./DashboardWidget";
import { Category } from "@/types/dashboard";
import { useDashboard } from "@/context/DashboardContext";

interface CategorySectionProps {
  category: Category;
  onAddWidget: (categoryId: string) => void;
}

export const CategorySection = ({ category, onAddWidget }: CategorySectionProps) => {
  const { searchTerm } = useDashboard();
  
  // Filter widgets based on search term
  const filteredWidgets = category.widgets.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    widget.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Only show the category if it has widgets that match the search or if there's no search term
  if (searchTerm && filteredWidgets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWidgets.map((widget) => (
          <DashboardWidget key={widget.id} widget={widget} />
        ))}
        {!searchTerm && (
          <AddWidgetCard 
            categoryId={category.id} 
            onAddWidget={onAddWidget}
          />
        )}
      </div>
    </div>
  );
};