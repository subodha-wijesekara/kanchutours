"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          if (email.toLowerCase() === 'wijesekararsc@gmail.com') {
            router.push("/admin/login");
          }
        }, 3000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-6 font-sans transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 md:p-12 relative shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-primary" />
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
              Admin <span className="text-primary italic">Registration</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 dark:text-white/30">
              Kanchu Tours · Sri Lanka
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 border-2 border-primary flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-4 text-slate-900 dark:text-white">
                Registration Successful!
              </h2>
              <p className="text-slate-500 dark:text-white/40 text-[10px] font-black uppercase tracking-widest max-w-[250px] mx-auto leading-relaxed">
                {email.toLowerCase() === 'wijesekararsc@gmail.com' 
                  ? "Welcome Super Admin. Redirecting to login..." 
                  : "Your account is pending approval by the Super Admin."}
              </p>
              <div className="mt-8">
                <Link 
                  href="/admin/login" 
                  className="bg-primary hover:bg-primary-dark text-white font-black text-[10px] uppercase tracking-[0.2em] px-8 py-4 transition-all"
                >
                  Return to Login
                </Link>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 flex items-center gap-2">
                  <Mail className="w-3 h-3 text-primary" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors text-sm placeholder:text-slate-300 dark:placeholder:text-white/10"
                  placeholder="admin@kanchutours.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40 mb-2 flex items-center gap-2">
                  <Lock className="w-3 h-3 text-primary" /> Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent dark:bg-white/5 border border-black/15 dark:border-white/15 px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors text-sm"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-[10px] font-black uppercase tracking-wider text-center"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs uppercase tracking-[0.2em] py-4 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Register Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 text-center">
            <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest">
              Already have an account?{" "}
              <Link href="/admin/login" className="text-primary hover:underline font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
