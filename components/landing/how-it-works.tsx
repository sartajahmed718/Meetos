'use client';

import React from 'react';
import { GlassCard } from '@/ui/glass-card';
import { Link2, Sparkles, UserCheck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Set Availability & Connect Calendars',
      description: 'Connect Google Calendar & Outlook. Define recurring working hours, buffer times, and holiday mode overrides.',
      icon: Link2,
    },
    {
      num: '02',
      title: 'Share Profile or Embed Widget',
      description: 'Share your vanity link (meet.stateai.io/alex) or embed our zero-latency booking widget directly on your website.',
      icon: UserCheck,
    },
    {
      num: '03',
      title: 'AI Automated Briefing & Calendar Invites',
      description: 'MeetOS handles time zone conversion, generates Google Meet links, posts Slack alerts, and generates attendee AI research.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10 border-t border-black/5 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Seamless Execution
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mt-3">
            How MeetOS <span className="font-accent-serif font-normal text-zinc-800">Works</span>
          </h2>
          <p className="mt-4 text-sm text-zinc-500">
            From setup to confirmation in under 120 seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <GlassCard key={idx} className="relative p-8 text-left border border-black/5">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-black text-zinc-300">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{step.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
