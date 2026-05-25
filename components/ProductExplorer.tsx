"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, ArrowRight, X } from 'lucide-react';
import { MOCK_PRODUCTS, type Product } from '@/src/lib/supabase';
import { SectionHeading } from '@/components/SectionHeading';

interface ProductExplorerProps {
  searchQuery?: string;
  newArrivalsOnly?: boolean;
  collectionName?: string;
  category?: string;
}

export function ProductExplorer({ searchQuery = '', newArrivalsOnly = false, collectionName, category }: ProductExplorerProps) {
  let baseProducts = newArrivalsOnly ? MOCK_PRODUCTS.filter(p => p.is_new) : MOCK_PRODUCTS;
  if (collectionName) {
    baseProducts = baseProducts.filter(p => p.collection === collectionName);
  }
  if (category) {
    baseProducts = baseProducts.filter(p => p.category === category);
  }
  const [products] = useState<Product[]>(baseProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['All', 'Seating', 'Tables', 'Lighting', 'Rugs', 'Decor'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section className="container mx-auto px-6 md:px-12 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div className="max-w-xl">
            <SectionHeading
              subtitle={newArrivalsOnly ? "New Arrivals" : "The Shop"}
              title={newArrivalsOnly ? "Discover our newest additions" : "Find your next heirloom piece"}
            />
            {!category && (
              <div className="flex flex-wrap gap-8 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold pb-2 transition-all duration-500 relative group ${selectedCategory === cat ? 'text-brand-ink' : 'text-brand-ink/30 hover:text-brand-ink'}`}
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
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-[10px] uppercase tracking-widest font-bold group">
              <Filter className="w-3 h-3 mr-2 group-hover:text-brand-gold transition-colors" />
              Sort By
            </Button>
          </div>
        </div>

        <div className="editorial-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
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
                  <div className="image-container mb-8 aspect-[4/5] relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {!product.in_stock && (
                      <div className="absolute top-6 left-6">
                        <Badge className="bg-white/90 text-brand-ink rounded-none text-[8px] uppercase tracking-widest px-3 py-1.5 border-none backdrop-blur-sm">Waitlist</Badge>
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
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 mb-2 block">{product.category}</span>
                      <h4 className="text-xl font-display group-hover:italic transition-all duration-500">{product.name}</h4>
                    </div>
                    <span className="text-sm font-medium opacity-60"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <div className="py-20 col-span-full text-center opacity-40 font-serif text-xl">
              No pieces found matching your criteria.
            </div>
          )}
        </div>
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

              <div className="md:w-[60%] h-[50vh] md:h-full overflow-hidden">
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
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-gold mb-6 block">
                    {selectedProduct.collection}
                  </span>
                  <h2 className="text-5xl md:text-6xl font-display mb-8">{selectedProduct.name}</h2>
                  <p className="text-3xl font-serif mb-10 text-brand-ink/60"></p>

                  <div className="space-y-8 mb-16">
                    <p className="text-lg font-serif opacity-70 leading-relaxed">
                      {selectedProduct.description}
                    </p>

                    <div className="grid grid-cols-2 gap-12 pt-8 border-t border-black/5">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 block mb-3">Material</span>
                        <span className="text-sm font-medium">{selectedProduct.material}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30 block mb-3">Availability</span>
                        <span className={`text-sm font-medium ${selectedProduct.in_stock ? 'text-green-600' : 'text-red-500'}`}>
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
                      {selectedProduct.in_stock ? 'Add to Collection' : 'Join the Waitlist'}
                    </Button>
                    <div className="flex justify-center mt-8">
                      <button className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-30 hover:opacity-100 transition-opacity flex items-center gap-2 group">
                        Full Specifications
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
