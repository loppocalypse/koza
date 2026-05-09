"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductExplorer } from '@/components/ProductExplorer';

export default function NewArrivalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();

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
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd0b?q=80&w=2000&auto=format&fit=crop"
            alt="New Releases"
            className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-6 block text-brand-gold">Just Released</span>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter">
              The <span className="italic font-normal">Latest</span> <br /> Masterpieces
            </h1>
          </motion.div>
        </div>
        
        {/* Gradient overlay to smoothly blend into the beige page below */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-beige to-transparent z-10" />
      </header>

      {/* Seamless transition into the product explorer, pulling it up slightly so it layers over the gradient */}
      <div className="relative z-20 -mt-16">
        <ProductExplorer searchQuery={searchQuery} newArrivalsOnly={true} />
      </div>

      <Footer />
    </div>
  );
}
