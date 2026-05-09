"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import {
  Search,
  Menu,
  X,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Filter,
  ArrowUpRight,
  Plus,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MOCK_PRODUCTS, type Product, supabase } from '@/src/lib/supabase';

import { collections } from '@/src/lib/data';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// --- Components ---

import { SectionHeading, RevealText } from '@/components/SectionHeading';
import { ProductExplorer } from '@/components/ProductExplorer';
import Link from 'next/link';

// --- Components ---

// --- Main App ---

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCollection, setActiveCollection] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCollection((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeCollection === collections.length) {
      const timeoutId = setTimeout(() => {
        setIsResetting(true);
        setActiveCollection(0);
        setTimeout(() => setIsResetting(false), 50);
      }, 1200); // Wait for transition duration (1.2s) before snapping back
      return () => clearTimeout(timeoutId);
    }
  }, [activeCollection]);



  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      {/* Custom Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-gold z-[100] origin-left"
        style={{ scaleX: scaleProgress }}
      />

      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-ink">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-8 block opacity-60">Est. 2026 — Tbilisi</span>
            <h2 className="text-7xl md:text-[10rem] font-display leading-[0.85] mb-12 tracking-tighter">
              Art of <br /> <span className="italic font-normal">Living</span>
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <p className="text-sm md:text-lg font-serif opacity-60 max-w-xs leading-relaxed">
                Curating the world's most intentional furniture for the modern sanctuary.
              </p>
              <div className="h-px w-12 bg-white/20 hidden md:block" />
              <Button className="bg-white text-brand-ink hover:bg-brand-gold hover:text-white rounded-none px-10 py-8 h-auto text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500 group">
                <a href="/collections">Shop Collection</a>
                <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40"
        >
          <span className="text-[8px] uppercase tracking-[0.4em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </header>

      {/* Featured Collections Reveal */}
      <section className="py-32 bg-brand-cream overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading
            subtitle="Curated Series"
            title="Explore our signature collections"
          />

          <div
            className="slider-container overflow-hidden w-full relative sm:-mx-6 lg:-mx-12 sm:px-6 lg:px-12 pb-12 cursor-grab active:cursor-grabbing"
            style={{
              "--card-w": "85vw",
              "--card-gap": "2rem",
            } as React.CSSProperties}
          >
            <style>{`
              @media (min-width: 1024px) {
                .slider-container {
                  --card-w: 30vw !important;
                  --card-gap: 3rem !important;
                }
              }
            `}</style>

            <motion.div
              className="flex w-max"
              style={{ gap: "var(--card-gap)" }}
              animate={{ x: `calc(-${activeCollection} * (var(--card-w) + var(--card-gap)))` }}
              transition={{ duration: isResetting ? 0 : 1.2, ease: isResetting ? "linear" : [0.16, 1, 0.3, 1] }}
            >
              {[...collections, ...collections].map((col, i) => (
                <div
                  key={`${col.name}-${i}`}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: "var(--card-w)" }}
                >
                  <div className="image-container mb-8 aspect-[3/4]">
                    <img src={col.image} alt={col.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/20 transition-colors duration-700" />
                    <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="text-white text-xs uppercase tracking-widest font-bold">View Series</span>
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <Link href={"./collections"}><ArrowRight className="w-4 h-4 text-brand-ink" /></Link>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-2xl font-display group-hover:italic transition-all">{col.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mt-2">
                    {String((i % collections.length) + 1).padStart(2, '0')} — Collection
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Explorer */}
      <ProductExplorer searchQuery={searchQuery} />

      {/* Philosophy Section - Parallax Style */}
      <section className="relative py-64 overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop"
            alt="Craftsmanship"
            className="w-full h-full object-cover opacity-20 grayscale"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-12 block text-brand-gold">Our Ethos</span>
            <h2 className="text-5xl md:text-8xl font-display leading-tight mb-16 italic">
              "Design is not just what it looks like. Design is how it <span className="not-italic">feels</span>."
            </h2>
            <div className="w-px h-24 bg-brand-ink/20 mx-auto mb-16" />
            <p className="text-xl md:text-2xl font-serif max-w-2xl mx-auto leading-relaxed opacity-70">
              We create pieces that bridge the gap between art and utility, ensuring every curve and joint serves a purpose.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
