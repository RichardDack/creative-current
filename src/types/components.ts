export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  client: string;
  duration: string;
  image: string;
  link?: string;
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
  };
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  popular?: boolean;
  ctaText: string;
  ctaLink: string;
}
