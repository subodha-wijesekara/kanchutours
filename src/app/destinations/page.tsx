"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { destinations } from "@/data/destinations";

const CATEGORIES = ["All", "Beach", "Cultural", "Wildlife", "Adventure"];

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">

      {/* Hero Header */}
      <div className="pt-36 pb-12 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
        >
          Explore · Sri Lanka
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-slate-900 dark:text-white mb-8"
        >
          Our<br /><span className="text-primary">Destinations</span>
        </motion.h1>

        {/* Separator */}
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 relative my-8">
          <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-3 items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/30 mr-2">Filter</span>
          {CATEGORIES.map(cat => (
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

      {/* Grid */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          <AnimatePresence>
            {filtered.map((dest, idx) => (
              <motion.div
                layout
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Link href={`/destinations/${dest.id}`} className="group relative block overflow-hidden h-[420px] lg:h-[500px]">
                  {/* Full image */}
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                  />

                  {/* Top category badge */}
                  <div className="absolute top-5 left-5 z-10">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 border border-white/20 px-2.5 py-1 backdrop-blur-sm bg-black/20">
                      {dest.category}
                    </span>
                  </div>

                  {/* Index number */}
                  <div className="absolute top-5 right-5 z-10 text-[11px] font-bold text-white/30 tracking-widest">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />

                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-end justify-between">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
                        {dest.name}
                      </h2>
                      <p className="text-[11px] text-white/50 font-light tracking-wider line-clamp-1 max-w-[220px]">
                        {dest.shortDescription}
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  </div>

                  {/* Hover side border accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-20" />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-slate-400 dark:text-white/20 text-sm uppercase tracking-widest">
            No destinations found.
          </div>
        )}
      </div>
    </div>
  );
}

