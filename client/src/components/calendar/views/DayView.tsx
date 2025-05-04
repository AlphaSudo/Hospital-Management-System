import React from 'react';
import { CalendarEvent } from '@/types/calendar'; // Reverted to alias path
import { MONTH_NAMES, WEEKDAYS_LONG } from '@/lib/constants'; // Reverted to alias path

interface DayViewProps {
  currentDate: Date;
  today: Date;
  events: CalendarEvent[];
  openAddModal: (date: Date) => void;
  openEditModal: (event: CalendarEvent) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  today,
  events,
  openAddModal,
  openEditModal,
}) => {
  const dayEvents = events;
  const isToday = currentDate.getTime() === today.getTime();
  const eventBaseStyle = "px-3 py-2 rounded-lg shadow-md shadow-black/40 flex items-center gap-3 text-sm font-medium text-white/95 cursor-pointer hover:opacity-90 transition-opacity";

  return (
      <div className="space-y-3 max-w-2xl mx-auto w-full">
          <h2 className={`text-2xl font-semibold text-center mb-4 ${isToday ? 'text-pink-400' : 'text-purple-300'}`}>
              {WEEKDAYS_LONG[currentDate.getDay()]}, {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getDate()}
          </h2>
          {dayEvents.length === 0 && (
              <p className="text-center text-gray-400 py-6">No events scheduled for this day.</p>
          )}
          {dayEvents
              .sort((a: CalendarEvent, b: CalendarEvent) => (a.startTime || "00:00").localeCompare(b.startTime || "00:00"))
              .map((event: CalendarEvent) => (
                  <div
                      key={event.id}
                      className={`${eventBaseStyle} bg-gradient-to-r ${event.colorGradient}`}
                      onClick={() => openEditModal(event)}
                      title={`${event.title} [${event.category}]`}
                  >
                      <div className="w-20 text-right font-mono text-xs opacity-80 flex-shrink-0">
                          {event.startTime ? (
                              <>
                                  <div>{event.startTime}</div>
                                  {event.endTime && <div className="opacity-70">to {event.endTime}</div>}
                              </>
                          ) : (
                              <div>All Day</div>
                          )}
                           {event.durationDays > 1 && <div className="text-[10px] opacity-60">({event.durationDays} days)</div>}
                      </div>
                      <div className="flex items-center gap-2 flex-1 overflow-hidden">
                           <span role="img" aria-label={event.title} className="text-lg">{event.emoji}</span>
                           <span className="truncate font-semibold">{event.title}</span>
                      </div>
                      <span className="text-xs capitalize opacity-70 bg-black/20 px-1.5 py-0.5 rounded">
                          {event.category}
                      </span>
                  </div>
              ))}
           <button 
             onClick={() => openAddModal(currentDate)} 
             className="mt-4 w-full text-center py-2 rounded-lg bg-white/5 hover:bg-white/10 text-purple-300 hover:text-pink-400 transition-colors"
           >
             + Add Event for this Day
           </button>
      </div>
  );
};
