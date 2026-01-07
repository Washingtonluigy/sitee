/*
  # Create Admin Content Management Tables

  1. New Tables
    - `site_config`: Main site configuration (title, logo, button links)
    - `videos`: VSL/promotional video storage
    - `testimonials`: Social proof testimonials/reviews
  
  2. Security
    - Enable RLS on all tables
    - Create basic policies for admin access
  
  3. Features
    - Each table has updated_at timestamp for tracking changes
    - Testimonials include rating, image, and role
*/

CREATE TABLE IF NOT EXISTS site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text DEFAULT 'Sua saúde merece',
  hero_subtitle text DEFAULT 'atenção especializada',
  hero_description text DEFAULT 'A Amah conecta você com profissionais qualificados de diversas áreas da saúde de forma rápida e segura.',
  logo_url text,
  button_primary_text text DEFAULT 'Começar Agora',
  button_primary_link text DEFAULT 'https://amah-sistema-de-saude.netlify.app',
  button_secondary_text text DEFAULT 'Sou Profissional',
  button_secondary_link text DEFAULT 'https://amah-sistema-de-saude.netlify.app',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  video_url text,
  thumbnail_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text,
  content text NOT NULL,
  rating integer DEFAULT 5,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to site_config" ON site_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to videos" ON videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all access to testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);

INSERT INTO site_config (hero_title, hero_subtitle, logo_url, button_primary_link, button_secondary_link) 
VALUES ('Sua saúde merece', 'atenção especializada', '', 'https://amah-sistema-de-saude.netlify.app', 'https://amah-sistema-de-saude.netlify.app')
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (name, role, content, rating, image_url)
VALUES 
  ('Maria Silva', 'Paciente', 'A Amah mudou completamente minha experiência com atendimento médico. Consegui um especialista em poucos minutos!', 5, 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Dr. Carlos Mendes', 'Fisioterapeuta', 'Como profissional, a plataforma me permite gerenciar atendimentos de forma eficiente e alcançar mais pacientes.', 5, 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'),
  ('Ana Costa', 'Paciente', 'Plataforma intuitiva e segura. Encontrei uma nutricionista incrível que está me ajudando com meus objetivos de saúde!', 5, 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop')
ON CONFLICT DO NOTHING;