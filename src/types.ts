export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  deliverables: string[];
  timeline: string;
  engagementModel: string;
  technologies: string[];
  iconName: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: 'FinTech' | 'Healthcare' | 'Logistics' | 'Enterprise SaaS' | 'Clean Energy';
  summary: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
  }[];
  duration: string;
  technologies: string[];
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  industry: string;
  year: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  headline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  bestFor: string;
  commitment: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  companyName: string;
  phone: string;
  inquiryType: string;
  budgetBracket: string;
  estimatedTimeline: string;
  preferredDate: string;
  preferredTime: string;
  projectSummary: string;
  ndaRequired: boolean;
}

export interface EstimatorState {
  serviceId: string;
  scopeDurationWeeks: number;
  teamSeniority: 'standard' | 'senior' | 'principal';
  velocity: 'standard' | 'accelerated' | 'priority';
  addOns: string[];
}
