'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronDown, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface FramerMobileMenuProps {
  scrolled: boolean;
}

export default function FramerMobileMenu({ scrolled }: FramerMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loanDropdownOpen, setLoanDropdownOpen] = useState(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);

  // Close the mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="relative z-50">
      {/* Hamburger button */}
      <button
        className={`p-2 rounded-full transition-colors ${
          isOpen 
            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' 
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu with Framer Motion */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-lg z-50 overflow-y-auto"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Menu items */}
                <nav>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/"
                        className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                    </li>
                    
                    {/* Loans dropdown */}
                    <li>
                      <button
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                      >
                        <span>Loans</span>
                        <FaChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            loanDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {loanDropdownOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 overflow-hidden"
                          >
                            <li>
                              <Link
                                href="/personal-loans"
                                className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                Personal Loans
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/business-loans"
                                className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                Business Loans
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/mortgage-loans"
                                className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                Mortgage Loans
                              </Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                    
                    <li>
                      <Link
                        href="/about-us"
                        className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        About Us
                      </Link>
                    </li>
                    
                    {/* Contact dropdown */}
                    <li>
                      <button
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                      >
                        <span>Contact</span>
                        <FaChevronDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            contactDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <AnimatePresence>
                        {contactDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pl-4 space-y-3 py-3 overflow-hidden"
                          >
                            <div className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                              <FaPhoneAlt className="mr-3 text-green-600 dark:text-green-400" />
                              <a href="tel:+1234567890" className="hover:text-green-600 dark:hover:text-green-400">
                                (123) 456-7890
                              </a>
                            </div>
                            <div className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                              <FaEnvelope className="mr-3 text-green-600 dark:text-green-400" />
                              <a href="mailto:info@lendingforte.com" className="hover:text-green-600 dark:hover:text-green-400">
                                info@lendingforte.com
                              </a>
                            </div>
                            <div className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                              <FaMapMarkerAlt className="mr-3 text-green-600 dark:text-green-400" />
                              <span>123 Finance St, New York, NY</span>
                            </div>
                            <div className="pt-2">
                              <Link
                                href="/contact-us"
                                className="flex items-center px-4 py-2 rounded-xl font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                Contact Us
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
