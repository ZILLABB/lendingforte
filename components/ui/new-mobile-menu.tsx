'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NewMobileMenuProps {
  scrolled: boolean;
}

export default function NewMobileMenu({ scrolled }: NewMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Hamburger button */}
      <button
        className={`p-2 rounded-full ${
          isOpen ? 'bg-gray-100 text-gray-900' : 'text-gray-200'
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

      {/* Mobile menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu panel */}
          <div className="fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-50 p-5">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
            <nav className="mt-5">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/loan-application"
                    className="block py-2 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Apply for Loan
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
