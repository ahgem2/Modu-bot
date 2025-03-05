
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
  );
};

export default NavLinks;
