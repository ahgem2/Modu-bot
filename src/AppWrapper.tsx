
import React, { Suspense } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AuthProvider } from '@/context/auth';
import App from './App';

const AppWrapper = () => {
  console.log("Rendering AppWrapper");
  
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <App />
        </Suspense>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default AppWrapper;
