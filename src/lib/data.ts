
import { supabase } from './supabaseClient';
import type { Post, Product, Settings } from '@/types';

// Note: The mock data below is now replaced by Supabase calls.

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  return data;
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

  return data;
};

export const createPost = async (postData: Omit<Post, 'id' | 'created_at' | 'tags'>): Promise<Post | null> => {
    const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single();
    
    if (error) {
        console.error('Error creating post:', error);
        throw new Error(error.message);
    }

    return data;
};

export const updatePost = async (id: number, postData: Partial<Omit<Post, 'tags'>>): Promise<Post | null> => {
  const { data, error } = await supabase
    .from('posts')
    .update(postData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw new Error(error.message);
  }

  return data;
};

export const deletePost = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }

  return true;
};

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data;
};

export const createProduct = async (productData: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    throw new Error(error.message);
  }

  return data;
};

export const updateProduct = async (id: number, productData: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw new Error(error.message);
  }

  return data;
};

export const deleteFile = async (bucket: string, filePath: string): Promise<boolean> => {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) {
        console.error('Error deleting file:', error);
        return false;
    }
    return true;
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('download_url')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching product for deletion:', fetchError);
    return false;
  }

  if (product && product.download_url) {
    const success = await deleteFile('downloadable', product.download_url);
    if (!success) {
      return false; 
    }
  }

  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (deleteError) {
    console.error('Error deleting product:', deleteError);
    return false;
  }

  return true;
};


export const getSettings = async (): Promise<Settings> => {
  const { data, error } = await supabase
    .from('settings')
    .select('email, youtube, telegram')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching settings:', error);
    return { email: '', youtube: '', telegram: '' };
  }
  return data || { email: '', youtube: '', telegram: '' };
};

export const updateSettings = async (newSettings: Partial<Settings>): Promise<Settings> => {
  const { data, error } = await supabase
    .from('settings')
    .upsert({ ...newSettings, id: 1 })
    .select()
    .single();

  if (error) {
    console.error('Error updating settings:', error);
    throw new Error('Could not update settings');
  }

  return data;
};

export const uploadFile = async (bucket: string, file: File): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  return data.path;
};

export const getPublicUrl = (bucket: string, path: string | null): string | null => {
    if (!path) {
        return null;
    }
    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(path, { download: true });

    if (!data.publicUrl || data.publicUrl.endsWith('/')) {
        return null;
    }

    return data.publicUrl;
};