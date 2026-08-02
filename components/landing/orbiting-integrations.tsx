'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
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

export function OrbitingIntegrations() {
  const apps = [
    { name: 'Google Calendar', Logo: GoogleCalendarLogo, angle: 0 },
    { name: 'Microsoft Outlook', Logo: OutlookLogo, angle: 45 },
    { name: 'Google Meet', Logo: GoogleMeetLogo, angle: 90 },
    { name: 'Zoom', Logo: ZoomLogo, angle: 135 },
    { name: 'Slack', Logo: SlackLogo, angle: 180 },
    { name: 'Stripe', Logo: StripeLogo, angle: 225 },
    { name: 'HubSpot', Logo: HubSpotLogo, angle: 270 },
    { name: 'Salesforce', Logo: SalesforceLogo, angle: 315 },
  ];

  return (
    <div className="relative w-full max-w-md aspect-square flex items-center justify-center mx-auto select-none">
      {/* Outer Orbit Circle */}
      <div className="absolute inset-4 rounded-full border-2 border-dashed border-zinc-300/80 animate-[spin_60s_linear_infinite]" />

      {/* Inner Orbit Circle */}
      <div className="absolute inset-16 rounded-full border border-zinc-200/60" />

      {/* Center MeetOS Logo Badge */}
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-28 h-28 rounded-3xl bg-zinc-950 text-white shadow-floating border border-zinc-800 flex flex-col items-center justify-center p-3 text-center"
      >
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md mb-1">
          <Sparkles className="w-5 h-5 text-amber-300" />
        </div>
        <span className="font-extrabold text-sm tracking-tight text-white">MeetOS</span>
        <span className="text-[9px] text-zinc-400 font-mono">AI Ecosystem</span>
      </motion.div>

      {/* Orbiting App Logos around MeetOS */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        {apps.map((app, idx) => {
          const LogoComponent = app.Logo;
          // Radius of orbit ring
          const radius = 145; // pixels
          const angleRad = (app.angle * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = Math.sin(angleRad) * radius;

          return (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotate the inner icon so the brand logo stays right side up! */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-2xl bg-white border border-black/10 shadow-floating flex items-center justify-center p-2.5 hover:scale-125 transition-transform duration-200 cursor-pointer"
                title={app.name}
              >
                <LogoComponent className="w-7 h-7" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
