'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface ModernFormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isActive: boolean;
  isCompleted?: boolean;
  children: React.ReactNode;
  collapsible?: boolean;
}

export default function ModernFormSection({
  title,
  description,
  icon,
  isActive,
  isCompleted = false,
  children,
  collapsible = false
}: ModernFormSectionProps) {
  const [isExpanded, setIsExpanded] = useState(isActive);
  
  // If section becomes active, expand it
  if (isActive && !isExpanded) {
    setIsExpanded(true);
  }
  
  return (
    <div className={`mb-8 rounded-xl overflow-hidden transition-all duration-300 ${
      isActive 
        ? 'bg-dark-200 border-2 border-primary-500/30 shadow-lg shadow-primary-500/5' 
        : isCompleted 
          ? 'bg-dark-200/50 border border-dark-100/50' 
          : 'bg-dark-200/30 border border-dark-100/30'
    }`}>
      {/* Section header */}
      <div 
        className={`px-6 py-4 flex items-center justify-between ${
          collapsible ? 'cursor-pointer' : ''
        }`}
        onClick={() => collapsible && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          {/* Icon */}
          {icon && (
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
              isActive 
                ? 'bg-primary-500/20 text-primary-400' 
                : isCompleted 
                  ? 'bg-gray-700/50 text-gray-300' 
                  : 'bg-gray-800/50 text-gray-500'
            }`}>
              {icon}
            </div>
          )}
          
          <div>
            <h3 className={`text-lg font-medium ${
              isActive 
                ? 'text-white' 
                : isCompleted 
                  ? 'text-gray-300' 
                  : 'text-gray-500'
            }`}>
              {title}
              {isCompleted && !isActive && (
                <span className="ml-2 text-xs font-normal text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              )}
            </h3>
            
            {description && (
              <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        
        {/* Expand/collapse button for collapsible sections */}
        {collapsible && (
          <button 
            type="button"
            className="text-gray-400 hover:text-gray-300 transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            {isExpanded ? (
              <ChevronUpIcon className="w-5 h-5" />
            ) : (
              <ChevronDownIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      
      {/* Section content */}
      <AnimatePresence initial={false}>
        {(isExpanded || !collapsible) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-5 border-t border-dark-100/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
