'use client';

import React, { useState } from 'react';
import { X, Key, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string, provider: 'deepseek' | 'openai' | 'auto') => void;
  currentKey: string;
  currentProvider: 'deepseek' | 'openai' | 'auto';
}

export function ApiKeyModal({
  isOpen,
  onClose,
  onSave,
  currentKey,
  currentProvider,
}: ApiKeyModalProps) {
  const [key, setKey] = useState(currentKey);
  const [provider, setProvider] = useState<'deepseek' | 'openai' | 'auto'>(currentProvider);
  const [showSavedFeedback, setShowSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(key.trim(), provider);
    setShowSavedFeedback(true);
    setTimeout(() => {
      setShowSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setKey('');
    setProvider('auto');
    onSave('', 'auto');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-glow border border-violet-500/30 p-6 sm:p-7 text-slate-100 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-[family-name:var(--font-outfit)]">
                AI Engine Configuration
              </h3>
              <p className="text-xs text-slate-400">
                Optional: Connect your own DeepSeek V3 or OpenAI API Key
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

        {/* Content */}
        <div className="mt-5 space-y-4">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select AI Engine
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setProvider('deepseek')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  provider === 'deepseek'
                    ? 'bg-violet-600/30 border-violet-500 text-violet-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                DeepSeek V3
              </button>
              <button
                type="button"
                onClick={() => setProvider('openai')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  provider === 'openai'
                    ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                OpenAI (GPT-4o)
              </button>
              <button
                type="button"
                onClick={() => setProvider('auto')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  provider === 'auto'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Built-in Smart Engine
              </button>
            </div>
          </div>

          {/* Key Input */}
          {provider !== 'auto' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {provider === 'deepseek' ? 'DeepSeek API Key' : 'OpenAI API Key'}
              </label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder={provider === 'deepseek' ? 'sk-...' : 'sk-proj-...'}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
              <p className="mt-1.5 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                Keys are stored locally in your browser and sent securely via Next.js server handlers.
              </p>
            </div>
          )}

          {provider === 'auto' && (
            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-300/90 leading-relaxed flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-200">Zero Setup Mode: </span>
                Our deterministic technical repurposing engine is ready to convert your articles instantly without requiring any external billing or API keys!
              </div>
            </div>
          )}

          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>You can switch between modes at any time.</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
          >
            Clear / Reset Default
          </button>
          
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800/80 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-600/30 transition-all cursor-pointer"
            >
              {showSavedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Settings</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
