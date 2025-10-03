import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Droplets, Clock, CheckCircle } from "lucide-react";
import { SuperImage } from "@/components/ui/super-image";
import professionalGlovesImage from "@/assets/hero-professional-gloves.jpg";

interface BenefitItem {
  icon: React.ReactElement;
  title: string;
  description: string;
}

const OptimizedBenefits = memo(() => {
  const benefits: BenefitItem[] = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Certificação ANVISA",
      description: "Aprovação oficial para uso médico e alimentício com máxima segurança"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Entrega em 24h", 
      description: "Estoque sempre disponível em São Paulo para entregas expressas"
    },
    {
      icon: <Droplets className="h-8 w-8" />,
      title: "Resistência Comprovada",
      description: "Testadas contra óleos, ácidos e perfurações em laboratório"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Melhor Custo-Benefício",
      description: "Preços competitivos para compras recorrentes e alto volume"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full font-semibold text-sm mb-6 border border-primary/20">
            <Shield className="h-4 w-4" />
            Vantagens Exclusivas
          </div>
          
          <h2 className="text-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Por que Escolher a
            <span className="block text-primary mt-2">GloveTec?</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          
          <p className="text-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Oferecemos a combinação perfeita de segurança, qualidade e praticidade para 
            atender às necessidades dos mais diversos segmentos profissionais.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Benefits Cards - Left Side */}
          <div className="space-y-4 md:space-y-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index} 
                className="group bg-card/80 backdrop-blur-sm border-border shadow-brand hover:shadow-brand-lg transition-all duration-300 border hover:border-primary/30 hover:-translate-y-1"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-primary/10 group-hover:bg-primary/20 rounded-xl transition-all duration-300 group-hover:scale-110">
                      {React.cloneElement(benefit.icon, { 
                        className: "h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" 
                      })}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Hero Image - Right Side */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-brand-xl bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="relative h-64 md:h-80 lg:h-96">
                <SuperImage
                  src={professionalGlovesImage}
                  alt="Luvas descartáveis profissionais GloveTec em uso hospitalar"
                  className="w-full h-full object-cover"
                  priority={false}
                  quality="high"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Floating Stats */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">Clientes</div>
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-accent">24h</div>
                    <div className="text-xs text-muted-foreground">Entrega</div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse-gentle" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-pulse-gentle" style={{ animationDelay: '1s' }} />
          </div>
          
        </div>
      </div>
    </section>
  );
});

OptimizedBenefits.displayName = 'OptimizedBenefits';

export default OptimizedBenefits;