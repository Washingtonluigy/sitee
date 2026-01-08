/*
  # Create Storage for Testimonial Images
  
  1. Storage
    - Create a public bucket called 'testimonial-images' for storing testimonial profile images
    - Allow public read access
    - Allow anonymous users to upload, update, and delete (temporary until authentication)
  
  2. Security
    - Public read access for images
    - Public write access (temporary - should be restricted with authentication in production)
*/

-- Create storage bucket for testimonial images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonial-images',
  'testimonial-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read testimonial images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload testimonial images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update testimonial images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete testimonial images" ON storage.objects;

-- Allow public read access
CREATE POLICY "Anyone can read testimonial images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'testimonial-images');

-- Allow anyone to upload (temporary until proper auth)
CREATE POLICY "Anyone can upload testimonial images"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'testimonial-images');

-- Allow anyone to update (temporary until proper auth)
CREATE POLICY "Anyone can update testimonial images"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'testimonial-images')
  WITH CHECK (bucket_id = 'testimonial-images');

-- Allow anyone to delete (temporary until proper auth)
CREATE POLICY "Anyone can delete testimonial images"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'testimonial-images');