import React, { useMemo } from 'react'; // Import useMemo
import { CalendarEvent } from '@/types/calendar';
import { normalizeDate, getEventDateRange } from '@/utils/dateUtils';
import { WEEKDAYS_SHORT } from '@/utils/constants';

interface MonthViewProps {
  year: number;
  month: number; // 0-indexed
  today: Date;
  events: CalendarEvent[];
  openAddModal: (date: Date) => void;
  openEditModal: (event: CalendarEvent) => void;
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
}

export const MonthView: React.FC<MonthViewProps> = ({
  year,
  month,
  today,
  events,
  openAddModal,
  openEditModal,
  getDaysInMonth,
  getFirstDayOfMonth,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayIndex = getFirstDayOfMonth(year, month);

  // Memoize the calculation of events per day
  const eventsByDay = useMemo(() => {
    const eventsMap: { [day: number]: CalendarEvent[] } = {};
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = normalizeDate(new Date(year, month, day));
      const dayEvents = events
        .filter(event => {
          const [eventStart, eventEnd] = getEventDateRange(event);
          return cellDate >= eventStart && cellDate < eventEnd;
        })
        .sort((a: CalendarEvent, b: CalendarEvent) =>
          (a.startTime || "").localeCompare(b.startTime || "")
        );
      if (dayEvents.length > 0) {
        eventsMap[day] = dayEvents;
      }
    }
    return eventsMap;
  }, [events, year, month, daysInMonth]); // Dependencies

  return (
    <div className="grid grid-cols-7 gap-1 md:gap-2 text-white text-xs md:text-sm">
      {WEEKDAYS_SHORT.map(day => (
        <div key={day} className="text-center font-semibold tracking-widest opacity-70 text-shadow-[0_1px_3px_rgba(255,255,255,0.2)] text-xs md:text-sm pb-2">
          {day}
        </div>
      ))}
      {Array.from({ length: firstDayIndex }).map((_, i) => (
        <div key={`empty-${i}`} className="border border-transparent"></div>
      ))}
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const dayOfMonth = i + 1;
        const cellDate = normalizeDate(new Date(year, month, dayOfMonth));
        const isToday = cellDate.getTime() === today.getTime();

        // Retrieve pre-calculated and sorted events for the day
        const dayEvents = eventsByDay[dayOfMonth] || [];

        const eventBaseStyle = "mt-1 px-1.5 py-0.5 rounded shadow-md shadow-black/40 flex items-center gap-1 text-[10px] md:text-xs font-medium text-white/95 cursor-pointer hover:opacity-80 transition-opacity";

        return (
          <div
            key={dayOfMonth}
            onClick={() => openAddModal(cellDate)}
            className={`
              relative min-h-[80px] md:min-h-[120px] flex flex-col items-center justify-start
              rounded-lg md:rounded-xl border border-white/15
              bg-gradient-to-br from-[#28286b]/60 via-[#30347e]/40 to-[#242157]/60
              shadow-[0_2px_10px_0_rgba(80,0,255,0.1)] p-1 md:p-1.5
              transition-all duration-300 ease-in-out cursor-pointer
              hover:bg-gradient-to-br hover:from-[#3a3a8b]/70 hover:via-[#4a4e9e]/60 hover:to-[#2e2b77]/70
              hover:shadow-[0_4px_15px_0_rgba(120,0,255,0.15)] hover:border-white/25 hover:scale-[1.02]
              ${isToday ? "ring-2 md:ring-3 ring-pink-400/70 ring-offset-1 ring-offset-[#1e1b47]/80 shadow-[0_0_10px_1px_rgba(236,72,153,0.4)]" : ""}
            `}
          >
            <span className={`
              font-bold text-sm md:text-base mb-0.5
              ${isToday ? "bg-gradient-to-r from-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-[0_0_5px_rgba(236,72,153,0.6)]" : "opacity-90"}
            `}>
              {dayOfMonth}
            </span>
            <div className="overflow-y-auto max-h-[calc(100%-1.5rem)] md:max-h-[calc(100%-1.8rem)] w-full px-0.5 space-y-1 scrollbar-thin scrollbar-thumb-purple-400/50 scrollbar-track-transparent">
              {/* Events are already filtered and sorted */}
              {dayEvents.map((event: CalendarEvent) => (
                  <div
                    key={event.id}
                    className={`${eventBaseStyle} bg-gradient-to-r ${event.colorGradient}`}
                    onClick={(e) => { e.stopPropagation(); openEditModal(event); }}
                    title={`${event.title}${event.startTime ? ` (${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''})` : ''} [${event.category}]`}
                  >
                    {event.startTime && <span className="text-[9px] md:text-[10px] opacity-80 font-mono hidden sm:inline">{event.startTime}</span>}
                    <span role="img" aria-label={event.title} className="text-xs md:text-sm">{event.emoji}</span>
                    <span className="truncate flex-1">{event.title}</span>
                    {event.durationDays > 1 && <span className="text-[8px] md:text-[9px] opacity-70 hidden sm:inline">({event.durationDays}d)</span>}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};