import React from 'react';
import { X, CheckCircle2, Clock, Layers, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForConsultation: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectForConsultation,
}) => {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="service-detail-modal-content"
        className="relative my-8 w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-5">
          <div>
            <span className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {service.category} Practice
            </span>
            <h3 className="mt-2 font-display text-2xl font-bold text-slate-950">
              {service.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {service.tagline}
            </p>
          </div>
          <button
            id="service-detail-close-btn"
            onClick={onClose}
            aria-label="Close practice details modal"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Practice Overview */}
        <div className="mt-5 space-y-5">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Executive Overview
            </h4>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Scope Deliverables */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/70 p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-800" />
              Standard Scope of Deliverables
            </h4>
            <ul className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Engagement Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-200 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                Typical Engagement Timeline
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900">
                {service.timeline}
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                Engagement Model
              </div>
              <div className="mt-1 text-sm font-bold text-slate-900">
                {service.engagementModel}
              </div>
            </div>
          </div>

          {/* Core Technologies & Tooling */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Representative Tooling & Standards
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            id="service-modal-dismiss-btn"
            onClick={onClose}
            className="w-full sm:w-auto rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Close Window
          </button>
          <button
            id="service-modal-inquire-btn"
            onClick={() => {
              onSelectForConsultation(service.title);
              onClose();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer"
          >
            Inquire About This Practice
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
