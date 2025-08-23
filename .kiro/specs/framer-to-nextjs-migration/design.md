# Design Document

## Overview

This design outlines the migration of a Framer-exported "Agentic" design agency template to a modern Next.js application. The migration will preserve all visual elements, animations, and interactions while creating a maintainable, performant React codebase. The design leverages the existing Next.js project structure and incorporates Framer Motion for animations, CSS Modules for styling, and TypeScript for type safety.

## Architecture

### Technology Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript 5+
- **Styling**: CSS Modules + CSS Custom Properties (Design Tokens)
- **Animations**: Framer Motion 12+
- **Images**: Next.js Image component with optimization
- **Fonts**: next/font for Google Fonts optimization
- **Deployment**: Vercel (Free Tier)

### Project Structure
```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # Global styles and design tokens
│   ├── layout.tsx          # Root layout with fonts and meta
│   └── page.tsx            # Main landing page
├── components/
│   ├── global/             # Site-wide components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Footer.tsx      # Site footer
│   │   └── Layout.tsx      # Page wrapper
│   ├── sections/           # Page sections
│   │   ├── Hero.tsx        # Hero section with main title
│   │   ├── WorkSection.tsx # Portfolio/work showcase
│   │   ├── AboutSection.tsx# About and team section
│   │   ├── ServicesSection.tsx # Services timeline
│   │   └── PricingSection.tsx  # Pricing plans
│   ├── ui/                 # Reusable UI components
│   │   ├── WorkCard.tsx    # Individual work item
│   │   ├── TeamMember.tsx  # Team member profile
│   │   ├── ServiceCard.tsx # Service offering card
│   │   ├── PricingCard.tsx # Pricing plan card
│   │   └── Button.tsx      # Reusable button component
│   └── icons/              # SVG icon components
│       ├── BrowserIcon.tsx # Browser window icon
│       ├── CheckIcon.tsx   # Checkmark icon
│       ├── LoadingIcon.tsx # Loading spinner icon
│       └── index.ts        # Barrel exports
├── lib/
│   ├── animations/         # Animation configurations
│   │   ├── variants.ts     # Framer Motion variants
│   │   └── transitions.ts  # Animation transitions
│   ├── data/               # Static content data
│   │   ├── work-projects.ts# Portfolio projects
│   │   ├── team-members.ts # Team information
│   │   ├── services.ts     # Service offerings
│   │   └── pricing.ts      # Pricing plans
│   └── utils/
│       ├── cn.ts           # Class name utility
│       └── constants.ts    # App constants
├── styles/
│   ├── tokens.css          # Design system tokens
│   └── components/         # Component-specific CSS Modules
│       ├── Header.module.css
│       ├── Hero.module.css
│       ├── WorkCard.module.css
│       └── [component].module.css
└── types/
    ├── components.ts       # Component prop types
    └── data.ts            # Data structure types
```

## Components and Interfaces

### Core Layout Components

#### Header Component
```typescript
interface HeaderProps {
  variant?: 'light' | 'dark';
  fixed?: boolean;
}

export const Header: React.FC<HeaderProps>
```
- Fixed positioning with backdrop blur
- Responsive navigation menu
- Logo integration
- Smooth scroll navigation links

#### Footer Component
```typescript
export const Footer: React.FC
```
- Contact information
- Social media links
- Copyright and legal text

### Section Components

#### Hero Section
```typescript
interface HeroProps {
  title: string;
  subtitle: string;
  backgroundElements?: React.ReactNode;
}

export const Hero: React.FC<HeroProps>
```
- Large title with slide-in animation (x: 192 → 0)
- Subtitle with opposite slide animation
- Animated background blur elements
- Responsive typography scaling

#### Work Section
```typescript
interface WorkSectionProps {
  projects: WorkProject[];
  title: string;
}

export const WorkSection: React.FC<WorkSectionProps>
```
- Grid layout for project cards
- Staggered animation entrance
- Scroll-triggered animations
- Responsive grid (1-2-3 columns)

#### About Section
```typescript
interface AboutSectionProps {
  description: string;
  teamMembers: TeamMember[];
}

export const AboutSection: React.FC<AboutSectionProps>
```
- Company description
- Team member profiles
- Complex scale and slide animations
- Image optimization for team photos

### UI Components

#### Work Card
```typescript
interface WorkCardProps {
  project: WorkProject;
  index: number;
  onHover?: () => void;
}

export const WorkCard: React.FC<WorkCardProps>
```
- Project image with Next.js Image optimization
- Hover scale animation (scale: 1 → 1.02)
- Category and duration display
- Staggered entrance animation

#### Team Member
```typescript
interface TeamMemberProps {
  member: TeamMember;
  variant?: 'default' | 'compact';
}

export const TeamMember: React.FC<TeamMemberProps>
```
- Profile image with optimization
- Name, title, and quote
- Social media links
- Hover interactions

### Icon Components

All SVG icons will be converted to React components with consistent interfaces:

```typescript
interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export const BrowserIcon: React.FC<IconProps>
export const CheckIcon: React.FC<IconProps>
export const LoadingIcon: React.FC<IconProps>
```

## Data Models

### Core Data Types

```typescript
// Work Project
interface WorkProject {
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

// Team Member
interface TeamMember {
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

// Service Offering
interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
  features: string[];
  duration?: string;
}

// Pricing Plan
interface PricingPlan {
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
```

## Animation System

### Design Tokens for Animations

Based on the original Framer animation data, the following animation variants will be implemented:

```typescript
// Primary slide animations (from Framer data)
export const slideInLeft: Variants = {
  initial: { x: -192, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
};

export const slideInRight: Variants = {
  initial: { x: 192, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
};

// Scroll-triggered animations
export const slideInUp: Variants = {
  initial: { y: -40, opacity: 0.001 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 40
    }
  }
};

// Stagger container for work cards
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Complex scale and slide (for about section)
export const scaleAndSlide: Variants = {
  initial: { scale: 0.1, x: -96, opacity: 0 },
  animate: {
    scale: 1,
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 30
    }
  }
};
```

### Animation Configuration

```typescript
// Spring configurations matching Framer
export const springConfig = {
  type: "spring" as const,
  stiffness: 200,
  damping: 30
};

export const quickSpring = {
  type: "spring" as const,
  stiffness: 450,
  damping: 90
};

// Accessibility considerations
export const getAnimationProps = () => {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return {
    initial: prefersReducedMotion ? false : "initial",
    animate: prefersReducedMotion ? false : "animate",
    transition: prefersReducedMotion ? { duration: 0 } : undefined
  };
};
```

## Styling System

### Design Tokens

All original Framer CSS custom properties will be converted to semantic CSS variables:

```css
:root {
  /* Colors (from original Framer tokens) */
  --color-primary: rgb(49, 175, 180);           /* token-633663d4 */
  --color-background-dark: rgb(14, 26, 36);     /* token-51170b41 */
  --color-background-light: rgb(20, 33, 45);    /* token-e76238c2 */
  --color-text-muted: rgb(186, 189, 198);       /* token-dd3bc34b */
  --color-border-light: rgb(230, 230, 230);     /* token-cf55a365 */
  --color-accent-red: rgb(180, 54, 49);         /* token-da3bfa35 */
  
  /* Typography */
  --font-display: "Inter Tight", sans-serif;
  --font-body: "Plus Jakarta Sans", sans-serif;
  --font-headline: "Wix Madefor Display", sans-serif;
  
  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  --space-3xl: 4rem;
  
  /* Breakpoints */
  --breakpoint-mobile: 390px;
  --breakpoint-tablet: 810px;
  --breakpoint-desktop: 1200px;
  
  /* Animation */
  --duration-fast: 0.2s;
  --duration-normal: 0.3s;
  --duration-slow: 0.6s;
  --ease-out: cubic-bezier(0.44, 0, 0.56, 1);
}
```

### CSS Modules Structure

Each component will have its own CSS module following this pattern:

```css
/* Hero.module.css */
.hero {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: var(--space-3xl) var(--space-lg);
  overflow: hidden;
}

.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 1;
  color: var(--color-primary);
  margin-bottom: var(--space-lg);
}

.blurElement {
  position: absolute;
  top: 20%;
  right: 10%;
  width: 200px;
  height: 200px;
  background: var(--color-primary);
  border-radius: 1rem;
  filter: blur(60px);
  opacity: 0.3;
  transform: rotate(20deg);
  z-index: -1;
}

/* Responsive adjustments */
@media (max-width: 809px) {
  .hero {
    padding: var(--space-2xl) var(--space-md);
    text-align: center;
  }
  
  .description {
    max-width: 100%;
  }
}
```

## Error Handling

### Component Error Boundaries

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ComponentErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  // Error boundary implementation for graceful degradation
}
```

### Animation Fallbacks

- Detect `prefers-reduced-motion` and disable animations
- Provide static fallbacks for all animated elements
- Graceful degradation for older browsers

### Image Loading

- Placeholder images for failed loads
- Progressive loading with blur-up effect
- Responsive image sizing with proper aspect ratios

## Testing Strategy

### Component Testing
- Unit tests for all components using Jest and React Testing Library
- Visual regression testing for design consistency
- Accessibility testing with axe-core

### Animation Testing
- Test animation variants and transitions
- Verify reduced motion preferences are respected
- Performance testing for animation smoothness

### Integration Testing
- End-to-end testing with Playwright
- Cross-browser compatibility testing
- Mobile responsiveness testing

### Performance Testing
- Lighthouse CI integration
- Core Web Vitals monitoring
- Bundle size analysis

## Performance Optimization

### Image Optimization
- Next.js Image component with proper sizing
- WebP/AVIF format support
- Lazy loading for below-fold images
- Responsive image sets

### Font Optimization
- next/font for Google Fonts optimization
- Font display: swap for better loading
- Preload critical fonts

### Bundle Optimization
- Code splitting by route and component
- Tree shaking for unused code
- Dynamic imports for heavy components
- Framer Motion optimization with optimizePackageImports

### Animation Performance
- Use transform properties for better performance
- will-change property management
- Reduced motion preferences
- GPU acceleration for smooth animations

## Accessibility

### WCAG Compliance
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus management for animations

### Screen Reader Support
- Semantic HTML structure
- ARIA labels where needed
- Skip links for navigation
- Descriptive link text

### Motion Accessibility
- Respect prefers-reduced-motion
- Provide static alternatives
- Ensure animations don't cause seizures
- Timeout controls for auto-playing content