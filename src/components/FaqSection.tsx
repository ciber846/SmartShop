import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Mail } from 'lucide-react';
import { FAQS, BUSINESS_INFO } from '../data/businessData.ts';

export const FaqSection: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="border-b border-slate-200 bg-[#fafafb] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
            <HelpCircle className="h-3.5 w-3.5 text-slate-700" />
            Clear Operational Transparency
          </div>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Frequently Answered Questions
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Answers regarding intellectual property governance, onboarding velocity, team integration, and security audits.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                id={`faq-item-${faq.id}`}
                className="rounded-xl border border-slate-200 bg-white transition-colors overflow-hidden"
              >
                <button
                  id={`faq-toggle-btn-${faq.id}`}
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="cursor-pointer w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50/70"
                >
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {faq.category}
                    </span>
                    <span className="font-display text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered question prompt */}
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 text-center shadow-2xs">
          <h4 className="text-sm font-bold text-slate-900">Have a specific RFP or procurement requirement?</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-lg mx-auto">
            Our legal and security team can execute vendor questionnaire assessments, SOC 2 compliance packages, and security bridge letters on request.
          </p>
          <div className="mt-4 flex justify-center">
            <a
              id="faq-direct-email-btn"
              href={`mailto:${BUSINESS_INFO.supportEmail}?subject=Enterprise%20Procurement%20Question`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              Direct Email to Solutions Desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
