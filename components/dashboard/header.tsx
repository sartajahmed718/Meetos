'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  Bell,
  ChevronDown,
  Building2,
  Plus,
  Check,
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  CalendarCheck2,
  Clock,
  Video,
  Users,
  Zap,
  Grid2X2,
  CreditCard,
  BarChart3,
  Settings,
  ShieldCheck,
  LogOut,
  Share2,
} from 'lucide-react';
import { Button } from '@/ui/button';
import { AIQuickModal } from './ai-quick-modal';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const { workspace, updateWorkspace } = useMeetOSStore();
  const [isWorkspaceMenuOpen, setIsWorkspaceMenuOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mockWorkspaces = [
    { name: 'State AI Labs', slug: 'state-ai', plan: 'ENTERPRISE' },
    { name: 'Acme Corp', slug: 'acme', plan: 'PRO' },
    { name: 'Alex Rivera (Personal)', slug: 'alex', plan: 'FREE' },
  ];

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
    <>
      <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-black/5 px-4 sm:px-6 flex items-center justify-between">
        {/* Left: Mobile Menu Toggle & Workspace Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-900 transition-colors"
            title="Open Mobile Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsWorkspaceMenuOpen(!isWorkspaceMenuOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 text-xs font-semibold text-zinc-900 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-zinc-950 flex items-center justify-center text-white text-[10px] font-bold">
                {workspace.name.charAt(0)}
              </div>
              <span className="font-bold text-zinc-900">{workspace.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {/* Workspace Switcher Menu */}
            {isWorkspaceMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-black/5 rounded-2xl shadow-floating p-1 z-50">
                <p className="px-3 py-1.5 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                  Workspaces
                </p>
                {mockWorkspaces.map((ws) => (
                  <button
                    key={ws.slug}
                    onClick={() => {
                      updateWorkspace({ name: ws.name, slug: ws.slug });
                      setIsWorkspaceMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs hover:bg-zinc-100 text-zinc-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-zinc-700" />
                      <div>
                        <p className="font-bold text-zinc-900">{ws.name}</p>
                        <p className="text-[10px] text-zinc-500">{ws.plan}</p>
                      </div>
                    </div>
                    {workspace.name === ws.name && <Check className="w-4 h-4 text-zinc-950" />}
                  </button>
                ))}
                <div className="border-t border-zinc-100 my-1" />
                <button
                  onClick={() => setIsWorkspaceMenuOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-zinc-900 hover:bg-zinc-100 font-semibold transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Create Workspace
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Center: AI Assistant Quick Action */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200/60 border border-zinc-200 text-xs text-zinc-500 transition-all duration-200 w-64 lg:w-96 justify-between group"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ask AI: "Book 30 mins next week..."</span>
            </div>
            <kbd className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-[10px] font-mono text-zinc-600 shadow-xs">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/links">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex text-xs rounded-full" icon={<Share2 className="w-3.5 h-3.5 text-emerald-600" />}>
              Share Links & QR
            </Button>
          </Link>
          <Link href="/book/alex/demo-30m" target="_blank">
            <Button variant="primary" size="sm" className="hidden sm:inline-flex text-xs rounded-full">
              Public Profile ↗
            </Button>
          </Link>

          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-zinc-950" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-black/5 rounded-2xl shadow-floating p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <h4 className="text-xs font-bold text-zinc-900">Notifications</h4>
                  <span className="text-[10px] text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-full font-bold">
                    2 New
                  </span>
                </div>
                <div className="space-y-2 mt-2 max-h-64 overflow-y-auto">
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <p className="font-bold text-zinc-900">New Booking Confirmed</p>
                    <p className="text-[11px] text-zinc-600">Jessica Taylor booked 30 Min Demo</p>
                    <span className="text-[10px] text-zinc-400">10 mins ago</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                    <p className="font-bold text-zinc-900">AI Briefing Ready</p>
                    <p className="text-[11px] text-zinc-600">Meeting Brief generated for David K. Miller</p>
                    <span className="text-[10px] text-zinc-400">1 hour ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu for Mobile Devices */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-5 flex flex-col z-50 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-zinc-900 text-base">MeetOS</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-colors',
                      isActive ? 'bg-zinc-950 text-white font-bold' : 'text-zinc-600 hover:bg-zinc-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-zinc-100 mt-6">
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Alex Rivera"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-zinc-900 leading-none">Alex Rivera</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">alex@stateai.io</p>
                  </div>
                </div>
                <Link href="/auth/login">
                  <LogOut className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Quick Modal */}
      <AIQuickModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
    </>
  );
}
