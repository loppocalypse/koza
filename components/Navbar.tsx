"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ShoppingBag, Instagram, Twitter, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

export function Navbar({ searchQuery = '', setSearchQuery }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-10'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Sheet>
            <SheetTrigger render={<button className="group flex items-center gap-3 focus:outline-none" />}>
              <div className="flex flex-col gap-1.5">
                <span className={`h-px bg-brand-ink transition-all duration-300 ${isScrolled ? 'w-5' : 'w-8'} group-hover:w-8`} />
                <span className={`h-px bg-brand-ink transition-all duration-300 ${isScrolled ? 'w-3' : 'w-5'} group-hover:w-8`} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:block">Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-full md:w-[500px] bg-brand-beige border-none p-12 flex flex-col">
              <SheetHeader className="mb-20">
                <SheetTitle className="text-4xl font-display italic text-left">KOZA</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-8">
                {['Shop All', 'New Arrivals', 'Collections', 'Journal', 'Contact'].map((item, i) => (
                  <Link
                    key={item}
                    href={item === 'Collections' ? '/collections' : item === 'Shop All' ? '/shop' : item === 'New Arrivals' ? '/new-arrivals' : item === 'Contact' ? '/contact' : item === 'Journal' ? '/journal' : '#'}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-4xl md:text-5xl font-display hover:italic hover:translate-x-4 transition-all duration-500 flex items-center justify-between group"
                    >
                      {item}
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-12 border-t border-black/5 grid grid-cols-2 gap-8">
                <div>
                  <h6 className="text-[10px] uppercase tracking-widest font-bold mb-4">Follow Us</h6>
                  <div className="flex gap-4 opacity-60">
                    <Instagram className="w-4 h-4 cursor-pointer hover:text-brand-gold transition-colors" />
                    <Twitter className="w-4 h-4 cursor-pointer hover:text-brand-gold transition-colors" />
                  </div>
                </div>
                <div>
                  <h6 className="text-[10px] uppercase tracking-widest font-bold mb-4">Visit Us</h6>
                  <p className="text-xs opacity-60 leading-relaxed">Giorgi Guramishvili Street No:2,<br />Tbilisi, GE</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:flex items-center gap-8">
            {['Carpets', 'Towels', 'Umbrellas', 'Lighting'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase()}`} 
                className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
          <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tighter transition-all duration-500 group-hover:tracking-[0.1em]">KOZA</h1>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center relative group">
            <Search className="w-4 h-4 absolute left-0 opacity-40 group-focus-within:text-brand-gold transition-colors" />
            <Input
              placeholder="Search pieces..."
              className="pl-8 w-32 focus:w-48 bg-transparent border-none focus-visible:ring-0 placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest transition-all duration-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery?.(e.target.value)}
            />
          </div>
          <button className="relative group">
            <ShoppingBag className="w-5 h-5 group-hover:text-brand-gold transition-colors" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-ink text-white text-[8px] flex items-center justify-center rounded-full">+9</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
