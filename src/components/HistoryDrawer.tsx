'use client';

import React, { useState } from 'react';
import { SavedCampaign } from '@/types';
import { X, History, Trash2, Search, FileText, Clock, ArrowUpRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: SavedCampaign[];
  onSelectCampaign: (campaign: SavedCampaign) => void;
  onDeleteCampaign: (id: string) => void;
  onClearAll: () => void;
}

export function HistoryDrawer({
  isOpen,
  onClose,
  campaigns,
  onSelectCampaign,
  onDeleteCampaign,
  onClearAll,
}: HistoryDrawerProps) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filtered = campaigns.filter((c) =>
    c.sourceTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-850 text-zinc-100 p-6 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-zinc-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Campaign History
                </h3>
                <p className="text-xs text-zinc-500">
                  {campaigns.length} saved session{campaigns.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="pt-3 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history..."
                className="w-full pl-8 pr-3 py-1.5 rounded-md bg-black border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          {/* Scrollable Campaign Cards */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-2 pr-1">
            {filtered.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center text-center text-zinc-500 text-xs">
                <FileText className="w-6 h-6 text-zinc-700 mb-2" />
                <span>No saved campaigns found.</span>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-black border border-zinc-850 hover:border-zinc-700 transition-colors space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {item.sourceTitle}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCampaign(item.id);
                      }}
                      className="p-1 text-zinc-600 hover:text-red-400 rounded transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <button
                      onClick={() => {
                        onSelectCampaign(item);
                        onClose();
                      }}
                      className="flex items-center gap-1 text-xs font-medium text-white hover:underline cursor-pointer"
                    >
                      <span>Load</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {campaigns.length > 0 && (
            <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-xs">
              <button
                onClick={onClearAll}
                className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                Clear all history
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
