import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ToastProvider } from '@/components/providers/toast-provider';

export const metadata: Metadata = {
  title: 'LendingForte | Premium Financial Solutions',
  description: 'LendingForte offers premium financial solutions including personal loans, mortgages, and business financing with competitive rates and exceptional service.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ToastProvider>
        <Header />
        <main className="flex-1 pt-24 md:pt-20">
          {children}
        </main>
        <Footer />
      </ToastProvider>
    </AuthProvider>
  );
}
