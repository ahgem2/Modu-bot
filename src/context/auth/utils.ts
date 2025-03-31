
import { supabase } from '@/lib/supabase';
import { User } from './types';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Helper function to transform Supabase user to our User type
export const transformUser = async (supabaseUser: SupabaseUser): Promise<User> => {
  if (!supabaseUser) {
    console.error('No user provided to transformUser');
    throw new Error('No user provided to transformUser');
  }
  
  try {
    console.log('Transforming user:', supabaseUser.id);
    
    // Get user profile from profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors if no profile exists

    if (error) {
      console.error('Error fetching user profile:', error);
    }

    // Get name from user metadata or profile
    const name = data?.name || 
                 supabaseUser.user_metadata?.name || 
                 supabaseUser.email?.split('@')[0] || 
                 'User';
    
    console.log('User profile retrieved:', data || 'No profile found, using defaults');
    
    return {
      id: supabaseUser.id,
      name: name,
      email: supabaseUser.email || '',
      credits: data?.credits || 100,
      isPremium: data?.isPremium || false
    };
  } catch (err) {
    console.error('Unexpected error in transformUser:', err);
    
    // Return a basic user object in case of error
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email || '',
      credits: 100,
      isPremium: false
    };
  }
};

// Update or create profile
export const upsertProfile = async (userId: string, profile: Partial<User>) => {
  if (!userId) {
    console.error('No userId provided to upsertProfile');
    throw new Error('User ID is required');
  }
  
  try {
    console.log('Upserting profile for user:', userId, profile);
    
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    console.log('Profile upserted successfully');
    return true;
  } catch (err) {
    console.error('Unexpected error in upsertProfile:', err);
    throw err;
  }
};
