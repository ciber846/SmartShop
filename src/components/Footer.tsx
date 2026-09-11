import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection, onOpenConsultation }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Mission Statement (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-slate-950 font-display text-lg font-bold">
                M
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                MERIDIAN
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {BUSINESS_INFO.legalName}. Independent enterprise strategic advisory, digital architecture, and product engineering practice.
            </p>

            {/* Certifications row */}
            <div className="pt-2 flex flex-wrap gap-2">
              {BUSINESS_INFO.certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded bg-slate-900 border border-slate-800 px-2 py-1 text-[10px] font-medium text-slate-300"
                >
                  <ShieldCheck className="h-3 w-3 text-emerald-400" />
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Nav Links (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => onScrollToSection('services')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Practices & Capabilities
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-case-studies"
                  onClick={() => onScrollToSection('case-studies')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Enterprise Case Studies
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-estimator"
                  onClick={() => onScrollToSection('estimator')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Scope & Cost Estimator
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-pricing"
                  onClick={() => onScrollToSection('pricing')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Engagement Models
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-faq"
                  onClick={() => onScrollToSection('faq')}
                  className="cursor-pointer hover:text-white transition-colors"
                >
                  Commercial FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Global Physical Locations (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Global Offices
            </h4>
            <div className="space-y-4 text-xs text-slate-400">
              {BUSINESS_INFO.locations.map((loc, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {loc.city} {loc.isHQ && '(Headquarters)'}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {loc.address}
                    <br />
                    {loc.stateZip}
                  </p>
                  <p className="text-[10px] text-slate-500">{loc.timeZone}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / Quarterly Dispatch (1 col) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Executive Dispatch
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Quarterly research briefing on enterprise architecture, cloud cost optimization, and modern systems engineering.
            </p>

            {newsletterSubscribed ? (
              <div className="rounded-lg bg-slate-900 border border-emerald-800/80 p-3 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>Subscription confirmed. Welcome to the quarterly briefing.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  id="footer-newsletter-input"
                  type="email"
                  required
                  placeholder="corporate.email@company.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:border-white focus:outline-hidden"
                />
                <button
                  id="footer-newsletter-submit-btn"
                  type="submit"
                  className="cursor-pointer w-full flex items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-950 hover:bg-slate-200 transition-colors whitespace-nowrap"
                >
                  <span>Subscribe to Research</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {BUSINESS_INFO.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Confidentiality & Privacy Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Standard MSA Master Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
