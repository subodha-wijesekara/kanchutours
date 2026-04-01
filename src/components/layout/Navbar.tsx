"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palmtree } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-colors duration-300",
        scrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Palmtree className={cn("w-8 h-8 text-primary", scrolled ? "" : "text-white drop-shadow-md")} />
            <span className={cn("font-serif text-2xl font-bold tracking-tight", scrolled ? "text-foreground" : "text-white drop-shadow-md")}>
              Kanchu <span className="text-secondary">Tours</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "font-medium transition-colors hover:text-primary",
                    scrolled ? "text-foreground" : "text-white/90 hover:text-white drop-shadow-md",
                    isActive && "text-primary dark:text-primary-dark font-semibold drop-shadow-none"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/book"
              className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-semibold transition-transform hover:scale-105"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn("p-2", scrolled ? "text-foreground" : "text-white")}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 shadow-xl border-t border-slate-100 dark:border-slate-800"
          >
            <div className="flex flex-col px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "block px-3 py-3 rounded-md text-base font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/book"
                className="mt-4 w-full block text-center bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-md font-semibold"
              >
                Book Now
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
