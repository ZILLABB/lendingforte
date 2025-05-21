'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface for Nominatim API response
interface NominatimResult {
  place_id: number;
  osm_id: number;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    postcode?: string;
    country?: string;
    [key: string]: string | undefined;
  };
  lat: string;
  lon: string;
}

export interface ParsedAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
}

interface NominatimAddressAutocompleteProps {
  onAddressSelect: (address: ParsedAddress) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export default function NominatimAddressAutocomplete({
  onAddressSelect,
  placeholder = 'Enter your address',
  className = '',
  required = false,
  id = 'address',
  name = 'address',
  value,
  onChange,
  disabled = false,
  error
}: NominatimAddressAutocompleteProps) {
  // State for the input value
  const [inputValue, setInputValue] = useState('');
  // State for suggestions
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Track the currently focused suggestion index
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  // Refs for DOM elements
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sync the input value with the external value if provided
  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  // Function to fetch address suggestions from Nominatim API
  const fetchAddressSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) return;

    setLoading(true);

    try {
      // Using Nominatim API (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'LendingForte Loan Application (https://lendingforte.com)'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching address suggestions: ${response.statusText}`);
      }

      const data: NominatimResult[] = await response.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Call the external onChange handler if provided
    if (onChange) {
      onChange(newValue);
    }

    // Reset the focused index when the input changes
    setFocusedIndex(-1);

    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay the API call
    if (newValue.length >= 2) {
      debounceTimeout.current = setTimeout(() => {
        fetchAddressSuggestions(newValue);
      }, 300); // 300ms debounce
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Format address for display and selection
  const formatAddress = (result: NominatimResult): ParsedAddress => {
    const address = result.address;

    // Extract street (combine house number and road if available)
    let street = '';
    if (address.house_number && address.road) {
      street = `${address.house_number} ${address.road}`;
    } else if (address.road) {
      street = address.road;
    } else {
      // Fallback to first part of display name if no road
      const parts = result.display_name.split(',');
      street = parts[0].trim();
    }

    // Extract city (could be city, town, or village)
    const city = address.city || address.town || address.village || '';

    // Extract state
    const state = address.state || '';

    // Extract postal code
    const zipCode = address.postcode || '';

    // Extract country
    const country = address.country || '';

    return {
      street,
      city,
      state,
      zipCode,
      country,
      fullAddress: result.display_name
    };
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (result: NominatimResult) => {
    const parsedAddress = formatAddress(result);
    setInputValue(parsedAddress.street || parsedAddress.fullAddress);
    setSuggestions([]);
    setShowSuggestions(false);

    // Call the onAddressSelect callback
    onAddressSelect(parsedAddress);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || !suggestions.length) return;

    // Arrow down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    }
    // Arrow up
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
    }
    // Enter
    else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[focusedIndex]);
    }
    // Escape
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll the focused suggestion into view
  useEffect(() => {
    if (focusedIndex >= 0 && suggestionsRef.current) {
      const focusedElement = suggestionsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }
    }
  }, [focusedIndex]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => inputValue.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-dark-200 border border-dark-100 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
          required={required}
          disabled={disabled}
          autoComplete="off"
        />

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 max-h-60 overflow-y-auto bg-dark-300 border border-dark-100 rounded-lg shadow-xl"
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={suggestion.place_id}
                onClick={() => handleSelectSuggestion(suggestion)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === focusedIndex
                    ? 'bg-primary-500/20 text-white'
                    : 'hover:bg-dark-200 text-gray-300'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 mr-3">
                    <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{suggestion.display_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
