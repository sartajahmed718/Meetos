'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Globe, Key, Palette, Save, Copy, Check } from 'lucide-react';

export default function SettingsPage() {
  const { workspace, updateWorkspace } = useMeetOSStore();
  const [name, setName] = useState(workspace.name);
  const [customDomain, setCustomDomain] = useState(workspace.customDomain || 'meet.stateai.io');
  const [primaryColor, setPrimaryColor] = useState(workspace.primaryColor || '#09090b');
  const [apiKey, setApiKey] = useState('meetos_live_sk_981273918239182391823');
  const [copiedKey, setCopiedKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWorkspace({ name, customDomain, primaryColor });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Workspace & Branding Settings</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure workspace white-label branding, custom domains, and REST API access keys.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleSave} icon={<Save className="w-3.5 h-3.5" />} className="rounded-full">
          {savedSuccess ? 'Saved Changes ✓' : 'Save Settings'}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-12 gap-8">
        {/* Left: General & Branding Settings */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6 border border-black/5 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-zinc-700" />
              Workspace Branding
            </h3>

            <Input label="Workspace Name" value={name} onChange={(e) => setName(e.target.value)} required />

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Primary Color Accent</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border-0 cursor-pointer"
                />
                <input
                  type="text"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="bg-zinc-50 border border-zinc-200 rounded-2xl px-3 py-2 text-xs text-zinc-900 font-mono"
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border border-black/5 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              Custom CNAME Domain
            </h3>

            <Input
              label="Custom Domain"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="e.g. book.yourcompany.com"
            />
            <p className="text-[11px] text-zinc-500">
              Point a CNAME record to <span className="font-mono text-zinc-900 font-bold">cname.meet.stateai.io</span> for SSL auto-issuance.
            </p>
          </GlassCard>
        </div>

        {/* Right: API Keys & Tokens */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 border border-black/5 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              API Keys & Webhooks
            </h3>

            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1">Secret REST API Key</label>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={apiKey}
                  readOnly
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-3 py-2 text-xs text-zinc-800 font-mono"
                />
                <Button type="button" variant="outline" size="sm" onClick={handleCopyKey} className="rounded-full">
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setApiKey(`meetos_live_sk_${Date.now()}`)}
              className="w-full text-xs rounded-full"
            >
              Roll New API Key
            </Button>
          </GlassCard>
        </div>
      </form>
    </div>
  );
}
