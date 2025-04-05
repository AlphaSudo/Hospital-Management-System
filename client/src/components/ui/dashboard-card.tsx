import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: "purple" | "orange" | "blue" | "purple-dark";
  className?: string;
  extras?: ReactNode;
}

export function DashboardCard({
  title,
  value,
  icon,
  gradient,
  className,
  extras
}: DashboardCardProps) {
  const gradientClasses = {
    "purple": "gradient-bg-purple card-glow",
    "orange": "gradient-bg-orange card-glow-orange",
    "blue": "gradient-bg-blue card-glow-blue",
    "purple-dark": "gradient-bg-purple-dark card-glow"
  };

  return (
    <div className={cn(
      "rounded-2xl p-7 relative overflow-hidden flex flex-col min-h-[170px] border border-white/5 shadow-lg",
      gradientClasses[gradient],
      className
    )}>
      <div className="absolute top-7 right-7 bg-white/20 w-11 h-11 flex items-center justify-center rounded-xl backdrop-blur-sm shadow-inner">
        {icon}
      </div>
      
      <div className="flex flex-col justify-between h-full">
        <div className="mb-auto pt-12">
          {extras && <div>{extras}</div>}
        </div>
        
        <div>
          <h2 className="text-[42px] font-bold text-white leading-tight tracking-tight">{value}</h2>
          <p className="text-white/80 mt-1 font-medium text-sm">{title}</p>
        </div>
      </div>
    </div>
  );
}
