'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/ui/glass-card';
import { Badge } from '@/ui/input';
import { ShieldCheck, ToggleRight, Activity } from 'lucide-react';

export default function AdminPage() {
  const [flags, setFlags] = useState([
    { id: 'f1', name: 'AI Attendee Briefing Generator', enabled: true },
    { id: 'f2', name: 'Custom Domain SSL Auto-Provisioning', enabled: true },
    { id: 'f3', name: 'Stripe Global Multi-Currency Checkout', enabled: true },
    { id: 'f4', name: 'Experimental AI Lead Router v3', enabled: false },
  ]);

  const toggleFlag = (id: string) => {
    setFlags(flags.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
  };

  const logs = [
    { id: 'l1', action: 'WORKSPACE_PLAN_UPGRADED', user: 'alex@stateai.io', time: '10 mins ago', ip: '192.168.1.1' },
    { id: 'l2', action: 'API_KEY_CREATED', user: 'sarah@stateai.io', time: '1 hour ago', ip: '10.0.0.4' },
    { id: 'l3', action: 'ROUND_ROBIN_RULE_UPDATED', user: 'marcus@stateai.io', time: '3 hours ago', ip: '172.16.0.2' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Superadmin Control Panel</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Platform-wide feature flags, audit logs, API rate limit monitoring, and tenant control.
          </p>
        </div>

        <Badge variant="zinc" className="px-3 py-1 text-xs font-mono">
          <ShieldCheck className="w-4 h-4 mr-1 text-zinc-900" /> Superadmin Access
        </Badge>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Feature Flags */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 border border-black/5 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <ToggleRight className="w-5 h-5 text-zinc-700" />
              Platform Feature Flags
            </h3>

            <div className="space-y-3">
              {flags.map((f) => (
                <div key={f.id} className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900">{f.name}</span>
                  <button
                    onClick={() => toggleFlag(f.id)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                      f.enabled ? 'bg-zinc-950' : 'bg-zinc-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                        f.enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-6 space-y-4">
          <GlassCard className="p-6 border border-black/5 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              System Audit Trail
            </h3>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-900 font-mono">{log.action}</span>
                    <span className="text-[10px] text-zinc-500">{log.time}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500">User: {log.user} • IP: {log.ip}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
