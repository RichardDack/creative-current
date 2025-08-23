// Data model interfaces for the Agentic design agency template

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
  tags: string[];
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
    email?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  duration?: string;
  icon: string; // Icon component name
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year' | 'project';
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
  description?: string;
}