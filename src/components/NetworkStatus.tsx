
import React, { useEffect, useState } from 'react';
import { AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasConnectionIssue, setHasConnectionIssue] = useState(false);

  useEffect(() => {
    // Handle online/offline events
    const handleOnline = () => {
      console.log('Connection restored');
      setIsOnline(true);
      
      // Reset connection issues when we go back online
      setTimeout(() => {
        setHasConnectionIssue(false);
      }, 2000);
    };
    
    const handleOffline = () => {
      console.log('Connection lost');
      setIsOnline(false);
      setHasConnectionIssue(true);
    };

    // Check connection status periodically
    const checkConnection = () => {
      const testImg = new Image();
      testImg.src = '/favicon.ico?nc=' + new Date().getTime();
      testImg.onload = () => setHasConnectionIssue(false);
      testImg.onerror = () => {
        if (navigator.onLine) {
          console.warn('Browser reports online but connection test failed');
          setHasConnectionIssue(true);
        }
      };
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Initial connection check
    checkConnection();
    
    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (!isOnline || hasConnectionIssue) {
    return (
      <Alert variant="destructive" className="fixed bottom-4 right-4 max-w-md z-50">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          {isOnline ? 'Connection Issue' : 'You are offline'}
        </AlertTitle>
        <AlertDescription>
          {isOnline 
            ? 'We\'re having trouble connecting to the server. Please check your network.'
            : 'Your device is not connected to the internet.'}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default NetworkStatus;
