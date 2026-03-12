import { Metadata } from 'next';
import Link from 'next/link';
import { FaShieldAlt, FaUmbrella, FaHome, FaBriefcase } from 'react-icons/fa';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Insurance Solutions | LendingForte Premium',
  description: 'Protect what matters most with our curated range of insurance and risk management products.',
};

export default function InsuranceSolutionsPage() {
  return (
    <div className="bg-dark-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-dark-200 to-dark-300">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <FaShieldAlt className="mr-2" />
              Insurance Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Comprehensive <span className="text-primary-500">Protection</span> For Your World
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Risk management is the foundation of every strong financial plan. We provide high-limit, specialized insurance solutions to protect your lifestyle, your family, and your business.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/marketing/contact"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/20"
              >
                Get a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex p-8 bg-dark-200 rounded-2xl border border-dark-100/50 items-center">
              <FaUmbrella className="text-primary-500 w-12 h-12 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Life & Disability</h3>
                <p className="text-gray-400">High-limit coverage to ensure your family's future and protect your income potential.</p>
              </div>
            </div>
            <div className="flex p-8 bg-dark-200 rounded-2xl border border-dark-100/50 items-center">
              <FaHome className="text-primary-500 w-12 h-12 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Private Client Property</h3>
                <p className="text-gray-400">Specialized coverage for high-value homes, collections, and estates.</p>
              </div>
            </div>
            <div className="flex p-8 bg-dark-200 rounded-2xl border border-dark-100/50 items-center">
              <FaBriefcase className="text-primary-500 w-12 h-12 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Business Liability</h3>
                <p className="text-gray-400">Protecting your professional legacy with comprehensive liability and umbrella coverage.</p>
              </div>
            </div>
            <div className="flex p-8 bg-dark-200 rounded-2xl border border-dark-100/50 items-center">
              <FaShieldAlt className="text-primary-500 w-12 h-12 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Long-term Care</h3>
                <p className="text-gray-400">Strategic planning for future health needs without compromising your assets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
