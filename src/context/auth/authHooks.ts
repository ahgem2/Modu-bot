
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { User } from './types';
import { transformUser, upsertProfile } from './utils';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  return {
    user,
    setUser,
    isLoading,
    setIsLoading
  };
};

export const useAuthMethods = (
  setUser: (user: User | null) => void, 
  setIsLoading: (loading: boolean) => void
) => {
  const { toast } = useToast();

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

  return { login, signup, logout };
};

export const useProfileMethods = (
  user: User | null,
  setUser: (user: User | null) => void
) => {
  const { toast } = useToast();

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

  return { updateCredits, setPremiumStatus };
};
