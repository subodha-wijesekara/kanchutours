import Image from "next/image";
import { CheckCircle2, Route, HeartHandshake, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1 relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/kandy_temple_1775030099483.png"
              alt="Sri Lanka Cultural Heritage"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-6">
              Your Journey to the Pearl of the Indian Ocean
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              At Kanchu Tours, we believe that travel is more than just visiting a place—it’s about immersing yourself in the culture, connecting with the locals, and creating memories that last a lifetime.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              We are a team of passionate Sri Lankans dedicated to showing the world the true beauty of our island. With years of experience and deep local knowledge, we craft authentic travel experiences from sun-kissed beaches to misty mountains and ancient ruins.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Kanchu Tours
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              We go above and beyond to ensure your Sri Lankan adventure is safe, comfortable, and absolutely unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Route className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Tailored Itineraries</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Every traveler is unique. We customize your tour based on your personal interests, pace, and budget.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-center">
              <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Safe & Reliable</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your safety is our priority. We work only with licensed guides and highly maintained vehicles.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 text-center">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Local Expertise</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Our guides are locals who know the hidden gems, authentic local eateries, and off-the-beaten-path spots.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-primary text-white rounded-3xl p-8 md:p-16 mb-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed text-lg">
                To provide exceptional and sustainable travel experiences that showcase the unparalleled beauty, rich heritage, and vibrant culture of Sri Lanka, while supporting local communities.
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-serif font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed text-lg">
                To be the most trusted and sought-after travel partner in Sri Lanka, recognized for our commitment to quality, authenticity, and environmental responsibility.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
