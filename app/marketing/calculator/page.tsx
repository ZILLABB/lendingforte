import { Metadata } from 'next';
import { Suspense, lazy } from 'react';

// Import critical components normally
import CalculatorHero from '@/components/marketing/calculator/hero';
import CalculatorForm from '@/components/marketing/calculator/form';
import CalculatorResults from '@/components/marketing/calculator/results';

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
const CalculatorComparison = lazy(() => import('@/components/marketing/calculator/comparison'));
const CalculatorFAQ = lazy(() => import('@/components/marketing/calculator/faq'));
const CTASection = lazy(() => import('@/components/marketing/cta-section'));

export const metadata: Metadata = {
  title: 'Loan Calculator | LendingForte',
  description: 'Use our interactive loan calculator to estimate monthly payments, interest rates, and total costs for different loan types and terms.',
};

export default function CalculatorPage() {
  return (
    <>
      {/* Critical components loaded immediately */}
      <CalculatorHero />
      <div className="bg-dark-200 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <CalculatorForm />
            <CalculatorResults />
          </div>
        </div>
      </div>

      {/* Non-critical components lazy loaded */}
      <Suspense fallback={<LoadingFallback />}>
        <CalculatorComparison />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <CalculatorFAQ />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <CTASection />
      </Suspense>
    </>
  );
}
