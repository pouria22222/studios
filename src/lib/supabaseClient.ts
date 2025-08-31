import { createClient } from '@supabase/supabase-js'
import type { Post, GalleryImage, Settings } from '@/types';

// Add your Supabase URL and anon key to a .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type helpers
export type DbPost = Post;
export type DbGalleryImage = GalleryImage;
export type DbSettings = Settings;
