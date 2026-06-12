import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface WorkSectionProps {
  onOpenProposal: () => void;
}

export default function WorkSection({ onOpenProposal }: WorkSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const works = [
    {
      title: 'IUNIK',
      tags: ['Marketing'],
      img: '/src/assets/images/portfolio_iunik_1781262529259.jpg'
    },
    {
      title: 'Water Bank',
      tags: ['PPC', 'SEO'],
      img: '/src/assets/images/portfolio_waterbank_1781262548192.jpg'
    },
    {
      title: 'One Two Free',
      tags: ['Social Media'],
      img: '/src/assets/images/portfolio_onetwofree_1781262562331.jpg'
    },
    {
      title: 'Heartleaf 88',
      tags: ['Marketing'],
      img: '/src/assets/images/portfolio_heartleaf_1781262581898.jpg'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading masked-word reveal
      gsap.fromTo(".work-title-word",
        { y: "110%", rotate: 0.5 },
        {
          y: "0%",
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#work-main-title",
            start: "top 85%",
          }
        }
      );

      // 2. Explore More button entry
      gsap.fromTo("#work-explore-more-btn",
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#work-header-row",
            start: "top 85%",
          }
        }
      );

      // 3. Staggered slide/mask-reveal clip-paths for each portfolio card
      const cards = gsap.utils.toArray<HTMLElement>(".work-portfolio-card");
      cards.forEach((card) => {
        const imageBox = card.querySelector(".work-image-box");
        const metaRow = card.querySelector(".work-meta-row");

        if (imageBox) {
          gsap.fromTo(imageBox,
            { clipPath: "inset(0% 100% 0% 0%)", scale: 1.05 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              scale: 1,
              duration: 1.4,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        if (metaRow) {
          gsap.fromTo(metaRow,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Responsive 3-dimensional mouse hover rotation logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector('.work-image-wrapper') as HTMLDivElement;
    if (!card) return;
    
    // Bypass interaction on tactile displays/scrolling
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    
    const tiltX = -5.5 * normalizedY;
    const tiltY = 5.5 * normalizedX;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.018,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto"
    });

    const img = card.querySelector('img') as HTMLImageElement;
    if (img) {
      gsap.to(img, {
        x: -4 * normalizedX,
        y: -4 * normalizedY,
        scale: 1.035,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.querySelector('.work-image-wrapper') as HTMLDivElement;
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto"
    });

    const img = card.querySelector('img') as HTMLImageElement;
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 z-10 overflow-hidden sm:overflow-visible" 
      id="work-portfolio-section"
    >
      {/* Top Header Label */}
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 block font-sans mb-3 select-none" id="work-top-tag">
        OUR WORK
      </span>

      {/* Top Header Content Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-neutral-150 pt-8 mb-12" id="work-header-row">
        <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-none overflow-hidden pb-1" id="work-main-title">
          <span className="inline-block work-title-word">Our latest work</span>
        </h2>
        <button
          id="work-explore-more-btn"
          onClick={onOpenProposal}
          className="px-5 py-2 border border-neutral-900 hover:border-neutral-950 text-neutral-800 hover:text-neutral-950 font-semibold font-sans text-xs tracking-tight rounded-full hover:bg-neutral-50 transition-colors cursor-pointer select-none self-start sm:self-auto"
        >
          Explore More
        </button>
      </div>

      {/* 2x2 Clean Portfolio Grid with beautiful viewport staggering using CSS + ScrollTrigger */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16" 
        id="portfolio-items-grid"
      >
        {works.map((item, idx) => (
          <div
            key={idx}
            onClick={onOpenProposal}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="work-portfolio-card group flex flex-col space-y-4 cursor-pointer select-none"
            id={`portfolio-card-${idx}`}
          >
            {/* Elegant Image container with responsive 3D perspective wrapper */}
            <div className="block overflow-visible" style={{ perspective: 1200 }}>
              <div className="work-image-box work-image-wrapper w-full relative overflow-hidden rounded-2xl border border-neutral-200/50 bg-neutral-50/50 aspect-square flex items-center justify-center shadow-xs transition-shadow duration-300 group-hover:shadow-lg transform-gpu select-none">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Micro-interactive badge revealing inside on card hover */}
                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-[10px] font-mono font-bold tracking-tight text-neutral-900 py-1.5 px-3 rounded-full border border-neutral-150 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 select-none flex items-center gap-1 shadow-sm">
                  View Story
                  <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-neutral-950 transition-colors" />
                </span>

                {/* Subtle glass hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Title & Tag list row underneath - Animated concurrently on ScrollTrigger */}
            <div className="work-meta-row flex items-center justify-between px-1" id={`portfolio-meta-${idx}`}>
              <span className="font-display font-medium text-lg sm:text-xl text-neutral-900 group-hover:text-neutral-950 transition-colors">
                {item.title}
              </span>
              <div className="flex items-center gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3.5 py-1 border border-neutral-250 text-neutral-600 bg-neutral-50/85 font-sans text-[10px] sm:text-xxs font-semibold rounded-full group-hover:bg-neutral-950 group-hover:text-white group-hover:border-neutral-950 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
