'use client';

import React from 'react';
import Link from 'next/link';
import { LandingHero } from '@/components/landing/hero';
import { FeaturesGrid } from '@/components/landing/features-grid';
import { HowItWorks } from '@/components/landing/how-it-works';
import { LiveIntegrations } from '@/components/landing/live-integrations';
import { Pricing } from '@/components/landing/pricing';
import { TestimonialsAndFAQ } from '@/components/landing/testimonials-faq';
import { LandingFooter } from '@/components/landing/footer';
import { Button } from '@/ui/button';
import { Sparkles, ArrowUpRight, ChevronDown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-zinc-900 flex flex-col font-sans selection:bg-zinc-900 selection:text-white">
      {/* Floating Pill Navbar */}
      <div className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-2 sm:px-4">
        <header className="floating-navbar rounded-full px-3.5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-8 max-w-4xl w-full">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 rounded-lg bg-zinc-950 flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-extrabold text-zinc-900 tracking-tight text-sm sm:text-base">MeetOS</span>
          </Link>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-zinc-600">
            <Link href="#features" className="hover:text-zinc-900 transition-colors">Products</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-zinc-900 transition-colors">
              <span>Solutions</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </div>
            <Link href="#integrations" className="hover:text-zinc-900 transition-colors">Integration</Link>
            <Link href="#pricing" className="hover:text-zinc-900 transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-zinc-900 transition-colors">Blog</Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-4 rounded-full">
                Log in
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="primary" size="sm" className="text-[11px] sm:text-xs font-semibold px-3 sm:px-4 rounded-full">
                Get Started <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5 sm:ml-1" />
              </Button>
            </Link>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <LandingHero />
        <FeaturesGrid />
        <HowItWorks />
        <LiveIntegrations />
        <Pricing />
        <TestimonialsAndFAQ />
      </main>

      <LandingFooter />
    </div>
  );
}
