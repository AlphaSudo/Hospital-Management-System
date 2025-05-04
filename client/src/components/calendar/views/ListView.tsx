import React from 'react';
import { CalendarEvent } from '@/types/calendar';
import { formatDate } from '@/lib/dateUtils';
import { MONTH_NAMES } from '@/lib/constants';

interface ListViewProps {
  events: CalendarEvent[];
  openEditModal: (event: CalendarEvent) => void;
  selectedCategory: string;
  currentDisplayMonth: number;
  currentDisplayYear: number;
}

export const ListView: React.FC<ListViewProps> = ({
  events,
  openEditModal,
  selectedCategory,
  currentDisplayMonth,
  currentDisplayYear,
}) => {
  const listEvents = events;
  const eventBaseStyle = "px-3 py-2 rounded-lg shadow-md shadow-black/40 flex items-center gap-3 text-sm font-medium text-white/95 cursor-pointer hover:opacity-90 transition-opacity";

  const eventsGroupedByDate: { [key: string]: CalendarEvent[] } = {};
  listEvents.forEach((event: CalendarEvent) => {
      const startDate = new Date(event.year, event.month, event.day);
      const startDateStr = formatDate(startDate, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
      if (!eventsGroupedByDate[startDateStr]) {
          eventsGroupedByDate[startDateStr] = [];
      }
      eventsGroupedByDate[startDateStr].push(event);
  });

  return (
      <div className="space-y-4 max-w-3xl mx-auto w-full">
           {Object.keys(eventsGroupedByDate).length === 0 && (
              <p className="text-center text-gray-400 py-10">No events found{selectedCategory !== 'all' ? ` for the '${selectedCategory}' category` : ''} starting from {MONTH_NAMES[currentDisplayMonth]} {currentDisplayYear}.</p>
          )}
          {Object.entries(eventsGroupedByDate).map(([dateStr, dayEvents]) => (
              <div key={dateStr}>
                  <h3 className="text-lg font-semibold text-purple-300 mb-2 sticky top-0 bg-[#1e1b47]/80 backdrop-blur-sm py-1 px-2 rounded -mx-2 z-10">{dateStr}</h3>
                  <div className="space-y-2">
                      {dayEvents
                          .sort((a: CalendarEvent, b: CalendarEvent) => (a.startTime || "00:00").localeCompare(b.startTime || "00:00"))
                          .map((event: CalendarEvent) => (
                              <div
                                  key={event.id}
                                  className={`${eventBaseStyle} bg-gradient-to-r ${event.colorGradient}`}
                                  onClick={() => openEditModal(event)}
                                  title={`${event.title} [${event.category}]`}
                              >
                                  <div className="w-16 text-right font-mono text-xs opacity-80 flex-shrink-0">
                                      {event.startTime ? (
                                          <>
                                              <div>{event.startTime}</div>
                                              {event.endTime && <div className="opacity-70">to {event.endTime}</div>}
                                          </>
                                      ) : (
                                          <div>All Day</div>
                                      )}
                                      {event.durationDays > 1 && <div className="text-[10px] opacity-60">({event.durationDays}d)</div>}
                                  </div>
                                  <div className="flex items-center gap-2 flex-1 overflow-hidden">
                                      <span role="img" aria-label={event.title} className="text-base">{event.emoji}</span>
                                      <span className="truncate">{event.title}</span>
                                  </div>
                                  <span className="text-xs capitalize opacity-70 bg-black/20 px-1.5 py-0.5 rounded">
                                      {event.category}
                                  </span>
                              </div>
                          ))}
                  </div>
              </div>
          ))}
      </div>
  );
};
