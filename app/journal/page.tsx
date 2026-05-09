"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { MOCK_ARTICLES } from '@/src/lib/journal';

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const feature = MOCK_ARTICLES[0];
  const gallery = MOCK_ARTICLES.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Feature Article */}
      <section className="relative min-h-[90vh] flex items-end pt-32 pb-16 overflow-hidden bg-brand-ink group cursor-pointer">
        <motion.div
           className="absolute inset-0 z-0"
           initial={{ scale: 1.1 }}
           animate={{ scale: 1 }}
           transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <img
            src={feature.image_url}
            alt={feature.title}
            className="w-full h-full object-cover opacity-60 grayscale-[0.2] group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 ease-[0.23,1,0.32,1]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-6 mb-8 text-[10px] uppercase tracking-[0.4em] font-medium text-brand-gold">
              <span>{feature.category}</span>
              <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
              <span>{feature.readTime}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-display leading-[1.0] tracking-tighter mb-8 group-hover:italic transition-all duration-700">
              {feature.title}
            </h1>
            <p className="text-lg md:text-xl font-serif opacity-80 max-w-2xl leading-relaxed">
              {feature.excerpt}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="shrink-0"
          >
            <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-white/20 hover:border-brand-gold transition-colors duration-500">
              Read Article
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Asymmetrical Reading Grid */}
      <main className="container mx-auto px-6 md:px-12 py-32 z-20 bg-brand-beige">
        <div className="flex justify-between items-end border-b border-black/10 pb-8 mb-24">
          <h2 className="text-3xl font-display">Archived Journals</h2>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">Filter by category</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-32">
          {gallery.map((article, index) => {
            // Logic to create an interlocking asymmetrical layout
            let colSpan = "md:col-span-6";
            let aspect = "aspect-[4/3]";
            let marginTop = "mt-0";

            if (index === 0) {
              colSpan = "md:col-span-7";
              aspect = "aspect-[16/9]";
            } else if (index === 1) {
              colSpan = "md:col-span-5";
              aspect = "aspect-[3/4]";
              marginTop = "md:mt-32";
            } else if (index === 2) {
              colSpan = "md:col-span-5";
              aspect = "aspect-square";
            } else if (index === 3) {
              colSpan = "md:col-span-7";
              aspect = "aspect-[16/10]";
              marginTop = "md:-mt-24";
            }

            return (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                className={`${colSpan} ${marginTop} group cursor-pointer flex flex-col`}
              >
                <div className={`w-full ${aspect} overflow-hidden mb-8 relative`}>
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.23,1,0.32,1]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/10 transition-colors duration-700" />
                </div>
                
                <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium text-brand-gold mb-4">
                  <span>{article.category}</span>
                  <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                  <span className="text-brand-ink/40">{article.readTime}</span>
                </div>
                
                <h3 className="text-3xl lg:text-4xl font-display mb-6 group-hover:italic transition-all duration-500">
                  {article.title}
                </h3>
                
                <p className="text-base font-serif opacity-70 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </motion.article>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
