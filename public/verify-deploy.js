
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
    console.log('Document readyState:', document.readyState);
    
    // Create a visible indicator for debugging
    const debugElement = document.createElement('div');
    debugElement.style.position = 'fixed';
    debugElement.style.bottom = '10px';
    debugElement.style.right = '10px';
    debugElement.style.background = 'rgba(0,0,0,0.7)';
    debugElement.style.color = 'white';
    debugElement.style.padding = '5px 10px';
    debugElement.style.borderRadius = '4px';
    debugElement.style.fontSize = '12px';
    debugElement.style.zIndex = '9999';
    debugElement.textContent = 'Deployment verification active';
    document.body.appendChild(debugElement);
    
    // Check if main scripts are loaded
    const scriptElements = document.querySelectorAll('script');
    console.log('Script elements found:', scriptElements.length);
    scriptElements.forEach(script => {
      console.log('Script source:', script.src || 'inline script');
    });
    
    // Check if React is loaded
    setTimeout(() => {
      console.log('React loaded:', typeof React !== 'undefined');
      console.log('ReactDOM loaded:', typeof ReactDOM !== 'undefined');
      debugElement.textContent += ' | React: ' + (typeof React !== 'undefined' ? '✓' : '✗');
      
      // Check if app root is populated
      const rootContent = rootElement.childNodes.length;
      console.log('Root element has content:', rootContent > 0);
      debugElement.textContent += ' | Content: ' + (rootContent > 0 ? '✓' : '✗');
    }, 1000);
  } catch (error) {
    console.error('Verification error:', error);
  }
});

// Add window load event listener
window.addEventListener('load', function() {
  console.log('Window fully loaded');
  console.log('Document readyState after load:', document.readyState);
});
