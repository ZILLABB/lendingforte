/**
 * Utility functions for formatting various types of data
 */

/**
 * Formats a phone number to (XXX) XXX-XXXX format
 *
 * @param value - The phone number to format
 * @returns The formatted phone number
 */
export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Format the phone number based on the number of digits
  if (cleaned.length === 0) {
    return '';
  } else if (cleaned.length <= 3) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
  } else {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  }
}

/**
 * Checks if a phone number is valid (10 digits in the format (XXX) XXX-XXXX)
 *
 * @param value - The phone number to validate
 * @returns Whether the phone number is valid
 */
export function isValidPhoneNumber(value: string): boolean {
  // Check if the phone number matches the expected format
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(value);
}

/**
 * Formats a currency value with dollar sign and commas
 *
 * @param value - The currency value to format
 * @param showCents - Whether to show cents (default: false)
 * @returns The formatted currency value
 */
export function formatCurrency(value: string | number, showCents: boolean = false): string {
  // Convert to number and handle invalid inputs
  let numValue: number;

  if (typeof value === 'string') {
    // Remove all non-numeric characters except decimal point
    const cleanedValue = value.replace(/[^\d.-]/g, '');
    numValue = parseFloat(cleanedValue);
  } else {
    numValue = value;
  }

  if (isNaN(numValue)) {
    return showCents ? '$0.00' : '$0';
  }

  // Format with dollar sign, commas, and optional decimal places
  return numValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0
  });
}

/**
 * Formats a percentage value
 *
 * @param value - The percentage value to format
 * @returns The formatted percentage value
 */
export function formatPercentage(value: string | number): string {
  // Convert to number and handle invalid inputs
  const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;

  if (isNaN(numValue)) {
    return '0%';
  }

  // Format with percentage sign and two decimal places
  return `${numValue.toFixed(2)}%`;
}

/**
 * Formats a date string to MM/DD/YYYY format
 *
 * @param value - The date string to format
 * @returns The formatted date string
 */
export function formatDate(value: string): string {
  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return '';
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

/**
 * Formats a zip code to standard 5-digit or 9-digit format
 *
 * @param value - The zip code to format
 * @returns The formatted zip code
 */
export function formatZipCode(value: string): string {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');

  // Format the zip code
  if (cleaned.length <= 5) {
    return cleaned;
  } else {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 9)}`;
  }
}

/**
 * Calculates the estimated monthly payment for a loan
 *
 * @param principal - The loan amount
 * @param rate - The annual interest rate (as a percentage)
 * @param term - The loan term in months
 * @returns The estimated monthly payment
 */
export function calculateMonthlyPayment(principal: number, rate: number, term: number): number {
  // Convert annual rate to monthly rate and decimal form
  const monthlyRate = rate / 100 / 12;

  // Handle edge cases
  if (monthlyRate === 0) {
    return principal / term;
  }

  // Calculate monthly payment using the loan formula
  const payment = principal * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);

  return payment;
}
