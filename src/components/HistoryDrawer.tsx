'use client';

import React, { useState } from 'react';
import { SavedCampaign } from '@/types';
import { X, History, Trash2, ArrowUpRight, Search, FileText, Clock } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel-glow border-l border-violet-500/30 text-slate-100 p-6 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400">
                <History className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-[family-name:var(--font-outfit)]">
                  Campaign History
                </h3>
                <p className="text-xs text-slate-400">
                  {campaigns.length} saved repurposing session{campaigns.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="pt-4 pb-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search past campaigns..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Scrollable Campaign Cards */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-3 pr-1">
            {filtered.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500 text-xs">
                <FileText className="w-8 h-8 text-slate-700 mb-2" />
                <span>No saved campaigns found.</span>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/30 transition-all space-y-2 group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-white group-hover:text-violet-300 line-clamp-2 leading-snug">
                      {item.sourceTitle}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCampaign(item.id);
                      }}
                      className="p-1 text-slate-500 hover:text-rose-400 rounded transition-colors"
                      title="Delete this campaign"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {new Date(item.timestamp).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-slate-500">{item.wordCount} words</span>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        onSelectCampaign(item);
                        onClose();
                      }}
                      className="w-full py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-violet-600 hover:text-white text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <span>Restore Results</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Clear All */}
          {campaigns.length > 0 && (
            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <button
                onClick={onClearAll}
                className="text-rose-400/80 hover:text-rose-400 transition-colors"
              >
                Clear All History
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
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
