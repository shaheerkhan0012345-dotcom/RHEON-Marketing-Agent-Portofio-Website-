import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, TrendingUp, Search, Calendar, Check } from 'lucide-react';
import Navbar from './components/Navbar';
import PromoBadge from './components/PromoBadge';
import LogoMarquee from './components/LogoMarquee';
import ProposalModal from './components/ProposalModal';
import ContactModal from './components/ContactModal';
import SearchModal from './components/SearchModal';
import StrategistSection from './components/StrategistSection';
import GrowthSection from './components/GrowthSection';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import CallToActionSection from './components/CallToActionSection';
import ArticlesSection from './components/ArticlesSection';
import FooterSection from './components/FooterSection';
import Loader from './components/Loader';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [proposalOpen, setProposalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const firstSectionRef = useRef<HTMLDivElement>(null);
  const blobOrangeRef = useRef<HTMLDivElement>(null);
  const blobGreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Unbelievably Smooth Entrance Timeline
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 2.2 });
      
      // Animate organic backdrop blobs
      gsap.fromTo([blobOrangeRef.current, blobGreenRef.current],
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 0.18, duration: 2.2, ease: "power2.out", stagger: 0.3, delay: 2.2 }
      );

      // Infinitely drift the blobs for a high-end organic liquid feeling
      gsap.to(blobOrangeRef.current, {
        x: '+=40',
        y: '-=30',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(blobGreenRef.current, {
        x: '-=35',
        y: '+=45',
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Stagger elements
      tl.fromTo(".hero-badge-ani", 
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, delay: 0.15 }
      );
      
      // Masked-reveal animate title words
      tl.fromTo(".hero-title-word",
        { y: "115%" },
        { y: "0%", stagger: 0.08, duration: 1.4, ease: "power4.out" },
        "-=0.9"
      );
      
      tl.fromTo(".hero-description",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2 },
        "-=1.0"
      );
      
      tl.fromTo(".hero-cta-ani",
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0 },
        "-=1.0"
      );

      tl.fromTo(".hero-ticker-ani",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      );

      tl.fromTo(".hero-marquee-ani",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.3 },
        "-=0.8"
      );

      // 2. High-Performance, Non-Destructive Interactive Scroll Parallax
      // Moves the entire hero container at a slightly slower rate to create a beautiful physical depth/parallax effect
      gsap.to(".hero-scroll-wrapper", {
        scrollTrigger: {
          trigger: firstSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        y: 80, // gentle parallax offset
        ease: "none"
      });

      gsap.to([blobOrangeRef.current, blobGreenRef.current], {
        scrollTrigger: {
          trigger: firstSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        y: 120,
        rotate: 20,
        ease: "none"
      });

    }, firstSectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Loader />
      <div className="relative min-h-screen bg-white  text-neutral-800  font-sans selection:bg-neutral-900 selection:text-white   overflow-x-hidden transition-colors duration-300" id="app-root-container">
      {/* 
        GRID BACKGROUND ARCHITECTURE
        Draws the engineering wireframe grid shown in the original screenshot, 
        fading seamlessly outwards via custom radial CSS layers.
      */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0 opacity-[0.8] " />
      <div className="absolute inset-0 bg-radial from-transparent via-white/85 to-white   pointer-events-none z-0 transition-colors duration-300" />

      {/* Primary Sticky Top Navigation Header */}
      <Navbar 
        onOpenProposal={() => setProposalOpen(true)}
        onOpenContact={() => setContactOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Interactive Main Hero Section */}
      <main ref={firstSectionRef} className="flex-1 flex flex-col items-center justify-center relative z-10 pt-12 md:pt-16 pb-12 px-6 sm:px-8 max-w-7xl mx-auto w-full overflow-visible" id="main-hero-area">
        
        {/* Oasis style fluid background blobs */}
        <div ref={blobOrangeRef} className="absolute top-[10%] left-[5%] w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full bg-amber-200/20  blur-[100px] sm:blur-[130px] pointer-events-none z-0" />
        <div ref={blobGreenRef} className="absolute bottom-[5%] right-[2%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-emerald-100/20  blur-[110px] sm:blur-[140px] pointer-events-none z-0" />

        {/* Step-by-Step Entrance Animation Staggers */}
        <div className="hero-scroll-wrapper text-center space-y-8 max-w-5xl mx-auto z-10 relative">
          {/* Interactive Promo Pill */}
          <div className="flex justify-center hero-badge-ani" id="hero-badge-container">
            <PromoBadge />
          </div>

          {/* Central Oversized Master Heading Display */}
          <div className="space-y-2 max-w-4xl mx-auto" id="hero-headings-block">
            <h1 className="font-display font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neutral-900  tracking-[-0.035em] leading-[1.02] hero-title select-none">
              <span className="inline-block overflow-hidden pb-1.5 sm:pb-3 align-bottom">
                <span className="inline-block hero-title-word">Digital</span>
              </span>{" "}
              <span className="inline-block overflow-hidden pb-1.5 sm:pb-3 align-bottom">
                <span className="inline-block hero-title-word">Marketing</span>
              </span>
              <span className="block text-neutral-950  overflow-hidden pb-1.5 sm:pb-3">
                <span className="inline-block hero-title-word">Services</span>
              </span>
            </h1>
          </div>

          {/* Centered Symmetrical Copysheet Subtitle */}
          <div className="max-w-xl mx-auto" id="hero-subheadings-block">
            <p className="text-sm sm:text-[15px] text-neutral-500  font-normal leading-relaxed tracking-tight px-1.5 sm:px-4 hero-description">
              Through careful keyword research and white hat SEO practices, we can help you achieve higher organic rankings and increased visibility in search results.
            </p>
          </div>

          {/* Highly Visually Polished Master CTA Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 hero-cta-ani" id="hero-buttons-wrapper">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setProposalOpen(true)}
              className="px-8 py-3.5 bg-neutral-950  text-white  hover:bg-neutral-900  border border-neutral-950  font-display font-semibold rounded-full text-sm shadow-lg shadow-neutral-950/10  cursor-pointer flex items-center justify-center gap-2 group tracking-tight z-10"
              id="master-proposal-cta"
            >
              Free Proposal
              <ArrowRight className="w-4 h-4 text-neutral-300  transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </div>
        </div>

        {/* 
          Quick Helper Widget: Live Activity Log
          Helps users see that requests they create inside proposal or contact flow are actually persisted and responsive!
        */}
        <div className="mt-12 text-center hero-ticker-ani" id="quick-activity-ticker">
          <p className="text-[10px] font-mono font-medium text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-md py-1.5 px-3 inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 
            Active Service Session: Local Sandbox Live
          </p>
        </div>

        {/* Brands & Trusts bottom logos bar */}
        <div className="hero-marquee-ani w-full mt-16 pb-8">
          <LogoMarquee />
        </div>

      </main>

      {/* Embedded Second Section with Strategist Spotlight */}
      <StrategistSection 
        onOpenProposal={() => setProposalOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Embedded Third Section showcasing business growth */}
      <GrowthSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Embedded Fourth Section with visual portfolio of latest work */}
      <WorkSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Embedded Fifth Section showcasing brand recognition with custom categories */}
      <ServicesSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Embedded Sixth Section prompting user strategies CTA */}
      <CallToActionSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Embedded Seventh Section showcasing information about us */}
      <ArticlesSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Embedded Eighth Section: comprehensive app footer */}
      <FooterSection 
        onOpenProposal={() => setProposalOpen(true)}
      />

      {/* Global Interactive Dialog sheets/Modals */}
      <ProposalModal 
        isOpen={proposalOpen} 
        onClose={() => setProposalOpen(false)} 
      />

      <ContactModal 
        isOpen={contactOpen} 
        onClose={() => setContactOpen(false)} 
      />

      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        onOpenProposal={() => setProposalOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />
    </div>
    </>
  );
}
