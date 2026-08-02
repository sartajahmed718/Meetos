'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  CalendarCheck2,
  TrendingUp,
  DollarSign,
  Sparkles,
  Clock,
  Video,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const { bookings, meetingTypes, contacts, workspace } = useMeetOSStore();
  const [selectedBriefing, setSelectedBriefing] = useState<any | null>(null);

  // Compute metrics
  const activeBookings = bookings.filter((b) => b.status === 'CONFIRMED');
  const todayBookings = activeBookings.filter((b) => b.date === '2026-08-01');
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricePaid || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              Good afternoon, Alex 👋
            </h1>
            <Badge variant="zinc">
              <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
              AI Assistant Active
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Here is your executive overview for <span className="text-zinc-900 font-semibold">{workspace.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard/event-types">
            <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />} className="text-xs rounded-full">
              New Event Type
            </Button>
          </Link>
          <Link href="/dashboard/ai-assistant">
            <Button variant="primary" size="sm" icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />} className="text-xs rounded-full">
              AI Schedule Prompt
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <GlassCard className="p-5 border border-black/5 bg-white shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Today's Meetings</span>
            <div className="p-2 rounded-xl bg-zinc-100 text-zinc-900">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900 tracking-tight">{todayBookings.length}</span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 2 upcoming
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5 bg-white shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Total Bookings</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CalendarCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900 tracking-tight">{bookings.length}</span>
            <span className="text-[10px] text-emerald-700 font-bold flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +24% vs last week
            </span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5 bg-white shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Revenue Collected</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900 tracking-tight">{formatCurrency(totalRevenue + 1250)}</span>
            <span className="text-[10px] text-amber-800 font-semibold">Stripe Live</span>
          </div>
        </GlassCard>

        <GlassCard className="p-5 border border-black/5 bg-white shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-500">Conversion Rate</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900 tracking-tight">48.2%</span>
            <span className="text-[10px] text-indigo-700 font-semibold">+6.4% AI Boost</span>
          </div>
        </GlassCard>
      </div>

      {/* Main Grid: Today's Schedule & AI Action Insights */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Today's Meetings Schedule Timeline */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-zinc-900 tracking-tight flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-700" />
              Today's Schedule <span className="font-accent-serif font-normal text-zinc-600">(August 1, 2026)</span>
            </h3>
            <Link href="/dashboard/bookings" className="text-xs text-zinc-900 hover:underline font-semibold">
              View All Bookings →
            </Link>
          </div>

          <div className="space-y-3">
            {todayBookings.length > 0 ? (
              todayBookings.map((b) => (
                <GlassCard key={b.id} className="p-5 border border-black/5 bg-white shadow-soft hover:border-zinc-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2.5 py-0.5 rounded-full">
                          {b.time} - {b.endTime}
                        </span>
                        <Badge variant={b.pricePaid ? 'amber' : 'emerald'}>
                          {b.pricePaid ? `$${b.pricePaid} Paid` : 'Confirmed'}
                        </Badge>
                      </div>
                      <h4 className="text-base font-bold text-zinc-900 mt-1">{b.meetingTitle}</h4>
                      <p className="text-xs text-zinc-500">
                        Guest: <span className="text-zinc-900 font-semibold">{b.guestName}</span> ({b.guestCompany}) • Host: {b.hostName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {b.aiBriefing && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedBriefing(b.aiBriefing)}
                          icon={<Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                          className="text-xs rounded-full"
                        >
                          AI Briefing
                        </Button>
                      )}
                      <Link href={b.locationUrl} target="_blank">
                        <Button variant="primary" size="sm" icon={<Video className="w-3.5 h-3.5" />} className="text-xs rounded-full">
                          Join Call
                        </Button>
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              ))
            ) : (
              <GlassCard className="p-8 text-center border border-black/5 bg-white shadow-soft">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-zinc-900">No more meetings scheduled for today!</p>
                <p className="text-xs text-zinc-500 mt-1">Your calendar is clear. Time to focus on deep work.</p>
              </GlassCard>
            )}
          </div>

          {/* Quick Meeting Types Shortcuts */}
          <div className="pt-6">
            <h3 className="text-base font-bold text-zinc-900 tracking-tight mb-3">Active Meeting Types</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {meetingTypes.slice(0, 4).map((mt) => (
                <div key={mt.id} className="p-4 rounded-2xl bg-white border border-black/5 flex items-center justify-between shadow-xs">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900">{mt.title}</h4>
                    <span className="text-[10px] text-zinc-500 mt-0.5 block">{mt.duration} mins • {mt.kind}</span>
                  </div>
                  <Link href={`/book/alex/${mt.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" className="text-xs p-1.5 rounded-full">
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 hover:text-zinc-900" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Intelligence & Recent Activity */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Intelligence Card */}
          <GlassCard className="p-6 border border-black/5 bg-white shadow-soft">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-xl bg-amber-100 text-amber-900">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">AI Availability Insights</h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Your peak booking window is <span className="text-zinc-900 font-bold">Tuesdays 2 PM - 4 PM</span>. Adding a 15-min discovery slot increases conversion by <span className="text-emerald-700 font-bold">+18%</span>.
            </p>
            <div className="mt-4 pt-3 border-t border-zinc-100">
              <Link href="/dashboard/ai-assistant">
                <Button variant="primary" size="sm" className="w-full text-xs rounded-full">
                  Open Intelligence Hub →
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* Recent CRM Lead Activity */}
          <GlassCard className="p-6 border border-black/5 bg-white shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-zinc-900">Recent CRM Leads</h3>
              <Link href="/dashboard/contacts" className="text-[11px] text-zinc-900 font-bold hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {contacts.slice(0, 3).map((cnt) => (
                <div key={cnt.id} className="flex items-center justify-between text-xs pb-3 border-b border-zinc-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2.5">
                    <img src={cnt.avatar || 'https://avatar.vercel.sh/user'} alt={cnt.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-zinc-900">{cnt.name}</p>
                      <p className="text-[10px] text-zinc-500">{cnt.company}</p>
                    </div>
                  </div>
                  <Badge variant="zinc">{cnt.leadScore} Score</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* AI Briefing Detail Modal */}
      {selectedBriefing && (
        <Modal
          isOpen={!!selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          title="AI Attendee Briefing & LinkedIn Summary"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-zinc-700 mt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-zinc-500 font-bold uppercase text-[10px]">Attendee Profile</span>
              <p className="text-zinc-900">{selectedBriefing.attendeeSummary}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-zinc-500 font-bold uppercase text-[10px]">Company Overview</span>
              <p className="text-zinc-900">{selectedBriefing.companySummary}</p>
            </div>

            <div>
              <span className="font-bold text-zinc-900 block mb-1">LinkedIn Insights & Experience</span>
              <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                {selectedBriefing.linkedinInsights.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-bold text-zinc-900 block mb-1">Suggested Meeting Objectives</span>
              <ul className="list-disc pl-4 space-y-1 text-zinc-800 font-medium">
                {selectedBriefing.suggestedObjectives.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
