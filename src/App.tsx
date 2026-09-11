import { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { CostEstimator } from './components/CostEstimator.tsx';
import { CaseStudiesSection } from './components/CaseStudiesSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { ConsultationSection } from './components/ConsultationSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { Footer } from './components/Footer.tsx';

export default function App() {
  const [inquiryPrefill, setInquiryPrefill] = useState<{
    inquiryType: string;
    budget: string;
    summary: string;
  }>({
    inquiryType: '',
    budget: '',
    summary: '',
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultation = (servicePreset?: string) => {
    if (servicePreset) {
      setInquiryPrefill((prev) => ({
        ...prev,
        inquiryType: servicePreset,
      }));
    }
    scrollToSection('contact');
  };

  const handleApplyEstimate = (data: {
    serviceName: string;
    estimatedCost: string;
    timelineWeeks: number;
    teamTier: string;
    summary: string;
  }) => {
    setInquiryPrefill({
      inquiryType: data.serviceName,
      budget: data.estimatedCost,
      summary: `Estimated via Project Scope Calculator:\n${data.summary}\nTarget Budget: ${data.estimatedCost}`,
    });
    scrollToSection('contact');
  };

  const handleSelectPricingPlan = (planName: string, billingCycle: 'monthly' | 'annual') => {
    setInquiryPrefill({
      inquiryType: `Engagement Model: ${planName} (${billingCycle})`,
      budget: planName.includes('Advisory')
        ? '$25,000 – $50,000'
        : planName.includes('Dedicated')
        ? '$50,000 – $100,000'
        : '$100,000 – $250,000',
      summary: `Inquiry regarding the ${planName} package on a ${billingCycle} commercial structure.`,
    });
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafb] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Sticky Global Navigation */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Editorial Value Proposition & Credentials */}
        <HeroSection
          onOpenConsultation={() => handleOpenConsultation()}
          onScrollToSection={scrollToSection}
        />

        {/* 4 Core Practices Matrix with Scope Details */}
        <ServicesSection
          onOpenConsultation={(preset) => handleOpenConsultation(preset)}
        />

        {/* Interactive Scope & Financial Estimator */}
        <CostEstimator onApplyEstimateToInquiry={handleApplyEstimate} />

        {/* Quantified Enterprise Case Studies */}
        <CaseStudiesSection
          onScheduleConsultation={() => handleOpenConsultation()}
        />

        {/* Standard Commercial Packages & Billing Toggle */}
        <PricingSection onSelectPlan={handleSelectPricingPlan} />

        {/* Executive Endorsements & Social Proof */}
        <TestimonialsSection />

        {/* Interactive Consultation Scheduler & Intake */}
        <ConsultationSection
          initialInquiryType={inquiryPrefill.inquiryType}
          initialBudget={inquiryPrefill.budget}
          initialSummary={inquiryPrefill.summary}
        />

        {/* Frequently Answered Questions Accordion */}
        <FaqSection />
      </main>

      {/* Global Corporate Footer */}
      <Footer
        onScrollToSection={scrollToSection}
        onOpenConsultation={() => handleOpenConsultation()}
      />
    </div>
  );
}
