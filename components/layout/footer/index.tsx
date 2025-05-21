'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Newsletter from './newsletter';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-300 border-t border-dark-100/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(34,197,94,0.35),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.3),transparent_40%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5 shadow-lg">
                <div className="h-10 w-10 relative overflow-hidden">
                  <Image
                    src="/images/lendingforte/logod.png"
                    alt="LendingForte Logo"
                    width={40}
                    height={40}
                    className="w-full h-full rounded-full bg-gray-900"
                    priority
                  />
                </div>
              </div>
              <span className="ml-3 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                LendingForte
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium financial solutions tailored to your needs. We provide personal loans, mortgages, and business financing with competitive rates and exceptional service.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaFacebookF />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaTwitter />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaLinkedinIn />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, backgroundColor: '#10B981' }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-dark-200 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 shadow-sm"
              >
                <FaInstagram />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/marketing/about"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/loans/personal"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Personal Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/loans/mortgage"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Mortgages
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/loans/business"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Business Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/calculator"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Loan Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/contact"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Premium Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-6">Premium Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/marketing/premium/sustainable-investing"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Sustainable Investing
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/premium/wealth-management"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Wealth Management
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/premium/financial-advisory"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Financial Advisory
                </Link>
              </li>
              <li>
                <Link
                  href="/marketing/premium/insurance-solutions"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                >
                  Insurance Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates, financial tips, and exclusive offers.
            </p>
            <Newsletter />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-dark-100/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <p className="text-gray-500 text-sm mb-2 md:mb-0">
                © {currentYear} LendingForte. All rights reserved.
              </p>
              <span className="hidden md:inline text-dark-100">|</span>
              <p className="text-gray-500 text-xs">
                <span className="text-primary-500">LendingForte</span> is a fictional brand created for demonstration purposes only.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-4 md:mt-0">
              <Link
                href="/legal/terms"
                className="text-gray-500 hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-dark-100">•</span>
              <Link
                href="/legal/privacy"
                className="text-gray-500 hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-dark-100">•</span>
              <Link
                href="/legal/cookies"
                className="text-gray-500 hover:text-primary-400 transition-colors"
              >
                Cookie Policy
              </Link>
              <span className="text-dark-100">•</span>
              <Link
                href="/legal/licenses"
                className="text-gray-500 hover:text-primary-400 transition-colors"
              >
                Licenses
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-dark-200/50 border border-dark-100/30">
              <svg className="w-4 h-4 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-gray-400">Bank-level security with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
