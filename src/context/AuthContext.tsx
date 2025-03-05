import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';

export interface User {
  id: string;
  name: string | null;
  email: string;
  credits: number;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateCredits: (newCredits: number) => Promise<void>;
  setPremiumStatus: (status: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Helper function to transform Supabase user to our User type
  const transformUser = async (supabaseUser: SupabaseUser): Promise<User> => {
    // Get user profile from profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      // Create a default profile if one doesn't exist
      return {
        id: supabaseUser.id,
        name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || null,
        email: supabaseUser.email || '',
        credits: 100,
        isPremium: false
      };
    }

    return {
      id: supabaseUser.id,
      name: data?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || null,
      email: supabaseUser.email || '',
      credits: data?.credits || 100,
      isPremium: data?.is_premium || false
    };
  };

  // Update or create profile
  const upsertProfile = async (userId: string, profile: Partial<User>) => {
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date()
      });

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Check if user is already authenticated
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          const { user: supabaseUser } = data.session;
          const userProfile = await transformUser(supabaseUser);
          setUser(userProfile);
        }
      } catch (error) {
        console.error('Session error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (event === 'SIGNED_IN' && session?.user) {
          const userProfile = await transformUser(session.user);
          setUser(userProfile);
          
          // Ensure the profile exists in the database
          await upsertProfile(session.user.id, {
            name: userProfile.name,
            email: userProfile.email
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      if (data.user) {
        const userProfile = await transformUser(data.user);
        setUser(userProfile);
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
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

      if (error) throw error;

      if (data.user) {
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
      toast({
        title: "Signup failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was a problem logging out.",
        variant: "destructive",
      });
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
