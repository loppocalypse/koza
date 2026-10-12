"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowRight, Play, MapPin, Building2, X, ChevronRight } from 'lucide-react';
import { MOCK_ARTICLES, JournalArticle, getJournalCategoryLabel } from '@/src/lib/journal';
import { useLanguage } from '@/src/lib/i18n';

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [modalArticle, setModalArticle] = useState<JournalArticle | null>(null);
  const { t, language, isGeorgian } = useLanguage();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalArticle(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(MOCK_ARTICLES.map(a => a.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredArticles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return MOCK_ARTICLES.filter(article => {
      const matchesSearch = q === '' || 
        article.title.toLowerCase().includes(q) ||
        (article.title_ka && article.title_ka.toLowerCase().includes(q)) ||
        article.excerpt.toLowerCase().includes(q) ||
        (article.excerpt_ka && article.excerpt_ka.toLowerCase().includes(q)) ||
        (article.location && article.location.toLowerCase().includes(q)) ||
        (article.location_ka && article.location_ka.toLowerCase().includes(q)) ||
        (article.client && article.client.toLowerCase().includes(q)) ||
        (article.client_ka && article.client_ka.toLowerCase().includes(q));

      const matchesCat = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  // Featured article: selected one or first filtered match
  const feature = useMemo(() => {
    if (activeArticleId) {
      const match = MOCK_ARTICLES.find(a => a.id === activeArticleId);
      if (match) return match;
    }
    return filteredArticles[0] || MOCK_ARTICLES[0];
  }, [activeArticleId, filteredArticles]);

  // Gallery: strictly excludes the featured article to ensure NO DUPLICATE images or videos
  const gallery = useMemo(() => {
    if (!feature) return filteredArticles;
    const remaining = filteredArticles.filter(a => a.id !== feature.id);
    if (remaining.length > 0) return remaining;
    // If the category filter matches only the feature, display other entries from the catalog
    return MOCK_ARTICLES.filter(a => a.id !== feature.id);
  }, [filteredArticles, feature]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setActiveArticleId(null);
  };

  const featureTitle = isGeorgian ? (feature.title_ka || feature.title) : feature.title;
  const featureExcerpt = isGeorgian ? (feature.excerpt_ka || feature.excerpt) : feature.excerpt;
  const featureCategory = isGeorgian ? (feature.category_ka || getJournalCategoryLabel(feature.category, true)) : feature.category;
  const featureReadTime = isGeorgian ? (feature.readTime_ka || feature.readTime) : feature.readTime;
  const featureClient = isGeorgian ? (feature.client_ka || feature.client) : feature.client;
  const featureLocation = isGeorgian ? (feature.location_ka || feature.location) : feature.location;

  return (
    <div className="min-h-screen flex flex-col bg-brand-beige selection:bg-brand-gold selection:text-white">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Feature Article */}
      {feature && (
        <section 
          className="relative min-h-[90vh] flex items-end pt-32 pb-16 overflow-hidden bg-brand-ink group cursor-pointer"
          onClick={() => setModalArticle(feature)}
        >
          <motion.div
            key={feature.id}
            className="absolute inset-0 z-0"
            initial={{ scale: 1.08, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {feature.video_url ? (
              <video
                src={feature.video_url}
                poster={feature.image_url}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale-[0.2] group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000 ease-[0.23,1,0.32,1]"
              />
            ) : (
              <img
                src={feature.image_url}
                alt={featureTitle}
                className="w-full h-full object-cover grayscale-[0.2] group-hover:opacity-85 group-hover:scale-105 transition-all duration-1000 ease-[0.23,1,0.32,1]"
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>

          {/* Gradient readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-12">
            <motion.div
              key={`text-${feature.id}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-[10px] uppercase tracking-[0.4em] font-medium text-brand-gold">
                <span>{featureCategory}</span>
                <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                <span>{featureReadTime}</span>
                {featureClient && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                    <span className="flex items-center gap-1.5 text-white/90">
                      <Building2 className="w-3 h-3 text-brand-gold" />
                      {featureClient}
                    </span>
                  </>
                )}
                {featureLocation && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-brand-gold/50" />
                    <span className="flex items-center gap-1.5 text-white/70">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      {featureLocation}
                    </span>
                  </>
                )}
              </div>
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-display leading-[1.05] tracking-tighter mb-8 group-hover:italic transition-all duration-700">
                {featureTitle}
              </h1>
              <p className="text-lg md:text-xl font-serif opacity-80 max-w-2xl leading-relaxed">
                {featureExcerpt}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="shrink-0"
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModalArticle(feature);
                }}
                className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b border-white/20 hover:border-brand-gold transition-colors duration-500 cursor-pointer"
              >
                {feature.video_url ? t.watchWalkthrough : t.readCaseStudy}
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
              {t.journalDocumentedProjects}
            </span>
            <h2 className="text-3xl md:text-4xl font-display">{t.journalArchivedTitle}</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-ink text-white shadow-sm'
                    : 'bg-black/5 text-brand-ink/60 hover:bg-black/10 hover:text-brand-ink'
                }`}
              >
                {cat === 'All' ? t.allFilter : getJournalCategoryLabel(cat, isGeorgian)}
              </button>
            ))}
          </div>
        </div>

        {gallery.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-lg font-serif text-brand-ink/60">
              {language === 'ka' ? 'სტატიები ვერ მოიძებნა' : 'No articles found matching your criteria.'}
            </p>
          </div>
        ) : (
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

                const articleTitle = isGeorgian ? (article.title_ka || article.title) : article.title;
                const articleExcerpt = isGeorgian ? (article.excerpt_ka || article.excerpt) : article.excerpt;
                const articleCategory = isGeorgian ? (article.category_ka || getJournalCategoryLabel(article.category, true)) : article.category;
                const articleReadTime = isGeorgian ? (article.readTime_ka || article.readTime) : article.readTime;
                const articleClient = isGeorgian ? (article.client_ka || article.client) : article.client;
                const articleLocation = isGeorgian ? (article.location_ka || article.location) : article.location;

                return (
                  <motion.article 
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    className={`${colSpan} ${marginTop} group cursor-pointer flex flex-col`}
                    onClick={() => {
                      setActiveArticleId(article.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
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
                          alt={articleTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-[0.23,1,0.32,1]"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/10 transition-colors duration-700 pointer-events-none" />

                      {article.video_url && (
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 font-sans font-medium pointer-events-none">
                          <Play className="w-2.5 h-2.5 fill-white" />
                          {t.videoWalkthroughBadge}
                        </div>
                      )}

                      {articleClient && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-brand-ink text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-sm flex items-center gap-1.5 font-sans font-semibold pointer-events-none shadow-sm">
                          <Building2 className="w-2.5 h-2.5 text-brand-gold" />
                          {articleClient}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-medium text-brand-gold mb-4">
                      <span>{articleCategory}</span>
                      <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                      <span className="text-brand-ink/50">{articleReadTime}</span>
                      {articleLocation && (
                        <>
                          <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                          <span className="text-brand-ink/60 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" />
                            {articleLocation}
                          </span>
                        </>
                      )}
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-display mb-4 group-hover:italic transition-all duration-500 leading-snug">
                      {articleTitle}
                    </h3>
                    
                    <p className="text-base font-serif opacity-70 leading-relaxed line-clamp-3">
                      {articleExcerpt}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{language === 'ka' ? 'სრულად ნახვა' : 'Feature Case Study'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Case Study Reading Modal */}
      <AnimatePresence>
        {modalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-ink/80 backdrop-blur-md"
              onClick={() => setModalArticle(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-brand-beige overflow-y-auto no-scrollbar shadow-2xl z-10 flex flex-col"
            >
              {/* Media Header */}
              <div className="relative aspect-[16/9] w-full bg-black shrink-0">
                {modalArticle.video_url ? (
                  <video
                    src={modalArticle.video_url}
                    poster={modalArticle.image_url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={modalArticle.image_url}
                    alt={isGeorgian ? (modalArticle.title_ka || modalArticle.title) : modalArticle.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={() => setModalArticle(null)}
                  className="absolute top-4 right-4 z-30 p-2.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors cursor-pointer shadow-lg"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 space-y-6">
                <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-medium text-brand-gold">
                  <span>
                    {isGeorgian ? (modalArticle.category_ka || getJournalCategoryLabel(modalArticle.category, true)) : modalArticle.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                  <span className="text-brand-ink/60">
                    {isGeorgian ? (modalArticle.readTime_ka || modalArticle.readTime) : modalArticle.readTime}
                  </span>
                  {modalArticle.client && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                      <span className="text-brand-ink/80 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-brand-gold" />
                        {isGeorgian ? (modalArticle.client_ka || modalArticle.client) : modalArticle.client}
                      </span>
                    </>
                  )}
                  {modalArticle.location && (
                    <>
                      <div className="w-1 h-1 rounded-full bg-brand-ink/20" />
                      <span className="text-brand-ink/70 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                        {isGeorgian ? (modalArticle.location_ka || modalArticle.location) : modalArticle.location}
                      </span>
                    </>
                  )}
                </div>

                <h2 className="text-3xl md:text-5xl font-display leading-tight">
                  {isGeorgian ? (modalArticle.title_ka || modalArticle.title) : modalArticle.title}
                </h2>

                <p className="text-lg md:text-xl font-serif leading-relaxed opacity-80 border-l-2 border-brand-gold pl-6 py-1">
                  {isGeorgian ? (modalArticle.excerpt_ka || modalArticle.excerpt) : modalArticle.excerpt}
                </p>

                <div className="pt-6 border-t border-black/10 flex justify-end">
                  <button
                    onClick={() => setModalArticle(null)}
                    className="px-6 py-3 bg-brand-ink text-white text-[10px] uppercase tracking-widest font-bold hover:bg-brand-gold transition-colors cursor-pointer"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
