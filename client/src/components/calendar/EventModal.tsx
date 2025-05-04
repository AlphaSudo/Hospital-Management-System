import React, { useState, useEffect, useMemo } from "react";
import { CalendarEvent, EventCategory, eventCategories } from "@/types/calendar";
import { getDaysInMonth } from "@/lib/dateUtils";
import { MONTH_NAMES, EVENT_MODAL_COLOR_OPTIONS, EVENT_MODAL_COMMON_EMOJIS } from "@/lib/constants";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  onEditEvent: (event: CalendarEvent) => void;
  eventToEdit?: CalendarEvent | null;
  initialDay: number | null; // Day of the month (1-31) or null
  currentMonth: number; // 0-indexed month
  currentYear: number;
}

export const EventModal = ({
  isOpen,
  onClose,
  onAddEvent,
  onEditEvent,
  eventToEdit,
  initialDay,
  currentMonth,
  currentYear
}: EventModalProps) => {
  const isEditing = !!eventToEdit;

  const [day, setDay] = useState(eventToEdit?.day ?? initialDay ?? 1);
  const [title, setTitle] = useState(eventToEdit?.title ?? '');
  const [emoji, setEmoji] = useState(eventToEdit?.emoji ?? '🎉');
  const [startTime, setStartTime] = useState(eventToEdit?.startTime ?? '');
  const [endTime, setEndTime] = useState(eventToEdit?.endTime ?? '');
  const [durationDays, setDurationDays] = useState(eventToEdit?.durationDays ?? 1);
  const [selectedColor, setSelectedColor] = useState(eventToEdit?.colorGradient ?? EVENT_MODAL_COLOR_OPTIONS[0].value);
  const [category, setCategory] = useState<EventCategory>(eventToEdit?.category as EventCategory ?? 'personal');

  // Update form fields if eventToEdit changes or when opening for adding
  useEffect(() => {
    if (isOpen) {
        const defaultDay = initialDay ?? new Date().getDate(); // Default to today if no initial day
        setDay(eventToEdit?.day ?? defaultDay);
        setTitle(eventToEdit?.title ?? '');
        setEmoji(eventToEdit?.emoji ?? '🎉');
        setStartTime(eventToEdit?.startTime ?? '');
        setEndTime(eventToEdit?.endTime ?? '');
        setDurationDays(eventToEdit?.durationDays ?? 1);
        setSelectedColor(eventToEdit?.colorGradient ?? EVENT_MODAL_COLOR_OPTIONS[0].value);
        setCategory(eventToEdit?.category as EventCategory ?? 'personal');
    }
  }, [eventToEdit, initialDay, isOpen, currentMonth, currentYear]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const maxDays = getDaysInMonth(currentYear, currentMonth);
    if (!title || !day || day < 1 || day > maxDays || durationDays < 1) {
        console.error("Validation failed:", { title, day, maxDays, durationDays });
        // Add user feedback here (e.g., alert, form validation messages)
        return;
    }

    const eventData = {
        day: Number(day),
        month: currentMonth,
        year: currentYear,
        title,
        emoji,
        startTime: startTime || undefined,
        endTime: endTime || undefined,
        durationDays: Number(durationDays),
        colorGradient: selectedColor,
        category: category
       };

    if (isEditing && eventToEdit) {
        onEditEvent({ ...eventData, id: eventToEdit.id });
    } else {
        const eventToAdd: Omit<CalendarEvent, 'id'> = eventData;
        onAddEvent(eventToAdd);
    }
    onClose();
  };

  if (!isOpen) return null;

  const maxDayInMonth = getDaysInMonth(currentYear, currentMonth);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-[#2c1e5c] via-[#1f1a48] to-[#1a1440] p-6 rounded-xl shadow-lg border border-purple-500/50 text-white w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400/50 scrollbar-track-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-5 text-center">{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
           {/* Day Input */}
          <div className="mb-4">
            <label htmlFor="day" className="block mb-1 text-sm font-medium text-purple-300">Day of {MONTH_NAMES[currentMonth]} {currentYear}</label>
            <input
              type="number"
              id="day"
              min="1"
              max={maxDayInMonth}
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              required
              className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 text-sm font-medium text-purple-300">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          {/* Time Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="startTime" className="block mb-1 text-sm font-medium text-purple-300">Start Time (Optional)</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none appearance-none"
                  style={{ colorScheme: 'dark' }}
                />
            </div>
            <div>
                <label htmlFor="endTime" className="block mb-1 text-sm font-medium text-purple-300">End Time (Optional)</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none appearance-none"
                  style={{ colorScheme: 'dark' }}
                />
            </div>
          </div>
          {/* Duration Input */}
          <div>
            <label htmlFor="durationDays" className="block mb-1 text-sm font-medium text-purple-300">Duration (Days)</label>
            <input
              type="number"
              id="durationDays"
              min="1"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value) || 1)}
              required
              className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>
          {/* Category Select */}
          <div>
            <label htmlFor="category" className="block mb-1 text-sm font-medium text-purple-300">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              required
              className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none capitalize"
            >
              {eventCategories.map(cat => (
                <option key={cat} value={cat} className="bg-[#1a1440] capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Emoji Select */}
           <div className="mb-4">
            <label htmlFor="emoji" className="block mb-1 text-sm font-medium text-purple-300">Emoji</label>
            <select
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="w-full p-2 rounded bg-[#1e1b47]/80 border border-white/20 focus:ring-2 focus:ring-pink-500 outline-none appearance-none text-center"
              style={{ fontSize: '1.5rem' }}
            >
              {EVENT_MODAL_COMMON_EMOJIS.map(em => (
                <option key={em} value={em} className="bg-[#1a1440]">
                  {em}
                </option>
              ))}
            </select>
          </div>
          {/* Color Selection */}
          <div>
            <label className="block mb-2 text-sm font-medium text-purple-300">Color Theme</label>
            <div className="grid grid-cols-3 gap-2">
                {EVENT_MODAL_COLOR_OPTIONS.map(color => (
                    <label key={color.value} className={`flex items-center gap-2 p-2 rounded-lg border-2 cursor-pointer transition-all ${selectedColor === color.value ? 'border-pink-500 bg-purple-900/50' : 'border-transparent hover:border-white/30 bg-[#1e1b47]/60'}`}>
                        <input
                            type="radio"
                            name="colorGradient"
                            value={color.value}
                            checked={selectedColor === color.value}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="hidden"
                        />
                        <span className={`block w-4 h-4 rounded-full bg-gradient-to-r ${color.value}`}></span>
                        <span className="text-xs">{color.name}</span>
                    </label>
                ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition-colors font-medium">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity font-semibold">
              {isEditing ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
