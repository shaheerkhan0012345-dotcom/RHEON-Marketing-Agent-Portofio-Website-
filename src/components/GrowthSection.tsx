import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Activity, Users, Zap, MousePointerClick } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface GrowthSectionProps {
  onOpenProposal: () => void;
}

interface RollingNumberProps {
  value: string;
}

// Highly stylized and robust Rolling Number digit slot/odometer component
function RollingNumber({ value }: RollingNumberProps) {
  const chars = value.split("");

  return (
    <span className="inline-flex items-baseline tracking-tight font-display font-extrabold text-neutral-950  select-none">
      {chars.map((char, idx) => {
        const isDigit = /\d/.test(char);
        if (!isDigit) {
          return (
            <span key={idx} className="font-display font-extrabold text-neutral-950 ">
              {char}
            </span>
          );
        }

        const digit = parseInt(char, 10);
        return (
          <span
            key={idx}
            className="inline-block overflow-hidden relative"
            style={{
              height: "1.15em",
              width: "0.62em",
              verticalAlign: "baseline",
            }}
          >
            <motion.span
              initial={{ y: "0%" }}
              whileInView={{ y: `-${digit * 10}%` }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{
                duration: 2.2,
                ease: [0.16, 1, 0.3, 1],
                delay: idx * 0.08,
              }}
              className="absolute left-0 right-0 top-0 flex flex-col"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <span
                  key={num}
                  className="leading-none flex items-center justify-center font-display text-2xl xs:text-3xl sm:text-4xl font-extrabold text-neutral-950 "
                  style={{ height: "1.15em" }}
                >
                  {num}
                </span>
              ))}
            </motion.span>
            {/* Height guide placeholder standardizing viewport dimension */}
            <span className="invisible select-none opacity-0 leading-none block" style={{ height: "1.15em" }}>
              0
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function GrowthSection({ onOpenProposal }: GrowthSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const localBlob1Ref = useRef<HTMLDivElement>(null);
  const localBlob2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text reveal: Clean slide-up line transition on scroll
      gsap.fromTo(".growth-title-word", 
        { y: "105%", rotate: 0.5 },
        {
          y: "0%",
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#growth-main-title",
            start: "top 85%",
          }
        }
      );

      // 2. Staggered reveal of description paragraphs
      gsap.fromTo(".growth-desc-para",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#growth-paragraphs",
            start: "top 85%",
          }
        }
      );

      // 3. Staggered reveal of stats cards
      gsap.fromTo(".growth-kpi-pill",
        { opacity: 0, scale: 0.92, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#growth-numbers-grid",
            start: "top 88%",
          }
        }
      );

      // 4. Image smooth viewport reveal with clipping path
      gsap.fromTo(".growth-main-img-box",
        { clipPath: "inset(0% 100% 0% 0%)", scale: 1.04 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ".growth-main-img-box",
            start: "top 82%",
          }
        }
      );

      // 5. Ambient backdrop bubble drift
      gsap.to(localBlob1Ref.current, {
        x: '+=20',
        y: '-=12',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(localBlob2Ref.current, {
        x: '-=12',
        y: '+=20',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // 6. Responsive structural parallax for floating indicators
      gsap.to(".growth-float-item-left", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
        y: -30,
        ease: "none"
      });

      gsap.to(".growth-float-item-right", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
        y: -12,
        ease: "none"
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Responsive 3D mouse rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = imageContainerRef.current;
    if (!card) return;
    
    // Disable on touch screens to prevent scrolling conflicts
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normalizedX = (x / rect.width) * 2 - 1;
    const normalizedY = (y / rect.height) * 2 - 1;
    
    const tiltX = -5 * normalizedY;
    const tiltY = 5 * normalizedX;
    
    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    const card = imageContainerRef.current;
    if (!card) return;
    
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto"
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 z-10 overflow-hidden sm:overflow-visible" 
      id="growth-section"
    >
      {/* Background radial blobs */}
      <div 
        ref={localBlob1Ref} 
        className="absolute top-[-5%] right-[-5%] w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] rounded-full bg-emerald-55  blur-[75px] sm:blur-[110px] pointer-events-none z-0" 
      />
      <div 
        ref={localBlob2Ref} 
        className="absolute bottom-[-5%] left-[-5%] w-[220px] sm:w-[350px] h-[220px] sm:h-[350px] rounded-full bg-amber-50/15  blur-[75px] sm:blur-[110px] pointer-events-none z-0" 
      />

      {/* Top Header Label */}
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 block font-sans mb-3 z-10 relative select-none" id="growth-top-tag">
        HOW DIGITAL MARKETING SERVICES
      </span>

      {/* Top Divider */}
      <div className="w-full border-t border-neutral-150  mb-12 z-10 relative" id="growth-top-divider" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 relative">
        
        {/* Left Column: Title, Copywriting paragraphs, and Live metrics counter row */}
        <div className="lg:col-span-5 space-y-8" id="growth-left-column">
          
          {/* Beautiful Title placed cleanly on one single line */}
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] text-neutral-950  tracking-tight sm:tracking-tighter leading-[1.1] select-none pb-1 overflow-hidden" id="growth-main-title">
            <span className="inline-block growth-title-word">Driving business growth.</span>
          </h2>

          <div className="space-y-6 text-sm sm:text-[15px] text-neutral-500  leading-relaxed font-normal" id="growth-paragraphs">
            <p className="growth-desc-para hover:text-neutral-700  transition-colors duration-300">
              Digital marketing services provide businesses of all sizes with an opportunity to market their brand 24/7 at a low cost. From startups to medium-sized enterprises, a premium, data-driven approach helps you expand your niche market reach.
            </p>
            <p className="growth-desc-para hover:text-neutral-700  transition-colors duration-300">
              Hiring an internet marketing agency is one of the best ways to reach your prospects while maintaining a robust connection with existing clients. As long as your business is backed by high-speed search layouts, your customers will find you first.
            </p>
          </div>

          {/* Stats Grid with dynamic count-ups - completely custom stylized and responsive */}
          <div className="grid grid-cols-3 gap-2 xs:gap-4 pt-4 border-t border-neutral-100 " id="growth-numbers-grid">
            <div className="space-y-1 growth-kpi-pill">
              <span className="block text-2xl xs:text-3xl sm:text-4xl font-extrabold text-neutral-950 ">
                <RollingNumber value="+285%" />
              </span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-400 block leading-tight font-bold">SEO Traf. Boost</span>
            </div>
            
            <div className="space-y-1 growth-kpi-pill">
              <span className="block text-2xl xs:text-3xl sm:text-4xl font-extrabold text-neutral-950 ">
                <RollingNumber value="+45k" />
              </span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-400 block leading-tight font-bold">Qualified Reach</span>
            </div>
            
            <div className="space-y-1 growth-kpi-pill">
              <span className="block text-2xl xs:text-3xl sm:text-4xl font-extrabold text-neutral-950 ">
                <RollingNumber value="+124%" />
              </span>
              <span className="text-[9px] uppercase font-mono tracking-wider text-neutral-400 block leading-tight font-bold">Conversion Rate</span>
            </div>
          </div>

          <div className="pt-2 z-10 relative" id="growth-cta-wrapper">
            <button
              onClick={onOpenProposal}
              className="px-6 py-3 border border-neutral-900  hover:border-neutral-950 text-neutral-800  hover:text-neutral-950  font-bold font-sans text-xs tracking-tight rounded-full hover:bg-neutral-50  transition-all shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-1.5 select-none"
              id="growth-learn-more-btn"
            >
              Analyze My Traffic
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            </button>
          </div>
        </div>

        {/* 
          Right Column: Natasha Belova Style Visual Frame using the ORIGINAL Graph Image
        */}
        <div className="lg:col-span-7 flex justify-center py-6 block overflow-visible select-none" id="growth-right-layout">
          <div className="relative w-full max-w-[540px] px-1 md:px-4 flex items-center justify-center overflow-visible" id="growth-dashboard-wrapper" style={{ perspective: 1200 }}>
            
            {/* Main Interactive 3D Card around the Original Image */}
            <div 
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={onOpenProposal}
              className="w-full relative shadow-2xl rounded-3xl bg-neutral-100  overflow-hidden border border-neutral-200/65  select-none transform-gpu transition-all duration-100 cursor-pointer aspect-[16/11] flex items-center justify-center growth-main-img-box"
              id="growth-image-card"
            >
              {/* Premium image representing user's original segment */}
              <img
                src="/src/assets/images/business_growth_graph_1781262259551.jpg"
                alt="Business growth analytical timeline graph mockup"
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
                id="growth-original-image"
              />

              {/* Glossy overlay with hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/15 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

              {/* Coordinates line at the bottom */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[8px] font-mono text-white/50 z-20 pointer-events-none">
                <span>INDEX_X_SCROLL: ENABLED</span>
                <span className="flex items-center gap-1">
                  <MousePointerClick className="w-2.5 h-2.5" />
                  HOVER TO TILT GRAPH
                </span>
                <span>STATE: GROWTH_LIVE</span>
              </div>
            </div>

            {/* 
              Parallax Floating Badge A (SEO traffic boost context overlay)
              Optimized for responsive resizing without horizontal layout breakages.
            */}
            <div 
              className="absolute left-[-15px] sm:left-[-35px] top-[18%] sm:top-[20%] z-20 growth-float-item-left bg-white/95  backdrop-blur-md rounded-2xl border border-neutral-100  shadow-xl p-3 sm:p-4 max-w-[125px] sm:max-w-[160px] pointer-events-none select-none scale-75 xs:scale-85 sm:scale-100 origin-right sm:origin-center transition-colors duration-300"
              id="growth-floating-card-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-emerald-50  border border-emerald-100/50  flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 " />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-neutral-400 font-bold block">SEO Campaign</span>
                  <span className="font-sans text-[11px] font-extrabold text-neutral-900  block leading-none">Organic Leads</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-display font-black text-lg sm:text-xl text-neutral-950  block">+285%</span>
                <span className="text-[8px] font-mono bg-emerald-50  text-emerald-600  px-1.5 rounded-sm w-fit leading-none py-0.5 font-bold block">EXCELLENT</span>
              </div>
            </div>

            {/* 
              Parallax Floating Badge B (Audience retention context overlay)
              Optimized for responsive resizing.
            */}
            <div 
              className="absolute right-[-10px] sm:right-[-25px] bottom-[12%] sm:bottom-[15%] z-20 growth-float-item-right bg-white/95  backdrop-blur-md rounded-2xl border border-neutral-100  shadow-xl p-3 sm:p-4 max-w-[115px] sm:max-w-[150px] pointer-events-none select-none scale-75 xs:scale-85 sm:scale-100 origin-left sm:origin-center transition-colors duration-300"
              id="growth-floating-card-right"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-lg bg-neutral-100  flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-neutral-800 " />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-mono text-neutral-400 font-bold block">Reach</span>
                  <span className="font-sans text-[11px] font-extrabold text-neutral-900  block leading-none">Qualified</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="font-display font-black text-lg sm:text-xl text-neutral-950  block">+45.2k</span>
                <span className="text-[8px] font-mono bg-amber-50  text-amber-700  px-1.5 rounded-sm w-fit leading-none py-0.5 font-bold block">ACTIVE USERS</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
