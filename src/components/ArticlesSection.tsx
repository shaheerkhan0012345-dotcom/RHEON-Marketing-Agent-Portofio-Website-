import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ArticlesSectionProps {
  onOpenProposal: () => void;
}

export default function ArticlesSection({ onOpenProposal }: ArticlesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const titleText = "Information about us";
  const words = titleText.split(" ");

  const articles = [
    {
      title: "What Is Digital PR and How Can It Impact My Business?",
      img: "/src/assets/images/article_digital_pr_1781264253341.jpg",
      category: "PR & Brand",
      readTime: "4 min read"
    },
    {
      title: "20 Key Advertising Trends To Watch in 2024",
      img: "/src/assets/images/article_advertising_trends_1781264273604.jpg",
      category: "Trends",
      readTime: "5 min read"
    },
    {
      title: "Programmatic SEO: What Is It and Why Your Business",
      img: "/src/assets/images/article_programmatic_seo_1781264292649.jpg",
      category: "SEO",
      readTime: "3 min read"
    },
    {
      title: "Google Business Profile: A Local SEO Essential",
      img: "/src/assets/images/article_google_profile_1781264308436.jpg",
      category: "Local SEO",
      readTime: "6 min read"
    }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Reveal top tag & divider on scroll
      gsap.fromTo(["#articles-top-tag", "#articles-top-divider"],
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=15%",
            toggleActions: "play none none none"
          }
        }
      );

      // 2. Split letter/word masked reveal for header matching Korsa format
      gsap.fromTo(".articles-title-word",
        {
          y: "115%",
          rotate: 2.5,
          skewY: 1,
        },
        {
          y: "0%",
          rotate: 0,
          skewY: 0,
          stagger: 0.04,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#articles-main-title",
            start: "top bottom-=10%",
            toggleActions: "play none none none"
          }
        }
      );

      // 3. Stagger reveal article grid cards with slight rotation/float
      gsap.fromTo(".article-grid-card",
        {
          opacity: 0,
          y: 35,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#articles-grid",
            start: "top bottom-=12%",
            toggleActions: "play none none none"
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Premium hover mathematics for 3D card response
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;

    // Butter-smooth 3D hover orientation values
    gsap.to(card, {
      rotateY: px * 12,
      rotateX: -py * 12,
      transformPerspective: 800,
      y: -6,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto"
    });

    // Subtly drift the interior cover image
    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: px * 8,
        y: py * 8,
        scale: 1.05,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto"
    });

    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-16 lg:py-24 z-10" 
      id="articles-blog-section"
    >
      {/* Top Header Label */}
      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400 block font-sans mb-3 opacity-0" id="articles-top-tag">
        ARTICLE
      </span>

      {/* Top horizontal divider line */}
      <div className="w-full border-t border-neutral-150 pt-8 mb-12 opacity-0" id="articles-top-divider" />

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12" id="articles-header-row">
        {/* Dynamic Masked Title Words */}
        <h2 
          className="font-display font-medium text-3xl sm:text-5xl md:text-6xl text-neutral-900 tracking-tight leading-tight sm:leading-none flex flex-wrap" 
          id="articles-main-title"
        >
          {words.map((word, idx) => (
            <span 
              key={`${word}-${idx}`} 
              className="inline-block overflow-hidden mr-[0.25em] pb-1.5"
            >
              <span className="inline-block articles-title-word transform-gpu origin-bottom-left">
                {word}
              </span>
            </span>
          ))}
        </h2>

        {/* Premium Rolling Outline Button */}
        <button
          onClick={onOpenProposal}
          className="group px-6 py-2.5 border border-neutral-950 text-neutral-900 font-sans font-semibold rounded-full text-xs tracking-tight transition-all duration-300 cursor-pointer inline-flex items-center justify-center select-none relative overflow-hidden self-start sm:self-auto"
          id="articles-explore-more-btn"
        >
          {/* Fill background color animation */}
          <span className="absolute inset-0 bg-neutral-950 translate-y-full origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 rounded-full z-0" />
          
          <div className="relative z-10 h-4 overflow-hidden" id="articles-btn-rolling-text">
            <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1/2 flex flex-col items-center">
              <span className="h-4 flex items-center justify-center text-neutral-900 select-none whitespace-nowrap tracking-wide">
                Explore More
              </span>
              <span className="h-4 flex items-center justify-center text-white select-none whitespace-nowrap tracking-wide font-sans font-semibold">
                View All Posts
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* 4-column dynamic grid with clean viewport stagged slide reveal */}
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" 
        id="articles-grid"
      >
        {articles.map((item, idx) => (
          <div
            key={idx}
            onClick={onOpenProposal}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className="article-grid-card group flex flex-col justify-between cursor-pointer opacity-0 transition-all duration-300 p-4 sm:p-5 rounded-3xl bg-transparent border border-transparent hover:bg-[#fcfdfe] hover:border-neutral-100 hover:shadow-lg transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
            id={`article-card-${idx}`}
          >
            {/* Visual element wrapper with crisp subtle curves */}
            <div className="flex flex-col space-y-4">
              <div 
                className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-neutral-50 aspect-square flex items-center justify-center transition-shadow duration-300 group-hover:shadow-md"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full border border-neutral-150/40 text-[9px] font-bold text-neutral-700 tracking-wide font-sans">
                  {item.category}
                </div>
              </div>

              {/* Title links */}
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 font-mono font-medium block">
                  {item.readTime}
                </span>
                <h3 
                  className="font-sans font-medium text-[15px] sm:text-base text-neutral-900 leading-snug tracking-tight group-hover:text-neutral-600 transition-colors"
                >
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Bottom Learn More link */}
            <div className="pt-4">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-neutral-950 border-b border-neutral-950 group-hover:text-neutral-600 group-hover:border-neutral-600 transition-all tracking-wide py-0.5"
              >
                Learn More
                <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
