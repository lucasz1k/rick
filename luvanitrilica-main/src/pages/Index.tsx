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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  useScrollAnimation();
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen viewport-safe overflow-x-hidden">
      <Header />
      
      {/* Admin Access Button - Only for authenticated users */}
      {!loading && user && (
        <div className="fixed top-16 sm:top-4 right-2 sm:right-4 z-50 lg:top-6 lg:right-6">
          <Link to="/auth">
            <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-brand px-2 sm:px-3 text-xs sm:text-sm">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      )}
      
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
