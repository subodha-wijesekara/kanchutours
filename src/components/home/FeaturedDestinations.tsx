"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/data/destinations";

// Duplicate tiles so user can add more later
const SLIDES = [
  ...destinations,
  // Duplicates (user will update details later)
  { ...destinations[0], id: "sigiriya-2",  name: "Adam's Peak",    image: "/images/sigiriya_rock_1775030006860.png" },
  { ...destinations[1], id: "ella-2",      name: "Nine Arch Bridge", image: "/images/ella_train_1775030054193.png" },
  { ...destinations[2], id: "kandy-2",     name: "Peradeniya Gardens", image: "/images/kandy_temple_1775030099483.png" },
  { ...destinations[3], id: "galle-2",     name: "Mirissa Beach",  image: "/images/galle_fort_1775030151642.png" },
  { ...destinations[4], id: "yala-2",      name: "Udawalawe Park", image: "/images/yala_leopard_1775030195268.png" },
];

const VISIBLE = 4; // cards visible at once on desktop
const INTERVAL = 3500; // ms between auto-slides

export default function FeaturedDestinations() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const maxIndex = SLIDES.length - 1;

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  const next = useCallback(() => {
    setCurrent((c) => (c === maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const delta = touchStartX.current - touchEndX.current;
    if (Math.abs(delta) > 40) {
      delta > 0 ? next() : prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Build ordered visible slides (wrapping)
  const getSlides = () => {
    const result = [];
    for (let i = 0; i < VISIBLE + 1; i++) {
      result.push(SLIDES[(current + i) % SLIDES.length]);
    }
    return result;
  };

  const ordinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <section
      className="pt-16 pb-20 bg-black relative w-full overflow-hidden font-sans"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full flex flex-col items-center">

        {/* Header */}
        <div className="text-center mb-10 space-y-1">
          <p className="text-slate-400 text-[11px] tracking-wide lowercase">confusion? these recommendation</p>
          <h2 className="text-white text-xl lg:text-2xl font-bold tracking-tight lowercase">destination recommendations</h2>
        </div>

        {/* Carousel track */}
        <div
          className="relative w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex gap-4 w-full"
            >
              {getSlides().map((dest, i) => (
                <Link
                  href={`/destinations/${dest.id.replace(/-\d+$/, "")}`}
                  key={`${dest.id}-${i}`}
                  className={`group relative shrink-0 h-[420px] lg:h-[520px] overflow-hidden focus:outline-none transition-all duration-500
                    ${i === 0
                      ? "w-[55%] sm:w-[45%] lg:w-[36%]"       // featured/large
                      : i < VISIBLE
                        ? "hidden sm:block flex-1"             // regular
                        : "hidden"                             // hidden overflow
                    }`}
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-7 left-0 right-0 flex flex-col items-center text-center px-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white text-base lg:text-lg font-bold tracking-wide">
                      {ordinal(((current + i) % SLIDES.length) + 1)} place
                    </h3>
                    <p className="text-slate-300 text-[10px] lg:text-xs font-light mt-1 tracking-wider truncate max-w-[180px]">
                      {dest.name} Sri Lanka
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between w-full mt-8 px-1">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? "w-6 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-primary/60 bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-all group"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/20 hover:border-primary/60 bg-white/5 hover:bg-primary/10 flex items-center justify-center transition-all group"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-white/60 group-hover:text-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* Bottom separator */}
        <div className="w-full h-[1px] bg-white/10 mt-10 relative">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-primary/60 h-[1px]"
            animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

      </div>
    </section>
  );
}

