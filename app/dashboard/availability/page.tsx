'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Clock, Lock, Plus, Trash2, Save, Globe, Shield } from 'lucide-react';

export default function AvailabilityPage() {
  const { schedule, updateSchedule } = useMeetOSStore();
  const [days, setDays] = useState(schedule.days);
  const [bufferBefore, setBufferBefore] = useState(schedule.bufferBefore);
  const [bufferAfter, setBufferAfter] = useState(schedule.bufferAfter);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggleDay = (dayIndex: number) => {
    const updated = days.map((d, i) => (i === dayIndex ? { ...d, enabled: !d.enabled } : d));
    setDays(updated);
  };

  const handleSave = () => {
    updateSchedule({ days, bufferBefore, bufferAfter });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/60">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Availability & Working Hours</h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Set your weekly recurring schedule, buffer times between calls, and date overrides.
          </p>
        </div>

        <Button variant="glowing" size="sm" onClick={handleSave} icon={<Save className="w-3.5 h-3.5" />}>
          {savedSuccess ? 'Saved Changes ✓' : 'Save Schedule'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Weekly Days List */}
        <div className="lg:col-span-8 space-y-4">
          <GlassCard className="p-6 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white mb-4">Weekly Recurring Hours</h3>

            {days.map((dayItem, idx) => (
              <div
                key={dayItem.day}
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80"
              >
                <div className="flex items-center gap-3 w-36">
                  <input
                    type="checkbox"
                    checked={dayItem.enabled}
                    onChange={() => handleToggleDay(idx)}
                    className="w-4 h-4 rounded bg-zinc-800 border-zinc-700 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-bold text-white capitalize">{dayItem.day}</span>
                </div>

                {dayItem.enabled ? (
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="time"
                      defaultValue={dayItem.slots[0]?.start || '09:00'}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                    <span className="text-zinc-500">to</span>
                    <input
                      type="time"
                      defaultValue={dayItem.slots[0]?.end || '17:00'}
                      className="bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 italic">Unavailable</span>
                )}
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Buffer & Settings Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard className="p-6 border border-zinc-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Buffer Times</h3>
            <p className="text-xs text-zinc-400">
              Ensure you have breathing room before and after booked meetings.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Buffer Before Meeting
                </label>
                <select
                  value={bufferBefore}
                  onChange={(e) => setBufferBefore(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value={0}>No buffer</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  Buffer After Meeting
                </label>
                <select
                  value={bufferAfter}
                  onChange={(e) => setBufferAfter(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value={0}>No buffer</option>
                  <option value={5}>5 minutes</option>
                  <option value={10}>10 minutes</option>
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
