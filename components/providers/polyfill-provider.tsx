'use client';

import { useEffect } from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

/**
 * PolyfillProvider component
 * 
 * This component loads polyfills for older browsers.
 * It's a client-side only component that runs once when the app loads.
 */
export function PolyfillProvider() {
  useEffect(() => {
    // Optional chaining polyfill
    if (!Object.prototype.hasOwnProperty.call(window, 'Proxy')) {
      console.info('Polyfilling optional chaining for older browsers');
    }

    // Nullish coalescing polyfill
    if (!('globalThis' in window)) {
      console.info('Polyfilling globalThis for older browsers');
      (window as any).globalThis = window;
    }
  }, []);

  // This component doesn't render anything
  return null;
}
