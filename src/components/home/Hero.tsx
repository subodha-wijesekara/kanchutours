"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const BACKGROUNDS = [
  "/images/hero_sri_lanka_1775029955307.png",
  "/images/ella_train_1775030054193.png",
  "/images/galle_fort_1775030151642.png",
  "/images/yala_leopard_1775030195268.png",
  "/images/sigiriya_rock_1775030006860.png",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUNDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full min-h-[900px] flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* Background Image overriding into black fade */}
      <div className="absolute inset-0 z-0 bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={BACKGROUNDS[currentIndex]}
              alt="Sri Lanka Mountains"
              fill
              priority
              className="object-cover opacity-60"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient fades out into pitch black at the bottom to transition seamlessly into the dark mode site */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent mix-blend-multiply z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent opacity-80 z-10 pointer-events-none"></div>
      </div>

      {/* Top Travel Categories line matching image */}
      <div className="absolute top-28 lg:top-36 left-0 right-0 z-30 hidden md:block">
        <div className="container mx-auto px-8 lg:px-16 relative">
          <div className="flex items-center gap-16 text-[10px] uppercase tracking-[0.2em] text-slate-400 relative">
             <div className="flex items-center gap-3 font-bold text-white">
               <div className="w-2.5 h-2.5 rounded-full bg-primary" /> TRAVEL
             </div>
             
             <div className="flex gap-12 relative w-full items-center">
                <Link href="/destinations" className="text-white relative pb-3 border-b-2 border-primary/80 hover:text-white/80 transition-colors pointer-events-auto cursor-pointer block z-40">wide sea</Link>
                <Link href="/destinations" className="pb-3 border-b border-white/10 hover:text-white transition-colors pointer-events-auto cursor-pointer block z-40">mountains</Link>
                <Link href="/destinations" className="pb-3 border-b border-white/10 hover:text-white transition-colors pointer-events-auto cursor-pointer block z-40">island</Link>
                <div className="absolute right-0 bottom-3 w-1/3 border-b border-white/20 pointer-events-none"></div>
             </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 px-8 lg:px-16 w-full max-w-[1600px] mx-auto flex flex-col justify-center h-full pt-16 lg:pt-32 pointer-events-none">
        
        {/* Main HUGE Text */}
        <div className="relative pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-black text-white leading-[0.85] tracking-tighter uppercase"
          >
            Visit<br/>Sri Lanka
          </motion.h1>
          
          {/* Side Indicator line */}
          <div className="absolute top-1/2 -translate-y-1/2 right-0 hidden lg:flex items-center gap-6 group">
            <div className="flex flex-col items-center gap-4 text-[10px] font-semibold text-slate-500 tracking-widest pointer-events-auto">
              {[3, 4, 5, 6, 7].map((num, idx) => (
                <button 
                  key={num}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${currentIndex === idx ? "text-3xl text-white font-bold leading-none -ml-2" : "hover:text-white hover:scale-110"}`}
                >
                  0{num}
                </button>
              ))}
            </div>
            <div className="h-[1px] w-24 bg-white/20 group-hover:w-48 transition-all duration-500 relative hidden xl:block pointer-events-none">
               <div className="absolute left-0 top-0 h-[1px] w-8 bg-white transition-all duration-500" style={{ top: '0', left: `${currentIndex * 20}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Descriptions */}
        <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-16 mt-16 max-w-4xl text-[11px] lg:text-[12px] text-slate-400 leading-relaxed font-light tracking-wide">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            Sigiriya Rock Fortress is an ancient palace in the northern Matale District.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            Ella — a hillside village with tea plantations and stunning waterfalls.
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            Yala National Park, famous for leopards on the southern coastal region.
          </motion.div>
        </div>

        {/* SWIPE indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="mt-12 text-white font-bold tracking-[0.2em] text-[11px] flex items-center gap-2 cursor-pointer hover:text-primary transition-colors uppercase pointer-events-auto"
        >
          SWIPE &gt;&gt;
        </motion.div>

        <div className="w-full h-[1px] bg-white/10 mt-6 relative pointer-events-none">
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-white/40"></div>
        </div>
        
      </div>
    </div>
  );
}
