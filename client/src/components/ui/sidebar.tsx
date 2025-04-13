import { useState } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export function Sidebar() {
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
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      name: "Doctors",
      path: "/doctors",
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
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      name: "Departments",
      path: "/departments",
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
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
    },
    {
      name: "Reports",
      path: "/reports",
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="w-[200px] flex-shrink-0 flex flex-col h-full relative"
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
      {/* Logo */}
      <div className="pt-8 pb-6 px-6 flex items-center">
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

      {/* User Profile */}
      <div className="px-6 py-4 flex flex-col items-center mb-8">
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

      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-2 px-5">
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
                    : "text-gradient-to-b from-[#0D1D96] to-[#31A8FF] "
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
    </div>
  );
}
