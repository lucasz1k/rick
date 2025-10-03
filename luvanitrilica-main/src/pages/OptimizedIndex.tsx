import React from 'react';
import { useOptimizedScrollAnimation } from '@/hooks/useOptimizedScrollAnimation';

// Critical above-the-fold components (loaded immediately)
import Header from '@/components/Header';
import Hero from '@/components/Hero';

// Import components directly to avoid lazy loading issues
import Benefits from '@/components/OptimizedBenefits';
import Products from '@/components/Products';
import VisualGallery from '@/components/VisualGallery';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';



const OptimizedIndex = () => {
  useOptimizedScrollAnimation({ enableOnMobile: false });

  return (
    <div className="min-h-screen bg-background">
      {/* Direct imports for debugging */}
      <Header />
      
      <main>
        <div id="hero">
          <Hero />
        </div>

        <div id="benefits">
          <Benefits />
        </div>

        <div id="products">
          <Products />
        </div>

        <div id="gallery">
          <VisualGallery />
        </div>

        <Partners />

        <div id="testimonials">
          <Testimonials />
        </div>

        <FAQ />

        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />

      {/* Float components load last */}
      <WhatsAppFloat />
    </div>
  );
};

export default OptimizedIndex;