'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/components/providers/auth-provider';
import { UserIcon } from '@heroicons/react/24/outline';

export default function AuthButtons() {
  const { user, loading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="h-10 w-20 bg-dark-100 animate-pulse rounded-lg"></div>
    );
  }

  // If user is logged in, show user menu
  if (user) {
    return (
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDropdown}
          className="flex items-center space-x-2 p-2 rounded-lg bg-dark-100 hover:bg-dark-200 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <UserIcon className="w-5 h-5 text-primary-500" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-200">
            {user.displayName?.split(' ')[0] || 'Account'}
          </span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop for closing the dropdown when clicking outside */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-xl bg-gradient-to-b from-dark-200 to-dark-300 shadow-xl border border-dark-100/50 p-2 z-50"
              >
                <div className="px-3 py-2 border-b border-dark-100/50 mb-2">
                  <p className="text-sm font-medium text-white">
                    {user.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

                <Link
                  href="/dashboard"
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg text-gray-300 hover:bg-dark-100/50 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>

                <Link
                  href="/dashboard/applications"
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg text-gray-300 hover:bg-dark-100/50 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  My Applications
                </Link>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg text-gray-300 hover:bg-dark-100/50 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile Settings
                </Link>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-lg text-accent-red.DEFAULT hover:bg-dark-100/50 hover:text-accent-red.light transition-colors mt-2 border-t border-dark-100/50 pt-2"
                >
                  Sign Out
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If user is not logged in, don't show any buttons
  return null;
}
