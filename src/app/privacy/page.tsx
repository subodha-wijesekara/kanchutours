"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Share2, Bell, Mail, RefreshCw, UserCheck } from "lucide-react";

const LAST_UPDATED = "April 2, 2025";

interface Section {
  number: string;
  icon: React.ElementType;
  title: string;
  content: string[];
  bullets?: string[];
}

const SECTIONS: Section[] = [
  {
    number: "01",
    icon: Eye,
    title: "Information We Collect",
    content: [
      "When you use Kanchu Tours, we may collect certain personal information to provide you with a seamless and personalized travel experience.",
    ],
    bullets: [
      "Full name, email address, and phone number when you submit an inquiry or booking request.",
      "Travel preferences including destinations, travel dates, budget range, and group size.",
      "Payment details processed securely via our third-party payment partners — we do not store card data.",
      "Usage data such as pages visited, time spent on our site, and browser type, collected via cookies.",
      "Messages and communication history when you contact our support team.",
    ],
  },
  {
    number: "02",
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      "We use the information we collect solely to operate, improve, and personalize our services. We are committed to transparency in every step.",
    ],
    bullets: [
      "To process and confirm your tour bookings and travel itineraries.",
      "To communicate important updates, booking confirmations, and travel advisories.",
      "To improve our website experience and tailor content to your interests.",
      "To comply with legal obligations and resolve disputes.",
      "To send periodic newsletters or promotions — you may opt out at any time.",
    ],
  },
  {
    number: "03",
    icon: Share2,
    title: "Sharing Your Information",
    content: [
      "We respect your privacy and do not sell, rent, or trade your personal data. In limited circumstances, we may share information with trusted partners.",
    ],
    bullets: [
      "Local tour operators and guides necessary to fulfill your bookings.",
      "Secure payment gateways for processing transactions.",
      "Government or law enforcement if required by applicable Sri Lankan or international law.",
      "Analytics providers (e.g., Google Analytics) under strict data processing agreements.",
    ],
  },
  {
    number: "04",
    icon: Shield,
    title: "Data Security",
    content: [
      "We take the security of your personal data seriously. We implement industry-standard technical and organisational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.",
      "While we strive to use commercially acceptable means to protect your personal data, no method of transmission over the internet or method of electronic storage is 100% secure.",
    ],
  },
  {
    number: "05",
    icon: Bell,
    title: "Cookies & Tracking",
    content: [
      "Our website uses cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from.",
    ],
    bullets: [
      "Essential cookies — required for core site functionality such as navigation.",
      "Analytics cookies — help us understand how visitors interact with the website.",
      "Preference cookies — remember your settings such as language and theme.",
    ],
  },
  {
    number: "06",
    icon: UserCheck,
    title: "Your Rights",
    content: [
      "You have full rights over your personal data. You may contact us at any time to exercise the following:",
    ],
    bullets: [
      "Request access to the personal data we hold about you.",
      "Request correction of any inaccurate or incomplete information.",
      "Request deletion of your personal data (subject to legal obligations).",
      "Withdraw consent for marketing communications at any time.",
      "Lodge a complaint with your applicable data protection authority.",
    ],
  },
  {
    number: "07",
    icon: RefreshCw,
    title: "Policy Updates",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you via email or by posting a prominent notice on our website.",
      "We encourage you to review this page periodically. Continued use of our services after any modification constitutes your acceptance of the updated policy.",
    ],
  },
  {
    number: "08",
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact our Privacy Officer:",
    ],
    bullets: [
      "Email: privacy@kanchutours.com",
      "Phone: +94 77 123 4567",
      "Address: 123 Galle Road, Colombo 03, Sri Lanka",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white font-sans transition-colors duration-300">

      {/* Page Header */}
      <div className="pt-36 pb-12 px-8 lg:px-16 max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/40 mb-4"
        >
          Kanchu Tours · Legal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-[90px] font-black uppercase tracking-tighter leading-[0.9] text-slate-900 dark:text-white mb-4"
        >
          Privacy<br /><span className="text-primary">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-slate-500 dark:text-white/40 mt-4"
        >
          Last updated: {LAST_UPDATED}
        </motion.p>

        {/* Separator */}
        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 relative my-8">
          <div className="absolute left-0 top-0 h-[1px] w-32 bg-primary/60" />
        </div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl text-slate-600 dark:text-white/50 text-base leading-relaxed"
        >
          At Kanchu Tours, your privacy is of the utmost importance to us. This Privacy Policy explains how we collect,
          use, and safeguard your personal information when you visit our website or book our tour services. By using
          our services, you agree to the practices described in this document.
        </motion.p>
      </div>

      {/* Section Grid */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24 space-y-1">
        {SECTIONS.map(({ number, icon: Icon, title, content, bullets }, i) => (
          <motion.div
            key={number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="group relative border border-black/5 dark:border-white/8 hover:border-black/15 dark:hover:border-white/20 bg-white dark:bg-transparent shadow-sm dark:shadow-none transition-colors duration-300"
          >
            {/* Left red accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/30 group-hover:bg-primary transition-colors duration-400" />

            <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">

              {/* Left Column — number + icon + title */}
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">
                  {number}
                </span>
                <div className="w-12 h-12 border border-black/10 dark:border-white/15 flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-tight">
                  {title}
                </h2>
              </div>

              {/* Right Column — content */}
              <div className="space-y-4">
                {content.map((para, pi) => (
                  <p key={pi} className="text-slate-600 dark:text-white/50 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
                {bullets && bullets.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {bullets.map((bullet, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-sm text-slate-600 dark:text-white/50">
                        <span className="mt-[5px] w-1.5 h-1.5 bg-primary shrink-0 rounded-full" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="px-8 lg:px-16 max-w-[1400px] mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-black/5 dark:border-white/8 bg-white dark:bg-transparent shadow-sm dark:shadow-none p-10 md:p-14 relative overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-primary/5 rounded-full pointer-events-none" />

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Questions?</p>
          <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-tight text-slate-900 dark:text-white mb-4">
            We&apos;re Here<br /><span className="text-primary">To Help</span>
          </h3>
          <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed max-w-xl mb-8">
            If you have any questions about how we handle your data or anything else in this policy, don&apos;t hesitate to reach out. Our team is happy to clarify.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 transition-colors duration-300"
          >
            <Mail className="w-4 h-4" />
            Get In Touch
          </a>
        </motion.div>
      </div>

    </div>
  );
}
