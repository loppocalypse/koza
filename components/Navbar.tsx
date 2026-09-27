"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Instagram, Twitter, ArrowUpRight, X, Trash2, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useFavorites } from '@/src/lib/favorites';
import Link from 'next/link';

interface NavbarProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
}

export function Navbar({ searchQuery = '', setSearchQuery }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites, removeFavorite, clearFavorites, count } = useFavorites();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-10'}`}>
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Main Menu Sheet */}
          <Sheet>
            <SheetTrigger render={<button className="group flex items-center gap-3 focus:outline-none" />}>
              <div className="flex flex-col gap-1.5">
                <span className={`h-px bg-brand-ink transition-all duration-300 ${isScrolled ? 'w-5' : 'w-8'} group-hover:w-8`} />
                <span className={`h-px bg-brand-ink transition-all duration-300 ${isScrolled ? 'w-3' : 'w-5'} group-hover:w-8`} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold hidden sm:block">Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-md md:max-w-[500px] md:w-[500px] bg-brand-beige border-none p-8 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
              <SheetHeader className="mb-12 md:mb-16 p-0 shrink-0">
                <div className="flex items-center gap-3">
                  <img
                    src="/favicon.ico"
                    alt="Koza Logo"
                    className="h-10 w-auto object-contain mix-blend-multiply"
                  />
                  <SheetTitle className="text-4xl font-display italic text-left">KOZA</SheetTitle>
                </div>
              </SheetHeader>
              <div className="flex flex-col gap-6 md:gap-8 shrink-0">
                {['Shop All', 'New Arrivals', 'Collections', 'Journal', 'Contact'].map((item, i) => (
                  <Link
                    key={item}
                    href={item === 'Collections' ? '/collections' : item === 'Shop All' ? '/shop' : item === 'New Arrivals' ? '/new-arrivals' : item === 'Contact' ? '/contact' : item === 'Journal' ? '/journal' : '#'}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-3xl sm:text-4xl font-display hover:italic hover:translate-x-4 transition-all duration-500 flex items-center justify-between group whitespace-nowrap"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-4" />
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="pt-8 mt-4 border-t border-black/5 shrink-0">
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30 block mb-4">
                  Curated Guild Divisions
                </span>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {[
                    { name: 'Hospitality', href: '/hospitality' },
                    { name: 'Seating', href: '/seating' },
                    { name: 'Tables', href: '/tables' },
                    { name: 'Umbrellas', href: '/umbrellas' },
                    { name: 'Carpets', href: '/carpets' },
                    { name: 'Towels', href: '/towels' },
                  ].map((div) => (
                    <Link
                      key={div.name}
                      href={div.href}
                      className="text-xs uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 hover:text-brand-gold transition-colors"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-8 md:mt-auto md:pt-12 border-t border-black/5 grid grid-cols-2 gap-8 shrink-0">
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
            {[
              { name: 'Hospitality', href: '/hospitality' },
              { name: 'Seating', href: '/seating' },
              { name: 'Tables', href: '/tables' },
              { name: 'Umbrellas', href: '/umbrellas' },
              { name: 'Carpets', href: '/carpets' },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-50 hover:opacity-100 hover:text-brand-gold transition-all"
              >
                {item.name}
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

          {/* Favorites List Drawer */}
          <Sheet>
            <SheetTrigger render={
              <button 
                className="relative group p-2 focus:outline-none cursor-pointer"
                title="View Favorites Shortlist"
                aria-label="View Favorites Shortlist"
              />
            }>
              <Heart className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${count > 0 ? 'text-brand-ink fill-brand-ink/10 group-hover:fill-red-500 group-hover:text-red-500' : 'text-brand-ink opacity-70 group-hover:opacity-100 group-hover:text-brand-gold'}`} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-brand-gold text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm">
                  {count}
                </span>
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md md:max-w-[480px] bg-brand-beige border-none p-6 md:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar">
              <div>
                <SheetHeader className="mb-8 p-0 shrink-0 border-b border-black/10 pb-6 text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-brand-gold block mb-1">
                        Architectural Shortlist
                      </span>
                      <SheetTitle className="text-3xl md:text-4xl font-display italic text-left">
                        Favorites
                      </SheetTitle>
                    </div>
                    {count > 0 && (
                      <button
                        onClick={() => clearFavorites()}
                        className="text-[9px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100 hover:text-red-600 transition-colors flex items-center gap-1.5"
                        title="Clear all favorites"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-serif opacity-60 mt-2">
                    {count === 0
                      ? 'No pieces shortlisted yet.'
                      : `${count} ${count === 1 ? 'piece' : 'pieces'} curated for project review and specifications.`}
                  </p>
                </SheetHeader>

                {/* Favorites Items List */}
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {favorites.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 bg-white border border-brand-ink/5 flex gap-4 items-center group relative shadow-xs"
                      >
                        <div className="w-20 h-20 bg-brand-beige relative overflow-hidden shrink-0 border border-brand-ink/5">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-6">
                          <span className="text-[8px] uppercase tracking-[0.2em] font-bold text-brand-gold block mb-0.5">
                            {product.brand || product.category}
                          </span>
                          <h4 className="text-base font-display truncate text-brand-ink group-hover:italic transition-all">
                            {product.name}
                          </h4>
                          {product.material && (
                            <p className="text-[11px] font-serif opacity-50 truncate mt-0.5">
                              {product.material}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="w-8 h-8 rounded-full bg-brand-beige hover:bg-red-50 text-brand-ink/50 hover:text-red-600 flex items-center justify-center transition-colors absolute top-3 right-3"
                          title="Remove piece"
                          aria-label={`Remove ${product.name} from favorites`}
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Empty State */}
                  {favorites.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-ink/5 flex items-center justify-center text-brand-ink/30 mb-6">
                        <Heart className="w-6 h-6" />
                      </div>
                      <h5 className="text-xl font-display mb-2">Your Shortlist is Empty</h5>
                      <p className="text-xs font-serif opacity-60 max-w-xs leading-relaxed mb-8">
                        Explore our commercial seating, contract carpets, bespoke tables, and Aegean textiles to curate your project.
                      </p>
                      <Link
                        href="/collections"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-brand-ink text-white text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-colors shadow-sm"
                      >
                        Explore Collections
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              {favorites.length > 0 && (
                <div className="pt-6 mt-8 border-t border-black/10 shrink-0 space-y-3">
                  <Link
                    href={`/contact?subject=${encodeURIComponent('Shortlist Specification Inquiry (' + favorites.map(f => f.name).join(', ') + ')')}`}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-brand-ink text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-brand-gold transition-all duration-300 shadow-md"
                  >
                    <span>Request Spec & Quote ({count})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="text-[10px] font-serif text-center opacity-40">
                    Includes CAD blocks, finish samples, and contract pricing.
                  </p>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
