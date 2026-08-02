'use client';

import React from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Badge } from '@/ui/input';
import { CreditCard, Download } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function PaymentsPage() {
  const { transactions } = useMeetOSStore();
  const totalEarned = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Stripe Payments & Revenue</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage paid consultation revenue, Stripe checkout logs, invoices, and refunds.
          </p>
        </div>

        <Badge variant="emerald" className="px-3 py-1.5 text-xs">
          <CreditCard className="w-4 h-4 mr-1 text-emerald-600" /> Stripe Connected
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <GlassCard className="p-6 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Total Consultations Gross</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">{formatCurrency(totalEarned)}</span>
            <span className="text-xs text-emerald-700 font-bold">+100% Paid</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Active Paid Meeting Types</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">2 Active</span>
            <span className="text-xs text-amber-800 font-bold">$250 - $500/hr</span>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border border-black/5">
          <span className="text-xs font-semibold text-zinc-500">Payout Status</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-black text-zinc-900">Available</span>
            <span className="text-xs text-zinc-700 font-bold">Auto-Daily Payout</span>
          </div>
        </GlassCard>
      </div>

      {/* Transactions Table */}
      <GlassCard className="p-6 border border-black/5 space-y-4">
        <h3 className="text-base font-bold text-zinc-900">Recent Transactions</h3>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 text-sm">{tx.customerName}</span>
                  <span className="text-xs text-zinc-500">({tx.customerEmail})</span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">{tx.date} • {tx.id}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-black text-emerald-700 text-base">{formatCurrency(tx.amount)}</span>
                <Badge variant="emerald">{tx.status}</Badge>
                <Button variant="outline" size="sm" icon={<Download className="w-3.5 h-3.5" />} className="text-xs rounded-full">
                  Invoice
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
