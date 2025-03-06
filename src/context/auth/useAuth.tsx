
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    console.error("useAuth was called outside of AuthProvider!");
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
