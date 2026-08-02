'use client';

import React from 'react';
import { GlassCard } from '@/ui/glass-card';
import { Clock } from 'lucide-react';

export default function AnalyticsPage() {
  const popularDays = [
    { day: 'Mon', count: 14, percent: '65%' },
    { day: 'Tue', count: 28, percent: '95%' },
    { day: 'Wed', count: 22, percent: '80%' },
    { day: 'Thu', count: 19, percent: '75%' },
    { day: 'Fri', count: 11, percent: '45%' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Analytics & Conversion Funnel</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Deep analytics on booking velocity, popular time slots, conversion rate, and traffic sources.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <GlassCard className="p-5 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Total Page Views</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">4,892</span>
            <span className="text-xs text-emerald-700 font-bold">+18.4%</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Public Page Conversion</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">48.2%</span>
            <span className="text-xs text-zinc-900 font-bold">+4.2% AI Boost</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">No-Show Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">1.2%</span>
            <span className="text-xs text-emerald-700 font-bold">-3.5% SMS Alerts</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Cancellation Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">3.1%</span>
            <span className="text-xs text-emerald-700 font-bold">Low</span>
          </div>
        </GlassCard>
      </div>

      {/* Popular Times Heatmap Visualizer */}
      <GlassCard className="p-6 border border-black/5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-700" />
            Popular Meeting Times Heatmap
          </h3>
          <span className="text-xs text-zinc-500">Peak Volume: Tuesdays @ 2:00 PM</span>
        </div>

        <div className="space-y-3 pt-2">
          {popularDays.map((item) => (
            <div key={item.day} className="flex items-center gap-4 text-xs">
              <span className="w-8 font-bold text-zinc-700">{item.day}</span>
              <div className="flex-1 bg-zinc-100 h-6 rounded-full overflow-hidden border border-zinc-200 relative">
                <div
                  className="bg-zinc-950 h-full rounded-full transition-all duration-500"
                  style={{ width: item.percent }}
                />
              </div>
              <span className="w-16 font-mono text-zinc-500 text-right">{item.count} calls</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
