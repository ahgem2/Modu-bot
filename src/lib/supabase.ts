
import { createClient } from '@supabase/supabase-js';

// Use default values for local development if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zwuxgpyorphgcopzrqna.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3dXhncHlvcnBoZ2NvcHpycW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExOTQ1MTIsImV4cCI6MjA1Njc3MDUxMn0.qXnnU1IROOHKMvYswlAiweb9QHrU-aEx-mTf1KvwKuM';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
