import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';

interface StrategistSectionProps {
  onOpenProposal: () => void;
  onOpenContact: () => void;
}

export default function StrategistSection({ onOpenProposal, onOpenContact }: StrategistSectionProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const counter2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = imageContainerRef.current;
    const image = imageRef.current;

    if (container && image) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        
        gsap.to(image, {
          duration: 0.4,
          rotateX,
          rotateY,
          transformPerspective: 1200,
          ease: "power2.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(image, {
          duration: 0.7,
          rotateX: 0,
          rotateY: 0,
          ease: "power2.out"
        });
      };

      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => {
    if (counterRef.current) {
      const obj1 = { val: 0 };
      gsap.to(obj1, {
        val: 50,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => {
          if (counterRef.current) counterRef.current.innerText = Math.round(obj1.val).toString();
        },
        scrollTrigger: {
          trigger: counterRef.current,
          start: "top 85%"
        }
      });
    }

    if (counter2Ref.current) {
      const obj2 = { val: 0 };
      gsap.to(obj2, {
        val: 500,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => {
          if (counter2Ref.current) counter2Ref.current.innerText = Math.round(obj2.val).toString();
        },
        scrollTrigger: {
          trigger: counter2Ref.current,
          start: "top 85%"
        }
      });
    }

    // Dynamic stats counters in cards
    const stats = gsap.utils.toArray('.gsap-stat-number') as HTMLElement[];
    stats.forEach(stat => {
      const targetStr = stat.getAttribute('data-target') || "0";
      const targetVal = parseFloat(targetStr.replace(/,/g, ''));
      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 2.5,
        ease: "power3.out",
        onUpdate: () => {
          stat.innerText = Math.round(obj.val).toLocaleString();
        },
        scrollTrigger: {
          trigger: stat,
          start: "top 90%"
        }
      });
    });
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 z-10 space-y-16" id="strategist-spotlight-section">
      {/* Structural top divider */}
      <div className="absolute top-0 left-6 right-6 border-t border-neutral-100 " />

      {/* PART A: GRID SECTION WITH CENTERED PERSON */}
      <div className="relative w-full rounded-2xl bg-neutral-50/60  border border-neutral-100  p-6 md:p-12 overflow-hidden flex flex-col items-center justify-center min-h-[460px]" id="strategist-bento-hero">
        
        {/* Background rounded squares mockup (matches bento pattern in screenshot) */}
        <div className="absolute inset-0 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 p-4 pointer-events-none select-none opacity-40">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className={`aspect-square rounded-xl border border-neutral-200/50  ${
                i % 7 === 0 ? 'bg-neutral-200/30 ' : i % 11 === 0 ? 'bg-neutral-100 ' : 'bg-transparent'
              }`} 
            />
          ))}
        </div>

        {/* Foreground Content: Beautiful clean photographic card spotlight holding tablet */}
        <div ref={imageContainerRef} className="relative flex flex-col items-center justify-center max-w-md w-full perspective-[1200px]" id="strategist-image-holder">
          <motion.div 
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200  bg-white  w-full aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center group cursor-pointer transform-gpu"
          >
            {/* Base Image */}
            <img
              src="/src/assets/images/strategist_avatar.jpg"
              alt="RHEON Digital Marketing Lead Advisor"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] select-none transition-opacity duration-500 ease-in-out group-hover:opacity-0"
              referrerPolicy="no-referrer"
            />
            {/* Hover Image */}
            <img
              src="/src/assets/images/strategist_avatar_hover.png"
              alt="RHEON Digital Marketing Lead Advisor Hover"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] select-none opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Floating Card: 50+ Projects */}
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -top-5 -right-5 z-20 bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center border border-neutral-100 min-w-[110px]"
          >
            <span className="text-3xl font-black text-neutral-900 font-display leading-none flex items-center">
              <span ref={counterRef}>0</span>
              <span>+</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 font-sans mt-1">
              Projects
            </span>
          </motion.div>

          {/* Floating Card: 500+ Personal Projects */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-5 -left-5 z-20 bg-white shadow-xl rounded-2xl p-4 flex flex-col items-center justify-center border border-neutral-100 min-w-[120px]"
          >
            <span className="text-3xl font-black text-neutral-900 font-display leading-none flex items-center">
              <span ref={counter2Ref}>0</span>
              <span>+</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 font-sans mt-1 text-center leading-tight">
              Personal<br/>Projects
            </span>
          </motion.div>
        </div>
      </div>

      {/* PART B: THREE COLUMNS METRIC SECTIONS (Precisely styled with staggered entrance and interactive spring hover states) */}
      <motion.div 
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1
            }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 perspective-[1200px]" 
        id="custom-analytical-results-grid"
      >
        
        {/* Card Column 1 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 35 },
            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
          }}
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }}
          onClick={onOpenProposal}
          className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-50/80 backdrop-blur-xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-3xl flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer select-none group" 
          id="stats-card-1"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-500 font-sans block">
              Conversion Rate Optimization (CRO)
            </span>
            <h3 className="font-display font-semibold text-xl text-neutral-900 leading-snug max-w-[210px] sm:max-w-none group-hover:text-indigo-950 transition-colors duration-300">
              Multiple Location Orthodontic Practice
            </h3>
          </div>

          <div className="border-t border-neutral-100 pt-6 mt-8 flex items-center justify-between relative z-10" id="card-1-metrics">
            <div className="space-y-1">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="226">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Top 5 Rankings
              </span>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="122">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Monthly Leads
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card Column 2 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 35 },
            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
          }}
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }}
          onClick={onOpenProposal}
          className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-50/80 backdrop-blur-xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-3xl flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer select-none group" 
          id="stats-card-2"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-500 font-sans block">
              SEO and Pay-Per-Click (PPC) Marketing
            </span>
            <h3 className="font-display font-semibold text-xl text-neutral-900 leading-snug group-hover:text-emerald-950 transition-colors duration-300">
              Business factors that support development
            </h3>
          </div>

          <div className="border-t border-neutral-100 pt-6 mt-8 flex items-center justify-between relative z-10" id="card-2-metrics">
            <div className="space-y-1">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="546">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Conversion Rate
              </span>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="1110">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Live Chat
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card Column 3 */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 35 },
            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } }
          }}
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(0, 0, 0, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }}
          onClick={onOpenProposal}
          className="relative overflow-hidden bg-gradient-to-br from-white to-neutral-50/80 backdrop-blur-xl border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-3xl flex flex-col justify-between min-h-[320px] transition-all duration-300 cursor-pointer select-none group" 
          id="stats-card-3"
        >
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-32 h-32 bg-amber-500/10 rounded-full blur-[40px] transition-opacity duration-700 opacity-0 group-hover:opacity-100 pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-500 font-sans block">
              Amazon Advertising
            </span>
            <h3 className="font-display font-semibold text-xl text-neutral-900 leading-snug group-hover:text-amber-950 transition-colors duration-300">
              Highest quality images as well as 3D images
            </h3>
          </div>

          <div className="border-t border-neutral-100 pt-6 mt-8 flex items-center justify-between relative z-10" id="card-3-metrics">
            <div className="space-y-1">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="350">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Sales Volume
              </span>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[34px] font-black text-neutral-950 font-display block tracking-tighter leading-none">
                +<span className="gsap-stat-number" data-target="451">0</span>%
              </span>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest block font-sans">
                Unit Sales
              </span>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
