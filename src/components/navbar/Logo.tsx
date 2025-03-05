
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
    >
      <Bot 
        size={28}
        className="text-purple-600" 
        strokeWidth={2.5}
      />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-green-400">
        ModuBot
      </span>
    </Link>
  );
};

export default Logo;
