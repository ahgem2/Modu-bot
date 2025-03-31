
import { createClient } from '@supabase/supabase-js';

// Use default values for local development if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zwuxgpyorphgcopzrqna.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dXhncHlvcnBoZ2NvcHpycW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTQ1MTIsImV4cCI6MjA1Njc3MDUxMn0.qXnnU1IROOHKMvYswlAiweb9QHrU-aEx-mTf1KvwKuM';

console.log('Initializing Supabase client with URL:', supabaseUrl);

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
});

// Add a debug function to check authentication status
export const debugAuth = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log('Current auth session:', data, error);
    return data;
  } catch (err) {
    console.error('Error checking auth:', err);
    return null;
  }
};
