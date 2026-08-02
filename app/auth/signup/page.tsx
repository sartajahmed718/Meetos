'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Sparkles, Mail, Lock, User, Building2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('Alex Rivera');
  const [companyName, setCompanyName] = useState('State AI Labs');
  const [email, setEmail] = useState('alex@stateai.io');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="ambient-glow bg-indigo-600/30 w-96 h-96 top-1/4 left-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 glass-panel shadow-2xl relative z-10 text-left space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl">MeetOS</span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-2">Get Started Free</h2>
          <p className="text-xs text-zinc-400">Create your AI scheduling workspace in seconds</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Workspace / Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            icon={<Building2 className="w-4 h-4" />}
          />
          <Input
            label="Work Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            icon={<Lock className="w-4 h-4" />}
          />

          <Button variant="glowing" size="lg" loading={loading} className="w-full text-sm mt-2">
            Create Free Workspace →
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-indigo-400 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
