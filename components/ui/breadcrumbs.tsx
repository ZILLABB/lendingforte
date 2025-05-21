'use client';

import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Breadcrumb {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumbs({
  items,
  showHome = true,
  className = ''
}: BreadcrumbsProps) {
  // Add home item if showHome is true
  const breadcrumbItems = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items;
  
  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbItems.length - 1;
          
          return (
            <li key={index} className="inline-flex items-center">
              {!isFirst && (
                <ChevronRightIcon className="w-4 h-4 text-gray-500 mx-1" aria-hidden="true" />
              )}
              
              {item.href && !item.current ? (
                <Link
                  href={item.href}
                  className={`inline-flex items-center text-sm font-medium ${
                    isFirst ? 'text-gray-400 hover:text-primary-400' : 'text-gray-500 hover:text-primary-400'
                  } transition-colors`}
                >
                  {isFirst && showHome ? (
                    <HomeIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                  ) : null}
                  {item.label}
                </Link>
              ) : (
                <motion.span
                  className={`inline-flex items-center text-sm font-medium ${
                    isLast ? 'text-primary-400' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {isFirst && showHome ? (
                    <HomeIcon className="w-4 h-4 mr-1" aria-hidden="true" />
                  ) : null}
                  {item.label}
                </motion.span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
