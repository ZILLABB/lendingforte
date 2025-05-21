'use client';

import { Suspense, lazy, ComponentType } from 'react';

// Loading fallback component
export const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="relative">
      <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-green-500 animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-gray-900"></div>
      </div>
    </div>
  </div>
);

// Generic lazy loading wrapper
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  loadingComponent = <LoadingFallback />
) => {
  const LazyComponent = lazy(importFunc);

  const LazyLoadComponent = (props: React.ComponentProps<T>) => (
    <Suspense fallback={loadingComponent}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return LazyLoadComponent;
};
