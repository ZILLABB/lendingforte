"use client";

import { useState, useEffect } from "react";
import { PhoneIcon } from "@heroicons/react/24/outline";

interface EnhancedPhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function EnhancedPhoneInput({ value, onChange, error, required = false }: EnhancedPhoneInputProps) {
  const [focused, setFocused] = useState(false);
  
  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (input: string) => {
    // Remove all non-digits
    const digitsOnly = input.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    let formattedValue = '';
    if (digitsOnly.length > 0) {
      formattedValue = '(' + digitsOnly.slice(0, 3);
      if (digitsOnly.length > 3) {
        formattedValue += ') ' + digitsOnly.slice(3, 6);
      }
      if (digitsOnly.length > 6) {
        formattedValue += '-' + digitsOnly.slice(6, 10);
      }
    }
    
    return formattedValue;
  };
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onChange(formattedValue);
  };
  
  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const formattedValue = formatPhoneNumber(pastedText);
    onChange(formattedValue);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <PhoneIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="tel"
          className={`w-full bg-gray-700 rounded-lg pl-10 px-4 py-3 text-gray-100 placeholder-gray-400
            focus:ring-2 focus:ring-green-500 focus:outline-none transition-all
            ${error ? 'border border-red-500 ring-red-500' : 'border-gray-700'}
            ${focused ? 'ring-2 ring-green-500' : ''}`}
          placeholder="(555) 123-4567"
          value={value}
          onChange={handleChange}
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          maxLength={14}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "phone-error" : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
