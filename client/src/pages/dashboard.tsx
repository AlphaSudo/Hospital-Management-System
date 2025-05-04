import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/Header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { HospitalSurveyChart } from "@/components/ui/dashboard-chart";
import ChartIcon from "@/components/icons/ChartIcon";
import { RevenueChart } from "@/components/ui/revenue-chart";
import { hospitalSurveyData, barChartData } from "@/lib/dashboardData";
import { ChartGradients } from "@/lib/chart-gradients";
// Import extracted icons
import CalendarIcon from "@/components/icons/CalendarIcon";
import TrendingUpIcon from "@/components/icons/TrendingUpIcon";
import ScalpelIcon from "@/components/icons/ScalpelIcon";
import UserIcon from "@/components/icons/UserIcon";
import DollarSignIcon from "@/components/icons/DollarSignIcon";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Add SVG gradients for charts
      
      is like a little "paint palette" for your charts, 
      hidden off-screen but ready to be used.*/}
      <ChartGradients />

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-[#040223] gradient-bg-background">
        {/* Header */}

        <Header
          title="Dashboard"
          icon={
            <ChartIcon/>
          }
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />

        {/* Dashboard Content */}
        <div className="flex-1 px-8 py-8 pt-24 overflow-y-auto custom-scrollbar">
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
              icon={<CalendarIcon />} // Use imported component
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <TrendingUpIcon /> {/* Use imported component */}
                  +5.2%
                </div>
              }
            />

            {/* Operations Stat */}
            <DashboardCard
              title="Operations"
              value="450"
              gradient="orange"
              icon={<ScalpelIcon />} // Use imported component
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <TrendingUpIcon /> {/* Use imported component */}
                  +2.8%
                </div>
              }
            />

            {/* New Patients Stat */}
            <DashboardCard
              title="New Patients"
              value="129"
              gradient="blue"
              icon={<UserIcon />} // Use imported component
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <TrendingUpIcon /> {/* Use imported component */}
                  +4.6%
                </div>
              }
            />

            {/* Earnings Stat */}
            <DashboardCard
              title="Earnings"
              value="$20,500"
              gradient="blue"
              icon={<DollarSignIcon />} // Use imported component
              extras={
                <div className="text-xs font-medium text-white/70 flex items-center gap-1 mt-1">
                  <TrendingUpIcon /> {/* Use imported component */}
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
                <h3 className="text-white font-bold text-xl">
                  Total Appointments
                </h3>
                <a
                  href="#"
                  className="text-[#5D0A72] text-sm flex items-center"
                >
                  View All
                  <ChevronRightIcon /> {/* Use imported component */}
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
                <a
                  href="#"
                  className="text-[#5D0A72] text-sm flex items-center"
                >
                  View All
                  <ChevronRightIcon /> {/* Use imported component */}
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
