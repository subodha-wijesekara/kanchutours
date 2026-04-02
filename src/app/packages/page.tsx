"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign, Check, Map, ArrowUpRight } from "lucide-react";
import { tourPackages } from "@/data/packages";

const CATEGORIES = ["All", "Budget", "Luxury", "Honeymoon", "Adventure"];

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? tourPackages
      : tourPackages.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">

      {/* Hero Header */}
      <div className="pt-36 pb-12 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
        >
          Explore · Sri Lanka
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-slate-900 dark:text-white mb-8"
        >
          Our<br /><span className="text-primary">Packages</span>
        </motion.h1>

        {/* Separator */}
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 relative my-8">
          <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-white/30 mr-2">Filter</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary border-primary text-white"
                  : "border-black/10 dark:border-white/15 text-slate-500 dark:text-white/50 hover:border-black/30 dark:hover:border-white/40 hover:text-slate-900 dark:hover:text-white bg-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Packages List */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div layout className="space-y-1">
            {filtered.map((pkg, index) => (
              <motion.div
                layout
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className={`group flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } border border-black/5 dark:border-white/8 hover:border-black/15 dark:hover:border-white/20 transition-colors duration-500 overflow-hidden relative shadow-sm dark:shadow-none bg-white dark:bg-transparent`}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-20" />

                {/* Image */}
                <div className="w-full md:w-1/2 relative h-[300px] md:h-auto min-h-[380px] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-1000 group-hover:scale-105"
                  />
                  {/* Category badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 border border-white/20 px-2.5 py-1 backdrop-blur-sm bg-black/20">
                      {pkg.category}
                    </span>
                  </div>
                  {/* Index number */}
                  <div className="absolute top-5 right-5 z-10 text-[11px] font-bold text-white/30 tracking-widest">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-black transition-colors duration-300">
                  <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300 mb-6 leading-tight">
                    {pkg.title}
                  </h2>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-white/50 text-sm font-medium uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-primary" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1 text-primary font-black text-xl">
                      <DollarSign className="w-5 h-5 -mr-1" />
                      {pkg.price.toLocaleString()}
                      <span className="text-sm text-slate-400 dark:text-white/30 font-normal ml-1">/person</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 mb-4 flex items-center gap-2">
                      <Map className="w-4 h-4 text-primary" />
                      Tour Highlights
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span className="text-slate-600 dark:text-white/60 text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTAs */}
                  <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/10 flex gap-3">
                    <Link
                      href={`/book?package=${pkg.id}`}
                      className="flex-1 bg-primary hover:bg-primary-dark text-white text-center font-bold text-xs uppercase tracking-widest py-4 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      Book Now
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 bg-transparent border border-black/10 dark:border-white/15 hover:border-black/30 dark:hover:border-white/40 text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white text-center font-bold text-xs uppercase tracking-widest py-4 transition-all duration-300"
                    >
                      Inquire
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-slate-400 dark:text-white/20 text-sm uppercase tracking-widest">
            No packages found.
          </div>
        )}
      </div>
    </div>
  );
}
