import { createClient } from '@supabase/supabase-js';
import mockProductsData from './products.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';

// Only initialize if URL is provided to prevent crash
export const supabase = supabaseUrl
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  collection?: string;
  dimensions?: string;
  material?: string;
  in_stock: boolean;
  is_new?: boolean;
}

export const MOCK_PRODUCTS: Product[] = mockProductsData as Product[];
