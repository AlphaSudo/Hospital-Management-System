import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { addDays, getEventDateRange } from '@/lib/dateUtils';
import { WEEKDAYS_SHORT } from '@/lib/constants';

interface WeekViewProps {
  weekStartDate: Date;
  today: Date;
  events: CalendarEvent[];
  openAddModal: (date: Date) => void;
  openEditModal: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  weekStartDate,
  today,
  events,
  openAddModal,
  openEditModal,
}) => {
  const weekDays: Date[] = Array.from({ length: 7 }).map((_, i) => addDays(weekStartDate, i));

  return (
    <div className="grid grid-cols-7 gap-1 md:gap-2 text-white">
      {weekDays.map(day => {
        const isToday = day.getTime() === today.getTime();
        return (
          <div key={day.toISOString()} className="text-center pb-2 border-b border-white/20 mb-2">
            <div className={`text-xs opacity-70 ${isToday ? 'text-pink-400' : ''}`}>{WEEKDAYS_SHORT[day.getDay()]}</div>
            <div className={`text-lg md:text-xl font-bold ${isToday ? 'text-pink-300' : ''}`}>{day.getDate()}</div>
          </div>
        );
      })}
      {weekDays.map(day => {
        const dayStart = day;
        const dayEnd = addDays(dayStart, 1);
        const dayEvents = events.filter(event => {
           const [eventStart, eventEnd] = getEventDateRange(event);
           return eventStart < dayEnd && eventEnd > dayStart;
        });
        const eventBaseStyle = "mt-1 px-1.5 py-1 rounded shadow-md shadow-black/40 flex items-center gap-1.5 text-xs font-medium text-white/95 cursor-pointer hover:opacity-80 transition-opacity";

        return (
          <div key={`col-${day.toISOString()}`} className="min-h-[200px] border-l border-white/10 first:border-l-0 px-1 space-y-1.5 flex flex-col">
             <div className="flex-grow space-y-1.5">
                 {dayEvents
                   .sort((a: CalendarEvent, b: CalendarEvent) => (a.startTime || "").localeCompare(b.startTime || ""))
                   .map((event: CalendarEvent) => (
                      <div
                        key={event.id}
                        className={`${eventBaseStyle} bg-gradient-to-r ${event.colorGradient}`}
                        onClick={(e) => { e.stopPropagation(); openEditModal(event); }}
                        title={`${event.title}${event.startTime ? ` (${event.startTime}${event.endTime ? ` - ${event.endTime}` : ''})` : ''} [${event.category}]`}
                      >
                        {event.startTime && <span className="text-[10px] opacity-80 font-mono">{event.startTime}</span>}
                        <span role="img" aria-label={event.title} className="text-sm">{event.emoji}</span>
                        <span className="truncate flex-1">{event.title}</span>
                        {/* Show duration only if it starts on this day */}
                        {event.durationDays > 1 && new Date(event.year, event.month, event.day).getTime() === day.getTime() && <span className="text-[9px] opacity-70">({event.durationDays}d)</span>}
                      </div>
                 ))}
             </div>
             <button onClick={() => openAddModal(day)} className="mt-auto pt-2 text-center w-full text-purple-400/70 hover:text-pink-400 text-xs opacity-60 hover:opacity-100 transition-opacity">+ Add</button>
          </div>
        );
      })}
    </div>
  );
};
