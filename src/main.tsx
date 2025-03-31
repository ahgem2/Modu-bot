
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppWrapper from './AppWrapper.tsx';
import './index.css';

console.log('Application initialization starting...');

// Simple initialization function
const initApp = () => {
  try {
    console.log('Initializing application...');
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }
    
    console.log('Root element found, creating React root');
    const root = createRoot(rootElement);
    
    console.log('Rendering React application');
    root.render(
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    );
    
    console.log('React render method called');
  } catch (error) {
    console.error('Failed to initialize application:', error);
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

// Execute initialization immediately
console.log('Calling initApp()');
initApp();
