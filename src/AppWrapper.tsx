
import React, { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import App from './App';

const AppWrapper = () => {
  console.log("Rendering AppWrapper");
  
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppWrapper;
