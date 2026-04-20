import HeroSection from "@/components/Home/HeroSection";
import CategorySection from "@/components/Home/CategorySection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import TrustSection from "@/components/Home/TrustSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import CTASection from "@/components/Home/CTASection";

export default function Home() {
  return (
    <main className="page-wrapper">
      <HeroSection />
      <TrustSection />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
