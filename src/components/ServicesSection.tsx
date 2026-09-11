import React, { useState } from 'react';
import { Compass, Cpu, Cloud, BarChart3, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/businessData.ts';
import { ServiceItem } from '../types.ts';
import { ServiceDetailModal } from './ServiceDetailModal.tsx';

interface ServicesSectionProps {
  onOpenConsultation: (servicePreset?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenConsultation }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="h-6 w-6 text-slate-900" />;
      case 'Cpu':
        return <Cpu className="h-6 w-6 text-slate-900" />;
      case 'Cloud':
        return <Cloud className="h-6 w-6 text-slate-900" />;
      case 'BarChart3':
        return <BarChart3 className="h-6 w-6 text-slate-900" />;
      default:
        return <Cpu className="h-6 w-6 text-slate-900" />;
    }
  };

  return (
    <section id="services" className="border-b border-slate-200 bg-[#fafafb] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Practices & Capabilities
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              Architectural engineering and business transformation.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Four specialized disciplines engineered to solve complex operational hurdles, reduce technological debt, and deploy mission-ready platforms.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-md">
              Full IP Transfer on Delivery
            </span>
          </div>
        </div>

        {/* Services Grid (Clean 2x2 grid avoiding slop) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Top Bar: Icon + Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-slate-200 bg-slate-50">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {service.category}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="mt-5 font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  {service.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Key Deliverables Highlight */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Deliverables
                  </div>
                  <ul className="space-y-2">
                    {service.deliverables.slice(0, 3).map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-slate-800 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions & Technologies */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md border border-slate-200/80 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {service.technologies.length > 3 && (
                    <span className="text-[11px] text-slate-400 self-center">
                      +{service.technologies.length - 3} more
                    </span>
                  )}
                </div>

                <button
                  id={`service-view-scope-btn-${service.id}`}
                  onClick={() => setSelectedService(service)}
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-slate-700 whitespace-nowrap self-start sm:self-auto"
                >
                  View Complete Scope
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Dialog */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onSelectForConsultation={(title) => onOpenConsultation(title)}
      />
    </section>
  );
};
