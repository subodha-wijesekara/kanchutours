"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative h-screen w-full min-h-[900px] flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Image overriding into black fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_sri_lanka_1775029955307.png"
          alt="Sri Lanka Mountains"
          fill
          priority
          className="object-cover opacity-60"
        />
        {/* Gradient fades out into pitch black at the bottom to transition seamlessly into the dark mode site */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Top Travel Categories line matching image */}
      <div className="absolute top-28 lg:top-36 left-0 right-0 z-10 hidden md:block">
        <div className="container mx-auto px-8 lg:px-16 relative">
          <div className="flex items-center gap-16 text-[10px] uppercase tracking-[0.2em] text-slate-400 relative">
             <div className="flex items-center gap-3 font-bold text-white">
               <div className="w-2.5 h-2.5 rounded-full bg-primary" /> TRAVEL
             </div>
             
             <div className="flex gap-12 relative w-full items-center">
                <Link href="/destinations" className="text-white relative pb-3 border-b-2 border-primary/80 hover:text-white/80 transition-colors">wide sea</Link>
                <Link href="/destinations" className="pb-3 border-b border-white/10 hover:text-white transition-colors">mountains</Link>
                <Link href="/destinations" className="pb-3 border-b border-white/10 hover:text-white transition-colors">island</Link>
                <div className="absolute right-0 bottom-3 w-1/3 border-b border-white/20 pointer-events-none"></div>
             </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-8 lg:px-16 w-full max-w-[1600px] mx-auto flex flex-col justify-center h-full pt-16 lg:pt-32">
        
        {/* Main HUGE Text */}
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[100px] sm:text-[130px] md:text-[160px] lg:text-[200px] font-black text-white leading-[0.85] tracking-tighter uppercase"
          >
            Visit<br/>Sri Lanka
          </motion.h1>
          
          {/* Side Indicator line */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 hidden lg:flex items-center gap-6 group">
            <div className="flex flex-col items-center gap-4 text-[10px] font-semibold text-slate-500 tracking-widest">
              <span>03</span>
              <span>04</span>
              <span className="text-3xl text-white font-bold leading-none -ml-2">05</span>
              <span>06</span>
              <span>07</span>
            </div>
            <div className="h-[1px] w-24 bg-white/20 group-hover:w-48 transition-all duration-500 relative hidden xl:block">
               <div className="absolute left-0 top-0 h-[1px] w-8 bg-white"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Detailed Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 mt-24 lg:mt-32 max-w-5xl text-[11px] lg:text-[13px] text-slate-300 leading-relaxed font-light tracking-wide">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Sigiriya Rock Fortress is an ancient palace located in the northern Matale District. The location of this mountain is precisely in the central plains.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Ella is a beautiful hillside village with tea plantations and waterfalls, in the southeastern part of the mainland hill country.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            Yala National Park is a group of wildlife zones located in the southern coastal region of the island, famous for leopards.
          </motion.div>
        </div>

        {/* SWIPE indicator */}
        <motion.div 
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
           className="mt-12 lg:mt-24 text-white font-bold tracking-[0.2em] text-[11px] lg:text-xs flex items-center gap-2 cursor-pointer hover:text-primary transition-colors uppercase"
        >
          SWIPE &gt;&gt;
        </motion.div>
        
        <div className="w-full h-[1px] bg-white/10 mt-8 relative">
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-white/40"></div>
        </div>
        
      </div>
    </div>
  );
}
