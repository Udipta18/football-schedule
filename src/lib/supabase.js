import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Also check for alternative common env var names
const anonKey = supabaseAnonKey || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
    console.error('Missing Supabase environment variables:', {
        VITE_SUPABASE_URL: supabaseUrl ? '✓ Set' : '✗ Missing',
        VITE_SUPABASE_PUBLISHABLE_KEY: supabaseAnonKey ? '✓ Set' : '✗ Missing',
        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'
    });
}

export const supabase = createClient(supabaseUrl || '', anonKey || '');
