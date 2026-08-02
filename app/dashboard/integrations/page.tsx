'use client';

import React from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/input';
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

export default function IntegrationsPage() {
  const { integrations, toggleIntegration } = useMeetOSStore();

  const logoMap: Record<string, any> = {
    'Google Calendar': GoogleCalendarLogo,
    'Microsoft Outlook': OutlookLogo,
    'Google Meet': GoogleMeetLogo,
    'Zoom Video Communications': ZoomLogo,
    'Stripe Payments': StripeLogo,
    'Slack Workspaces': SlackLogo,
    'HubSpot CRM': HubSpotLogo,
    'Salesforce Enterprise': SalesforceLogo,
    'Zapier & Make Webhooks': ZapierLogo,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Integrations Ecosystem</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Connect calendars, video conferencing tools, payment gateways, and CRMs.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((app) => {
          const LogoComponent = logoMap[app.name] || GoogleCalendarLogo;
          return (
            <GlassCard key={app.id} className="p-6 border border-black/5 flex flex-col justify-between bg-white shadow-soft">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-center p-2.5 shadow-xs">
                    <LogoComponent className="w-7 h-7" />
                  </div>
                  <Badge variant={app.connected ? 'emerald' : 'zinc'}>
                    {app.connected ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900">{app.name}</h3>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mt-0.5">{app.category}</span>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">{app.description}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between">
                {app.lastSynced ? (
                  <span className="text-[10px] text-zinc-400 font-mono">Synced {app.lastSynced}</span>
                ) : (
                  <span className="text-[10px] text-zinc-400 font-medium">Ready to pair</span>
                )}
                <Button
                  variant={app.connected ? 'outline' : 'primary'}
                  size="sm"
                  onClick={() => toggleIntegration(app.id)}
                  className="text-xs rounded-full font-bold"
                >
                  {app.connected ? 'Disconnect' : 'Connect Account'}
                </Button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
