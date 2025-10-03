import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
const Footer = () => {
  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };
  return <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre a Empresa */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">GloveTec</h3>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed">
              Especialistas em luvas descartáveis de alta qualidade. 
              Oferecemos proteção profissional para diversos segmentos, 
              garantindo segurança e higiene em suas atividades.
            </p>
            <div className="flex space-x-3">
              <button onClick={handleWhatsApp} className="p-2 bg-gradient-cta text-white rounded-lg hover:opacity-90 transition-opacity" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Produtos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Luvas de Plástico Comum</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Luvas Nitrílicas</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Luvas para Alimentos</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Luvas Hospitalares</a></li>
            </ul>
          </div>

          {/* Segmentos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Segmentos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Restaurantes</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Clínicas e Hospitais</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Indústria Alimentícia</a></li>
              <li><a href="#" className="text-secondary-foreground/80 hover:text-white transition-colors">Salões de Beleza</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-secondary-foreground/80">(11) 94932-6324</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-secondary-foreground/80">contato@rickpaper.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-secondary-foreground/80">São Paulo - SP</span>
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-xs text-secondary-foreground/60 mb-2">Horário de Atendimento:</p>
              <p className="text-sm text-secondary-foreground/80">Segunda a Sexta: 8h às 18h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-secondary-foreground/60">© 2025 GloveTec. Todos os direitos reservados.</div>
            
            <div className="flex space-x-6 text-xs">
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-white transition-colors">
                Certificações
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;