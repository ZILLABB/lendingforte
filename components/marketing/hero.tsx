'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.3),transparent_40%)]"></div>
      </div>

      {/* Animated elements */}
      {mounted && (
        <>
          <div className="absolute top-1/4 left-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse -z-5"></div>
          <div className="absolute bottom-1/3 right-1/4 w-60 sm:w-96 h-60 sm:h-96 bg-accent-blue.DEFAULT/10 rounded-full blur-3xl animate-pulse -z-5" style={{ animationDelay: '2s' }}></div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Premium Financial Solutions for Your Future
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8"
            >
              Discover personalized loan options, competitive rates, and exceptional service tailored to your financial goals. Your journey to financial success starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/apply"
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Apply For Loan
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>

              <Link
                href="/marketing/calculator"
                className="btn btn-outline btn-lg border-gray-700 text-white hover:bg-dark-100"
              >
                Calculate Your Rate
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-100 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-white text-sm sm:text-base font-medium">Fast Approvals</p>
                  <p className="text-xs sm:text-sm text-gray-400">As quick as 24 hours</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark-100 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-2 sm:ml-3">
                  <p className="text-white text-sm sm:text-base font-medium">Secure Process</p>
                  <p className="text-xs sm:text-sm text-gray-400">Bank-level encryption</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-dark-100/50">
              <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] relative">
                {/* Hero image */}
                <Image
                  src="/images/lendingforte/hero/hero-main.jpg"
                  alt="Financial success with LendingForte"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-dark-300/80 to-dark-200/80"></div>

                {/* Floating elements */}
                <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                {/* Financial icons */}
                <div className="absolute top-1/4 right-1/4 bg-dark-300/70 backdrop-blur-sm p-3 rounded-lg border border-dark-100/30 shadow-lg">
                  <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>

                <div className="absolute bottom-1/4 left-1/3 bg-dark-300/70 backdrop-blur-sm p-3 rounded-lg border border-dark-100/30 shadow-lg">
                  <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Animated graph overlay */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                    {/* Data points */}
                    <circle cx="100" cy="250" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="200" cy="180" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="300" cy="220" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="1s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="400" cy="150" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="1.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="500" cy="190" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="600" cy="120" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="2.5s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="700" cy="160" r="4" fill="#10B981">
                      <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Line connecting points */}
                    <polyline
                      points="100,250 200,180 300,220 400,150 500,190 600,120 700,160"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeOpacity="0.7"
                    >
                      <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="3s" repeatCount="1" fill="freeze" />
                    </polyline>
                  </svg>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-blue.DEFAULT/20 rounded-full blur-xl"></div>

            {/* Stats card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-dark-200/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-dark-100/50 w-56 sm:w-64">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-2 sm:ml-3 text-sm sm:text-base text-white font-medium">Competitive Rates</h3>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-xs sm:text-sm">Personal Loans</span>
                <span className="text-primary-400 text-xs sm:text-sm font-medium">from 5.99%</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400 text-xs sm:text-sm">Mortgages</span>
                <span className="text-primary-400 text-xs sm:text-sm font-medium">from 3.49%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-xs sm:text-sm">Business Loans</span>
                <span className="text-primary-400 text-xs sm:text-sm font-medium">from 6.75%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
