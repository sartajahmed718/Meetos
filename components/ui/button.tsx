'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glowing' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, icon, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-950/20 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] rounded-full';

    const variants = {
      primary:
        'bg-zinc-950 hover:bg-zinc-800 text-white shadow-md shadow-zinc-950/10 border border-zinc-900',
      secondary:
        'bg-zinc-200/80 hover:bg-zinc-300 text-zinc-900 border border-zinc-300/50',
      outline:
        'border border-zinc-300/80 hover:border-zinc-400 text-zinc-900 bg-white hover:bg-zinc-50 shadow-sm',
      ghost:
        'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60',
      glowing:
        'bg-zinc-950 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-950/15 border border-zinc-800',
      danger:
        'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/10',
    };

    const sizes = {
      sm: 'text-xs px-4 py-2 gap-1.5',
      md: 'text-sm px-5 py-2.5 gap-2',
      lg: 'text-base px-7 py-3.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
