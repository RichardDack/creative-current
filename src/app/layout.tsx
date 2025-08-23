// src/app/layout.tsx - UPDATED
import type { Metadata } from "next";
import { Inter_Tight, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Configure Inter Tight for display/heading text
const interTight = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Configure Plus Jakarta Sans for body text
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: "Creative Current - Elevating Digital Excellence",
  description: "We specialize in web design, development, UI/UX, and product design. Transform your online presence with our creative expertise.",
  keywords: "web design, web development, UI/UX, product design, digital agency",
  authors: [{ name: "Creative Current" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload Wix Madefor Display from Google Fonts with font-display: swap */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${interTight.variable} ${plusJakartaSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}