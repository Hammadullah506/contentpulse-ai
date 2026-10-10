'use client';

import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  isCompactOnMobile?: boolean;
}

export function Logo({
  className = '',
  showTagline = true,
  size = 'md',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  };

  const textSizes = {
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg font-bold',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Vercel-Style Minimalist Monochrome Mark */}
      <div
        className={`flex items-center justify-center ${iconSizes[size]} shrink-0 rounded-lg bg-white text-black transition-transform hover:scale-105 active:scale-95`}
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h3l3-8 6 16 3-8h3" />
        </svg>
      </div>

      {/* Clean Brand Name & Subtext */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`tracking-tight text-white ${textSizes[size]}`}>
            ContentPulse
          </span>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            v1.0
          </span>
        </div>

        {showTagline && (
          <span className="text-[11px] text-zinc-500 font-normal mt-0.5">
            Content distribution engine
          </span>
        )}
      </div>
    </div>
  );
}
