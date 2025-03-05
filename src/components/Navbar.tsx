import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const openSignupModal = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 transition-all duration-300 hover:opacity-80"
            >
              ModuBot
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`transition-all duration-200 hover:text-purple-600 ${
                  location.pathname === '/' ? 'font-medium text-purple-600' : ''
                }`}
              >
                Home
              </Link>
              {user && (
                <Link 
                  to="/dashboard" 
                  className={`transition-all duration-200 hover:text-purple-600 ${
                    location.pathname.includes('/dashboard') ? 'font-medium text-purple-600' : ''
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                to="/pricing" 
                className={`transition-all duration-200 hover:text-purple-600 ${
                  location.pathname.includes('/pricing') ? 'font-medium text-purple-600' : ''
                }`}
              >
                Pricing
              </Link>
              {user && (
                <Link 
                  to="/account" 
                  className={`transition-all duration-200 hover:text-purple-600 ${
                    location.pathname.includes('/account') ? 'font-medium text-purple-600' : ''
                  }`}
                >
                  Account
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Button variant="ghost" onClick={handleLogout} className="btn-hover">
                  Log out
                </Button>
              ) : (
                <>
                  <Button variant="ghost" onClick={openLoginModal} className="btn-hover">
                    Log in
                  </Button>
                  <Button onClick={openSignupModal} className="btn-hover">
                    Sign up
                  </Button>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 space-y-4 bg-white dark:bg-gray-900 shadow-md animate-fade-in animate-slide-down">
            <Link 
              to="/" 
              className={`block py-2 ${location.pathname === '/' ? 'font-medium text-purple-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className={`block py-2 ${location.pathname.includes('/dashboard') ? 'font-medium text-purple-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            <Link 
              to="/pricing" 
              className={`block py-2 ${location.pathname.includes('/pricing') ? 'font-medium text-purple-600' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            {user && (
              <Link 
                to="/account" 
                className={`block py-2 ${location.pathname.includes('/account') ? 'font-medium text-purple-600' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Account
              </Link>
            )}
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }} 
                  className="w-full justify-center"
                >
                  Log out
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      openLoginModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Log in
                  </Button>
                  <Button 
                    onClick={() => {
                      openSignupModal();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
      />
    </>
  );
};

export default Navbar;
