import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Info, Compass, CheckCircle2, ArrowLeft } from "lucide-react";
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
    <div className="pt-20 pb-20 min-h-screen bg-white dark:bg-slate-950">
      
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
        
        <div className="absolute top-8 left-4 md:left-12 z-10 w-full max-w-7xl mx-auto">
          <Link href="/destinations" className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full transition-colors font-medium">
            <ArrowLeft className="w-5 h-5" /> Back to Destinations
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto flex flex-col items-start gap-4">
            <span className="bg-primary text-white text-sm font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
              {destination.category}
            </span>
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white drop-shadow-md">
              {destination.name}
            </h1>
            <p className="text-white/90 text-xl font-medium flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Sri Lanka
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <section>
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-primary" /> Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-300">
                <p className="leading-relaxed text-balance">
                  {destination.fullDescription}
                </p>
              </div>
            </section>

            {/* Activities */}
            <section>
              <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <Compass className="w-8 h-8 text-primary" /> Top Activities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.activities.map((activity, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-secondary shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200 font-medium">{activity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Travel Tips */}
            <section>
              <div className="bg-sand/30 dark:bg-sand-dark/10 p-8 rounded-2xl border border-sand dark:border-sand-dark/30">
                <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-4">
                  Travel Tips for {destination.name}
                </h3>
                <ul className="space-y-3">
                  {destination.travelTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                Plan Your Visit
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Ready to explore {destination.name}? Let us help you organize the perfect trip.
              </p>
              
              <Link 
                href={`/book?dest=${destination.id}`}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-primary/30"
              >
                Inquire Now
              </Link>
              
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400 text-center">
                Need help deciding? <br/>
                <Link href="/contact" className="text-primary font-medium hover:underline">Contact our travel experts</Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
