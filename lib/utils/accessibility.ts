/**
 * Accessibility utility functions
 * 
 * This file contains utility functions to help with accessibility
 */

/**
 * Handle keyboard events for clickable elements
 * @param onClick The click handler function
 * @returns An object with onClick and onKeyDown handlers
 */
export const withKeyboardAccessibility = (onClick: (e: React.MouseEvent | React.KeyboardEvent) => void) => {
  return {
    onClick,
    onKeyDown: (e: React.KeyboardEvent) => {
      // Handle Enter or Space key
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick(e);
      }
    },
    // Add role and tabIndex for non-button/link elements
    role: 'button',
    tabIndex: 0,
  };
};

/**
 * Generate accessibility props for SVG elements
 * @param decorative Whether the SVG is decorative (true) or meaningful (false)
 * @returns An object with aria-hidden and role properties
 */
export const svgA11yProps = (decorative: boolean = true) => {
  if (decorative) {
    return {
      'aria-hidden': 'true',
      focusable: 'false',
    };
  }
  
  return {
    role: 'img',
    focusable: 'false',
  };
};

/**
 * Generate accessibility props for form elements
 * @param id The ID of the form element
 * @param label The label text
 * @param required Whether the field is required
 * @param description Optional description for the field
 * @returns An object with aria properties
 */
export const formFieldA11yProps = (
  id: string,
  label: string,
  required: boolean = false,
  description?: string
) => {
  const props: Record<string, string | boolean> = {
    id,
    'aria-label': label,
    'aria-required': required,
  };
  
  if (description) {
    props['aria-describedby'] = `${id}-description`;
  }
  
  return props;
};

/**
 * Generate accessibility props for interactive elements
 * @param label The accessible label
 * @returns An object with aria-label
 */
export const a11yLabel = (label: string) => ({
  'aria-label': label,
});
