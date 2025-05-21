// Export all utility functions from this file for cleaner imports

export * from './lazy-load';

// Re-export accessibility utilities
export {
    withKeyboardAccessibility,
    svgA11yProps,
    formFieldA11yProps,
    a11yLabel
} from '@/lib/utils/accessibility';
