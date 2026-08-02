'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/input';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
} from 'lucide-react';

export default function CalendarPage() {
  const { bookings, schedule, updateSchedule } = useMeetOSStore();
  const [viewMode, setViewMode] = useState<'MONTH' | 'WEEK' | 'DAY' | 'AGENDA'>('MONTH');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // Aug 2026

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Days in month calculation for grid
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 7 = August
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Calendar Experience</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real-time multi-calendar sync, timezone detection, and holiday overrides.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-full px-3 py-1.5 text-xs shadow-xs">
            <Globe className="w-3.5 h-3.5 text-zinc-500 mr-1" />
            <span className="text-zinc-900 font-semibold">{schedule.timezone}</span>
          </div>

          <Button
            variant={schedule.holidayMode ? 'danger' : 'outline'}
            size="sm"
            onClick={() => updateSchedule({ holidayMode: !schedule.holidayMode })}
            icon={<Lock className="w-3.5 h-3.5" />}
            className="rounded-full text-xs"
          >
            {schedule.holidayMode ? 'Holiday Mode Active' : 'Holiday Mode'}
          </Button>
        </div>
      </div>

      {/* Navigation Controls & View Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-zinc-900">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex rounded-full bg-white p-1 border border-zinc-200 text-xs font-bold shadow-xs">
          {['MONTH', 'WEEK', 'DAY', 'AGENDA'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-1.5 rounded-full transition-colors ${
                viewMode === mode ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar Display */}
      {viewMode === 'MONTH' && (
        <GlassCard className="p-5 border border-black/5">
          <div className="grid grid-cols-7 gap-1 text-center border-b border-zinc-200 pb-3 mb-2">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {/* Blank leading slots */}
            {[...Array(firstDayIndex)].map((_, i) => (
              <div key={`empty-${i}`} className="h-28 rounded-2xl bg-zinc-100/30 border border-transparent" />
            ))}

            {/* Calendar Days */}
            {[...Array(totalDays)].map((_, dayIdx) => {
              const dayNum = dayIdx + 1;
              const dateStr = `2026-08-${dayNum < 10 ? '0' + dayNum : dayNum}`;
              const dayBookings = bookings.filter((b) => b.date === dateStr && b.status === 'CONFIRMED');
              const isToday = dayNum === 1;

              return (
                <div
                  key={dayNum}
                  className={`h-28 rounded-2xl p-2 border flex flex-col justify-between transition-colors ${
                    isToday
                      ? 'bg-zinc-950 text-white border-zinc-950 shadow-md'
                      : 'bg-zinc-50 border-zinc-200/80 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        isToday ? 'bg-white text-zinc-950' : 'text-zinc-700'
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayBookings.length > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isToday ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {dayBookings.length} calls
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-y-auto max-h-16">
                    {dayBookings.map((b) => (
                      <div
                        key={b.id}
                        className={`text-[10px] p-1 rounded font-medium truncate ${
                          isToday ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-900'
                        }`}
                        title={`${b.time} - ${b.guestName}`}
                      >
                        {b.time} {b.guestName.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      {viewMode === 'AGENDA' && (
        <GlassCard className="p-6 border border-black/5 space-y-4">
          <h3 className="text-sm font-bold text-zinc-900 mb-2">Upcoming Calendar Agenda</h3>
          {bookings.map((b) => (
            <div key={b.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-900 font-bold">{b.date} at {b.time}</span>
                <h4 className="text-sm font-bold text-zinc-900 mt-0.5">{b.meetingTitle}</h4>
                <p className="text-xs text-zinc-500">Guest: {b.guestName} ({b.guestEmail})</p>
              </div>
              <Badge variant="zinc">{b.status}</Badge>
            </div>
          ))}
        </GlassCard>
      )}
    </div>
  );
}
