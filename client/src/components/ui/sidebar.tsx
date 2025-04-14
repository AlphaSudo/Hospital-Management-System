import { useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import  DoctorWhiteCoatIcon  from '../icons/DoctorWhiteCoatIcon.tsx';
import DepartmentIcon from '../icons/DepartmentIcon.tsx';
import AppointmentsIcon from '../icons/AppointmentIcon.tsx';
import ReportIcon from '../icons/ReportIcon.tsx';
interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
}

export function Sidebar({ isOpen = true }: SidebarProps) {
  // Define a compact width for icons-only mode
  const sidebarWidth = isOpen ? 'w-[200px]' : 'w-[70px]';
  const [location] = useLocation();

  const navigationItems: NavigationItem[] = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: (
        <AppointmentsIcon className="h-8 w-8"/>
      ),
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: (
       <DoctorWhiteCoatIcon         className="h-8 w-8"  />
      ),
    },
    {
      name: "Departments",
      path: "/departments",
      icon: (
        <DepartmentIcon className="h-8 w-8" />
      ),
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
       <ReportIcon className="h-8 w-8"/>
      ),
    },
  ];

  return (
    <div
      className={`${sidebarWidth} flex-shrink-0 flex flex-col h-full relative transition-all duration-300 overflow-hidden`}
      style={{
        background: [
          "linear-gradient(to right, #040223 0%, #040223 75%, #060E40 100%)",
          "linear-gradient(to right, transparent 0%, transparent 192px, rgba(10, 31, 118, 1) 194px, rgba(10, 31, 118, 1) 200px)"
        ].join(", "),
        backgroundClip: "padding-box",
        backgroundOrigin: "padding-box",
        borderRight: "1px solid",
        borderImage: "linear-gradient(to bottom, #490791, #0B1B69) 1"
      }}
    >
      {/* Logo - Full Version */}
      {isOpen && (
        <div className="pt-8 pb-6 px-6 flex items-center transition-opacity duration-300">
          <div className="flex items-center gap-2">
            <div className="gradient-bg-purple rounded-md p-1.5 w-9 h-9 flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Cliniva
            </span>
          </div>
        </div>
      )}
      
      {/* Logo - Icon Only Version */}
      {!isOpen && (
        <div className="pt-8 pb-6 flex justify-center items-center transition-opacity duration-300">
          <div className="gradient-bg-purple rounded-md p-1.5 w-9 h-9 flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className={`px-6 py-4 flex flex-col items-center mb-8 ${!isOpen ? 'opacity-0 overflow-hidden' : 'opacity-100'} transition-opacity duration-300`}>
        <div className="w-[90px] h-[90px] rounded-full overflow-hidden mb-3 border-2 border-[#5D0A72]/30 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold text-white mt-2">Sarah Smith</h3>
        <p className="text-sm text-[#94A3B8]/80">Admin</p>
      </div>

      {/* Navigation - Full Version */}
      {isOpen && (
        <div className="flex-1 flex flex-col gap-2 px-5 transition-opacity duration-300">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span
                className={cn(
                  "py-3.5 px-4 flex items-center gap-3.5 hover:bg-[#5D0A72]/20 rounded-xl transition cursor-pointer",
                  location === item.path ? "active-nav" : "",
                )}
              >
                <span
                  className={
                    location === item.path
                      ? "text-[#5D0A72]"
                      : "text-[#31A8FF] bg-clip-text text-transparent"
                  }
                >
                  {item.icon}
                </span>
                <span
                  className={cn(
                    "font-medium text-sm",
                    location === item.path
                      ? "text-[#5D0A72]"
                      : "text-[#FDFEFB]",
                  )}
                >
                  {item.name}
                </span>
              </span>
            </Link>
          ))}
  
          <div className="mt-auto mb-8 py-3.5 px-4 flex items-center gap-3 hover:bg-[#5D0A72]/20 rounded-xl transition cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#94A3B8]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <span className="font-medium text-sm text-[#94A3B8]/80">
              Dark Mode
            </span>
          </div>
        </div>
      )}
      
      {/* Navigation - Icons Only Version */}
      {!isOpen && (
        <div className="flex-1 flex flex-col gap-4 items-center pt-8 transition-opacity duration-300">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.path}>
              <span
                className={cn(
                  "w-12 h-12 flex items-center justify-center hover:bg-[#5D0A72]/20 rounded-xl transition cursor-pointer",
                  location === item.path ? "active-nav-icon" : "",
                )}
              >
                <span
                  className={
                    location === item.path
                      ? "text-[#5D0A72]"
                      : "text-[#31A8FF] bg-clip-text text-transparent"
                  }
                >
                  {item.icon}
                </span>
              </span>
            </Link>
          ))}
  
          <div className="mt-auto mb-8 w-12 h-12 flex items-center justify-center hover:bg-[#5D0A72]/20 rounded-xl transition cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#94A3B8]/80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
