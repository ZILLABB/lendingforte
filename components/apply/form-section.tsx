'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isOpen?: boolean;
  isCompleted?: boolean;
  isActive?: boolean;
  onToggle?: () => void;
  collapsible?: boolean;
}

export default function FormSection({
  title,
  description,
  children,
  icon,
  isOpen = true,
  isCompleted = false,
  isActive = false,
  onToggle,
  collapsible = false
}: FormSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Handle toggle
  const handleToggle = () => {
    if (collapsible && onToggle) {
      onToggle();
    }
  };

  return (
    <motion.div
      className={`bg-dark-200 border ${
        isActive
          ? 'border-primary-500/50'
          : isCompleted
            ? 'border-green-500/30'
            : 'border-dark-100/50'
      } rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
        isActive ? 'shadow-lg shadow-primary-500/10' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section header */}
      <div
        className={`px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between ${
          collapsible ? 'cursor-pointer' : ''
        } ${
          isActive ? 'bg-dark-300' : 'bg-dark-300/50'
        }`}
        onClick={handleToggle}
      >
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Icon or completion indicator */}
          {icon ? (
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
              isActive
                ? 'bg-primary-500 text-white'
                : isCompleted
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-dark-100/50 text-gray-400'
            }`}>
              {isCompleted ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                icon
              )}
            </div>
          ) : (
            <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center ${
              isActive
                ? 'bg-primary-500 text-white'
                : isCompleted
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-dark-100/50 text-gray-400'
            }`}>
              {isCompleted ? (
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span className="text-xs sm:text-sm font-medium">{title.charAt(0)}</span>
              )}
            </div>
          )

          <div>
            <h3 className={`text-base sm:text-lg font-medium ${
              isActive ? 'text-white' : isCompleted ? 'text-gray-300' : 'text-gray-400'
            }`}>
              {title}
            </h3>

            {description && (
              <p className="text-xs sm:text-sm text-gray-500">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Toggle indicator for collapsible sections */}
        {collapsible && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-gray-400 ${isHovered ? 'text-primary-400' : ''}`}
          >
            <ChevronDownIcon className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      {/* Section content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 sm:p-6 border-t border-dark-100/30">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
