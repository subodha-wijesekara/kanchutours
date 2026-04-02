"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Route, ShieldCheck, HeartHandshake } from "lucide-react";

const WHY_ITEMS = [
  {
    icon: Route,
    title: "Tailored Itineraries",
    desc: "Every traveler is unique. We customize your tour based on your personal interests, pace, and budget.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Reliable",
    desc: "Your safety is our priority. We work only with licensed guides and highly maintained vehicles.",
  },
  {
    icon: HeartHandshake,
    title: "Local Expertise",
    desc: "Our guides are locals who know the hidden gems, authentic eateries, and off-the-beaten-path spots.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">

      {/* Hero Header */}
      <div className="pt-36 pb-12 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-4"
        >
          Kanchu Tours · Sri Lanka
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-white mb-8"
        >
          About<br /><span className="text-primary">Us</span>
        </motion.h1>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/10 relative my-8">
          <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
        </div>
      </div>

      {/* Intro Split Section */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-1 border border-white/8"
        >
          {/* Image */}
          <div className="relative h-[420px] lg:h-[560px] overflow-hidden">
            <Image
              src="/images/kandy_temple_1775030099483.png"
              alt="Sri Lanka Cultural Heritage"
              fill
              className="object-cover brightness-75"
            />
            {/* Left accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary z-10" />
          </div>

          {/* Text */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-black">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-6 block">
              Our Story
            </span>
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight leading-tight text-white mb-6">
              Your Journey to the<br />
              <span className="text-primary">Pearl of the Indian Ocean</span>
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              At Kanchu Tours, we believe that travel is more than just visiting a place—it&apos;s about immersing yourself in the culture, connecting with the locals, and creating memories that last a lifetime.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              We are a team of passionate Sri Lankans dedicated to showing the world the true beauty of our island. With years of experience and deep local knowledge, we craft authentic travel experiences from sun-kissed beaches to misty mountains and ancient ruins.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Why Choose Us */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto py-20">
        {/* Section header */}
        <div className="mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-3"
          >
            Why Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight"
          >
            Why Choose<br /><span className="text-primary">Kanchu Tours</span>
          </motion.h2>
          <div className="w-full h-[1px] bg-white/10 relative mt-8">
            <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {WHY_ITEMS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group border border-white/8 hover:border-white/20 p-8 relative transition-colors duration-400"
            >
              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <div className="w-12 h-12 border border-white/15 flex items-center justify-center mb-6 group-hover:border-primary transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black uppercase tracking-tight text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-1"
        >
          {/* Mission */}
          <div className="border border-white/8 border-r-0 md:border-r p-8 md:p-12 relative group hover:border-white/20 transition-colors duration-300">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 block">
              01
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary">Mission</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              To provide exceptional and sustainable travel experiences that showcase the unparalleled beauty, rich heritage, and vibrant culture of Sri Lanka, while supporting local communities.
            </p>
          </div>

          {/* Vision */}
          <div className="border border-white/8 p-8 md:p-12 relative group hover:border-white/20 transition-colors duration-300">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4 block">
              02
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-4">
              Our <span className="text-primary">Vision</span>
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">
              To be the most trusted and sought-after travel partner in Sri Lanka, recognized for our commitment to quality, authenticity, and environmental responsibility.
            </p>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
