'use client';

import React, { useState } from 'react';
import { X, Rss, Globe, RefreshCw, Zap, ArrowRight, Calendar, ExternalLink } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl glass-panel-glow border border-violet-500/30 p-6 sm:p-7 text-slate-100 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-outfit)]">
                WordPress Blog Auto-Sync
              </h3>
              <p className="text-xs text-slate-400">
                Connect your WordPress or RSS feed to repurpose your published articles in 1 click
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="pt-4 pb-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Blog Website or Feed URL
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Globe className="w-4 h-4" />
              </div>
              <input
                type="url"
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                placeholder="https://blog.malikhammaddigital.com"
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500"
              />
            </div>
            <button
              onClick={handleFetchFeed}
              disabled={isLoading || !blogUrl}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-semibold disabled:opacity-50 flex items-center gap-2 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading Feed...</span>
                </>
              ) : (
                <>
                  <Rss className="w-3.5 h-3.5" />
                  <span>Fetch Articles</span>
                </>
              )}
            </button>
          </div>

          {/* Quick preset link */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Quick:</span>
            <button
              type="button"
              onClick={() => {
                setBlogUrl('https://blog.malikhammaddigital.com');
              }}
              className="text-violet-400 hover:underline cursor-pointer"
            >
              Malik Hammad Digital Blog
            </button>
          </div>

          {error && (
            <p className="text-xs text-rose-400 bg-rose-950/30 p-2 rounded-xl border border-rose-900/40">
              {error}
            </p>
          )}
        </div>

        {/* Posts Scrollable List */}
        <div className="flex-1 overflow-y-auto mt-3 pr-1 space-y-3 min-h-[220px]">
          {posts.length === 0 && !isLoading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500">
              <Rss className="w-10 h-10 text-slate-700 mb-2" />
              <p className="text-sm font-medium">Click &ldquo;Fetch Articles&rdquo; to load your recent blog posts.</p>
              <p className="text-xs text-slate-600 mt-1">Works with any WordPress site with RSS enabled.</p>
            </div>
          )}

          {posts.map((post, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                  {post.pubDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {post.pubDate}
                    </span>
                  )}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 inline-flex items-center gap-0.5 text-slate-500"
                  >
                    <span>View original</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                  {post.title}
                </h4>

                {post.excerpt && (
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <button
                onClick={() => {
                  onSelectArticle(post);
                  onClose();
                }}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md shadow-violet-600/20 transition-all cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                <span>Repurpose Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
