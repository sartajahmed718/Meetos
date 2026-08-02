'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  Link2,
  Copy,
  Check,
  QrCode,
  Share2,
  ExternalLink,
  Plus,
  Sparkles,
  Code,
  Mail,
  Linkedin,
  Twitter,
  Instagram,
  Download,
} from 'lucide-react';
import Link from 'next/link';

export default function BookingLinksPage() {
  const { meetingTypes } = useMeetOSStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom One-off Link State
  const [isOneOffModalOpen, setIsOneOffModalOpen] = useState(false);
  const [oneOffTitle, setOneOffTitle] = useState('VIP Strategy Call');
  const [oneOffDuration, setOneOffDuration] = useState(45);
  const [oneOffMaxBookings, setOneOffMaxBookings] = useState(1);
  const [generatedOneOff, setGeneratedOneOff] = useState<string | null>(null);

  // Active Social Tab
  const [socialTab, setSocialTab] = useState<'LINKEDIN' | 'TWITTER' | 'EMAIL' | 'WEBSITE'>('LINKEDIN');

  const masterLink = 'https://meet.stateai.io/book/alex';

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateOneOff = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = `oneoff-${Date.now().toString().slice(-6)}`;
    const fullUrl = `https://meet.stateai.io/book/alex/${slug}?duration=${oneOffDuration}`;
    setGeneratedOneOff(fullUrl);
  };

  const socialSnippets = {
    LINKEDIN: `📅 Want to chat? Schedule a 1-on-1 call directly on my calendar:\n👉 ${masterLink}`,
    TWITTER: `Book a call with me on @StateAI MeetOS ⚡️\n${masterLink}`,
    EMAIL: `<a href="${masterLink}" style="background:#09090b; color:#ffffff; padding:8px 16px; border-radius:20px; text-decoration:none; font-weight:bold; font-size:12px;">📅 Schedule a Call with Alex</a>`,
    WEBSITE: `<script src="https://meet.stateai.io/embed.js"></script>\n<button data-meetos-embed="${masterLink}" style="background:#09090b; color:#fff; padding:10px 20px; border-radius:25px;">Book Meeting</button>`,
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Social Booking Links & QR Hub</h1>
            <Badge variant="zinc">
              <Share2 className="w-3 h-3 text-emerald-600 mr-1" />
              Social Ready
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Create bio links, single-event links, single-use one-off URLs, and QR codes for LinkedIn, X, Instagram & Email.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsOneOffModalOpen(true)}
            icon={<Plus className="w-3.5 h-3.5" />}
            className="rounded-full text-xs"
          >
            Create Single-Use Link
          </Button>
        </div>
      </div>

      {/* Master Public Profile Link Card */}
      <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Master Public Booking Profile</span>
            <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-indigo-600" />
              meet.stateai.io/book/alex
            </h3>
            <p className="text-xs text-zinc-500">Share this master URL in your social bios so attendees can view all your public meeting types.</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(masterLink, 'master')}
              icon={copiedId === 'master' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              className="rounded-full text-xs"
            >
              {copiedId === 'master' ? 'Copied Link!' : 'Copy Master URL'}
            </Button>
            <Link href="/book/alex/demo-30m" target="_blank">
              <Button variant="primary" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />} className="rounded-full text-xs">
                Open Profile ↗
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>

      {/* Grid: Event Type Links & Social Snippets */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Event Type Links */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-base font-bold text-zinc-900 tracking-tight">Event Type Booking Links</h3>

          <div className="space-y-3">
            {meetingTypes.map((mt) => {
              const linkUrl = `https://meet.stateai.io/book/alex/${mt.slug}`;
              return (
                <GlassCard key={mt.id} className="p-5 border border-black/5 bg-white shadow-soft flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={mt.kind === 'PAID' ? 'amber' : 'zinc'}>{mt.kind}</Badge>
                      <span className="text-xs text-zinc-400 font-mono">{mt.duration} mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-zinc-900">{mt.title}</h4>
                    <span className="text-[11px] text-zinc-500 font-mono block">{linkUrl}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(linkUrl, mt.id)}
                      icon={copiedId === mt.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      className="rounded-full text-xs"
                    >
                      {copiedId === mt.id ? 'Copied!' : 'Copy'}
                    </Button>
                    <Link href={`/book/alex/${mt.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" icon={<ExternalLink className="w-3.5 h-3.5 text-zinc-500" />} className="rounded-full p-2" />
                    </Link>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Right Column: Social Bio Copy Snippets & QR Code */}
        <div className="lg:col-span-5 space-y-6">
          {/* Social Snippets */}
          <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-zinc-700" />
                Social Bio Copy Snippets
              </h3>
            </div>

            {/* Social Platform Tabs */}
            <div className="flex rounded-full bg-zinc-100 p-1 border border-zinc-200 text-xs font-bold gap-1">
              {[
                { key: 'LINKEDIN', label: 'LinkedIn', icon: Linkedin },
                { key: 'TWITTER', label: 'X / Bio', icon: Twitter },
                { key: 'EMAIL', label: 'Email', icon: Mail },
                { key: 'WEBSITE', label: 'Embed', icon: Code },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setSocialTab(tab.key as any)}
                    className={`flex-1 py-1.5 rounded-full flex items-center justify-center gap-1 transition-all ${
                      socialTab === tab.key ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <textarea
                readOnly
                value={socialSnippets[socialTab]}
                rows={3}
                className="w-full bg-transparent border-0 text-xs text-zinc-800 font-mono resize-none focus:outline-none"
              />
              <div className="flex justify-end pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleCopy(socialSnippets[socialTab], `social-${socialTab}`)}
                  icon={copiedId === `social-${socialTab}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  className="rounded-full text-xs"
                >
                  {copiedId === `social-${socialTab}` ? 'Copied to Clipboard ✓' : 'Copy Snippet'}
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Downloadable QR Code Card */}
          <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4 text-center">
            <h3 className="text-sm font-bold text-zinc-900 flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4 text-indigo-600" />
              Instant Booking QR Code
            </h3>
            <p className="text-xs text-zinc-500">Scan with a smartphone camera to open your booking profile.</p>

            {/* Rendered SVG QR Code Mockup */}
            <div className="w-40 h-40 bg-white p-3 rounded-2xl border-2 border-zinc-900 mx-auto shadow-md flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-zinc-950">
                <rect x="10" y="10" width="25" height="25" rx="4" fill="#09090b" />
                <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                <rect x="18" y="18" width="9" height="9" fill="#09090b" />

                <rect x="65" y="10" width="25" height="25" rx="4" fill="#09090b" />
                <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                <rect x="73" y="18" width="9" height="9" fill="#09090b" />

                <rect x="10" y="65" width="25" height="25" rx="4" fill="#09090b" />
                <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                <rect x="18" y="73" width="9" height="9" fill="#09090b" />

                <rect x="42" y="42" width="16" height="16" rx="3" fill="#4f46e5" />
                <rect x="48" y="15" width="8" height="20" fill="#09090b" />
                <rect x="15" y="48" width="20" height="8" fill="#09090b" />
                <rect x="68" y="48" width="18" height="18" fill="#09090b" />
                <rect x="48" y="68" width="18" height="18" fill="#09090b" />
              </svg>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(masterLink, 'qr')}
              icon={<Download className="w-3.5 h-3.5" />}
              className="rounded-full text-xs"
            >
              Download QR Image PNG
            </Button>
          </GlassCard>
        </div>
      </div>

      {/* One-off Link Creator Modal */}
      <Modal
        isOpen={isOneOffModalOpen}
        onClose={() => {
          setIsOneOffModalOpen(false);
          setGeneratedOneOff(null);
        }}
        title="Create Single-Use One-Off Link"
        description="Generate a private custom booking URL that expires after 1 use."
        maxWidth="md"
      >
        {!generatedOneOff ? (
          <form onSubmit={handleCreateOneOff} className="space-y-4 text-xs mt-2">
            <Input
              label="Meeting Topic / Title"
              value={oneOffTitle}
              onChange={(e) => setOneOffTitle(e.target.value)}
              required
            />

            <div>
              <label className="block font-semibold text-zinc-600 mb-1">Custom Duration</label>
              <select
                value={oneOffDuration}
                onChange={(e) => setOneOffDuration(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-zinc-900"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-600 mb-1">Max Allowed Bookings</label>
              <select
                value={oneOffMaxBookings}
                onChange={(e) => setOneOffMaxBookings(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-zinc-900"
              >
                <option value={1}>1 Single-Use Only (Auto-expire)</option>
                <option value={3}>3 Uses Max</option>
                <option value={5}>5 Uses Max</option>
              </select>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsOneOffModalOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="rounded-full">
                Generate Link ✨
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-xs mt-2">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
              <span className="font-bold text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Single-Use Link Generated!
              </span>
              <p className="font-mono text-[11px] bg-white p-2 rounded-xl border border-emerald-300 break-all">
                {generatedOneOff}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCopy(generatedOneOff, 'oneoff-gen')}
                icon={copiedId === 'oneoff-gen' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                className="w-full rounded-full text-xs"
              >
                {copiedId === 'oneoff-gen' ? 'Copied One-Off Link!' : 'Copy Link to Send to Client'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
