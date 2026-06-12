import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onOpenProposal: () => void;
}

export default function ServicesSection({ onOpenProposal }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  // Store the active scrolltrigger instance cleanly for arrow navigation clicks
  const triggerRef = useRef<any>(null);

  const services = [
    {
      id: "seo",
      title: "Search Engine Optimization (SEO)",
      description: "Through careful keyword research and white hat SEO practices.",
      bgColor: "bg-[#f1f5f9]", // Very soft pastel blue-gray
      borderHover: "hover:border-[#cbd5e1] hover:bg-[#ebf0f5]"
    },
    {
      id: "website",
      title: "Custom Website Design",
      description: "Capture your target audiences' attention with a professional custom web design.",
      bgColor: "bg-[#f0f5f1]", // Very soft pastel sage-mint
      borderHover: "hover:border-[#c2d6c6] hover:bg-[#e6eee7]"
    },
    {
      id: "development",
      title: "Web Design & Development",
      description: "Thrive builds custom, mobile-ready and search engine optimized websites.",
      bgColor: "bg-[#f5f5f6]", // Very soft cold neutral gray
      borderHover: "hover:border-[#d1d1d6] hover:bg-[#ececee]"
    },
    {
      id: "social",
      title: "Social Media Marketing",
      description: "Ready to expand and market to your audiences on social media?",
      bgColor: "bg-[#f6f5f5]", // Very soft blush-lavender tone
      borderHover: "hover:border-[#dcd5d5] hover:bg-[#eeebeb]"
    },
    {
      id: "ppc",
      title: "Pay Per Click (PPC) Management",
      description: "Reach your customers quickly and with precision with a data-driven PPC campaign.",
      bgColor: "bg-[#fdf3e7]", // Soft warm cream champagnepeach
      borderHover: "hover:border-[#f3d9be] hover:bg-[#f9ebd9]"
    },
    {
      id: "reputation",
      title: "Online Reputation Management",
      description: "Your reviews and online reputation can make or break your success online.",
      bgColor: "bg-[#faf9e5]", // Rich tender pastel yellow-chiffon
      borderHover: "hover:border-[#eae6bc] hover:bg-[#f5f3d4]"
    },
    {
      id: "content",
      title: "Content Strategy & Creation",
      description: "Engage your ideal prospects with authoritative articles, copy, and resources.",
      bgColor: "bg-[#ecfeff]", // Light cyan
      borderHover: "hover:border-[#a5f3fc] hover:bg-[#d6fbfd]"
    },
    {
      id: "email",
      title: "Email & Automation Marketing",
      description: "Nurture loyalty with clean, automated drip sequences designed to convert.",
      bgColor: "bg-[#fdf2f8]", // Light pink/rose
      borderHover: "hover:border-[#fbcfe8] hover:bg-[#fce7f3]"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Helper to compute correct horizontal slide length with safety fallbacks
      const getScrollLength = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        const scrollDistance = trackWidth - viewportWidth;
        // Perfect slide padding distance that lets us see every single card completely
        return Math.max(scrollDistance + 120, 200);
      };

      const getScrollDuration = () => {
        const trackWidth = track.scrollWidth;
        // The vertical scroll height required to complete the translation.
        // We want a slow, majestic, highly controlled scroll feel!
        // So we default to track.scrollWidth or 2400px.
        return Math.max(trackWidth, 2400);
      };

      // Direct high-performance tween bound directly to ScrollTrigger
      const scrollTween = gsap.to(track, {
        x: () => {
          return -getScrollLength();
        },
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1.1, // super buttery lag-follow for vertical mouse wheels
          start: "top top", // pin perfectly flush with window top
          end: () => `+=${getScrollDuration()}`, // locks scroll for exactly the duration of horizontal animation completion
          invalidateOnRefresh: true, // recalculates dynamic coordinates on screens resizing
          anticipatePin: 1,
        }
      });

      // Animate the custom micro-progress bar handle
      gsap.fromTo(".scroll-progress-indicator", 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: 1.1,
            start: "top top",
            end: () => `+=${getScrollDuration()}`,
            invalidateOnRefresh: true,
          }
        }
      );

      // Elegant Title slide-reveal clipping animation
      gsap.fromTo(".services-title-word",
        { y: "105%", rotate: 0.5 },
        {
          y: "0%",
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=10%",
            toggleActions: "play none none none"
          }
        }
      );

      // Subtle stagger lift on cards as the track enters the window viewport
      gsap.fromTo(".service-card-item",
        { opacity: 0.7, y: 30, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

    }, sectionRef);

    // Multi-phase delayed refreshes to guarantee calculations are complete in standard and iframe sandboxes
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const t3 = setTimeout(() => ScrollTrigger.refresh(), 1500);

    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      ctx.revert();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', handleLoad);
      triggerRef.current = null;
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-white z-10 py-16 md:py-24 min-h-[620px] md:min-h-screen flex flex-col justify-center overflow-hidden block" 
      id="services-grid-section"
    >
      {/* Dynamic ambient color nodes (Oasis aesthetic matching) */}
      <div className="absolute top-[20%] left-[-5%] w-[250px] h-[250px] rounded-full bg-emerald-50/15 blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-5%] w-[250px] h-[250px] rounded-full bg-amber-50/15 blur-[90px] pointer-events-none z-0" />

      {/* Header Container: Constrained to standard page width (1280px) and grid margins */}
      <div 
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 relative z-10"
        id="services-header-container"
      >
        {/* Top Header Label */}
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 block font-sans mb-3 select-none" id="services-top-tag">
          DIGITAL MARKETING SERVICES
        </span>

        {/* Top horizontal divider line */}
        <div className="w-full border-t border-neutral-150 mb-10 relative" id="services-top-divider" />

        {/* Dynamic Header Row */}
        <div className="mb-10 sm:mb-14 relative" id="services-header-row">
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-tight sm:leading-none overflow-hidden pb-1 select-none" id="services-main-title">
            <span className="inline-block services-title-word">Building brand recognition</span>
          </h2>
        </div>
      </div>

      {/* 
        Scrollable Viewport Wrapper:
        Takes full width (100%) so cards slide from very right edge of screen all the way to very left edge.
        Features left track padding to perfectly align the first card with the header text above (max-w-7xl)!
      */}
      <div 
        className="w-full overflow-hidden relative z-10"
        id="services-scroll-viewport"
      >
        <div 
          ref={scrollRef}
          className="w-full overflow-hidden scrollbar-none pb-2"
          id="services-scroll-container"
        >
          <div 
            ref={trackRef}
            className="flex flex-row gap-6 md:gap-8 px-6 sm:px-8 md:pl-[calc(max(24px,(100vw-1280px)/2+32px))] pr-[25vw] md:pr-[40vw] w-max"
            id="services-cards-track"
          >
            {services.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ 
                  y: -6, 
                  scale: 1.012,
                  boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.04), 0 8px 10px -6px rgb(0 0 0 / 0.04)'
                }}
                className={`service-card-item flex flex-col justify-between ${item.bgColor} border border-neutral-200/30 ${item.borderHover} p-8 sm:p-10 rounded-2xl w-[285px] xs:w-[320px] sm:w-[360px] shrink-0 snap-start transition-all duration-300 shadow-xs group cursor-pointer aspect-[1.12] min-h-[300px] select-none`}
                id={`service-card-${item.id}`}
                onClick={onOpenProposal}
              >
                {/* Upper details block */}
                <div className="space-y-4" id={`service-detail-${item.id}`}>
                  {/* Elegant Mono Number Tag */}
                  <span className="font-mono text-xs font-bold text-neutral-400 block tracking-wider select-none mb-1">
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="font-display font-medium text-lg sm:text-xl text-neutral-900 leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Lower dynamic underline helper and shift arrow */}
                <div className="pt-6 flex items-center justify-between" id={`service-action-${item.id}`}>
                  <span className="inline-flex items-center gap-1.5 text-xxs sm:text-xs font-bold text-neutral-950 border-b border-neutral-950 transition-all group-hover:text-neutral-700 group-hover:border-neutral-700 tracking-wide">
                    Learn More
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 
        Horizontal Scroll Progress Indicator:
        An elegant, thin custom progress bar centered underneath the horizontal slider track.
      */}
      <div className="w-full flex justify-center mt-8 sm:mt-12 relative z-10" id="services-progress-wrapper">
        <div className="w-36 sm:w-48 h-[2px] bg-neutral-100 rounded-full overflow-hidden relative">
          <div 
            className="scroll-progress-indicator absolute left-0 top-0 h-full w-full bg-neutral-950 origin-left scale-x-0"
            id="services-progress-indicator"
          />
        </div>
      </div>
    </section>
  );
}
