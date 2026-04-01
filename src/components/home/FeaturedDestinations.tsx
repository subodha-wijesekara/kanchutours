"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function FeaturedDestinations() {
  const featured = destinations.slice(0, 4);

  return (
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
              Top Categories
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Explore Popular Destinations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              From pristine beaches to lush green mountains, find your perfect escape in Sri Lanka.
            </p>
          </div>
          <Link 
            href="/destinations" 
            className="flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors shrink-0 group"
          >
            View all destinations 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((dest, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={dest.id}
            >
              <Link href={`/destinations/${dest.id}`} className="block group">
                <div className="relative h-[300px] w-full rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-3 shadow-md">
                      {dest.category}
                    </span>
                    <h3 className="text-white text-2xl font-serif font-bold flex items-center gap-2 mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-slate-300 text-sm flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-3.5 h-3.5" /> Sri Lanka
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
