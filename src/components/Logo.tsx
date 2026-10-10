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
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-sm font-semibold tracking-tight',
    md: 'text-[15px] font-semibold tracking-tight',
    lg: 'text-lg font-bold tracking-tight',
  };

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* High-Tech Geometric Brand Mark */}
      <div
        className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 rounded-lg bg-zinc-950 border border-zinc-800 text-white shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-200 group-hover:border-zinc-700 group-hover:bg-zinc-900`}
      >
        <svg
          className="w-4 h-4 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Engineering Signal Waveform */}
          <path
            d="M 3 12 L 6.5 12 L 9 5.5 L 13.5 18.5 L 16.5 9.5 L 18.5 12 L 21 12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Precision Emerald Live Beacon */}
          <circle cx="13.5" cy="18.5" r="1.25" fill="#10b981" />
        </svg>

        {/* Ambient Corner Accent */}
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-zinc-700/60 rounded-tr" />
      </div>

      {/* Brand Name & Distribution Badge */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-2">
          <span className={`text-white transition-colors group-hover:text-zinc-100 ${textSizes[size]}`}>
            ContentPulse
          </span>
          <span className="text-[10px] font-mono tracking-wider text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            v1.0
          </span>
        </div>

        {showTagline && (
          <span className="text-[11px] text-zinc-500 font-normal mt-1 flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse inline-block" />
            Distribution Engine
          </span>
        )}
      </div>
    </div>
  );
}
