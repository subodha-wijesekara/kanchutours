"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Filter } from "lucide-react";
import { destinations } from "@/data/destinations";

const CATEGORIES = ["All", "Beach", "Cultural", "Wildlife", "Adventure"];

export default function DestinationsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = activeCategory === "All" 
    ? destinations 
    : destinations.filter(d => d.category === activeCategory);

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Discover Our <span className="text-primary">Destinations</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            From golden sandy beaches to mist-covered mountains and ancient ruins, explore the most beautiful places in Sri Lanka.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
            <Filter className="w-5 h-5 text-primary" /> Filter by:
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category 
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-105" 
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dest.id}
              >
                <Link href={`/destinations/${dest.id}`} className="block group h-full">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 h-full flex flex-col hover:border-primary/30 transition-colors">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                          {dest.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                        {dest.name}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6 flex-1">
                        {dest.shortDescription}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <p className="text-primary text-sm flex items-center gap-1 font-medium">
                          <MapPin className="w-4 h-4" /> Sri Lanka
                        </p>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-1">
                          View Details
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No destinations found for this category.
          </div>
        )}
      </div>
    </div>
  );
}
