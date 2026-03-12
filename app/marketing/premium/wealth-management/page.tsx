import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaChartLine, FaRegGem, FaUserShield, FaBalanceScale } from 'react-icons/fa';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Wealth Management | LendingForte Premium',
  description: 'Comprehensive wealth management solutions designed for high-net-worth individuals and families.',
};

export default function WealthManagementPage() {
  return (
    <div className="bg-dark-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lendingforte/premium/wealth-management.png"
            alt="Wealth Management"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-300 via-dark-300/80 to-dark-300"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <FaRegGem className="mr-2" />
              Wealth Management
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Preserve and Grow Your <span className="text-primary-500">Legacy</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our bespoke wealth management services are designed to protect your assets and facilitate growth across generations. We provide sophisticated strategies tailored to your unique financial landscape.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/marketing/contact"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/20"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark-200/50">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Comprehensive Solutions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Tailored strategies for every aspect of your financial life.</p>
        </div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-dark-300 p-8 rounded-2xl border border-dark-100/50 hover:border-primary-500/30 transition-all group">
              <FaChartLine className="text-primary-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">Investment Management</h3>
              <p className="text-gray-400">Custom portfolios built on rigorous research and global market insights.</p>
            </div>
            <div className="bg-dark-300 p-8 rounded-2xl border border-dark-100/50 hover:border-primary-500/30 transition-all group">
              <FaUserShield className="text-primary-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">Estate Planning</h3>
              <p className="text-gray-400">Strategic planning to ensure your wealth is transitioned according to your wishes.</p>
            </div>
            <div className="bg-dark-300 p-8 rounded-2xl border border-dark-100/50 hover:border-primary-500/30 transition-all group">
              <FaBalanceScale className="text-primary-500 w-10 h-10 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-white mb-4">Tax Optimization</h3>
              <p className="text-gray-400">Minimizing tax liabilities through intelligent structural and investment decisions.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
