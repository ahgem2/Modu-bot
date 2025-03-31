
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

    console.log('User profile retrieved:', data);
    
    return {
      id: supabaseUser.id,
      name: data?.name || supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || null,
      email: supabaseUser.email || '',
      credits: data?.credits || 100,
      isPremium: data?.isPremium || false
    };
  } catch (err) {
    console.error('Unexpected error in transformUser:', err);
    
    // Return a basic user object in case of error
    return {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.name || supabaseUser.email?.split('@')[0] || null,
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
    
    const { error, data } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date().toISOString()
      }, { onConflict: 'id' });

    if (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
    
    console.log('Profile upserted successfully:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error in upsertProfile:', err);
    throw err;
  }
};
