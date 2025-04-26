"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [showLoanDropdown, setShowLoanDropdown] = useState(false);
  
  // Toggle dropdown
  const toggleLoanDropdown = () => {
    setShowLoanDropdown(!showLoanDropdown);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowLoanDropdown(false);
    }
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdown = document.getElementById('loan-dropdown-menu');
      const button = document.getElementById('loan-dropdown-button');
      
      if (dropdown && button && !dropdown.contains(target) && !button.contains(target)) {
        setShowLoanDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed w-full z-50 bg-[#111111] py-4 shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo and brand */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center hover:opacity-90 transition-opacity" 
                aria-label="LendingForte"
              >
                <img
                  className="h-12 w-auto rounded-full"
                  src="/images/lendingforte/logod.png"
                  alt="LendingForte"
                />
               
              </Link>
            </div>

            {/* Phone number */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center hover:opacity-90 transition-opacity">
                <div className="bg-[#222222] rounded-full p-2 mr-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z"></path>
                    <path d="M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z"></path>
                  </svg>
                </div>
                <a
                  className="text-white text-sm font-normal"
                  href="tel:+13159498539"
                >
                  +1-(315)-949-8539
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center hover:opacity-90 transition-opacity">
                <div className="bg-[#222222] rounded-full p-2 mr-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
                  </svg>
                </div>
                <a
                  className="text-white text-sm font-normal"
                  href="mailto:contact@lendingforte.com"
                >
                  contact@lendingforte.com
                </a>
              </div>
            </div>

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
                  className="flex items-center px-4 py-2 text-white text-sm font-normal hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-lg"
                >
                  Loans
                  <FaChevronDown 
                    className={`ml-1.5 w-3 h-3 transition-transform duration-200 ${
                      showLoanDropdown ? 'rotate-180' : ''
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
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-xl border border-gray-100 p-2 z-20 transform origin-top transition-all duration-200 ease-out"
                  >
                    <Link
                      href="/personal-loan"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Personal Loan
                    </Link>
                    <Link
                      href="/mortgage"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Mortgage
                    </Link>
                    <Link
                      href="/business-loan"
                      role="menuitem"
                      className="flex px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors"
                      onClick={() => setShowLoanDropdown(false)}
                    >
                      Business Loan
                    </Link>
                  </div>
                )}
              </div>
              
              {/* About Us */}
              <Link
                href="/about-us"
                className="px-4 py-2 text-white text-sm font-normal hover:text-green-400 transition-colors"
              >
                About Us
              </Link>
              
              {/* Contact Us */}
              <Link
                href="/contact-us"
                className="px-4 py-2 text-white text-sm font-normal hover:text-green-400 transition-colors"
              >
                Contact Us
              </Link>
              
              {/* Apply for loan button */}
              <Link
                href="/loan-application"
                className="ml-2 px-5 py-2 text-sm font-medium bg-white text-green-600 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-200"
              >
                Apply For Loan
              </Link>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden">
              <MobileMenu scrolled={false} />
            </div>
          </div>
        </div>
      </header>
      {/* Add spacer div to prevent content from going under the header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
}