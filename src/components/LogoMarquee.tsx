import React from 'react';
import { motion } from 'motion/react';

interface BrandLogo {
  id: string;
  name: string;
  metric: string;
  svg: React.ReactNode;
}

export default function LogoMarquee() {
  const brands: BrandLogo[] = [
    {
      id: 'luyu',
      name: 'Liyu Premium',
      metric: '+142% Organic Growth',
      svg: (
        <svg viewBox="0 0 120 40" className="h-6 w-auto fill-current opacity-80 hover:opacity-100 transition-opacity">
          <path d="M10 10h10v20H10zm15 0h10v20H25zm15 0h10v20H40zm15 0h10v20H55zm15 0h10v12H70zm15 0h15v6H85v14H85z" />
          <text x="5" y="38" className="text-[11px] font-extrabold font-mono tracking-widest">L I Y U</text>
        </svg>
      )
    },
    {
      id: 'ring',
      name: 'Aether Ring',
      metric: '3.4x Google Ranking Jump',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-none stroke-current opacity-80 hover:opacity-100 transition-opacity" strokeWidth="2.5">
          <circle cx="20" cy="20" r="12" />
          <circle cx="20" cy="20" r="6" />
          <path d="M45 15h35M45 25h25" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'logoipsum-globoid',
      name: 'Sphere Inc.',
      metric: '10M+ Monthly Visitors',
      svg: (
        <svg viewBox="0 0 160 40" className="h-6 w-auto fill-current opacity-80 hover:opacity-100 transition-opacity">
          {/* Globe grid */}
          <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <path d="M12 20h16M20 12v16M13.5 15c2.5 1.5 2.5 8.5 0 10M26.5 15c-2.5 1.5-2.5 8.5 0 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="42" y="27" className="text-[13px] font-display font-medium tracking-tight">logo-ipsum</text>
        </svg>
      )
    },
    {
      id: 'logoipsum-shield',
      name: 'Logoipsum Enterprise',
      metric: '+280% Conversions',
      svg: (
        <svg viewBox="0 0 160 40" className="h-6 w-auto fill-current opacity-80 hover:opacity-100 transition-opacity">
          <path d="M10 10h20v20H10zM15 15l10 10m0-10L15 25" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <text x="40" y="26" className="text-[15px] font-sans font-black tracking-tight">Logoipsum</text>
        </svg>
      )
    },
    {
      id: 'petals',
      name: 'Petal Networks',
      metric: '-40% CPA Reduction',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-none stroke-current opacity-80 hover:opacity-100 transition-opacity" strokeWidth="2.5">
          <circle cx="15" cy="20" r="5" />
          <circle cx="27" cy="14" r="5" />
          <circle cx="27" cy="26" r="5" />
          <circle cx="39" cy="20" r="5" />
          <path d="M55 20h30" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'racetrack',
      name: 'Loop Dynamics',
      metric: '72% Higher Retention',
      svg: (
        <svg viewBox="0 0 100 40" className="h-6 w-auto fill-none stroke-current opacity-80 hover:opacity-100 transition-opacity" strokeWidth="2.5">
          <rect x="10" y="10" width="35" height="20" rx="10" />
          <rect x="18" y="14" width="19" height="12" rx="6" />
          <path d="M55 15h30" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'coo-wave',
      name: 'Infinity Waves',
      metric: 'Under 1s Load Speeds',
      svg: (
        <svg viewBox="0 0 110 40" className="h-5 w-auto fill-none stroke-current opacity-80 hover:opacity-100 transition-opacity" strokeWidth="3">
          <path d="M10 20c5-10 10-10 15 0s10 10 15 0 10-10 15 0c5 10 10 10 15 0s10-10 15 0" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  return (
    <div className="border-t border-gray-100/60 pt-16 pb-12 w-full max-w-7xl mx-auto px-6 sm:px-8 z-20 relative">
      <div className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-widest font-mono text-neutral-400 font-bold">
          Empowering growth for modern digital leaders
        </p>
      </div>

      {/* Brand grid wrapper */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8 gap-x-6 items-center justify-items-center text-neutral-800" id="brand-logos-container">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="group relative cursor-default py-2"
            id={`brand-item-${brand.id}`}
          >
            {brand.svg}

            {/* Micro summary card on hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 text-center z-30 w-36 scale-90 group-hover:scale-100">
              <span className="block text-[10px] font-bold tracking-tight text-amber-300 uppercase leading-none mb-1">
                {brand.name}
              </span>
              <span className="block text-[9px] font-sans font-semibold text-neutral-200 leading-none">
                {brand.metric}
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45 border-r border-b border-neutral-850" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
