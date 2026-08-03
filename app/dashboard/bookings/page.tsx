'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  Calendar as CalendarIcon,
  Search,
  Video,
  Download,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import {
  generateGoogleCalendarUrl,
  generateOutlookCalendarUrl,
  generateIcsFileDownload,
} from '@/lib/calendar-sync';

export default function BookingsPage() {
  const { bookings, cancelBooking } = useMeetOSStore();
  const [filter, setFilter] = useState<'ALL' | 'CONFIRMED' | 'COMPLETED' | 'CANCELED'>('CONFIRMED');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBriefing, setSelectedBriefing] = useState<any | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = filter === 'ALL' || b.status === filter;
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.meetingTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Bookings & Schedule</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage upcoming calls, past meeting history, calendar sync, and AI briefing notes.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search guest or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
        {[
          { key: 'CONFIRMED', label: 'Upcoming' },
          { key: 'COMPLETED', label: 'Past & Completed' },
          { key: 'CANCELED', label: 'Canceled' },
          { key: 'ALL', label: 'All Bookings' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              filter === tab.key
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => {
            const eventDetails = {
              title: b.meetingTitle,
              startDate: b.date,
              startTime: b.time,
              durationMinutes: 30,
              hostName: b.hostName,
              hostEmail: b.hostEmail,
              guestName: b.guestName,
              guestEmail: b.guestEmail,
              location: b.locationUrl,
            };

            const gCalUrl = generateGoogleCalendarUrl(eventDetails);
            const outCalUrl = generateOutlookCalendarUrl(eventDetails);
            const icsUrl = generateIcsFileDownload(eventDetails);

            return (
              <GlassCard key={b.id} className="p-6 border border-black/5 bg-white shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2.5 py-0.5 rounded-full">
                      {b.date} • {b.time} - {b.endTime} ({b.timezone})
                    </span>
                    <Badge variant={b.status === 'CONFIRMED' ? 'emerald' : b.status === 'COMPLETED' ? 'zinc' : 'rose'}>
                      {b.status}
                    </Badge>
                    {b.pricePaid && (
                      <Badge variant="amber">${b.pricePaid} Paid</Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900">{b.meetingTitle}</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Guest: <span className="font-semibold text-zinc-900">{b.guestName}</span> ({b.guestEmail}) • {b.guestCompany} • Host: {b.hostName}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Calendar Sync Quick Action Links */}
                  <Link href={gCalUrl} target="_blank" title="Sync to Google Calendar">
                    <Button variant="outline" size="sm" icon={<CalendarIcon className="w-3.5 h-3.5 text-blue-600" />} className="text-xs rounded-full">
                      Google
                    </Button>
                  </Link>

                  <Link href={outCalUrl} target="_blank" title="Sync to Outlook">
                    <Button variant="outline" size="sm" icon={<CalendarIcon className="w-3.5 h-3.5 text-blue-800" />} className="text-xs rounded-full">
                      Outlook
                    </Button>
                  </Link>

                  <a href={icsUrl} download={`booking-${b.id}.ics`} title="Download .ICS iCal File">
                    <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5 text-zinc-700" />} className="text-xs rounded-full">
                      iCal
                    </Button>
                  </a>

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

                  {b.status === 'CONFIRMED' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-xs text-rose-600 hover:underline font-semibold ml-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </GlassCard>
            );
          })
        ) : (
          <GlassCard className="p-12 text-center border border-black/5 bg-white shadow-soft">
            <p className="text-sm font-bold text-zinc-900">No bookings match your filter query</p>
          </GlassCard>
        )}
      </div>

      {/* AI Briefing Modal */}
      {selectedBriefing && (
        <Modal
          isOpen={!!selectedBriefing}
          onClose={() => setSelectedBriefing(null)}
          title="AI Meeting Prep & Briefing Card"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-zinc-700 mt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <span className="text-zinc-500 font-bold uppercase text-[10px] block mb-1">Attendee Summary</span>
              <p className="text-zinc-900">{selectedBriefing.attendeeSummary}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
