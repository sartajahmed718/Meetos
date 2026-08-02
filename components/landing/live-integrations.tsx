'use client';

import React from 'react';
import { CircularOrbitAnimation } from './circular-orbit-animation';
import {
  GoogleCalendarLogo,
  OutlookLogo,
  GoogleMeetLogo,
  ZoomLogo,
  SlackLogo,
  StripeLogo,
  HubSpotLogo,
  SalesforceLogo,
  ZapierLogo,
} from '@/components/ui/brand-logos';

export function LiveIntegrations() {
  const integrations = [
    { name: 'Google Calendar', category: 'Calendar', Logo: GoogleCalendarLogo, status: 'Active Sync' },
    { name: 'Microsoft Outlook', category: 'Calendar', Logo: OutlookLogo, status: 'Active Sync' },
    { name: 'Google Meet', category: 'Video', Logo: GoogleMeetLogo, status: 'Auto Link' },
    { name: 'Zoom', category: 'Video', Logo: ZoomLogo, status: 'Auto Link' },
    { name: 'Slack', category: 'Notifications', Logo: SlackLogo, status: 'Connected' },
    { name: 'Stripe', category: 'Payments', Logo: StripeLogo, status: 'Live Checkout' },
    { name: 'HubSpot', category: 'CRM', Logo: HubSpotLogo, status: 'Deals Sync' },
    { name: 'Salesforce', category: 'CRM', Logo: SalesforceLogo, status: 'Leads Sync' },
    { name: 'Zapier & Make', category: 'Automations', Logo: ZapierLogo, status: 'Webhooks' },
  ];

  return (
    <section id="integrations" className="py-24 relative z-10 border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
          Native Ecosystem
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 tracking-tight mt-3">
          Integrates with your <span className="font-serif italic font-normal text-zinc-800">existing stack.</span>
        </h2>
        <p className="mt-4 text-sm text-zinc-500 max-w-xl mx-auto">
          Connect your existing calendars, video rooms, payment gateways, and CRMs with 1-click authentication.
        </p>

        {/* Circular Orbit Framer Motion Animation Showcase matching reference */}
        <div className="my-14">
          <CircularOrbitAnimation />
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto text-left">
          {integrations.map((app, idx) => {
            const LogoComponent = app.Logo;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-zinc-50/80 border border-zinc-200 hover:border-zinc-400 hover:shadow-soft flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-zinc-200/80 flex items-center justify-center p-2 shadow-xs">
                    <LogoComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 leading-none">{app.name}</h4>
                    <span className="text-[10px] text-zinc-500 mt-1 block font-medium">{app.category}</span>
                  </div>
                </div>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                  {app.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
