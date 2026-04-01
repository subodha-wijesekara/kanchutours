"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, DollarSign } from "lucide-react";

export default function SearchBanner() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [month, setMonth] = useState("");
  const [budget, setBudget] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/packages?dest=${destination}`);
  };

  return (
    <div className="w-full z-20 px-8 lg:px-16 max-w-[1400px] mx-auto -mt-24 pb-24 relative">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Destination */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em] flex items-center gap-2">
              <MapPin className="w-3 h-3 text-primary" /> Destination
            </label>
            <select 
              title="Select Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white/8 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer transition-colors"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <option value="" className="bg-zinc-900">Anywhere</option>
              <option value="sigiriya" className="bg-zinc-900">Sigiriya</option>
              <option value="ella" className="bg-zinc-900">Ella</option>
              <option value="kandy" className="bg-zinc-900">Kandy</option>
              <option value="galle" className="bg-zinc-900">Galle</option>
              <option value="yala" className="bg-zinc-900">Yala</option>
            </select>
          </div>

          {/* Date / Month */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em] flex items-center gap-2">
              <Calendar className="w-3 h-3 text-primary" /> Month
            </label>
            <select 
              title="Select Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer transition-colors"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <option value="" className="bg-zinc-900">Any Month</option>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <option key={m} value={m} className="bg-zinc-900">{m}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-white/60 uppercase tracking-[0.15em] flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-primary" /> Budget
            </label>
            <select 
              title="Select Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 appearance-none cursor-pointer transition-colors"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <option value="" className="bg-zinc-900">Any Budget</option>
              <option value="low" className="bg-zinc-900">Under $500</option>
              <option value="medium" className="bg-zinc-900">$500 - $1500</option>
              <option value="high" className="bg-zinc-900">Over $1500</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-3 font-bold text-sm transition-all hover:scale-[1.02] flex justify-center items-center gap-2 tracking-wider uppercase"
          >
            <Search className="w-4 h-4" />
            Find Tour
          </button>
          
        </form>
      </div>
    </div>
  );
}
