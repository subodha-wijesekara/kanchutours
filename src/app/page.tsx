import Hero from "@/components/home/Hero";
import SearchBanner from "@/components/home/SearchBanner";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBanner />
      <FeaturedDestinations />
      <Testimonials />
    </>
  );
}
