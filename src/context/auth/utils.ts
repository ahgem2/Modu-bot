
import { supabase } from '@/lib/supabase';
import { User } from './types';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Helper function to transform Supabase user to our User type
export const transformUser = async (supabaseUser: SupabaseUser): Promise<User> => {
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
    isPremium: data?.isPremium || false
  };
};

// Update or create profile
export const upsertProfile = async (userId: string, profile: Partial<User>) => {
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
