'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Features() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="py-16 md:py-24">
          {/* Premium Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            {mounted && (
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900/60 dark:text-green-400 rounded-full mb-4 shadow-sm"
              >
                Premium Financial Solutions
              </motion.span>
            )}

            {mounted && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
              >
                Why <span className="text-green-600 dark:text-green-500 relative">
                  LendingForte
                  <span className="absolute bottom-1 left-0 w-full h-2 bg-green-200 dark:bg-green-800 -z-10 opacity-50"></span>
                </span> is the <span className="relative inline-block">
                  premium choice
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" preserveAspectRatio="none">
                    <path d="M0,0 Q50,12 100,0" stroke="currentColor" strokeWidth="3" fill="none" className="text-green-500/30" />
                  </svg>
                </span>
              </motion.h2>
            )}

            {mounted && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-600 dark:text-gray-300 mb-4"
              >
                We combine sophisticated financial expertise with cutting-edge technology to deliver premium lending solutions
                that are accessible, transparent, and precisely tailored to your unique financial situation.
              </motion.p>
            )}

            {mounted && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg text-gray-500 dark:text-gray-400"
              >
                Our unwavering commitment to excellence has helped thousands of clients achieve their financial goals
                with industry-leading rates and personalized white-glove service.
              </motion.p>
            )}
          </div>

          {/* Premium Feature Items */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            >
              {/* 1st premium item */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700/50"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/80 dark:to-green-800/60 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Intelligent Application</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Our AI-powered underwriting technology evaluates your complete financial profile,
                  not just your credit score, with decisions in as little as 24 hours.
                </p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 rounded-full group-hover:w-full transition-all duration-300"></div>
              </motion.div>

              {/* 2nd premium item */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700/50"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/80 dark:to-green-800/60 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Bespoke Solutions</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Tailor your premium loan with flexible terms from 12-84 months, competitive fixed rates starting at 5.99% APR,
                  and loan amounts from $1,000 to $100,000.
                </p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 rounded-full group-hover:w-full transition-all duration-300"></div>
              </motion.div>

              {/* 3rd premium item */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700/50"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/80 dark:to-green-800/60 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Crystal Transparency</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  We provide clear, upfront information about rates, fees, and terms with no hidden costs.
                  Our loan agreements use plain language so you understand exactly what you're signing.
                </p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 rounded-full group-hover:w-full transition-all duration-300"></div>
              </motion.div>

              {/* 4th premium item */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-800/80 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group border border-gray-100 dark:border-gray-700/50"
              >
                <div className="bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/80 dark:to-green-800/60 rounded-xl p-4 w-16 h-16 mb-6 group-hover:scale-110 transition-transform shadow-sm flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Military-Grade Security</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Your sensitive financial information is safeguarded with SOC 2 compliant systems,
                  256-bit encryption, and multi-factor authentication protocols that exceed industry standards.
                </p>
                <div className="mt-4 h-1 w-12 bg-gradient-to-r from-green-500 to-green-300 dark:from-green-600 dark:to-green-400 rounded-full group-hover:w-full transition-all duration-300"></div>
              </motion.div>
            </motion.div>
          )}

          {/* Premium CTA Section */}
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-20 text-center relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 rounded-3xl -z-10"></div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="max-w-xl mx-auto bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700/50"
              >
                <h3 className="text-2xl font-bold mb-4">Ready to Experience Premium Financial Services?</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Contact our expert advisors for a personalized consultation to discuss your financial needs.
                </p>

                <a
                  href="/contact-us"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                >
                  Contact Us <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Free Consultation</span>
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>

                <div className="mt-6 flex items-center justify-center space-x-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Expert advisors</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Personalized service</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Confidential process</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
