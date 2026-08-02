'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useMeetOSStore } from '@/lib/store';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  Globe,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublicBookingPage() {
  const params = useParams();
  const { meetingTypes, users, addBooking } = useMeetOSStore();

  const slug = (params?.slug as string) || 'demo-30m';
  const meetingType = meetingTypes.find((m) => m.slug === slug) || meetingTypes[0];
  const host = users[0];

  // Booking Flow Steps: 1 = Date/Time, 2 = Form Details, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('2026-08-04');
  const [selectedTime, setSelectedTime] = useState<string>('14:00');
  const [timezone, setTimezone] = useState<string>('America/New_York');

  // Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestCompany, setGuestCompany] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const availableSlots = [
    '09:00', '09:30', '10:30', '11:00', '14:00', '14:30', '15:30', '16:00'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail) return;

    const newBk = addBooking({
      meetingTypeId: meetingType.id,
      meetingTitle: meetingType.title,
      guestName,
      guestEmail,
      guestPhone,
      guestCompany,
      guestNotes,
      date: selectedDate,
      time: selectedTime,
      endTime: '14:30',
      timezone,
      locationType: meetingType.locationType,
      locationUrl: 'https://meet.google.com/meetos-live-call',
      hostId: host.id,
      hostName: host.name,
      hostEmail: host.email,
      pricePaid: meetingType.price,
    });

    setConfirmedBooking(newBk);
    setStep(3);

    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-900 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden font-sans">
      {/* Background Soft Glow */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-tr from-indigo-100 via-orange-100 to-transparent rounded-full filter blur-3xl opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-5xl bg-white border border-black/10 rounded-4xl overflow-hidden shadow-floating relative z-10">
        {/* Cover & Host Profile Header */}
        <div className="bg-zinc-950 text-white p-6 sm:p-8 flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={host.avatar}
              alt={host.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md shrink-0"
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight">{host.name}</h2>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1 block">
                {host.title} • {host.company}
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> State AI Verified
          </span>
        </div>

        <div className="p-6 sm:p-10 lg:p-12 space-y-8">
          {/* Step 1: Select Date & Time */}
          {step === 1 && (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              {/* Left Details Column */}
              <div className="lg:col-span-5 space-y-6 border-b lg:border-b-0 lg:border-r border-zinc-100 pb-8 lg:pb-0 lg:pr-8">
                <div>
                  <Badge variant={meetingType.price ? 'amber' : 'zinc'} className="px-3.5 py-1 text-xs">
                    {meetingType.price ? `$${meetingType.price} Paid Consultation` : meetingType.kind}
                  </Badge>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight mt-3 leading-tight">
                    {meetingType.title}
                  </h1>
                  <p className="text-sm sm:text-base text-zinc-600 mt-3 leading-relaxed font-medium">
                    {meetingType.description}
                  </p>
                </div>

                <div className="space-y-3 text-sm text-zinc-700 font-semibold pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-zinc-100 text-zinc-800">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>{meetingType.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Video className="w-4 h-4" />
                    </div>
                    <span>{meetingType.locationType} Video Call</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                      <Globe className="w-4 h-4" />
                    </div>
                    <span>{timezone}</span>
                  </div>
                </div>
              </div>

              {/* Right Picker Column */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 mb-4 tracking-tight">Select Date & Time</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 mb-1.5">Date</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 mb-1.5">Time Zone</label>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:border-zinc-900 shadow-xs"
                      >
                        <option value="America/New_York">Eastern Time (US)</option>
                        <option value="America/Los_Angeles">Pacific Time (US)</option>
                        <option value="Europe/London">London (GMT)</option>
                      </select>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-zinc-900 uppercase tracking-wider block mb-3">
                    Available Time Slots
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {availableSlots.map((slot) => {
                      const isSelected = selectedTime === slot;
                      return (
                        <motion.button
                          key={slot}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-3 rounded-2xl text-sm font-bold border transition-all duration-200 ${
                            isSelected
                              ? 'bg-zinc-950 border-zinc-950 text-white shadow-lg ring-2 ring-zinc-900'
                              : 'bg-zinc-50/80 border-zinc-200 text-zinc-800 hover:bg-zinc-100 hover:border-zinc-300'
                          }`}
                        >
                          {slot}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Animated Black CTA Button */}
                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    className="w-full py-4 px-6 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 group transition-all duration-300"
                  >
                    <span>Next: Fill Your Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Custom Questions Form */}
          {step === 2 && (
            <form onSubmit={handleBookingSubmit} className="max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Your Information</h2>
                <p className="text-sm text-zinc-500">
                  Booking <span className="text-zinc-900 font-bold">{meetingType.title}</span> on {selectedDate} at {selectedTime}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <Input label="Your Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required placeholder="e.g. Jessica Taylor" />
                <Input label="Work Email" type="email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required placeholder="jessica@company.com" />
                <Input label="Company Name" value={guestCompany} onChange={(e) => setGuestCompany(e.target.value)} placeholder="e.g. Linear" />
                <Input label="Phone Number" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value)} placeholder="+1 (415) 890-1234" />

                <div>
                  <label className="block text-xs font-bold text-zinc-600 mb-1.5">Additional Notes for {host.name}</label>
                  <textarea
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    rows={4}
                    placeholder="Please share anything that will help prepare for our meeting..."
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 shadow-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)} className="w-1/3 text-xs rounded-full font-bold">
                  ← Back
                </Button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-2/3 py-4 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 group transition-all duration-300"
                >
                  <span>{meetingType.price ? `Pay $${meetingType.price} & Confirm Booking` : 'Confirm Booking ✓'}</span>
                </motion.button>
              </div>
            </form>
          )}

          {/* Step 3: Success Screen */}
          {step === 3 && confirmedBooking && (
            <div className="max-w-md mx-auto text-center space-y-6 py-6">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Meeting Confirmed!</h2>
                <p className="text-sm text-zinc-500 mt-2">
                  A calendar invite and confirmation email have been sent to <span className="text-zinc-900 font-bold">{confirmedBooking.guestEmail}</span>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-zinc-200 pb-2.5">
                  <span className="text-zinc-500 font-medium">Meeting</span>
                  <span className="font-bold text-zinc-900">{confirmedBooking.meetingTitle}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-200 pb-2.5">
                  <span className="text-zinc-500 font-medium">Date & Time</span>
                  <span className="font-bold text-zinc-900">{confirmedBooking.date} at {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 font-medium">Host</span>
                  <span className="font-bold text-zinc-900">{confirmedBooking.hostName}</span>
                </div>
              </div>

              {/* Add to Calendar Links */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Add to Your Calendar:</span>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm" icon={<CalendarIcon className="w-3.5 h-3.5" />} className="text-xs rounded-full font-bold">
                    Google Calendar
                  </Button>
                  <Button variant="outline" size="sm" icon={<CalendarIcon className="w-3.5 h-3.5" />} className="text-xs rounded-full font-bold">
                    Outlook / iCal
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-200">
                <Link href="/dashboard">
                  <Button variant="secondary" size="sm" className="text-xs rounded-full font-bold">
                    Return to Workspace Dashboard →
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
