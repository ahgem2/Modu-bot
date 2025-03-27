
// Script to verify deployment is working
console.log('Verifying deployment for ModuBot...');

// Check if the root element exists
document.addEventListener('DOMContentLoaded', function() {
  const rootElement = document.getElementById('root');
  console.log('Root element exists:', !!rootElement);
  
  // Add basic connectivity check
  try {
    // Log basic environment info
    console.log('Window location:', window.location.href);
    console.log('UserAgent:', navigator.userAgent);
    console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
    
    // Check if React is loaded
    console.log('React loaded:', typeof React !== 'undefined');
  } catch (error) {
    console.error('Verification error:', error);
  }
});
