import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { User, AuthContextType } from './types';
import { transformUser, upsertProfile } from './utils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  console.log("AuthProvider initializing");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    console.log("AuthProvider useEffect running");
    
    // Check if user is already authenticated
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session retrieval error:', error);
          throw error;
        }
        
        if (data.session) {
          console.log("Session found:", data.session.user.id);
          const { user: supabaseUser } = data.session;
          const userProfile = await transformUser(supabaseUser);
          setUser(userProfile);
          console.log("User profile set:", userProfile);
        } else {
          console.log("No session found");
          setUser(null);
        }
      } catch (error) {
        console.error('Session error:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === 'SIGNED_IN' && session?.user) {
          console.log("User signed in:", session.user.id);
          try {
            const userProfile = await transformUser(session.user);
            setUser(userProfile);
            
            // Ensure the profile exists in the database
            await upsertProfile(session.user.id, {
              name: userProfile.name,
              email: userProfile.email
            });
            console.log("Profile updated for user:", session.user.id);
          } catch (error) {
            console.error("Error processing sign in:", error);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("User signed out");
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log("Token refreshed");
        } else if (event === 'USER_UPDATED') {
          console.log("User updated");
          if (session?.user) {
            const userProfile = await transformUser(session.user);
            setUser(userProfile);
          }
        }
        
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    checkSession();

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    console.log("Attempting login for:", email);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login failed",
          description: error.message || "Please check your credentials and try again.",
          variant: "destructive",
        });
        throw error;
      }
      
      if (data.user) {
        console.log("Login successful for user:", data.user.id);
        const userProfile = await transformUser(data.user);
        setUser(userProfile);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    console.log("Attempting signup for:", email);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup failed",
          description: error.message || "There was a problem creating your account.",
          variant: "destructive",
        });
        throw error;
      }

      if (data.user) {
        console.log("Signup successful for user:", data.user.id);
        // Create a profile record
        await upsertProfile(data.user.id, {
          name,
          email,
          credits: 100,
          isPremium: false
        });

        const userProfile = await transformUser(data.user);
        setUser(userProfile);
        
        // Send welcome email
        try {
          await supabase.functions.invoke('send-welcome-email', {
            body: { 
              email,
              name
            }
          });
        } catch (emailError) {
          console.error('Error sending welcome email:', emailError);
          // Don't block signup if email fails
        }
        
        toast({
          title: "Account created",
          description: "Welcome to ModuBot! You've been given 100 credits to start.",
        });
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log("Logging out user");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        toast({
          title: "Logout failed",
          description: "There was a problem logging out.",
          variant: "destructive",
        });
        throw error;
      }
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateCredits = async (newCredits: number) => {
    if (!user) return;
    
    try {
      await upsertProfile(user.id, {
        credits: newCredits
      });
      
      setUser({...user, credits: newCredits});
    } catch (error) {
      console.error('Error updating credits:', error);
      toast({
        title: "Update failed",
        description: "Failed to update credits.",
        variant: "destructive",
      });
    }
  };

  const setPremiumStatus = async (status: boolean) => {
    if (!user) return;
    
    try {
      await upsertProfile(user.id, {
        isPremium: status
      });
      
      setUser({...user, isPremium: status});
    } catch (error) {
      console.error('Error updating premium status:', error);
      toast({
        title: "Update failed",
        description: "Failed to update premium status.",
        variant: "destructive",
      });
    }
  };

  console.log("AuthProvider rendering, user:", user?.id || "none");

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup, 
      logout, 
      updateCredits: user ? async (newCredits) => {
        if (!user) return;
        try {
          await upsertProfile(user.id, { credits: newCredits });
          setUser({...user, credits: newCredits});
        } catch (error) {
          console.error('Error updating credits:', error);
          toast({
            title: "Update failed",
            description: "Failed to update credits.",
            variant: "destructive",
          });
        }
      } : async () => {},
      setPremiumStatus: user ? async (status) => {
        if (!user) return;
        try {
          await upsertProfile(user.id, { isPremium: status });
          setUser({...user, isPremium: status});
        } catch (error) {
          console.error('Error updating premium status:', error);
          toast({
            title: "Update failed",
            description: "Failed to update premium status.",
            variant: "destructive",
          });
        }
      } : async () => {}
    }}>
      {children}
    </AuthContext.Provider>
  );
};
