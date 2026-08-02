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

export function CircularOrbitAnimation() {
  const apps = [
    { name: 'Google Calendar', Logo: GoogleCalendarLogo, angle: 0, size: 'w-10 h-10 sm:w-14 sm:h-14', padding: 'p-2 sm:p-3' },
    { name: 'Microsoft Outlook', Logo: OutlookLogo, angle: 40, size: 'w-9 h-9 sm:w-12 sm:h-12', padding: 'p-2 sm:p-2.5' },
    { name: 'Google Meet', Logo: GoogleMeetLogo, angle: 80, size: 'w-10 h-10 sm:w-14 sm:h-14', padding: 'p-2 sm:p-3' },
    { name: 'Zoom', Logo: ZoomLogo, angle: 120, size: 'w-9 h-9 sm:w-12 sm:h-12', padding: 'p-2 sm:p-2.5' },
    { name: 'Slack', Logo: SlackLogo, angle: 160, size: 'w-10 h-10 sm:w-14 sm:h-14', padding: 'p-2 sm:p-3' },
    { name: 'Stripe', Logo: StripeLogo, angle: 200, size: 'w-9 h-9 sm:w-12 sm:h-12', padding: 'p-2 sm:p-2.5' },
    { name: 'HubSpot', Logo: HubSpotLogo, angle: 240, size: 'w-10 h-10 sm:w-14 sm:h-14', padding: 'p-2 sm:p-3' },
    { name: 'Salesforce', Logo: SalesforceLogo, angle: 280, size: 'w-9 h-9 sm:w-12 sm:h-12', padding: 'p-2 sm:p-2.5' },
    { name: 'Zapier', Logo: ZapierLogo, angle: 320, size: 'w-10 h-10 sm:w-14 sm:h-14', padding: 'p-2 sm:p-3' },
  ];

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-lg aspect-square flex items-center justify-center mx-auto select-none rounded-3xl sm:rounded-4xl bg-gradient-to-b from-indigo-50/70 via-blue-50/50 to-indigo-100/60 p-4 sm:p-8 border border-indigo-100 shadow-soft overflow-hidden">
      {/* Background Soft Radial Glow */}
      <div className="absolute w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-400/10 rounded-full filter blur-3xl" />

      {/* Outer Orbit Concentric Circle */}
      <div className="absolute w-[240px] sm:w-[360px] h-[240px] sm:h-[360px] rounded-full border border-indigo-200/60 bg-white/20 backdrop-blur-xs" />
      <div className="absolute w-[170px] sm:w-[260px] h-[170px] sm:h-[260px] rounded-full border border-indigo-200/40" />

      {/* Center Circle Node matching Reference Image 2 */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: [0.97, 1.03, 0.97] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10 w-20 h-20 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 text-white shadow-2xl ring-2 sm:ring-4 ring-white flex flex-col items-center justify-center p-2 sm:p-4 text-center cursor-pointer group"
      >
        <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md mb-0.5 sm:mb-1.5 group-hover:scale-110 transition-transform">
          <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-300" />
        </div>
        <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white leading-none">MeetOS</span>
        <span className="text-[8px] sm:text-[10px] text-indigo-300 font-semibold mt-0.5 sm:mt-1">AI Ecosystem</span>
      </motion.div>

      {/* Rotating Framer Motion Orbit Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 w-full h-full flex items-center justify-center"
      >
        {apps.map((app, idx) => {
          const LogoComponent = app.Logo;
          // Responsive radius for mobile vs desktop
          const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 180;
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
              {/* Counter-rotate the inner logo so it stays right-side up! */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className={`bg-white rounded-xl sm:rounded-2xl shadow-floating border border-black/5 flex items-center justify-center ${app.size} ${app.padding} hover:scale-125 transition-transform duration-200 cursor-pointer`}
                title={app.name}
              >
                <LogoComponent className="w-full h-full" />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
