import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Droplets, Clock, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Benefits = () => {
  useScrollAnimation();

  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Certificação ANVISA",
      description: "Aprovação oficial para uso médico e alimentício"
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "Entrega em 24h", 
      description: "Estoque sempre disponível em São Paulo"
    },
    {
      icon: <Droplets className="h-12 w-12 text-primary" />,
      title: "Resistência Comprovada",
      description: "Testadas contra óleos, ácidos e perfurações"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary" />,
      title: "Melhor Custo-Benefício",
      description: "Preços competitivos para compras recorrentes"
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-muted/30 relative overflow-hidden">
      {/* Textured Background */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }} />
      
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 lg:mb-10 scroll-animate">
          <h2 className="font-inter font-black text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-[1.2]">
            Por que Escolher a GloveTec?
          </h2>
          <p className="font-inter font-semibold text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-[1.6]">
            Oferecemos a combinação perfeita de segurança, qualidade e praticidade para atender às necessidades dos mais diversos segmentos profissionais.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="bg-background/80 backdrop-blur-sm border-border shadow-brand hover:shadow-brand-lg transition-all duration-500 group border-2 hover:border-primary/20 hover:-translate-y-2 scroll-animate-scale h-full"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CardContent className="p-6 text-center flex flex-col h-full">
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                  <div className="p-6 bg-primary/10 group-hover:bg-primary/20 rounded-2xl transition-all duration-500">
                    {React.cloneElement(benefit.icon, { className: "h-12 w-12 text-primary group-hover:scale-110 transition-transform duration-500" })}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-lg text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="font-medium text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;