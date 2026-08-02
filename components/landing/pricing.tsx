'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/button';
import { Check, Sparkles } from 'lucide-react';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for individuals & freelancers booking 1-on-1 calls.',
      monthlyPrice: 0,
      yearlyPrice: 0,
      badge: null,
      popular: false,
      ctaText: 'Get Started Free',
      ctaVariant: 'outline' as const,
      features: [
        'Unlimited 1-on-1 bookings',
        'Google & Outlook Calendar sync',
        'Google Meet & Zoom integration',
        'Custom booking link',
        'Standard email notifications',
      ],
    },
    {
      name: 'Pro AI',
      description: 'For growing teams requiring AI scheduling, round robin & CRM.',
      monthlyPrice: 20,
      yearlyPrice: 16,
      badge: '★ Most Popular',
      popular: true,
      ctaText: 'Start 14-Day Free Trial',
      ctaVariant: 'primary' as const,
      features: [
        'Everything in Starter',
        'AI Natural Language Assistant',
        'Automated AI Attendee Meeting Prep',
        'Round Robin & Collective team routing',
        'Custom Question Form Builder',
        'Stripe Paid Consultations',
        'Slack & SMS Automations',
      ],
    },
    {
      name: 'Enterprise',
      description: 'For organizations needing SOC2, custom domains & dedicated SLA.',
      monthlyPrice: 55,
      yearlyPrice: 45,
      badge: 'Enterprise Grade',
      popular: false,
      ctaText: 'Contact Enterprise Sales',
      ctaVariant: 'outline' as const,
      features: [
        'Everything in Pro AI',
        'Custom Domain (e.g. meet.yourcompany.com)',
        'AI Smart Lead Routing rules',
        'Unlimited Workspaces & RBAC roles',
        'SOC2 Type II & HIPAA Compliance',
        'Dedicated Solutions Engineer',
        '99.99% Uptime SLA',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 relative z-10 border-t border-black/5 bg-[#f5f5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mt-3">
          Predictable plans for <span className="font-serif italic font-normal text-zinc-800">every team size.</span>
        </h2>
        <p className="mt-4 text-sm text-zinc-500 max-w-xl mx-auto">
          Start for free, upgrade when you scale. No hidden fees or surprise seat billing.
        </p>

        {/* Monthly / Yearly Billing Toggle Switcher */}
        <div className="mt-10 flex items-center justify-center">
          <div className="inline-flex items-center rounded-full bg-white p-1.5 border border-black/10 shadow-soft">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-400 text-zinc-950 font-black text-[10px]">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto text-left items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={idx}
                className={`relative rounded-4xl bg-white p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-zinc-950 shadow-2xl scale-105 z-20'
                    : 'border border-black/10 shadow-soft hover:shadow-lg'
                }`}
              >
                {/* Popular Pill Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-950 text-white text-[11px] font-extrabold tracking-wide shadow-md border border-zinc-800">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Card Header */}
                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{plan.name}</h3>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed min-h-[36px]">{plan.description}</p>
                  </div>

                  {/* Price Header */}
                  <div className="flex items-baseline gap-1 pt-2 border-t border-zinc-100">
                    <span className="text-4xl sm:text-5xl font-black text-zinc-900 tracking-tight">${price}</span>
                    <span className="text-xs text-zinc-500 font-semibold">
                      {price === 0 ? 'forever' : '/user/month'}
                    </span>
                  </div>

                  {/* Features Checklist */}
                  <ul className="space-y-3.5 pt-4 text-xs text-zinc-700 font-medium">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button */}
                <div className="pt-8 mt-8 border-t border-zinc-100">
                  <Link href="/auth/signup">
                    <Button
                      variant={plan.ctaVariant}
                      size="lg"
                      className={`w-full text-xs font-bold rounded-full py-3.5 transition-transform active:scale-95 ${
                        plan.popular ? 'shadow-md hover:bg-zinc-800' : ''
                      }`}
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
