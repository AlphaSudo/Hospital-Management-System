import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { HospitalSurveyChart } from "@/components/ui/dashboard-chart";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { hospitalSurveyData, barChartData } from "@/lib/dashboardData";
import { ChartGradients } from "@/lib/chart-gradients";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add SVG gradients for charts */}
      <ChartGradients />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#040223] gradient-bg-background">
        {/* Header */}
        <header className="h-24 px-8 flex items-center justify-between border-b border-[#5D0A72]/10">
          {/* Header Title with icon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className="text-[#94A3B8] font-semibold text-lg">Dashboard</span>
          </div>

          {/* Search and user menu */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-[#05002E] w-72 text-sm py-2.5 pl-12 pr-4 rounded-xl text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-2 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10"
              />
            </div>
            
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#5D0A72]/20 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 px-8 py-8">
          {/* Greeting */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-white">Good </span>
              <span className="text-gradient-blue">morning,</span>
            </h1>
            <h2 className="text-4xl font-bold text-gradient-purple">Sarah</h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-8">
            {/* Appointments Stat */}
            <DashboardCard
              title="Appointments"
              value="650"
              gradient="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  +5.2%
                </div>
              }
            />

            {/* Operations Stat */}
            <DashboardCard
              title="Operations"
              value="450"
              gradient="orange"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0-2.1 10 4 4 0 0 1-6 3.9 21.3 21.3 0 0 0-6.6-8.1A6 6 0 0 1 8.7 3z" />
                  <path d="m15 8 2 2" />
                  <path d="M12 10.8 9 14" />
                </svg>
              }
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  +2.8%
                </div>
              }
            />

            {/* New Patients Stat */}
            <DashboardCard
              title="New Patients"
              value="129"
              gradient="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  +4.6%
                </div>
              }
            />

            {/* Earnings Stat */}
            <DashboardCard
              title="Earnings"
              value="$20,500"
              gradient="purple-dark"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              }
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                  </svg>
                  +9.5%
                </div>
              }
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-8">
            {/* Hospital Survey Chart (2 columns) */}
            <div className="lg:col-span-2 rounded-2xl overflow-hidden">
              <HospitalSurveyChart data={hospitalSurveyData} />
            </div>

            {/* Revenue Chart (1 column) */}
            <div className="rounded-2xl overflow-hidden">
              <RevenueChart percentage={17} barData={barChartData} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 mb-6">
            {/* Total Appointments */}
            <div className="rounded-2xl p-6 bg-[#05002E] card-glow border border-[#5D0A72]/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Total Appointments</h3>
                <a href="#" className="text-[#5D0A72] text-sm flex items-center">
                  View All 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
              
              {/* Empty appointment list */}
              <div className="flex flex-col gap-4">
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
              </div>
            </div>

            {/* Doctor Status */}
            <div className="rounded-2xl p-6 bg-[#05002E] card-glow border border-[#5D0A72]/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Doctor Status</h3>
                <a href="#" className="text-[#5D0A72] text-sm flex items-center">
                  View All 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
              
              {/* Empty doctor list */}
              <div className="flex flex-col gap-4">
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
                <div className="h-14 rounded-xl bg-[#02001E]/70 border border-[#5D0A72]/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
