'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-dark-300 to-dark-200 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

        {/* Abstract lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50" stroke="url(#cta-gradient)" strokeWidth="0.5" fill="none" />
          <path d="M0,60 Q25,40 50,60 T100,60" stroke="url(#cta-gradient)" strokeWidth="0.5" fill="none" />
          <path d="M0,70 Q25,50 50,70 T100,70" stroke="url(#cta-gradient)" strokeWidth="0.5" fill="none" />
          <path d="M0,80 Q25,60 50,80 T100,80" stroke="url(#cta-gradient)" strokeWidth="0.5" fill="none" />
          <path d="M0,90 Q25,70 50,90 T100,90" stroke="url(#cta-gradient)" strokeWidth="0.5" fill="none" />
          <defs>
            <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-dark-200/60 backdrop-blur-md border border-dark-100/50 rounded-2xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-8 relative">
            {/* Decorative element */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"></div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            >
              Ready to Take the Next Step?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-gray-300"
            >
              Start your journey toward financial success with LendingForte today.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-dark-300/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Apply Online</h3>
              <p className="text-gray-400 mb-4">Complete our simple online application in just minutes.</p>
              <Link
                href="/apply"
                className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center"
              >
                Start Application
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-dark-300/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Speak to an Advisor</h3>
              <p className="text-gray-400 mb-4">Get personalized guidance from our financial experts.</p>
              <Link
                href="/marketing/contact"
                className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center"
              >
                Contact Us
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-dark-300/50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500 mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Calculate Your Rate</h3>
              <p className="text-gray-400 mb-4">Use our interactive calculator to estimate your payments.</p>
              <Link
                href="/marketing/calculator"
                className="text-primary-400 hover:text-primary-300 font-medium inline-flex items-center"
              >
                Try Calculator
                <ArrowRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link
                href="/apply"
                className="btn btn-primary btn-lg group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started Today
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>

              <Link
                href="/marketing/calculator"
                className="btn btn-outline btn-lg border-gray-700 text-white hover:bg-dark-100 group"
              >
                <span className="flex items-center">
                  Calculate Your Rate
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm text-gray-400">No obligations</p>
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm text-gray-400">No impact on credit score</p>
              </div>

              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-400">Quick 5-minute application</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
