import { createClient } from '@supabase/supabase-js'
import type { Post, GalleryImage, Settings } from '@/types';

// Add your Supabase URL and anon key to a .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required. Make sure to set them in your .env.local file and in your Vercel project settings.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type helpers
export type DbPost = Post;
export type DbGalleryImage = GalleryImage;
export type DbSettings = Settings;
