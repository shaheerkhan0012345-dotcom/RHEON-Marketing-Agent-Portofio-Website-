import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Search, Menu, X, ArrowRight, Sparkles, BookOpen, Target, Shield, Landmark, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onOpenProposal: () => void;
  onOpenContact: () => void;
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenProposal, onOpenContact, onOpenSearch }: NavbarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Services',
      dropdown: [
        { title: 'Search Engine Optimization', desc: 'Sustain domain authority with organic audits.', icon: Target },
        { title: 'Paid PPC Management', desc: 'Conversion-ready targeting for commercial search query clicks.', icon: Sparkles },
        { title: 'Content Distribution Pipelines', desc: 'Craft industry-oriented copy to establish rank.', icon: BookOpen }
      ]
    },
    {
      label: 'About',
      dropdown: [
        { title: 'Our Methodology', desc: 'Review how we deliver sustainable search metrics.', icon: Shield },
        { title: 'RHEON Ethos', desc: 'Learn about our dedication to organic white-hat practices.', icon: Landmark }
      ]
    },
    {
      label: 'Learn',
      dropdown: [
        { title: 'SEO Case Studies', desc: 'Real-time search engine optimization data and growth metrics.', icon: Target },
        { title: 'Content Strategy Handbook', desc: 'Free guides on building domain authority.', icon: BookOpen }
      ]
    },
    {
      label: 'Work',
      dropdown: [
        { title: 'Portfolio Showcase', desc: 'Examine design iterations and result metrics across SaaS.', icon: Sparkles }
      ]
    },
    { label: 'Career', link: '#career' },
    { label: 'Contact', action: onOpenContact }
  ];

  return (
    <header className="sticky top-0 bg-white/80  backdrop-blur-md border-b border-gray-100/60  z-40 w-full transition-colors duration-300" id="rheon-site-header">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2.5 group" id="rheon-logo-anchor">
            {/* Modular Digital Matrix Mosaic Logo */}
            <div className="grid grid-cols-3 gap-1 w-6 h-6 shrink-0 relative">
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-950  transition-transform group-hover:scale-120 group-hover:bg-indigo-500 duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-400  group-hover:bg-neutral-950  duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-950  transition-transform group-hover:scale-120 duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-400  group-hover:bg-indigo-500 duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-950 " />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-400  group-hover:bg-neutral-950  duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-950  transition-transform group-hover:scale-120 duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-400  group-hover:bg-indigo-500 duration-150" />
              <span className="w-1.5 h-1.5 rounded-xs bg-neutral-900  duration-150" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-widest text-neutral-900  group-hover:text-neutral-950 ">
              RHEON
            </span>
          </a>
        </div>

        {/* Middle Side: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" id="desktop-nav-bar">
          {navItems.map((item, index) => {
            const hasDropdown = !!item.dropdown;
            return (
              <div
                key={index}
                className="relative cursor-pointer"
                onMouseEnter={() => hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs font-semibold text-neutral-500  hover:text-neutral-900  transition-colors py-2 px-1 focus:outline-hidden"
                    id={`nav-drop-btn-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180 text-neutral-900 ' : 'text-neutral-400 '}`} />
                  </button>
                ) : item.action ? (
                  <button
                    onClick={item.action}
                    className="text-xs font-semibold text-neutral-500  hover:text-neutral-900  transition-colors py-2 px-1"
                    id={`nav-action-btn-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.link}
                    className="text-xs font-semibold text-neutral-500  hover:text-neutral-900  transition-colors py-2 px-1 block"
                    id={`nav-link-btn-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                )}

                {/* Dropdown Menu Portal */}
                <AnimatePresence>
                  {hasDropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 2, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white  border border-gray-100/80  rounded-xl shadow-xl p-3 z-50 grid gap-1.5"
                    >
                      {item.dropdown?.map((sub, sIdx) => {
                        const SubIcon = sub.icon;
                        return (
                          <div
                            key={sIdx}
                            onClick={() => {
                              onOpenProposal();
                              setActiveDropdown(null);
                            }}
                            className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-neutral-50  transition-colors cursor-pointer select-none group/item"
                          >
                            <div className="p-1.5 bg-neutral-50  rounded-md text-neutral-500  group-hover/item:bg-neutral-900 group-hover/item:text-white   transition-colors duration-150 shrink-0">
                              <SubIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-xs font-bold text-neutral-800  leading-none mb-1 group-hover/item:text-neutral-950 ">
                                {sub.title}
                              </span>
                              <span className="block text-[10px] text-neutral-400  leading-snug line-clamp-2">
                                {sub.desc}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right Side: Navigation Search, Dark Mode Toggle & "Let's Talk" CTA */}
        <div className="hidden lg:flex items-center gap-4" id="desktop-actions-bar">
          <button
            onClick={onOpenSearch}
            className="text-neutral-500  hover:text-neutral-900  transition-colors p-2 hover:bg-neutral-50  rounded-full"
            aria-label="Search"
            id="nav-search-trigger"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenContact}
            className="border border-neutral-250  hover:border-neutral-900  px-[18px] py-[9px] rounded-full text-xs font-bold font-display tracking-tight text-neutral-800  hover:text-neutral-950  hover:bg-neutral-50  cursor-pointer select-none"
            id="lets-talk-cta"
          >
            Let's Talk
          </motion.button>
        </div>

        {/* Mobile View Toggle Triggers */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onOpenSearch}
            className="text-neutral-500  p-2 hover:bg-neutral-50  rounded-full"
            id="mobile-search-trigger"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-neutral-800  p-2 hover:bg-neutral-50  rounded-full"
            id="mobile-menu-hamburger"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Screen Mobile Drawer Portal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden"
              id="mobile-nav-backdrop"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white  shadow-2xl z-50 p-6 flex flex-col justify-between lg:hidden border-l border-neutral-100  transition-colors duration-300"
              id="mobile-nav-drawer"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-display font-black text-lg tracking-widest text-neutral-950 ">RHEON</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-neutral-50  rounded-full text-neutral-400 hover:text-neutral-700 "
                    id="mobile-drawer-close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {navItems.map((item, idx) => (
                    <div key={idx} className="border-b border-neutral-50  pb-2.5">
                      {item.dropdown ? (
                        <div>
                          <span className="block text-[11px] font-bold text-neutral-400  uppercase tracking-widest mb-1">{item.label}</span>
                          <div className="pl-2 space-y-2 mt-1.5">
                            {item.dropdown.map((sub, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => {
                                  onOpenProposal();
                                  setMobileMenuOpen(false);
                                }}
                                className="block text-xs font-semibold text-neutral-700  hover:text-neutral-950  text-left select-none"
                              >
                                {sub.title}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : item.action ? (
                        <button
                          onClick={() => {
                            item.action?.();
                            setMobileMenuOpen(false);
                          }}
                          className="block text-sm font-semibold text-neutral-800  hover:text-neutral-950  py-1"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          href={item.link}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm font-semibold text-neutral-800  hover:text-neutral-950  py-1"
                        >
                          {item.label}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer CTA CTA Buttons */}
              <div className="space-y-3 pt-6 border-t border-neutral-100 ">
                <button
                  onClick={() => {
                    onOpenProposal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 bg-neutral-950  text-white  rounded-full text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-neutral-800 "
                  id="mobile-drawer-free-proposal-btn"
                >
                  Free Proposal <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onOpenContact();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 border border-neutral-200  text-neutral-850  rounded-full text-xs font-bold hover:bg-neutral-50 "
                  id="mobile-drawer-lets-talk-btn"
                >
                  Let's Talk
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
