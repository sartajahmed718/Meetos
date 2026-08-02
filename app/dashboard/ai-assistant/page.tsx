'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import {
  Sparkles,
  Bot,
  Workflow,
  Mail,
} from 'lucide-react';
import { generateAIMeetingPrep, generateAIFollowUpEmail, evaluateAIRouting } from '@/lib/ai-engine';

export default function AIAssistantPage() {
  const { users, bookings } = useMeetOSStore();
  const [activeTab, setActiveTab] = useState<'SCHEDULER' | 'PREP' | 'EMAIL' | 'ROUTING'>('PREP');

  // Attendee Prep State
  const [guestName, setGuestName] = useState('Jessica Taylor');
  const [guestCompany, setGuestCompany] = useState('Linear Technologies');
  const [guestEmail, setGuestEmail] = useState('jessica.t@linear.app');
  const [prepResult, setPrepResult] = useState<any>(null);

  // Email Generator State
  const [emailResult, setEmailResult] = useState<any>(null);

  // Smart Routing Simulator State
  const [budget, setBudget] = useState('$5,000 - $20,000');
  const [companySize, setCompanySize] = useState('51-200 employees');
  const [industry, setIndustry] = useState('B2B Tech / SaaS');
  const [country, setCountry] = useState('United States');
  const [routingResult, setRoutingResult] = useState<any>(null);

  const handleGeneratePrep = (e: React.FormEvent) => {
    e.preventDefault();
    const briefing = generateAIMeetingPrep(guestName, guestCompany, guestEmail, '30 Min Product Demo');
    setPrepResult(briefing);
  };

  const handleGenerateEmail = () => {
    if (bookings.length > 0) {
      const draft = generateAIFollowUpEmail(bookings[0]);
      setEmailResult(draft);
    }
  };

  const handleSimulateRouting = (e: React.FormEvent) => {
    e.preventDefault();
    const result = evaluateAIRouting({ budget, companySize, country, industry }, users);
    setRoutingResult(result);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">MeetOS AI Intelligence Hub</h1>
            <Badge variant="zinc">
              <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
              State AI v2.4
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Autonomous attendee research, smart lead routing, follow-up email drafts, and conflict optimization.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3">
        {[
          { key: 'PREP', label: 'AI Meeting Prep & Briefing', icon: Bot },
          { key: 'EMAIL', label: 'AI Email & Follow-up', icon: Mail },
          { key: 'ROUTING', label: 'AI Smart Lead Router', icon: Workflow },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === tab.key
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 shadow-xs'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: AI Meeting Prep */}
      {activeTab === 'PREP' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-6 border border-black/5 bg-white shadow-soft">
              <h3 className="text-sm font-bold text-zinc-900 mb-4">Generate Attendee Briefing</h3>
              <form onSubmit={handleGeneratePrep} className="space-y-4">
                <Input label="Attendee Full Name" value={guestName} onChange={(e) => setGuestName(e.target.value)} required />
                <Input label="Company Name" value={guestCompany} onChange={(e) => setGuestCompany(e.target.value)} required />
                <Input label="Attendee Work Email" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} required />
                <Button type="submit" variant="primary" size="lg" className="w-full text-xs rounded-full" icon={<Sparkles className="w-4 h-4 text-amber-300" />}>
                  Run AI Attendee Research →
                </Button>
              </form>
            </GlassCard>
          </div>

          <div className="lg:col-span-7">
            {prepResult ? (
              <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    AI Attendee Intelligence Card
                  </h3>
                  <Badge variant="emerald">Live Research Verified</Badge>
                </div>

                <div className="space-y-3 text-xs text-zinc-700">
                  <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                    <span className="text-zinc-500 text-[10px] uppercase font-bold block mb-1">Executive Summary</span>
                    <p className="text-zinc-900">{prepResult.attendeeSummary}</p>
                  </div>

                  <div>
                    <span className="font-bold text-zinc-900 block mb-1">LinkedIn Insights & Track Record</span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-600">
                      {prepResult.linkedinInsights.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-zinc-900 block mb-1">Suggested Meeting Objectives</span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-800">
                      {prepResult.suggestedObjectives.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-emerald-700 block mb-1">Recommended Agenda</span>
                    <ul className="list-disc pl-4 space-y-1 text-zinc-600 font-mono text-[11px]">
                      {prepResult.recommendedAgenda.map((item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-12 text-center border border-black/5 bg-white shadow-soft">
                <Bot className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-900">No research card generated yet</h3>
                <p className="text-xs text-zinc-500 mt-1">Enter an attendee's name and company on the left to run AI research.</p>
              </GlassCard>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: AI Email Generator */}
      {activeTab === 'EMAIL' && (
        <div className="space-y-4 max-w-3xl">
          <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">Generate Post-Meeting Follow-up Email</h3>
              <Button variant="primary" size="sm" onClick={handleGenerateEmail} icon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />} className="rounded-full">
                Generate Draft from Recent Meeting
              </Button>
            </div>

            {emailResult && (
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                <div>
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block">Subject Line</span>
                  <p className="font-bold text-zinc-900 text-sm">{emailResult.subject}</p>
                </div>
                <div className="pt-2 border-t border-zinc-200">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Email Body</span>
                  <pre className="text-xs text-zinc-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {emailResult.body}
                  </pre>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      )}

      {/* Tab 3: AI Smart Routing */}
      {activeTab === 'ROUTING' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <GlassCard className="p-6 border border-black/5 bg-white shadow-soft">
              <h3 className="text-sm font-bold text-zinc-900 mb-4">Simulate Lead Smart Routing</h3>
              <form onSubmit={handleSimulateRouting} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Estimated Budget</label>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-xs text-zinc-900">
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $20,000">$5,000 - $20,000</option>
                    <option value="$20,000+">$20,000+ Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-600 mb-1">Company Size</label>
                  <select value={companySize} onChange={(e) => setCompanySize(e.target.value)} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-xs text-zinc-900">
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="1000+ Enterprise">1000+ Enterprise</option>
                  </select>
                </div>

                <Input label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                <Input label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />

                <Button type="submit" variant="primary" size="lg" className="w-full text-xs rounded-full" icon={<Workflow className="w-4 h-4" />}>
                  Evaluate AI Routing Rule →
                </Button>
              </form>
            </GlassCard>
          </div>

          <div className="lg:col-span-6">
            {routingResult ? (
              <GlassCard className="p-6 border border-black/5 bg-white shadow-soft space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-emerald-600" />
                    Routing Recommendation
                  </h3>
                  <Badge variant="emerald">{routingResult.leadScore} Lead Score</Badge>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">Assigned Account Host</span>
                  <div className="flex items-center gap-3">
                    <img src={routingResult.recommendedHost.avatar} alt={routingResult.recommendedHost.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-zinc-900 text-sm">{routingResult.recommendedHost.name}</h4>
                      <p className="text-xs text-zinc-500">{routingResult.recommendedHost.title}</p>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block mb-1">AI Logic & Rationale</span>
                  <p className="text-xs text-zinc-700">{routingResult.reason}</p>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="p-12 text-center border border-black/5 bg-white shadow-soft">
                <Workflow className="w-10 h-10 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-zinc-900">No routing evaluation run</h3>
                <p className="text-xs text-zinc-500 mt-1">Submit the lead details form on the left to test host assignment.</p>
              </GlassCard>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
