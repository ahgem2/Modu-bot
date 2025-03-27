
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
    console.log('Window origin:', window.location.origin);
    console.log('Window host:', window.location.host);
    console.log('Window pathname:', window.location.pathname);
    console.log('UserAgent:', navigator.userAgent);
    console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
    console.log('Document readyState:', document.readyState);
    
    // Check app initialization
    console.log('Checking if React app is initialized...');
    
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
    debugElement.style.maxWidth = '300px';
    debugElement.style.overflow = 'hidden';
    debugElement.textContent = 'Deployment verification active';
    document.body.appendChild(debugElement);
    
    // Check if main scripts are loaded
    const scriptElements = document.querySelectorAll('script');
    console.log('Script elements found:', scriptElements.length);
    scriptElements.forEach(script => {
      console.log('Script source:', script.src || 'inline script');
    });
    
    // Create a "try health check" button
    const healthCheckButton = document.createElement('button');
    healthCheckButton.style.position = 'fixed';
    healthCheckButton.style.bottom = '50px';
    healthCheckButton.style.right = '10px';
    healthCheckButton.style.background = '#4f46e5';
    healthCheckButton.style.color = 'white';
    healthCheckButton.style.padding = '8px 15px';
    healthCheckButton.style.borderRadius = '4px';
    healthCheckButton.style.border = 'none';
    healthCheckButton.style.cursor = 'pointer';
    healthCheckButton.style.zIndex = '9999';
    healthCheckButton.textContent = 'Check Site Health';
    healthCheckButton.onclick = function() {
      window.location.href = '/health-check.html';
    };
    document.body.appendChild(healthCheckButton);
    
    // Check if React is loaded
    setTimeout(() => {
      console.log('React loaded check:', typeof React !== 'undefined' ? 'Yes' : 'No');
      console.log('ReactDOM loaded check:', typeof ReactDOM !== 'undefined' ? 'Yes' : 'No');
      debugElement.textContent += ' | React: ' + (typeof React !== 'undefined' ? '✓' : '✗');
      
      // Check if app root is populated
      const rootContent = rootElement.childNodes.length;
      console.log('Root element has content:', rootContent > 0);
      debugElement.textContent += ' | Content: ' + (rootContent > 0 ? '✓' : '✗');
      
      // Add routing health check
      if (typeof window.location.pathname !== 'undefined') {
        debugElement.textContent += ' | Routing OK';
      } else {
        debugElement.textContent += ' | Routing ✗';
      }
    }, 1000);
  } catch (error) {
    console.error('Verification error:', error);
  }
});

// Add window load event listener
window.addEventListener('load', function() {
  console.log('Window fully loaded');
  console.log('Document readyState after load:', document.readyState);
  
  // Verify that React app is running
  setTimeout(() => {
    const rootElement = document.getElementById('root');
    const appContent = rootElement ? rootElement.innerHTML : 'Not found';
    console.log('Root content after 3s:', appContent.substring(0, 100) + '...');
    
    // Check for common sign of React mounting
    const reactRootPresent = appContent.includes('react-root') || 
                             appContent.includes('data-reactroot') || 
                             document.querySelector('[data-reactroot]');
    console.log('React root attributes present:', !!reactRootPresent);
  }, 3000);
});
