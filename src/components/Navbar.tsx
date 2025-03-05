
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import AuthModal from './AuthModal';
import { MobileMenu, NavLinks, AuthButtons, Logo } from './navbar';

interface NavLinksProps {
  links: Array<{ label: string; href: string; isProtected?: boolean }>;
}

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const navLinks: NavLinksProps['links'] = [
    { label: 'Features', href: '/features' },
    { label: 'Mission', href: '/mission' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Dashboard', href: '/dashboard', isProtected: true },
    { label: 'Team', href: '/team', isProtected: true },
    { label: 'Records', href: '/records', isProtected: true },
    { label: 'Account', href: '/account', isProtected: true },
  ];

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
            <Logo />
            <NavLinks links={navLinks} />
            <AuthButtons 
              onLoginClick={openLoginModal}
              onSignupClick={openSignupModal}
              onLogoutClick={handleLogout}
            />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onLoginClick={openLoginModal}
          onSignupClick={openSignupModal}
        />
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
