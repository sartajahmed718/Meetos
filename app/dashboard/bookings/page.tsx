'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  CalendarCheck2,
  Search,
  Video,
  Clock,
  User,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function BookingsPage() {
  const { bookings, cancelBooking } = useMeetOSStore();
  const [filterTab, setFilterTab] = useState<'UPCOMING' | 'PAST' | 'CANCELED'>('UPCOMING');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.meetingTitle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTab === 'UPCOMING') return b.status === 'CONFIRMED' && b.date >= '2026-08-01';
    if (filterTab === 'PAST') return b.status === 'COMPLETED' || (b.status === 'CONFIRMED' && b.date < '2026-08-01');
    if (filterTab === 'CANCELED') return b.status === 'CANCELED';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Bookings</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage upcoming calls, past meeting history, and AI briefing notes.
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
          { key: 'UPCOMING', label: 'Upcoming' },
          { key: 'PAST', label: 'Past & Completed' },
          { key: 'CANCELED', label: 'Canceled' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterTab(tab.key as any)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              filterTab === tab.key
                ? 'bg-zinc-950 text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((b) => (
            <GlassCard key={b.id} className="p-5 border border-black/5 hover:border-zinc-300 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-900 bg-zinc-100 px-2.5 py-0.5 rounded-full">
                      {b.date} • {b.time} - {b.endTime} ({b.timezone})
                    </span>
                    <Badge
                      variant={
                        b.status === 'CONFIRMED'
                          ? 'emerald'
                          : b.status === 'CANCELED'
                          ? 'rose'
                          : 'zinc'
                      }
                    >
                      {b.status}
                    </Badge>
                    {b.pricePaid && <Badge variant="amber">${b.pricePaid} Paid</Badge>}
                  </div>

                  <h3 className="text-base font-bold text-zinc-900">{b.meetingTitle}</h3>

                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5 text-zinc-900 font-medium">
                      <User className="w-3.5 h-3.5 text-zinc-500" /> {b.guestName} ({b.guestEmail})
                    </span>
                    {b.guestCompany && <span>• {b.guestCompany}</span>}
                    <span>• Host: {b.hostName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBooking(b)}
                    className="text-xs rounded-full"
                  >
                    View Details & AI Brief
                  </Button>

                  {b.status === 'CONFIRMED' && (
                    <>
                      <Link href={b.locationUrl} target="_blank">
                        <Button variant="primary" size="sm" icon={<Video className="w-3.5 h-3.5" />} className="text-xs rounded-full">
                          Join Call
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelBooking(b.id)}
                        className="text-xs text-rose-600 hover:bg-rose-50 rounded-full"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          ))
        ) : (
          <GlassCard className="p-12 text-center border border-black/5">
            <CalendarCheck2 className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-zinc-900">No bookings found</h3>
            <p className="text-xs text-zinc-500 mt-1">There are no bookings matching your current filter selection.</p>
          </GlassCard>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Details: ${selectedBooking.meetingTitle}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-zinc-700 mt-2">
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
              <div>
                <span className="text-zinc-500 text-[10px] block">Guest Name</span>
                <span className="font-bold text-zinc-900">{selectedBooking.guestName}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Guest Email</span>
                <span className="font-bold text-zinc-900">{selectedBooking.guestEmail}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Date & Time</span>
                <span className="font-bold text-zinc-900">{selectedBooking.date} at {selectedBooking.time}</span>
              </div>
              <div>
                <span className="text-zinc-500 text-[10px] block">Location</span>
                <span className="font-bold text-emerald-700">{selectedBooking.locationType}</span>
              </div>
            </div>

            {selectedBooking.guestNotes && (
              <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <span className="text-zinc-500 text-[10px] block mb-1">Guest Notes</span>
                <p className="text-zinc-900">{selectedBooking.guestNotes}</p>
              </div>
            )}

            {selectedBooking.aiBriefing && (
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>AI Attendee Research Brief</span>
                </div>
                <p className="text-zinc-800 leading-relaxed">{selectedBooking.aiBriefing.attendeeSummary}</p>
                <div className="pt-2">
                  <span className="font-bold text-zinc-900 block mb-1">Suggested Agenda</span>
                  <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                    {selectedBooking.aiBriefing.recommendedAgenda.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-end">
              <Button variant="outline" size="sm" onClick={() => setSelectedBooking(null)} className="rounded-full">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
