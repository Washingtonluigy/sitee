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
