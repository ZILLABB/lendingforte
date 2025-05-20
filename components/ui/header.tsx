"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown, FaCog, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import MobileMenu from "./mobile-menu";
import { useTheme } from "../../components/theme/theme-provider";

export default function Header() {
  const [showLoanDropdown, setShowLoanDropdown] = useState(false);
  const [showContactDropdown, setShowContactDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  // Refs for dropdown elements
  const loanDropdownRef = useRef<HTMLDivElement>(null);
  const contactDropdownRef = useRef<HTMLDivElement>(null);
  const settingsDropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdowns
  const toggleLoanDropdown = () => {
    setShowLoanDropdown(!showLoanDropdown);
    if (showContactDropdown) setShowContactDropdown(false);
    if (showSettingsDropdown) setShowSettingsDropdown(false);
  };

  const toggleContactDropdown = () => {
    setShowContactDropdown(!showContactDropdown);
    if (showLoanDropdown) setShowLoanDropdown(false);
    if (showSettingsDropdown) setShowSettingsDropdown(false);
  };

  const toggleSettingsDropdown = () => {
    setShowSettingsDropdown(!showSettingsDropdown);
    if (showLoanDropdown) setShowLoanDropdown(false);
    if (showContactDropdown) setShowContactDropdown(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowLoanDropdown(false);
      setShowContactDropdown(false);
      setShowSettingsDropdown(false);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Handle loan dropdown
      const loanButton = document.getElementById('loan-dropdown-button');
      const loanDropdownMenu = document.getElementById('loan-dropdown-menu');
      if (
        showLoanDropdown &&
        loanButton &&
        loanDropdownMenu &&
        !loanDropdownMenu.contains(target) &&
        !loanButton.contains(target)
      ) {
        setShowLoanDropdown(false);
      }

      // Handle contact dropdown
      const contactButton = document.getElementById('contact-dropdown-button');
      if (
        showContactDropdown &&
        contactDropdownRef.current &&
        contactButton &&
        !contactDropdownRef.current.contains(target) &&
        !contactButton.contains(target)
      ) {
        setShowContactDropdown(false);
      }

      // Handle settings dropdown
      const settingsButton = document.getElementById('settings-dropdown-button');
      const settingsDropdownMenu = document.getElementById('settings-dropdown-menu');
      if (
        showSettingsDropdown &&
        settingsButton &&
        settingsDropdownMenu &&
        !settingsDropdownMenu.contains(target) &&
        !settingsButton.contains(target)
      ) {
        setShowSettingsDropdown(false);
      }

      // Handle mobile settings dropdown
      const mobileSettingsButton = document.getElementById('mobile-settings-button');
      const mobileSettingsDropdown = document.getElementById('mobile-settings-dropdown');
      if (
        showSettingsDropdown &&
        mobileSettingsButton &&
        mobileSettingsDropdown &&
        !mobileSettingsDropdown.contains(target) &&
        !mobileSettingsButton.contains(target)
      ) {
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showLoanDropdown, showContactDropdown, showSettingsDropdown]);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg'
          : 'py-4 bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center hover:opacity-90 transition-opacity"
                aria-label="LendingForte"
              >
                <div className="relative overflow-hidden rounded-full bg-gradient-to-br from-green-400 to-green-600 p-0.5 shadow-lg">
                  <Image
                    width={48}
                    height={48}
                    className="h-12 w-auto rounded-full bg-gray-900"
                    src="/images/lendingforte/logod.png"
                    alt="LendingForte"
                  />
                </div>
                <span className="ml-3 text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent hidden sm:block">
                  LendingForte
                </span>
              </Link>
            </div>

            {/* Apply for Loan button (visible on larger screens) */}
            <div className="hidden lg:flex items-center ml-4">
              <Link
                href="/loan-application"
                className="group relative flex items-center px-6 py-3 text-sm font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 overflow-hidden"
              >
                <span className="relative z-10 mr-2 font-semibold">Apply For Loan</span>
                <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
              </Link>
            </div>

            {/* Theme toggle is now in the settings dropdown */}

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center">
              {/* Loans dropdown */}
              <div className="relative">
                <button
                  id="loan-dropdown-button"
                  onClick={toggleLoanDropdown}
                  onKeyDown={handleKeyDown}
                  aria-expanded={showLoanDropdown}
                  aria-haspopup="true"
                  className="flex items-center px-4 py-2 text-gray-300 text-sm font-medium hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                >
                  <span className={showLoanDropdown ? 'text-green-400' : ''}>Loans</span>
                  <FaChevronDown
                    className={`ml-1.5 w-3 h-3 transition-transform duration-200 ${
                      showLoanDropdown ? 'rotate-180 text-green-400' : ''
                    }`}
                  />
                </button>

                {/* Loan dropdown */}
                {showLoanDropdown && (
                  <div
                    id="loan-dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="loan-dropdown-button"
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border border-gray-700/50 p-2 z-20 transform origin-top transition-all duration-200 ease-out backdrop-blur-sm"
                  >
                    <Link
                      href="/personal-loan"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Personal Loan
                    </Link>
                    <Link
                      href="/mortgage"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Mortgage
                    </Link>
                    <Link
                      href="/business-loan"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Business Loan
                    </Link>
                    <div className="border-t border-gray-700/50 my-1"></div>
                    <Link
                      href="/loan-application"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-600 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Apply For Loan
                    </Link>
                  </div>
                )}
              </div>

              {/* About Us */}
              <Link
                href="/about-us"
                className="px-4 py-2 text-gray-300 text-sm font-medium hover:text-green-400 transition-colors"
              >
                About Us
              </Link>

              {/* Contact dropdown */}
              <div className="relative">
                <button
                  id="contact-dropdown-button"
                  onClick={toggleContactDropdown}
                  onKeyDown={handleKeyDown}
                  aria-expanded={showContactDropdown}
                  aria-haspopup="true"
                  className="flex items-center px-4 py-2 text-gray-300 text-sm font-medium hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                >
                  <span className={showContactDropdown ? 'text-green-400' : ''}>Contact</span>
                  <FaChevronDown
                    className={`ml-1.5 w-3 h-3 transition-transform duration-200 ${
                      showContactDropdown ? 'rotate-180 text-green-400' : ''
                    }`}
                  />
                </button>

                {/* Contact dropdown */}
                {showContactDropdown && (
                  <div
                    ref={contactDropdownRef}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="contact-dropdown-button"
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border border-gray-700/50 p-3 z-20 transform origin-top transition-all duration-200 ease-out backdrop-blur-sm"
                  >
                    <div className="space-y-3">
                      <a
                        href="tel:+13159498539"
                        role="menuitem"
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 mr-3">
                          <FaPhoneAlt className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        +1-(315)-949-8539
                      </a>
                      <a
                        href="mailto:contact@lendingforte.com"
                        role="menuitem"
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 mr-3">
                          <FaEnvelope className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        contact@lendingforte.com
                      </a>
                      <div className="border-t border-gray-700/50 my-1"></div>
                      <Link
                        href="/contact-us"
                        role="menuitem"
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                        onClick={() => setShowContactDropdown(false)}
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 mr-3">
                          <FaMapMarkerAlt className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        Visit Our Office
                      </Link>
                      <Link
                        href="/contact-us#hours"
                        role="menuitem"
                        className="flex items-center px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 rounded-lg transition-colors"
                        onClick={() => setShowContactDropdown(false)}
                      >
                        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-500/20 mr-3">
                          <FaClock className="w-3.5 h-3.5 text-green-400" />
                        </div>
                        Business Hours
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Contact Us button */}
              <Link
                href="/contact-us"
                className="ml-3 px-5 py-2.5 text-sm font-medium bg-gray-700/80 text-gray-200 rounded-lg hover:bg-gray-600 shadow-sm hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Contact Us
              </Link>

              {/* Settings dropdown */}
              <div className="relative ml-3">
                <button
                  id="settings-dropdown-button"
                  onClick={toggleSettingsDropdown}
                  onKeyDown={handleKeyDown}
                  aria-expanded={showSettingsDropdown}
                  aria-haspopup="true"
                  className="flex items-center p-2 text-gray-300 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                >
                  <FaCog className={`w-5 h-5 transition-transform duration-300 ${showSettingsDropdown ? 'rotate-90 text-green-400' : ''}`} />
                </button>

                {/* Settings dropdown menu */}
                {showSettingsDropdown && (
                  <div
                    id="settings-dropdown-menu"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="settings-dropdown-button"
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl border border-gray-700/50 p-3 z-20 transform origin-top transition-all duration-200 ease-out backdrop-blur-sm"
                  >
                    <div className="mb-2 pb-2 border-b border-gray-700/50">
                      <p className="text-sm font-medium text-gray-400 mb-2 px-2">Theme</p>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
                            theme === 'light'
                              ? 'bg-gray-700/70 text-white'
                              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-amber-500/20 mr-2">
                            <SunIcon className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          Light
                        </button>
                        <button
                          onClick={() => setTheme('dark')}
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
                            theme === 'dark'
                              ? 'bg-gray-700/70 text-white'
                              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-500/20 mr-2">
                            <MoonIcon className="w-3.5 h-3.5 text-indigo-400" />
                          </div>
                          Dark
                        </button>
                        <button
                          onClick={() => setTheme('system')}
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
                            theme === 'system'
                              ? 'bg-gray-700/70 text-white'
                              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                          }`}
                        >
                          <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 mr-2">
                            <ComputerDesktopIcon className="w-3.5 h-3.5 text-blue-400" />
                          </div>
                          System
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center">
              {/* Mobile settings button */}
              <div className="relative">
                <button
                  id="mobile-settings-button"
                  onClick={toggleSettingsDropdown}
                  className="p-2 mr-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg"
                  aria-label="Settings"
                  aria-expanded={showSettingsDropdown}
                  aria-haspopup="true"
                >
                  <FaCog className={`w-5 h-5 transition-transform duration-300 ${showSettingsDropdown ? 'rotate-90' : ''}`} />
                </button>

                {/* Mobile settings dropdown */}
                {showSettingsDropdown && (
                  <div
                    id="mobile-settings-dropdown"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="mobile-settings-button"
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700 p-3 z-20 transform origin-top transition-all duration-200 ease-out"
                  >
                    <div className="mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">Theme</p>
                      <div className="flex flex-col space-y-1">
                        <button
                          onClick={() => setTheme('light')}
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
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
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
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
                          className={`flex items-center px-2 py-1.5 text-sm rounded-lg ${
                            theme === 'system'
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          <ComputerDesktopIcon className="w-4 h-4 mr-2" />
                          System
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <MobileMenu scrolled={scrolled} />
            </div>
          </div>
        </div>
      </header>
      {/* Add spacer div to prevent content from going under the header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}