// src/app/layout.tsx - COMPLETE WORKING VERSION
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { PerformanceOptimizer } from '@/components/performance/PerformanceOptimizer';
import { MobileOptimizer } from '@/components/mobile/MobileOptimizer';

// Configure Clash Display with all weights
const clashDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/ClashDisplay-Extralight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/ClashDisplay-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

// Configure Clash Grotesk with all weights
const clashGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/ClashGrotesk-Extralight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Semibold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
});

// Base metadata - pages will override with specific metadata
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts for better LCP */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ClashGrotesk-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ClashGrotesk-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//framerusercontent.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        {/* Mobile viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="theme-color" content="#0e1a24" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${clashDisplay.variable} ${clashGrotesk.variable} antialiased`}>
        <PerformanceOptimizer />
        <MobileOptimizer>
          {children}
        </MobileOptimizer>
      </body>
    </html>
  );
}