'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/glass-card';
import { ChevronDown, Star } from 'lucide-react';

export function TestimonialsAndFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials = [
    {
      quote: "MeetOS completely eliminated back-and-forth emails for our sales team. The AI Attendee Briefing gives our AEs a 10-minute head start before every call.",
      name: "Jessica Taylor",
      role: "VP of Product Ops, Linear",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    },
    {
      quote: "The geometric polish and sub-100ms UI responsiveness is unmatched. Calendly feels like software from 2012 compared to MeetOS.",
      name: "David K. Miller",
      role: "Partner, Sequoia Capital",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    },
    {
      quote: "Setting up round-robin rules based on lead budget and host workload saved us 15 hours a week in manual deal dispatching.",
      name: "Sophia Thorne",
      role: "DevRel Director, Vercel",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const faqs = [
    {
      q: "How does MeetOS differ from Calendly or Cal.com?",
      a: "MeetOS is built with an AI-first design philosophy. It automatically researches attendees before meetings, parses natural language scheduling requests ('Book 30m next week'), provides automated lead routing, and sports a clean geometric aesthetic.",
    },
    {
      q: "Can I use my own custom domain for public booking links?",
      a: "Yes! MeetOS supports full white-label branding, custom CNAME domains (e.g. book.yourcompany.com), custom CSS themes, and custom logo headers on all Pro and Enterprise plans.",
    },
    {
      q: "Does MeetOS support multi-calendar conflict checking?",
      a: "Yes. MeetOS syncs bidirectional events across Google Calendar, Microsoft 365, and Outlook to ensure zero double-bookings regardless of how many personal or work calendars you maintain.",
    },
    {
      q: "How are paid consultations handled?",
      a: "MeetOS integrates directly with Stripe Checkout. You can require payment before a time slot is reserved, issue instant invoices, and handle refunds from your MeetOS dashboard.",
    },
  ];

  return (
    <section className="py-24 relative z-10 border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Loved by Builders
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mt-3">
            What ambitious leaders <span className="font-accent-serif font-normal text-zinc-800">say.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {testimonials.map((t, idx) => (
            <GlassCard key={idx} className="p-6 flex flex-col justify-between border border-black/5">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-zinc-600 italic leading-relaxed">"{t.quote}"</p>
              </div>

              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-zinc-100">
                <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover ring-1 ring-zinc-200" />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900">{t.name}</h4>
                  <p className="text-[10px] text-zinc-500">{t.role}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* FAQ Header */}
        <div id="faq" className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight mt-3">
            Frequently Asked <span className="font-accent-serif font-normal text-zinc-800">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-zinc-50 border border-zinc-200 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-500 transition-transform ${openFaq === idx ? 'rotate-180 text-zinc-950' : ''}`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
