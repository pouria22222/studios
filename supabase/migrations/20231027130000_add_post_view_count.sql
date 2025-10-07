-- Add view_count column to posts table
ALTER TABLE public.posts ADD COLUMN view_count INT DEFAULT 0;

-- Create a function to increment the view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id_to_update INT)
RETURNS VOID AS $$
  UPDATE public.posts
  SET view_count = view_count + 1
  WHERE id = post_id_to_update;
$$ LANGUAGE sql;
