import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppFloat = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-80'
    }`}>
      <button
        onClick={handleWhatsApp}
        className="bg-gradient-cta text-accent-foreground p-6 rounded-full shadow-brand-lg hover:scale-110 transition-all duration-300 group border-2 border-white/20"
        aria-label="Contato via WhatsApp - Solicitar orçamento personalizado"
      >
        <MessageCircle className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
        
        {/* Tooltip Melhorado */}
        <div className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 bg-secondary text-secondary-foreground px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-base sm:text-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-brand font-semibold">
          Solicitar Orçamento
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 sm:border-6 border-transparent border-l-secondary"></div>
        </div>
      </button>
      
      {/* Pulse animation funcional */}
      <div className="absolute inset-0 bg-gradient-cta rounded-full animate-pulse opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-cta rounded-full animate-ping opacity-20 pointer-events-none"></div>
    </div>
  );
};

export default WhatsAppFloat;