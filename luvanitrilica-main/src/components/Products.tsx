import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SuperImage } from "@/components/ui/super-image";
import { Headphones, Droplets, Award, CheckCircle } from "lucide-react";
import nitrileCleanImage from "@/assets/product-nitrile-premium.jpg";
import plasticNewImage from "@/assets/product-plastic-professional.jpg";
import surgicalCleanImage from "@/assets/product-surgical-sterile.jpg";

const Products = React.memo(() => {
  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePricesAvailability = () => {
    const message = "Ola! Gostaria de receber a tabela de precos atualizada e informacoes sobre disponibilidade dos produtos. Preciso de um orcamento personalizado.";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const products = [
    {
      title: "Luvas Nitrílicas Premium",
      image: nitrileCleanImage,
      alt: "Luvas nitrílicas premium certificadas ANVISA",
      description: "Ideais para cozinhas profissionais e clínicas. Resistem a óleos e não causam alergias.",
      price: "Premium",
      badge: "CERTIFICADO",
      features: [
        { icon: <Headphones className="h-5 w-5" />, text: "Livre de látex" },
        { icon: <Award className="h-5 w-5" />, text: "Resistente a óleos" }
      ]
    },
    {
      title: "Luvas Plásticas Econômicas",
      image: plasticNewImage,
      alt: "Luvas de plástico descartáveis profissionais para uso geral",
      description: "Perfeitas para limpeza e manipulação geral. Custo-benefício imbatível para alto volume.",
      price: "Econômica",
      badge: "Mais Vendido",
      features: [
        { icon: <Droplets className="h-5 w-5" />, text: "Resistente à água" },
        { icon: <CheckCircle className="h-5 w-5" />, text: "Uso múltiplo" }
      ]
    },
    {
      title: "Luvas Cirúrgicas Estéreis",
      image: surgicalCleanImage,
      alt: "Luvas cirúrgicas estéreis para procedimentos médicos",
      description: "Obrigatórias para procedimentos médicos. Aprovação ANVISA para hospitais e clínicas.",
      price: "Hospitalar",
      badge: "ESTÉRIL",
      features: [
        { icon: <CheckCircle className="h-5 w-5" />, text: "Aprovação ANVISA" },
        { icon: <Headphones className="h-5 w-5" />, text: "Dupla proteção" }
      ]
    }
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-gradient-to-br from-background via-muted/30 to-background overflow-x-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full font-semibold text-sm border border-primary/20">
            <Award className="h-4 w-4" />
            Linha Premium Certificada
          </div>
          
          <div className="space-y-4">
            <h2 className="text-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
              Proteção Profissional
              <span className="block text-primary mt-2">Sob Medida</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>
          
          <p className="text-body text-lg text-muted-foreground max-w-3xl mx-auto">
            Três categorias especialmente desenvolvidas para atender diferentes necessidades profissionais 
            com máxima segurança e certificação ANVISA
          </p>
        </div>

        {/* Products Grid - Perfect Symmetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-10 lg:mb-12">
          {products.map((product, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <Card className="relative h-full border-0 shadow-brand hover:shadow-brand-xl transition-all duration-500 overflow-hidden bg-card/80 backdrop-blur-sm flex flex-col">
                
                {/* Image Container - Consistent Height */}
                <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                  <SuperImage
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality="medium"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 animate-scale-in">
                    {product.badge}
                  </div>
                  
                  {/* Price */}
                  <div className="absolute top-4 right-4 bg-white/95 text-primary px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                    {product.price}
                  </div>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-heading text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {product.title}
                    </h3>
                    
                    <p className="text-body text-muted-foreground text-sm leading-relaxed">
                      {product.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      {product.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-all duration-300"
                        >
                          <div className="flex-shrink-0 p-1.5 bg-primary/20 rounded-md text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            {React.cloneElement(feature.icon, { className: "h-3 w-3" })}
                          </div>
                          <span className="text-caption text-foreground font-medium">
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    onClick={handleWhatsApp}
                    variant="cta-primary"
                    className="w-full mt-6"
                  >
                    Receber Orçamento em 5 Minutos
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="relative">
          <Card className="border-0 shadow-brand-lg bg-gradient-to-br from-primary/5 via-background to-accent/5 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full font-semibold">
                  <Headphones className="h-5 w-5" />
                  Consultoria Especializada
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-heading text-3xl md:text-4xl text-foreground">
                    Veja Como Nossos Produtos Transformam Seu Negócio
                  </h3>
                  <p className="text-body text-lg text-muted-foreground max-w-2xl mx-auto">
                    Nossa equipe especializada ajuda você a encontrar a solução perfeita para seu segmento. 
                    Consultoria gratuita e personalizada.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm sm:max-w-md mx-auto pt-4">
                  <Button 
                    onClick={handleWhatsApp}
                    variant="cta-primary"
                    size="default"
                    className="w-full sm:flex-1 px-4 sm:px-6 text-sm sm:text-base"
                  >
                    <Headphones className="h-4 w-4 mr-2" />
                    Falar com Especialista Agora
                  </Button>
                  <Button 
                    onClick={handlePricesAvailability}
                    variant="cta-secondary"
                    size="default"
                    className="w-full sm:flex-1 px-4 sm:px-6 text-sm sm:text-base"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Ver Preços e Disponibilidade
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
});

Products.displayName = 'Products';

export default Products;