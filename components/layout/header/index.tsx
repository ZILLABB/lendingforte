'use client';

import { useState, useEffect } from 'react';
import Logo from './logo';
import MobileNav from './mobile-nav';
import DesktopNav from './desktop-nav';
import AuthButtons from './auth-buttons';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-gradient-to-r from-dark-300 to-dark-200 shadow-lg'
          : 'py-4 bg-gradient-to-r from-dark-300/95 to-dark-200/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation - hidden on mobile */}
          <DesktopNav />

          {/* Right side items - visible only on desktop */}
          <div className="hidden md:flex items-center">
            <AuthButtons />
          </div>

          {/* Mobile Navigation - visible only on mobile */}
          <div className="flex items-center lg:hidden">
            <MobileNav scrolled={scrolled} />
          </div>
        </div>
      </div>
    </header>
  );
}
