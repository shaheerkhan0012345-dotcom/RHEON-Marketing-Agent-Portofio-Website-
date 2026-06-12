import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CallToActionSectionProps {
  onOpenProposal: () => void;
}

export default function CallToActionSection({ onOpenProposal }: CallToActionSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Words list for high-precision text masking reveal effect matching the Korsa design format
  const titleText = "Grow Your Client Base With Data-Driven and Targeted Strategies";
  const words = titleText.split(" ");

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      // 1. Staggered slide reveal for heading words with organic slight tilt (Oasis aesthetic)
      gsap.fromTo(".cta-animated-word",
        {
          y: "115%",
          rotate: 3.5,
          skewY: 1.5,
          opacity: 0,
        },
        {
          y: "0%",
          rotate: 0,
          skewY: 0,
          opacity: 1,
          stagger: 0.025,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=12%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Majestic card physical viewport zoom visual parallax
      gsap.fromTo(card,
        {
          scale: 0.95,
          opacity: 0.9
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top center",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  // Premium 3D tilt mouse cursor tracker
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Skip on touch/mobile displays
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage from center (-0.5 to 0.5)
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    // Rotate card slightly with organic ease (max 8 degrees tilt)
    gsap.to(card, {
      rotateY: px * 10,
      rotateX: -py * 10,
      transformPerspective: 1200,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Subtly parallax shift the central title in opposite/coinciding 3D direction
    gsap.to("#cta-growth-title", {
      x: px * 15,
      y: py * 15,
      z: 30,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Shift button container as well
    gsap.to("#cta-button-container", {
      x: px * 8,
      y: py * 8,
      z: 15,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Update custom ambient spot coordinates
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        left: x,
        top: y,
        opacity: 0.12,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    gsap.to("#cta-growth-title, #cta-button-container", {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });

    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "power3.out"
      });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 lg:py-16 z-10" 
      id="cta-growth-section"
    >
      {/* 
        Beautifully scaled, clean card with rounded layout 
        Matches the soft-toned light palette of the screenshot with active scroll scaling
      */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full bg-[#f4f6f9] rounded-3xl border border-neutral-150/40 p-6 sm:p-12 md:p-20 lg:p-24 flex flex-col items-center justify-center text-center space-y-6 sm:space-y-10 shadow-xs overflow-hidden relative transform-gpu hover:shadow-xl transition-shadow duration-500"
        style={{ transformStyle: 'preserve-3d' }}
        id="cta-growth-card"
      >
        {/* Dynamic Spotlight Glow Element inside the Card */}
        <div 
          ref={spotlightRef}
          className="absolute rounded-full bg-emerald-500 blur-[80px] pointer-events-none opacity-0 select-none w-[350px] h-[350px] -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ transition: 'opacity 0.3s ease' }}
        />

        {/* Symmetrical centered headline with precise split-word mask rendering */}
        <h2 
          className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-[-0.025em] leading-[1.12] max-w-4xl mx-auto flex flex-wrap justify-center relative z-10 select-none"
          id="cta-growth-title"
          style={{ transform: "translateZ(30px)", transformStyle: 'preserve-3d' }}
        >
          {words.map((word, idx) => (
            <span 
              key={`${word}-${idx}`} 
              className="inline-block overflow-hidden mr-[0.25em] pb-1.5"
            >
              <span className="inline-block cta-animated-word transform-gpu origin-bottom-left">
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Clean Pill Button trigger with ultra-premium rolling text transition from the video */}
        <div 
          className="pt-2 relative z-10" 
          id="cta-button-container"
          style={{ transform: "translateZ(15px)" }}
        >
          <button
            onClick={onOpenProposal}
            className="group px-8 py-3.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-950 text-white font-sans font-semibold rounded-full text-xs sm:text-sm shadow-md transition-all duration-300 cursor-pointer inline-flex items-center justify-center select-none relative overflow-hidden"
            id="cta-get-started-btn"
          >
            {/* Expanding active-color canvas background on hover */}
            <span className="absolute inset-0 bg-emerald-500 scale-0 origin-center transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 rounded-full z-0" />
            
            {/* Rolling Text loop container */}
            <div className="relative z-10 h-5 overflow-hidden" id="cta-button-rolling-text-box">
              <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2 flex flex-col items-center">
                <span className="h-5 flex items-center justify-center text-white select-none whitespace-nowrap tracking-wide font-sans font-semibold">
                  Get Started
                </span>
                <span className="h-5 flex items-center justify-center text-neutral-950 select-none whitespace-nowrap tracking-wide font-sans font-semibold">
                  Let's Begin
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
