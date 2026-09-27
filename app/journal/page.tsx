"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Play, MapPin, Building2 } from 'lucide-react';
import { MOCK_ARTICLES, JournalArticle } from '@/src/lib/journal';

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(MOCK_ARTICLES.map(a => a.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.location && article.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (article.client && article.client.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  const feature = filteredArticles[0] || MOCK_ARTICLES[0];
  const gallery = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Feature Article */}
      {feature && (
        <section className="relative min-h-[90vh] flex items-end pt-32 pb-16 overflow-hidden bg-brand-ink group cursor-pointer">
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          >
            {feature.video_url ? (
              <video
                src={feature.video_url}
                poster={feature.image_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-60 grayscale-[0.2] group-hover:opacity-75 group-hover:scale-105 transition-all duration-1000 ease-[0.23,1,0.32,1]"
              />
            ) : (
              <img
                src={feature.image_url}
                alt={feature.title}
                className="w-full h-full object-cover opacity-60 grayscale-[0.2] group-hover:opacity-75 group-hover:scale-105 transition-all duration-1000 ease-[0.23,1,0.32,1]"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>

          <div className="container mx-auto px-6 relative z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-[10px] uppercase tracking-[0.4em] font-medium text-brand-gold">
                <span>{feature.category}</span>
                <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                <span>{feature.readTime}</span>
                {feature.client && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                    <span className="flex items-center gap-1.5 text-white/90">
                      <Building2 className="w-3 h-3 text-brand-gold" />
                      {feature.client}
                    </span>
                  </>
                )}
                {feature.location && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                    <span className="flex items-center gap-1.5 text-white/70">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      {feature.location}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-display leading-[1.05] tracking-tighter mb-8 group-hover:italic transition-all duration-700">
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
                {feature.video_url ? 'Watch Walkthrough' : 'Read Case Study'}
                {feature.video_url ? (
                  <Play className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                )}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Asymmetrical Reading Grid */}
      <main className="container mx-auto px-6 md:px-12 py-24 md:py-32 z-20 bg-brand-beige">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 pb-8 mb-16 gap-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-brand-gold mb-2 block">
              Documented Real-World Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-display">Archived Journals & Installations</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-brand-ink text-white shadow-sm'
                    : 'bg-black/5 text-brand-ink/60 hover:bg-black/10 hover:text-brand-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-24 md:gap-y-32">
          <AnimatePresence mode="popLayout">
            {gallery.map((article, index) => {
              // Interlocking asymmetrical layout cadence
              const patternIdx = index % 4;
              let colSpan = "md:col-span-6";
              let aspect = "aspect-[4/3]";
              let marginTop = "mt-0";

              if (patternIdx === 0) {
                colSpan = "md:col-span-7";
                aspect = "aspect-[16/10]";
              } else if (patternIdx === 1) {
                colSpan = "md:col-span-5";
                aspect = "aspect-[4/5]";
                marginTop = "md:mt-24";
              } else if (patternIdx === 2) {
                colSpan = "md:col-span-5";
                aspect = "aspect-square";
              } else if (patternIdx === 3) {
                colSpan = "md:col-span-7";
                aspect = "aspect-[16/10]";
                marginTop = "md:-mt-16";
              }

              return (
                <motion.article 
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                  className={`${colSpan} ${marginTop} group cursor-pointer flex flex-col`}
                >
                  <div className={`w-full ${aspect} overflow-hidden mb-8 relative rounded-sm bg-neutral-900`}>
                    {article.video_url ? (
                      <video 
                        src={article.video_url} 
                        poster={article.image_url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.23,1,0.32,1]"
                      />
                    ) : (
                      <img 
                        src={article.image_url} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.23,1,0.32,1]"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/10 transition-colors duration-700 pointer-events-none" />

                    {article.video_url && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 font-sans font-medium pointer-events-none">
                        <Play className="w-2.5 h-2.5 fill-white" />
                        Video Walkthrough
                      </div>
                    )}

                    {article.client && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-brand-ink text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm flex items-center gap-1.5 font-sans font-semibold pointer-events-none shadow-sm">
                        <Building2 className="w-2.5 h-2.5 text-brand-gold" />
                        {article.client}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium text-brand-gold mb-4">
                    <span>{article.category}</span>
                    <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                    <span className="text-brand-ink/50">{article.readTime}</span>
                    {article.location && (
                      <>
                        <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                        <span className="text-brand-ink/60 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {article.location}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-display mb-4 group-hover:italic transition-all duration-500 leading-snug">
                    {article.title}
                  </h3>
                  
                  <p className="text-base font-serif opacity-70 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
