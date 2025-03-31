
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from './types';
import { transformUser, upsertProfile } from './utils';

export const useSessionManager = (
  setUser: (user: User | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  useEffect(() => {
    console.log("Setting up auth session manager");
    
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
  }, [setUser, setIsLoading]);
};
