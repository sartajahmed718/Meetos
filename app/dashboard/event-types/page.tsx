'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  Video,
  Plus,
  Clock,
  ExternalLink,
  Trash2,
  Copy,
  Check,
  FormInput,
} from 'lucide-react';
import Link from 'next/link';

export default function MeetingTypesPage() {
  const { meetingTypes, addMeetingType, deleteMeetingType } = useMeetOSStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(30);
  const [kind, setKind] = useState<'ONE_ON_ONE' | 'ROUND_ROBIN' | 'COLLECTIVE' | 'PAID'>('ONE_ON_ONE');
  const [locationType, setLocationType] = useState<'GOOGLE_MEET' | 'ZOOM' | 'MS_TEAMS'>('GOOGLE_MEET');
  const [price, setPrice] = useState(0);

  // Custom Form Questions State
  const [questions, setQuestions] = useState<any[]>([
    { id: 'q1', label: 'Company Name', type: 'company', required: true },
    { id: 'q2', label: 'Work Phone', type: 'phone', required: false },
  ]);
  const [newQuestionLabel, setNewQuestionLabel] = useState('');
  const [newQuestionType, setNewQuestionType] = useState<any>('text');

  const handleCopyLink = (slug: string, id: string) => {
    navigator.clipboard.writeText(`https://meet.stateai.io/book/alex/${slug}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddQuestion = () => {
    if (!newQuestionLabel.trim()) return;
    setQuestions([
      ...questions,
      { id: `q-${Date.now()}`, label: newQuestionLabel, type: newQuestionType, required: false },
    ]);
    setNewQuestionLabel('');
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addMeetingType({
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      description: `Custom ${title} meeting type.`,
      duration,
      kind,
      locationType,
      price: price > 0 ? price : undefined,
      currency: price > 0 ? 'USD' : undefined,
      color: '#09090b',
      active: true,
      hostIds: ['usr-1'],
      customQuestions: questions,
    });

    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Meeting Types</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure 1-on-1 calls, team round-robin routing, paid consultations, and custom booking forms.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-3.5 h-3.5" />}
          className="rounded-full"
        >
          New Event Type
        </Button>
      </div>

      {/* Meeting Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetingTypes.map((mt) => (
          <GlassCard key={mt.id} className="p-6 border border-black/5 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant={mt.kind === 'PAID' ? 'amber' : mt.kind === 'ROUND_ROBIN' ? 'cyan' : 'zinc'}>
                  {mt.kind}
                </Badge>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyLink(mt.slug, mt.id)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                    title="Copy Public Link"
                  >
                    {copiedId === mt.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => deleteMeetingType(mt.id)}
                    className="p-1.5 rounded-full text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Type"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors">
                {mt.title}
              </h3>
              <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed">{mt.description}</p>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" /> {mt.duration} mins
                </span>
                <span className="flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-emerald-600" /> {mt.locationType}
                </span>
                {mt.price && (
                  <span className="font-bold text-amber-800">${mt.price}</span>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 flex items-center justify-between gap-2">
              <span className="text-[10px] text-zinc-400 font-mono">
                {mt.customQuestions?.length || 0} Custom Questions
              </span>
              <Link href={`/book/alex/${mt.slug}`} target="_blank">
                <Button variant="outline" size="sm" icon={<ExternalLink className="w-3 h-3" />} className="text-xs rounded-full">
                  Preview Booking →
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Create New Meeting Type Modal with Form Builder */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Meeting Type"
        description="Build a custom event with location settings, pricing, and custom attendee questions."
        maxWidth="xl"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs mt-2">
          <Input
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. 30 Min Discovery Call"
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-zinc-600 mb-1">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-zinc-900"
              >
                <option value={15}>15 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
                <option value={90}>90 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-600 mb-1">Event Kind</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as any)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-zinc-900"
              >
                <option value="ONE_ON_ONE">1-on-1 Call</option>
                <option value="ROUND_ROBIN">Round Robin Team</option>
                <option value="COLLECTIVE">Collective Team</option>
                <option value="PAID">Paid Consultation</option>
              </select>
            </div>
          </div>

          {kind === 'PAID' && (
            <Input
              label="Price (USD)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="250"
            />
          )}

          {/* Integrated Form Builder Section */}
          <div className="pt-3 border-t border-zinc-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-zinc-900 flex items-center gap-1.5">
                <FormInput className="w-4 h-4 text-zinc-700" /> Custom Booking Form Builder
              </span>
              <span className="text-[10px] text-zinc-400">Collect lead data before booking</span>
            </div>

            <div className="space-y-2">
              {questions.map((q, idx) => (
                <div key={q.id} className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between">
                  <span className="text-zinc-900 font-medium">{q.label} ({q.type})</span>
                  <button
                    type="button"
                    onClick={() => setQuestions(questions.filter((_, i) => i !== idx))}
                    className="text-zinc-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Question label (e.g. Budget, Website)..."
                value={newQuestionLabel}
                onChange={(e) => setNewQuestionLabel(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900"
              />
              <select
                value={newQuestionType}
                onChange={(e) => setNewQuestionType(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 rounded-xl px-2 py-2 text-xs text-zinc-900"
              >
                <option value="text">Short Text</option>
                <option value="textarea">Long Text</option>
                <option value="dropdown">Dropdown</option>
                <option value="phone">Phone Number</option>
                <option value="budget">Budget Select</option>
              </select>
              <Button type="button" variant="secondary" size="sm" onClick={handleAddQuestion} className="rounded-full">
                + Add
              </Button>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="rounded-full">
              Save Meeting Type
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
