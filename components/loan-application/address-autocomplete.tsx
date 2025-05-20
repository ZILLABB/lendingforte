"use client";

import { useState, useEffect, useRef } from "react";
import { MapPinIcon } from "@heroicons/react/24/outline";

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
}

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
}

export default function AddressAutocomplete({ onAddressSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Function to fetch address suggestions from Nominatim API
  const fetchAddressSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 3) return;

    setIsLoading(true);
    setError(null);

    try {
      // Using Nominatim API (OpenStreetMap's free geocoding service)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&addressdetails=1&limit=10`,
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
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
      setError('Failed to fetch address suggestions. Please try again or enter address manually.');
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear any existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to delay the API call
    if (value.length >= 3) {
      debounceTimeout.current = setTimeout(() => {
        fetchAddressSuggestions(value);
      }, 500); // 500ms debounce
    } else {
      setSuggestions([]);
    }
  };

  // Format address for display and selection
  const formatAddress = (result: NominatimResult) => {
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

    return {
      street,
      city,
      state,
      zipCode,
      fullAddress: result.display_name
    };
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (result: NominatimResult) => {
    const formattedAddress = formatAddress(result);
    setQuery(formattedAddress.fullAddress);
    setSuggestions([]);

    // Pass the selected address to the parent component
    onAddressSelect({
      street: formattedAddress.street,
      city: formattedAddress.city,
      state: formattedAddress.state,
      zipCode: formattedAddress.zipCode
    });
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className={`w-full bg-gray-700 rounded-lg pl-10 px-4 py-3 text-gray-100 placeholder-gray-400
            focus:ring-2 focus:ring-green-500 focus:outline-none transition-all border-gray-700
            ${isFocused ? 'ring-2 ring-green-500' : ''}`}
          placeholder="Start typing your address... (e.g. London, Tokyo, New York)"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setIsFocused(false), 200);
          }}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
        </div>
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-sm text-red-400">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto"
        >
          <ul className="py-1">
            {suggestions.map((result) => (
              <li
                key={result.place_id}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-start"
                onClick={() => handleSelectSuggestion(result)}
              >
                <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-200">{result.display_name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-2 text-xs text-gray-500">
        Type at least 3 characters to search for addresses worldwide. Examples: "London", "Tokyo", "New York", "123 Main St".
      </p>
      <p className="text-xs text-gray-500">
        Powered by OpenStreetMap Nominatim - free global address search.
      </p>
    </div>
  );
}
