/*
  # Fix Contact Info RLS Policies
  
  1. Changes
    - Drop existing restrictive policies
    - Allow anonymous users to update contact info for admin panel
    - This is temporary until proper authentication is implemented
  
  2. Security
    - Anyone can read, insert, update, and delete contact info
    - This should be replaced with proper authentication in production
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can update contact info" ON contact_info;
DROP POLICY IF EXISTS "Authenticated users can insert contact info" ON contact_info;

-- Create new policies that allow anonymous access
CREATE POLICY "Anyone can update contact info"
  ON contact_info
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can insert contact info"
  ON contact_info
  FOR INSERT
  TO public
  WITH CHECK (true);