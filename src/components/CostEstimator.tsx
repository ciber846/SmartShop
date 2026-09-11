import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { SERVICES } from '../data/businessData.ts';

interface CostEstimatorProps {
  onApplyEstimateToInquiry: (estimateData: {
    serviceName: string;
    estimatedCost: string;
    timelineWeeks: number;
    teamTier: string;
    summary: string;
  }) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimateToInquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[1].id);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(12);
  const [teamSeniority, setTeamSeniority] = useState<'standard' | 'senior' | 'principal'>('senior');
  const [velocity, setVelocity] = useState<'standard' | 'accelerated' | 'priority'>('standard');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    'compliance',
  ]);

  const addOnOptions = [
    {
      id: 'compliance',
      name: 'SOC 2 & HIPAA Security Compliance Package',
      cost: 9500,
      description: 'Zero-trust architecture audit, encryption verification, and policy templates.',
    },
    {
      id: 'migration',
      name: 'Legacy Database & Data Pipeline Migration',
      cost: 12000,
      description: 'Zero-downtime ETL migration scripts, data reconciliation, and rollback safeguards.',
    },
    {
      id: 'sre-support',
      name: 'Post-Launch 60-Day Dedicated SRE Incident Coverage',
      cost: 7500,
      description: '24/7 on-call tier-1 response, automated telemetry alerts, and weekly health reports.',
    },
    {
      id: 'workshops',
      name: 'Executive Technical Upskilling & Internal Team Handoff',
      cost: 4500,
      description: '4 dedicated live training modules with architecture blueprints and runbooks.',
    },
  ];

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pricing formula calculation
  const calculation = useMemo(() => {
    // Base weekly rate by practice
    let baseWeeklyRate = 6000;
    if (selectedServiceId === 'strategic-advisory') baseWeeklyRate = 4500;
    if (selectedServiceId === 'software-engineering') baseWeeklyRate = 6500;
    if (selectedServiceId === 'cloud-devops') baseWeeklyRate = 5800;
    if (selectedServiceId === 'data-analytics') baseWeeklyRate = 6200;

    // Multipliers
    let seniorityMultiplier = 1.0;
    if (teamSeniority === 'senior') seniorityMultiplier = 1.25;
    if (teamSeniority === 'principal') seniorityMultiplier = 1.6;

    let velocityMultiplier = 1.0;
    if (velocity === 'accelerated') velocityMultiplier = 1.2;
    if (velocity === 'priority') velocityMultiplier = 1.45;

    const adjustedWeekly = Math.round(baseWeeklyRate * seniorityMultiplier * velocityMultiplier);
    const coreCost = adjustedWeekly * timelineWeeks;

    // Addons cost
    const addOnsTotal = selectedAddOns.reduce((acc, currId) => {
      const found = addOnOptions.find((o) => o.id === currId);
      return acc + (found ? found.cost : 0);
    }, 0);

    const totalEstimateLow = Math.round((coreCost + addOnsTotal) * 0.95);
    const totalEstimateHigh = Math.round((coreCost + addOnsTotal) * 1.1);

    const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

    return {
      weeklyRate: adjustedWeekly,
      totalLow: totalEstimateLow,
      totalHigh: totalEstimateHigh,
      coreCost,
      addOnsTotal,
      serviceName: selectedService.title,
    };
  }, [selectedServiceId, timelineWeeks, teamSeniority, velocity, selectedAddOns]);

  const handleApply = () => {
    const formattedCost = `$${calculation.totalLow.toLocaleString()} – $${calculation.totalHigh.toLocaleString()}`;
    const summary = `${calculation.serviceName} (${timelineWeeks} weeks, ${teamSeniority} seniority, ${velocity} velocity) with ${selectedAddOns.length} enterprise add-on(s).`;
    onApplyEstimateToInquiry({
      serviceName: calculation.serviceName,
      estimatedCost: formattedCost,
      timelineWeeks,
      teamTier: teamSeniority,
      summary,
    });
  };

  const handleReset = () => {
    setSelectedServiceId(SERVICES[1].id);
    setTimelineWeeks(12);
    setTeamSeniority('senior');
    setVelocity('standard');
    setSelectedAddOns(['compliance']);
  };

  return (
    <section id="estimator" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
            <Calculator className="h-3.5 w-3.5 text-slate-700" />
            Transparent Financial Modeling
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Interactive Project Scope & Cost Estimator
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Model project budget brackets, timeline duration, and team seniority to formulate a realistic procurement baseline before scheduling a formal discovery call.
          </p>
        </div>

        {/* Estimator Form & Real-Time Output Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Controls (7 columns) */}
          <div className="lg:col-span-7 space-y-8 rounded-xl border border-slate-200 bg-[#fafafb] p-6 sm:p-8">
            {/* Step 1: Practice Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                1. Select Primary Practice Discipline
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    id={`estimator-service-option-${s.id}`}
                    type="button"
                    onClick={() => setSelectedServiceId(s.id)}
                    className={`cursor-pointer text-left rounded-lg p-3 text-xs font-medium border transition-all ${
                      selectedServiceId === s.id
                        ? 'border-slate-900 bg-slate-900 text-white shadow-xs'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm leading-tight">{s.category}</div>
                    <div className={`mt-0.5 line-clamp-1 ${selectedServiceId === s.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {s.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  2. Targeted Engagement Duration
                </label>
                <span className="rounded-md bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-slate-900">
                  {timelineWeeks} Weeks {timelineWeeks <= 6 ? '(Rapid Sprint)' : timelineWeeks <= 14 ? '(Targeted Foundation)' : '(Full Modernization)'}
                </span>
              </div>
              <input
                id="estimator-timeline-slider"
                type="range"
                min="4"
                max="28"
                step="2"
                value={timelineWeeks}
                onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                <span>4 Weeks (Discovery)</span>
                <span>12 Weeks (Core Platform)</span>
                <span>28 Weeks (Enterprise Suite)</span>
              </div>
            </div>

            {/* Step 3: Team Seniority Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                3. Team Seniority Allocation
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  {
                    id: 'standard',
                    title: 'Standard Core',
                    desc: 'Senior Engineers + Technical Lead',
                  },
                  {
                    id: 'senior',
                    title: 'Senior Specialized',
                    desc: 'Staff Engineers + Domain Architect',
                  },
                  {
                    id: 'principal',
                    title: 'Principal Strategic',
                    desc: 'Partner Architect + Principal Squad',
                  },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    id={`estimator-tier-${tier.id}`}
                    type="button"
                    onClick={() => setTeamSeniority(tier.id as any)}
                    className={`cursor-pointer rounded-lg p-3 text-left border transition-all ${
                      teamSeniority === tier.id
                        ? 'border-slate-900 bg-white ring-2 ring-slate-900 shadow-2xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{tier.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-tight">{tier.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-On Enterprise Modules */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                4. Select Optional Enterprise Modules
              </label>
              <div className="space-y-2">
                {addOnOptions.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      id={`estimator-addon-${addon.id}`}
                      onClick={() => handleToggleAddOn(addon.id)}
                      className={`cursor-pointer flex items-start justify-between rounded-lg border p-3 text-xs transition-all ${
                        isChecked
                          ? 'border-slate-900 bg-white ring-1 ring-slate-900 shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded border ${
                            isChecked
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3" />}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900">{addon.name}</span>
                          <p className="text-slate-500 text-[11px] mt-0.5">{addon.description}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900 shrink-0 ml-3">
                        +${addon.cost.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-2 flex justify-end">
              <button
                id="estimator-reset-btn"
                type="button"
                onClick={handleReset}
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Reset Parameters
              </button>
            </div>
          </div>

          {/* Right: Real-time Calculated Proposal Summary (5 columns) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-7 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Procurement Estimate
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 border border-emerald-700/60 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                  <ShieldCheck className="h-3 w-3" />
                  Binding Fixed-Cap Eligible
                </span>
              </div>

              {/* Major Price Bracket */}
              <div className="mt-6">
                <div className="text-xs text-slate-400">Estimated Total Investment</div>
                <div className="mt-1 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  ${calculation.totalLow.toLocaleString()} – ${calculation.totalHigh.toLocaleString()}
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-300 border-t border-slate-800 pt-3">
                  <span>Estimated Weekly Burn</span>
                  <span className="font-semibold text-white">
                    ~${calculation.weeklyRate.toLocaleString()} / week
                  </span>
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="mt-6 space-y-3 rounded-lg bg-slate-800/60 p-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Target Practice:</span>
                  <span className="font-semibold text-white text-right max-w-[200px] truncate">
                    {calculation.serviceName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sprint Span:</span>
                  <span className="font-semibold text-white">{timelineWeeks} Calendar Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Team Tier:</span>
                  <span className="font-semibold capitalize text-white">{teamSeniority} Squad</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Add-ons:</span>
                  <span className="font-semibold text-white">{selectedAddOns.length} Included</span>
                </div>
              </div>

              {/* Included Warranties */}
              <div className="mt-6 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>100% intellectual property ownership assigned</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>60-day post-delivery defect warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Bi-weekly working software demos & sprint reviews</span>
                </div>
              </div>

              {/* Apply Action */}
              <button
                id="estimator-apply-to-inquiry-btn"
                type="button"
                onClick={handleApply}
                className="cursor-pointer mt-8 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-bold text-slate-950 shadow-sm hover:bg-slate-100 transition-colors whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4 text-slate-900" />
                Transfer Estimate to Consultation Booking
                <ArrowRight className="h-3.5 w-3.5 text-slate-900" />
              </button>

              <p className="mt-3 text-center text-[11px] text-slate-400">
                Transfers these parameters into the consultation inquiry form below for rapid scoping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
