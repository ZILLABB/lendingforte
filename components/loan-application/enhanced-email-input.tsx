"use client";

import { useState, useEffect } from "react";
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface EnhancedEmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function EnhancedEmailInput({ value, onChange, error, required = false }: EnhancedEmailInputProps) {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  
  // Email validation regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Validate email when value changes
  useEffect(() => {
    if (value) {
      setIsValid(emailRegex.test(value));
    } else {
      setIsValid(null);
    }
  }, [value]);
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          className={`w-full bg-gray-700 rounded-lg pl-10 pr-10 py-3 text-gray-100 placeholder-gray-400
            focus:ring-2 focus:ring-green-500 focus:outline-none transition-all
            ${error ? 'border border-red-500 ring-red-500' : 'border-gray-700'}
            ${focused ? 'ring-2 ring-green-500' : ''}`}
          placeholder="johndoe@example.com"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "email-error" : undefined}
        />
        {value && isValid !== null && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {isValid ? (
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            ) : (
              <XCircleIcon className="h-5 w-5 text-red-500" />
            )}
          </div>
        )}
      </div>
      {error && (
        <p id="email-error" className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
