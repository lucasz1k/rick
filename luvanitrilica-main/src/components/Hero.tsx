import React from "react";
import { Shield, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { SuperImage } from "@/components/ui/super-image";
import heroGloves3D from "@/assets/hero-gloves-3d.jpg";
const Hero = React.memo(() => {
  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  const handleScrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  const trustBadge = <div className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-400 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-semibold mx-auto lg:mx-0">
      <Shield className="w-4 h-4" />
      Certificação ANVISA Garantida
    </div>;
  const heroTitle = <div className="space-y-3 md:space-y-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] sm:leading-tight">
        <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent block">
          Luvas Descartáveis
        </span>
        <span className="bg-gradient-to-r from-accent via-accent-foreground to-accent bg-clip-text text-transparent block mt-1 md:mt-2">
          Certificadas ANVISA
        </span>
      </h1>
      <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-accent to-accent-foreground rounded-full mx-auto lg:mx-0" />
    </div>;
  const heroDescription = <p className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-md md:max-w-lg mx-auto lg:mx-0">
      Proteção profissional para restaurantes, clínicas e indústrias com entrega em 24h para São Paulo. 
      <span className="text-accent font-semibold"> 
Mais de 500 empresas confiam na GloveTec.</span>
    </p>;
  const ctaButtons = <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-3 md:pt-4 justify-center lg:justify-start w-full">
      <Button onClick={handleWhatsApp} variant="cta-primary" size="lg" className="group flex items-center justify-center gap-3 w-full sm:flex-1 sm:max-w-xs h-14 sm:h-12">
        <span className="text-xl">💬</span>
        <span className="text-base sm:text-lg">Receber Orçamento em 5min</span>
      </Button>
      
      <Button variant="default" size="lg" className="w-full sm:flex-1 sm:max-w-xs h-14 sm:h-12" onClick={handleScrollToProducts}>
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
          </svg>
          <span className="text-base sm:text-lg">Ver Preços</span>
        </div>
      </Button>
    </div>;
  const statsData = [{
    icon: Star,
    value: "4.9★",
    label: "Avaliação dos Clientes"
  }, {
    icon: Users,
    value: "500+",
    label: "Empresas Atendidas"
  }, {
    icon: Clock,
    value: "24h",
    label: "Entrega Expressa"
  }, {
    icon: Shield,
    value: "98%",
    label: "Taxa de Recompra"
  }];
  const statsSection = <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl sm:rounded-[2rem] p-3 sm:p-4 md:p-6 shadow-2xl hover:bg-white/15 transition-all duration-500 max-w-md sm:max-w-lg mx-auto overflow-hidden">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {statsData.map((stat, index) => <StatsCard key={index} icon={stat.icon} value={stat.value} label={stat.label} index={index} />)}
      </div>
    </div>;
  return <section className="relative min-h-[60vh] lg:min-h-[70vh] overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background with optimized image */}
      <SuperImage 
        src={heroGloves3D} 
        alt="Luvas descartáveis profissionais de alta qualidade GloveTec" 
        className="absolute inset-0 w-full h-full object-cover" 
        priority={true} 
        quality="high" 
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Background pattern - Mobile optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center">
        <div className="container mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 py-8 lg:py-12">
            
            {/* Content Section - Left Side - Perfect 7/12 */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left order-1 lg:order-1">
              <div className="text-center lg:text-left space-y-4 md:space-y-6 scroll-animate">
                
                {/* Trust Badge */}
                <div className="flex justify-center lg:justify-start">
                  {trustBadge}
                </div>
                
                {/* Hero Title */}
                <div className="space-y-4">
                  {heroTitle}
                </div>
                
                {/* Description */}
                <div className="flex justify-center lg:justify-start">
                  <div className="max-w-lg">
                    {heroDescription}
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex justify-center lg:justify-start">
                  <div className="w-full max-w-md lg:max-w-none">
                    {ctaButtons}
                  </div>
                </div>
                
              </div>
            </div>

            {/* Stats Section - Right Side - Limpo e Legível */}
            <div className="lg:col-span-5 order-2 lg:order-2 flex justify-center">
              <div className="w-full max-w-md scroll-animate-right">
                {statsSection}
              </div>
            </div>
            
          </div>
        </div>
      </div>

    </section>;
});
Hero.displayName = 'Hero';
export default Hero;