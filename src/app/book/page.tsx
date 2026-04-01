"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle } from "lucide-react";

function BookingForm() {
  const searchParams = useSearchParams();
  const preselectedDest = searchParams.get("dest") || "";
  const preselectedPkg = searchParams.get("package") || "";

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    people: "2",
    interest: preselectedPkg ? `Package: ${preselectedPkg}` : preselectedDest ? `Destination: ${preselectedDest}` : "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock successful submission
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-secondary" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4">Request Received!</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
          Thank you, {formData.name}. We have received your booking request and our travel experts will contact you shortly at {formData.email}.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name *</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address *</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="+1 234 567 890"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Estimated Travel Date *</label>
          <input 
            type="date" 
            id="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* People */}
        <div>
          <label htmlFor="people" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Number of Travelers</label>
          <select 
            id="people" 
            name="people"
            value={formData.people}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {[1,2,3,4,5,6,7,8,"9+"].map(num => <option key={num} value={num}>{num}</option>)}
          </select>
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="interest" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Primary Interest / Package</label>
          <input 
            type="text" 
            id="interest" 
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g. Budget Tour, Honeymoon, Wildlife"
          />
        </div>
      </div>

      {/* Message */}
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Additional Message or Requirements</label>
        <textarea 
          id="message" 
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us about any specific places you want to visit, dietary requirements, or special occasions..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold text-lg py-4 rounded-xl flex justify-center items-center gap-2 transition-colors shadow-lg shadow-primary/20"
      >
        <Send className="w-5 h-5" /> Send Booking Request
      </button>

      <p className="text-center text-sm text-slate-500 mt-6">
        No payment is required at this stage. We will contact you to confirm details and provide a quote.
      </p>
    </form>
  );
}

export default function BookPage() {
  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-4">
            Book Your <span className="text-primary">Adventure</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Fill out the form below and let us organize the perfect Sri Lankan holiday for you.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-20 animate-pulse text-slate-400">Loading form...</div>}>
          <BookingForm />
        </Suspense>
        
      </div>
    </div>
  );
}
