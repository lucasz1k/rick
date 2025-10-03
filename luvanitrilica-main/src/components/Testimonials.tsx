import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      company: "Restaurante Bella Vista",
      role: "Gerente",
      rating: 5,
      comment: "Mudamos para a GloveTec há 6 meses. Qualidade excelente e nunca faltou estoque. Recomendo para qualquer restaurante!",
      sector: "Restaurante",
      initials: "MS"
    },
    {
      name: "Dr. Carlos Eduardo",
      company: "Clínica São José",
      role: "Médico",
      rating: 5,
      comment: "Atendemos 200 pacientes por dia. As luvas nitrílicas da GloveTec nunca falharam. Confiança total.",
      sector: "Clínica Médica",
      initials: "CE"
    },
    {
      name: "João Mendes",
      company: "Açougue Premium",
      role: "Proprietário",
      rating: 5,
      comment: "Preço justo e entrega pontual. Nosso açougue não para mais por falta de luvas. Parceria que funciona!",
      sector: "Alimentício",
      initials: "JM"
    },
    {
      name: "Ana Paula Santos",
      company: "Salão Beleza & Cia",
      role: "Cabeleireira",
      rating: 4,
      comment: "Proteção ideal para procedimentos químicos. São confortáveis e não causam alergias. Já indiquei para outras profissionais.",
      sector: "Beleza",
      initials: "AS"
    },
    {
      name: "Roberto Lima",
      company: "Hospital Regional",
      role: "Enfermeiro",
      rating: 5,
      comment: "Qualidade hospitalar impecável. Sensibilidade tátil excelente e proteção garantida. Essenciais no nosso dia a dia.",
      sector: "Saúde",
      initials: "RL"
    },
    {
      name: "Carla Torres",
      company: "Padaria Dourada",
      role: "Confeiteira",
      rating: 5,
      comment: "Perfeitas para manuseio de alimentos. Não alteram o sabor e dão total segurança. Atendimento nota 10!",
      sector: "Panificação",
      initials: "CT"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${
          i < rating 
            ? "fill-accent text-accent" 
            : "fill-muted text-muted"
        }`} 
      />
    ));
  };

  return (
    <section className="py-12 lg:py-16 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 lg:mb-10 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-[1.7]">
            Mais de 500 profissionais confiam na GloveTec para proteção e qualidade
          </p>
        </div>

        {/* Depoimentos em Layout Otimizado */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto mb-8 lg:mb-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          {/* Depoimento em Destaque */}
          <div className="md:col-span-2">
            <Card className="h-full bg-gradient-to-br from-primary to-primary/80 text-white border-0 shadow-brand-lg transform scale-105">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <Quote className="h-10 w-10 text-white/30" />
                  <div className="flex">
                    {renderStars(testimonials[0].rating)}
                  </div>
                </div>
                
                <p className="text-lg mb-8 leading-[1.7] font-medium">
                  "{testimonials[0].comment}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                      {testimonials[0].initials}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-bold text-lg text-white">
                      {testimonials[0].name}
                    </div>
                    <div className="text-white/90 mb-2">
                      {testimonials[0].role} - {testimonials[0].company}
                    </div>
                    <div className="text-xs bg-white/20 text-white px-3 py-1 rounded-full inline-block">
                      {testimonials[0].sector}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Depoimentos Secundários */}
          <div className="space-y-6">
            {testimonials.slice(1, 3).map((testimonial, index) => (
              <Card key={index + 1} className="bg-background border-border shadow-brand hover:shadow-brand-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="h-6 w-6 text-primary/20" />
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                  
                   <p className="text-muted-foreground mb-6 leading-[1.6] text-sm">
                     "{testimonial.comment}"
                   </p>
                  
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-sm">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.company}
                      </div>
                      <div className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full mt-1 inline-block">
                        {testimonial.sector}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Prova Social Adicional */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto bg-card rounded-xl lg:rounded-2xl shadow-brand border border-border p-4 md:p-6 lg:p-8 animate-fade-in hover-scale" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-sm text-muted-foreground">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Clientes Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Recompram</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24h</div>
            <div className="text-sm text-muted-foreground">Entrega Média</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;