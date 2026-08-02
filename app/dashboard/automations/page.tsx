'use client';

import React from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/input';
import { Zap, Plus } from 'lucide-react';

export default function AutomationsPage() {
  const { automations, toggleAutomation } = useMeetOSStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Workflow Automations Engine</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Automate post-booking actions across Slack, SMS, WhatsApp, HubSpot CRM, and custom Webhooks.
          </p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />} className="rounded-full">
          Create Automation Rule
        </Button>
      </div>

      <div className="space-y-4">
        {automations.map((rule) => (
          <GlassCard key={rule.id} className="p-6 border border-black/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">{rule.name}</h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Trigger: {rule.trigger}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <span className="text-xs text-zinc-400">Actions:</span>
                {rule.actions.map((act, idx) => (
                  <Badge key={idx} variant="zinc">
                    {act.type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleAutomation(rule.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  rule.active ? 'bg-zinc-950' : 'bg-zinc-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    rule.active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="text-xs text-zinc-600 font-semibold">{rule.active ? 'Active' : 'Disabled'}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
