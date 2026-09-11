import React from 'react';
import { X, CheckCircle2, Building2, Clock, Quote, ArrowRight } from 'lucide-react';
import { CaseStudyItem } from '../types.ts';

interface CaseStudyModalProps {
  study: CaseStudyItem | null;
  onClose: () => void;
  onScheduleConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onScheduleConsultation,
}) => {
  if (!study) return null;

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="case-study-modal-content"
        className="relative my-8 w-full max-w-3xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {study.industry}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {study.duration}
              </span>
            </div>
            <h3 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-slate-950">
              {study.title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              Client: {study.client}
            </div>
          </div>
          <button
            id="case-study-close-btn"
            onClick={onClose}
            aria-label="Close Case Study Modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quantified Impact Banner */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {study.results.map((res, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-slate-200 bg-slate-50/70 p-3.5 text-center"
            >
              <div className="font-display text-2xl font-bold text-slate-950">{res.value}</div>
              <div className="mt-0.5 text-[11px] font-medium text-slate-600 leading-tight">
                {res.label}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative */}
        <div className="mt-6 space-y-6 text-sm">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Executive Context
            </h4>
            <p className="mt-1.5 text-slate-700 leading-relaxed">
              {study.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-xl border border-slate-200 p-5 bg-white">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700">
                The Operational Challenge
              </h4>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                {study.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                The Meridian Solution
              </h4>
              <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          {study.quote && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <Quote className="h-5 w-5 text-slate-400 mb-2" />
              <p className="text-sm italic text-slate-800 leading-relaxed">
                "{study.quote.text}"
              </p>
              <div className="mt-3 text-xs font-bold text-slate-900">
                {study.quote.author}
                <span className="font-normal text-slate-500 block">{study.quote.role}</span>
              </div>
            </div>
          )}

          {/* Architecture & Tech Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Architecture & Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {study.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            id="case-modal-dismiss-btn"
            onClick={onClose}
            className="w-full sm:w-auto rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close Overview
          </button>
          <button
            id="case-modal-consult-btn"
            onClick={() => {
              onScheduleConsultation();
              onClose();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
          >
            Discuss a Similar Engagement
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
