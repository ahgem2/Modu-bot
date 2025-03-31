
import { createContext, ReactNode } from 'react';
import { AuthContextType } from './types';
import { useAuthState, useAuthMethods, useProfileMethods } from './authHooks';
import { useSessionManager } from './sessionManager';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log("AuthProvider initializing");
  
  // Use our custom hooks to manage state and auth methods
  const { user, setUser, isLoading, setIsLoading } = useAuthState();
  const { login, signup, logout } = useAuthMethods(setUser, setIsLoading);
  const { updateCredits, setPremiumStatus } = useProfileMethods(user, setUser);
  
  // Initialize session management
  useSessionManager(setUser, setIsLoading);

  console.log("AuthProvider rendering, user:", user?.id || "none");

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout,
      updateCredits,
      setPremiumStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
