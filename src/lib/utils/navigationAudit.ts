// src/lib/utils/navigationAudit.ts - Navigation link audit and testing utilities

/**
 * Comprehensive navigation audit utilities for testing and validation
 */

export interface NavigationAuditResult {
  totalLinks: number;
  validLinks: number;
  brokenLinks: number;
  issues: NavigationIssue[];
  recommendations: string[];
}

export interface NavigationIssue {
  type: 'missing-target' | 'incorrect-href' | 'cross-page-issue' | 'seo-issue';
  severity: 'error' | 'warning' | 'info';
  element: string;
  currentHref: string;
  suggestedFix?: string;
  description: string;
}

/**
 * Audit all navigation links on the current page
 * @returns Comprehensive audit result
 */
export function auditNavigationLinks(): NavigationAuditResult {
  const result: NavigationAuditResult = {
    totalLinks: 0,
    validLinks: 0,
    brokenLinks: 0,
    issues: [],
    recommendations: []
  };

  if (typeof document === 'undefined') {
    return result;
  }

  // Find all navigation-related links
  const selectors = [
    'nav a',
    '[role="navigation"] a',
    'a[href^="#"]',
    '.hero a',
    '.navigation a',
    '.mobile-nav a',
    '.sticky-nav a'
  ];

  const allLinks = new Set<Element>();
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(link => allLinks.add(link));
  });

  result.totalLinks = allLinks.size;

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkText = link.textContent?.trim() || '';
    const elementDescription = `${link.tagName.toLowerCase()}[href="${href}"] "${linkText}"`;

    // Check anchor links
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (!targetElement) {
        result.brokenLinks++;
        result.issues.push({
          type: 'missing-target',
          severity: 'error',
          element: elementDescription,
          currentHref: href,
          suggestedFix: getSuggestedFix(targetId),
          description: `Anchor link points to non-existent element with ID "${targetId}"`
        });
      } else {
        result.validLinks++;
      }
    }
    // Check page links
    else if (href.startsWith('/')) {
      result.validLinks++; // Assume page links are valid for now
      
      // Check for SEO issues
      if (href === '/web-design' && !link.getAttribute('title')) {
        result.issues.push({
          type: 'seo-issue',
          severity: 'info',
          element: elementDescription,
          currentHref: href,
          description: 'Consider adding a title attribute for better SEO'
        });
      }
    }
    // Check cross-page anchor links
    else if (href.startsWith('/#')) {
      result.validLinks++;
      
      // Validate that the anchor exists on the homepage
      const targetId = href.substring(2);
      if (!isValidHomepageAnchor(targetId)) {
        result.issues.push({
          type: 'cross-page-issue',
          severity: 'warning',
          element: elementDescription,
          currentHref: href,
          description: `Cross-page anchor link may point to non-existent homepage element "${targetId}"`
        });
      }
    }
    // External links
    else if (href.startsWith('http')) {
      result.validLinks++;
    }
    // Invalid links
    else {
      result.brokenLinks++;
      result.issues.push({
        type: 'incorrect-href',
        severity: 'error',
        element: elementDescription,
        currentHref: href,
        description: `Invalid href format: "${href}"`
      });
    }
  });

  // Generate recommendations
  result.recommendations = generateRecommendations(result);

  return result;
}

/**
 * Get suggested fix for a broken anchor link
 * @param targetId - The broken target ID
 * @returns Suggested fix or undefined
 */
function getSuggestedFix(targetId: string): string | undefined {
  const commonFixes: Record<string, string> = {
    'about-section': '#meet-our-team',
    'about': '#meet-our-team',
    'services': '/web-design',
    'contact': '#footer-background',
    'contact-section': '#footer-background',
    'hero': '#hero-section',
    'work': '#work-section',
    'team': '#meet-our-team'
  };

  return commonFixes[targetId];
}

/**
 * Check if an anchor ID is valid on the homepage
 * @param targetId - The target ID to check
 * @returns Whether the anchor is valid
 */
function isValidHomepageAnchor(targetId: string): boolean {
  const validHomepageAnchors = [
    'hero-section',
    'work-section',
    'meet-our-team',
    'footer-background'
  ];

  return validHomepageAnchors.includes(targetId);
}

/**
 * Generate recommendations based on audit results
 * @param result - The audit result
 * @returns Array of recommendations
 */
function generateRecommendations(result: NavigationAuditResult): string[] {
  const recommendations: string[] = [];

  if (result.brokenLinks > 0) {
    recommendations.push(`Fix ${result.brokenLinks} broken navigation links`);
  }

  const missingTargetIssues = result.issues.filter(issue => issue.type === 'missing-target');
  if (missingTargetIssues.length > 0) {
    recommendations.push('Add missing HTML elements with proper IDs for anchor links');
  }

  const crossPageIssues = result.issues.filter(issue => issue.type === 'cross-page-issue');
  if (crossPageIssues.length > 0) {
    recommendations.push('Verify cross-page anchor links point to existing homepage elements');
  }

  const seoIssues = result.issues.filter(issue => issue.type === 'seo-issue');
  if (seoIssues.length > 0) {
    recommendations.push('Add title attributes and improve link accessibility');
  }

  if (result.validLinks / result.totalLinks < 0.9) {
    recommendations.push('Consider implementing automated link validation');
  }

  return recommendations;
}

/**
 * Test navigation functionality by simulating clicks
 * @param dryRun - If true, only log what would happen
 * @returns Test results
 */
export function testNavigationFunctionality(dryRun: boolean = true): {
  tested: number;
  passed: number;
  failed: number;
  results: Array<{ href: string; success: boolean; error?: string }>;
} {
  const testResults = {
    tested: 0,
    passed: 0,
    failed: 0,
    results: [] as Array<{ href: string; success: boolean; error?: string }>
  };

  if (typeof document === 'undefined') {
    return testResults;
  }

  const navLinks = document.querySelectorAll('nav a[href^="#"], [role="navigation"] a[href^="#"]');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    testResults.tested++;

    try {
      if (href.startsWith('#')) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          if (!dryRun) {
            // Actually test scrolling
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          testResults.passed++;
          testResults.results.push({ href, success: true });
        } else {
          testResults.failed++;
          testResults.results.push({ 
            href, 
            success: false, 
            error: `Target element "${targetId}" not found` 
          });
        }
      }
    } catch (error) {
      testResults.failed++;
      testResults.results.push({ 
        href, 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  });

  return testResults;
}

/**
 * Generate a comprehensive navigation report
 * @returns HTML report string
 */
export function generateNavigationReport(): string {
  const audit = auditNavigationLinks();
  const test = testNavigationFunctionality(true);

  const report = `
    <div style="font-family: monospace; padding: 20px; background: #f5f5f5;">
      <h2>Navigation Audit Report</h2>
      
      <h3>Summary</h3>
      <ul>
        <li>Total Links: ${audit.totalLinks}</li>
        <li>Valid Links: ${audit.validLinks}</li>
        <li>Broken Links: ${audit.brokenLinks}</li>
        <li>Success Rate: ${((audit.validLinks / audit.totalLinks) * 100).toFixed(1)}%</li>
      </ul>

      <h3>Issues Found</h3>
      ${audit.issues.length === 0 ? '<p>No issues found!</p>' : `
        <ul>
          ${audit.issues.map(issue => `
            <li style="color: ${issue.severity === 'error' ? 'red' : issue.severity === 'warning' ? 'orange' : 'blue'};">
              <strong>${issue.type}</strong>: ${issue.description}
              <br>Element: ${issue.element}
              ${issue.suggestedFix ? `<br>Suggested fix: ${issue.suggestedFix}` : ''}
            </li>
          `).join('')}
        </ul>
      `}

      <h3>Recommendations</h3>
      ${audit.recommendations.length === 0 ? '<p>No recommendations.</p>' : `
        <ul>
          ${audit.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      `}

      <h3>Functionality Test</h3>
      <ul>
        <li>Tested: ${test.tested}</li>
        <li>Passed: ${test.passed}</li>
        <li>Failed: ${test.failed}</li>
      </ul>
    </div>
  `;

  return report;
}

/**
 * Console-friendly navigation audit
 */
export function logNavigationAudit(): void {
  const audit = auditNavigationLinks();
  
  console.group('🔍 Navigation Audit Results');
  console.log(`📊 Summary: ${audit.validLinks}/${audit.totalLinks} links valid (${((audit.validLinks / audit.totalLinks) * 100).toFixed(1)}%)`);
  
  if (audit.issues.length > 0) {
    console.group('⚠️ Issues Found');
    audit.issues.forEach(issue => {
      const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
      console.log(`${icon} ${issue.description}`);
      console.log(`   Element: ${issue.element}`);
      if (issue.suggestedFix) {
        console.log(`   💡 Suggested fix: ${issue.suggestedFix}`);
      }
    });
    console.groupEnd();
  }

  if (audit.recommendations.length > 0) {
    console.group('💡 Recommendations');
    audit.recommendations.forEach(rec => console.log(`• ${rec}`));
    console.groupEnd();
  }

  console.groupEnd();
}