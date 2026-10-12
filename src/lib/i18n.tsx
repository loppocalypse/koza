"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ka';

export interface Translations {
  // Navigation & General
  menu: string;
  shopAll: string;
  newArrivals: string;
  collections: string;
  journal: string;
  contact: string;
  searchPlaceholder: string;
  curatedDivisions: string;
  followUs: string;
  visitUs: string;
  address: string;

  // Divisions
  hospitality: string;
  seating: string;
  tables: string;
  umbrellas: string;
  carpets: string;
  towels: string;
  lighting: string;

  // Favorites / Shortlist
  favorites: string;
  shortlistTitle: string;
  clearAll: string;
  noFavoritesYet: string;
  piecesShortlistedSingular: string;
  piecesShortlistedPlural: string;
  shortlistDescSuffix: string;
  requestQuoteShortlist: string;

  // Hero & Common
  estTbilisi: string;
  artOfLiving: string;
  heroTagline: string;
  shopCollection: string;
  scrollToExplore: string;
  curatedSeries: string;
  exploreSignatureCollections: string;

  // New Arrivals
  justReleased: string;
  latestMasterpieces: string;
  newArrivalsTagline: string;
  discoverNewestAdditions: string;

  // Product Explorer
  filterPieces: string;
  allPieces: string;
  category: string;
  brand: string;
  sortBy: string;
  inStockOnly: string;
  clearFilters: string;
  requestQuote: string;
  specifications: string;
  dimensions: string;
  material: string;
  inStock: string;
  outOfStock: string;
  downloadSpec: string;
  submitInquiry: string;
  inquirySent: string;
  close: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  companyProject: string;
  estimatedQuantity: string;
  messageNotes: string;

  // Footer
  footerJoinText: string;
  emailPlaceholder: string;
  subscribe: string;
  divisionsTitle: string;
  companyTitle: string;
  supportTitle: string;
  shipping: string;
  returns: string;
  careGuide: string;
  faq: string;
  tradeProgram: string;
  privacy: string;
  terms: string;
  allRightsReserved: string;

  // Journal
  journalDocumentedProjects: string;
  journalArchivedTitle: string;
  watchWalkthrough: string;
  readCaseStudy: string;
  videoWalkthroughBadge: string;
  allFilter: string;
}

const translations: Record<Language, Translations> = {
  en: {
    menu: 'Menu',
    shopAll: 'Shop All',
    newArrivals: 'New Arrivals',
    collections: 'Collections',
    journal: 'Journal',
    contact: 'Contact',
    searchPlaceholder: 'Search pieces...',
    curatedDivisions: 'Curated Guild Divisions',
    followUs: 'Follow Us',
    visitUs: 'Visit Us',
    address: 'Giorgi Guramishvili Street No:2, Tbilisi, GE',

    hospitality: 'Hospitality',
    seating: 'Seating',
    tables: 'Tables',
    umbrellas: 'Umbrellas',
    carpets: 'Carpets',
    towels: 'Towels',
    lighting: 'Lighting',

    favorites: 'Favorites',
    shortlistTitle: 'Architectural Shortlist',
    clearAll: 'Clear All',
    noFavoritesYet: 'No pieces shortlisted yet.',
    piecesShortlistedSingular: 'piece',
    piecesShortlistedPlural: 'pieces',
    shortlistDescSuffix: 'curated for project review and specifications.',
    requestQuoteShortlist: 'Request Quote for Shortlist',

    estTbilisi: 'Est. 2026 — Tbilisi',
    artOfLiving: 'Art of Living',
    heroTagline: "Curating the world's most intentional furniture for the modern sanctuary.",
    shopCollection: 'Shop Collection',
    scrollToExplore: 'Scroll to explore',
    curatedSeries: 'Curated Series',
    exploreSignatureCollections: 'Explore our signature collections',

    justReleased: 'Just Released',
    latestMasterpieces: 'The Latest Masterpieces',
    newArrivalsTagline: 'An avant-garde curation of newly released furnishings, crafted for the modern sanctuary.',
    discoverNewestAdditions: 'Discover our newest additions',

    filterPieces: 'Filter Pieces',
    allPieces: 'All Pieces',
    category: 'Category',
    brand: 'Brand',
    sortBy: 'Sort By',
    inStockOnly: 'In Stock Only',
    clearFilters: 'Clear Filters',
    requestQuote: 'Request Quote',
    specifications: 'Specifications',
    dimensions: 'Dimensions',
    material: 'Material',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    downloadSpec: 'Download Specification Sheet',
    submitInquiry: 'Submit Inquiry',
    inquirySent: 'Inquiry Sent Successfully',
    close: 'Close',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    companyProject: 'Company / Project',
    estimatedQuantity: 'Estimated Quantity',
    messageNotes: 'Message / Notes',

    footerJoinText: 'Join our inner circle for exclusive previews of upcoming collections and editorial stories on modern living.',
    emailPlaceholder: 'Your email address',
    subscribe: 'Subscribe',
    divisionsTitle: 'Divisions',
    companyTitle: 'Company',
    supportTitle: 'Support',
    shipping: 'Shipping',
    returns: 'Returns',
    careGuide: 'Care Guide',
    faq: 'FAQ',
    tradeProgram: 'Trade Program',
    privacy: 'Privacy',
    terms: 'Terms',
    allRightsReserved: 'All Rights Reserved.',

    // Journal
    journalDocumentedProjects: 'Documented Real-World Projects',
    journalArchivedTitle: 'Archived Journals & Installations',
    watchWalkthrough: 'Watch Walkthrough',
    readCaseStudy: 'Read Case Study',
    videoWalkthroughBadge: 'Video Walkthrough',
    allFilter: 'All',
  },
  ka: {
    menu: 'მენიუ',
    shopAll: 'ყველა ნივთი',
    newArrivals: 'ახალი კოლექცია',
    collections: 'კოლექციები',
    journal: 'ჟურნალი',
    contact: 'კონტაქტი',
    searchPlaceholder: 'ძიება...',
    curatedDivisions: 'კურატორული განყოფილებები',
    followUs: 'გამოგვყევით',
    visitUs: 'გვეწვიეთ',
    address: 'გიორგი გურამიშვილის ქუჩა №2, თბილისი',

    hospitality: 'ჰოსპიტალითი',
    seating: 'სკამები & სავარძლები',
    tables: 'მაგიდები',
    umbrellas: 'ქოლგები',
    carpets: 'ხალიჩები',
    towels: 'პირსახოცები',
    lighting: 'განათება',

    favorites: 'რჩეულები',
    shortlistTitle: 'რჩეული კოლექცია',
    clearAll: 'ყველას წაშლა',
    noFavoritesYet: 'რჩეული ნივთები ჯერ არ არის დამატებული.',
    piecesShortlistedSingular: 'ნივთი',
    piecesShortlistedPlural: 'ნივთი',
    shortlistDescSuffix: 'არჩეულია პროექტის მიმოხილვისთვის.',
    requestQuoteShortlist: 'ფასის მოთხოვნა რჩეულებისთვის',

    estTbilisi: 'დაარს. 2026 — თბილისი',
    artOfLiving: 'ცხოვრების ხელოვნება',
    heroTagline: 'მსოფლიოს გამორჩეული ავეჯის კურაცია თანამედროვე არქიტექტურული სივრცეებისთვის.',
    shopCollection: 'კოლექციის ნახვა',
    scrollToExplore: 'ჩამოსქროლეთ აღმოსაჩენად',
    curatedSeries: 'სპეციალური სერია',
    exploreSignatureCollections: 'აღმოაჩინეთ ჩვენი მთავარი კოლექციები',

    justReleased: 'ახალი გამოშვება',
    latestMasterpieces: 'უახლესი შედევრები',
    newArrivalsTagline: 'ახლად გამოსული ავეჯის ავანგარდული კოლექცია, შექმნილი თანამედროვე თავშესაფრისთვის.',
    discoverNewestAdditions: 'აღმოაჩინეთ ჩვენი უახლესი მოდელები',

    filterPieces: 'გაფილტვრა',
    allPieces: 'ყველა ნივთი',
    category: 'კატეგორია',
    brand: 'ბრენდი',
    sortBy: 'დალაგება',
    inStockOnly: 'მხოლოდ მარაგში',
    clearFilters: 'ფილტრების გასუფთავება',
    requestQuote: 'ფასის მოთხოვნა',
    specifications: 'მახასიათებლები',
    dimensions: 'ზომები',
    material: 'მასალა',
    inStock: 'მარაგშია',
    outOfStock: 'არ არის მარაგში',
    downloadSpec: 'სპეციფიკაციის გადმოწერა',
    submitInquiry: 'მოთხოვნის გაგზავნა',
    inquirySent: 'მოთხოვნა წარმატებით გაიგზავნა',
    close: 'დახურვა',
    fullName: 'სახელი და გვარი',
    emailAddress: 'ელფოსტა',
    phoneNumber: 'ტელეფონის ნომერი',
    companyProject: 'კომპანია / პროექტი',
    estimatedQuantity: 'სავარაუდო რაოდენობა',
    messageNotes: 'შეტყობინება / შენიშვნა',

    footerJoinText: 'შემოუერთდით ჩვენს წრეს მომავალი კოლექციების ექსკლუზიური წინასწარი ნახვისა და ისტორიებისთვის.',
    emailPlaceholder: 'თქვენი ელფოსტა',
    subscribe: 'გამოწერა',
    divisionsTitle: 'განყოფილებები',
    companyTitle: 'კომპანია',
    supportTitle: 'მხარდაჭერა',
    shipping: 'მიწოდება',
    returns: 'დაბრუნება',
    careGuide: 'მოვლის გზამკვლევი',
    faq: 'ხშირად დასმული კითხვები',
    tradeProgram: 'კორპორატიული პროგრამა',
    privacy: 'კონფიდენციალურობა',
    terms: 'წესები & პირობები',
    allRightsReserved: 'ყველა უფლება დაცულია.',

    // Journal
    journalDocumentedProjects: 'დოკუმენტირებული რეალური პროექტები',
    journalArchivedTitle: 'ჟურნალის არქივი & ინსტალაციები',
    watchWalkthrough: 'ვიდეო მიმოხილვა',
    readCaseStudy: 'პროექტის გაცნობა',
    videoWalkthroughBadge: 'ვიდეო მიმოხილვა',
    allFilter: 'ყველა',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isGeorgian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'koza_preferred_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'ka') {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ka' : 'en');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
        isGeorgian: language === 'ka',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
