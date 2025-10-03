import React from 'react';
import { Sparkles, Zap, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SuperImage } from "@/components/ui/super-image";
import nitrileGlovesBanner from '@/assets/nitrile-gloves.jpg';

const CinematicBanner = () => {
  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="relative w-full section-padding-sm overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 scroll-animate">
      
      {/* Optimized Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-full blur-2xl opacity-60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12">
          
            {/* Left Content - Perfect 7/12 */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-10 scroll-animate-left text-center lg:text-left">
            
              {/* Header Section */}
              <div className="space-y-4 lg:space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-emerald-600 uppercase tracking-wide">Premium Quality</div>
                  <div className="text-lg font-bold text-slate-800">Inovação em Proteção</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black">
                  <div className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
                    Tecnologia
                  </div>
                  <div className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent leading-tight">
                    Avançada
                  </div>
                </h1>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-6 lg:space-y-7">
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                Desenvolvidas com polímeros de última geração para máxima 
                <span className="text-emerald-600 font-bold"> proteção e conforto</span> 
                em ambientes profissionais.
              </p>
              
              {/* Stats Grid - Perfectly Centered */}
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-border shadow-brand">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-warning to-destructive flex items-center justify-center">
                      <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-foreground">99%</div>
                    <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Resistência</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                      <Target className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-foreground">100%</div>
                    <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Precisão</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Sparkles className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-black text-foreground">A+</div>
                    <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Qualidade</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsApp}
                variant="cta-primary"
                size="lg"
                className="group w-full sm:w-auto text-lg px-8 py-4 h-auto"
              >
                <span className="mr-3">Descobrir Tecnologia</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Certificado ANVISA • Aprovado mundialmente</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Perfect 5/12 */}
          <div className="lg:col-span-5 relative flex justify-center scroll-animate-right">
            
            {/* Main Image Card */}
            <div className="relative bg-white/30 backdrop-blur-lg border border-white/30 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] max-w-xs sm:max-w-sm md:max-w-lg w-full mx-auto">
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                <SuperImage
                  src={nitrileGlovesBanner}
                  alt="Luvas Nitrílicas Premium GloveTec"
                  className="w-full h-full object-cover hover:scale-105 sm:hover:scale-110 transition-transform duration-700"
                  priority={false}
                  quality="high"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-emerald-500 text-white px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-bold shadow-lg text-xs sm:text-sm">
                Premium
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-white/90 backdrop-blur-sm text-slate-800 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl font-semibold shadow-lg border border-white/50 text-xs sm:text-sm">
                Certificado ANVISA
              </div>
            </div>

            {/* Simplified Decorative Elements */}
            <div className="absolute top-8 -left-4 w-8 h-8 lg:w-12 lg:h-12 bg-gradient-to-br from-primary/40 to-accent/40 rounded-full blur-sm opacity-60" />
            <div className="absolute bottom-8 -right-4 w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-br from-accent/40 to-secondary/40 rounded-full blur-sm opacity-60" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent" />
    </section>
  );
};

export default CinematicBanner;