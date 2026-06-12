import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, FileText, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProposal: () => void;
  onOpenContact: () => void;
}

export default function SearchModal({ isOpen, onClose, onOpenProposal, onOpenContact }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const searchIndex = [
    {
      title: 'SEO Audit Checklist',
      category: 'Learn',
      description: 'Step-by-step keyword research and core web vitals optimization guide for higher search reach.',
      actionLabel: 'Trigger Free Proposal',
      action: onOpenProposal,
    },
    {
      title: 'Digital Marketing Services Explained',
      category: 'Services',
      description: 'Review our organic ranking, content distribution pipelines, and social campaign templates.',
      actionLabel: 'Browse Inquiries',
      action: onOpenContact,
    },
    {
      title: 'PPC Management Strategy',
      category: 'Work',
      description: 'How we structure paid campaigns for 3x relative conversions on high-commercial keywords.',
      actionLabel: 'Plan Campaign',
      action: onOpenProposal,
    },
    {
      title: 'Brand Growth & Authority Boost',
      category: 'About',
      description: 'Establishing your company as a reliable thought leader with targeted white-hat references.',
      actionLabel: 'Contact Team',
      action: onOpenContact,
    },
  ];

  const filteredResults = query
    ? searchIndex.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : searchIndex;

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            id="search-backdrop"
          />

          {/* Search Card Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="relative w-full max-w-xl bg-white border border-gray-100 rounded-xl shadow-2xl z-10 overflow-hidden"
            id="search-card"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, tutorials, or proposal options..."
                className="w-full text-sm font-medium focus:outline-hidden text-neutral-800 placeholder-neutral-400"
                id="search-box-input"
              />
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-600 transition-colors p-1 rounded-md hover:bg-neutral-50"
                id="close-search-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Listings */}
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
                <span>{query ? 'Matched results' : 'Quick resources'}</span>
                <span>{filteredResults.length} items found</span>
              </div>

              {filteredResults.length > 0 ? (
                <div className="space-y-2">
                  {filteredResults.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-3 rounded-lg border border-neutral-100 hover:border-neutral-200 bg-white transition-all flex items-start gap-3"
                      id={`search-result-${idx}`}
                    >
                      <div className="p-2 bg-neutral-50 rounded-lg group-hover:bg-neutral-100 transition-colors text-neutral-500">
                        {item.category === 'Learn' ? (
                          <FileText className="w-4 h-4 text-emerald-500" />
                        ) : item.category === 'Services' ? (
                          <Sparkles className="w-4 h-4 text-amber-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-indigo-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-800 group-hover:text-neutral-950">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-neutral-100 text-neutral-500 uppercase tracking-wider">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xxs text-neutral-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="mt-2 text-right">
                          <button
                            onClick={() => {
                              item.action();
                              handleClose();
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-900 hover:underline cursor-pointer"
                          >
                            {item.actionLabel} &rarr;
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-400 flex flex-col items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-neutral-300 mb-2" />
                  <p className="text-xs font-semibold">No direct results found</p>
                  <p className="text-xxs text-neutral-500 mt-0.5">Try searching for "SEO", "Budget", or "Brand".</p>
                </div>
              )}
            </div>

            {/* Quick guide hints footer */}
            <div className="bg-neutral-50 border-t border-gray-100 p-3 flex items-center justify-between text-[10px] text-neutral-400">
              <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded-sm">ESC</kbd> to close</span>
              <span>Need help? <button onClick={() => { onOpenContact(); handleClose(); }} className="text-neutral-600 font-semibold hover:underline">Chat with support</button></span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
