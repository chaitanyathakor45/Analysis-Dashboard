interface StatusItem {
  label: string;
  value: string | number;
  status: "success" | "warning" | "error" | "info";
}

interface StatusGridProps {
  items: StatusItem[];
}

const statusColors = {
  success: "text-green-600 bg-green-50 border-green-200",
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200", 
  error: "text-red-600 bg-red-50 border-red-200",
  info: "text-blue-600 bg-blue-50 border-blue-200"
};

export const StatusGrid = ({ items }: StatusGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`p-3 rounded-lg border-2 text-center ${statusColors[item.status]}`}
        >
          <div className="text-lg font-bold mb-1">
            {item.value}
          </div>
          <div className="text-xs font-medium">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};