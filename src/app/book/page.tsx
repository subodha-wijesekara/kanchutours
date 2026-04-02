"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Send, CheckCircle, User, Mail, Phone, Calendar, Users, Compass, MessageSquare } from "lucide-react";

// Shared input/label class helpers
const labelCls = "block text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/80 mb-2 flex items-center gap-2";
const inputCls  = "w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-slate-50 dark:focus:bg-white/8 transition-colors duration-300";
const selectCls = "w-full bg-white dark:bg-[#0d0d0d] border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base focus:outline-none focus:border-primary transition-colors duration-300 appearance-none cursor-pointer";

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedPkg  = searchParams.get("package") || "";
  const preselectedDest = searchParams.get("dest")    || "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name:     "",
    email:    "",
    phone:    "",
    date:     "",
    people:   "2",
    interest: preselectedPkg  ? `Package: ${preselectedPkg}`
             : preselectedDest ? `Destination: ${preselectedDest}`
             : "",
    message:  "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Booking request failed'}`);
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  /* ── Success state ── */
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-12 text-center relative"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
        <div className="w-16 h-16 border border-primary flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-3">
          Request <span className="text-primary">Received!</span>
        </h2>
        <p className="text-slate-500 dark:text-white/50 text-sm leading-relaxed max-w-md mx-auto mb-8">
          Thank you, <span className="text-slate-900 dark:text-white font-bold">{formData.name}</span>. We have received your
          booking request and our travel experts will contact you shortly at{" "}
          <span className="text-slate-900 dark:text-white font-bold">{formData.email}</span>.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest px-10 py-4 transition-colors duration-300"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  /* ── Form ── */
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none relative"
    >
      {/* Red left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary z-10" />

      <div className="p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

          {/* Full Name */}
          <div>
            <label htmlFor="name" className={labelCls}>
              <User className="w-3.5 h-3.5 text-primary" /> Full Name *
            </label>
            <input type="text" id="name" name="name" value={formData.name}
              onChange={handleChange} required className={inputCls} placeholder="John Doe" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelCls}>
              <Mail className="w-3.5 h-3.5 text-primary" /> Email Address *
            </label>
            <input type="email" id="email" name="email" value={formData.email}
              onChange={handleChange} required className={inputCls} placeholder="john@example.com" />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelCls}>
              <Phone className="w-3.5 h-3.5 text-primary" /> Phone Number
            </label>
            <input type="tel" id="phone" name="phone" value={formData.phone}
              onChange={handleChange} className={inputCls} placeholder="+1 234 567 890" />
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className={labelCls}>
              <Calendar className="w-3.5 h-3.5 text-primary" /> Estimated Travel Date *
            </label>
            <input type="date" id="date" name="date" value={formData.date}
              onChange={handleChange} required className={inputCls} />
          </div>

          {/* Travelers */}
          <div>
            <label htmlFor="people" className={labelCls}>
              <Users className="w-3.5 h-3.5 text-primary" /> Number of Travelers
            </label>
            <div className="relative">
              <select id="people" name="people" value={formData.people}
                onChange={handleChange} className={selectCls}>
                {[1,2,3,4,5,6,7,8,"9+"].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              {/* Custom chevron */}
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Interest */}
          <div>
            <label htmlFor="interest" className={labelCls}>
              <Compass className="w-3.5 h-3.5 text-primary" /> Primary Interest / Package
            </label>
            <input type="text" id="interest" name="interest" value={formData.interest}
              onChange={handleChange} className={inputCls}
              placeholder="e.g. Budget Tour, Honeymoon, Wildlife" />
          </div>
        </div>

        {/* Message */}
        <div className="mb-8">
          <label htmlFor="message" className={labelCls}>
            <MessageSquare className="w-3.5 h-3.5 text-primary" /> Additional Message or Requirements
          </label>
          <textarea id="message" name="message" rows={5} value={formData.message}
            onChange={handleChange} className={`${inputCls} resize-none`}
            placeholder="Tell us about any specific places you want to visit, dietary requirements, or special occasions..." />
        </div>

        {/* Submit */}
        <div className="border-t border-black/10 dark:border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest px-12 py-4 flex items-center gap-2 transition-colors duration-300"
          >
            <Send className="w-4 h-4" /> Send Booking Request
          </button>
          <p className="text-slate-500 dark:text-white/30 text-xs leading-relaxed">
            No payment required at this stage. We&apos;ll contact you to confirm details and provide a quote.
          </p>
        </div>
      </div>
    </motion.form>
  );
}

/* ── Page ── */
export default function BookPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">

      {/* Hero Header */}
      <div className="pt-36 pb-12 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
        >
          Kanchu Tours · Sri Lanka
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-slate-900 dark:text-white mb-8"
        >
          Book Your<br /><span className="text-primary">Adventure</span>
        </motion.h1>

        {/* Separator */}
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 relative my-8">
          <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 dark:text-white/40 text-sm tracking-wider max-w-xl"
        >
          Fill out the form below and let us organize the perfect Sri Lankan holiday for you.
        </motion.p>
      </div>

      {/* Form */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <Suspense fallback={
          <div className="border border-black/5 dark:border-white/8 p-20 text-center text-slate-400 dark:text-white/20 text-xs uppercase tracking-widest animate-pulse">
            Loading form...
          </div>
        }>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}
