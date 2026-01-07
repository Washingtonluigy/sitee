/*
  # Adicionar Gerenciamento de Footer e Contato
  
  1. Novas Tabelas
    - `footer_links` - Links do footer (Plataforma, Empresa, etc)
      - `id` (uuid, primary key)
      - `section` (text) - Nome da seção (ex: Plataforma, Empresa)
      - `title` (text) - Título do link
      - `url` (text) - URL do link
      - `order` (integer) - Ordem de exibição
      - `is_active` (boolean) - Se está ativo
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_info` - Informações de contato
      - `id` (uuid, primary key)
      - `email` (text) - Email de contato
      - `phone` (text) - Telefone
      - `address` (text) - Endereço
      - `city` (text) - Cidade
      - `state` (text) - Estado
      - `country` (text) - País
      - `terms_url` (text) - URL dos termos de uso
      - `privacy_url` (text) - URL da política de privacidade
      - `cookies_url` (text) - URL da política de cookies
      - `updated_at` (timestamp)
  
  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Permitir leitura pública
    - Permitir escrita apenas para usuários autenticados
*/

-- Criar tabela footer_links
CREATE TABLE IF NOT EXISTS footer_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  title text NOT NULL,
  url text NOT NULL,
  "order" integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela contact_info
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text DEFAULT '',
  phone text DEFAULT '',
  address text DEFAULT '',
  city text DEFAULT '',
  state text DEFAULT '',
  country text DEFAULT '',
  terms_url text DEFAULT '',
  privacy_url text DEFAULT '',
  cookies_url text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

-- Políticas para footer_links
CREATE POLICY "Anyone can read footer links"
  ON footer_links FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert footer links"
  ON footer_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update footer links"
  ON footer_links FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete footer links"
  ON footer_links FOR DELETE
  TO authenticated
  USING (true);

-- Políticas para contact_info
CREATE POLICY "Anyone can read contact info"
  ON contact_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert contact info"
  ON contact_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contact info"
  ON contact_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Inserir dados padrão de contato se não existir
INSERT INTO contact_info (email, phone, address, city, state, country, terms_url, privacy_url, cookies_url)
SELECT 
  'contato@amah.com.br',
  '(11) 4000-0000',
  '',
  'São Paulo',
  'SP',
  'Brasil',
  'https://amah-sistema-de-saude.netlify.app',
  'https://amah-sistema-de-saude.netlify.app',
  'https://amah-sistema-de-saude.netlify.app'
WHERE NOT EXISTS (SELECT 1 FROM contact_info);

-- Inserir links padrão do footer se não existirem
INSERT INTO footer_links (section, title, url, "order", is_active)
SELECT * FROM (VALUES
  ('Plataforma', 'Como Funciona', 'https://amah-sistema-de-saude.netlify.app', 1, true),
  ('Plataforma', 'Para Pacientes', 'https://amah-sistema-de-saude.netlify.app', 2, true),
  ('Plataforma', 'Para Profissionais', 'https://amah-sistema-de-saude.netlify.app', 3, true),
  ('Plataforma', 'Especialidades', 'https://amah-sistema-de-saude.netlify.app', 4, true),
  ('Plataforma', 'Depoimentos', 'https://amah-sistema-de-saude.netlify.app', 5, true),
  ('Empresa', 'Sobre Nós', 'https://amah-sistema-de-saude.netlify.app', 1, true),
  ('Empresa', 'Blog', 'https://amah-sistema-de-saude.netlify.app', 2, true),
  ('Empresa', 'Carreira', 'https://amah-sistema-de-saude.netlify.app', 3, true),
  ('Empresa', 'Imprensa', 'https://amah-sistema-de-saude.netlify.app', 4, true),
  ('Empresa', 'Parceiros', 'https://amah-sistema-de-saude.netlify.app', 5, true)
) AS t(section, title, url, "order", is_active)
WHERE NOT EXISTS (SELECT 1 FROM footer_links);