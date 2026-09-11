import React, { useState } from 'react';
import { ShieldCheck, Phone, ArrowRight, Menu, X, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

interface NavbarProps {
  onOpenConsultation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Case Studies', id: 'case-studies' },
    { label: 'Cost Estimator', id: 'estimator' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Testimonials', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all">
      {/* Top micro-bar for corporate reassurance */}
      <div className="hidden border-b border-slate-100 bg-slate-50/80 px-4 py-1.5 text-xs text-slate-600 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Advisory Desk Active
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {BUSINESS_INFO.operatingHours}
            </span>
            <span className="text-slate-300">|</span>
            <span>New York • London</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-600" />
              SOC 2 Type II Audited
            </span>
            <a
              href={`tel:${BUSINESS_INFO.directPhone.replace(/[^0-9+]/g, '')}`}
              id="top-bar-phone-link"
              className="flex items-center gap-1 font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Phone className="h-3 w-3" />
              {BUSINESS_INFO.directPhone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div
          id="navbar-brand-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white font-display text-xl font-bold tracking-tight shadow-xs">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight text-slate-900 leading-none">
              MERIDIAN
            </span>
            <span className="text-[11px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
              Partners & Advisory
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.id}
              id={`nav-link-${link.id}`}
              onClick={() => handleNavClick(link.id)}
              className="cursor-pointer transition-colors hover:text-slate-950"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            id="nav-estimator-btn"
            onClick={() => handleNavClick('estimator')}
            className="cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-slate-400 hover:bg-slate-50 transition-colors whitespace-nowrap"
          >
            Project Estimator
          </button>
          <button
            id="nav-consultation-btn"
            onClick={onOpenConsultation}
            className="cursor-pointer flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors whitespace-nowrap"
          >
            Schedule Consultation
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-panel"
          className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 lg:hidden shadow-lg"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mobile-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {link.label}
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </button>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
              <button
                id="mobile-nav-estimator-btn"
                onClick={() => handleNavClick('estimator')}
                className="w-full rounded-lg border border-slate-300 py-2.5 text-center text-xs font-semibold text-slate-800"
              >
                Open Project Cost Estimator
              </button>
              <button
                id="mobile-nav-consultation-btn"
                onClick={() => {
                  onOpenConsultation();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-lg bg-slate-900 py-2.5 text-center text-xs font-semibold text-white"
              >
                Schedule Strategic Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
