import { Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search";
import { useDashboard } from "@/context/DashboardContext";

interface DashboardHeaderProps {
  onAddWidget: () => void;
}

export const DashboardHeader = ({ onAddWidget }: DashboardHeaderProps) => {
  const { searchTerm, setSearchTerm } = useDashboard();

  return (
    <div className="flex flex-col space-y-4 mb-8">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        Home &gt; Dashboard V2
      </div>
      
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          <h1 className="text-2xl font-bold text-foreground">CNAPP Dashboard</h1>
          <SearchInput 
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={onAddWidget}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last 2 days</span>
          </div>
        </div>
      </div>
    </div>
  );
};