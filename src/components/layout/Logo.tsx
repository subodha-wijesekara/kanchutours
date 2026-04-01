import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  scrolled?: boolean;
}

export function Logo({ className, scrolled = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 group select-none", className)}>
      {/* Icon Graphic */}
      <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-lg shadow-primary/20 overflow-hidden shrink-0">
        {/* Abstract tropical graphic using SVG */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full text-white/90 z-10 p-1" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sun */}
          <circle cx="50" cy="40" r="16" fill="#ea580c" className="opacity-90" />
          
          {/* Mountains / Abstract Waves */}
          <path d="M10 75 Q 30 50 50 75 T 90 75 L 90 90 L 10 90 Z" fill="currentColor" className="opacity-80" />
          <path d="M0 85 Q 25 65 50 85 T 100 85 L 100 100 L 0 100 Z" fill="currentColor" />
          
          {/* Stylized Palm Fronds/Birds */}
          <path d="M25 35 Q 35 25 45 35 Q 35 30 25 35 Z" fill="currentColor" />
          <path d="M75 30 Q 65 20 55 30 Q 65 25 75 30 Z" fill="currentColor" />
        </svg>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>

      {/* Typography */}
      <div className="flex flex-col justify-center">
        <span 
          className={cn(
            "font-serif text-2xl font-black tracking-tight leading-none uppercase transition-colors duration-300",
            scrolled ? "text-foreground" : "text-white"
          )}
        >
          Kanchu
        </span>
        <span 
          className={cn(
            "text-[0.65rem] font-bold tracking-[0.25em] uppercase leading-tight mt-0.5 transition-colors duration-300",
            scrolled ? "text-primary" : "text-white/80"
          )}
        >
          Travel & Tours
        </span>
      </div>
    </div>
  );
}
