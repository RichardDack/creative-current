// src/app/layout.tsx - COMPLETE WORKING VERSION
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Creative Current - Elevating Digital Excellence",
  description: "We specialize in web design, development, UI/UX, and product design. Transform your online presence with our creative expertise.",
  keywords: "web design, web development, UI/UX, product design, digital agency",
  authors: [{ name: "Creative Current" }],
  viewport: "width=device-width, initial-scale=1",
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
      <body className={`${clashDisplay.variable} ${clashGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}