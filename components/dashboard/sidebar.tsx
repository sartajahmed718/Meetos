'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Clock,
  Video,
  Users,
  Building2,
  Zap,
  Grid2X2,
  CreditCard,
  BarChart3,
  Settings,
  ShieldCheck,
  Sparkles,
  LogOut,
  Share2,
} from 'lucide-react';
import { useMeetOSStore } from '@/lib/store';

export function Sidebar() {
  const pathname = usePathname();
  const { workspace } = useMeetOSStore();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Bookings', href: '/dashboard/bookings', icon: CalendarCheck2, badge: '4' },
    { label: 'Calendar', href: '/dashboard/calendar', icon: CalendarDays },
    { label: 'Share Links & QR', href: '/dashboard/links', icon: Share2, badge: 'New' },
    { label: 'Availability', href: '/dashboard/availability', icon: Clock },
    { label: 'Meeting Types', href: '/dashboard/event-types', icon: Video },
    { label: 'Contacts (CRM)', href: '/dashboard/contacts', icon: Users },
    { label: 'Teams', href: '/dashboard/teams', icon: Building2 },
    { label: 'AI Intelligence', href: '/dashboard/ai-assistant', icon: Sparkles, aiBadge: true },
    { label: 'Automations', href: '/dashboard/automations', icon: Zap },
    { label: 'Integrations', href: '/dashboard/integrations', icon: Grid2X2 },
    { label: 'Payments', href: '/dashboard/payments', icon: CreditCard },
    { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    { label: 'Admin Panel', href: '/dashboard/admin', icon: ShieldCheck },
  ];

  return (
    <aside className="w-64 hidden lg:flex flex-col h-screen bg-white border-r border-black/5 p-4 sticky top-0 z-30 select-none">
      {/* Brand & Workspace Title */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4 px-2">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-zinc-900 tracking-tight text-base block leading-none">
              MeetOS
            </span>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
              {workspace.name}
            </span>
          </div>
        </Link>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-800 font-semibold border border-zinc-200">
          v2.4 AI
        </span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 group relative',
                isActive
                  ? 'bg-zinc-950 text-white shadow-md font-bold'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-900',
                    item.aiBadge && !isActive && 'text-amber-500'
                  )}
                />
                <span>{item.label}</span>
              </div>

              {item.aiBadge && (
                <span className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-900 border border-amber-200"
                )}>
                  AI
                </span>
              )}

              {item.badge && !item.aiBadge && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-full",
                  isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-700 border border-zinc-200"
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile & Workspace Footer */}
      <div className="pt-4 border-t border-zinc-100 mt-auto">
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200/80">
          <div className="flex items-center gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alex Rivera"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-300"
            />
            <div className="text-left">
              <p className="text-xs font-bold text-zinc-900 leading-tight">Alex Rivera</p>
              <p className="text-[10px] text-zinc-500">alex@stateai.io</p>
            </div>
          </div>
          <Link href="/auth/login" className="text-zinc-400 hover:text-red-600 p-1.5 transition-colors">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
