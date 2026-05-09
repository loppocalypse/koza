"use client";

import React from 'react';
import { motion } from 'motion/react';

export const RevealText = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <div className={`overflow-hidden ${className}`}>
    <motion.div
      initial={{ y: "100%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  </div>
);

export const SectionHeading = ({ title, subtitle, align = "left" }: { title: string, subtitle?: string, align?: "left" | "center" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : ""}`}>
    {subtitle && (
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-[10px] uppercase tracking-[0.4em] font-medium text-brand-gold mb-4 block"
      >
        {subtitle}
      </motion.span>
    )}
    <RevealText className="text-4xl md:text-6xl font-display leading-tight">
      {title}
    </RevealText>
  </div>
);
