import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchInput } from "@/components/ui/search";
import { useDashboard } from "@/context/DashboardContext";
import { AddWidgetFormData } from "@/types/dashboard";

interface AddWidgetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export const AddWidgetDialog = ({ isOpen, onClose, initialCategory }: AddWidgetDialogProps) => {
  const { dashboardData, addWidget } = useDashboard();
  const [formData, setFormData] = useState<AddWidgetFormData>({
    name: "",
    text: "",
    category: initialCategory || ""
  });
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all available widgets for the widget selector
  const allAvailableWidgets = [
    { id: "widget1", name: "Widget 1", category: "CSPM" },
    { id: "widget2", name: "Widget 2", category: "CWPP" },
    { id: "widget3", name: "Performance Monitor", category: "Image" },
    { id: "widget4", name: "Security Alerts", category: "Ticket" },
    { id: "widget5", name: "Compliance Status", category: "CSPM" },
    { id: "widget6", name: "Threat Detection", category: "CWPP" },
  ];

  const filteredWidgets = allAvailableWidgets.filter(widget =>
    widget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.text && formData.category) {
      addWidget(formData);
      setFormData({ name: "", text: "", category: initialCategory || "" });
      onClose();
    }
  };

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const handleConfirmWidgets = () => {
    // Add selected pre-defined widgets
    selectedWidgets.forEach(widgetId => {
      const widget = allAvailableWidgets.find(w => w.id === widgetId);
      if (widget && formData.category) {
        addWidget({
          name: widget.name,
          text: `Sample ${widget.name} content`,
          category: formData.category
        });
      }
    });
    
    setSelectedWidgets([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Personalise your dashboard by adding the following widget:
          </DialogDescription>
        </DialogHeader>

        {/* Widget Selector Section */}
        <div className="space-y-4">
          <div className="space-y-3">
            <Label>Select Category:</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {dashboardData.categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Search Widgets:</Label>
            <SearchInput
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Widget Categories Grid */}
          <div className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">CSPM</h4>
              {filteredWidgets
                .filter(w => w.category === "CSPM")
                .map(widget => (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={widget.id}
                      checked={selectedWidgets.includes(widget.id)}
                      onCheckedChange={() => handleWidgetToggle(widget.id)}
                    />
                    <Label htmlFor={widget.id} className="text-sm">{widget.name}</Label>
                  </div>
                ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">CWPP</h4>
              {filteredWidgets
                .filter(w => w.category === "CWPP")
                .map(widget => (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={widget.id}
                      checked={selectedWidgets.includes(widget.id)}
                      onCheckedChange={() => handleWidgetToggle(widget.id)}
                    />
                    <Label htmlFor={widget.id} className="text-sm">{widget.name}</Label>
                  </div>
                ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Image</h4>
              {filteredWidgets
                .filter(w => w.category === "Image")
                .map(widget => (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={widget.id}
                      checked={selectedWidgets.includes(widget.id)}
                      onCheckedChange={() => handleWidgetToggle(widget.id)}
                    />
                    <Label htmlFor={widget.id} className="text-sm">{widget.name}</Label>
                  </div>
                ))}
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Ticket</h4>
              {filteredWidgets
                .filter(w => w.category === "Ticket")
                .map(widget => (
                  <div key={widget.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={widget.id}
                      checked={selectedWidgets.includes(widget.id)}
                      onCheckedChange={() => handleWidgetToggle(widget.id)}
                    />
                    <Label htmlFor={widget.id} className="text-sm">{widget.name}</Label>
                  </div>
                ))}
            </div>
          </div>

          {selectedWidgets.length > 0 && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setSelectedWidgets([])}>
                Cancel
              </Button>
              <Button onClick={handleConfirmWidgets}>
                Confirm
              </Button>
            </div>
          )}
        </div>

        {/* Custom Widget Form */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-4">Or create a custom widget:</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Widget Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter widget name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {dashboardData.categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="text">Widget Content</Label>
              <Textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                placeholder="Enter widget content"
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Widget</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};