"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface SimpleMobileMenuProps {
  scrolled: boolean;
}

export default function SimpleMobileMenu({ scrolled }: SimpleMobileMenuProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);
  
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

  // Debug logging
  console.log("Simple mobile menu state:", { mobileNavOpen });

  return (
    <div className="relative">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`relative z-50 p-2 rounded-full transition-all duration-300 ${
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
            <path 
              d="M18 6L6 18M6 6L18 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          ) : (
            <path 
              d="M4 6H20M4 12H20M4 18H20" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu overlay */}
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      {mobileNavOpen && (
        <div
          ref={mobileNav}
          className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl"
        >
          <div className="overflow-y-auto h-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Menu
                </span>
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
              
              <nav>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="block px-4 py-3 rounded-xl font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => setMobileNavOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
