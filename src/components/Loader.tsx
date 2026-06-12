import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.2 seconds to allow animation to complete
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Logo container with scale animation */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center gap-6"
          >
            {/* Big Modular Digital Matrix Mosaic Logo */}
            <div className="grid grid-cols-3 gap-2 w-16 h-16 relative">
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-950" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-200" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-950" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-200" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-950" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-200" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-950" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-200" 
              />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.4 }}
                className="w-4 h-4 rounded-sm bg-neutral-900" 
              />

              {/* Glowing animated orb behind the logo to make it pop */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.5, scale: 1.5 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute inset-0 bg-indigo-500/20 rounded-full blur-[20px] -z-10"
              />
            </div>
            
            {/* RHEON Text Container */}
            <motion.div className="overflow-hidden">
              <motion.span 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-4xl tracking-[0.3em] text-neutral-900 block"
              >
                RHEON
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
