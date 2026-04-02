"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Palmtree, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme-provider";

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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-black/5 dark:border-white/8"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Palmtree className="w-7 h-7 text-primary" />
            <span className={cn(
              "font-black text-xl uppercase tracking-tight transition-colors",
              scrolled ? "text-slate-900 dark:text-white" : "text-white"
            )}>
              Kanchu <span className="text-primary">Tours</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              
              /* In light mode when Scrolled, text must be blackish. But if transparent, must be white. Dark mode always white. */
              const linkColorObj = scrolled
                ? "text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white"
                : "text-white/80 hover:text-white drop-shadow-md";

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium uppercase tracking-wider transition-colors duration-200",
                    isActive
                      ? "text-primary dark:text-primary drop-shadow-none"
                      : linkColorObj
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/book"
              className="bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-widest px-6 py-2.5 transition-colors duration-300"
            >
              Book Now
            </Link>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn(
                "ml-2 w-10 h-10 flex items-center justify-center transition-colors duration-200",
                scrolled ? "text-slate-600 hover:text-slate-900 dark:text-white/60 dark:hover:text-white" : "text-white/80 hover:text-white drop-shadow-md"
              )}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={cn("p-2 transition-colors", scrolled ? "text-slate-600 dark:text-white/70" : "text-white")}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn("p-2 transition-colors", scrolled ? "text-slate-600 dark:text-white/70" : "text-white/70 hover:text-white")}
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
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 pt-4 pb-8 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "block px-3 py-3 text-sm font-medium uppercase tracking-wider transition-colors duration-200 border-b border-black/5 dark:border-white/5",
                      isActive
                        ? "text-primary"
                        : "text-slate-600 hover:text-slate-900 dark:text-white/50 dark:hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/book"
                className="mt-4 block text-center bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-widest px-5 py-3.5 transition-colors duration-300"
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
