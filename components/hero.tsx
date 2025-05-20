'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.3),transparent_40%)]"></div>
      </div>

      {/* Animated elements */}
      {mounted && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </>
      )}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="pt-32 pb-10 md:pt-40 md:pb-16">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            {mounted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block px-4 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-6"
              >
                Premium Financial Solutions
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100"
            >
              Financial Solutions <span className="text-green-500 relative">Tailored</span> to Your
              <span className="text-green-500 font-extrabold"> FUTURE</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 mb-6"
            >
              LendingForte delivers personalized lending solutions with competitive rates,
              transparent terms, and a streamlined approval process designed for your financial success.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-gray-400 mb-10"
            >
              From personal loans to mortgages and business financing, we&apos;re committed to
              helping you achieve your financial goals with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            >
              <Link
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full bg-green-600 hover:bg-green-500 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                href="/contact-us"
              >
                Contact Us <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Free Consultation</span>
              </Link>
              <Link
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
                href="/loan-calculator"
              >
                Calculate Payment
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-white via-gray-50 to-white dark:from-white dark:via-gray-50 dark:to-white -mb-1 rounded-t-[50%]"></div>
    </section>
  );
}
