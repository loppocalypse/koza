"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductExplorer } from '@/components/ProductExplorer';
import { useLanguage } from '@/src/lib/i18n';

export default function NewArrivalsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();
  const { t, language } = useLanguage();

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
            src="/new_arrivals_hero.jpg"
            alt="New Releases Showcase"
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
          {/* Subtle ambient overlay to ensure perfect contrast for both navbar on top and headline in center */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-black/20 to-black/50" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-semibold mb-6 block text-brand-gold drop-shadow-sm">
              {t.justReleased}
            </span>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              {language === 'ka' ? (
                <>
                  უახლესი <br /> <span className="italic font-normal">შედევრები</span>
                </>
              ) : (
                <>
                  The <span className="italic font-normal">Latest</span> <br /> Masterpieces
                </>
              )}
            </h1>
            <p className="text-xs md:text-sm font-serif opacity-90 max-w-md mx-auto mt-6 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] tracking-wide">
              {t.newArrivalsTagline}
            </p>
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
