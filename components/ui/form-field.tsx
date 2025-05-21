'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './tooltip';

interface FormFieldProps {
  id?: string;
  name: string;
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  helpText?: string;
  tooltip?: string | React.ReactNode;
  tooltipContent?: React.ReactNode;
  icon?: React.ReactNode;
  options?: { value: string; label: string }[];
  rows?: number;
  autoComplete?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;
  children?: React.ReactNode;
}

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error,
  className = '',
  helpText,
  tooltip,
  tooltipContent,
  icon,
  options,
  rows = 3,
  autoComplete,
  min,
  max,
  step,
  pattern,
  children
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);
  };

  // Base input classes
  const inputClasses = `w-full px-4 py-3 bg-dark-200 border ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-dark-100 focus:ring-primary-500'
  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${className}`;

  // Icon padding
  const iconPadding = icon ? 'pl-10' : '';

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label htmlFor={id} className="block text-sm font-medium text-gray-300">
            {label} {required && <span className="text-primary-500">*</span>}
          </label>

          {(tooltipContent || tooltip) && (
            <Tooltip content={tooltipContent || tooltip} position="top" />
          )}
        </div>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
          </div>
        )}

        {/* Children or default input field */}
        {children ? (
          children
        ) : type !== 'select' && type !== 'textarea' ? (
          <motion.input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`${inputClasses} ${iconPadding}`}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            autoComplete={autoComplete}
            min={min}
            max={max}
            step={step}
            pattern={pattern}
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
          />
        ) : type === 'select' ? (
          <motion.select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`${inputClasses} ${iconPadding}`}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
        ) : (
          <motion.textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={rows}
            className={`${inputClasses} ${iconPadding}`}
            required={required}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
            whileFocus={{ scale: 1.005 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {/* Focus indicator */}
        <AnimatePresence>
          {isFocused && !error && !children && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none border-2 border-primary-500 opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="mt-1 text-sm text-red-500"
            id={`${id ? `${id}-error` : undefined}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Help text */}
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-400" id={`${id ? `${id}-help` : undefined}`}>
          {helpText}
        </p>
      )}
    </div>
  );
}
