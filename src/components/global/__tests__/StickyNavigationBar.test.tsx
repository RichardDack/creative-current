// src/components/global/__tests__/StickyNavigationBar.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StickyNavigationBar } from '../StickyNavigationBar';
import { NavigationItem, PageType } from '@/types/navigation';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { vi } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { vi } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { expect } from 'vitest';
import { expect } from 'vitest';
import { it } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { afterEach } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { beforeEach } from 'vitest';
import { describe } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock NavbarLogo component
vi.mock('@/components/ui/NavbarLogo', () => ({
  NavbarLogo: ({ size, variant, className }: any) => (
    <div 
      data-testid="navbar-logo" 
      data-size={size} 
      data-variant={variant}
      className={className}
    >
      Logo
    </div>
  ),
}));

// Mock CSS modules to avoid PostCSS issues in tests
vi.mock('@/styles/components/StickyNavigationBar.module.css', () => ({
  default: {
    stickyNavigationBar: 'stickyNavigationBar',
    navigationContent: 'navigationContent',
    logoSection: 'logoSection',
    logoLink: 'logoLink',
    logo: 'logo',
    mainNavigation: 'mainNavigation',
    subNavigation: 'subNavigation',
    subNavigationDivider: 'subNavigationDivider',
    navigationItem: 'navigationItem',
    active: 'active',
    subItem: 'subItem',
    itemText: 'itemText',
  }
}));

describe('StickyNavigationBar', () => {
  const mockNavigationItems: NavigationItem[] = [
    {
      id: 'work',
      name: 'WORK',
      href: '#work-section',
      type: 'anchor',
      isActive: false,
    },
    {
      id: 'about',
      name: 'ABOUT',
      href: '#meet-our-team',
      type: 'anchor',
      isActive: false,
    },
    {
      id: 'services',
      name: 'SERVICES',
      href: '/web-design',
      type: 'page',
      isActive: false,
    },
    {
      id: 'contact',
      name: 'CONTACT',
      href: '#footer-background',
      type: 'anchor',
      isActive: true,
    },
  ];

  const mockSubNavigationItems: NavigationItem[] = [
    {
      id: 'town1',
      name: 'Town 1',
      href: '/web-design/town1',
      type: 'page',
      isActive: false,
    },
    {
      id: 'town2',
      name: 'Town 2',
      href: '/web-design/town2',
      type: 'page',
      isActive: false,
    },
  ];

  const defaultProps = {
    isVisible: true,
    currentPage: 'homepage' as PageType,
    navigationItems: mockNavigationItems,
  };

  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = vi.fn();
    
    // Mock getElementById
    document.getElementById = vi.fn((id) => {
      if (id === 'work-section' || id === 'meet-our-team' || id === 'footer-background') {
        return {
          offsetTop: 1000,
        } as HTMLElement;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Visibility Logic', () => {
    it('renders when isVisible is true', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    it('does not render when isVisible is false', () => {
      render(<StickyNavigationBar {...defaultProps} isVisible={false} />);
      
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('applies correct CSS classes', () => {
      render(<StickyNavigationBar {...defaultProps} className="custom-class" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('stickyNavigationBar');
      expect(nav).toHaveClass('custom-class');
    });
  });

  describe('Navigation Item Rendering', () => {
    it('renders all navigation items', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      expect(screen.getByText('WORK')).toBeInTheDocument();
      expect(screen.getByText('ABOUT')).toBeInTheDocument();
      expect(screen.getByText('SERVICES')).toBeInTheDocument();
      expect(screen.getByText('CONTACT')).toBeInTheDocument();
    });

    it('renders navigation items with correct href attributes', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      expect(screen.getByText('WORK').closest('a')).toHaveAttribute('href', '#work-section');
      expect(screen.getByText('SERVICES').closest('a')).toHaveAttribute('href', '/web-design');
    });

    it('applies active class to active navigation items', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const contactItem = screen.getByText('CONTACT').closest('a');
      expect(contactItem).toHaveClass('active');
      
      const workItem = screen.getByText('WORK').closest('a');
      expect(workItem).not.toHaveClass('active');
    });

    it('sets aria-current for active items', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const contactItem = screen.getByText('CONTACT').closest('a');
      expect(contactItem).toHaveAttribute('aria-current', 'page');
      
      const workItem = screen.getByText('WORK').closest('a');
      expect(workItem).not.toHaveAttribute('aria-current');
    });
  });

  describe('Sub-navigation Rendering', () => {
    it('renders sub-navigation items when provided', () => {
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          subNavigationItems={mockSubNavigationItems} 
        />
      );
      
      expect(screen.getByText('Town 1')).toBeInTheDocument();
      expect(screen.getByText('Town 2')).toBeInTheDocument();
    });

    it('applies subItem class to sub-navigation items', () => {
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          subNavigationItems={mockSubNavigationItems} 
        />
      );
      
      const subItem = screen.getByText('Town 1').closest('a');
      expect(subItem).toHaveClass('subItem');
    });

    it('does not render sub-navigation section when no sub-items provided', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      expect(screen.queryByText('Town 1')).not.toBeInTheDocument();
    });
  });

  describe('Logo Section', () => {
    it('renders logo with correct props', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const logo = screen.getByTestId('navbar-logo');
      expect(logo).toHaveAttribute('data-size', '32');
      expect(logo).toHaveAttribute('data-variant', 'dark');
    });

    it('renders logo link with correct href and aria-label', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const logoLink = screen.getByLabelText('Creative Current - Go to homepage');
      expect(logoLink).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation Click Handling', () => {
    it('handles anchor link clicks with smooth scrolling on same page', async () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const workLink = screen.getByText('WORK').closest('a')!;
      fireEvent.click(workLink);
      
      await waitFor(() => {
        expect(window.scrollTo).toHaveBeenCalledWith({
          top: 920, // 1000 - 80 (header offset)
          behavior: 'smooth',
        });
      });
    });

    it('handles cross-page navigation for anchor links', () => {
      // Mock window.location.href
      delete (window as any).location;
      window.location = { href: '' } as any;
      
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          currentPage="web-design" 
        />
      );
      
      const workLink = screen.getByText('WORK').closest('a')!;
      fireEvent.click(workLink);
      
      expect(window.location.href).toBe('/#work-section');
    });

    it('does not prevent default for page navigation links', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const servicesLink = screen.getByText('SERVICES').closest('a')!;
      const clickEvent = new MouseEvent('click', { bubbles: true });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');
      
      fireEvent(servicesLink, clickEvent);
      
      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('handles missing target elements gracefully', async () => {
      document.getElementById = vi.fn(() => null);
      
      render(<StickyNavigationBar {...defaultProps} />);
      
      const workLink = screen.getByText('WORK').closest('a')!;
      fireEvent.click(workLink);
      
      // Should not throw error and not call scrollTo
      await waitFor(() => {
        expect(window.scrollTo).not.toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Main navigation');
    });

    it('supports keyboard navigation', () => {
      render(<StickyNavigationBar {...defaultProps} />);
      
      const firstLink = screen.getByText('WORK').closest('a')!;
      firstLink.focus();
      
      expect(document.activeElement).toBe(firstLink);
    });
  });

  describe('Different Page Types', () => {
    it('handles homepage navigation correctly', () => {
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          currentPage="homepage" 
        />
      );
      
      const workLink = screen.getByText('WORK').closest('a')!;
      fireEvent.click(workLink);
      
      expect(window.scrollTo).toHaveBeenCalled();
    });

    it('handles web-design page navigation correctly', () => {
      delete (window as any).location;
      window.location = { href: '' } as any;
      
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          currentPage="web-design" 
        />
      );
      
      const workLink = screen.getByText('WORK').closest('a')!;
      fireEvent.click(workLink);
      
      expect(window.location.href).toBe('/#work-section');
    });

    it('handles town page navigation correctly', () => {
      delete (window as any).location;
      window.location = { href: '' } as any;
      
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          currentPage="town" 
        />
      );
      
      const aboutLink = screen.getByText('ABOUT').closest('a')!;
      fireEvent.click(aboutLink);
      
      expect(window.location.href).toBe('/#meet-our-team');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty navigation items array', () => {
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          navigationItems={[]} 
        />
      );
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.queryByText('WORK')).not.toBeInTheDocument();
    });

    it('handles navigation items without isActive property', () => {
      const itemsWithoutActive = mockNavigationItems.map(item => {
        const { isActive, ...rest } = item;
        return rest;
      }) as NavigationItem[];
      
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          navigationItems={itemsWithoutActive} 
        />
      );
      
      expect(screen.getByText('WORK')).toBeInTheDocument();
    });

    it('handles external navigation items', () => {
      const externalItem: NavigationItem = {
        id: 'external',
        name: 'EXTERNAL',
        href: 'https://example.com',
        type: 'external',
        isActive: false,
      };
      
      render(
        <StickyNavigationBar 
          {...defaultProps} 
          navigationItems={[externalItem]} 
        />
      );
      
      const externalLink = screen.getByText('EXTERNAL').closest('a')!;
      expect(externalLink).toHaveAttribute('href', 'https://example.com');
    });
  });
});