"use client";
import { useState } from "react"; // Import useState hook
// import { NextLink } from "next/link"; // Import NextLink from next/link

import MobileMenu from "./mobile-menu";
import Link from "next/link";

export default function Header() {
  const [showLoanDropdown, setShowLoanDropdown] = useState(false); // State to manage loan dropdown visibility

  return (
    <header className="absolute w-full  z-30">
      <div className="w-full shadow-lg border-b-gray-700 border-b mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            {/* Use NextLink for client-side navigation */}
            <Link href="/" className="block" aria-label="logo">
              <img
                className="h-14 w-14 fill-current"
                src="../images/lendingforte/lending_FORTE__4_-removebg-preview.png"
                alt="Workflow"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
              <li className="relative">
                {/* Loans title */}
                <button
                  onMouseEnter={() => setShowLoanDropdown(true)}
                  onMouseLeave={() => setShowLoanDropdown(false)} // Toggle loan dropdown on button click
                  className="font-medium hover:text-gray-400 px-4 py-4 flex items-center transition duration-150 ease-in-out"
                >
                  Loans
                </button>

                {/* Loan dropdown content */}
                {showLoanDropdown && (
                  <ul
                    className="absolute left-0 w-48  bg-black  border-gray-200 shadow-md rounded-lg"
                    onMouseEnter={() => setShowLoanDropdown(true)}
                    onMouseLeave={() => setShowLoanDropdown(false)}
                  >
                    <li>
                      {/* Personal loan option */}
                      <Link
                        href="/personal-loan"
                        className="block px-4 py-2 hover:bg-green-600 text-white rounded-lg"
                      >
                        Personal Loan
                      </Link>
                    </li>
                    <li>
                      {/* Mortgage option */}
                      <Link
                        href="/mortgage"
                        className="block px-4 py-2 hover:bg-green-600 text-white rounded-lg"
                      >
                        Mortgage
                      </Link>
                    </li>
                    <li>
                      {/* Business loan option */}
                      <Link
                        href="/business-loan"
                        className="block px-4 py-2 hover:bg-green-600 text-white rounded-lg"
                      >
                        Business Loan
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                {/* Use NextLink for client-side navigation */}
                <Link
                  href="/about-us"
                  className="font-medium  hover:text-gray-400 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              <li>
                {/* Use NextLink for client-side navigation */}
                <Link
                  href="/contact-us"
                  className="font-medium  hover:text-gray-400 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Contact Us
                </Link>
              </li>

              {/* Loan dropdown */}

              {/* Apply for loan button */}
              <li>
                {/* Use NextLink for client-side navigation */}
                <Link
                  href="/loan-application"
                  className="btn-sm text-white rounded-full bg-green-600 hover:bg-gray-300 hover:text-gray-800 ml-3"
                >
                  Apply For Loan
                </Link>
              </li>
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
