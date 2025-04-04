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
      "rounded-xl p-6 relative overflow-hidden flex flex-col min-h-[160px]",
      gradientClasses[gradient],
      className
    )}>
      <div className="absolute top-6 right-6 bg-white/30 w-10 h-10 flex items-center justify-center rounded-full">
        {icon}
      </div>
      {extras && <div className="mb-4">{extras}</div>}
      <h2 className="text-5xl font-bold text-white mt-auto">{value}</h2>
      <p className="text-white/80 mt-1 font-medium">{title}</p>
    </div>
  );
}
