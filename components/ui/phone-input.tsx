'use client';

import { useState, useEffect, useRef } from 'react';
import { formatPhoneNumber } from '@/lib/utils/formatters';

interface PhoneInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  helpText?: string;
}

export default function PhoneInput({
  id,
  name,
  value,
  onChange,
  onValueChange,
  label,
  placeholder = '(555) 555-5555',
  required = false,
  disabled = false,
  error,
  className = '',
  helpText
}: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the value when it changes
  useEffect(() => {
    const formatted = formatPhoneNumber(value);
    setDisplayValue(formatted);
  }, [value]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');

    // Limit to 10 digits
    const truncated = digitsOnly.slice(0, 10);

    // Format the phone number
    const formatted = formatPhoneNumber(truncated);

    // Update the display value
    setDisplayValue(formatted);

    // Call the original onChange handler with the raw digits
    const syntheticEvent = {
      target: {
        name,
        value: truncated
      }
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);

    // Call onValueChange if provided
    if (onValueChange) {
      onValueChange(truncated);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
          {label} {required && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="tel"
          id={id}
          name={name}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-200 border text-base ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-dark-100 focus:ring-primary-500'
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${className}`}
          style={{ paddingRight: '2.75rem' }}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          inputMode="tel"
          autoComplete="tel"
          pattern="\(\d{3}\) \d{3}-\d{4}"
        />

        {/* Phone icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2.5 sm:pr-3 pointer-events-none">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs sm:text-sm text-red-500" id={`${id}-error`}>
          {error}
        </p>
      )}

      {/* Help text */}
      {helpText && !error && (
        <p className="mt-1 text-xs sm:text-sm text-gray-400" id={`${id}-help`}>
          {helpText}
        </p>
      )}
    </div>
  );
}
