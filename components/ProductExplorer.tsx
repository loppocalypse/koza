"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, ArrowRight, ArrowLeft, X, Sparkles, Layers, ChevronRight } from 'lucide-react';
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
    description: 'High-density contract broadloom, wool-blend protocol floor coverings, and architectural carpet tile systems.',
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
  if (img.includes('/collection/Ormel/') || name.toLowerCase().includes('ormel')) return 'Ormel';
  if (img.includes('/collection/Siesta/') || name.toLowerCase().startsWith('siesta')) return 'Siesta';
  if (img.includes('/collection/Detay/')) return 'Detay';
  if (
    img.includes('/collection/Umbrella/') ||
    img.toLowerCase().includes('semsiye') ||
    name.toLowerCase().includes('titanic') ||
    name.toLowerCase().includes('semsiye')
  ) {
    return 'Şemsiye Evi';
  }
  if (img.toLowerCase().includes('samur') || name.toLowerCase().includes('samur')) return 'Samur';
  return 'Koza Studio';
}

interface ProductExplorerProps {
  searchQuery?: string;
  newArrivalsOnly?: boolean;
  collectionName?: string;
  category?: string;
}

export function ProductExplorer({
  searchQuery = '',
  newArrivalsOnly = false,
  collectionName,
  category: initialCategory
}: ProductExplorerProps) {
  let baseProducts = newArrivalsOnly ? MOCK_PRODUCTS.filter(p => p.is_new) : MOCK_PRODUCTS;
  if (collectionName) {
    baseProducts = baseProducts.filter(p => p.collection === collectionName);
  }
  if (initialCategory) {
    baseProducts = baseProducts.filter(p => p.category === initialCategory);
  }

  const [products] = useState<Product[]>(baseProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedSubCollection, setSelectedSubCollection] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'az' | 'stock'>('featured');

  const categories = ['All', 'Hospitality', 'Seating', 'Tables', 'Lighting', 'Rugs', 'Towels', 'Umbrellas', 'Decor'];

  // Handle category switch -> reset brand & sub-collection drilldown
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedBrand(null);
    setSelectedSubCollection('All');
  };

  // Group and filter products
  const categoryFilteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getProductBrand(product).toLowerCase().includes(searchQuery.toLowerCase());
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

    if (sortBy === 'az') {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'stock') {
      items = [...items].sort((a, b) => (b.in_stock ? 1 : 0) - (a.in_stock ? 1 : 0));
    }

    return items;
  }, [categoryFilteredProducts, selectedBrand, selectedSubCollection, sortBy, collectionName, baseProducts]);

  const activeBrandInfo = selectedBrand ? BRANDS[selectedBrand] : null;

  // Sub-collections for active brand
  const activeBrandSubCollections = useMemo(() => {
    if (!selectedBrand) return [];
    const brandItems = categoryFilteredProducts.filter(p => getProductBrand(p) === selectedBrand);
    const cols = Array.from(new Set(brandItems.map(p => p.collection).filter(Boolean))) as string[];
    return ['All', ...cols];
  }, [categoryFilteredProducts, selectedBrand]);

  // If directly scoped by collectionName, show direct items grid
  const showDirectGrid = Boolean(collectionName);

  return (
    <>
      <section className="container mx-auto px-6 md:px-12 py-32" id="product-explorer">
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-12">
          <div className="max-w-2xl">
            <SectionHeading
              subtitle={
                newArrivalsOnly
                  ? "New Arrivals"
                  : selectedBrand
                  ? `${activeBrandInfo?.name || selectedBrand} • ${selectedCategory}`
                  : "Brand Directory"
              }
              title={
                newArrivalsOnly
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
                className="mt-6"
              >
                <button
                  onClick={() => {
                    setSelectedBrand(null);
                    setSelectedSubCollection('All');
                  }}
                  className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold hover:text-brand-ink transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  Back to Available Brands in {selectedCategory}
                </button>
              </motion.div>
            )}

            {/* Category Tabs */}
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

            {/* Brand Sub-collection filters */}
            {selectedBrand && activeBrandSubCollections.length > 2 && (
              <div className="flex flex-wrap gap-6 mt-8">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 py-1">Series:</span>
                {activeBrandSubCollections.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedSubCollection(col)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 border transition-all duration-300 ${
                      selectedSubCollection === col
                        ? 'border-brand-ink bg-brand-ink text-white'
                        : 'border-brand-ink/10 text-brand-ink/50 hover:border-brand-ink hover:text-brand-ink'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Controls / Sorting */}
          <div className="flex items-center gap-4">
            {selectedBrand && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-40">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[10px] uppercase tracking-widest font-bold border-b border-brand-ink/20 pb-1 focus:outline-none focus:border-brand-gold cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="az">Name A-Z</option>
                  <option value="stock">In Stock First</option>
                </select>
              </div>
            )}
            {!selectedBrand && (
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
                {availableBrands.length} {availableBrands.length === 1 ? 'Brand Available' : 'Brands Available'}
              </div>
            )}
          </div>
        </div>

        {/* --- VIEW 1: BRAND SHOWCASE (When no specific brand is drilled down) --- */}
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
                  className="group cursor-pointer flex flex-col bg-white border border-brand-ink/5 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-700 overflow-hidden"
                  onClick={() => {
                    setSelectedBrand(brand.id);
                    setSelectedSubCollection('All');
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
                      <Badge className="bg-white/90 text-brand-ink rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none backdrop-blur-sm shadow-sm">
                        {count} {count === 1 ? 'Piece' : 'Pieces'}
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
            <div className="editorial-grid">
              <AnimatePresence mode="popLayout">
                {activeBrandItems.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div
                      className="group cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="image-container mb-8 aspect-[4/5] relative overflow-hidden bg-white">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        {!product.in_stock && (
                          <div className="absolute top-6 left-6">
                            <Badge className="bg-white/90 text-brand-ink rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none backdrop-blur-sm shadow-sm">
                              Waitlist
                            </Badge>
                          </div>
                        )}
                        {product.is_new && (
                          <div className="absolute top-6 right-6">
                            <Badge className="bg-brand-gold text-white rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none shadow-sm">
                              New
                            </Badge>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/5 transition-colors duration-700" />
                        <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.23,1,0.32,1]">
                          <Button className="w-full bg-white text-brand-ink hover:bg-brand-gold hover:text-white rounded-none h-14 text-[10px] uppercase tracking-widest font-bold shadow-xl">
                            Quick View
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
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12"
          >
            <div className="absolute inset-0 bg-brand-ink/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="bg-brand-beige w-full max-w-7xl h-full md:h-[90vh] relative z-10 shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button
                className="absolute top-8 right-8 z-20 group flex items-center gap-2"
                onClick={() => setSelectedProduct(null)}
              >
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
                <div className="w-10 h-10 bg-brand-ink text-white rounded-full flex items-center justify-center">
                  <X className="w-4 h-4" />
                </div>
              </button>

              <div className="md:w-[60%] h-[50vh] md:h-full overflow-hidden bg-white">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  src={selectedProduct.image_url}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-[40%] p-8 md:p-20 flex flex-col justify-center overflow-y-auto bg-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-6">
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
                  <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">{selectedProduct.name}</h2>

                  <div className="space-y-8 mb-16">
                    <p className="text-base font-serif opacity-70 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-black/5">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 block mb-2">Category</span>
                        <span className="text-sm font-medium">{selectedProduct.category}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 block mb-2">Material</span>
                        <span className="text-sm font-medium">{selectedProduct.material || 'Premium Finish'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 block mb-2">Availability</span>
                        <span className={`text-sm font-medium ${selectedProduct.in_stock ? 'text-green-600' : 'text-amber-600'}`}>
                          {selectedProduct.in_stock ? 'Ready to Ship' : 'Waitlist Only'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <Button
                      className="w-full rounded-none bg-brand-ink text-white h-16 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-brand-gold transition-all duration-500"
                      disabled={!selectedProduct.in_stock}
                    >
                      {selectedProduct.in_stock ? 'Inquire / Reserve' : 'Join the Waitlist'}
                    </Button>
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2 group"
                      >
                        Back to Explorer
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
