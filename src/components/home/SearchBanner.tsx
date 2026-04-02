"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Calendar, DollarSign, ChevronDown } from "lucide-react";

/* ── Custom Dropdown ── */
type DropdownOption = { value: string; label: string };

function CustomDropdown({
  icon: Icon,
  label,
  options,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="flex flex-col gap-2" ref={ref}>
      {/* Label */}
      <label className="text-[10px] font-black text-slate-500 dark:text-white/80 uppercase tracking-[0.2em] flex items-center gap-2">
        <Icon className="w-3 h-3 text-primary" />
        {label}
      </label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full bg-transparent dark:bg-white/5 border px-4 py-3 text-slate-900 dark:text-white text-sm text-left flex items-center justify-between transition-colors duration-200 ${
          open ? "border-primary" : "border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30"
        }`}
      >
        <span className={value ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-white/40"}>{selected.label}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 dark:text-white/40 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {/* Options list */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-black border border-black/15 dark:border-white/15 border-t-primary shadow-xl shadow-black/5 dark:shadow-black/60">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
                opt.value === value
                  ? "bg-primary text-white font-bold"
                  : "text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/8 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Options data ── */
const DESTINATIONS: DropdownOption[] = [
  { value: "",         label: "Anywhere"  },
  { value: "sigiriya", label: "Sigiriya"  },
  { value: "ella",     label: "Ella"      },
  { value: "kandy",    label: "Kandy"     },
  { value: "galle",    label: "Galle"     },
  { value: "yala",     label: "Yala"      },
];

const MONTHS: DropdownOption[] = [
  { value: "", label: "Any Month" },
  ...["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    .map((m) => ({ value: m, label: m })),
];

const BUDGETS: DropdownOption[] = [
  { value: "",       label: "Any Budget"   },
  { value: "low",    label: "Under $500"   },
  { value: "medium", label: "$500 – $1500" },
  { value: "high",   label: "Over $1500"   },
];

/* ── Main component ── */
export default function SearchBanner() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [month, setMonth]             = useState("");
  const [budget, setBudget]           = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/packages?dest=${destination}`);
  };

  return (
    <div className="w-full z-20 px-8 lg:px-16 max-w-[1400px] mx-auto -mt-24 pb-24 relative">
      <div className="bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-black/10 dark:border-white/10 border-t-2 border-t-primary shadow-sm dark:shadow-none">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-0 items-end divide-y md:divide-y-0 md:divide-x divide-black/5 dark:divide-white/8"
        >
          {/* Destination */}
          <div className="relative p-5">
            <CustomDropdown
              icon={MapPin}
              label="Destination"
              options={DESTINATIONS}
              value={destination}
              onChange={setDestination}
            />
          </div>

          {/* Month */}
          <div className="relative p-5">
            <CustomDropdown
              icon={Calendar}
              label="Month"
              options={MONTHS}
              value={month}
              onChange={setMonth}
            />
          </div>

          {/* Budget */}
          <div className="relative p-5">
            <CustomDropdown
              icon={DollarSign}
              label="Budget"
              options={BUDGETS}
              value={budget}
              onChange={setBudget}
            />
          </div>

          {/* Search Button */}
          <div className="p-5">
            <label className="text-[10px] font-black text-transparent uppercase tracking-[0.2em] mb-2 block select-none">
              &nbsp;
            </label>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 font-black text-xs uppercase tracking-widest transition-colors duration-300 flex justify-center items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Find Tour
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
