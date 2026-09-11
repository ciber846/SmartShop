import React, { useState } from 'react';
import { Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { PRICING_PLANS } from '../data/businessData.ts';

interface PricingSectionProps {
  onSelectPlan: (planName: string, billingCycle: 'monthly' | 'annual') => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section id="pricing" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
            <ShieldCheck className="h-3.5 w-3.5 text-slate-700" />
            Transparent Commercial Structures
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Standard Engagement & Retainer Packages
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Predicable capital expenditure models with fixed velocity, senior engineering allocation, and comprehensive defect warranties.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="mt-8 inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
            <button
              id="billing-monthly-btn"
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`cursor-pointer rounded-md px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              id="billing-annual-btn"
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`cursor-pointer flex items-center gap-1.5 rounded-md px-4 py-2 text-xs font-bold transition-all whitespace-nowrap ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Annual Partnership</span>
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Save ~15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`relative flex flex-col justify-between rounded-xl border p-7 sm:p-8 transition-all ${
                  plan.popular
                    ? 'border-slate-900 bg-slate-900 text-white shadow-xl ring-1 ring-slate-900'
                    : 'border-slate-200 bg-white text-slate-950 shadow-xs hover:border-slate-300'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1 text-[11px] font-bold text-slate-950 shadow-xs uppercase tracking-wider">
                      <Zap className="h-3 w-3 text-amber-500 fill-amber-500" />
                      Most Selected Engagement
                    </span>
                  </div>
                )}

                <div>
                  {/* Title & Headline */}
                  <h3 className="font-display text-xl font-bold tracking-tight">
                    {plan.name}
                  </h3>
                  <p className={`mt-1.5 text-xs ${plan.popular ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.headline}
                  </p>

                  {/* Price */}
                  <div className="mt-6 border-t border-b py-5 border-slate-200/20">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold tracking-tight">
                        ${price.toLocaleString()}
                      </span>
                      <span className={`text-xs ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                        / month
                      </span>
                    </div>
                    <div className={`mt-1 text-[11px] font-medium ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {billingCycle === 'annual' ? 'Billed annually with dedicated SRE hours' : 'Billed on regular monthly cadence'}
                    </div>
                  </div>

                  {/* Ideal for statement */}
                  <div className="mt-5">
                    <div className={`text-[11px] font-bold uppercase tracking-wider ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Ideal Client Fit
                    </div>
                    <p className={`mt-1 text-xs leading-relaxed ${plan.popular ? 'text-slate-200' : 'text-slate-700'}`}>
                      {plan.bestFor}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-6">
                    <div className={`text-[11px] font-bold uppercase tracking-wider mb-3 ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      Included Deliverables
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs">
                          <Check
                            className={`h-4 w-4 shrink-0 mt-0.5 ${
                              plan.popular ? 'text-emerald-400' : 'text-emerald-700'
                            }`}
                          />
                          <span className={plan.popular ? 'text-slate-200' : 'text-slate-700'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom / Commitment & CTA */}
                <div className="mt-8 pt-6 border-t border-slate-200/20">
                  <div className={`text-[11px] font-medium mb-3 text-center ${plan.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {plan.commitment}
                  </div>
                  <button
                    id={`select-plan-${plan.id}`}
                    type="button"
                    onClick={() => onSelectPlan(plan.name, billingCycle)}
                    className={`cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 text-xs font-bold transition-all whitespace-nowrap ${
                      plan.popular
                        ? 'bg-white text-slate-950 hover:bg-slate-100 shadow-xs'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    Select {plan.name}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial notes */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50/70 p-5 text-center max-w-2xl mx-auto">
          <p className="text-xs text-slate-600 leading-relaxed">
            Need a custom RFP response or fixed-cap statement of work? We accommodate enterprise procurement guidelines, vendor onboarding vendor portals, and master service agreements (MSA).
          </p>
        </div>
      </div>
    </section>
  );
};
