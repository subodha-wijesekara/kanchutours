"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    country: "United Kingdom",
    tour: "Luxury Island Escape",
    rating: 5,
    text: "An absolutely breathtaking experience from start to finish. The team at Kanchu Tours went above and beyond to ensure every detail was perfect. Sigiriya at sunrise will stay with me forever.",
    initials: "SM",
  },
  {
    id: 2,
    name: "Luca Rossi",
    country: "Italy",
    tour: "Wild Adventure Trip",
    rating: 5,
    text: "The white-water rafting and jungle trek were incredible. Our guide Nimal was knowledgeable, funny, and made us feel completely safe throughout. Sri Lanka is magical — Kanchu Tours made it unforgettable.",
    initials: "LR",
  },
  {
    id: 3,
    name: "Anika & Tom Braun",
    country: "Germany",
    tour: "Romantic Getaway",
    rating: 5,
    text: "We chose Kanchu Tours for our honeymoon and it exceeded every expectation. The beachfront villa, candlelit dinners, and sunset cruise were pure perfection. We are already planning our return trip!",
    initials: "AT",
  },
  {
    id: 4,
    name: "James Okonkwo",
    country: "Canada",
    tour: "Backpacker Explorer",
    rating: 5,
    text: "As a solo traveler on a budget, I was thrilled by how much value I got. Train rides through the hills, fresh local food, and genuine hospitality everywhere. Kanchu Tours nailed it.",
    initials: "JO",
  },
  {
    id: 5,
    name: "Priya Nair",
    country: "India",
    tour: "Cultural Heritage Tour",
    rating: 5,
    text: "The temples, the tea estates, the elephant sanctuary — all perfectly organized. What impressed me most was how respectful and sustainable the approach was. Highly recommended for conscious travelers.",
    initials: "PN",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setActive((a) => (a + 1) % TESTIMONIALS.length);

  const current = TESTIMONIALS[active];

  return (
    <section className="bg-black py-24 px-8 lg:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4"
          >
            Real Stories · Real Travelers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-white"
          >
            Customer<br /><span className="text-primary">Feedbacks</span>
          </motion.h2>
          <div className="w-full h-[1px] bg-white/10 relative mt-8">
            <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
          </div>
        </div>

        {/* Testimonial Card + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">

          {/* Main Card */}
          <div className="lg:col-span-3 border border-white/8 relative overflow-hidden min-h-[380px] flex flex-col">
            {/* Red left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary z-10" />

            {/* Large quote icon */}
            <div className="absolute top-6 right-6 text-white/5">
              <Quote className="w-20 h-20 fill-current" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col h-full p-8 md:p-12"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-white/80 text-lg md:text-xl leading-relaxed font-light flex-1 mb-8">
                  &ldquo;{current.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-white text-sm shrink-0">
                    {current.initials}
                  </div>
                  <div>
                    <p className="font-black uppercase tracking-tight text-white text-sm">
                      {current.name}
                    </p>
                    <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">
                      {current.country}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 border border-white/15 px-2.5 py-1">
                      {current.tour}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar — all testimonials list */}
          <div className="lg:col-span-2 border border-white/8 border-l-0 flex flex-col">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`group flex items-center gap-4 px-6 py-5 text-left border-b border-white/8 last:border-b-0 transition-colors duration-300 relative ${
                  i === active ? "bg-white/5" : "hover:bg-white/3"
                }`}
              >
                {/* Active indicator */}
                {i === active && (
                  <motion.div
                    layoutId="activeBar"
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                  />
                )}
                <div
                  className={`w-10 h-10 flex items-center justify-center font-black text-xs shrink-0 transition-colors duration-300 ${
                    i === active ? "bg-primary text-white" : "border border-white/15 text-white/40 group-hover:border-primary/60 group-hover:text-white"
                  }`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <p className={`font-black uppercase tracking-tight text-xs transition-colors duration-300 ${i === active ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                    {t.name}
                  </p>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider truncate mt-0.5">
                    {t.country} · {t.tour}
                  </p>
                </div>
                <div className="ml-auto flex gap-0.5 shrink-0">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} className={`w-2.5 h-2.5 fill-current transition-colors ${i === active ? "text-primary" : "text-white/20"}`} />
                  ))}
                </div>
              </button>
            ))}

            {/* Nav controls */}
            <div className="mt-auto border-t border-white/8 flex">
              <button
                onClick={prev}
                className="flex-1 py-4 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 border-r border-white/8 transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center justify-center px-6 text-[10px] font-black uppercase tracking-widest text-white/30">
                {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </div>
              <button
                onClick={next}
                className="flex-1 py-4 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 border-l border-white/8 transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
