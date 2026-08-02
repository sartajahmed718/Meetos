'use client';

import React from 'react';
import { GlassCard } from '@/ui/glass-card';
import { Sparkles, Users, Zap, CreditCard, Shield, BarChart3, Bot, Calendar, Layers, Workflow } from 'lucide-react';

export function FeaturesGrid() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Scheduling Assistant',
      description: 'Type natural commands like "Book 30 mins next week with Sarah" and let MeetOS parse conflicts instantly.',
      badge: 'AI Powered',
    },
    {
      icon: Bot,
      title: 'Automated AI Meeting Prep',
      description: 'Receive full attendee briefings with LinkedIn summaries, company news, and recommended agendas before every call.',
      badge: 'Intelligence',
    },
    {
      icon: Users,
      title: 'Team Round Robin',
      description: 'Intelligently route incoming bookings across team members based on lead score, budget, or host availability.',
      badge: 'Multi-Tenant',
    },
    {
      icon: Workflow,
      title: 'Visual Workflow Engine',
      description: 'Connect triggers to Slack alerts, SMS reminders, Zoom link creation, and CRM deal updates with zero code.',
      badge: 'Automations',
    },
    {
      icon: CreditCard,
      title: 'Stripe Paid Consultations',
      description: 'Monetize your expertise. Collect instant payments, issue automated invoices, and manage refunds seamlessly.',
      badge: 'Monetization',
    },
    {
      icon: BarChart3,
      title: 'Executive Analytics',
      description: 'Track booking velocity, cancellation rates, revenue, popular meeting times heatmaps, and traffic sources.',
      badge: 'Analytics',
    },
  ];

  return (
    <section id="features" className="py-24 relative z-10 border-t border-black/5 bg-white/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Engineered for Modern Leaders
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mt-3 leading-tight">
            Everything you need. <br />
            <span className="font-accent-serif font-normal text-zinc-800">Zero back-and-forth friction.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500">
            Designed with geometric precision and serif craftsmanship. Built on top of enterprise-grade calendar & video APIs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={idx} className="relative group p-7">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200/60 flex items-center justify-center text-zinc-900 mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight">{feature.title}</h3>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
