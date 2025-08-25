// types/data.ts - FIXED VERSION (Remove duplicates)

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  image: string;
  thumbnail?: string;
  description?: string;
  link?: string;
  tags?: string[]; // Made optional
  isCTA?: boolean; // Added for CTA cards
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    instagram?: string;
    email?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  name?: string; // Alternative name property
  description: string;
  features: string[];
  duration?: string;
  icon: string;
  startingPrice?: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number | string;
  period: 'month' | 'year' | 'project';
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  description?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

// Navigation and UI Types
export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
  budget?: string;
}