// src/components/global/__tests__/StickyNavigationBar.integration.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StickyNavigationBar } from '../StickyNavigationBar';
import { NavigationProvider } from '@/contexts/NavigationContext';

// Mock dependencies
vi.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('@/components/ui/NavbarLogo', () => ({
  NavbarLogo: () => <div data-testid="navbar-logo">Logo</div>,
}));

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

// Mock navigation utilities
vi.mock('@/lib/utils/navigationUtils', () => ({
  generateNavigationLinks: () => ({
    navigationItems: [
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
    ],
    subNavigationItems: [],
  }),
  shouldShowStickyNav: () => true,
  markActiveNavigationItem: (items: any) => items,
}));

// Mock scroll detection hook
vi.mock('@/lib/hooks/useScrollDetection', () => ({
  useScrollDetection: () => ({
    isScrolledPastHero: true,
  }),
}));

describe('StickyNavigationBar Integration', () => {
  it('integrates properly with NavigationProvider context', () => {
    const TestComponent = () => {
      return (
        <NavigationProvider currentPage="homepage">
          <StickyNavigationBar
            isVisible={true}
            currentPage="homepage"
            navigationItems={[
              {
                id: 'work',
                name: 'WORK',
                href: '#work-section',
                type: 'anchor',
                isActive: false,
              },
            ]}
          />
        </NavigationProvider>
      );
    };

    render(<TestComponent />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('WORK')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-logo')).toBeInTheDocument();
  });

  it('renders correctly without NavigationProvider', () => {
    render(
      <StickyNavigationBar
        isVisible={true}
        currentPage="homepage"
        navigationItems={[
          {
            id: 'work',
            name: 'WORK',
            href: '#work-section',
            type: 'anchor',
            isActive: false,
          },
        ]}
      />
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('WORK')).toBeInTheDocument();
  });
});