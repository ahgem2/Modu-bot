
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
    >
      <img
        src="/lovable-uploads/6ca6c8a6-2a2d-4504-aadc-09a63e6e1713.png"
        alt="ModuBot Logo"
        className="w-8 h-8"
      />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-green-400">
        ModuBot
      </span>
    </Link>
  );
};

export default Logo;
