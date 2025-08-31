import { supabase } from './supabaseClient';
import type { Post, GalleryImage, Settings } from '@/types';

// Note: The mock data below is now replaced by Supabase calls.

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  // Map Supabase data to our Post type
  return data.map(post => ({
    id: post.id,
    title: post.title,
    author: post.author,
    date: post.date,
    image: post.image_url,
    imageHint: post.image_hint,
    content: post.content,
    tags: post.tags || [],
  }));
};

export const getPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching post by id:', error);
    return null;
  }
  
  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    author: data.author,
    date: data.date,
    image: data.image_url,
    imageHint: data.image_hint,
    content: data.content,
    tags: data.tags || [],
  };
};

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
  return data;
};

export const getSettings = async (): Promise<Settings> => {
  const { data, error } = await supabase
    .from('settings')
    .select('email, instagram')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    // Return default/empty settings on error
    return { email: '', instagram: '' };
  }
  return data || { email: '', instagram: '' };
};

export const updateSettings = async (newSettings: Partial<Settings>): Promise<Settings> => {
  const { data, error } = await supabase
    .from('settings')
    .update(newSettings)
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    console.error('Error updating settings:', error);
    throw new Error('Could not update settings');
  }

  return data;
};
