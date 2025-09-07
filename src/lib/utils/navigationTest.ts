// src/lib/utils/navigationTest.ts - Navigation testing utilities

import { auditNavigationLinks, testNavigationFunctionality } from './navigationAudit';

/**
 * Run comprehensive navigation tests
 * @returns Test results
 */
export function runNavigationTests(): {
  auditResults: ReturnType<typeof auditNavigationLinks>;
  testResults: ReturnType<typeof testNavigationFunctionality>;
  summary: string;
} {
  console.group('🧪 Running Navigation Tests');

  // Run audit
  const auditResults = auditNavigationLinks();
  console.log(`📊 Audit found ${auditResults.totalLinks} total links`);
  console.log(`✅ ${auditResults.validLinks} valid links`);
  console.log(`❌ ${auditResults.brokenLinks} broken links`);

  // Run functionality tests (dry run)
  const testResults = testNavigationFunctionality(true);
  console.log(`🔧 ${testResults.passed}/${testResults.tested} navigation tests passed`);

  // Generate summary
  const successRate = ((auditResults.validLinks / auditResults.totalLinks) * 100).toFixed(1);
  const summary = `Navigation Test Summary: ${successRate}% success rate (${auditResults.validLinks}/${auditResults.totalLinks} links valid)`;

  console.log(`📈 ${summary}`);
  console.groupEnd();

  return {
    auditResults,
    testResults,
    summary
  };
}

/**
 * Test specific navigation scenarios
 */
export function testNavigationScenarios(): void {
  console.group('🎯 Testing Navigation Scenarios');

  // Test 1: Homepage navigation
  console.log('Testing homepage navigation...');
  const homepageLinks = [
    '#work-section',
    '#meet-our-team',
    '/web-design',
    '#footer-background'
  ];

  homepageLinks.forEach(href => {
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      console.log(`${href}: ${element ? '✅ Found' : '❌ Missing'}`);
    } else {
      console.log(`${href}: ✅ Page link (assumed valid)`);
    }
  });

  // Test 2: Cross-page navigation
  console.log('Testing cross-page navigation...');
  const crossPageLinks = [
    '/#work-section',
    '/#meet-our-team',
    '/#footer-background'
  ];

  crossPageLinks.forEach(href => {
    console.log(`${href}: ✅ Cross-page link (will navigate to homepage)`);
  });

  console.groupEnd();
}

/**
 * Validate all navigation IDs exist
 */
export function validateNavigationTargets(): boolean {
  const requiredIds = [
    'hero-section',
    'work-section',
    'meet-our-team',
    'footer-background',
    'towns' // For web-design page
  ];

  let allValid = true;

  console.group('🎯 Validating Navigation Targets');

  requiredIds.forEach(id => {
    const element = document.getElementById(id);
    const isValid = !!element;
    console.log(`#${id}: ${isValid ? '✅ Found' : '❌ Missing'}`);
    if (!isValid) allValid = false;
  });

  console.log(`Overall: ${allValid ? '✅ All targets valid' : '❌ Some targets missing'}`);
  console.groupEnd();

  return allValid;
}

/**
 * Test URL history management
 */
export function testURLHistoryManagement(): void {
  console.group('🔗 Testing URL History Management');

  const originalURL = window.location.href;
  console.log(`Original URL: ${originalURL}`);

  // Test hash updates
  if (window.history && window.history.pushState) {
    console.log('✅ History API available');

    // Test updating hash
    const testHash = '#work-section';
    const newURL = `${window.location.pathname}${testHash}`;
    window.history.pushState(null, '', newURL);
    console.log(`Updated URL: ${window.location.href}`);

    // Restore original URL
    window.history.pushState(null, '', originalURL);
    console.log(`Restored URL: ${window.location.href}`);
  } else {
    console.log('❌ History API not available');
  }

  console.groupEnd();
}

/**
 * Run all navigation tests
 */
export function runAllNavigationTests(): void {
  console.log('🚀 Starting Comprehensive Navigation Tests');

  runNavigationTests();
  testNavigationScenarios();
  validateNavigationTargets();
  testURLHistoryManagement();

  console.log('✅ Navigation tests completed');
}