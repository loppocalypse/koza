"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/src/lib/i18n';

export function Footer() {
  const { t } = useLanguage();

  const divisionLinks = [
    { name: t.allPieces, href: '/shop' },
    { name: t.hospitality, href: '/hospitality' },
    { name: t.seating, href: '/seating' },
    { name: t.tables, href: '/tables' },
    { name: t.umbrellas, href: '/umbrellas' },
    { name: t.carpets, href: '/carpets' },
  ];

  const companyLinks = [
    { name: t.collections, href: '/collections' },
    { name: t.newArrivals, href: '/new-arrivals' },
    { name: t.journal, href: '/journal' },
    { name: t.contact, href: '/contact' }
  ];

  const supportLinks = [
    t.shipping,
    t.returns,
    t.careGuide,
    t.faq,
    t.tradeProgram
  ];

  return (
    <footer className="bg-brand-ink text-white pt-32 pb-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <h2 className="text-5xl font-display mb-12 tracking-tighter">KOZA</h2>
            <p className="text-lg font-serif opacity-50 max-w-md leading-relaxed mb-12">
              {t.footerJoinText}
            </p>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder={t.emailPlaceholder}
                className="rounded-none border-white/10 bg-transparent h-14 focus-visible:ring-brand-gold placeholder:text-[10px] placeholder:uppercase placeholder:tracking-widest"
              />
              <Button className="rounded-none bg-white text-brand-ink hover:bg-brand-gold hover:text-white h-14 px-8 text-[10px] uppercase tracking-widest font-bold transition-all">
                {t.subscribe}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">{t.divisionsTitle}</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {divisionLinks.map(item => (
                <li key={item.href}>
                  <a href={item.href} className="hover:opacity-100 hover:text-brand-gold hover:italic transition-all">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">{t.companyTitle}</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {companyLinks.map(item => (
                <li key={item.href}>
                  <a href={item.href} className="hover:opacity-100 hover:text-brand-gold hover:italic transition-all">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-10 text-brand-gold">{t.supportTitle}</h6>
            <ul className="flex flex-col gap-6 text-sm font-serif opacity-50">
              {supportLinks.map(item => (
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
          <span className="text-[9px] uppercase tracking-[0.2em] font-bold opacity-30">© 2026 Koza. {t.allRightsReserved}</span>
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold opacity-30">
            <a href="#" className="hover:opacity-100 transition-opacity">{t.privacy}</a>
            <a href="#" className="hover:opacity-100 transition-opacity">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
