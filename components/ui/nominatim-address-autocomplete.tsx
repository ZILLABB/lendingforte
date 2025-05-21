'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Create a cache for Nominatim results to reduce API calls
interface CacheItem {
  timestamp: number;
  results: NominatimResult[];
}

// Cache with 24-hour expiration
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const resultsCache = new Map<string, CacheItem>();

// Define the Nominatim response type
interface NominatimResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address: NominatimAddress;
}

interface NominatimAddress {
  house_number?: string;
  road?: string;
  street?: string;
  suburb?: string;
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  state?: string;
  state_code?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
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
  value: string;
  onAddressSelect: (address: ParsedAddress) => void;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  label?: string;
}

export default function NominatimAddressAutocomplete({
  value,
  onAddressSelect,
  onValueChange,
  placeholder = 'Enter your address',
  error = false,
  disabled = false,
  className = '',
  id,
  name,
  required = false,
  label,
}: NominatimAddressAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update query when value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Fetch address suggestions from Nominatim
  const fetchAddressSuggestions = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Check cache first
    const cacheKey = searchQuery.toLowerCase().trim();
    const cachedItem = resultsCache.get(cacheKey);

    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_EXPIRATION) {
      // Use cached results if they exist and haven't expired
      setSuggestions(cachedItem.results);
      setIsLoading(false);

      if (cachedItem.results.length === 0 && searchQuery.length > 5) {
        setErrorMessage('No addresses found. Try a different search term.');
      }

      return;
    }

    try {
      // Add a small delay to respect Nominatim's usage policy (1 request per second)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use Nominatim API for geocoding (free and doesn't require API key)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&addressdetails=1&limit=5&countrycodes=us`,
        {
          headers: {
            // Proper headers according to Nominatim usage policy
            'Accept-Language': 'en-US,en',
            'User-Agent': 'LendingForte/1.0 (https://lendingforte.com)',
            'Referer': 'https://lendingforte.com'
          },
          // Disable browser caching to ensure we control the caching
          cache: 'no-store',
        }
      );

      if (response.ok) {
        const data = await response.json() as NominatimResult[];

        // Store in cache
        resultsCache.set(cacheKey, {
          timestamp: Date.now(),
          results: data
        });

        setSuggestions(data);

        // If no results found, show a message
        if (data.length === 0 && searchQuery.length > 5) {
          setErrorMessage('No addresses found. Try a different search term.');
        }
      } else {
        console.error('Error fetching address suggestions:', response.statusText);
        setSuggestions([]);
        setErrorMessage('Error fetching address suggestions. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid too many API calls and respect Nominatim usage policy
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query && query !== value && query.length >= 3) {
        fetchAddressSuggestions(query);
      }
    }, 1000); // Increased debounce time to 1000ms (1 second) to respect Nominatim's usage policy

    return () => clearTimeout(timer);
  }, [query, value]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onValueChange(newQuery);
    setShowSuggestions(true);
    setSelectedIndex(-1);

    // Clear error message when user types
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion: NominatimResult) => {
    // Parse the address components
    const address = suggestion.address;

    // Extract street address
    let street = '';
    if (address.house_number && address.road) {
      street = `${address.house_number} ${address.road}`;
    } else if (address.road) {
      street = address.road;
    } else if (address.street) {
      street = address.street;
    }

    // Extract city
    let city = '';
    if (address.city) {
      city = address.city;
    } else if (address.town) {
      city = address.town;
    } else if (address.village) {
      city = address.village;
    } else if (address.suburb) {
      city = address.suburb;
    }

    // Extract state
    let state = '';
    if (address.state) {
      state = address.state;
    } else if (address.state_code) {
      state = address.state_code;
    }

    // Extract ZIP code
    let zipCode = '';
    if (address.postcode) {
      zipCode = address.postcode;
    }

    // Extract country
    let country = '';
    if (address.country) {
      country = address.country;
    }

    // Create full address
    const fullAddress = suggestion.display_name;

    // Create parsed address object
    const parsedAddress: ParsedAddress = {
      street,
      city,
      state,
      zipCode,
      country,
      fullAddress
    };

    // Update the input value
    setQuery(street);
    onValueChange(street);

    // Call the onAddressSelect callback
    onAddressSelect(parsedAddress);

    // Hide suggestions
    setShowSuggestions(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setShowSuggestions(false);
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && suggestionsRef.current) {
      const selectedElement = suggestionsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-primary-500">*</span>}
        </label>
      )}

      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            id={id}
            name={name}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={`w-full bg-dark-200 border ${
              error ? 'border-red-500' : 'border-dark-100'
            } rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all ${className}`}
            aria-autocomplete="list"
            aria-controls={showSuggestions ? "address-suggestions" : undefined}
            aria-expanded={showSuggestions}
            aria-activedescendant={selectedIndex >= 0 ? `address-suggestion-${selectedIndex}` : undefined}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 rounded-full border-t-transparent"></div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              ref={suggestionsRef}
              id="address-suggestions"
              role="listbox"
              className="absolute z-50 w-full mt-1 bg-dark-200 border border-dark-100 rounded-lg shadow-lg max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.place_id}
                  id={`address-suggestion-${index}`}
                  role="option"
                  aria-selected={index === selectedIndex}
                  className={`px-4 py-2 cursor-pointer flex items-start hover:bg-dark-100 transition-colors ${
                    index === selectedIndex ? 'bg-dark-100' : ''
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                >
                  <MapPinIcon className="w-5 h-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-white text-sm">{suggestion.display_name}</div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {suggestion.type}: {suggestion.address.country || 'USA'}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error message from API */}
        {errorMessage && !error && (
          <p className="mt-1 text-sm text-amber-500">
            {errorMessage}
          </p>
        )}

        {/* Error message from form validation */}
        {error && (
          <p className="mt-1 text-sm text-red-500">
            Please enter a valid address
          </p>
        )}

        {/* OpenStreetMap attribution - required by Nominatim usage policy */}
        <div className="mt-1 text-xs text-gray-500">
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-400 transition-colors"
          >
            © OpenStreetMap contributors
          </a>
        </div>
      </div>
    </div>
  );
}
