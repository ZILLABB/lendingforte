'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LoanHeroProps {
  loanType: string;
  title: string;
  subtitle: string;
  description: string;
  minAmount: number;
  maxAmount: number;
}

export default function LoanHero({
  loanType,
  title,
  subtitle,
  description,
  minAmount,
  maxAmount
}: LoanHeroProps) {
  // Get loan type specific details
  const getLoanTypeDetails = () => {
    switch (loanType) {
      case 'personal':
        return {
          icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          useCases: ['Debt Consolidation', 'Home Improvements', 'Major Purchases', 'Medical Expenses', 'Wedding Costs'],
          image: '/images/lendingforte/loans/personal-loan.jpg',
          alt: 'Personal loan services from LendingForte'
        };
      case 'mortgage':
        return {
          icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
          useCases: ['First-Time Home Purchase', 'Home Refinancing', 'Investment Properties', 'Vacation Homes', 'Home Construction'],
          image: '/images/lendingforte/loans/mortgage.jpg',
          alt: 'Mortgage services from LendingForte'
        };
      case 'business':
        return {
          icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          useCases: ['Business Expansion', 'Equipment Purchase', 'Working Capital', 'Inventory Financing', 'Commercial Real Estate'],
          image: '/images/lendingforte/loans/business-loan.jpg',
          alt: 'Business loan services from LendingForte'
        };
      default:
        return {
          icon: (
            <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          useCases: ['Various Financial Needs'],
          image: '/images/lendingforte/loans/personal-loan.jpg',
          alt: 'Financial services from LendingForte'
        };
    }
  };

  const loanDetails = getLoanTypeDetails();

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.3),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <div className="inline-flex items-center justify-center lg:justify-start mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                {loanDetails.icon}
              </div>
              <h2 className="text-xl font-medium text-primary-400">{subtitle}</h2>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/apply"
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Apply Now
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>

              <Link
                href="/marketing/calculator"
                className="btn btn-outline btn-lg border-gray-700 text-white hover:bg-dark-100"
              >
                Calculate Payments
              </Link>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="text-sm px-3 py-1 bg-dark-200 text-gray-300 rounded-full">
                ${minAmount.toLocaleString()} - ${maxAmount.toLocaleString()}
              </div>
              {loanDetails.useCases.map((useCase, index) => (
                <div key={index} className="text-sm px-3 py-1 bg-dark-200 text-gray-300 rounded-full">
                  {useCase}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-dark-100/50">
              <div className="aspect-[4/3] relative">
                <Image
                  src={loanDetails.image}
                  alt={loanDetails.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-dark-300/50 mix-blend-multiply"></div>
                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 backdrop-blur-sm flex items-center justify-center">
                    {loanDetails.icon}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-blue.DEFAULT/10 rounded-full blur-xl"></div>

            {/* Stats card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-dark-200/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-dark-100/50 w-64">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-white font-medium">Quick Facts</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Approval Time</span>
                  <span className="text-primary-400 font-medium">
                    {loanType === 'personal' ? 'Minutes' : loanType === 'business' ? '1-3 Days' : '1-2 Weeks'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Funding Time</span>
                  <span className="text-primary-400 font-medium">
                    {loanType === 'personal' ? '1-2 Days' : loanType === 'business' ? '3-5 Days' : '30-45 Days'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Min. Credit Score</span>
                  <span className="text-primary-400 font-medium">
                    {loanType === 'personal' ? '660' : loanType === 'business' ? '650' : '620'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
