import React, { useState, useEffect, useMemo } from "react";
import { Sidebar } from "../components/ui/sidebar";
import { Header } from "../components/ui/Header";
import { AppWindowIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarEvent, EventCategory, eventCategories } from "../types/calendar";
import {
    getDaysInMonth,
    getFirstDayOfMonth,
    addDays,
    getWeekStartDate,
    formatDate,
    getEventDateRange,
    normalizeDate
} from "../utils/dateUtils";
import { MONTH_NAMES, WEEKDAYS_SHORT, WEEKDAYS_LONG } from "../utils/constants";
import { EventModal } from "../components/calendar/EventModal";
// Import the view components
import { MonthView } from "../components/calendar/views/MonthView";
import { WeekView } from "../components/calendar/views/WeekView";
import { DayView } from "../components/calendar/views/DayView";
import { ListView } from "../components/calendar/views/ListView";

// --- Main Calendar Page Component ---
export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForModal, setSelectedDateForModal] = useState<Date | null>(null); // Store full date for modal context
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  const today = useMemo(() => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
  }, []);

  // State for the *currently displayed* period start date or reference date
  const [currentDate, setCurrentDate] = useState(today);

  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day' | 'list'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Initial events data (ensure month is 0-indexed)
  const [events, setEvents] = useState<CalendarEvent[]>([
     { id: '1', day: 5, month: 4, year: 2025, title: 'George Bday', emoji: '🎉', durationDays: 1, colorGradient: 'from-orange-500 to-red-600', category: 'friends' },
     { id: '2', day: 6, month: 4, year: 2025, title: 'Meeting', emoji: '💼', startTime: "09:00", endTime: "10:30", durationDays: 1, colorGradient: 'from-red-500 to-pink-600', category: 'work' },
     { id: '3', day: 7, month: 4, year: 2025, title: 'Workshop', emoji: '💡', startTime: "13:00", durationDays: 2, colorGradient: 'from-red-500 to-pink-600', category: 'work' },
     { id: '4', day: 16, month: 4, year: 2025, title: '7:30 Berlin', emoji: '✈️', startTime: "07:30", durationDays: 1, colorGradient: 'from-cyan-500 to-blue-600', category: 'travel' },
     { id: '5', day: 19, month: 4, year: 2025, title: 'Return Flight', emoji: '✈️', startTime: "18:00", durationDays: 1, colorGradient: 'from-cyan-500 to-blue-600', category: 'travel' },
     { id: '6', day: 23, month: 4, year: 2025, title: 'Gym', emoji: '💪', durationDays: 1, colorGradient: 'from-purple-600 to-pink-600', category: 'personal' },
     { id: '7', day: 10, month: 5, year: 2025, title: 'Project Due', emoji: '📌', durationDays: 1, colorGradient: 'from-yellow-500 to-amber-600', category: 'important' },
     { id: '8', day: 28, month: 4, year: 2025, title: 'Conference', emoji: '📅', durationDays: 3, colorGradient: 'from-blue-600 to-indigo-700', category: 'work' },
  ]);

  // --- Derived Date Values based on currentDate ---
  const currentDisplayYear = currentDate.getFullYear();
  const currentDisplayMonth = currentDate.getMonth(); // 0-indexed
  const currentDisplayDay = currentDate.getDate();

  const currentWeekStartDate = useMemo(() => getWeekStartDate(currentDate), [currentDate]);

  // --- Event Handlers (Add, Edit) ---
  const handleAddEvent = (newEventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
        ...newEventData,
        id: Date.now().toString() + Math.random().toString(36).substring(2, 9), // Simple unique ID
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  const handleEditEvent = (updatedEvent: CalendarEvent) => {
    setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setEditingEvent(null);
  };

  // --- Navigation Handlers ---
  const handlePrevious = () => {
    setCurrentDate(prevDate => {
        switch (currentView) {
            case 'month':
                return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            case 'week':
                return addDays(prevDate, -7);
            case 'day':
                return addDays(prevDate, -1);
            case 'list': // Example: Go back one month for list view
                 return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
            default:
                return prevDate;
        }
    });
  };

  const handleNext = () => {
     setCurrentDate(prevDate => {
        switch (currentView) {
            case 'month':
                return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            case 'week':
                return addDays(prevDate, 7);
            case 'day':
                return addDays(prevDate, 1);
            case 'list': // Example: Go forward one month for list view
                 return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
            default:
                return prevDate;
        }
    });
  };

  const goToToday = () => {
    setCurrentDate(today);
  };

  // --- Modal Control ---
  const openAddModal = (date: Date) => {
    setSelectedDateForModal(date); // Store the full date
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    // Set the context date for the modal based on the event being edited
    setSelectedDateForModal(new Date(event.year, event.month, event.day));
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setSelectedDateForModal(null);
  };

  // --- Filtering Logic ---
  const categoryFilteredEvents = useMemo(() => events.filter(event =>
    selectedCategory === 'all' || event.category === selectedCategory
  ), [events, selectedCategory]);

  const eventsForView = useMemo(() => {
    switch (currentView) {
      case 'month': {
        const monthStart = normalizeDate(new Date(currentDisplayYear, currentDisplayMonth, 1));
        const monthEnd = normalizeDate(new Date(currentDisplayYear, currentDisplayMonth + 1, 1));
        return categoryFilteredEvents.filter(event => {
          const [eventStart, eventEnd] = getEventDateRange(event);
          return eventStart < monthEnd && eventEnd > monthStart;
        });
      }
      case 'week': {
        const weekStart = currentWeekStartDate;
        const weekEnd = addDays(weekStart, 7);
        return categoryFilteredEvents.filter(event => {
          const [eventStart, eventEnd] = getEventDateRange(event);
          return eventStart < weekEnd && eventEnd > weekStart;
        });
      }
      case 'day': {
        const dayStart = normalizeDate(currentDate);
        const dayEnd = addDays(dayStart, 1);
        return categoryFilteredEvents.filter(event => {
          const [eventStart, eventEnd] = getEventDateRange(event);
          return eventStart < dayEnd && eventEnd > dayStart;
        });
      }
      case 'list': {
        const listStartDate = normalizeDate(new Date(currentDisplayYear, currentDisplayMonth, 1));
        return categoryFilteredEvents
            .filter(event => {
                const [eventStart, eventEnd] = getEventDateRange(event);
                return eventStart >= listStartDate;
            })
            .sort((a, b) => {
                 const dateA = new Date(a.year, a.month, a.day).getTime();
                 const dateB = new Date(b.year, b.month, b.day).getTime();
                 return dateA - dateB || (a.startTime || "").localeCompare(b.startTime || "");
            });
      }
      default:
        return [];
    }
  }, [categoryFilteredEvents, currentView, currentDate, currentDisplayYear, currentDisplayMonth, currentWeekStartDate]);


  // --- Helper variables for rendering ---
  const isTodayInView = useMemo(() => {
    const todayTime = today.getTime();
    switch (currentView) {
        case 'month':
            return currentDisplayYear === today.getFullYear() && currentDisplayMonth === today.getMonth();
        case 'week':
            const weekStart = currentWeekStartDate;
            const weekEnd = addDays(weekStart, 7);
            return todayTime >= weekStart.getTime() && todayTime < weekEnd.getTime();
        case 'day':
            return currentDate.getTime() === todayTime;
        case 'list':
             const listStartDate = new Date(currentDisplayYear, currentDisplayMonth, 1);
             listStartDate.setHours(0,0,0,0);
             return todayTime >= listStartDate.getTime();
        default:
            return false;
    }
  }, [currentView, currentDate, currentDisplayYear, currentDisplayMonth, currentWeekStartDate, today]);


  // --- Main Return ---
  return (
    <div className="flex min-h-screen ">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col bg-[#040223] gradient-bg-background">
        <Header
            title="Calendar"
            icon={<AppWindowIcon className="h-8 w-8" />}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            language={language}
            setLanguage={setLanguage}
        />
        <main className="flex-1 p-4 md:p-8 pt-20 md:pt-24 flex flex-col items-center justify-start">
          <div className="w-4/5 max-w-7xl rounded-3xl shadow-2xl shadow-purple-500/30 border border-purple-500/50 bg-[#040223] backdrop-blur-xl p-4 md:p-8 relative">

            {/* --- Top Controls --- */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-2 md:px-4">
                <button className="order-1 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 shadow-lg shadow-purple-500/40 text-white font-semibold text-sm md:text-base border-2 border-white/30 hover:scale-105 hover:shadow-xl hover:shadow-purple-400/50 transition-all duration-300 ease-in-out"
                    onClick={() => openAddModal(currentDate)}
                >
                  Add Event
                </button>
                <button
                    onClick={goToToday}
                    disabled={isTodayInView && currentView !== 'list'}
                    className={`order-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                        isTodayInView && currentView !== 'list'
                        ? 'bg-pink-500/20 border-pink-500 text-pink-300 shadow-sm shadow-pink-500/30 cursor-default'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                >
                    Today
                </button>
                <div className="order-3 flex items-center gap-1 bg-[#1e1b47]/60 border border-white/20 rounded-lg p-1">
                    {(['month', 'week', 'day', 'list'] as const).map(view => (
                        <button
                            key={view}
                            onClick={() => setCurrentView(view)}
                            className={`px-2 md:px-3 py-1 rounded-md text-xs md:text-sm font-medium capitalize transition-colors ${
                                currentView === view
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-inner shadow-black/30'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                        >
                            {view}
                        </button>
                    ))}
                </div>
                <div className="order-4 md:order-last">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-2 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium capitalize transition-colors bg-[#1e1b47]/60 border border-white/20 text-gray-300 focus:ring-2 focus:ring-pink-500 outline-none hover:bg-white/10"
                    >
                        <option value="all" className="bg-[#1a1440]">All Categories</option>
                        {eventCategories.map(cat => (
                            <option key={cat} value={cat} className="bg-[#1a1440] capitalize">
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* --- Period Navigation and Title --- */}
            <div className="flex justify-between items-center mb-4 md:mb-6 px-1 md:px-4">
               <button
                 onClick={handlePrevious}
                 className="p-1 md:p-2 rounded-full hover:bg-white/10 transition-colors text-purple-300 hover:text-pink-400"
                 aria-label="Previous Period"
               >
                 <ChevronLeft size={28} />
               </button>
               <h1 className="text-center text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-400 via-cyan-300 to-blue-400 text-transparent bg-clip-text drop-shadow-[0_1px_5px_rgba(0,255,255,0.4)] py-1 mx-2 flex-grow">
                    {currentView === 'month' && `${MONTH_NAMES[currentDisplayMonth]} ${currentDisplayYear}`}
                    {currentView === 'week' && `Week of ${formatDate(currentWeekStartDate, { month: 'short', day: 'numeric' })}`}
                    {currentView === 'day' && `${formatDate(currentDate, { weekday: 'long', month: 'long', day: 'numeric' })}`}
                    {currentView === 'list' && `Events ${selectedCategory !== 'all' ? `(${selectedCategory})` : ''} from ${MONTH_NAMES[currentDisplayMonth]} ${currentDisplayYear}`}
                </h1>
               <button
                 onClick={handleNext}
                 className="p-1 md:p-2 rounded-full hover:bg-white/10 transition-colors text-purple-300 hover:text-pink-400"
                 aria-label="Next Period"
               >
                 <ChevronRight size={28} />
               </button>
            </div>

            {/* --- Main View Area --- */}
            <div className="mt-4">
                {currentView === 'month' && (
                    <MonthView
                        year={currentDisplayYear}
                        month={currentDisplayMonth}
                        today={today}
                        events={eventsForView}
                        openAddModal={openAddModal}
                        openEditModal={openEditModal}
                        getDaysInMonth={getDaysInMonth} // Pass utility function
                        getFirstDayOfMonth={getFirstDayOfMonth} // Pass utility function
                    />
                )}
                {currentView === 'week' && (
                    <WeekView
                        weekStartDate={currentWeekStartDate}
                        today={today}
                        events={eventsForView}
                        openAddModal={openAddModal}
                        openEditModal={openEditModal}
                    />
                )}
                {currentView === 'day' && (
                    <DayView
                        currentDate={currentDate}
                        today={today}
                        events={eventsForView}
                        openAddModal={openAddModal}
                        openEditModal={openEditModal}
                    />
                )}
                {currentView === 'list' && (
                    <ListView
                        events={eventsForView}
                        openEditModal={openEditModal}
                        selectedCategory={selectedCategory}
                        currentDisplayMonth={currentDisplayMonth}
                        currentDisplayYear={currentDisplayYear}
                    />
                )}
            </div>

          </div> {/* End Calendar Container */}
        </main>
      </div> {/* End flex-1 flex flex-col */}
      {/* Render the combined modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddEvent={handleAddEvent}
        onEditEvent={handleEditEvent}
        eventToEdit={editingEvent}
        initialDay={selectedDateForModal ? selectedDateForModal.getDate() : null}
        currentMonth={selectedDateForModal ? selectedDateForModal.getMonth() : currentDate.getMonth()}
        currentYear={selectedDateForModal ? selectedDateForModal.getFullYear() : currentDate.getFullYear()}
      />
    </div> // End flex min-h-screen
  );
}