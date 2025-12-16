// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getLocalizedContent(table: string, locale: string = 'tr') {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('locale', locale)
    .single();

  if (error) {
    console.error(`Error fetching ${table} content:`, error);
    // Fallback to default language if content in requested locale is not found
    if (locale !== 'tr') {
      return getLocalizedContent(table, 'tr');
    }
    throw error;
  }

  return data;
}