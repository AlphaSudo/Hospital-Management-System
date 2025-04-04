import { cn } from "@/lib/utils";

interface BarChartProps {
  data: number[];
}

export function BarChart({ data }: BarChartProps) {
  // Find the maximum value to calculate relative heights
  const maxValue = Math.max(...data);
  
  return (
    <div className="flex items-end justify-between h-24 gap-2 mt-4">
      {data.map((value, index) => {
        // Calculate height percentage based on the maximum value
        const heightPercentage = (value / maxValue) * 100;
        
        return (
          <div 
            key={index}
            className={cn(
              "w-1/5 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-md",
              "transition-all duration-500"
            )}
            style={{ height: `${heightPercentage}%` }}
          />
        );
      })}
    </div>
  );
}
