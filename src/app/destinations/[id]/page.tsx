import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Info, Compass, CheckCircle2, ArrowLeft, Lightbulb, Calendar } from "lucide-react";
import { destinations } from "@/data/destinations";

// Generate static params for all destinations
export async function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }));
}

export default async function DestinationRoute({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">

      {/* Full-bleed Hero */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover opacity-75"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />

        {/* Back button */}
        <div className="absolute top-28 left-0 right-0 px-8 lg:px-16 z-20">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 duration-200" />
            Back to Destinations
          </Link>
        </div>

        {/* Hero text — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-16 pb-12 z-20">
          <span className="inline-block bg-primary text-white text-[9px] font-black uppercase tracking-[0.25em] px-3 py-1 mb-4">
            {destination.category}
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-white mb-4">
            {destination.name}
          </h1>
          <p className="text-white/70 text-sm flex items-center gap-2 font-medium uppercase tracking-widest">
            <MapPin className="w-4 h-4 text-primary" /> Sri Lanka
          </p>
        </div>
      </div>

      {/* Page Body */}
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-1 items-start">

          {/* ── Main Content ── */}
          <div className="space-y-1">

            {/* Overview */}
            <div className="group relative border border-black/5 dark:border-white/8 hover:border-black/15 dark:hover:border-white/20 bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300 p-8 md:p-12">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-black/10 dark:border-white/15 flex items-center justify-center">
                  <Info className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/40">Overview</h2>
              </div>
              <p className="text-slate-600 dark:text-white/60 text-base leading-relaxed">
                {destination.fullDescription}
              </p>
            </div>

            {/* Top Activities */}
            <div className="group relative border border-black/5 dark:border-white/8 hover:border-black/15 dark:hover:border-white/20 bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300 p-8 md:p-12">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-black/10 dark:border-white/15 group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                  <Compass className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/40">Top Activities</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {destination.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 border border-black/5 dark:border-white/8 p-5 hover:border-black/15 dark:hover:border-white/20 transition-colors duration-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-white/70 text-sm font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="group relative border border-black/5 dark:border-white/8 hover:border-black/15 dark:hover:border-white/20 bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300 p-8 md:p-12">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 border border-black/10 dark:border-white/15 group-hover:border-primary flex items-center justify-center transition-colors duration-300">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/40">
                  Travel Tips for {destination.name}
                </h2>
              </div>
              <ul className="space-y-4">
                {destination.travelTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="mt-[7px] w-1.5 h-1.5 bg-primary shrink-0 rounded-full" />
                    <span className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="lg:sticky lg:top-28 space-y-1">

            {/* Plan Your Visit CTA */}
            <div className="relative border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-8 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-primary/5 rounded-full pointer-events-none" />

              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4 block">
                Ready to Go?
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight mb-3">
                Plan Your<br />
                <span className="text-primary">Visit</span>
              </h3>
              <p className="text-slate-500 dark:text-white/40 text-sm leading-relaxed mb-8">
                Ready to explore {destination.name}? Let us help you organize the perfect trip.
              </p>

              <Link
                href={`/book?dest=${destination.id}`}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest py-4 flex items-center justify-center gap-2 transition-colors duration-300 mb-4"
              >
                <Calendar className="w-4 h-4" />
                Inquire Now
              </Link>

              <div className="pt-4 border-t border-black/5 dark:border-white/8 text-center">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-white/30 mb-2">Need help deciding?</p>
                <Link
                  href="/contact"
                  className="text-xs font-black uppercase tracking-wider text-primary hover:text-primary-dark transition-colors"
                >
                  Contact our travel experts
                </Link>
              </div>
            </div>

            {/* Quick Info panel */}
            <div className="border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-8">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30 mb-5 block">
                Quick Info
              </span>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/8">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold">Category</span>
                  <span className="text-[10px] uppercase tracking-wider text-right font-black text-slate-900 dark:text-white">{destination.category}</span>
                </div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-black/5 dark:border-white/8">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold">Location</span>
                  <span className="text-[10px] uppercase tracking-wider text-right font-black text-slate-900 dark:text-white">Sri Lanka</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-white/40 font-bold">Activities</span>
                  <span className="text-[10px] uppercase tracking-wider text-right font-black text-primary">{destination.activities.length} Available</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
