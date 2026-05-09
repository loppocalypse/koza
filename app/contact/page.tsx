"use client";

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Cinematic Header */}
      <header className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-brand-ink">
        <motion.div
           style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
           className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop"
            alt="Flagship Architecture"
            className="w-full h-full object-cover opacity-50 grayscale-[0.3]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-medium mb-6 block text-brand-gold">Reach Out</span>
            <h1 className="text-6xl md:text-8xl font-display leading-[0.9] tracking-tighter">
              A Dialogue in <br /> <span className="italic font-normal">Design</span>
            </h1>
          </motion.div>
        </div>
        
        {/* Gradient overlay to smoothly blend into the beige page below */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-beige to-transparent z-10" />
      </header>

      {/* Contact Section */}
      <main className="container mx-auto px-6 md:px-12 py-32 relative z-20 -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-16"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.5em] font-medium text-brand-gold mb-6 block">Flagship Boutique</span>
              <h2 className="text-4xl md:text-5xl font-display leading-tight mb-8">
                Visit our gallery<br/><span className="italic">in Tbilisi.</span>
              </h2>
              <p className="text-lg font-serif opacity-70 leading-relaxed max-w-sm">
                Our space is designed to be experienced. Feel the textures, observe the light, and discover the intentionality behind every piece.
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors duration-500">
                  <MapPin className="w-4 h-4 text-brand-ink group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Location</h6>
                  <p className="text-sm font-serif opacity-70">Giorgi Guramishvili Street No:2,<br/>Tbilisi, Georgia</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors duration-500">
                  <Phone className="w-4 h-4 text-brand-ink group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">Telephone</h6>
                  <p className="text-sm font-serif opacity-70">+995 555 12 34 56<br/>Mon - Sat, 10am - 7pm</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 bg-white/50 backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center shrink-0 group-hover:bg-brand-gold transition-colors duration-500">
                  <Mail className="w-4 h-4 text-brand-ink group-hover:text-white transition-colors duration-500" />
                </div>
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2">General Inquiries</h6>
                  <p className="text-sm font-serif opacity-70 hover:opacity-100 transition-opacity">concierge@kusinox.ge</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="bg-white p-12 md:p-16 shadow-2xl relative"
          >
            {/* Decorative Corner Asset */}
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-gold opacity-50 m-6" />

            <h3 className="text-3xl font-display mb-12">Send a Message</h3>
            
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <Input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-0 border-b border-black/10 rounded-none px-0 h-14 focus-visible:ring-0 focus-visible:border-brand-gold placeholder:text-black/30 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] transition-colors"
                />
              </div>

              <div className="relative group">
                <Input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-0 border-b border-black/10 rounded-none px-0 h-14 focus-visible:ring-0 focus-visible:border-brand-gold placeholder:text-black/30 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] transition-colors"
                />
              </div>

              <div className="relative group">
                <textarea 
                  placeholder="How can we assist you?" 
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-black/10 rounded-none px-0 py-4 focus:outline-none focus:border-brand-gold placeholder:text-black/30 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-[0.2em] transition-colors resize-none text-sm"
                />
              </div>

              <Button className="w-full bg-brand-ink text-white hover:bg-brand-gold rounded-none h-16 mt-4 group">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Submit Inquiry</span>
                <ArrowRight className="ml-4 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </form>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
