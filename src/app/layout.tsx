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

// Configure Wix Madefor Display using next/font/google
import { Wix_Madefor_Display } from "next/font/google";

const wixMadeforDisplay = Wix_Madefor_Display({
  variable: "--font-wix-madefor",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
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
      <body className={`${interTight.variable} ${plusJakartaSans.variable} ${wixMadeforDisplay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}