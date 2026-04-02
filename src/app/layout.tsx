import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import VisitorTracker from "@/components/analytics/VisitorTracker";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanchu Tours | Discover the Beauty of Sri Lanka",
  description: "Explore the most beautiful destinations and exclusive tour packages in Sri Lanka.",
  keywords: ["Sri Lanka travel", "tours", "budget travel", "luxury honeymoon", "Sri Lanka packages"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-slate-50 dark:bg-black font-sans">
        <ThemeProvider>
          <VisitorTracker />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
