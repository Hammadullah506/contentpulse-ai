'use client';

import React, { useState } from 'react';
import { X, Key, Check } from 'lucide-react';

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
    }, 600);
  };

  const handleClear = () => {
    setKey('');
    setProvider('auto');
    onSave('', 'auto');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl bg-zinc-950 border border-zinc-850 p-6 text-zinc-100 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-850">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-zinc-400" />
            <h3 className="text-sm font-semibold text-white">
              Model & API Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-zinc-500 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4">
          
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Provider
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setProvider('deepseek')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium border text-center transition-colors cursor-pointer ${
                  provider === 'deepseek'
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                DeepSeek
              </button>
              <button
                type="button"
                onClick={() => setProvider('openai')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium border text-center transition-colors cursor-pointer ${
                  provider === 'openai'
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                OpenAI
              </button>
              <button
                type="button"
                onClick={() => setProvider('auto')}
                className={`py-1.5 px-2 rounded-md text-xs font-medium border text-center transition-colors cursor-pointer ${
                  provider === 'auto'
                    ? 'bg-zinc-800 border-zinc-600 text-white'
                    : 'bg-black border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                Smart Auto
              </button>
            </div>
          </div>

          {/* API Key Input */}
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              API Key
            </label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-3 py-2 rounded-md bg-black border border-zinc-800 text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 font-mono transition-colors"
            />
            <p className="text-[11px] text-zinc-500 mt-1">
              Keys are stored locally in your browser. Leave blank to use server defaults.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            {key ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Clear key
              </button>
            ) : <span />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-3.5 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {showSavedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-black" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
