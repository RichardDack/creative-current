# Design Document

## Overview

The web-design page redesign addresses critical UX issues including hero centering problems, poor text contrast on location elements, card layout overflow, and JavaScript DOM manipulation errors on town pages. The design focuses on improving accessibility, visual hierarchy, responsive behavior, and error-free navigation while maintaining the existing brand identity and performance standards.

## Architecture

### Component Structure
The redesign maintains the existing component architecture but enhances styling and layout logic:

```
WebDesignPage
├── Layout (unchanged)
├── WebDesignHero (enhanced centering & responsive)
├── TownLinksSection (improved contrast & grid layout)
├── WebDesignServicesSection (fixed card overflow)
└── ContactSection (unchanged)

TownPages ([town])
├── Layout (unchanged)
├── LocalBreadcrumbs (unchanged)
├── LocalHero (enhanced contrast)
├── LocalServicesSection (improved readability)
├── LocalIndustriesSection (enhanced contrast)
├── LocalTestimonialsSection (unchanged)
├── LocalFAQSection (unchanged)
└── ContactSection (unchanged)
```

### Design System Enhancements
- **Contrast Ratios**: All text will meet WCAG AA standards (4.5:1 minimum)
- **Responsive Grid**: CSS Grid with proper fallbacks and overflow handling
- **Color Palette**: Enhanced teal/white combinations with proper background treatments
- **Typography**: Maintained hierarchy with improved readability

## Components and Interfaces

### 1. WebDesignHero Component Enhancements

**Current Issues:**
- Hero content not properly centered
- Inconsistent responsive behavior

**Design Solution:**
```css
.webDesignHero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
}

.heroContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}
```

**Key Changes:**
- Use flexbox for perfect centering
- Ensure content container is centered both horizontally and vertically
- Improve responsive scaling with better clamp() values

### 2. TownLinksSection Component Enhancements

**Current Issues:**
- Location text hard to read against white backgrounds
- Cards may overflow on certain screen sizes

**Design Solution:**
```css
.townCard {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(49, 175, 180, 0.2);
  color: var(--color-text-dark);
}

.townName {
  color: var(--color-text-dark);
}

.townGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-xl);
  max-width: 100%;
  overflow: hidden;
}
```

**Key Changes:**
- Increase background opacity for better contrast
- Use dark text on light backgrounds
- Implement proper grid constraints to prevent overflow
- Add container max-width and overflow handling

### 3. WebDesignServicesSection Component Enhancements

**Current Issues:**
- 4 service cards cause spillover on medium screens
- Inconsistent card heights

**Design Solution:**
```css
.servicesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-2xl);
  max-width: 100%;
}

@media (max-width: 1200px) {
  .servicesGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .servicesGrid {
    grid-template-columns: 1fr;
  }
}

.serviceCard {
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
```

**Key Changes:**
- Implement responsive breakpoints for 4→2→1 column layout
- Use flexbox within cards for consistent heights
- Add explicit max-width constraints

### 4. Town Page Error Resolution

**Current Issues:**
- JavaScript removeChild errors on navigation
- DOM manipulation conflicts

**Design Solution:**
The errors appear to be related to React hydration and component mounting/unmounting. The fix involves:

1. **Proper Error Boundaries**: Add error boundaries around dynamic content
2. **Conditional Rendering**: Ensure components only render when data is available
3. **Key Props**: Add proper key props to prevent React reconciliation issues

```tsx
// Enhanced error handling in town pages
export default async function TownPage({ params }: PageProps) {
  const { town } = await params;
  
  if (!dorseyTowns[town]) {
    notFound();
  }

  return (
    <Layout>
      <ErrorBoundary fallback={<div>Error loading content</div>}>
        {/* Component content with proper keys */}
      </ErrorBoundary>
    </Layout>
  );
}
```

### 5. Enhanced Color Contrast System

**Current Issues:**
- White and teal text combinations fail accessibility standards
- Poor readability on various backgrounds

**Design Solution:**
```css
:root {
  --color-text-on-light: #1a1a1a;
  --color-text-on-dark: #ffffff;
  --color-text-on-teal: #ffffff;
  --color-teal-accessible: #0d7377;
  --color-background-overlay: rgba(0, 0, 0, 0.7);
}

.textOnLight {
  color: var(--color-text-on-light);
}

.textOnDark {
  color: var(--color-text-on-dark);
}

.textOverlay {
  position: relative;
}

.textOverlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-background-overlay);
  z-index: -1;
}
```

## Data Models

### Enhanced CSS Custom Properties
```css
:root {
  /* Enhanced spacing for better layouts */
  --container-max-width: 1200px;
  --grid-gap-responsive: clamp(1rem, 3vw, 2rem);
  
  /* Improved color contrast ratios */
  --color-primary-accessible: #0d7377;
  --color-text-high-contrast: #000000;
  --color-background-high-contrast: #ffffff;
  
  /* Responsive typography */
  --font-size-hero: clamp(2.5rem, 5vw, 4rem);
  --font-size-section: clamp(1.5rem, 3vw, 2.5rem);
}
```

### Responsive Breakpoint System
```css
/* Mobile First Approach */
@media (min-width: 480px) { /* Small mobile */ }
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
```

## Error Handling

### JavaScript Error Prevention
1. **Null Checks**: Add proper null/undefined checks before DOM manipulation
2. **Error Boundaries**: Implement React error boundaries for graceful degradation
3. **Conditional Rendering**: Only render components when data is fully loaded
4. **Key Props**: Ensure proper React keys to prevent reconciliation issues

### CSS Error Prevention
1. **Fallback Values**: Provide fallback values for CSS custom properties
2. **Progressive Enhancement**: Ensure basic functionality without advanced CSS features
3. **Container Queries**: Use container queries where supported, with fallbacks

## Testing Strategy

### Visual Regression Testing
- Test hero centering across different viewport sizes
- Verify card layouts don't overflow on various screen sizes
- Validate text contrast ratios meet accessibility standards

### Accessibility Testing
- WCAG AA compliance verification
- Screen reader compatibility
- Keyboard navigation testing
- Color contrast ratio validation (minimum 4.5:1)

### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge compatibility
- Mobile browser testing (iOS Safari, Chrome Mobile)
- Progressive enhancement verification

### Performance Testing
- Lighthouse accessibility scores
- Core Web Vitals impact assessment
- Bundle size impact analysis

### Error Handling Testing
- Navigation between town pages
- Component mounting/unmounting
- Error boundary functionality
- Graceful degradation scenarios

## Implementation Approach

### Phase 1: CSS Fixes
1. Fix hero centering with flexbox
2. Improve text contrast ratios
3. Resolve card overflow issues
4. Enhance responsive breakpoints

### Phase 2: JavaScript Error Resolution
1. Add error boundaries
2. Improve component key management
3. Enhance conditional rendering
4. Add proper null checks

### Phase 3: Accessibility Enhancements
1. Implement WCAG AA compliance
2. Add proper ARIA labels
3. Enhance keyboard navigation
4. Improve screen reader support

### Phase 4: Testing & Validation
1. Cross-browser testing
2. Accessibility audit
3. Performance impact assessment
4. User acceptance testing