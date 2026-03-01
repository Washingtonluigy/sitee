import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface SiteConfig {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  logo_url: string;
  button_primary_text: string;
  button_primary_link: string;
  button_secondary_text: string;
  button_secondary_link: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FooterLink {
  id: string;
  section: string;
  title: string;
  url: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  terms_url: string;
  privacy_url: string;
  cookies_url: string;
  updated_at: string;
}

export interface HeroContent {
  id: string;
  badge_text: string;
  title: string;
  title_highlight: string;
  description: string;
  button_primary_text: string;
  button_secondary_text: string;
  hero_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserTypeContent {
  id: string;
  section_title: string;
  section_description: string;
  patient_title: string;
  patient_description: string;
  patient_feature_1: string;
  patient_feature_2: string;
  patient_feature_3: string;
  patient_feature_4: string;
  patient_button_text: string;
  professional_title: string;
  professional_description: string;
  professional_feature_1: string;
  professional_feature_2: string;
  professional_feature_3: string;
  professional_feature_4: string;
  professional_button_text: string;
  created_at: string;
  updated_at: string;
}

export interface StepContent {
  id: string;
  section_title: string;
  user_type: 'patient' | 'professional';
  step_number: number;
  icon_name: string;
  title: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SpecialtyContent {
  id: string;
  section_title: string;
  section_description: string;
  name: string;
  icon_name: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TransparencyContent {
  id: string;
  badge_text: string;
  section_title: string;
  feature_1_title: string;
  feature_1_description: string;
  feature_2_title: string;
  feature_2_description: string;
  feature_3_title: string;
  feature_3_description: string;
  testimonials_title: string;
  created_at: string;
  updated_at: string;
}

export interface ValidationContent {
  id: string;
  section_title: string;
  section_description: string;
  badge_subtitle: string;
  badge_title: string;
  badge_description: string;
  created_at: string;
  updated_at: string;
}

export interface FinalCTAContent {
  id: string;
  title: string;
  description: string;
  button_primary_text: string;
  button_secondary_text: string;
  created_at: string;
  updated_at: string;
}

export interface StatContent {
  id: string;
  stat_key: string;
  stat_value: string;
  stat_label: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getSiteConfig = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('site_config')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as SiteConfig | null;
};

export const updateSiteConfig = async (config: Partial<SiteConfig>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('site_config')
    .update({ ...config, updated_at: new Date().toISOString() })
    .eq('id', config.id)
    .select()
    .single();

  if (error) throw error;
  return data as SiteConfig;
};

export const getVideos = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Video[];
};

export const addVideo = async (video: Omit<Video, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('videos')
    .insert([video])
    .select()
    .single();

  if (error) throw error;
  return data as Video;
};

export const updateVideo = async (id: string, video: Partial<Video>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('videos')
    .update({ ...video, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Video;
};

export const deleteVideo = async (id: string) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadThumbnail = async (file: File): Promise<string> => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('video-thumbnails')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('video-thumbnails')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const deleteThumbnail = async (url: string) => {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const fileName = url.split('/').pop();
    if (!fileName) return;

    await supabase.storage
      .from('video-thumbnails')
      .remove([fileName]);
  } catch (error) {
    console.error('Error deleting thumbnail:', error);
  }
};

export const getTestimonials = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
};

export const getAllTestimonials = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Testimonial[];
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('testimonials')
    .insert([testimonial])
    .select()
    .single();

  if (error) throw error;
  return data as Testimonial;
};

export const updateTestimonial = async (id: string, testimonial: Partial<Testimonial>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('testimonials')
    .update({ ...testimonial, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Testimonial;
};

export const deleteTestimonial = async (id: string) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const uploadTestimonialImage = async (file: File): Promise<string> => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('testimonial-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('testimonial-images')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const getFooterLinks = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('footer_links')
    .select('*')
    .order('section', { ascending: true })
    .order('order', { ascending: true });

  if (error) throw error;
  return data as FooterLink[];
};

export const addFooterLink = async (link: Omit<FooterLink, 'id' | 'created_at' | 'updated_at'>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('footer_links')
    .insert([link])
    .select()
    .single();

  if (error) throw error;
  return data as FooterLink;
};

export const updateFooterLink = async (id: string, link: Partial<FooterLink>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('footer_links')
    .update({ ...link, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as FooterLink;
};

export const deleteFooterLink = async (id: string) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { error } = await supabase
    .from('footer_links')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const getContactInfo = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as ContactInfo | null;
};

export const updateContactInfo = async (info: Partial<ContactInfo>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase
    .from('contact_info')
    .select('id')
    .maybeSingle();

  if (!existingData || !existingData.id) {
    const { id, ...infoWithoutId } = info;
    const { data: insertData, error: insertError } = await supabase
      .from('contact_info')
      .insert([{ ...infoWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as ContactInfo;
  }

  const { id: _, ...updateData } = info;
  const { data, error } = await supabase
    .from('contact_info')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as ContactInfo;
};

// Hero Content
export const getHeroContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as HeroContent | null;
};

export const updateHeroContent = async (content: Partial<HeroContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase.from('hero_content').select('id').maybeSingle();

  if (!existingData) {
    const { id, ...contentWithoutId } = content;
    const { data: insertData, error: insertError } = await supabase
      .from('hero_content')
      .insert([{ ...contentWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as HeroContent;
  }

  const { id: _, ...updateData } = content;
  const { data, error } = await supabase
    .from('hero_content')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as HeroContent;
};

// User Type Content
export const getUserTypeContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('user_type_content')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as UserTypeContent | null;
};

export const updateUserTypeContent = async (content: Partial<UserTypeContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase.from('user_type_content').select('id').maybeSingle();

  if (!existingData) {
    const { id, ...contentWithoutId } = content;
    const { data: insertData, error: insertError } = await supabase
      .from('user_type_content')
      .insert([{ ...contentWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as UserTypeContent;
  }

  const { id: _, ...updateData } = content;
  const { data, error } = await supabase
    .from('user_type_content')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as UserTypeContent;
};

// Steps Content
export const getStepsContent = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('steps_content')
    .select('*')
    .eq('is_active', true)
    .order('user_type')
    .order('display_order');

  if (error) throw error;
  return data as StepContent[];
};

export const updateStepContent = async (id: string, content: Partial<StepContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('steps_content')
    .update({ ...content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as StepContent;
};

// Specialties Content
export const getSpecialtiesContent = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('specialties_content')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) throw error;
  return data as SpecialtyContent[];
};

export const updateSpecialtyContent = async (id: string, content: Partial<SpecialtyContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('specialties_content')
    .update({ ...content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as SpecialtyContent;
};

// Transparency Content
export const getTransparencyContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('transparency_content')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as TransparencyContent | null;
};

export const updateTransparencyContent = async (content: Partial<TransparencyContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase.from('transparency_content').select('id').maybeSingle();

  if (!existingData) {
    const { id, ...contentWithoutId } = content;
    const { data: insertData, error: insertError } = await supabase
      .from('transparency_content')
      .insert([{ ...contentWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as TransparencyContent;
  }

  const { id: _, ...updateData } = content;
  const { data, error } = await supabase
    .from('transparency_content')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as TransparencyContent;
};

// Validation Content
export const getValidationContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('validation_content')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as ValidationContent | null;
};

export const updateValidationContent = async (content: Partial<ValidationContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase.from('validation_content').select('id').maybeSingle();

  if (!existingData) {
    const { id, ...contentWithoutId } = content;
    const { data: insertData, error: insertError } = await supabase
      .from('validation_content')
      .insert([{ ...contentWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as ValidationContent;
  }

  const { id: _, ...updateData } = content;
  const { data, error } = await supabase
    .from('validation_content')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as ValidationContent;
};

// Final CTA Content
export const getFinalCTAContent = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from('final_cta_content')
    .select('*')
    .maybeSingle();

  if (error) throw error;
  return data as FinalCTAContent | null;
};

export const updateFinalCTAContent = async (content: Partial<FinalCTAContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data: existingData } = await supabase.from('final_cta_content').select('id').maybeSingle();

  if (!existingData) {
    const { id, ...contentWithoutId } = content;
    const { data: insertData, error: insertError } = await supabase
      .from('final_cta_content')
      .insert([{ ...contentWithoutId, updated_at: new Date().toISOString() }])
      .select()
      .single();

    if (insertError) throw insertError;
    return insertData as FinalCTAContent;
  }

  const { id: _, ...updateData } = content;
  const { data, error } = await supabase
    .from('final_cta_content')
    .update({ ...updateData, updated_at: new Date().toISOString() })
    .eq('id', existingData.id)
    .select()
    .single();

  if (error) throw error;
  return data as FinalCTAContent;
};

// Stats Content
export const getStatsContent = async () => {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from('stats_content')
    .select('*')
    .eq('is_active', true)
    .order('display_order');

  if (error) throw error;
  return data as StatContent[];
};

export const updateStatContent = async (id: string, content: Partial<StatContent>) => {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase not configured');

  const { data, error } = await supabase
    .from('stats_content')
    .update({ ...content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as StatContent;
};
