'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Sparkles, Mail, Lock, Chrome, Github } from 'lucide-react';
import { CircularOrbitAnimation } from '@/components/landing/circular-orbit-animation';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'password' | 'magic'>('password');
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
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Background Soft Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-orange-100 via-indigo-100 to-transparent rounded-full filter blur-3xl opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="w-full max-w-6xl grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Circular Orbiting Ecosystem Animation matching reference */}
        <div className="hidden lg:flex lg:col-span-6 flex-col items-center text-center space-y-6">
          <CircularOrbitAnimation />
          <div className="space-y-2 max-w-sm">
            <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
              Complete AI Customer <br />
              <span className="font-serif italic font-normal text-zinc-800">Scheduling Ecosystem</span>
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Connect Google Calendar, Outlook, Zoom, Slack, Stripe, and HubSpot with 1-click authentication.
            </p>
          </div>
        </div>

        {/* Right Side: Clean White Login Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-white border border-black/5 rounded-3xl p-8 sm:p-10 shadow-floating text-zinc-900 space-y-6">
            {/* Header Logo */}
            <div className="text-center space-y-2">
              <Link href="/" className="inline-flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-bold shadow-sm">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-zinc-900 text-xl tracking-tight">MeetOS</span>
              </Link>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mt-1">Welcome back</h2>
              <p className="text-xs text-zinc-500">Log in to your MeetOS workspace</p>
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => router.push('/dashboard')}
                icon={<Chrome className="w-4 h-4 text-rose-500" />}
                className="text-xs rounded-full font-semibold"
              >
                Google
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => router.push('/dashboard')}
                icon={<Github className="w-4 h-4 text-zinc-900" />}
                className="text-xs rounded-full font-semibold"
              >
                GitHub
              </Button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-zinc-200 w-full" />
              <span className="bg-white px-3 text-[10px] uppercase tracking-wider text-zinc-400 font-bold absolute">
                or continue with
              </span>
            </div>

            {/* Auth Mode Toggle */}
            <div className="flex rounded-full bg-zinc-100 p-1 border border-zinc-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setAuthMode('password')}
                className={`flex-1 py-1.5 rounded-full transition-colors ${authMode === 'password' ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('magic')}
                className={`flex-1 py-1.5 rounded-full transition-colors ${authMode === 'magic' ? 'bg-zinc-950 text-white shadow-xs' : 'text-zinc-500 hover:text-zinc-900'}`}
              >
                Magic Link
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Work Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                icon={<Mail className="w-4 h-4" />}
              />

              {authMode === 'password' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-zinc-600">Password</label>
                    <Link href="/auth/forgot-password" className="text-[11px] text-zinc-900 font-bold hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<Lock className="w-4 h-4" />}
                  />
                </div>
              )}

              <Button variant="primary" size="lg" loading={loading} className="w-full text-sm mt-2 rounded-full py-3.5">
                {authMode === 'password' ? 'Sign In to Workspace' : 'Send Magic Link ✨'}
              </Button>
            </form>

            <p className="text-center text-xs text-zinc-500">
              Don't have a workspace yet?{' '}
              <Link href="/auth/signup" className="text-zinc-900 font-bold hover:underline">
                Create Workspace
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
