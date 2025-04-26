"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

interface MobileMenuProps {
  scrolled: boolean;
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  const [loanDropdownOpen, setLoanDropdownOpen] = useState<boolean>(false);

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

  return (
    <div>
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`relative z-40 p-2 rounded-full transition-all duration-300 ${
          mobileNavOpen 
            ? "text-gray-900 bg-gray-100" 
            : scrolled 
              ? "text-gray-800 hover:bg-gray-100/80" 
              : "text-white hover:bg-white/20"
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
            className="fixed top-0 right-0 bottom-0 z-30 w-full max-w-sm bg-white shadow-2xl"
          >
            <div className="overflow-y-auto h-full">
              <div className="p-6 pb-4 border-b">
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
                    <span className="ml-2 text-lg font-semibold text-gray-900">
                      LendingForte
                    </span>
                  </Link>
                  <button
                    className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition-colors"
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
                
                {/* Contact info in mobile menu */}
                <div className="grid grid-cols-1 gap-3 mb-6">
                  <a 
                    href="tel:+13159498539" 
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <FaPhoneAlt className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">+1-(315)-949-8539</span>
                  </a>
                  <a 
                    href="mailto:contact@lendingforte.com" 
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-2 bg-green-100 rounded-full mr-3">
                      <FaEnvelope className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm text-gray-700">contact@lendingforte.com</span>
                  </a>
                </div>
              </div>

              <nav className="p-6">
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  
                  {/* Loans dropdown */}
                  <li>
                    <button
                      onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                      aria-expanded={loanDropdownOpen}
                    >
                      <span>Loans</span>
                      <motion.div
                        animate={{ rotate: loanDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaChevronDown />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {loanDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 py-1 overflow-hidden"
                        >
                          <div className="pl-4 py-1 space-y-1">
                            <Link
                              href="/personal-loan"
                              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Personal Loan
                            </Link>
                            <Link
                              href="/mortgage"
                              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Mortgage Loan
                            </Link>
                            <Link
                              href="/business-loan"
                              className="block px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setMobileNavOpen(false)}
                            >
                              Business Loan
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                  
                  <li>
                    <Link
                      href="/about-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  
                  <li>
                    <Link
                      href="/contact-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link
                    href="/loan-application"
                    className="flex justify-center w-full py-3.5 px-4 text-center font-medium text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    Apply For Loan
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
