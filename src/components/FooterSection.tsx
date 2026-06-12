import React from 'react';
import { Footer2 } from './ui/shadcnblocks-com-footer2';

interface FooterSectionProps {
  onOpenProposal: () => void;
}

export default function FooterSection({ onOpenProposal }: FooterSectionProps) {
  // We can pass customized data mapping to perfectly align with user intent
  const customData = {
    logo: {
      title: "RHEON",
      url: "#",
      alt: "RHEON growth solutions",
    },
    tagline: "Through careful keyword research and white hat SEO practices, we help you achieve higher organic rankings.",
    menuItems: [
      {
        title: "Product",
        links: [
          { text: "Overview", url: "#" },
          { text: "Features", url: "#" },
          { text: "Solutions (New)", url: "#" },
          { text: "Tutorials", url: "#" },
          { text: "Pricing", url: "#" },
        ],
      },
      {
        title: "Company",
        links: [
          { text: "About us", url: "#" },
          { text: "Careers", url: "#" },
          { text: "Press", url: "#" },
          { text: "News", url: "#" },
          { text: "Contact", url: "#" },
        ],
      },
      {
        title: "Resources",
        links: [
          { text: "Blog", url: "#" },
          { text: "Newsletter", url: "#" },
          { text: "Events", url: "#" },
          { text: "Help centre", url: "#" },
        ],
      },
      {
        title: "Creator Info",
        links: [
          { text: "Rehan", url: "mailto:rehan@gmail.com" },
          { text: "rehan@gmail.com", url: "mailto:rehan@gmail.com" },
          { text: "Twitter", url: "#" },
          { text: "LinkedIn", url: "#" },
          { text: "GitHub", url: "#" },
        ],
      },
    ],
    copyright: "© 2077 RHEON & Rehan. All rights reserved.",
    bottomLinks: [
      { text: "Terms and Conditions", url: "#" },
      { text: "Privacy Policy", url: "#" },
      { text: "Cookie Preferences", url: "#" },
    ],
  };

  return (
    <div onClick={(e) => {
      // If client clicks any hash link, we can trigger the gorgeous Proposal sheet modal!
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && (target.getAttribute('href') === '#' || target.getAttribute('href')?.startsWith('mailto:'))) {
        if (target.getAttribute('href') === '#') {
          e.preventDefault();
          onOpenProposal();
        }
      }
    }}>
      <Footer2 {...customData} />
    </div>
  );
}

