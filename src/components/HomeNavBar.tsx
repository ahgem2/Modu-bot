
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HomeNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show the home nav bar if we're already on the home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate('/')}
        className="rounded-full bg-black/50 backdrop-blur-sm border border-gray-700 hover:bg-black/70"
        aria-label="Return to home"
      >
        <Home className="text-white" size={20} />
      </Button>
    </div>
  );
};

export default HomeNavBar;
