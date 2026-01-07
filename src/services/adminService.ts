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
