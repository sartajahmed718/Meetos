'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/ui/button';
import { Sparkles, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle2, Video, ArrowUpRight, Star } from 'lucide-react';

export function LandingHero() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>('02:00 PM');

  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      {/* Background Soft Glow Circles */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-orange-100 via-indigo-100 to-transparent rounded-full filter blur-3xl opacity-60 -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Loved By Badge like Image 2 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-black/5 shadow-sm text-zinc-700 text-xs font-semibold mb-8"
        >
          <div className="flex -space-x-1.5">
            <img className="w-5 h-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" alt="user" />
            <img className="w-5 h-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" alt="user" />
            <img className="w-5 h-5 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=50" alt="user" />
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-zinc-600 font-medium">Loved by 400+ modern teams</span>
        </motion.div>

        {/* Main Hero Headline matching Image 2 dual-font pairing */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 max-w-5xl mx-auto leading-[1.08]"
        >
          Complete AI Customer <br className="hidden sm:inline" />
          <span className="font-accent-serif font-normal text-zinc-900">Scheduling Ecosystem</span>
        </motion.h1>

        {/* Subtitle matching Image 2 layout */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          We resolve <span className="font-bold text-zinc-900">60-80% of your booking friction</span> via natural language AI scheduling, round-robin team routing, and automated attendee research.
        </motion.p>

        {/* CTA Button Pill matching Image 2 ("Join the waitlist ↗") */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button variant="primary" size="lg" className="rounded-full text-base font-semibold px-8 py-4 shadow-floating">
              Get Started Free <ArrowUpRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href="/book/alex/demo-30m" target="_blank">
            <Button variant="outline" size="lg" className="rounded-full text-base font-medium px-7 py-4">
              Book Meeting Live
            </Button>
          </Link>
        </motion.div>

        {/* Floating UI Card Preview matching Image 1 & 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 max-w-4xl mx-auto rounded-4xl p-2 bg-white/60 border border-black/5 shadow-floating backdrop-blur-xl"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-left border border-black/5 shadow-sm grid md:grid-cols-12 gap-6 items-center">
            {/* Host Info */}
            <div className="md:col-span-5 space-y-4 border-b md:border-b-0 md:border-r border-zinc-200/80 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Alex Rivera"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-200"
                />
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Alex Rivera</h3>
                  <p className="text-xs text-zinc-500">Founder & Chief Architect</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-zinc-900">30 Min Product Demo</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                  Interactive walkthrough of MeetOS multi-tenant architecture and AI smart routing.
                </p>
              </div>

              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" /> 30 Minutes
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-emerald-600" /> Google Meet Included
                </div>
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-900">Select Available Slot (EST)</span>
                <span className="text-[10px] text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-full font-semibold">
                  AI Conflict Free
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '04:15 PM', '05:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                      selectedSlot === slot
                        ? 'bg-zinc-950 border-zinc-950 text-white shadow-md'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <Link href="/book/alex/demo-30m">
                  <Button variant="primary" className="w-full text-xs py-3 rounded-full">
                    Continue to Booking Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
