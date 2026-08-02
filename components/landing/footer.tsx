'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#f5f5f7] text-zinc-600 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-zinc-900 text-base">MeetOS</span>
          </Link>
          <p className="text-zinc-500 max-w-sm text-xs leading-relaxed">
            Book Smarter. Powered by AI. The next-generation scheduling ecosystem engineered for ambitious leaders and teams.
          </p>
          <div className="flex items-center gap-4 text-zinc-500">
            <Link href="https://github.com" target="_blank" className="hover:text-zinc-900 transition-colors">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="https://twitter.com" target="_blank" className="hover:text-zinc-900 transition-colors">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="hover:text-zinc-900 transition-colors">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-3">Product</h4>
          <ul className="space-y-2">
            <li><Link href="#features" className="hover:text-zinc-900">AI Scheduling</Link></li>
            <li><Link href="#how-it-works" className="hover:text-zinc-900">Round Robin</Link></li>
            <li><Link href="#integrations" className="hover:text-zinc-900">Integrations</Link></li>
            <li><Link href="#pricing" className="hover:text-zinc-900">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-3">Resources</h4>
          <ul className="space-y-2">
            <li><Link href="/dashboard" className="hover:text-zinc-900">Dashboard</Link></li>
            <li><Link href="/book/alex/demo-30m" className="hover:text-zinc-900">Public Profile Demo</Link></li>
            <li><Link href="#faq" className="hover:text-zinc-900">Documentation</Link></li>
            <li><Link href="#faq" className="hover:text-zinc-900">API Reference</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-zinc-900 mb-3">Company</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-zinc-900">About State AI</Link></li>
            <li><Link href="#" className="hover:text-zinc-900">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-zinc-900">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-zinc-900">Security & SOC2</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500">
        <p>© 2026 State AI Labs Inc. All rights reserved.</p>
        <p>Built with Next.js 15, React 19 & Geometric Fonts.</p>
      </div>
    </footer>
  );
}
