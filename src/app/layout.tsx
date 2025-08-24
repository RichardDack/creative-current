// src/app/layout.tsx - VERCEL COMPATIBLE VERSION
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// ABSOLUTE paths - these work on Vercel
const clashDisplay = localFont({
  src: [
    {
      path: "/fonts/ClashDisplay-Regular.woff2",
      weight: "400",
    },
    {
      path: "/fonts/ClashDisplay-Medium.woff2", 
      weight: "500",
    },
    {
      path: "/fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
    },
    {
      path: "/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const clashGrotesk = localFont({
  src: [
    {
      path: "/fonts/ClashGrotesk-Regular.woff2",
      weight: "400", 
    },
    {
      path: "/fonts/ClashGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "/fonts/ClashGrotesk-Semibold.woff2",
      weight: "600",
    },
    {
      path: "/fonts/ClashGrotesk-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-clash-grotesk",
  display: "swap",
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
      <body className={`${clashDisplay.variable} ${clashGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}