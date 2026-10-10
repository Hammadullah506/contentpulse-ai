'use client';

import React from 'react';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-10 text-xs text-zinc-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Logo size="sm" showTagline={false} />
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-500">
            Publishing & Distribution Platform
          </span>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-3 text-zinc-500">
          <span>By Malik Hammad</span>
          <span>•</span>
          <a
            href="https://blog.malikhammaddigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Blog
          </a>
          <span>•</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>

      </div>
    </footer>
  );
}
