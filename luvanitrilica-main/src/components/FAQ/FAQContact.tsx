import { MessageCircle, Phone, Mail } from "lucide-react";
import { whatsappContactMessage, whatsappNumber } from "./FAQData";
import { useHandleWhatsApp } from '@/hooks/useHandleWhatsApp';

const FAQContact = () => {
  const handleWhatsAppClick = useHandleWhatsApp();

  return (
    <div className="scroll-animate text-center p-6 md:p-8 bg-gradient-to-br from-card via-muted/20 to-card rounded-2xl lg:rounded-3xl border border-border shadow-brand animate-fade-in hover-scale">
      <div className="max-w-md mx-auto">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Precisa de mais ajuda?
        </h3>
        <p className="text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
          Nossa equipe está pronta para tirar todas as suas dúvidas e ajudar na escolha dos produtos ideais.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-brand flex items-center justify-center gap-2 group"
            onClick={handleWhatsAppClick}
          >
            <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            WhatsApp
          </button>
          
          <button
            className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-brand flex items-center justify-center gap-2 group"
            onClick={() => window.open('tel:+5511949326324', '_self')}
          >
            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            Ligar Agora
          </button>
        </div>
        
        <div className="mt-4 lg:mt-6 pt-4 lg:pt-6 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>contato@rickpaper.com.br</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQContact;