"use client";

import React, { useState, use } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductExplorer } from '@/components/ProductExplorer';
import { collections } from '@/src/lib/data';
import { notFound } from 'next/navigation';

export default function CollectionCatalogPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();

  // Find the collection
  const collection = collections.find(c => c.name.toLowerCase().replace(/\s+/g, '-') === params.slug);

  if (!collection) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Cinematic Header */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-brand-ink">
        <motion.div
           style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
           className="absolute inset-0 z-0"
        >
          <img
            src={collection.image}
            alt={collection.name}
            className="w-full h-full object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-6 block text-brand-gold">Collection</span>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter">
              {collection.name}
            </h1>
          </motion.div>
        </div>
        
        {/* Gradient overlay to smoothly blend into the beige page below */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-beige to-transparent z-10" />
      </header>

      {/* Seamless transition into the product explorer, pulling it up slightly so it layers over the gradient */}
      <div className="relative z-20 -mt-16">
        <ProductExplorer searchQuery={searchQuery} collectionName={collection.name} />
      </div>

      <Footer />
    </div>
  );
}
