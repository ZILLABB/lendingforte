import { useState, useEffect, useCallback } from 'react';
import { getAddressSuggestions, getPlaceDetails, AddressSuggestion, ParsedAddress, parseAddressSuggestion } from './client';
import { useDebounce } from '@/hooks/useDebounce';

interface UseAddressAutocompleteProps {
  onAddressSelect?: (address: ParsedAddress) => void;
}

interface UseAddressAutocompleteReturn {
  inputValue: string;
  setInputValue: (value: string) => void;
  suggestions: AddressSuggestion[];
  loading: boolean;
  error: string | null;
  handleSelectSuggestion: (suggestion: AddressSuggestion) => Promise<void>;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
}

/**
 * Custom hook for address autocomplete functionality
 * 
 * @param props - Hook configuration options
 * @returns Object with state and handlers for address autocomplete
 */
export function useAddressAutocomplete(
  props?: UseAddressAutocompleteProps
): UseAddressAutocompleteReturn {
  const { onAddressSelect } = props || {};
  
  // State for the input value
  const [inputValue, setInputValue] = useState('');
  // Debounce the input value to avoid too many API calls
  const debouncedValue = useDebounce(inputValue, 300);
  
  // State for suggestions
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch suggestions when the debounced input value changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 3) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await getAddressSuggestions(debouncedValue);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching address suggestions:', err);
        setError('Failed to fetch address suggestions');
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  // Handle selecting a suggestion
  const handleSelectSuggestion = useCallback(async (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.formatted_address || suggestion.name);
    setShowSuggestions(false);

    try {
      // Get more details about the place if needed
      let detailedSuggestion = suggestion;
      
      if (!suggestion.address || Object.keys(suggestion.address).length === 0) {
        const details = await getPlaceDetails(suggestion.place_id);
        if (details) {
          detailedSuggestion = details;
        }
      }
      
      // Parse the address into components
      const parsedAddress = parseAddressSuggestion(detailedSuggestion);
      
      // Call the onAddressSelect callback if provided
      if (onAddressSelect) {
        onAddressSelect(parsedAddress);
      }
    } catch (err) {
      console.error('Error handling address selection:', err);
      setError('Failed to process the selected address');
    }
  }, [onAddressSelect]);

  return {
    inputValue,
    setInputValue,
    suggestions,
    loading,
    error,
    handleSelectSuggestion,
    showSuggestions,
    setShowSuggestions
  };
}
