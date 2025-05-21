import "./globals.css";
import './css/mobile-fixes.css'; // Import mobile fixes
import React from 'react';
import Script from 'next/script';

import { Inter, Architects_Daughter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const architects_daughter = Architects_Daughter({
  subsets: ["latin"],
  variable: "--font-architects-daughter",
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Lending Forte",
  description: "Premium financial solutions for personal and business needs",
  keywords: "loans, financing, credit, personal loans, business loans, mortgage, financial services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200`}>
        <Script id="prevent-mobile-resize" strategy="beforeInteractive">{`
            // Prevent automatic content resizing on mobile
            (function() {
              // Prevent text resizing
              document.documentElement.style.webkitTextSizeAdjust = '100%';
              document.documentElement.style.textSizeAdjust = '100%';

              // Suppress specific Next.js warnings
              const originalWarn = console.warn;
              console.warn = function(...args) {
                if (args.length > 0 && typeof args[0] === 'string' &&
                    args[0].includes('Skipping auto-scroll behavior')) {
                  return;
                }
                originalWarn.apply(console, args);
              };
            })();
        `}</Script>
        {children}
      </body>
    </html>
  );
}
