import "./css/style.css";

import { Inter, Architects_Daughter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ToastProvider } from "@/components/ui/toast-provider";

import Header from "@/components/ui/header";
import LoanFooter from "@/components/information";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 tracking-tight`}
      >
        <ThemeProvider defaultTheme="system" storageKey="lendingforte-theme">
          <ToastProvider>
            <div className="flex flex-col min-h-screen overflow-hidden">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <LoanFooter />
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
