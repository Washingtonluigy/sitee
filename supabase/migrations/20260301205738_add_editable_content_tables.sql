/*
  # Adicionar tabelas de conteúdo editável

  1. Novas Tabelas
    - `hero_content` - Conteúdo editável da seção Hero
    - `user_type_content` - Cards de escolha (Paciente/Profissional)
    - `steps_content` - Passos para pacientes e profissionais
    - `specialties_content` - Especialidades médicas
    - `transparency_content` - Seção de transparência
    - `validation_content` - Seção de validação
    - `final_cta_content` - CTA final
    - `stats_content` - Estatísticas

  2. Segurança
    - RLS habilitado
    - Leitura pública
    - Escrita apenas autenticados
*/

-- Hero Content
CREATE TABLE IF NOT EXISTS hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text text DEFAULT '🏥 PLATAFORMA DE PROFISSIONAIS DA SAÚDE',
  title text DEFAULT 'O cuidado que você precisa,',
  title_highlight text DEFAULT 'onde você estiver.',
  description text DEFAULT 'Conectamos você aos melhores profissionais de saúde para atendimento domiciliar, clínico ou presencial. Simples, rápido e eficiente.',
  button_primary_text text DEFAULT 'Encontrar profissional',
  button_secondary_text text DEFAULT 'Quero me cadastrar',
  hero_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hero content" ON hero_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update hero content" ON hero_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert hero content" ON hero_content FOR INSERT TO authenticated WITH CHECK (true);

-- User Type Selection Content
CREATE TABLE IF NOT EXISTS user_type_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text DEFAULT 'Como podemos ajudar você hoje?',
  section_description text DEFAULT 'Escolha o seu perfil e descubra as vantagens da nossa plataforma',
  patient_title text DEFAULT 'Sou Paciente ou Familiar',
  patient_description text DEFAULT 'Busco atendimento de qualidade para quem eu amo, no conforto de casa.',
  patient_feature_1 text DEFAULT 'Acesso a diversas especialidades',
  patient_feature_2 text DEFAULT 'Profissionais rigorosamente verificados',
  patient_feature_3 text DEFAULT 'Agendamento rápido e fácil',
  patient_feature_4 text DEFAULT 'Segurança para você e sua família',
  patient_button_text text DEFAULT 'Encontrar meu profissional',
  professional_title text DEFAULT 'Sou Profissional de Saúde',
  professional_description text DEFAULT 'Quero ampliar minha base de pacientes e ter autonomia.',
  professional_feature_1 text DEFAULT 'Liberdade para definir horários',
  professional_feature_2 text DEFAULT 'Validação com órgãos públicos',
  professional_feature_3 text DEFAULT 'Grande variedade de convênios',
  professional_feature_4 text DEFAULT 'Atendimento gerenciado e seguro',
  professional_button_text text DEFAULT 'Quero me cadastrar',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_type_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read user type content" ON user_type_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update user type content" ON user_type_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert user type content" ON user_type_content FOR INSERT TO authenticated WITH CHECK (true);

-- Steps Content
CREATE TABLE IF NOT EXISTS steps_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text DEFAULT 'Simples como deve ser',
  user_type text NOT NULL,
  step_number int NOT NULL,
  icon_name text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE steps_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read steps content" ON steps_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can manage steps content" ON steps_content FOR ALL TO authenticated USING (true);

-- Specialties Content
CREATE TABLE IF NOT EXISTS specialties_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text DEFAULT 'Especialidades que cuidam de você',
  section_description text DEFAULT 'Temos uma ampla variedade de profissionais prontos para atender',
  name text NOT NULL,
  icon_name text NOT NULL,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE specialties_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read specialties" ON specialties_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can manage specialties" ON specialties_content FOR ALL TO authenticated USING (true);

-- Transparency Content
CREATE TABLE IF NOT EXISTS transparency_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_text text DEFAULT '🔒 SEGURANÇA EM PRIMEIRO LUGAR',
  section_title text DEFAULT 'Transparência e confiança em cada conexão.',
  feature_1_title text DEFAULT 'Verificação Rigorosa',
  feature_1_description text DEFAULT 'Validamos documentos e registros profissionais para sua segurança',
  feature_2_title text DEFAULT 'Plataforma Intermediária',
  feature_2_description text DEFAULT 'A Amah facilita busca e conexão com profissionais autônomos',
  feature_3_title text DEFAULT 'Proteção de Dados',
  feature_3_description text DEFAULT 'Seguimos rigorosamente a LGPD',
  testimonials_title text DEFAULT 'O que dizem nossos usuários',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transparency_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read transparency content" ON transparency_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update transparency content" ON transparency_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert transparency content" ON transparency_content FOR INSERT TO authenticated WITH CHECK (true);

-- Validation Content
CREATE TABLE IF NOT EXISTS validation_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_title text DEFAULT 'A Segurança de contar com profissionais validados e capacitados.',
  section_description text DEFAULT 'Na Amah, todos os profissionais são validados.',
  badge_subtitle text DEFAULT 'Validado por',
  badge_title text DEFAULT 'Plataforma Amah',
  badge_description text DEFAULT 'Profissionais verificados',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE validation_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read validation content" ON validation_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update validation content" ON validation_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert validation content" ON validation_content FOR INSERT TO authenticated WITH CHECK (true);

-- Final CTA Content
CREATE TABLE IF NOT EXISTS final_cta_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text DEFAULT 'Cuidar começa com a escolha certa.',
  description text DEFAULT 'A Amah é saúde e segurança a um clique de distância.',
  button_primary_text text DEFAULT 'Buscar profissional agora',
  button_secondary_text text DEFAULT 'Cadastrar-se como profissional',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE final_cta_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read final cta content" ON final_cta_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can update final cta content" ON final_cta_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert final cta content" ON final_cta_content FOR INSERT TO authenticated WITH CHECK (true);

-- Stats Content
CREATE TABLE IF NOT EXISTS stats_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_key text UNIQUE NOT NULL,
  stat_value text NOT NULL,
  stat_label text NOT NULL,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stats_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stats" ON stats_content FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can manage stats" ON stats_content FOR ALL TO authenticated USING (true);

-- Adicionar campos faltantes à tabela testimonials existente
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'avatar_letter'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN avatar_letter text DEFAULT 'A';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'avatar_color'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN avatar_color text DEFAULT '#783DAC';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'testimonials' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE testimonials ADD COLUMN display_order int DEFAULT 0;
  END IF;
END $$;

-- Insert default data
INSERT INTO hero_content (id) VALUES (gen_random_uuid());
INSERT INTO user_type_content (id) VALUES (gen_random_uuid());
INSERT INTO transparency_content (id) VALUES (gen_random_uuid());
INSERT INTO validation_content (id) VALUES (gen_random_uuid());
INSERT INTO final_cta_content (id) VALUES (gen_random_uuid());

-- Insert default steps for patients
INSERT INTO steps_content (user_type, step_number, icon_name, title, description, display_order) VALUES
('patient', 1, 'Search', 'Escolha a especialidade', 'Navegue por diversas categorias e escolha o profissional ideal', 1),
('patient', 2, 'Shield', 'Conecte-se com segurança', 'Visualize o perfil verificado do profissional', 2),
('patient', 3, 'Calendar', 'Receba o atendimento', 'Agende seu serviço no conforto da sua casa', 3);

-- Insert default steps for professionals
INSERT INTO steps_content (user_type, step_number, icon_name, title, description, display_order) VALUES
('professional', 1, 'FileCheck', 'Cadastre seu perfil', 'Crie seus dados e envie credenciais para validação', 1),
('professional', 2, 'UserCheck', 'Passe pela verificação', 'Nossa equipe valida seu perfil profissional', 2),
('professional', 3, 'Zap', 'Receba oportunidades', 'Conecte-se com pacientes e receba solicitações', 3);

-- Insert default specialties
INSERT INTO specialties_content (name, icon_name, display_order) VALUES
('Home Care', 'Home', 1),
('Enfermagem', 'Activity', 2),
('Pediatria', 'Heart', 3),
('Intensivista', 'Stethoscope', 4),
('Prenatal', 'Baby', 5),
('Cuidadores', 'Syringe', 6),
('Médicos', 'Eye', 7),
('Pós-Operatório', 'Pill', 8);

-- Insert default stats
INSERT INTO stats_content (stat_key, stat_value, stat_label, display_order) VALUES
('users', '5k+', 'Usuários', 1),
('professionals', '1k+', 'Profissionais', 2),
('rating', '4.9', 'Avaliação', 3);
