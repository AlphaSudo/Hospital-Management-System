import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { ChartGradients } from "@/lib/chart-gradients";
import { cn } from "@/lib/utils";

// Define appointment data types
interface Appointment {
  id: number;
  patientName: string;
  doctor: string;
  gender: "male" | "female";
  date: string;
  time: string;
  phone: string;
  issue: string;
  email: string;
  status: "Completed" | "Scheduled" | "Cancelled";
  visitType: "New Patient" | "Follow-Up";
}

// Sample appointment data to match the screenshot
const sampleAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Cara Stevens",
    doctor: "Dr.Rajesh",
    gender: "female",
    date: "11/18/2024",
    time: "09:00",
    phone: "123456789",
    issue: "Fever",
    email: "cara.stevens@example.com",
    status: "Completed",
    visitType: "New Patient"
  },
  {
    id: 2,
    patientName: "John Doe",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/22/2024",
    time: "11:30",
    phone: "987654321",
    issue: "Cold",
    email: "john.doe@example.com",
    status: "Cancelled",
    visitType: "Follow-Up"
  },
  {
    id: 3,
    patientName: "Alice Johnson",
    doctor: "Dr.Jay Soni",
    gender: "female",
    date: "11/14/2024",
    time: "09:45",
    phone: "234567890",
    issue: "Headache",
    email: "alice.j@example.com",
    status: "Scheduled",
    visitType: "New Patient"
  },
  {
    id: 4,
    patientName: "Bob Brown",
    doctor: "Dr.Pooja Patel",
    gender: "male",
    date: "11/19/2024",
    time: "13:15",
    phone: "345678901",
    issue: "Back Pain",
    email: "bob.brown@example.com",
    status: "Cancelled",
    visitType: "New Patient"
  },
  {
    id: 5,
    patientName: "Sara Lee",
    doctor: "Dr.Jayesh Shah",
    gender: "female",
    date: "11/21/2024",
    time: "10:30",
    phone: "456789012",
    issue: "Flu",
    email: "sara.lee@example.com",
    status: "Completed",
    visitType: "Follow-Up"
  },
  {
    id: 6,
    patientName: "Tom Harris",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/13/2024",
    time: "14:15",
    phone: "567890123",
    issue: "Cough",
    email: "tom.harris@example.com",
    status: "Scheduled",
    visitType: "New Patient"
  },
  {
    id: 7,
    patientName: "Emma Wilson",
    doctor: "Dr.Rajesh",
    gender: "female",
    date: "11/18/2024",
    time: "16:45",
    phone: "678901234",
    issue: "Allergies",
    email: "emma.wilson@example.com",
    status: "Completed",
    visitType: "Follow-Up"
  },
  {
    id: 8,
    patientName: "David Lee",
    doctor: "Dr.Pooja Patel",
    gender: "male",
    date: "11/16/2024",
    time: "11:45",
    phone: "789012345",
    issue: "Stomach Ache",
    email: "david.lee@example.com",
    status: "Scheduled",
    visitType: "New Patient"
  },
  {
    id: 9,
    patientName: "Sophia Turner",
    doctor: "Dr.Jay Soni",
    gender: "female",
    date: "11/19/2024",
    time: "15:45",
    phone: "890123456",
    issue: "Joint Pain",
    email: "sophia.turner@example.com",
    status: "Cancelled",
    visitType: "Follow-Up"
  },
  {
    id: 10,
    patientName: "Michael Brown",
    doctor: "Dr.Sarah Smith",
    gender: "male",
    date: "11/23/2024",
    time: "12:30",
    phone: "901234567",
    issue: "Skin Rash",
    email: "michael.brown@example.com",
    status: "Cancelled",
    visitType: "New Patient"
  }
];

export default function AppointmentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [selectedAppointments, setSelectedAppointments] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Handle select all appointments
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAppointments([]);
    } else {
      setSelectedAppointments(sampleAppointments.map(appointment => appointment.id));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle selecting individual appointment
  const handleSelectAppointment = (id: number) => {
    if (selectedAppointments.includes(id)) {
      setSelectedAppointments(selectedAppointments.filter(appointmentId => appointmentId !== id));
    } else {
      setSelectedAppointments([...selectedAppointments, id]);
    }
  };
  
  // Function to get color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Function to get avatar background based on gender
  const getAvatarBg = (gender: string) => {
    return gender === "female" ? "bg-pink-200" : "bg-blue-200";
  };
  
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
          {/* Header Title with icon and sidebar toggle */}
          <div className="flex items-center gap-3">
            {/* Sidebar toggle button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md transition-all hover:bg-[#0A004A]/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            
            <div className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <span className="text-[#94A3B8] font-semibold text-lg">Appointments</span>
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
            
            {/* Full Screen Button */}
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else if (document.exitFullscreen) {
                  document.exitFullscreen();
                }
              }}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
            
            {/* Notification Button */}
            <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            
            {/* Language Selector - with flags */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors overflow-hidden p-0"
            >
              {language === 'en' ? (
                <div className="flex items-center justify-center w-full h-full">
                  {/* UK Flag */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-7 h-7">
                    <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
                    <clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
                    <g clipPath="url(#a)">
                      <path d="M0 0v30h60V0z" fill="#012169"/>
                      <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                      <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
                      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                    </g>
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {/* Egypt Flag */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="w-7 h-7">
                    <path fill="#CE1126" d="M0 0h900v600H0z"/>
                    <path fill="#FFF" d="M0 0h900v400H0z"/>
                    <path d="M0 0h900v200H0z"/>
                    <g fill="#C09300" transform="translate(450, 300)">
                      <path d="M-39.6 40.8s66-28.8 79.2 0C39.6 40.8-12 12-39.6 40.8z"/>
                      <path d="M-36 31.2s57.6-28.8 72 0c-36-31.2-36-31.2-72 0z"/>
                      <path d="M-26.4 24s45.6-21.6 52.8 0c-24-24-52.8 0-52.8 0z"/>
                      <path d="M-33.6-43.2c-15.6 15.6-8.4 48 7.2 64.8 12 13.2 38.4 31.2 38.4 31.2S18.2 36.9 4.4 19.7C-9.4 2.5-19.8-18.9-14.6-35.3c6-19.2-4.8-22.8-19.2-7.2z"/>
                      <path d="M-24-28.8c0 16.8 15.6 38.4 26.4 48 10.8 9.6 31.2 19.2 31.2 19.2s-25.2-21.6-36-38.4C-12.6-16.8-12-44.4-24-28.8z"/>
                    </g>
                  </svg>
                </div>
              )}
            </button>
            
            {/* User Profile */}
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#5D0A72]/20 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </header>

        {/* Appointments Content */}
        <div className="flex-1 px-8 py-8 bg-[#040223]">
          {/* Breadcrumbs and Title */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-[#94A3B8]/70 mb-2">
              <span>View Appointments</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>Appointment</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span>View</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Appointment</h1>
          </div>

          {/* Appointments Table Card */}
          <div className="bg-[#05002E] rounded-xl overflow-hidden shadow-lg border border-[#5D0A72]/10">
            {/* Table Header */}
            <div className="p-5 flex items-center justify-between border-b border-[#5D0A72]/10">
              <div className="flex items-center gap-2">
                <div className="relative w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#94A3B8]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search" 
                    className="bg-[#02001E] text-sm py-2 pl-10 pr-4 rounded-lg text-[#94A3B8] placeholder-[#94A3B8]/50 focus:outline-none focus:ring-1 focus:ring-[#5D0A72]/50 border border-[#5D0A72]/10 w-full"
                  />
                </div>
              </div>

              {/* Table Actions */}
              <div className="flex items-center gap-2">
                <button className="bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="10" x2="3" y2="10" />
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="21" y1="14" x2="3" y2="14" />
                    <line x1="21" y1="18" x2="3" y2="18" />
                  </svg>
                </button>
                <button className="bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </button>
                <button className="bg-[#05002E] text-[#94A3B8] p-2 rounded-lg hover:bg-[#0A004A]/20 transition-colors border border-[#5D0A72]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-[#94A3B8] bg-[#02001E]/50">
                    <th className="py-4 px-6 font-medium">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                        />
                      </div>
                    </th>
                    <th className="py-4 px-6 font-medium">Name</th>
                    <th className="py-4 px-6 font-medium">Doctor</th>
                    <th className="py-4 px-6 font-medium">Gender</th>
                    <th className="py-4 px-6 font-medium">Date</th>
                    <th className="py-4 px-6 font-medium">Time</th>
                    <th className="py-4 px-6 font-medium">Mobile</th>
                    <th className="py-4 px-6 font-medium">Injury</th>
                    <th className="py-4 px-6 font-medium">Email</th>
                    <th className="py-4 px-6 font-medium">
                      Appointment <br />Status
                    </th>
                    <th className="py-4 px-6 font-medium">Visit Type</th>
                    <th className="py-4 px-6 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#5D0A72]/10">
                  {sampleAppointments.map((appointment) => (
                    <tr 
                      key={appointment.id} 
                      className="text-[#94A3B8] hover:bg-[#02001E]/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedAppointments.includes(appointment.id)}
                          onChange={() => handleSelectAppointment(appointment.id)}
                          className="rounded border-[#5D0A72]/30 text-[#5D0A72] focus:ring-[#5D0A72]/30 h-4 w-4"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarBg(appointment.gender)}`}>
                            <span className="text-sm font-medium">
                              {appointment.patientName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span>{appointment.patientName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">{appointment.doctor}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.gender === 'female' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {appointment.gender}
                        </span>
                      </td>
                      <td className="py-4 px-6">{appointment.date}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#94A3B8]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {appointment.time}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#94A3B8]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          {appointment.phone}
                        </div>
                      </td>
                      <td className="py-4 px-6">{appointment.issue}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#94A3B8]/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                          {appointment.email}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">{appointment.visitType}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between border-t border-[#5D0A72]/10">
              <div className="text-sm text-[#94A3B8]">
                Items per page: 
                <select className="ml-2 bg-[#02001E] border border-[#5D0A72]/20 rounded px-2 py-1 text-[#94A3B8]">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div className="text-sm text-[#94A3B8]">
                1-10 of 80
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-md border border-[#5D0A72]/20 text-[#94A3B8] hover:bg-[#5D0A72]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button className="p-1 rounded-md border border-[#5D0A72]/20 text-[#94A3B8] hover:bg-[#5D0A72]/10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}