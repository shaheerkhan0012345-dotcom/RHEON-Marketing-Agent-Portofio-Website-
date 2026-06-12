import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Check } from 'lucide-react';

export default function PromoBadge() {
  const [activated, setActivated] = useState(false);

  const handleToggle = () => {
    setActivated(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center relative z-25">
      <motion.button
        type="button"
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleToggle}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-xs select-none transition-all cursor-pointer ${
          activated 
            ? 'bg-neutral-900 border-neutral-900 text-white' 
            : 'bg-white hover:bg-neutral-50 border-neutral-250 text-neutral-800'
        }`}
        id="interactive-promo-pill"
      >
        <span className="flex items-center gap-1">
          {activated ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          ) : (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}
          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold ${
            activated ? 'bg-amber-300 text-neutral-900' : 'bg-neutral-100 text-neutral-700'
          }`}>
            Discount 30%
          </span>
        </span>
        <span className="font-display font-medium text-[11px] flex items-center gap-1 text-xs tracking-tight">
          {activated ? 'Promo "ACTIVE30" Applied' : 'For newly joined customers'} 
          <ArrowRight className={`w-3.5 h-3.5 transition-transform ${activated ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
        </span>
      </motion.button>

      {/* Activated Prompt Reveal */}
      <AnimatePresence>
        {activated && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 4, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute top-full mt-2.5 bg-neutral-900 text-white border border-neutral-850 px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2 text-xxs z-30 w-[290px] sm:w-auto max-w-[90vw]"
            id="coupon-active-reveal"
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span><strong>30% Promo Activated!</strong> Savings was automatically added to the Custom Proposal Builder.</span>
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
