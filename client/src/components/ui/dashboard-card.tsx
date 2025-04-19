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
  extras,
}: DashboardCardProps) {
  const gradientClasses = {
    purple:
      "bg-[radial-gradient(at_bottom_right,_#0B0033_30%,_#11013A_45%,_#35024C_65%,_#9F0558_100%)]",
    orange:
      "bg-[radial-gradient(at_bottom_right,_#0F022A_30%,_#2E0A27_55%,_#521523_70%,_#C53414_100%)]",
    blue: "bg-[radial-gradient(at_bottom_right,_#04063D_55%,_#04296D_100%)]",
    "purple-dark":
      "bg-[radial-gradient(at_bottom_right,_#07003D_55%,_#19016D_100%)]",
  };

  const borderClasses = {
    purple:
      "p-[1px] rounded-2xl bg-[conic-gradient(#b10170,#51025d_45deg,#8f0946_90deg,#971385_135deg,#2d016f_180deg,#1a026a_225deg,#850d9e_270deg,#fb0aa3_315deg,#b10170_360deg)]",
    /*----------------*/
    orange:
      "p-[1px] rounded-2xl bg-[conic-gradient(#d44317,#731d21_45deg,#be2d14_90deg,#be3816_135deg,#91231a_180deg,#712327_225deg,#f3480a_270deg,#ffa715_315deg,#d44317_360deg)]",
    /*----------------*/
    blue: "p-[1px] rounded-2xl bg-[conic-gradient(#072f93,#03115e_45deg,#031b78_90deg,#0f42c1_135deg,#021a70_180deg,#031a63_225deg,#0a70d2_270deg,#0e82ea_315deg,#072f93_360deg)]",
  };

  return (
    <div
      className={cn(
        borderClasses[gradient], // Original classes like p-[1px] rounded-2xl bg-[conic...]
        "grid ", // Make outer div a grid container
      )}
    >
      <div
        className={cn(
          "rounded-2xl p-7 relative overflow-hidden flex flex-col min-h-[170px] shadow-lg ",
          gradientClasses[gradient],
          // borderClasses[gradient],
          className,
        )}
      >
        <div className="absolute top-7 right-7 bg-white/20 w-11 h-11 flex items-center justify-center rounded-xl backdrop-blur-sm shadow-inner">
          {icon}
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="mb-auto pt-12">{extras && <div>{extras}</div>}</div>

          <div>
            <h2 className="text-[42px] font-bold text-white leading-tight tracking-tight">
              {value}
            </h2>
            <p className="text-white/80 mt-1 font-medium text-sm">{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
