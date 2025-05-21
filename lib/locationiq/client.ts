/**
 * Geoapify API client for address autocomplete
 *
 * This module provides functions to interact with the Geoapify Geocoding API
 * for address autocomplete functionality.
 *
 * Geoapify offers a free tier with 3,000 API calls per day, which is sufficient
 * for development and small-scale production use.
 */

// The API key should be stored in an environment variable
// For development purposes, we'll use a placeholder that should be replaced with a real key
const GEOAPIFY_API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY || '7c7b6a9f9c214243b045f0c5c4c8a00c';

// Base URL for the Geoapify API
const BASE_URL = 'https://api.geoapify.com/v1';

/**
 * Interface for Geoapify address suggestion results
 */
export interface AddressSuggestion {
  properties: {
    formatted: string;
    address_line1?: string;
    address_line2?: string;
    housenumber?: string;
    street?: string;
    suburb?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
  place_id: string;
}

/**
 * Interface for the parsed address components
 */
export interface ParsedAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
}

/**
 * Fetches address suggestions based on the input query
 *
 * @param query - The address search query
 * @returns Promise with an array of address suggestions
 */
export async function getAddressSuggestions(query: string): Promise<AddressSuggestion[]> {
  if (!query || query.length < 3) {
    return [];
  }

  try {
    const response = await fetch(
      `${BASE_URL}/geocode/autocomplete?text=${encodeURIComponent(query)}&format=json&limit=5&apiKey=${GEOAPIFY_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.features || [];
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    return [];
  }
}

/**
 * Gets detailed information about a place using its ID
 *
 * @param placeId - The place ID from a suggestion
 * @returns Promise with detailed place information
 */
export async function getPlaceDetails(placeId: string): Promise<AddressSuggestion | null> {
  if (!placeId) {
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/place-details?id=${placeId}&apiKey=${GEOAPIFY_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Geoapify API error: ${response.status}`);
    }

    const data = await response.json();
    return data.features?.[0] || null;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

/**
 * Parses an address suggestion into structured components
 *
 * @param suggestion - The address suggestion to parse
 * @returns Parsed address components
 */
export function parseAddressSuggestion(suggestion: AddressSuggestion): ParsedAddress {
  const properties = suggestion.properties || {};

  // Extract street address
  const houseNumber = properties.housenumber || '';
  const street = properties.street || '';
  const streetAddress = houseNumber && street
    ? `${houseNumber} ${street}`
    : properties.address_line1 || houseNumber || street || '';

  // Extract other components
  const city = properties.city || properties.suburb || '';
  const state = properties.state || '';
  const zipCode = properties.postcode || '';
  const country = properties.country || '';

  return {
    street: streetAddress,
    city,
    state,
    zipCode,
    country,
    fullAddress: properties.formatted || `${streetAddress}, ${city}, ${state} ${zipCode}`
  };
}
