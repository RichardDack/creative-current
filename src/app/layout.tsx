// Alternative approach - if absolute paths don't work
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Using explicit relative paths from project root
const clashDisplay = localFont({
  src: "./public/fonts/ClashDisplay-Regular.woff2",
  variable: "--font-clash-display",
  weight: "400 700", // Variable weight range
  display: "swap",
});

const clashGrotesk = localFont({
  src: "./public/fonts/ClashGrotesk-Regular.woff2", 
  variable: "--font-clash-grotesk",
  weight: "400 700", // Variable weight range
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