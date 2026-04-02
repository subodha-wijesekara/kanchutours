"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: MapPin,
      label: "Our Office",
      lines: ["123 Galle Road,", "Colombo 03,", "Sri Lanka."],
    },
    {
      icon: Phone,
      label: "Phone & WhatsApp",
      lines: ["+94 77 123 4567", "Available 24/7 for emergencies."],
    },
    {
      icon: Mail,
      label: "Email",
      lines: ["hello@kanchutours.com", "bookings@kanchutours.com"],
    },
  ];

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
          Get In<br /><span className="text-primary">Touch</span>
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
          Have questions about a tour? Need a custom itinerary? We are here to
          help you plan your dream vacation.
        </motion.p>
      </div>

      {/* Content */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">

          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-8 md:p-10 relative group"
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />

            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 mb-8">
              Contact Information
            </h3>

            <div className="space-y-8">
              {contactItems.map(({ icon: Icon, label, lines }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-5"
                >
                  <div className="w-10 h-10 border border-black/10 dark:border-white/15 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-1">
                      {label}
                    </h4>
                    {lines.map((line, j) => (
                      <p key={j} className="text-slate-500 dark:text-white/40 text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Follow Us */}
            <div className="mt-10 pt-8 border-t border-black/5 dark:border-white/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 mb-5">
                Follow Us
              </h4>
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  className="w-10 h-10 border border-black/10 dark:border-white/15 hover:border-primary hover:bg-primary flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href="#"
                  className="w-10 h-10 border border-black/10 dark:border-white/15 hover:border-primary hover:bg-primary flex items-center justify-center text-slate-400 dark:text-white/40 hover:text-white transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-8 md:p-10 relative"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-white/40 mb-8">
              Send Us a Message
            </h3>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-black/10 dark:border-white/15 p-8 text-center"
              >
                <div className="w-12 h-12 border border-primary flex items-center justify-center mx-auto mb-4">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white mb-2">
                  Message Sent!
                </h4>
                <p className="text-slate-500 dark:text-white/40 text-sm mb-6">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="text-xs font-black uppercase tracking-widest text-primary hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1 mx-auto"
                >
                  Send another message <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/80 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-slate-50 dark:focus:bg-white/8 transition-colors duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/80 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-slate-50 dark:focus:bg-white/8 transition-colors duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/80 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-slate-50 dark:focus:bg-white/8 transition-colors duration-300"
                    placeholder="Custom Tour Inquiry"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-black uppercase tracking-[0.2em] text-slate-600 dark:text-white/80 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white text-base placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none focus:border-primary focus:bg-slate-50 dark:focus:bg-white/8 transition-colors duration-300 resize-none"
                    placeholder="Tell us about your travel plans..."
                  />
                </div>

                <div className="pt-2 border-t border-black/10 dark:border-white/10 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 sm:flex-none bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-widest px-10 py-4 flex items-center justify-center gap-2 transition-colors duration-300"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
