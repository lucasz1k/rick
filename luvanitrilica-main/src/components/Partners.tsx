import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Truck, Users, CheckCircle, Star, Building } from "lucide-react";
import { useHandleWhatsApp } from '@/hooks/useHandleWhatsApp';

const Partners = () => {
  const handlePartnershipClick = useHandleWhatsApp("Olá! Gostaria de me tornar parceiro da GloveTec. Podem me enviar informações sobre as condições de parceria?");

  const partnersData = [
    { 
      id: 1,
      name: "Unigloves", 
      description: "Líder em luvas descartáveis",
      premium: true
    },
    { 
      id: 2,
      name: "Vabene", 
      description: "Qualidade premium garantida",
      premium: true
    },
    { 
      id: 3,
      name: "Nobre", 
      description: "Tradição e inovação",
      premium: true
    },
    { 
      id: 4,
      name: "Parizotto", 
      description: "Excelência em produtos",
      premium: true
    },
    { 
      id: 5,
      name: "Descarpack", 
      description: "Soluções profissionais",
      premium: true
    }
  ];

  const companyAchievements = [
    {
      id: 1,
      icon: <Shield className="h-8 w-8" />,
      title: "Certificação ANVISA",
      description: "Todos os produtos são rigorosamente testados e aprovados",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      icon: <Truck className="h-8 w-8" />,
      title: "Entrega Express",
      description: "Entregas em 24-48h para toda região de São Paulo",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      icon: <Users className="h-8 w-8" />,
      title: "500+ Clientes",
      description: "Empresas confiam na nossa qualidade e atendimento",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      icon: <Award className="h-8 w-8" />,
      title: "Selo de Qualidade",
      description: "Reconhecidos pela excelência no mercado nacional",
      gradient: "from-yellow-500 to-yellow-600"
    }
  ];

  const businessStats = [
    { 
      id: 1,
      value: "98%", 
      label: "Satisfação", 
      icon: <Star className="h-5 w-5" /> 
    },
    { 
      id: 2,
      value: "5+", 
      label: "Anos", 
      icon: <Building className="h-5 w-5" /> 
    },
    { 
      id: 3,
      value: "24h", 
      label: "Suporte", 
      icon: <CheckCircle className="h-5 w-5" /> 
    }
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-x-hidden scroll-animate">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 3px 3px, rgba(0,0,0,0.015) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Building className="h-4 w-4" />
            Parceiros de Confiança
          </div>
          <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            Trabalhamos com as
            <span className="block text-primary mt-2">Melhores Marcas do Mercado</span>
          </h2>
          <p className="font-medium text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Parcerias estratégicas que garantem a melhor qualidade e variedade de produtos para nossos clientes
          </p>
        </div>

        {/* Partners Showcase */}
        <div className="mb-8 lg:mb-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          {/* Partners Grid - Estrutura Melhorada */}
          <div className="relative">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl"></div>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 xl:gap-10 p-4 md:p-6 lg:p-8">
              {partnersData.map((partner, index) => (
                <Card 
                  key={partner.id}
                  className="group relative bg-white/90 backdrop-blur-md border-2 border-border/50 hover:border-primary/60 transition-all duration-700 hover:shadow-2xl hover:-translate-y-6 hover:rotate-1 overflow-hidden animate-fade-in hover-scale rounded-2xl"
                  style={{
                    animationDelay: `${index * 0.12}s`,
                    minHeight: '280px'
                  }}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Premium corner ribbon */}
                  <div className="absolute top-0 right-0 bg-gradient-to-bl from-primary to-accent text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-6 -translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    VIP
                  </div>
                  <CardContent className="relative p-8 lg:p-10 flex flex-col items-center justify-between h-full text-center group-hover:bg-gradient-to-br group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500">
                    {/* Top decorative line */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                    
                    {/* Top section - Icon and name */}
                    <div className="flex-1 flex flex-col items-center justify-center transform transition-all duration-500 group-hover:scale-105">
                      {/* Enhanced brand icon */}
                      <div className="mb-6 w-20 h-20 bg-gradient-to-br from-primary via-primary/80 to-accent rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:rotate-12 transition-all duration-700 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Building className="relative z-10 h-10 w-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Brand name with better typography */}
                      <h3 className="font-black text-2xl lg:text-3xl text-foreground mb-3 group-hover:text-primary transition-all duration-300 animate-fade-in tracking-tight">
                        {partner.name}
                      </h3>
                    </div>
                    
                    {/* Middle section - Description */}
                    <div className="flex-1 flex items-center">
                      <p className="text-base lg:text-lg text-muted-foreground opacity-80 group-hover:opacity-100 group-hover:text-foreground transition-all duration-300 leading-relaxed font-medium px-2">
                        {partner.description}
                      </p>
                    </div>
                    
                    {/* Bottom section - Premium badge */}
                    <div className="flex-shrink-0 mt-4">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-primary/90 to-accent text-white text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200 shadow-lg">
                        <Star className="h-4 w-4 animate-pulse" />
                        PARCEIRO PREMIUM
                      </div>
                    </div>
                    
                    {/* Decorative corner elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-2 border-primary/30 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-accent/40 rounded-full animate-bounce opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300"></div>
                  </CardContent>
                  
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Badge */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="inline-flex items-center gap-2 sm:gap-4 bg-gradient-to-r from-primary to-accent text-white px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              {businessStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  {stat.icon}
                  <div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs opacity-90">{stat.label}</div>
                  </div>
                  {index < businessStats.length - 1 && (
                    <div className="w-px h-8 bg-white/30 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust & Quality Section */}
        <div className="bg-gradient-to-r from-muted/30 via-background/50 to-muted/30 rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-10 border border-border/50 shadow-xl animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="font-bold text-2xl lg:text-3xl text-foreground mb-3">
              Por Que Somos Referência no Mercado?
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Nossa reputação foi construída através de anos de dedicação à qualidade e excelência no atendimento
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {companyAchievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${achievement.gradient} text-white rounded-2xl shadow-lg mb-4 group-hover:shadow-xl transition-all duration-300 group-hover:rotate-6`}>
                  {achievement.icon}
                </div>
                <h4 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {achievement.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-border/50">
            <Button 
              size="default" 
              onClick={handlePartnershipClick}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl max-w-xs sm:max-w-none mx-auto"
            >
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Torne-se Nosso Parceiro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;