import { createClient } from '@supabase/supabase-js';

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
  price: number;
  image_url: string;
  category: string;
  collection?: string;
  dimensions?: string;
  material?: string;
  in_stock: boolean;
  is_new?: boolean;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Elowen Armchair',
    description: 'A sculptural piece that blends mid-century modern aesthetics with contemporary comfort. Crafted from sustainably sourced oak and premium linen.',
    price: 895,
    image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
    category: 'Seating',
    collection: 'The Nordic Series',
    in_stock: true,
    material: 'Oak & Linen',
    is_new: true
  },
  {
    id: '2',
    name: 'Travertine Coffee Table',
    description: 'Minimalist geometry meets natural stone. Each piece features unique veining and a honed finish that celebrates the raw beauty of travertine.',
    price: 1250,
    image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop',
    category: 'Tables',
    collection: 'Stone Essentials',
    in_stock: true,
    material: 'Italian Travertine'
  },
  {
    id: '3',
    name: 'Lumiere Pendant Light',
    description: 'Hand-blown glass globe with brushed brass hardware. A timeless lighting solution that casts a warm, diffused glow.',
    price: 420,
    image_url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1000&auto=format&fit=crop',
    category: 'Lighting',
    collection: 'Modern Glow',
    in_stock: true,
    material: 'Glass & Brass',
    is_new: true
  },
  {
    id: '4',
    name: 'Suede Modular Sofa',
    description: 'Versatile and luxurious. This modular system allows you to create the perfect configuration for your living space.',
    price: 3400,
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
    category: 'Seating',
    collection: 'The Nordic Series',
    in_stock: false,
    material: 'Performance Suede',
    is_new: true
  },
  {
    id: '5',
    name: 'Abstract Wool Rug',
    description: 'Hand-tufted from 100% New Zealand wool. Features a subtle high-low pile that adds tactile depth to any room.',
    price: 650,
    image_url: 'https://images.unsplash.com/photo-1575414003591-ece8d0416c7a?q=80&w=1000&auto=format&fit=crop',
    category: 'Rugs',
    collection: 'Artisan Weaves',
    in_stock: true,
    material: 'NZ Wool'
  },
  {
    id: '6',
    name: 'Minimalist Oak Desk',
    description: 'A clean workspace for focused creativity. Features integrated cable management and a slim profile.',
    price: 1100,
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=1000&auto=format&fit=crop',
    category: 'Tables',
    collection: 'Stone Essentials',
    in_stock: true,
    material: 'Solid Oak'
  }
];
