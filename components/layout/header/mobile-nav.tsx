'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { FaLeaf, FaChartLine, FaHandshake, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '@/components/providers/auth-provider';

interface MobileNavProps {
  scrolled: boolean;
}

export default function MobileNav({ scrolled }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    loans: false,
    premium: false,
  });
  const { user, signOut } = useAuth();

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

  // Toggle dropdown items
  const toggleItem = (item: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <div className="lg:hidden relative z-[10000]">
      <div className="flex items-center">
        {/* Hamburger button - increased touch target size */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-3 rounded-full transition-all duration-300 ${
            isOpen
              ? 'text-primary-400 bg-dark-200 shadow-md'
              : 'text-gray-300 hover:text-primary-400 hover:bg-dark-200/50'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </motion.button>
      </div>

      {/* Mobile menu with Framer Motion */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu content */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-[9999] flex flex-col"
            >
              {/* Header with close button */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                className="bg-gradient-to-r from-dark-300 to-dark-200 backdrop-blur-sm border-b border-dark-100/50 flex justify-between items-center p-4 shadow-md"
              >
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-0.5 shadow-lg">
                    <Image
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full bg-dark-300"
                      src="/images/lendingforte/logod.png"
                      alt="LendingForte"
                    />
                  </div>
                  <span className="ml-3 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    LendingForte
                  </span>
                </Link>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-400 hover:text-primary-400 p-2 transition-colors rounded-full hover:bg-dark-200"
                >
                  <XMarkIcon className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Dark section with menu items - improved padding for mobile */}
              <div className="bg-gradient-to-b from-dark-300 to-dark-300/95 backdrop-blur-sm flex-1 px-5 py-6 overflow-y-auto">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-full flex flex-col"
                >
                  {/* User section if logged in */}
                  {user && (
                    <motion.div
                      variants={itemVariants}
                      className="mb-8 p-5 rounded-xl bg-dark-200/50 border border-dark-100/30"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-primary-500/20 flex items-center justify-center">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName || 'User'}
                              className="w-14 h-14 rounded-full"
                            />
                          ) : (
                            <span className="text-2xl font-semibold text-primary-500">
                              {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium text-lg">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-sm text-gray-400 truncate max-w-[200px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          href="/dashboard"
                          className="flex-1 py-3 px-4 text-base text-center bg-dark-100/50 hover:bg-dark-100 text-white rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          className="py-3 px-4 text-base text-center bg-dark-100/50 hover:bg-dark-100 text-accent-red.light rounded-lg transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Links */}
                  <nav className="mb-8">
                    <ul className="space-y-6">
                      <motion.li variants={itemVariants}>
                        <Link
                          href="/"
                          className="block text-xl text-white hover:text-primary-400 transition-colors py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative group">
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                          </span>
                        </Link>
                      </motion.li>

                      <motion.li variants={itemVariants}>
                        <Link
                          href="/marketing/about"
                          className="block text-xl text-white hover:text-primary-400 transition-colors py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative group">
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                          </span>
                        </Link>
                      </motion.li>

                      <motion.li variants={itemVariants}>
                        <Link
                          href="/marketing/contact"
                          className="block text-xl text-white hover:text-primary-400 transition-colors py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative group">
                            Contact Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                          </span>
                        </Link>
                      </motion.li>

                      {/* Loans dropdown */}
                      <motion.li variants={itemVariants}>
                        <button
                          onClick={() => toggleItem('loans')}
                          className="flex items-center justify-between w-full text-xl text-white hover:text-primary-400 transition-colors py-1"
                        >
                          <span className="relative group">
                            Loans
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                          </span>
                          <motion.div
                            animate={{ rotate: expandedItems.loans ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDownIcon className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {expandedItems.loans && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 pl-4 overflow-hidden"
                            >
                              <div className="space-y-4 border-l-2 border-primary-500/30 pl-4">
                                <Link
                                  href="/marketing/loans/personal"
                                  className="block text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Personal Loan
                                </Link>
                                <Link
                                  href="/marketing/loans/mortgage"
                                  className="block text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Mortgage
                                </Link>
                                <Link
                                  href="/marketing/loans/business"
                                  className="block text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5"
                                  onClick={() => setIsOpen(false)}
                                >
                                  Business Loan
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>

                      {/* Premium Financial Solutions dropdown */}
                      <motion.li variants={itemVariants}>
                        <button
                          onClick={() => toggleItem('premium')}
                          className="flex items-center justify-between w-full text-xl text-white hover:text-primary-400 transition-colors"
                        >
                          <span className="relative group">
                            Premium Solutions
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-400 transition-all group-hover:w-full"></span>
                          </span>
                          <motion.div
                            animate={{ rotate: expandedItems.premium ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDownIcon className="w-5 h-5" />
                          </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                          {expandedItems.premium && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-2 pl-4 overflow-hidden"
                            >
                              <div className="space-y-4 border-l-2 border-primary-500/30 pl-4">
                                <div className="flex items-center text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5">
                                  <FaLeaf className="w-4 h-4 mr-3 text-primary-400" />
                                  <Link
                                    href="/marketing/premium/sustainable-investing"
                                    className="block w-full"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Sustainable Investing
                                  </Link>
                                </div>
                                <div className="flex items-center text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5">
                                  <FaChartLine className="w-4 h-4 mr-3 text-primary-400" />
                                  <Link
                                    href="/marketing/premium/wealth-management"
                                    className="block w-full"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Wealth Management
                                  </Link>
                                </div>
                                <div className="flex items-center text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5">
                                  <FaHandshake className="w-4 h-4 mr-3 text-primary-400" />
                                  <Link
                                    href="/marketing/premium/financial-advisory"
                                    className="block w-full"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Financial Advisory
                                  </Link>
                                </div>
                                <div className="flex items-center text-lg text-gray-300 hover:text-primary-400 transition-colors py-1.5">
                                  <FaShieldAlt className="w-4 h-4 mr-3 text-primary-400" />
                                  <Link
                                    href="/marketing/premium/insurance-solutions"
                                    className="block w-full"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    Insurance Solutions
                                  </Link>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    </ul>
                  </nav>

                  {/* Apply for Loan Button */}
                  <motion.div
                    variants={itemVariants}
                    className="mb-8"
                  >
                    <Link
                      href="/apply"
                      className="block w-full py-4 px-5 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center font-medium rounded-lg hover:from-primary-700 hover:to-primary-800 transition-colors shadow-md border border-primary-500/20 text-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex items-center justify-center">
                        <FaLeaf className="mr-2" />
                        Apply For Loan
                      </span>
                    </Link>
                  </motion.div>

                  {/* Auth buttons removed */}


                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
