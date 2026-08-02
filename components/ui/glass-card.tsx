'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'bg-white rounded-3xl p-6 relative overflow-hidden transition-all duration-300 border border-black/5 shadow-soft text-zinc-900',
        hoverEffect && 'glass-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
