
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper.tsx';
import './index.css';

// Improved redirect handling for GitHub Pages and other hosts
const handleRedirect = () => {
  // First, check for GitHub Pages-style '?/' format redirects
  const { pathname, search, hash } = window.location;
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
handleRedirect();

// Global error handler for unhandled exceptions
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
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

document.addEventListener('DOMContentLoaded', () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error('Failed to find the root element');
    
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
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; max-width: 80%;">${error}</pre>
      </div>
    `;
  }
});
