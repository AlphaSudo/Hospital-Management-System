import EgyptFlag from "@/assets/icons/EgyptFlag";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
}

export function Header({
  title,
  icon,
  sidebarOpen,
  setSidebarOpen,
  language,
  setLanguage,
}: HeaderProps) {
   // Define sidebar widths based on the state
  const sidebarWidth = sidebarOpen ? '250px' : '70px';
  const headerHeight = '3rem'; // Corresponds to h-24
  return (
    <header className="h-12 px-8 flex items-center justify-between border-b border-[#5D0A72]/10 fixed top-0 z-50 bg-[#040223] gradient-bg-background transition-all duration-300 ease-in-out"// Added transition
    style={{
        left: sidebarWidth, // Set left based on sidebar width
        width: `calc(100% - ${sidebarWidth})`, // Calculate width dynamically
        height: headerHeight, // Explicit height if needed, though h-24 should work
      }}
    >
      {/* Left side: sidebar toggle + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md hover:bg-[#0A004A]/20 transition-all"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#94A3B8]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="w-10 h-10 flex items-center justify-center bg-[#05002E] rounded-lg shadow-md">
          {icon}
        </div>

        <span className="text-[#94A3B8] font-semibold text-lg">{title}</span>
      </div>

      {/* Right side: Search, full screen, language toggle, notifications */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-[#94A3B8]/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
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

        {/* Fullscreen */}
        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#94A3B8]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />
        
        {/* Notification */}
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#94A3B8]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-[#05002E] border border-[#5D0A72]/10 shadow-md hover:bg-[#0A004A]/20 transition-colors overflow-hidden p-0"
        >
          {language === "en" ? (
            // UK Flag
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 30"
              className="w-7 h-7"
            >
              <clipPath id="a">
                <path d="M0 0v30h60V0z" />
              </clipPath>
              <clipPath id="b">
                <path d="M30 15h30v15zv15H0zH0V0zV0h30z" />
              </clipPath>
              <g clipPath="url(#a)">
                <path d="M0 0v30h60V0z" fill="#012169" />
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
                <path
                  d="M0 0l60 30m0-30L0 30"
                  clipPath="url(#b)"
                  stroke="#C8102E"
                  strokeWidth="4"
                />
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
              </g>
            </svg>
          ) : (
            // Egypt Flag
            <EgyptFlag />
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
  );
}
