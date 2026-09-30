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
  isCompactOnMobile = true,
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
  };

  const textSizes = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-lg lg:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 select-none ${className}`}>
      {/* Brand Icon Shield with Dual-Ring Gradient Pulse */}
      <div
        className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-500 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-500/20 group cursor-pointer transition-transform hover:scale-105 active:scale-95`}
      >
        {/* Ambient Backlight Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-2xl blur-[4px] opacity-40 group-hover:opacity-75 transition-opacity" />

        <div className="w-full h-full bg-[#080B14] rounded-[10px] sm:rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle internal gradient aura */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/25 via-transparent to-cyan-500/20 pointer-events-none" />

          {/* High-Tech Custom SVG: Neural Pulse Wave intertwined with "M" Geometry */}
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 relative z-10 transition-transform group-hover:scale-110 duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Base Heartbeat / Repurposing Pulse Wave with stylized M peak */}
            <path
              d="M2 13h3l2.2-6.5L10 18l3-12 2.5 7.5H22"
              className="stroke-cyan-400 transition-colors group-hover:stroke-cyan-300"
            />
            {/* Center Dynamic AI Pulse Spark */}
            <circle cx="11.5" cy="11.5" r="1.5" fill="#a78bfa" className="animate-ping origin-center" />
            <circle cx="11.5" cy="11.5" r="1.5" fill="#c084fc" />
          </svg>

          {/* Founder Identity Live Beacon Dot (Malik Hammad verified) */}
          <div
            className="absolute bottom-0.5 right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 rounded-full border-2 border-[#080B14] shadow-sm"
            title="Founder Verified: Malik Hammad (NEXUS PULSE)"
          />
        </div>
      </div>

      {/* Brand Name & Founder Identity Typography */}
      <div className="flex flex-col leading-tight min-w-0">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span
            className={`font-black tracking-tight text-white font-[family-name:var(--font-outfit)] ${textSizes[size]}`}
          >
            Content<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400">Pulse</span>
            <span className="ml-1 text-cyan-400 font-extrabold text-[0.8em]">AI</span>
          </span>

          <span className="text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-md sm:rounded-full bg-gradient-to-r from-violet-600/30 to-indigo-600/30 text-violet-300 border border-violet-500/40 tracking-wider">
            PRO
          </span>
        </div>

        {showTagline && (
          <div className="mt-0.5 truncate">
            {/* Responsive Founder Tagline: Compact on mobile, full on desktop */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-normal">
              <span className={isCompactOnMobile ? 'hidden xs:inline' : 'inline'}>By </span>
              <span className="text-violet-400 font-bold hover:text-violet-300 transition-colors">
                Malik Hammad
              </span>
              <span className="text-slate-600 mx-1">•</span>
              <span className="text-cyan-400/90 font-semibold tracking-wider">NEXUS PULSE</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
