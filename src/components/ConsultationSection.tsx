import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, Shield, Download, ArrowRight, Building, Mail, Phone, User, FileText } from 'lucide-react';
import { ConsultationFormData } from '../types.ts';
import { BUSINESS_INFO } from '../data/businessData.ts';

interface ConsultationSectionProps {
  initialInquiryType?: string;
  initialBudget?: string;
  initialSummary?: string;
}

export const ConsultationSection: React.FC<ConsultationSectionProps> = ({
  initialInquiryType = '',
  initialBudget = '',
  initialSummary = '',
}) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    email: '',
    companyName: '',
    phone: '',
    inquiryType: initialInquiryType || 'Custom Product & Platform Engineering',
    budgetBracket: initialBudget || '$50,000 – $100,000',
    estimatedTimeline: '1 Month',
    preferredDate: '',
    preferredTime: '10:30 AM EST',
    projectSummary: initialSummary || '',
    ndaRequired: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Sync external prefill triggers
  useEffect(() => {
    if (initialInquiryType) {
      setFormData((prev) => ({ ...prev, inquiryType: initialInquiryType }));
    }
    if (initialBudget) {
      setFormData((prev) => ({ ...prev, budgetBracket: initialBudget }));
    }
    if (initialSummary) {
      setFormData((prev) => ({ ...prev, projectSummary: initialSummary }));
    }
  }, [initialInquiryType, initialBudget, initialSummary]);

  // Set default preferred date to tomorrow's business day
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const dateStr = today.toISOString().split('T')[0];
    setFormData((prev) => ({ ...prev, preferredDate: dateStr }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.companyName.trim()) {
      setErrorMessage('Please provide your name, professional email, and company.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMessage('Please provide a valid corporate email address.');
      return;
    }

    setErrorMessage('');
    const randomRef = 'MRD-' + Math.floor(1000 + Math.random() * 9000) + '-REV';
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Meridian Advisory Group//Consultation Scheduler//EN',
      'BEGIN:VEVENT',
      `UID:${bookingRef}@meridianpartners.example`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:Meridian Strategic Consultation: ${formData.companyName}`,
      `DESCRIPTION:Scope discussion regarding ${formData.inquiryType}. Reference ID: ${bookingRef}`,
      'LOCATION:Google Meet / Zoom Conference',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Meridian-Consultation-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      companyName: '',
      phone: '',
      inquiryType: 'Custom Product & Platform Engineering',
      budgetBracket: '$50,000 – $100,000',
      estimatedTimeline: '1 Month',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:30 AM EST',
      projectSummary: '',
      ndaRequired: true,
    });
  };

  return (
    <section id="contact" className="border-b border-slate-200 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-800">
                <Calendar className="h-3.5 w-3.5 text-slate-700" />
                Strategic Discovery
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
                Schedule a confidential consultation.
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Connect directly with a Senior Partner and Lead Solutions Architect. We review project objectives, discuss architecture trade-offs, and establish procurement timelines.
              </p>
            </div>

            {/* Direct Channel Details */}
            <div className="rounded-xl border border-slate-200 bg-[#fafafb] p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Contact Desks
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-slate-700 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Inquiry & RFP Submissions</div>
                  <a
                    href={`mailto:${BUSINESS_INFO.supportEmail}`}
                    className="text-xs text-slate-600 hover:text-slate-950 underline decoration-slate-300"
                  >
                    {BUSINESS_INFO.supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <Phone className="h-4 w-4 text-slate-700 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Direct Partner Line</div>
                  <a
                    href={`tel:${BUSINESS_INFO.directPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs text-slate-600 hover:text-slate-950 underline decoration-slate-300"
                  >
                    {BUSINESS_INFO.directPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60">
                <Clock className="h-4 w-4 text-slate-700 mt-1" />
                <div>
                  <div className="text-xs font-bold text-slate-900">Advisory Desk SLA</div>
                  <div className="text-xs text-slate-600">
                    Responses delivered within 2 business hours.
                  </div>
                </div>
              </div>
            </div>

            {/* Confidentiality notice */}
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600 flex items-start gap-3">
              <Shield className="h-5 w-5 text-slate-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900">Guaranteed Confidentiality:</span> All discussions, technical specifications, and documents shared are protected under standard mutual non-disclosure agreements prior to initiation.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form or Success Card */}
          <div className="lg:col-span-7">
            {submitted ? (
              /* Success Confirmation Card */
              <div
                id="consultation-success-card"
                className="rounded-xl border border-slate-200 bg-white p-8 shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-slate-950">
                      Consultation Request Confirmed
                    </h3>
                    <p className="text-xs text-slate-500">
                      Reference ID: <span className="font-mono font-bold text-slate-900">{bookingRef}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4 text-xs text-slate-700">
                  <p className="text-sm text-slate-800 leading-relaxed">
                    Thank you, <span className="font-bold">{formData.fullName}</span>. Your discovery session for <span className="font-bold">{formData.companyName}</span> has been dispatched to our practice leads.
                  </p>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Requested Practice:</span>
                      <span className="font-bold text-slate-900">{formData.inquiryType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled Date & Time:</span>
                      <span className="font-bold text-slate-900">
                        {formData.preferredDate} at {formData.preferredTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Budget Bracket:</span>
                      <span className="font-bold text-slate-900">{formData.budgetBracket}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mutual NDA Status:</span>
                      <span className="font-bold text-emerald-700">
                        {formData.ndaRequired ? 'NDA Package Attached to Confirmation' : 'Standard Advisory Terms'}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs leading-relaxed">
                    A confirmation email and Google Meet / Zoom invitation has been sent to <span className="font-semibold text-slate-900">{formData.email}</span>. One of our lead partners will connect within 2 business hours with preparation materials.
                  </p>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-slate-200">
                  <button
                    id="download-calendar-invite-btn"
                    type="button"
                    onClick={handleDownloadCalendar}
                    className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4" />
                    Download Calendar Event (.ics)
                  </button>

                  <button
                    id="schedule-another-btn"
                    type="button"
                    onClick={handleResetForm}
                    className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              /* The Working Form */
              <form
                id="consultation-form"
                onSubmit={handleSubmit}
                className="rounded-xl border border-slate-200 bg-[#fafafb] p-6 sm:p-8 shadow-xs space-y-6"
              >
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    Project Intake & Scheduling Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your organizational scope to receive a scoped briefing document.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    id="form-error-banner"
                    className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-800"
                  >
                    {errorMessage}
                  </div>
                )}

                {/* Contact Identity Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      Full Name *
                    </label>
                    <input
                      id="input-full-name"
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Katherine Hayes"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-500" />
                      Work Email *
                    </label>
                    <input
                      id="input-work-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="katherine@enterprise.com"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    />
                  </div>
                </div>

                {/* Company & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Building className="h-3.5 w-3.5 text-slate-500" />
                      Company / Organization *
                    </label>
                    <input
                      id="input-company-name"
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="e.g. Acme Corporation"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-500" />
                      Phone Number (Optional)
                    </label>
                    <input
                      id="input-phone-number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden"
                    />
                  </div>
                </div>

                {/* Practice & Budget Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Primary Practice Focus
                    </label>
                    <select
                      id="select-inquiry-type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden cursor-pointer"
                    >
                      <option value="Enterprise Digital Strategy & Modernization">
                        Enterprise Digital Strategy & Modernization
                      </option>
                      <option value="Custom Product & Platform Engineering">
                        Custom Product & Platform Engineering
                      </option>
                      <option value="Cloud Infrastructure, Security & DevOps">
                        Cloud Infrastructure, Security & DevOps
                      </option>
                      <option value="Enterprise Data Platforms & Business Intelligence">
                        Enterprise Data Platforms & Business Intelligence
                      </option>
                      <option value="Technical Architecture Audit & Code Review">
                        Technical Architecture Audit & Code Review
                      </option>
                      <option value="Executive Advisory Retainer">
                        Executive Advisory Retainer
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Estimated Investment Allocation
                    </label>
                    <select
                      id="select-budget-bracket"
                      name="budgetBracket"
                      value={formData.budgetBracket}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden cursor-pointer"
                    >
                      <option value="$25,000 – $50,000">$25,000 – $50,000 (Discovery / Audit)</option>
                      <option value="$50,000 – $100,000">$50,000 – $100,000 (Targeted MVP / Sprint)</option>
                      <option value="$100,000 – $250,000">$100,000 – $250,000 (Core Platform Build)</option>
                      <option value="$250,000+">$250,000+ (Multi-Squad Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Scheduling Preference Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      Preferred Consultation Date
                    </label>
                    <input
                      id="input-preferred-date"
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      Preferred Meeting Slot
                    </label>
                    <select
                      id="select-preferred-time"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden cursor-pointer"
                    >
                      <option value="09:00 AM EST">09:00 AM EST (Morning)</option>
                      <option value="11:30 AM EST">11:30 AM EST (Late Morning)</option>
                      <option value="02:00 PM EST">02:00 PM EST (Afternoon)</option>
                      <option value="04:30 PM EST">04:30 PM EST (Late Afternoon)</option>
                    </select>
                  </div>
                </div>

                {/* Project Brief / Notes */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-slate-500" />
                    Project Context or Specific Problem Statement
                  </label>
                  <textarea
                    id="textarea-project-summary"
                    name="projectSummary"
                    rows={3}
                    value={formData.projectSummary}
                    onChange={handleChange}
                    placeholder="Briefly describe key objectives, current tech stack, or anticipated deadlines..."
                    className="w-full rounded-lg border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-hidden"
                  />
                </div>

                {/* Mutual NDA Checkbox */}
                <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-3">
                  <input
                    id="checkbox-nda-required"
                    type="checkbox"
                    name="ndaRequired"
                    checked={formData.ndaRequired}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                  />
                  <label htmlFor="checkbox-nda-required" className="text-xs text-slate-700 cursor-pointer">
                    <span className="font-bold text-slate-900">Execute mutual NDA</span> prior to technical disclosure and roadmap review.
                  </label>
                </div>

                {/* Submit Action */}
                <div>
                  <button
                    id="submit-consultation-form-btn"
                    type="submit"
                    className="cursor-pointer w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-slate-800 transition-colors whitespace-nowrap"
                  >
                    Confirm & Schedule Discovery Session
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Zero obligation. Direct conversation with practicing architects, not sales account reps.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
