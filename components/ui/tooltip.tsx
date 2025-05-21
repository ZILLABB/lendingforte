'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface TooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  showIcon?: boolean;
  iconClassName?: string;
  tooltipClassName?: string;
  delay?: number;
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  showIcon = true,
  iconClassName = '',
  tooltipClassName = '',
  delay = 300
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Position styles
  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2'
  };

  // Animation variants
  const variants = {
    top: {
      hidden: { opacity: 0, y: -5 },
      visible: { opacity: 1, y: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 5 },
      visible: { opacity: 1, x: 0 }
    },
    bottom: {
      hidden: { opacity: 0, y: 5 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -5 },
      visible: { opacity: 1, x: 0 }
    }
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (!isFocused) {
      setIsVisible(false);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    setIsVisible(true);
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
    if (!isHovered) {
      setIsVisible(false);
    }
  };

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={tooltipRef}
    >
      {children}
      
      {showIcon && !children && (
        <QuestionMarkCircleIcon 
          className={`w-5 h-5 text-gray-400 hover:text-primary-400 cursor-help transition-colors ${iconClassName}`} 
          aria-hidden="true"
          tabIndex={0}
        />
      )}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 w-64 p-3 text-sm bg-dark-200 border border-dark-100 rounded-lg shadow-lg ${positionStyles[position]} ${tooltipClassName}`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants[position]}
            transition={{ duration: 0.2 }}
            role="tooltip"
          >
            <div className="relative">
              {/* Arrow */}
              <div 
                className={`absolute w-3 h-3 bg-dark-200 border border-dark-100 transform rotate-45 ${
                  position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -mt-1.5 border-t-0 border-l-0' :
                  position === 'right' ? 'right-full top-1/2 -translate-y-1/2 -mr-1.5 border-t-0 border-r-0' :
                  position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 -mb-1.5 border-b-0 border-r-0' :
                  'left-full top-1/2 -translate-y-1/2 -ml-1.5 border-b-0 border-l-0'
                }`}
              ></div>
              
              {/* Content */}
              <div className="text-gray-300">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
