'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { 
  FaLeaf, 
  FaChartLine, 
  FaHandshake, 
  FaShieldAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock 
} from 'react-icons/fa';

export default function DesktopNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Refs for dropdown elements
  const dropdownRefs = {
    loans: useRef<HTMLDivElement>(null),
    premium: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check each dropdown
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        const button = document.getElementById(`${key}-dropdown-button`);
        if (
          activeDropdown === key &&
          ref.current &&
          button &&
          !ref.current.contains(target) &&
          !button.contains(target)
        ) {
          setActiveDropdown(null);
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setActiveDropdown(null);
    }
  };

  return (
    <nav className="hidden lg:flex items-center justify-center space-x-1">
      {/* Home */}
      <Link
        href="/"
        className="px-4 py-2 text-gray-300 text-sm font-medium hover:text-primary-400 transition-colors"
      >
        Home
      </Link>

      {/* Loans dropdown */}
      <div className="relative">
        <button
          id="loans-dropdown-button"
          onClick={() => toggleDropdown('loans')}
          onKeyDown={handleKeyDown}
          aria-expanded={activeDropdown === 'loans'}
          aria-haspopup="true"
          className="flex items-center px-4 py-2 text-gray-300 text-sm font-medium hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg"
        >
          <span className={activeDropdown === 'loans' ? 'text-primary-400' : ''}>Loans</span>
          <ChevronDownIcon
            className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${
              activeDropdown === 'loans' ? 'rotate-180 text-primary-400' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {activeDropdown === 'loans' && (
            <motion.div
              ref={dropdownRefs.loans}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-dark-200 to-dark-300 shadow-xl border border-dark-100/50 p-2 z-20"
            >
              <Link
                href="/marketing/loans/personal"
                className="flex px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                Personal Loan
              </Link>
              <Link
                href="/marketing/loans/mortgage"
                className="flex px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                Mortgage
              </Link>
              <Link
                href="/marketing/loans/business"
                className="flex px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                Business Loan
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Premium Solutions dropdown */}
      <div className="relative">
        <button
          id="premium-dropdown-button"
          onClick={() => toggleDropdown('premium')}
          onKeyDown={handleKeyDown}
          aria-expanded={activeDropdown === 'premium'}
          aria-haspopup="true"
          className="flex items-center px-4 py-2 text-gray-300 text-sm font-medium hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg"
        >
          <span className={activeDropdown === 'premium' ? 'text-primary-400' : ''}>Premium Solutions</span>
          <ChevronDownIcon
            className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${
              activeDropdown === 'premium' ? 'rotate-180 text-primary-400' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {activeDropdown === 'premium' && (
            <motion.div
              ref={dropdownRefs.premium}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-dark-200 to-dark-300 shadow-xl border border-dark-100/50 p-2 z-20"
            >
              <Link
                href="/marketing/premium/sustainable-investing"
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <FaLeaf className="w-4 h-4 mr-2 text-primary-400" />
                Sustainable Investing
              </Link>
              <Link
                href="/marketing/premium/wealth-management"
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <FaChartLine className="w-4 h-4 mr-2 text-primary-400" />
                Wealth Management
              </Link>
              <Link
                href="/marketing/premium/financial-advisory"
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <FaHandshake className="w-4 h-4 mr-2 text-primary-400" />
                Financial Advisory
              </Link>
              <Link
                href="/marketing/premium/insurance-solutions"
                className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                onClick={() => setActiveDropdown(null)}
              >
                <FaShieldAlt className="w-4 h-4 mr-2 text-primary-400" />
                Insurance Solutions
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Us */}
      <Link
        href="/marketing/about"
        className="px-4 py-2 text-gray-300 text-sm font-medium hover:text-primary-400 transition-colors"
      >
        About Us
      </Link>

      {/* Contact dropdown */}
      <div className="relative">
        <button
          id="contact-dropdown-button"
          onClick={() => toggleDropdown('contact')}
          onKeyDown={handleKeyDown}
          aria-expanded={activeDropdown === 'contact'}
          aria-haspopup="true"
          className="flex items-center px-4 py-2 text-gray-300 text-sm font-medium hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg"
        >
          <span className={activeDropdown === 'contact' ? 'text-primary-400' : ''}>Contact</span>
          <ChevronDownIcon
            className={`ml-1.5 w-4 h-4 transition-transform duration-200 ${
              activeDropdown === 'contact' ? 'rotate-180 text-primary-400' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {activeDropdown === 'contact' && (
            <motion.div
              ref={dropdownRefs.contact}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-b from-dark-200 to-dark-300 shadow-xl border border-dark-100/50 p-3 z-20"
            >
              <div className="space-y-3">
                <a
                  href="tel:+13159498539"
                  className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/20 mr-3">
                    <FaPhoneAlt className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  +1-(315)-949-8539
                </a>
                <a
                  href="mailto:contact@lendingforte.com"
                  className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/20 mr-3">
                    <FaEnvelope className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  contact@lendingforte.com
                </a>
                <div className="border-t border-dark-100/50 my-1"></div>
                <Link
                  href="/marketing/contact"
                  className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/20 mr-3">
                    <FaMapMarkerAlt className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  Visit Our Office
                </Link>
                <Link
                  href="/marketing/contact#hours"
                  className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-dark-100/50 hover:text-primary-400 rounded-lg transition-colors"
                  onClick={() => setActiveDropdown(null)}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-500/20 mr-3">
                    <FaClock className="w-3.5 h-3.5 text-primary-400" />
                  </div>
                  Business Hours
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apply for Loan button */}
      <Link
        href="/apply"
        className="ml-3 group relative flex items-center px-5 py-2 text-sm font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <span className="relative z-10 font-semibold">Apply For Loan</span>
        <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
      </Link>
    </nav>
  );
}
