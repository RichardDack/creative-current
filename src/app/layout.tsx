// src/app/layout.tsx - UPDATED
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}