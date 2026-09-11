import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/businessData.ts';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="border-b border-slate-200 bg-[#fafafb] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Executive Endorsements
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Trusted by senior technology and operations leaders.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            What C-suite executives, engineering directors, and product leaders say about working with Meridian squads.
          </p>
        </div>

        {/* Testimonials 3-Card Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              id={`testimonial-card-${t.id}`}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Rating Stars & Year */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Fiscal {t.year}
                  </span>
                </div>

                {/* Quote Icon & Content */}
                <Quote className="mt-4 h-6 w-6 text-slate-300" />
                <p className="mt-2 text-sm text-slate-700 leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={t.image}
                  alt={t.name}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-950">{t.name}</h4>
                  <p className="text-[11px] font-medium text-slate-500 leading-tight">{t.role}</p>
                  <p className="text-[11px] font-semibold text-slate-700 mt-0.5">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Corporate Trust Strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-500 border-t border-slate-200 pt-8">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-slate-700" />
            100% Direct Staff Engineers (No Blind Subcontracting)
          </span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Independent Third-Party Code Audits</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span>Continuous Security & Telemetry Testing</span>
        </div>
      </div>
    </section>
  );
};
