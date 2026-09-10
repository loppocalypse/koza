"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Filter,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Layers,
  ChevronRight,
  CheckCircle2,
  Send,
  FileText,
  Building2,
  Mail,
  User,
  Hash,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { MOCK_PRODUCTS, type Product } from '@/src/lib/supabase';
import { SectionHeading } from '@/components/SectionHeading';

export interface BrandInfo {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  description: string;
  heroImage: string;
  categories: string[];
}

export const BRANDS: Record<string, BrandInfo> = {
  'Siesta': {
    id: 'Siesta',
    name: 'Siesta Exclusive',
    subtitle: 'High-Performance Turkish & Italian Craft',
    origin: 'Istanbul, Turkey • Est. 1978',
    description: 'Pioneering injected fiberglass-reinforced resin furniture, designed for commercial longevity and modern resort elegance.',
    heroImage: '/contract_siesta.jpg',
    categories: ['Seating', 'Tables', 'Decor']
  },
  'Şemsiye Evi': {
    id: 'Şemsiye Evi',
    name: 'Şemsiye Evi',
    subtitle: 'Architectural Shading Systems',
    origin: 'Istanbul, Turkey',
    description: 'Bespoke mega-scale umbrellas and telescoping outdoor shading systems engineered for wind resistance and luxury hospitality.',
    heroImage: '/mega_umbrella.jpg',
    categories: ['Umbrellas']
  },
  'Detay': {
    id: 'Detay',
    name: 'Detay Tekstil',
    subtitle: 'Aegean Organic Textiles & Spa',
    origin: 'Denizli, Turkey',
    description: 'Finest 100% Turkish organic cotton bathrobes, flat-weave pestemals, and spa linens with ultra-absorbent tactile luxury.',
    heroImage: '/collection/Detay/Beach%20and%20Spa/spa1(1).jpg',
    categories: ['Towels', 'Rugs']
  },
  'Samur': {
    id: 'Samur',
    name: 'Samur Carpets',
    subtitle: 'Contract & Protocol Woven Guild',
    origin: 'Ankara, Turkey • Est. 1973',
    description: 'High-density contract broadloom, wool-blend protocol floor coverings, and architectural acoustic carpet tile systems.',
    heroImage: '/broadloom_samur.jpg',
    categories: ['Rugs']
  },
  'Koza Studio': {
    id: 'Koza Studio',
    name: 'Koza Studio',
    subtitle: 'In-House Curated Editions',
    origin: 'Tbilisi, Georgia',
    description: 'Sculptural monolithic travertine, hand-blown brass pendant lighting, and minimalist Nordic lounge pieces.',
    heroImage: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop',
    categories: ['Seating', 'Tables', 'Lighting', 'Rugs']
  },
  'Ormel': {
    id: 'Ormel',
    name: 'Ormel Çelik',
    subtitle: 'Architectural Hospitality & Service Guild',
    origin: 'Istanbul, Turkey • Est. 1990',
    description: 'Premier stainless steel and fine-wood hotel service trolleys, modular buffet architecture, and banquet systems engineered for high-profile hospitality.',
    heroImage: '/collection/Ormel/3a32f5d4ecb948778fbf89585563a293_511.png',
    categories: ['Hospitality', 'Tables', 'Seating', 'Decor']
  }
};

export function getProductBrand(product: Product): string {
  if (product.brand && BRANDS[product.brand]) return product.brand;
  const img = product.image_url || '';
  const name = product.name || '';
  const col = product.collection || '';
  
  if (img.includes('/collection/Ormel/') || name.toLowerCase().includes('ormel') || col === 'Ormel') {
    return 'Ormel';
  }
  if (
    img.includes('/collection/Siesta/') ||
    name.toLowerCase().startsWith('siesta') ||
    ['Contract', 'Rattan', 'Garden'].includes(col)
  ) {
    return 'Siesta';
  }
  if (img.includes('/collection/Detay/') || col === 'Detay') {
    return 'Detay';
  }
  if (
    img.includes('/collection/Umbrella/') ||
    img.toLowerCase().includes('semsiye') ||
    name.toLowerCase().includes('titanic') ||
    name.toLowerCase().includes('semsiye') ||
    ['Beach', 'Telescopic', 'Side-Arm', 'Pergo', 'Mega'].includes(col)
  ) {
    return 'Şemsiye Evi';
  }
  if (
    img.toLowerCase().includes('samur') ||
    name.toLowerCase().includes('samur') ||
    ['The Tile', 'Protocol', 'Broadloom', 'Bradloom'].includes(col)
  ) {
    return 'Samur';
  }
  return 'Koza Studio';
}

function normalizeSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

interface ProductExplorerProps {
  searchQuery?: string;
  newArrivalsOnly?: boolean;
  collectionName?: string;
  category?: string;
}

const ITEMS_PER_PAGE = 24;

export function ProductExplorer({
  searchQuery = '',
  newArrivalsOnly = false,
  collectionName,
  category: initialCategory
}: ProductExplorerProps) {
  // Normalize collection matching if supplied
  const baseProducts = useMemo(() => {
    let list = newArrivalsOnly ? MOCK_PRODUCTS.filter(p => p.is_new) : MOCK_PRODUCTS;
    if (collectionName) {
      const targetSlug = normalizeSlug(collectionName);
      list = list.filter(p => p.collection && normalizeSlug(p.collection) === targetSlug);
    }
    if (initialCategory) {
      list = list.filter(p => p.category.toLowerCase() === initialCategory.toLowerCase());
    }
    return list;
  }, [newArrivalsOnly, collectionName, initialCategory]);

  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSubCollection, setSelectedSubCollection] = useState<string>('All');
  const [selectedBrandCategory, setSelectedBrandCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'az' | 'stock'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(ITEMS_PER_PAGE);

  // Inquiry state for modal
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    company: '',
    quantity: '1',
    notes: ''
  });

  const categories = ['All', 'Hospitality', 'Seating', 'Tables', 'Lighting', 'Rugs', 'Towels', 'Umbrellas', 'Decor'];

  // Reset pagination & secondary filters when drilldown changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [selectedBrand, selectedCategory, selectedSubCollection, selectedBrandCategory, sortBy, searchQuery]);

  // Handle top category switch
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedBrand(null);
    setSelectedSubCollection('All');
    setSelectedBrandCategory('All');
  };

  // Group and filter products for the top catalog
  const categoryFilteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getProductBrand(product).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.collection && product.collection.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Extract available brands for the selected category
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, { brand: BrandInfo; count: number; items: Product[]; collections: string[] }>();

    categoryFilteredProducts.forEach(product => {
      const brandKey = getProductBrand(product);
      const brandInfo = BRANDS[brandKey] || {
        id: brandKey,
        name: brandKey,
        subtitle: 'Specialty Collection',
        origin: 'International',
        description: 'Carefully curated artisan pieces.',
        heroImage: product.image_url,
        categories: [product.category]
      };

      if (!brandMap.has(brandKey)) {
        brandMap.set(brandKey, {
          brand: brandInfo,
          count: 0,
          items: [],
          collections: []
        });
      }

      const entry = brandMap.get(brandKey)!;
      entry.count++;
      entry.items.push(product);
      if (product.collection && !entry.collections.includes(product.collection)) {
        entry.collections.push(product.collection);
      }
    });

    return Array.from(brandMap.values());
  }, [categoryFilteredProducts]);

  // Brand-filtered products when a brand is selected or when collectionName prop is active
  const activeBrandItems = useMemo(() => {
    if (collectionName) return baseProducts;
    if (!selectedBrand) return [];

    let items = categoryFilteredProducts.filter(p => getProductBrand(p) === selectedBrand);

    if (selectedSubCollection !== 'All') {
      items = items.filter(p => p.collection === selectedSubCollection);
    }

    if (selectedBrandCategory !== 'All') {
      items = items.filter(p => p.category === selectedBrandCategory);
    }

    if (sortBy === 'az') {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'stock') {
      items = [...items].sort((a, b) => (b.in_stock ? 1 : 0) - (a.in_stock ? 1 : 0));
    }

    return items;
  }, [categoryFilteredProducts, selectedBrand, selectedSubCollection, selectedBrandCategory, sortBy, collectionName, baseProducts]);

  const activeBrandInfo = selectedBrand ? BRANDS[selectedBrand] : null;

  // Sub-collections for active brand
  const activeBrandSubCollections = useMemo(() => {
    if (!selectedBrand) return [];
    const brandItems = categoryFilteredProducts.filter(p => getProductBrand(p) === selectedBrand);
    const cols = Array.from(new Set(brandItems.map(p => p.collection).filter(Boolean))) as string[];
    return ['All', ...cols];
  }, [categoryFilteredProducts, selectedBrand]);

  // Available categories within the active brand
  const activeBrandCategories = useMemo(() => {
    if (!selectedBrand) return [];
    const brandItems = categoryFilteredProducts.filter(p => getProductBrand(p) === selectedBrand);
    const cats = Array.from(new Set(brandItems.map(p => p.category).filter(Boolean))) as string[];
    return cats.length > 1 ? ['All', ...cats] : [];
  }, [categoryFilteredProducts, selectedBrand]);

  // Direct collection view mode
  const showDirectGrid = Boolean(collectionName);

  // Paginated slice
  const paginatedItems = useMemo(() => {
    return activeBrandItems.slice(0, visibleCount);
  }, [activeBrandItems, visibleCount]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      // setIsInquiryOpen(false);
    }, 3000);
  };

  return (
    <>
      <section className="container mx-auto px-6 md:px-12 py-32" id="product-explorer">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
          <div className="max-w-2xl">
            <SectionHeading
              subtitle={
                collectionName
                  ? `Collection Series`
                  : newArrivalsOnly
                  ? "New Arrivals"
                  : selectedBrand
                  ? `${activeBrandInfo?.name || selectedBrand} • ${selectedCategory}`
                  : "Brand Directory"
              }
              title={
                collectionName
                  ? `Discover the ${collectionName} Edition`
                  : newArrivalsOnly
                  ? "Discover our newest additions"
                  : selectedBrand
                  ? `${activeBrandInfo?.subtitle || 'Selected Brand Collection'}`
                  : `Explore ${selectedCategory === 'All' ? 'Partner Brands' : `${selectedCategory} by Brand`}`
              }
            />

            {/* Breadcrumb back when brand is selected */}
            {selectedBrand && !showDirectGrid && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-6 flex items-center gap-4"
              >
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setSelectedSubCollection('All');
                    setSelectedBrandCategory('All');
                  }}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold hover:text-brand-ink transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  Back to Available Brands in {selectedCategory}
                </button>
              </motion.div>
            )}

            {/* Top Category Tabs (When on main explorer) */}
            {!initialCategory && !collectionName && !selectedBrand && (
              <div className="flex flex-wrap gap-8 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold pb-2 transition-all duration-500 relative group ${
                      selectedCategory === cat ? 'text-brand-ink' : 'text-brand-ink/30 hover:text-brand-ink'
                    }`}
                  >
                    {cat}
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-px bg-brand-gold origin-left"
                      initial={false}
                      animate={{ scaleX: selectedCategory === cat ? 1 : 0 }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* In-Brand Category filters */}
            {selectedBrand && activeBrandCategories.length > 0 && (
              <div className="flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-brand-ink/10">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {activeBrandCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedBrandCategory(cat)}
                      className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 transition-all duration-300 ${
                        selectedBrandCategory === cat
                          ? 'bg-brand-ink text-white shadow-sm'
                          : 'bg-brand-ink/5 text-brand-ink/60 hover:bg-brand-ink/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Sub-collection / Series filters */}
            {selectedBrand && activeBrandSubCollections.length > 2 && (
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Series:</span>
                <div className="flex flex-wrap gap-2">
                  {activeBrandSubCollections.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedSubCollection(col)}
                      className={`text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 border transition-all duration-300 ${
                        selectedSubCollection === col
                          ? 'border-brand-gold bg-brand-gold text-white'
                          : 'border-brand-ink/10 text-brand-ink/60 hover:border-brand-ink hover:text-brand-ink'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Controls / Sorting */}
          <div className="flex items-center gap-6">
            {(selectedBrand || showDirectGrid) && (
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="w-3.5 h-3.5 opacity-40" />
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[10px] uppercase tracking-widest font-bold border-b border-brand-ink/20 pb-1 focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="az">Alphabetical (A-Z)</option>
                  <option value="stock">In Stock First</option>
                </select>
              </div>
            )}
            {!selectedBrand && !showDirectGrid && (
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                {availableBrands.length} {availableBrands.length === 1 ? 'Brand Partner' : 'Brand Partners'}
              </div>
            )}
          </div>
        </div>

        {/* --- VIEW 1: BRAND SHOWCASE (When browsing brand directories) --- */}
        {!selectedBrand && !showDirectGrid && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {availableBrands.map(({ brand, count, items, collections }) => (
                <motion.div
                  key={brand.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="group cursor-pointer flex flex-col bg-white border border-brand-ink/5 hover:border-brand-gold/40 hover:shadow-2xl transition-all duration-700 overflow-hidden"
                  onClick={() => {
                    setSelectedBrand(brand.id);
                    setSelectedSubCollection('All');
                    setSelectedBrandCategory('All');
                  }}
                >
                  {/* Hero Cover Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-ink/5">
                    <img
                      src={brand.heroImage || items[0]?.image_url}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-[0.23,1,0.32,1]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-brand-ink rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none backdrop-blur-sm shadow-sm font-bold">
                        {count} {count === 1 ? 'Design' : 'Designs'}
                      </Badge>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[8px] uppercase tracking-[0.3em] font-medium text-brand-gold block mb-1">
                        {brand.origin}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-display group-hover:italic transition-all duration-500">
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div>
                      <p className="text-xs font-serif opacity-70 leading-relaxed line-clamp-3 mb-6">
                        {brand.description}
                      </p>

                      {/* Preview Thumbnails */}
                      {items.length > 1 && (
                        <div className="pt-4 border-t border-brand-ink/5">
                          <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-3">
                            Preview Pieces in {selectedCategory === 'All' ? 'Catalog' : selectedCategory}
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {items.slice(0, 3).map((item, idx) => (
                              <div
                                key={item.id || idx}
                                className="aspect-square bg-brand-beige overflow-hidden relative group/thumb border border-brand-ink/5"
                              >
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                  className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Collections Tag list */}
                      {collections.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {collections.slice(0, 4).map((col) => (
                            <span
                              key={col}
                              className="text-[8px] uppercase tracking-wider px-2 py-0.5 bg-brand-beige text-brand-ink/60 font-medium"
                            >
                              {col}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 border-t border-brand-ink/5 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-ink group-hover:text-brand-gold transition-colors flex items-center gap-2">
                        Explore Brand Products
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                      <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">
                        {count} items
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {availableBrands.length === 0 && (
              <div className="py-20 col-span-full text-center opacity-40 font-serif text-xl">
                No partner brands found for "{selectedCategory}".
              </div>
            )}
          </div>
        )}

        {/* --- VIEW 2: PRODUCT GRID (When a Brand is Drilled Down OR Direct Collection) --- */}
        {(selectedBrand || showDirectGrid) && (
          <div>
            {/* Status bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-ink/5">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50">
                Showing {Math.min(visibleCount, activeBrandItems.length)} of {activeBrandItems.length} curated pieces
              </span>
              {activeBrandItems.length > 0 && (
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand-gold">
                  Commercial & Contract Grade
                </span>
              )}
            </div>

            <div className="editorial-grid">
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div
                      className="group cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsInquiryOpen(false);
                        setInquirySubmitted(false);
                      }}
                    >
                      <div className="image-container mb-8 aspect-[4/5] relative overflow-hidden bg-white shadow-sm border border-brand-ink/5">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {!product.in_stock && (
                          <div className="absolute top-6 left-6">
                            <Badge className="bg-white/95 text-amber-700 rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none backdrop-blur-sm shadow-sm font-semibold">
                              Waitlist
                            </Badge>
                          </div>
                        )}
                        {product.is_new && (
                          <div className="absolute top-6 right-6">
                            <Badge className="bg-brand-gold text-white rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none shadow-sm font-semibold">
                              New
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/5 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.23,1,0.32,1]">
                          <Button className="w-full bg-white text-brand-ink hover:bg-brand-gold hover:text-white rounded-none h-14 text-[10px] uppercase tracking-widest font-bold shadow-xl">
                            Quick View / Inquire
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40">
                              {getProductBrand(product)}
                            </span>
                            {product.collection && (
                              <>
                                <span className="text-[9px] opacity-20">•</span>
                                <span className="text-[9px] uppercase tracking-[0.15em] font-medium text-brand-gold">
                                  {product.collection}
                                </span>
                              </>
                            )}
                          </div>
                          <h4 className="text-xl font-display group-hover:italic transition-all duration-500">
                            {product.name}
                          </h4>
                          {product.material && (
                            <p className="text-[11px] font-serif opacity-50 mt-1 line-clamp-1">
                              {product.material}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {activeBrandItems.length === 0 && (
                <div className="py-20 col-span-full text-center opacity-40 font-serif text-xl">
                  No pieces found matching your criteria.
                </div>
              )}
            </div>

            {/* Load More Pagination */}
            {visibleCount < activeBrandItems.length && (
              <div className="mt-20 flex flex-col items-center justify-center gap-4">
                <Button
                  onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
                  className="rounded-none bg-brand-ink text-white px-12 py-7 text-[10px] uppercase tracking-[0.25em] font-bold hover:bg-brand-gold transition-all duration-500 shadow-lg"
                >
                  Load More Pieces ({activeBrandItems.length - visibleCount} remaining)
                </Button>
                <button
                  onClick={() => setVisibleCount(activeBrandItems.length)}
                  className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity"
                >
                  View Entire {selectedBrand || collectionName} Catalog ({activeBrandItems.length})
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* --- PRODUCT DETAIL & INQUIRY MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10"
          >
            <div
              className="absolute inset-0 bg-brand-ink/90 backdrop-blur-md"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-brand-beige w-full max-w-7xl h-full md:h-[90vh] relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 z-30 group flex items-center gap-2"
                onClick={() => setSelectedProduct(null)}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Close
                </span>
                <div className="w-10 h-10 bg-brand-ink text-white rounded-full flex items-center justify-center hover:bg-brand-gold transition-colors">
                  <X className="w-4 h-4" />
                </div>
              </button>

              {/* Product Visual Showcase */}
              <div className="md:w-[55%] h-[40vh] md:h-full overflow-hidden bg-white relative flex items-center justify-center p-8">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2 }}
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6">
                  <Badge className="bg-brand-ink text-white rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none font-bold">
                    {getProductBrand(selectedProduct)}
                  </Badge>
                </div>
              </div>

              {/* Product Content / Inquiry Switcher */}
              <div className="md:w-[45%] p-8 md:p-14 flex flex-col justify-between overflow-y-auto bg-white">
                {!isInquiryOpen ? (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold block">
                          {getProductBrand(selectedProduct)}
                        </span>
                        {selectedProduct.collection && (
                          <>
                            <span className="text-[10px] opacity-30">•</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50">
                              {selectedProduct.collection}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">
                        {selectedProduct.name}
                      </h2>

                      <p className="text-sm font-serif opacity-70 leading-relaxed mb-8">
                        {selectedProduct.description}
                      </p>

                      <div className="grid grid-cols-2 gap-6 pt-6 border-t border-black/5 mb-8">
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1">
                            Category
                          </span>
                          <span className="text-sm font-medium">{selectedProduct.category}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1">
                            Primary Material
                          </span>
                          <span className="text-sm font-medium">
                            {selectedProduct.material || 'Architectural Specification'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1">
                            Availability
                          </span>
                          <span
                            className={`text-sm font-medium ${
                              selectedProduct.in_stock ? 'text-green-700' : 'text-amber-700'
                            }`}
                          >
                            {selectedProduct.in_stock ? 'Commercial Stock Ready' : 'Custom Production / Waitlist'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-40 block mb-1">
                            Guild Division
                          </span>
                          <span className="text-sm font-medium">{getProductBrand(selectedProduct)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-black/5">
                      <Button
                        onClick={() => setIsInquiryOpen(true)}
                        className="w-full rounded-none bg-brand-ink text-white h-16 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
                      >
                        <Send className="w-4 h-4" />
                        Inquire For Project / Trade Pricing
                      </Button>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() => window.print()}
                          className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Print Spec Sheet
                        </button>
                        <button
                          onClick={() => setSelectedProduct(null)}
                          className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2 group"
                        >
                          Return to Explorer
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="inquiry"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold">
                          Project Quotation Request
                        </span>
                        <button
                          onClick={() => setIsInquiryOpen(false)}
                          className="text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100"
                        >
                          Back to Details
                        </button>
                      </div>

                      <h3 className="text-2xl font-display mb-1">{selectedProduct.name}</h3>
                      <p className="text-xs font-serif opacity-50 mb-6">
                        Division: {getProductBrand(selectedProduct)} • Series: {selectedProduct.collection || 'Custom'}
                      </p>

                      {!inquirySubmitted ? (
                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1">
                              Contact Name *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Giorgi Guramishvili"
                              value={inquiryForm.name}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                              className="w-full bg-brand-beige/50 border border-brand-ink/10 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1">
                                Professional Email *
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="architect@firm.com"
                                value={inquiryForm.email}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                                className="w-full bg-brand-beige/50 border border-brand-ink/10 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1">
                                Est. Quantity
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={inquiryForm.quantity}
                                onChange={(e) => setInquiryForm({ ...inquiryForm, quantity: e.target.value })}
                                className="w-full bg-brand-beige/50 border border-brand-ink/10 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1">
                              Company / Hotel / Project Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Radisson Blu Resort / Luxury Residences"
                              value={inquiryForm.company}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                              className="w-full bg-brand-beige/50 border border-brand-ink/10 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold transition-colors"
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-bold opacity-40 mb-1">
                              Custom Notes & Finishes
                            </label>
                            <textarea
                              rows={3}
                              placeholder="Specific dimensions, finish requirements, or site delivery location..."
                              value={inquiryForm.notes}
                              onChange={(e) => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                              className="w-full bg-brand-beige/50 border border-brand-ink/10 px-4 py-2.5 text-xs focus:outline-none focus:border-brand-gold transition-colors resize-none"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full rounded-none bg-brand-ink text-white h-14 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500 shadow-xl mt-4"
                          >
                            Submit Specification Inquiry
                          </Button>
                        </form>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                        >
                          <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <h4 className="text-2xl font-display">Inquiry Received</h4>
                          <p className="text-xs font-serif opacity-70 max-w-xs leading-relaxed">
                            Thank you, {inquiryForm.name || 'valued partner'}. Our hospitality & contract specialist will review your specifications and email you a tailored trade quote and CAD sheets within 24 hours.
                          </p>
                          <Button
                            onClick={() => {
                              setInquirySubmitted(false);
                              setIsInquiryOpen(false);
                            }}
                            className="rounded-none bg-brand-ink text-white text-[9px] uppercase tracking-widest px-8 py-4 mt-6"
                          >
                            Close Inquiry
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
