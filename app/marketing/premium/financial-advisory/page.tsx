import { Metadata } from 'next';
import Link from 'next/link';
import { FaHandshake, FaBullseye, FaLightbulb, FaUserTie } from 'react-icons/fa';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Financial Advisory | LendingForte Premium',
  description: 'Expert financial advice to guide your major life decisions and long-term planning.',
};

export default function FinancialAdvisoryPage() {
  return (
    <div className="bg-dark-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-dark-200 to-dark-300">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <FaHandshake className="mr-2" />
              Financial Advisory
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Expert <span className="text-primary-500">Advisory</span> for Every Milestone
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Navigate complex financial decisions with confidence. Our senior advisors provide objective, research-driven guidance for your personal and business financial journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/marketing/contact"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/20"
              >
                Schedule an Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Pillars */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-dark-200 rounded-xl border border-dark-100/50">
              <FaBullseye className="text-primary-500 w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Goal Setting</h3>
              <p className="text-gray-400 text-sm">Defining clear, achievable financial objectives for your future.</p>
            </div>
            <div className="p-6 bg-dark-200 rounded-xl border border-dark-100/50">
              <FaLightbulb className="text-primary-500 w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Strategic Planning</h3>
              <p className="text-gray-400 text-sm">Creating a roadmap to bridge the gap between where you are and where you want to be.</p>
            </div>
            <div className="p-6 bg-dark-200 rounded-xl border border-dark-100/50">
              <FaUserTie className="text-primary-500 w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Executive Services</h3>
              <p className="text-gray-400 text-sm">Specialized advice for corporate leaders, including equity compensation and risk management.</p>
            </div>
            <div className="p-6 bg-dark-200 rounded-xl border border-dark-100/50">
              <FaHandshake className="text-primary-500 w-8 h-8 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Family Governance</h3>
              <p className="text-gray-400 text-sm">Facilitating complex inter-generational conversations and planning.</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
