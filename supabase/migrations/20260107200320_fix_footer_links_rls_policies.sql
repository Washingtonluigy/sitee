/*
  # Fix Footer Links RLS Policies
  
  1. Changes
    - Drop existing restrictive policies on footer_links
    - Allow anonymous users to insert, update, and delete footer links for admin panel
    - This is temporary until proper authentication is implemented
  
  2. Security
    - Anyone can read, insert, update, and delete footer links
    - This should be replaced with proper authentication in production
*/

-- Drop existing policies on footer_links
DROP POLICY IF EXISTS "Authenticated users can insert footer links" ON footer_links;
DROP POLICY IF EXISTS "Authenticated users can update footer links" ON footer_links;
DROP POLICY IF EXISTS "Authenticated users can delete footer links" ON footer_links;

-- Create new policies that allow anonymous access
CREATE POLICY "Anyone can insert footer links"
  ON footer_links
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update footer links"
  ON footer_links
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete footer links"
  ON footer_links
  FOR DELETE
  TO public
  USING (true);