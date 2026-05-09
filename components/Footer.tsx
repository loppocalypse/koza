"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="bg-brand-ink text-white pt-32 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-display mb-12 tracking-tighter">KUSINOX</h2>
            <p className="text-lg font-serif opacity-50 max-w-md leading-relaxed mb-12">
              Join our inner circle for exclusive previews of upcoming collections and editorial stories on modern living.
            </p>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Your email address"
                className="rounded-none border-white/10 bg-transparent h-14 focus-visible:ring-brand-gold placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest"
              />
              <Button className="rounded-none bg-white text-brand-ink hover:bg-brand-gold hover:text-white h-14 px-8 text-[10px] uppercase tracking-widest font-bold transition-all">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">Shop</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {['All Pieces', 'New Arrivals', 'The Nordic Series', 'Stone Essentials', 'Artisan Weaves'].map(item => (
                <li key={item}><a href="#" className="hover:opacity-100 hover:italic transition-all">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">Company</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {['Our Story', 'Journal', 'Sustainability', 'Careers', 'Contact'].map(item => (
                <li key={item}><a href="#" className="hover:opacity-100 hover:italic transition-all">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">Support</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {['Shipping', 'Returns', 'Care Guide', 'FAQ', 'Trade Program'].map(item => (
                <li key={item}><a href="#" className="hover:opacity-100 hover:italic transition-all">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold opacity-30">
            <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Pinterest</a>
            <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30">© 2026 Kusinox. Crafted with intention.</span>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold opacity-30">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
