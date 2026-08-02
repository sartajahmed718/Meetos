'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 glass-panel shadow-2xl relative z-10 text-left space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-white text-xl">MeetOS</span>
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-2">Reset Password</h2>
          <p className="text-xs text-zinc-400">Enter your email and we'll send a recovery link</p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-sm">Reset Link Sent</h4>
            <p className="text-xs text-zinc-300">Check your inbox for instructions to reset your password.</p>
            <Link href="/auth/login" className="inline-block pt-2 text-xs text-indigo-400 hover:underline font-semibold">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="alex@company.com"
              icon={<Mail className="w-4 h-4" />}
            />
            <Button variant="glowing" size="lg" loading={loading} className="w-full text-sm">
              Send Password Reset Link
            </Button>
          </form>
        )}

        <p className="text-center text-xs text-zinc-400">
          Remember password?{' '}
          <Link href="/auth/login" className="text-indigo-400 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
