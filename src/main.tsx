
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper.tsx';
import './index.css';

// DEBUG INFORMATION - Will log routing and script loading issues
console.log('Application initialization starting...');
console.log('Current URL:', window.location.href);
console.log('Current pathname:', window.location.pathname);

// Improved redirect handling for GitHub Pages and other hosts
const handleRedirect = () => {
  // First, check for GitHub Pages-style '?/' format redirects
  const { pathname, search, hash } = window.location;
  console.log('Checking for redirects. Search:', search, 'Path:', pathname, 'Hash:', hash);
  
  if (search && search.startsWith('?/')) {
    console.log('Handling GitHub Pages redirect format');
    const path = search.substr(2);
    window.history.replaceState(null, '', path + hash);
    return true;
  }
  
  // Then check for session storage redirects from 404.html
  const redirectPath = sessionStorage.getItem('redirectPath');
  if (redirectPath) {
    console.log('Handling redirect from 404 page to:', redirectPath);
    sessionStorage.removeItem('redirectPath');
    window.history.replaceState(null, '', redirectPath);
    return true;
  }
  
  return false;
};

// Execute redirect handling
const didRedirect = handleRedirect();
console.log('Redirect handling complete, did redirect:', didRedirect);

// Global error handler for unhandled exceptions
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Don't show alert in production as it could be annoying to users
  if (process.env.NODE_ENV !== 'production') {
    setTimeout(() => {
      alert(`Application Error: ${event.error.message || 'Unknown error'}`);
    }, 0);
  }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Handle network connection errors
window.addEventListener('offline', () => {
  console.error('Network connection lost');
  document.body.classList.add('offline-mode');
});

window.addEventListener('online', () => {
  console.log('Network connection restored');
  document.body.classList.remove('offline-mode');
});

// Use a wrapper function to ensure DOM is ready
const initApp = () => {
  try {
    console.log('Initializing application...');
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      throw new Error('Failed to find the root element');
    }
    
    console.log('Root element found, initializing React');
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    );
    
    console.log('Application successfully mounted');
  } catch (error) {
    console.error('Failed to initialize application:', error);
    // Display a fallback error message in the DOM
    document.body.innerHTML = `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: sans-serif;">
        <h1>Something went wrong</h1>
        <p>The application failed to load. Please try again later.</p>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; max-width: 80%; overflow: auto;">${error}</pre>
        <button onclick="window.location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
};

// Execute initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    initApp();
  });
} else {
  console.log('Document already loaded, initializing immediately');
  initApp();
}
