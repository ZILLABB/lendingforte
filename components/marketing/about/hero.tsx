'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/lendingforte/about/about-hero.jpg"
          alt="LendingForte executive in professional setting"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-300/90 to-dark-300/70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.25),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.2),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            About LendingForte
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed"
          >
            We're on a mission to transform the financial industry by providing premium lending solutions that are accessible, transparent, and tailored to your unique needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mt-10"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-dark-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">Founded in 2018</p>
                <p className="text-sm text-gray-400">With a vision for change</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-dark-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">50+ Team Members</p>
                <p className="text-sm text-gray-400">Dedicated professionals</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-dark-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-white font-medium">10,000+ Clients</p>
                <p className="text-sm text-gray-400">Across the country</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
