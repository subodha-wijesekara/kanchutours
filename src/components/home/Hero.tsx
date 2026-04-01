"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative h-screen w-full min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_sri_lanka_1775029955307.png"
          alt="Beautiful Sri Lanka Landscape"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 w-full max-w-5xl mx-auto flex flex-col items-center mt-16">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-primary-dark font-semibold tracking-wider uppercase bg-white/90 px-4 py-1.5 rounded-full text-sm mb-6 inline-block"
        >
          Welcome to Paradise
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-lg text-balance"
        >
          Discover the Beauty of <span className="text-primary">Sri Lanka</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto drop-shadow-md text-balance"
        >
          Experience golden beaches, misty mountains, ancient ruins, and majestic wildlife in one unforgettable journey.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link 
            href="/packages"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-primary/30 w-full sm:w-auto justify-center"
          >
            Explore Tours <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/destinations"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all w-full sm:w-auto text-center"
          >
            View Destinations
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
