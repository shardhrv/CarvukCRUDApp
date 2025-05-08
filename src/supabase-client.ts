import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseURL || !supabaseAnonKey) {
    throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment');
}

export const supabase = createClient(supabaseURL, supabaseAnonKey);