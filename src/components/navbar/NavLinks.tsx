
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const NavLinks = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
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
        to="/mission" 
        className={`transition-all duration-200 hover:text-purple-600 ${
          location.pathname.includes('/mission') ? 'font-medium text-purple-600' : ''
        }`}
      >
        Our Mission
      </Link>
      <Link 
        to="/features" 
        className={`transition-all duration-200 hover:text-purple-600 ${
          location.pathname.includes('/features') ? 'font-medium text-purple-600' : ''
        }`}
      >
        Features
      </Link>
      <Link 
        to="/pricing" 
        className={`transition-all duration-200 hover:text-purple-600 ${
          location.pathname.includes('/pricing') ? 'font-medium text-purple-600' : ''
        }`}
      >
        Pricing
      </Link>
      <Link 
        to="/cemented" 
        className={`transition-all duration-200 hover:text-purple-600 ${
          location.pathname.includes('/cemented') ? 'font-medium text-purple-600' : ''
        }`}
      >
        CementED <span className="inline-block ml-1 px-1.5 py-0.5 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">Beta</span>
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
  );
};

export default NavLinks;
