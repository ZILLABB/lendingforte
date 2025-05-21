'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ApplyHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="/images/lendingforte/apply/apply-bg.jpg"
            alt="Apply for a loan"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-dark-300/80"></div>

          {/* Gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.25),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.2),transparent_40%)]"></div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`vline-${i}`}
                  x1={i * 10}
                  y1="0"
                  x2={i * 10}
                  y2="100"
                  stroke="#ffffff"
                  strokeOpacity="0.1"
                  strokeWidth="0.1"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`hline-${i}`}
                  x1="0"
                  y1={i * 10}
                  x2="100"
                  y2={i * 10}
                  stroke="#ffffff"
                  strokeOpacity="0.1"
                  strokeWidth="0.1"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
              <svg className="w-10 h-10 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            Apply for a Loan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Start your application today and take the first step toward achieving your financial goals. Our streamlined process makes it easy to apply for the funding you need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mt-12"
          >
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-xl bg-dark-100/80 backdrop-blur-sm border border-primary-500/20 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Quick Application</p>
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="inline-block w-3 h-0.5 bg-primary-500/50 mr-2"></span>
                  Takes just 5-10 minutes
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-xl bg-dark-100/80 backdrop-blur-sm border border-primary-500/20 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Secure Process</p>
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="inline-block w-3 h-0.5 bg-primary-500/50 mr-2"></span>
                  Bank-level encryption
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-14 h-14 rounded-xl bg-dark-100/80 backdrop-blur-sm border border-primary-500/20 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Fast Decisions</p>
                <p className="text-sm text-gray-400 flex items-center">
                  <span className="inline-block w-3 h-0.5 bg-primary-500/50 mr-2"></span>
                  Get pre-approved quickly
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
