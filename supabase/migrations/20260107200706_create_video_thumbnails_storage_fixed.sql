/*
  # Create Storage for Video Thumbnails
  
  1. Storage
    - Create a public bucket called 'video-thumbnails' for storing video thumbnail images
    - Allow public read access
    - Allow anonymous users to upload, update, and delete (temporary until authentication)
  
  2. Security
    - Public read access for thumbnails
    - Public write access (temporary - should be restricted with authentication in production)
*/

-- Create storage bucket for video thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'video-thumbnails',
  'video-thumbnails',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read video thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload video thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update video thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete video thumbnails" ON storage.objects;

-- Allow public read access
CREATE POLICY "Anyone can read video thumbnails"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'video-thumbnails');

-- Allow anyone to upload (temporary until proper auth)
CREATE POLICY "Anyone can upload video thumbnails"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'video-thumbnails');

-- Allow anyone to update (temporary until proper auth)
CREATE POLICY "Anyone can update video thumbnails"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'video-thumbnails')
  WITH CHECK (bucket_id = 'video-thumbnails');

-- Allow anyone to delete (temporary until proper auth)
CREATE POLICY "Anyone can delete video thumbnails"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'video-thumbnails');