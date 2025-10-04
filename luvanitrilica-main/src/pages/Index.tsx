import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import VisualGallery from "@/components/VisualGallery";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SectionDivider from "@/components/SectionDivider";
import CinematicBanner from "@/components/CinematicBanner";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen viewport-safe overflow-x-hidden">
      <Header />
      
      <section id="hero" className="scroll-animate"><Hero /></section>
      
      {/* Strategic divider after hero - reduced */}
      <SectionDivider variant="wave" className="divider-optimized opacity-60" />
      
      <section id="benefits" className="scroll-animate-left container-responsive section-padding-sm">
        <Benefits />
      </section>
      
      <section id="products" className="scroll-animate-scale container-responsive section-padding">
        <Products />
      </section>
      
      <CinematicBanner />
      
      {/* Strategic divider in middle - subtle */}
      <SectionDivider variant="curve" flip className="divider-optimized opacity-40" />
      
      <section id="gallery" className="scroll-animate-right container-responsive section-padding-sm">
        <VisualGallery />
      </section>
      
      <section className="scroll-animate-left container-responsive section-padding-sm">
        <Partners />
      </section>
      
      <section id="testimonials" className="scroll-animate-scale container-responsive section-padding">
        <Testimonials />
      </section>
      
      <section className="scroll-animate-right container-responsive section-padding-sm">
        <FAQ />
      </section>
      
      <section id="contact" className="scroll-animate-left container-responsive section-padding">
        <Contact />
      </section>
      
      {/* Strategic divider before footer - very subtle */}
      <SectionDivider variant="gradient" className="divider-optimized opacity-30" />
      
      <Footer />
      
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
