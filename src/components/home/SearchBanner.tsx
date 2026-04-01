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
    <div className="relative -mt-16 sm:-mt-24 z-20 px-4 w-full max-w-6xl mx-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 md:p-8">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          
          {/* Destination */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> Destination
            </label>
            <div className="relative">
              <select 
                title="Select Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border focus:ring-primary border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 appearance-none"
              >
                <option value="">Anywhere</option>
                <option value="sigiriya">Sigiriya</option>
                <option value="ella">Ella</option>
                <option value="kandy">Kandy</option>
                <option value="galle">Galle</option>
                <option value="yala">Yala</option>
              </select>
            </div>
          </div>

          {/* Date / Month */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Month
            </label>
            <select 
              title="Select Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">Any Month</option>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" /> Budget
            </label>
            <select 
              title="Select Budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            >
              <option value="">Any Budget</option>
              <option value="low">Under $500</option>
              <option value="medium">$500 - $1500</option>
              <option value="high">Over $1500</option>
            </select>
          </div>

          {/* Search Button */}
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-3 font-semibold transition-colors flex justify-center items-center gap-2 h-[50px]"
          >
            <Search className="w-5 h-5" />
            Find Tour
          </button>
          
        </form>
      </div>
    </div>
  );
}
