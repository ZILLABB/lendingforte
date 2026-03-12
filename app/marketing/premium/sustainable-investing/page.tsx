import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaLeaf, FaGlobeAmericas, FaChartPie, FaHandHoldingHeart } from 'react-icons/fa';
import CTASection from '@/components/marketing/cta-section';

export const metadata: Metadata = {
  title: 'Sustainable Investing | LendingForte Premium',
  description: 'Invest in a better future with LendingForte Professional Sustainable Investing solutions. Align your financial goals with your values.',
};

export default function SustainableInvestingPage() {
  return (
    <div className="bg-dark-300 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/lendingforte/premium/sustainable-investing.png"
            alt="Sustainable Investing"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-300 via-dark-300/80 to-dark-300"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6">
              <FaLeaf className="mr-2" />
              Premium Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Invest in a <span className="text-primary-500">Sustainable</span> Future
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Align your wealth with your values. Our sustainable investing strategies focus on Environmental, Social, and Governance (ESG) factors to deliver competitive returns while making a positive impact on the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/apply"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-primary-500/20"
              >
                Start Investing
              </Link>
              <Link
                href="/marketing/contact"
                className="px-8 py-4 bg-dark-200 hover:bg-dark-100 text-white font-semibold rounded-lg border border-dark-100 transition-all font-outfit"
              >
                Speak with an Advisor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-dark-200/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our ESG Philosophy</h2>
              <p className="text-gray-300 mb-6 text-lg">
                We believe that companies with strong ESG practices are better positioned for long-term success. By integrating these factors into our investment process, we seek to mitigate risk and identify opportunities that traditional analysis might overlook.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mr-4 mt-1">
                    <FaGlobeAmericas className="text-primary-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Environmental Stewardship</h4>
                    <p className="text-gray-400">Focusing on climate change, resource depletion, waste, and pollution.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mr-4 mt-1">
                    <FaHandHoldingHeart className="text-primary-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Social Responsibility</h4>
                    <p className="text-gray-400">Evaluating employee relations, diversity, health and safety, and community impact.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary-500/10 flex items-center justify-center mr-4 mt-1">
                    <FaChartPie className="text-primary-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Corporate Governance</h4>
                    <p className="text-gray-400">Assessing board quality, executive pay, audits, internal controls, and shareholder rights.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/lendingforte/premium/sustainable-investing.png"
                alt="ESG Investing"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary-900/10 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
