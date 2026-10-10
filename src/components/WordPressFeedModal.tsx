'use client';

import React, { useState } from 'react';
import { X, Rss, Globe, RefreshCw, Calendar, ArrowRight } from 'lucide-react';
import { FeedPost } from '@/types';

interface WordPressFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (post: FeedPost) => void;
}

export function WordPressFeedModal({
  isOpen,
  onClose,
  onSelectArticle,
}: WordPressFeedModalProps) {
  const [blogUrl, setBlogUrl] = useState('https://blog.malikhammaddigital.com');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFetchFeed = async () => {
    if (!blogUrl) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: blogUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch WordPress feed');
      }

      setPosts(data.posts || []);
      if (data.posts.length === 0) {
        setError('No posts found in the feed.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to connect to blog feed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl max-h-[85vh] rounded-xl bg-zinc-950 border border-zinc-850 p-6 text-zinc-100 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
          <div className="flex items-center gap-2">
            <Rss className="w-4 h-4 text-zinc-400" />
            <div>
              <h3 className="text-sm font-semibold text-white">
                Blog RSS Sync
              </h3>
              <p className="text-xs text-zinc-500">
                Load articles directly from your blog RSS feed
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

        {/* Input Bar */}
        <div className="pt-3 pb-2 space-y-1.5">
          <label className="block text-xs font-mono uppercase text-zinc-400">
            Blog URL
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <input
                type="url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="https://blog.example.com"
                className="w-full pl-9 pr-3 py-1.5 rounded-md bg-black border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <button
              onClick={handleFetchFeed}
              disabled={isLoading || !blogUrl}
              className="px-3 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
                  <span>Syncing...</span>
                </>
              ) : (
                <span>Fetch Articles</span>
              )}
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-950/20 p-2 rounded border border-red-900/30">
              {error}
            </p>
          )}
        </div>

        {/* Post Results List */}
        <div className="flex-1 overflow-y-auto mt-2 space-y-2 pr-1">
          {posts.length === 0 && !isLoading && !error && (
            <div className="h-32 flex flex-col items-center justify-center text-center text-zinc-500 text-xs">
              <span>Click &quot;Fetch Articles&quot; to load your recent posts.</span>
            </div>
          )}

          {posts.map((post, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-black border border-zinc-850 hover:border-zinc-700 transition-colors flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-medium text-white truncate">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.pubDate ? new Date(post.pubDate).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    }) : 'Recent'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectArticle(post);
                  onClose();
                }}
                className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 hover:text-white text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                <span>Import</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
