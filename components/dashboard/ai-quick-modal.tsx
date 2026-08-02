'use client';

import React, { useState } from 'react';
import { Modal } from '@/ui/modal';
import { Button } from '@/ui/button';
import { Sparkles, Send, Calendar, CheckCircle2 } from 'lucide-react';
import { useMeetOSStore } from '@/lib/store';
import { parseAISchedulePrompt } from '@/lib/ai-engine';

interface AIQuickModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIQuickModal({ isOpen, onClose }: AIQuickModalProps) {
  const { meetingTypes, users, addBooking } = useMeetOSStore();
  const [promptText, setPromptText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setLoading(true);
    setBookedSuccess(false);

    setTimeout(() => {
      const aiResponse = parseAISchedulePrompt(promptText, meetingTypes, users);
      setResult(aiResponse);
      setLoading(false);
    }, 600);
  };

  const handleConfirmSlot = (slot: { date: string; time: string; label: string }) => {
    if (!result) return;

    addBooking({
      meetingTypeId: result.meetingType.id,
      meetingTitle: result.meetingType.title,
      guestName: 'AI Scheduled Guest',
      guestEmail: 'guest.ai@stateai.io',
      guestCompany: 'State AI AI Lead',
      date: slot.date,
      time: slot.time,
      endTime: '14:30',
      timezone: 'America/New_York',
      locationType: result.meetingType.locationType,
      locationUrl: 'https://meet.google.com/ai-meetos-slot',
      hostId: result.assignedHost.id,
      hostName: result.assignedHost.name,
      hostEmail: result.assignedHost.email,
    });

    setBookedSuccess(true);
    setTimeout(() => {
      onClose();
      setResult(null);
      setPromptText('');
      setBookedSuccess(false);
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="MeetOS AI Assistant"
      description="Type natural language scheduling commands or request intelligent attendee research."
      maxWidth="lg"
    >
      <form onSubmit={handleAISubmit} className="space-y-4 mt-2">
        <div className="relative">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="e.g. 'I want a 30 minute meeting next week with Sarah Chen for a product demo...'"
            rows={3}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] text-zinc-500">
              Powered by <span className="text-zinc-900 font-bold">State AI Engine</span>
            </span>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              loading={loading}
              icon={<Send className="w-3.5 h-3.5" />}
              className="rounded-full text-xs"
            >
              Analyze & Schedule
            </Button>
          </div>
        </div>

        {/* AI Quick Prompts Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-100">
          {[
            'Book 30 min demo next Tuesday with Sarah',
            '15 min discovery call tomorrow afternoon',
            'Executive strategy session with Alex Rivera',
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setPromptText(prompt)}
              className="text-[11px] px-3 py-1 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium border border-zinc-200 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* AI Results Output */}
        {result && (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-900 font-bold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Scheduling Recommendation</span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">{result.aiExplanation}</p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-zinc-200">
                <span className="text-zinc-400 block text-[10px]">Meeting Type</span>
                <span className="font-bold text-zinc-900">{result.meetingType.title}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-zinc-200">
                <span className="text-zinc-400 block text-[10px]">Assigned Host</span>
                <span className="font-bold text-zinc-900">{result.assignedHost.name}</span>
              </div>
            </div>

            <span className="text-[11px] font-bold text-zinc-700 block pt-1">
              Select Preferred Time Slot:
            </span>

            <div className="space-y-2">
              {result.suggestedSlots.map((slot: any, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-zinc-200 hover:border-zinc-400 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-zinc-900 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{slot.label}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    type="button"
                    onClick={() => handleConfirmSlot(slot)}
                    className="rounded-full text-xs"
                  >
                    Confirm Slot
                  </Button>
                </div>
              ))}
            </div>

            {bookedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Meeting successfully booked! Adding to your calendar...</span>
              </div>
            )}
          </div>
        )}
      </form>
    </Modal>
  );
}
