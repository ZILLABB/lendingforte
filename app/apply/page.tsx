import { Metadata } from 'next';
import { Suspense, lazy } from 'react';

// Import critical components normally
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import PremiumForm from '@/components/apply/premium-form';
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
const ApplyFAQ = lazy(() => import('@/components/apply/faq'));

export const metadata: Metadata = {
  title: 'Apply for a Loan | LendingForte',
  description: 'Apply for a personal loan, mortgage, or business loan with LendingForte. Our simple application process makes it easy to get the financing you need.',
};

export default function ApplyPage() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
        <main className="flex-1 pt-24 md:pt-20">
          {/* Premium Form Component */}
          <PremiumForm />

          {/* Non-critical component lazy loaded */}
          <Suspense fallback={<LoadingFallback />}>
            <ApplyFAQ />
          </Suspense>
        </main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}
