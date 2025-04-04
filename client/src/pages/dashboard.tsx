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
            <div className="w-8 h-8 flex items-center justify-center bg-card bg-opacity-70 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-gray-300 font-medium">Dashboard</span>
          </div>

          {/* Search and user menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-card bg-opacity-60 w-64 text-sm py-2 pl-10 pr-4 rounded-full text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-card bg-opacity-60">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden">
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
            <h1 className="text-4xl font-bold">
              <span className="text-white">Good </span>
              <span className="text-gradient-cyan-purple">morning,</span>
            </h1>
            <h2 className="text-4xl font-bold mt-1 text-gradient-purple-pink">Sarah</h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Appointments Stat */}
            <DashboardCard
              title="Appointments"
              value="650"
              gradient="purple"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              }
            />

            {/* Operations Stat */}
            <DashboardCard
              title="Operations"
              value="450"
              gradient="orange"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              }
            />

            {/* New Patients Stat */}
            <DashboardCard
              title="New Patients"
              value="129"
              gradient="blue"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              }
            />

            {/* Earnings Stat */}
            <DashboardCard
              title="Earnings"
              value="$20,500"
              gradient="purple-dark"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              }
              extras={
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a1 1 0 012 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V6z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
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
                <a href="#" className="text-purple-400 text-sm">View All &rarr;</a>
              </div>
              
              {/* Empty appointment list */}
              <div className="flex flex-col gap-4">
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
              </div>
            </div>

            {/* Doctor Status */}
            <div className="rounded-xl p-6 bg-card card-glow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl">Doctor Status</h3>
                <a href="#" className="text-purple-400 text-sm">View All &rarr;</a>
              </div>
              
              {/* Empty doctor list */}
              <div className="flex flex-col gap-4">
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
                <div className="h-12 rounded-md bg-darkPurple bg-opacity-50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
