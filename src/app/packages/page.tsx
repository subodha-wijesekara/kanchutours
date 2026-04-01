"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Map, DollarSign, Check } from "lucide-react";
import { tourPackages } from "@/data/packages";

export default function PackagesPage() {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Exclusive <span className="text-primary">Tour Packages</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 text-balance">
            Whether you are looking for a romantic honeymoon, a thrilling adventure, or a budget-friendly trip, we have the perfect package for you.
          </p>
        </div>

        {/* Packages List */}
        <div className="space-y-12 block">
          {tourPackages.map((pkg, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              key={pkg.id}
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-slate-50 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative h-[300px] md:h-auto min-h-[400px]">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    {pkg.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                  {pkg.title}
                </h2>
                
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
                    <Clock className="w-5 h-5 text-primary" /> {pkg.duration}
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <DollarSign className="w-5 h-5 -mr-1" /> {pkg.price} <span className="text-sm text-slate-500 font-normal">/person</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" /> Tour Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-secondary shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400 text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex gap-4">
                  <Link 
                    href={`/book?package=${pkg.id}`}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white text-center font-semibold py-3.5 rounded-xl transition-colors shadow-lg shadow-primary/20"
                  >
                    Book Now
                  </Link>
                  <Link 
                    href="/contact"
                    className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-center font-semibold py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
