import React, { useState, useMemo } from 'react';
import { ArrowRight, Building2, TrendingUp, Clock, Filter } from 'lucide-react';
import { CASE_STUDIES } from '../data/businessData.ts';
import { CaseStudyItem } from '../types.ts';
import { CaseStudyModal } from './CaseStudyModal.tsx';

interface CaseStudiesSectionProps {
  onScheduleConsultation: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  onScheduleConsultation,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudyItem | null>(null);

  const industries = ['All', 'Healthcare', 'Logistics', 'FinTech', 'Clean Energy'];

  const filteredStudies = useMemo(() => {
    if (selectedIndustry === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.industry === selectedIndustry);
  }, [selectedIndustry]);

  return (
    <section id="case-studies" className="border-b border-slate-200 bg-[#fafafb] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Enterprise Impact
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Representative Case Studies & Measurable Outcomes
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl">
              Concrete architectural transformations across complex regulatory environments, high-frequency transactional data, and mission-critical workflows.
            </p>
          </div>

          {/* Industry Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Filter:
            </span>
            {industries.map((ind) => (
              <button
                key={ind}
                id={`filter-case-${ind.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => setSelectedIndustry(ind)}
                className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedIndustry === ind
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                {ind}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              id={`case-study-card-${study.id}`}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:border-slate-300 transition-all"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">
                      {study.industry}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {study.duration}
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    {study.client}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950 leading-snug">
                  {study.title}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {study.summary}
                </p>

                {/* Measurable Results Badges */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                  {study.results.slice(0, 2).map((res, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="font-display text-xl sm:text-2xl font-bold text-slate-950">
                        {res.value}
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 mt-0.5 leading-tight">
                        {res.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                  <TrendingUp className="h-4 w-4 text-emerald-700" />
                  <span>Audited Delivery Metrics</span>
                </div>

                <button
                  id={`read-case-study-${study.id}`}
                  onClick={() => setActiveModalStudy(study)}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-700"
                >
                  Read Full Case Analysis
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        study={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        onScheduleConsultation={onScheduleConsultation}
      />
    </section>
  );
};
