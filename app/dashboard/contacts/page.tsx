'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import {
  Search,
  Building2,
  Mail,
  TrendingUp,
} from 'lucide-react';

export default function ContactsPage() {
  const { contacts, setContacts } = useMeetOSStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<any | null>(null);
  const [newNote, setNewNote] = useState('');

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNote = () => {
    if (!newNote.trim() || !selectedContact) return;

    const noteObj = {
      id: `n-${Date.now()}`,
      content: newNote,
      createdAt: '2026-08-01',
      author: 'Alex Rivera',
    };

    const updated = contacts.map((c) =>
      c.id === selectedContact.id
        ? { ...c, notes: [noteObj, ...c.notes] }
        : c
    );

    setContacts(updated);
    setSelectedContact({ ...selectedContact, notes: [noteObj, ...selectedContact.notes] });
    setNewNote('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Client CRM & Contacts</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Every booking automatically generates a client profile with lead score, history, and timeline.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((cnt) => (
          <GlassCard key={cnt.id} className="p-6 border border-black/5 flex flex-col justify-between hover:border-zinc-300 transition-colors">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={cnt.avatar || 'https://avatar.vercel.sh/user'}
                    alt={cnt.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-zinc-900 leading-tight">{cnt.name}</h3>
                    <p className="text-xs text-zinc-500">{cnt.title || cnt.company}</p>
                  </div>
                </div>

                <Badge variant={cnt.leadStatus === 'CUSTOMER' ? 'emerald' : cnt.leadStatus === 'QUALIFIED' ? 'indigo' : 'zinc'}>
                  {cnt.leadStatus}
                </Badge>
              </div>

              <div className="space-y-1 text-xs text-zinc-500 pt-2 border-t border-zinc-100">
                <p className="flex items-center gap-2 text-zinc-800">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" /> {cnt.email}
                </p>
                {cnt.company && (
                  <p className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" /> {cnt.company}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {cnt.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200 font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-zinc-900">{cnt.leadScore}</span> Score
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedContact(cnt)}
                className="text-xs rounded-full"
              >
                View Profile & Notes →
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Client Profile Modal */}
      {selectedContact && (
        <Modal
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          title={`Client Profile: ${selectedContact.name}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-zinc-700 mt-2">
            <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-zinc-500 text-[10px] block">Company</span>
                  <span className="font-bold text-zinc-900 text-sm">{selectedContact.company}</span>
                </div>
                <div>
                  <span className="text-zinc-500 text-[10px] block">Total Bookings</span>
                  <span className="font-bold text-zinc-900 text-sm">{selectedContact.totalBookings} meetings</span>
                </div>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 block">CRM Notes & Timeline</span>
              {selectedContact.notes?.length > 0 ? (
                selectedContact.notes.map((n: any) => (
                  <div key={n.id} className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-1">
                    <p className="text-zinc-900">{n.content}</p>
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span>By {n.author}</span>
                      <span>{n.createdAt}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 italic">No notes created yet.</p>
              )}
            </div>

            {/* Add Note Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a timeline note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-xs text-zinc-900"
              />
              <Button variant="primary" size="sm" onClick={handleAddNote} className="rounded-full">
                Add Note
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
