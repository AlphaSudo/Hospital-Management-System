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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      )
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "Departments",
      path: "/departments",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      )
    },
    {
      name: "Reports",
      path: "/reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <div className="w-64 flex-shrink-0 bg-sidebar bg-opacity-40 flex flex-col h-full border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 flex items-center">
        <div className="flex items-center gap-2">
          <div className="gradient-bg-purple rounded-md p-1 w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white">Cliniva</span>
        </div>
      </div>
      
      {/* User Profile */}
      <div className="p-6 flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
        <h3 className="text-lg font-semibold">Sarah Smith</h3>
        <p className="text-sm text-gray-400">Admin</p>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 flex flex-col gap-1 px-4">
        {navigationItems.map((item) => (
          <Link key={item.name} href={item.path}>
            <a className={cn(
              "py-3 px-4 flex items-center gap-3 hover:bg-purple-900 hover:bg-opacity-20 rounded-lg transition",
              location === item.path ? "active-nav" : ""
            )}>
              <span className={location === item.path ? "text-purple-300" : "text-gray-400"}>
                {item.icon}
              </span>
              <span className={cn(
                "font-medium",
                location === item.path ? "text-purple-300" : "text-gray-300" 
              )}>
                {item.name}
              </span>
            </a>
          </Link>
        ))}
        
        <div className="mt-auto mb-8 py-3 px-4 flex items-center gap-3 hover:bg-purple-900 hover:bg-opacity-20 rounded-lg transition cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <span className="font-medium text-gray-300">Dark Mode</span>
        </div>
      </div>
    </div>
  );
}
