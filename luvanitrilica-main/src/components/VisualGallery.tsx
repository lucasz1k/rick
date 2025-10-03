import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SuperImage } from "@/components/ui/super-image";
import { Users, Star, Clock, TrendingUp, Eye, ArrowRight } from "lucide-react";
import galleryChefNew from "@/assets/gallery-chef-new.jpg";
import galleryMedicalNew from "@/assets/gallery-medical-new.jpg";
import galleryIndustryNew from "@/assets/gallery-industry-new.jpg";

const VisualGallery = () => {
  const galleryItems = [
    {
      image: galleryChefNew,
      title: "Gastronomia Profissional",
      description: "Higiene alimentar com máxima segurança e conforto para chefs e manipuladores de alimentos",
      category: "Culinária",
      icon: "🍽️",
      stats: "98% dos chefs aprovam",
      color: "from-orange-500/20 to-red-500/20"
    },
    {
      image: galleryMedicalNew,
      title: "Ambiente Hospitalar",
      description: "Proteção certificada para procedimentos médicos e cuidados de saúde profissionais",
      category: "Saúde",
      icon: "⚕️",
      stats: "Certificação ANVISA",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      image: galleryIndustryNew,
      title: "Produção Industrial",
      description: "Resistência e durabilidade para ambientes industriais e processos de fabricação",
      category: "Indústria",
      icon: "🏭",
      stats: "Resistência superior",
      color: "from-green-500/20 to-emerald-500/20"
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: "500+", label: "Clientes Ativos", color: "text-blue-600" },
    { icon: <Star className="h-6 w-6" />, value: "4.9★", label: "Avaliação Média", color: "text-yellow-500" },
    { icon: <Clock className="h-6 w-6" />, value: "24h", label: "Entrega Rápida", color: "text-green-600" },
    { icon: <TrendingUp className="h-6 w-6" />, value: "98%", label: "Satisfação", color: "text-purple-600" }
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Eye className="h-4 w-4" />
            Produtos em Ação
          </div>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Veja Como Nossos
            <span className="block text-primary mt-2">Produtos Transformam</span>
          </h2>
          <p className="font-medium text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Profissionais de diferentes setores confiam na qualidade e proteção das nossas luvas para garantir excelência em seus trabalhos
          </p>
        </div>

        {/* Gallery Grid - Perfect Symmetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8 lg:mb-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          {galleryItems.map((item, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 border-border hover:border-primary/30 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 bg-background/80 backdrop-blur-sm h-full flex flex-col"
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Image Section - Consistent Height */}
              <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
                <SuperImage 
                  src={item.image} 
                  alt={`${item.title} - ${item.description}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality="medium"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300`}></div>
                
                {/* Category Badge */}
                <Badge className="absolute top-4 left-4 bg-white/95 text-slate-800 hover:bg-white hover:text-slate-900 border-0 shadow-lg group-hover:scale-110 transition-all duration-300 font-semibold">
                  <span className="mr-1">{item.icon}</span>
                  {item.category}
                </Badge>

                {/* Stats Badge */}
                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                  {item.stats}
                </div>
              </div>

              {/* Content Section - Flexible */}
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="font-bold text-lg md:text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between hover:bg-primary/10 hover:text-primary group/btn mt-auto"
                >
                  Ver Detalhes
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-primary/5 via-background to-accent/5 rounded-xl lg:rounded-2xl p-6 md:p-8 lg:p-10 shadow-xl border border-border/50 animate-fade-in hover-scale" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="font-bold text-2xl lg:text-3xl text-foreground mb-3">
              Números que Comprovam Nossa Excelência
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Resultados que demonstram a confiança e satisfação dos nossos clientes
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.color} bg-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300`}>
                  {stat.icon}
                </div>
                <div className="font-bold text-3xl lg:text-4xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualGallery;