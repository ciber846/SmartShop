import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Shield, Award, Users2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData.ts';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onScrollToSection,
}) => {
  const industries = [
    'Financial Services & FinTech',
    'Healthcare & Clinical Telemetry',
    'Global Freight & Logistics',
    'Enterprise Cloud Platforms',
    'Renewable Energy & IoT',
  ];

  return (
    <section id="hero-section" className="relative border-b border-slate-200 bg-white pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Editorial Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-900"></span>
              Independent Enterprise Advisory & Engineering • Est. {BUSINESS_INFO.establishedYear}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12]">
              Strategic advisory and digital engineering for industry leaders.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              We help mid-market and enterprise organizations architect resilient systems, modernize mission-critical platforms, and capture quantifiable operational efficiencies without vendor lock-in.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                id="hero-schedule-consultation-btn"
                onClick={onOpenConsultation}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                Schedule Strategic Consultation
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                id="hero-estimator-btn"
                onClick={() => onScrollToSection('estimator')}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap"
              >
                <Calculator className="h-4 w-4 text-slate-600" />
                Calculate Project Scope & Cost
              </button>
            </div>

            {/* Assurance badges */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-700" />
                <span>100% Client Code & IP Ownership</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-slate-700" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-slate-700" />
                <span>60-Day Defect Warranty</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Operational Metrics & Corporate Status Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                    <Users2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 leading-tight">Audited Performance</h2>
                    <p className="text-xs text-slate-500">Cumulative client engagements</p>
                  </div>
                </div>
                <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                  Fiscal Year 2024–2025
                </span>
              </div>

              {/* Performance Metrics Grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                {BUSINESS_INFO.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    id={`hero-metric-item-${idx}`}
                    className="rounded-lg border border-slate-200/80 bg-white p-4 shadow-2xs"
                  >
                    <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs font-medium text-slate-600 leading-tight">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Engagement Highlight */}
              <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                  <span className="font-semibold text-slate-800">Deployment Velocity</span>
                  <span className="text-emerald-700 font-medium">Standard SLA</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <span>Sprint Cycle Frequency</span>
                  <span className="font-semibold text-slate-900">Bi-Weekly Releases</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-700 pt-2 border-t border-slate-100">
                  <span>Average Time to Initial Kickoff</span>
                  <span className="font-semibold text-slate-900">10 – 14 Business Days</span>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  id="hero-view-cases-btn"
                  onClick={() => onScrollToSection('case-studies')}
                  className="cursor-pointer text-xs font-semibold text-slate-700 hover:text-slate-950 underline decoration-slate-300 underline-offset-4"
                >
                  Review Verified Enterprise Case Studies & Metrics →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Industry Focus Ticker / Strip */}
        <div className="mt-16 border-t border-slate-200 pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
              Industry Domains Served
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {industries.map((ind, i) => (
                <span
                  key={i}
                  id={`hero-industry-pill-${i}`}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs whitespace-nowrap"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
