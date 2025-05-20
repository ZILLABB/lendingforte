"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaPhoneAlt, FaEnvelope, FaCog } from "react-icons/fa";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/components/theme/theme-provider";

interface MobileMenuProps {
  scrolled: boolean;
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [loanDropdownOpen, setLoanDropdownOpen] = useState<boolean>(false);
  const [contactDropdownOpen, setContactDropdownOpen] = useState<boolean>(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);

  // Close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [mobileNavOpen]);

  // Close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent): void => {
      if (!mobileNavOpen || key !== "Escape") return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [mobileNavOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!mobileNavOpen) return; // Only add listeners when mobile menu is open

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Close loan dropdown when clicking outside
      if (loanDropdownOpen) {
        const loanButton = document.querySelector('[aria-expanded="true"][aria-controls="loan-dropdown"]');
        const loanContent = document.getElementById('loan-dropdown-content');

        if (loanButton && loanContent &&
            !loanButton.contains(target) &&
            !loanContent.contains(target)) {
          setLoanDropdownOpen(false);
        }
      }

      // Close contact dropdown when clicking outside
      if (contactDropdownOpen) {
        const contactButton = document.querySelector('[aria-expanded="true"][aria-controls="contact-dropdown"]');
        const contactContent = document.getElementById('contact-dropdown-content');

        if (contactButton && contactContent &&
            !contactButton.contains(target) &&
            !contactContent.contains(target)) {
          setContactDropdownOpen(false);
        }
      }

      // Close settings dropdown when clicking outside
      if (settingsDropdownOpen) {
        const settingsButton = document.querySelector('[aria-expanded="true"][aria-controls="settings-dropdown"]');
        const settingsContent = document.getElementById('settings-dropdown-content');

        if (settingsButton && settingsContent &&
            !settingsButton.contains(target) &&
            !settingsContent.contains(target)) {
          setSettingsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileNavOpen, loanDropdownOpen, contactDropdownOpen, settingsDropdownOpen]);

  return (
    <div>
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`relative z-40 p-2 rounded-full transition-all duration-300 ${
          mobileNavOpen
            ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
            : scrolled
              ? "text-gray-800 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
              : "text-gray-800 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
        }`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {mobileNavOpen ? (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2 }}
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2 }}
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay with framer-motion */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu panel with framer-motion */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            ref={mobileNav}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-30 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl dark:shadow-gray-950/50"
          >
            <div className="overflow-y-auto h-full">
              <div className="p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <Image
                      width={32}
                      height={32}
                      className="h-8 w-auto"
                      src="/images/lendingforte/lending_FORTE__4_-removebg-preview.png"
                      alt="LendingForte"
                    />
                    <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                      LendingForte
                    </span>
                  </Link>
                  <button
                    className="p-2 text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => setMobileNavOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Apply for Loan button in mobile menu */}
                <div className="mb-6">
                  <Link
                    href="/loan-application"
                    className="flex items-center justify-center p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    <span className="font-medium">Apply For Loan</span>
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>

              <nav className="p-6">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Home
                    </Link>
                  </li>

                  {/* Loans dropdown */}
                  <li>
                    <button
                      onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      aria-expanded={loanDropdownOpen}
                      aria-controls="loan-dropdown"
                    >
                      <span>Loans</span>
                      <motion.div
                        animate={{ rotate: loanDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 dark:text-green-400"
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {loanDropdownOpen && (
                        <motion.div
                          id="loan-dropdown"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 py-1 overflow-hidden"
                        >
                          <div id="loan-dropdown-content" className="pl-4 py-1 space-y-1">
                            <Link
                              href="/personal-loan"
                              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Personal Loan
                            </Link>
                            <Link
                              href="/mortgage"
                              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Mortgage Loan
                            </Link>
                            <Link
                              href="/business-loan"
                              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Business Loan
                            </Link>
                            <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                            <Link
                              href="/loan-application"
                              className="block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Apply For Loan
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <Link
                      href="/about-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>

                  {/* Contact dropdown */}
                  <li>
                    <button
                      onClick={() => setContactDropdownOpen(!contactDropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      aria-expanded={contactDropdownOpen}
                      aria-controls="contact-dropdown"
                    >
                      <span>Contact</span>
                      <motion.div
                        animate={{ rotate: contactDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 dark:text-green-400"
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {contactDropdownOpen && (
                        <motion.div
                          id="contact-dropdown"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 py-1 overflow-hidden"
                        >
                          <div id="contact-dropdown-content" className="pl-4 py-1 space-y-3">
                            <a
                              href="tel:+13159498539"
                              className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                              <FaPhoneAlt className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                              +1-(315)-949-8539
                            </a>
                            <a
                              href="mailto:contact@lendingforte.com"
                              className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            >
                              <FaEnvelope className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                              contact@lendingforte.com
                            </a>
                            <Link
                              href="/contact-us"
                              className="flex items-center px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              <FaMapMarkerAlt className="w-4 h-4 mr-3 text-green-600 dark:text-green-400" />
                              Visit Our Office
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>

                  <li>
                    <Link
                      href="/contact-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>

                  {/* Settings dropdown */}
                  <li>
                    <button
                      onClick={() => setSettingsDropdownOpen(!settingsDropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                      aria-expanded={settingsDropdownOpen}
                      aria-controls="settings-dropdown"
                    >
                      <span>Settings</span>
                      <motion.div
                        animate={{ rotate: settingsDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-600 dark:text-green-400"
                      >
                        <FaCog className="w-4 h-4" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {settingsDropdownOpen && (
                        <motion.div
                          id="settings-dropdown"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 py-1 overflow-hidden"
                        >
                          <div id="settings-dropdown-content" className="pl-4 py-1 space-y-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Theme</p>
                            <button
                              onClick={() => setTheme('light')}
                              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                                theme === 'light'
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              <SunIcon className="w-4 h-4 mr-2" />
                              Light
                            </button>
                            <button
                              onClick={() => setTheme('dark')}
                              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                                theme === 'dark'
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              <MoonIcon className="w-4 h-4 mr-2" />
                              Dark
                            </button>
                            <button
                              onClick={() => setTheme('system')}
                              className={`flex items-center w-full px-4 py-2 rounded-lg ${
                                theme === 'system'
                                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                              }`}
                            >
                              <ComputerDesktopIcon className="w-4 h-4 mr-2" />
                              System
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3">
                  <Link
                    href="/loan-application"
                    className="flex justify-center w-full py-3.5 px-4 text-center font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Apply For Loan
                  </Link>
                  <Link
                    href="/contact-us"
                    className="flex justify-center w-full py-3.5 px-4 text-center font-medium text-white/90 bg-gray-700 rounded-xl hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
