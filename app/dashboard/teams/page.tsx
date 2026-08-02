'use client';

import React, { useState } from 'react';
import { useMeetOSStore } from '@/lib/store';
import { GlassCard } from '@/ui/glass-card';
import { Button } from '@/ui/button';
import { Input, Badge } from '@/ui/input';
import { Modal } from '@/ui/modal';
import { Plus } from 'lucide-react';

export default function TeamsPage() {
  const { users, setUsers } = useMeetOSStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MANAGER' | 'MEMBER'>('MEMBER');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=150&auto=format&fit=crop&q=80`,
      role,
      title: 'Team Specialist',
      company: 'State AI Labs',
    };

    setUsers([...users, newUser as any]);
    setIsModalOpen(false);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Team Management & Round Robin</h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Manage multi-tenant team members, RBAC roles (Owner, Admin, Manager, Member), and round-robin rules.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-3.5 h-3.5" />}
          className="rounded-full"
        >
          Invite Team Member
        </Button>
      </div>

      {/* Team Members List */}
      <div className="grid md:grid-cols-2 gap-6">
        {users.map((usr) => (
          <GlassCard key={usr.id} className="p-6 border border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={usr.avatar} alt={usr.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-200" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-zinc-900">{usr.name}</h3>
                  <Badge variant={usr.role === 'OWNER' ? 'amber' : usr.role === 'ADMIN' ? 'indigo' : 'zinc'}>
                    {usr.role}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 mt-0.5">{usr.title}</p>
                <p className="text-[11px] text-zinc-400 font-mono">{usr.email}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite New Team Member"
        description="Add members to your workspace and assign RBAC roles."
      >
        <form onSubmit={handleInvite} className="space-y-4 text-xs mt-2">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Work Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div>
            <label className="block font-semibold text-zinc-600 mb-1">RBAC Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-3.5 py-2 text-zinc-900"
            >
              <option value="ADMIN">Admin (Full Control)</option>
              <option value="MANAGER">Manager (Team Control)</option>
              <option value="MEMBER">Member (Standard Access)</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)} className="rounded-full">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" className="rounded-full">
              Send Workspace Invite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
