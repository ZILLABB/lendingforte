'use client';

// Import core-js polyfills for browser compatibility
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Only run browser-specific code when in browser environment
if (typeof window !== 'undefined') {
  // Optional chaining polyfill
  if (!Object.prototype.hasOwnProperty.call(window, 'Proxy')) {
    console.info('Polyfilling optional chaining for older browsers');
  }

  // Nullish coalescing polyfill
  if (!('globalThis' in window)) {
    console.info('Polyfilling globalThis for older browsers');
    (window as any).globalThis = window;
  }
}

export { };
