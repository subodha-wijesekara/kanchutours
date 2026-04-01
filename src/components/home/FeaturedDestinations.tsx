"use client";

import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";

export default function FeaturedDestinations() {
  return (
    <section className="pt-16 pb-32 bg-black relative w-full overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 w-full flex flex-col items-center">
        {/* Header matching image */}
        <div className="text-center mb-16 space-y-1">
          <p className="text-slate-400 text-[11px] lg:text-xs tracking-wide lowercase">confusion? these recommendation</p>
          <h2 className="text-white text-xl lg:text-2xl font-bold tracking-tight lowercase">destination recommendations</h2>
        </div>

        {/* Gallery Slider Layout */}
        <div className="flex gap-4 w-full overflow-x-auto no-scrollbar pb-8 snap-x snap-mandatory">
          {destinations.slice(0, 4).map((dest, index) => (
            <Link 
              href={`/destinations/${dest.id}`} 
              key={dest.id}
              className="group relative min-w-[260px] md:min-w-[300px] lg:min-w-[340px] h-[400px] lg:h-[500px] shrink-0 snap-center focus:outline-none overflow-hidden"
            >
               {/* Vertical Image */}
               <div className="relative w-full h-full filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Bottom Vignette gradient for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
               </div>
               
               {/* Overlay Text */}
               <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-lg lg:text-xl font-bold tracking-wide drop-shadow-md">
                    {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} place
                  </h3>
                  <p className="text-slate-300 text-[10px] lg:text-xs font-light mt-1.5 max-w-[200px] truncate tracking-wider">
                    {dest.name} Sri Lanka
                  </p>
               </div>
            </Link>
          ))}
        </div>

        {/* Bottom Lines */}
        <div className="w-full flex justify-between gap-8 mt-16 px-4 md:px-16">
           <div className="h-[1px] w-full bg-white/20"></div>
           <div className="h-[1px] w-full bg-white/20"></div>
        </div>
      </div>
    </section>
  );
}
