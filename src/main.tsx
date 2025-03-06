
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper.tsx';
import './index.css';

// Global error handler for unhandled exceptions
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // You can add error reporting logic here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // You can add error reporting logic here
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

// Ensure the root element exists and handle any errors during initialization
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
