import { Metadata } from 'next';
import { Suspense, lazy } from 'react';

// Import critical components normally
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Hero from '@/components/marketing/hero';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ToastProvider } from '@/components/providers/toast-provider';

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="relative">
      <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-green-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-gray-900"></div>
      </div>
    </div>
  </div>
);

// Lazy load non-critical components
const Features = lazy(() => import('@/components/marketing/features'));
const LoanProducts = lazy(() => import('@/components/marketing/loan-products'));
const Testimonials = lazy(() => import('@/components/marketing/testimonials'));
const CalculatorPreview = lazy(() => import('@/components/marketing/calculator-preview'));
const CTASection = lazy(() => import('@/components/marketing/cta-section'));

export const metadata: Metadata = {
  title: 'LendingForte | Premium Financial Solutions',
  description: 'LendingForte offers premium financial solutions including personal loans, mortgages, and business financing with competitive rates and exceptional service.',
};

export default function HomePage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
        <main className="flex-1 pt-24 md:pt-20">
          {/* Critical component loaded immediately */}
          <Hero />

          {/* Non-critical components lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <Features />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <LoanProducts />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <CalculatorPreview />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <Testimonials />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <CTASection />
          </Suspense>
        </main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}
