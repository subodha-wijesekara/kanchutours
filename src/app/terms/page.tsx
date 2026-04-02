"use client";

import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle,
  XCircle,
  CreditCard,
  AlertTriangle,
  Globe,
  Scale,
  RefreshCw,
  Mail,
} from "lucide-react";

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
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      "By accessing or using this website and any services provided by Kanchu Tours (referred to as 'we', 'us', or 'our'), you confirm that you are at least 18 years of age and agree to be bound by these Terms of Service.",
      "If you do not agree to these Terms, please discontinue use of our website and services immediately. We reserve the right to update these Terms at any time without prior notice.",
    ],
  },
  {
    number: "02",
    icon: CheckCircle,
    title: "Use of Our Services",
    content: [
      "Our services are intended for personal, non-commercial use. When using our website and booking services, you agree to:",
    ],
    bullets: [
      "Provide accurate, current, and complete information at all times.",
      "Not reproduce, duplicate, copy, sell, or exploit any portion of our services without express written permission.",
      "Not use our services to engage in unlawful, fraudulent, or harmful activities.",
      "Not interfere with or disrupt the integrity or performance of our platform.",
      "Not attempt to gain unauthorized access to any server, database, or system.",
    ],
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Bookings & Payments",
    content: [
      "All tour bookings are subject to availability and confirmed only upon receipt of a non-refundable deposit unless stated otherwise in your specific package agreement.",
    ],
    bullets: [
      "Full payment must be received no later than 30 days prior to your tour departure date.",
      "Bookings made within 30 days of departure require full payment at the time of confirmation.",
      "We accept major credit/debit cards and bank transfers. All transactions are processed securely.",
      "Prices are quoted in USD unless otherwise specified and are subject to change without notice before booking confirmation.",
      "A booking confirmation email constitutes your official receipt. Please retain this for your records.",
    ],
  },
  {
    number: "04",
    icon: RefreshCw,
    title: "Cancellations & Refunds",
    content: [
      "We understand that travel plans can change. Our cancellation policy is structured to be fair to both our customers and our operations:",
    ],
    bullets: [
      "60+ days before departure: Full refund minus the non-refundable deposit.",
      "30–59 days before departure: 50% refund of the total package price.",
      "15–29 days before departure: 25% refund of the total package price.",
      "Less than 15 days before departure: No refund. However, rescheduling may be arranged at our discretion.",
      "No-shows without prior notification are non-refundable.",
    ],
  },
  {
    number: "05",
    icon: Globe,
    title: "Travel Requirements",
    content: [
      "It is the full responsibility of each traveler to ensure they meet all applicable entry, visa, and health requirements for Sri Lanka and any transit countries.",
    ],
    bullets: [
      "Valid passport with at least 6 months remaining validity from the date of travel.",
      "Valid Sri Lanka Electronic Travel Authorization (ETA) or appropriate visa.",
      "Compliance with any mandatory vaccinations or health screenings in force at time of travel.",
      "Adequate travel insurance including medical coverage is strongly recommended.",
      "Kanchu Tours accepts no liability for denied entry or deportation due to document non-compliance.",
    ],
  },
  {
    number: "06",
    icon: AlertTriangle,
    title: "Liability & Disclaimers",
    content: [
      "Kanchu Tours acts as a facilitator of travel experiences and works with third-party operators, accommodation providers, and transport companies. While we exercise due diligence in selecting our partners, we cannot accept responsibility for:",
    ],
    bullets: [
      "Acts of God, natural disasters, extreme weather, or force majeure events.",
      "Delays, cancellations, or changes made by airlines, hotels, or third-party operators.",
      "Personal injury, illness, loss, or damage to property during the tour.",
      "Political unrest, strikes, government actions, or events beyond our reasonable control.",
      "Any indirect, incidental, or consequential damages arising from the use of our services.",
    ],
  },
  {
    number: "07",
    icon: XCircle,
    title: "Prohibited Conduct",
    content: [
      "To ensure a safe and respectful experience for all our clients, guides, and local communities, the following conduct is strictly prohibited:",
    ],
    bullets: [
      "Harassment, discrimination, or disrespectful behavior toward staff, guides, or fellow travelers.",
      "Damage to cultural sites, wildlife habitats, or natural environments.",
      "Possession or use of illegal substances during any Kanchu Tours program.",
      "Recording and publishing content that misrepresents our services or Sri Lanka negatively.",
      "Engaging in unauthorized commercial activities during our tours.",
    ],
  },
  {
    number: "08",
    icon: Scale,
    title: "Governing Law",
    content: [
      "These Terms of Service shall be governed by and construed in accordance with the laws of the Democratic Socialist Republic of Sri Lanka.",
      "Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka. If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.",
    ],
  },
  {
    number: "09",
    icon: Mail,
    title: "Contact Us",
    content: [
      "If you have any questions, concerns, or require clarification on any part of these Terms of Service, please reach out to our team:",
    ],
    bullets: [
      "Email: legal@kanchutours.com",
      "Phone: +94 77 123 4567",
      "Address: 123 Galle Road, Colombo 03, Sri Lanka",
    ],
  },
];

export default function TermsPage() {
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
          Terms of<br /><span className="text-primary">Service</span>
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
          Please read these Terms of Service carefully before using the Kanchu Tours website or booking any of our
          travel services. These Terms govern your use of our platform and form a legally binding agreement between
          you and Kanchu Tours. Your continued use of our services constitutes acceptance of these Terms.
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

          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-4">Need Help?</p>
          <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-tight text-slate-900 dark:text-white mb-4">
            Questions About<br /><span className="text-primary">Our Terms?</span>
          </h3>
          <p className="text-slate-600 dark:text-white/50 text-sm leading-relaxed max-w-xl mb-8">
            Our team is always available to walk you through any aspect of our Terms of Service. We believe in full transparency — reach out and we&apos;ll be happy to help.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 transition-colors duration-300"
            >
              <Mail className="w-4 h-4" />
              Contact Us
            </a>
            <a
              href="/privacy"
              className="inline-flex items-center gap-3 border border-black/10 dark:border-white/15 text-slate-700 dark:text-white/70 hover:border-primary hover:text-primary text-xs font-black uppercase tracking-widest px-8 py-3.5 transition-colors duration-300"
            >
              <FileText className="w-4 h-4" />
              Privacy Policy
            </a>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
