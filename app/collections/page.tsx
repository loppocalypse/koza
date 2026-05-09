"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { collections } from '@/src/lib/data';
import Link from 'next/link';

export default function CollectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCollections = collections.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-grow pt-48 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-24 md:mb-32 max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              className="text-[10px] uppercase tracking-[0.5em] font-medium text-brand-gold mb-8 block"
            >
              Curated Series
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
              className="text-5xl md:text-8xl font-display leading-[0.9] tracking-tighter"
            >
              The Master <br /> <span className="italic font-normal">Collections</span>
            </motion.h1>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="w-24 h-px bg-brand-ink/20 mt-12 origin-left"
            />
          </div>

          {/* Editorial Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12">
            {filteredCollections.map((col, i) => (
              <motion.div
                key={col.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className="group cursor-pointer break-inside-avoid relative"
              >
                <Link href={`/collections/${col.name.toLowerCase().replace(/\s+/g, '-')}`} className="block">
                  <div className="relative overflow-hidden mb-6">
                    <div className="bg-brand-ink/5 w-full relative">
                      <img 
                        src={col.image} 
                        alt={col.name} 
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.23,1,0.32,1]" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors duration-700" />
                    </div>
                  </div>
                  <div className="flex justify-between items-end border-b border-brand-ink/10 pb-4">
                    <div>
                      <h4 className="text-3xl lg:text-4xl font-display group-hover:italic transition-all duration-500">{col.name}</h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mt-3">
                        {String(i + 1).padStart(2, '0')} — Signature Series
                      </p>
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-brand-gold pb-1">
                      Explore
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="py-20 text-center opacity-40 font-serif text-xl">
              No collections found matching your search.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
