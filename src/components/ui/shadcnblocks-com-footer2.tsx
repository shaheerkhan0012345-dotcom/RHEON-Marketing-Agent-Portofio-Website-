import React from "react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src?: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    title: "RHEON",
    url: "#",
    alt: "RHEON SEO and Growth",
  },
  tagline = "Grow your client base with data-driven and targeted strategies. Co-created with Rehan.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Overview", url: "#" },
        { text: "Pricing", url: "#" },
        { text: "Marketplace", url: "#" },
        { text: "Features", url: "#" },
        { text: "Integrations", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#" },
        { text: "Team", url: "#" },
        { text: "Blog", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Help Support", url: "#" },
        { text: "Sales Desk", url: "#" },
        { text: "Advertise", url: "#" },
      ],
    },
    {
      title: "Developer & Contact",
      links: [
        { text: "Rehan", url: "mailto:rehan@gmail.com" },
        { text: "rehan@gmail.com", url: "mailto:rehan@gmail.com" },
        { text: "LinkedIn Profile", url: "#" },
        { text: "GitHub Profile", url: "#" },
      ],
    },
  ],
  copyright = "© 2077 RHEON & Rehan. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: Footer2Props) => {
  return (
    <section className="relative z-10 py-16 sm:py-24 border-t border-neutral-200  bg-neutral-50  transition-colors duration-300" id="shadcn-footer-block">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6" id="footer-upper-grid">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-3 lg:justify-start" id="footer-brand-logo">
                {/* Clean inline SVG of eight-dot RHEON square logo mark */}
                <svg className="w-6 h-6 text-neutral-900  shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="0" y="0" width="6" height="6" rx="1.5" />
                  <rect x="9" y="0" width="6" height="6" rx="1.5" />
                  <rect x="18" y="0" width="6" height="6" rx="1.5" />
                  <rect x="0" y="9" width="6" height="6" rx="1.5" />
                  <rect x="18" y="9" width="6" height="6" rx="1.5" />
                  <rect x="0" y="18" width="6" height="6" rx="1.5" />
                  <rect x="9" y="18" width="6" height="6" rx="1.5" />
                  <rect x="18" y="18" width="6" height="6" rx="1.5" />
                </svg>
                <span className="text-xl font-display font-black tracking-[0.12em] text-neutral-900 ">
                  {logo.title}
                </span>
              </div>
              
              <p className="mt-5 text-[14px] leading-relaxed text-neutral-600  font-sans font-medium max-w-sm" id="footer-tagline-text">
                {tagline}
              </p>

              {/* Developer badge label for Rehan */}
              <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-300  bg-white  text-[11px] font-semibold text-neutral-700  font-sans shadow-xs transition-colors duration-300" id="footer-developer-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Crafted by <strong>Rehan</strong></span>
              </div>
            </div>

            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx} className="space-y-4 font-sans">
                <h3 className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-neutral-800  uppercase">
                  {section.title}
                </h3>
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-neutral-600 ">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-semibold hover:text-neutral-950  transition-colors">
                      <a href={link.url} className="hover:underline">{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col justify-between gap-6 border-t border-neutral-200  pt-8 text-xs font-sans font-bold text-neutral-500  md:flex-row md:items-center" id="footer-bottom-row">
            <p className="order-2 md:order-1">{copyright}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 order-1 md:order-2">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-neutral-900  transition-colors">
                  <a href={link.url} className="hover:underline font-semibold text-neutral-500 ">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
