
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link 
      to="/" 
      className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 transition-all duration-300 hover:opacity-80"
    >
      ModuBot
    </Link>
  );
};

export default Logo;
