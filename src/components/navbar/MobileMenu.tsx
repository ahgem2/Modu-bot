
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const MobileMenu = ({ isOpen, onClose, onLoginClick, onSignupClick }: MobileMenuProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="md:hidden py-4 px-4 space-y-4 bg-white dark:bg-gray-900 shadow-md animate-fade-in animate-slide-down">
      <Link 
        to="/" 
        className={`block py-2 ${location.pathname === '/' ? 'font-medium text-purple-600' : ''}`}
        onClick={onClose}
      >
        Home
      </Link>
      {user && (
        <Link 
          to="/dashboard" 
          className={`block py-2 ${location.pathname.includes('/dashboard') ? 'font-medium text-purple-600' : ''}`}
          onClick={onClose}
        >
          Dashboard
        </Link>
      )}
      <Link 
        to="/pricing" 
        className={`block py-2 ${location.pathname.includes('/pricing') ? 'font-medium text-purple-600' : ''}`}
        onClick={onClose}
      >
        Pricing
      </Link>
      {user && (
        <Link 
          to="/account" 
          className={`block py-2 ${location.pathname.includes('/account') ? 'font-medium text-purple-600' : ''}`}
          onClick={onClose}
        >
          Account
        </Link>
      )}
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        {user ? (
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="w-full justify-center"
          >
            Log out
          </Button>
        ) : (
          <div className="flex flex-col space-y-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                onLoginClick();
                onClose();
              }}
              className="w-full justify-center"
            >
              Log in
            </Button>
            <Button 
              onClick={() => {
                onSignupClick();
                onClose();
              }}
              className="w-full justify-center"
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
