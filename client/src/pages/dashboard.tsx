import { Sidebar } from "@/components/ui/sidebar";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { HospitalSurveyChart } from "@/components/ui/dashboard-chart";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { hospitalSurveyData, barChartData } from "@/lib/dashboardData";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-background">
        {/* Header */}
        <header className="h-20 px-6 flex items-center justify-between">
          {/* Header Title with icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center bg-card/80 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </div>
            <span className="text-gray-300 font-medium">Dashboard</span>
          </div>

          {/* Search and user menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-card/40 w-64 text-sm py-2 pl-10 pr-4 rounded-full text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-card/40">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/20">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 px-6 pb-6">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-1">
              <span className="text-white">Good </span>
              <span className="text-[#3DB9FF]">morning,</span>
            </h1>
            <h2 className="text-4xl font-bold text-[#FF57E6]">Sarah</h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Appointments Stat */}
            <DashboardCard
              title="Appointments"
              value="650"
              gradient="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              }
            />

            {/* Operations Stat */}
            <DashboardCard
              title="Operations"
              value="450"
              gradient="orange"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15z" />
                  <path d="M8 12l2 2 4-4" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>
              }
            />

            {/* New Patients Stat */}
            <DashboardCard
              title="New Patients"
              value="129"
              gradient="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              }
            />

            {/* Earnings Stat */}
            <DashboardCard
              title="Earnings"
              value="$20,500"
              gradient="purple-dark"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              }
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Hospital Survey Chart (2 columns) */}
            <div className="lg:col-span-2">
              <HospitalSurveyChart data={hospitalSurveyData} />
            </div>

            {/* Revenue Chart (1 column) */}
            <div>
              <RevenueChart percentage={17} barData={barChartData} />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Total Appointments */}
            <div className="rounded-xl p-6 bg-card card-glow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Total Appointments</h3>
                <a href="#" className="text-purple-400 text-sm flex items-center">
                  View All 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
              
              {/* Empty appointment list */}
              <div className="flex flex-col gap-4">
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
              </div>
            </div>

            {/* Doctor Status */}
            <div className="rounded-xl p-6 bg-card card-glow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Doctor Status</h3>
                <a href="#" className="text-purple-400 text-sm flex items-center">
                  View All 
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
              
              {/* Empty doctor list */}
              <div className="flex flex-col gap-4">
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
                <div className="h-12 rounded-md bg-darkPurple/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
