'use client';

import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '@/lib/utils/formatters';

interface CurrencyInputProps {
  id: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  className?: string;
  helpText?: string;
  min?: number;
  max?: number;
}

export default function CurrencyInput({
  id,
  name,
  value,
  onChange,
  onValueChange,
  label,
  placeholder = '$0',
  required = false,
  disabled = false,
  error,
  className = '',
  helpText,
  min,
  max
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Format the value when it changes or when focus state changes
  useEffect(() => {
    if (isFocused) {
      // When focused, show just the number without formatting
      // But keep the cursor position intact
      if (inputRef.current === document.activeElement) {
        return; // Don't update while user is typing and focused
      }

      // If value is empty or just a dollar sign, show empty string
      if (!value || value === '$') {
        setDisplayValue('');
      } else {
        // Remove all non-numeric characters except decimal point
        const numericValue = value.replace(/[^\d.]/g, '');
        setDisplayValue(numericValue);
      }
    } else {
      // When not focused, show formatted value
      if (value) {
        // Remove all non-numeric characters except decimal point
        const numericValue = value.replace(/[^\d.]/g, '');
        const numValue = parseFloat(numericValue);

        if (!isNaN(numValue)) {
          setDisplayValue(formatCurrency(numValue));
        } else {
          setDisplayValue('');
        }
      } else {
        setDisplayValue('');
      }
    }
  }, [value, isFocused]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the current cursor position
    const cursorPosition = e.target.selectionStart;

    // Get the current value and remove all non-numeric characters except decimal point
    let inputValue = e.target.value;

    // Remove dollar sign and commas
    inputValue = inputValue.replace(/[$,]/g, '');

    // Ensure only valid numeric input (allow only one decimal point)
    const parts = inputValue.split('.');
    if (parts.length > 2) {
      // More than one decimal point, keep only the first one
      inputValue = parts[0] + '.' + parts.slice(1).join('');
    }

    // Remove all non-numeric characters except the decimal point
    inputValue = inputValue.replace(/[^\d.]/g, '');

    // Call the original onChange handler if provided
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: inputValue
        }
      };
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
    }

    // Call onValueChange if provided
    if (onValueChange) {
      onValueChange(inputValue);
    }

    // Restore cursor position, accounting for removed characters
    if (inputRef.current) {
      // Calculate new cursor position
      const newPosition = Math.max(0, cursorPosition || 0);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);

    // Remove formatting when focused
    const numericValue = value.replace(/[$,]/g, '');
    setDisplayValue(numericValue);

    // Select all text on focus for easy editing
    e.target.select();
  };

  // Handle blur
  const handleBlur = () => {
    setIsFocused(false);

    // Apply formatting when blurred
    if (value) {
      const numericValue = value.replace(/[^\d.]/g, '');
      const numValue = parseFloat(numericValue);

      if (!isNaN(numValue)) {
        // Format the value
        setDisplayValue(formatCurrency(numValue));

        // Validate min/max if provided
        if (min !== undefined && numValue < min) {
          if (onValueChange) {
            onValueChange(min.toString());
          }
        }
        if (max !== undefined && numValue > max) {
          if (onValueChange) {
            onValueChange(max.toString());
          }
        }
      } else {
        setDisplayValue('');
      }
    } else {
      setDisplayValue('');
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
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
          <span className="text-gray-400">$</span>
        </div>

        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={isFocused ? value : displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full pl-7 sm:pl-8 px-3 sm:px-4 py-2.5 sm:py-3 bg-dark-200 border text-base ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-dark-100 focus:ring-primary-500'
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${className}`}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : helpText ? `${id}-help` : undefined}
          inputMode="decimal"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Error message */}
      {typeof error === 'string' && error && (
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
