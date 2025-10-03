import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Phone, Clock, MapPin, Mail } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const honeypotRef = useRef<HTMLInputElement>(null);
  
  // Rate limiting is now handled server-side through RLS policies

  // Basic form validation
  const validateForm = (): boolean => {
    const { name, email, phone, message } = formData;
    
    if (!name.trim() || name.trim().length < 2) {
      toast({
        title: "Nome inválido",
        description: "Por favor, insira um nome válido.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!phone.trim() || phone.trim().length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido.",
        variant: "destructive"
      });
      return false;
    }
    
    if (!message.trim() || message.trim().length < 10) {
      toast({
        title: "Mensagem muito curta",
        description: "Por favor, escreva uma mensagem mais detalhada.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleWhatsApp = () => {
    const message = "Ola! Preciso de um orcamento para luvas descartaveis. Vi no site que entregam em 24h para Sao Paulo. Pode me ajudar?";
    const url = `https://wa.me/5511949326324?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Check honeypot (bot protection)
      if (honeypotRef.current?.value) {
        // Silent fail for bots
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Recebemos sua mensagem. Entraremos em contato em breve."
        });
        return;
      }

      // Validate form
      if (!validateForm()) {
        return;
      }

      console.log('📤 Enviando contato para Edge Function...');

      // Chama a Edge Function para processar o contato
      const { data, error } = await supabase.functions.invoke('submit-contact', {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          message: formData.message.trim()
        }
      });

      if (error) {
        console.error('❌ Erro na Edge Function:', error);
        throw error;
      }

      console.log('✅ Resposta da Edge Function:', data);

      // Success
      toast({
        title: "Mensagem enviada com sucesso!",
        description: data.message || "Recebemos sua mensagem. Entraremos em contato em breve."
      });

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error: any) {
      console.error('❌ Erro ao enviar contato:', error);
      
      // Check if error is due to rate limiting
      if (error.message?.includes('rate_limit') || error.message?.includes('429')) {
        toast({
          title: "Limite de envio atingido",
          description: "Muitas tentativas recentes. Aguarde alguns minutos ou entre em contato pelo WhatsApp.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: error.message || "Ocorreu um erro. Tente novamente ou entre em contato pelo WhatsApp.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply regex to phone field
    if (name === 'phone') {
      // Remove all non-digit characters
      const hasCharactersRegex = /\D+/g;
      const cleanedValue = value.replace(hasCharactersRegex, "");
      
      // Format based on phone type (landline or mobile)
      let formattedValue = cleanedValue;
      if (cleanedValue.length > 0) {
        if (cleanedValue.length <= 2) {
          formattedValue = `(${cleanedValue}`;
        } else if (cleanedValue.length <= 6) {
          formattedValue = `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
        } else if (cleanedValue.length === 10) {
          // Landline format: (00)0000-0000
          formattedValue = `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 6)}-${cleanedValue.slice(6, 10)}`;
        } else if (cleanedValue.length === 11) {
          // Mobile format: (00)00000-0000
          formattedValue = `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
        } else if (cleanedValue.length > 11) {
          // Limit to 11 digits (mobile format)
          formattedValue = `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2, 7)}-${cleanedValue.slice(7, 11)}`;
        } else {
          // Typing in progress (7-9 digits)
          formattedValue = `(${cleanedValue.slice(0, 2)})${cleanedValue.slice(2)}`;
        }
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  return <section className="py-12 lg:py-16 bg-gradient-to-br from-background to-muted relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      
      <div className="relative container mx-auto px-4">
        {/* Header mais amigável */}
        <div className="text-center mb-8 lg:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Precisa de Luvas Agora?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fale conosco e receba seu orçamento personalizado em 5 minutos. Entrega garantida em 24h para São Paulo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {/* WhatsApp Principal - Perfect 50% */}
          <div className="space-y-6 h-full">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <MessageCircle className="h-8 w-8 text-accent" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Resposta Rápida no WhatsApp</h3>
                    <p className="text-muted-foreground">
                      Nossa equipe está pronta para te atender agora mesmo
                    </p>
                  </div>
                  
                  <Button size="lg" onClick={handleWhatsApp} variant="cta-primary" className="w-full">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Falar com Especialista Agora
                  </Button>
                  
                  <div className="flex justify-center items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Online agora
                    </span>
                    <span>•</span>
                    <span>Resposta em minutos</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações de contato simplificadas */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-center">Outras formas de contato</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center space-y-2">
                    <Phone className="h-5 w-5 text-accent mx-auto" />
                    <div>
                      <p className="text-sm font-medium">Telefone</p>
                      <p className="text-sm text-muted-foreground">(11) 94932-6324</p>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <Clock className="h-5 w-5 text-accent mx-auto" />
                    <div>
                      <p className="text-sm font-medium">Horário</p>
                      <p className="text-sm text-muted-foreground">Seg-Sex 8h-18h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário - Perfect 50% */}
          <Card className="border-0 shadow-lg h-full">
            <CardContent className="p-8 h-full flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">Ou deixe sua mensagem</h3>
                <p className="text-muted-foreground">
                  Retornamos em até 2 horas úteis
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                {/* Honeypot field - hidden from users, visible to bots */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    name="name" 
                    placeholder="Seu nome" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="h-12" 
                    required 
                    minLength={2}
                    maxLength={100}
                  />
                  
                  <Input 
                    name="phone" 
                    type="tel" 
                    placeholder="Seu WhatsApp" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    className="h-12" 
                    required 
                    minLength={10}
                    maxLength={20}
                  />
                </div>
                
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="Seu e-mail" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  className="h-12" 
                  required 
                  maxLength={100}
                />
                
                <Textarea 
                  name="message" 
                  placeholder="Como podemos ajudar?" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  className="min-h-24 resize-none flex-1" 
                  required 
                  minLength={10}
                  maxLength={1000}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-12 font-medium mt-auto" 
                  variant="cta-secondary" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Garantias simplificadas */}
        <div className="mt-10 lg:mt-12 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="font-semibold">Qualidade Certificada</h4>
              <p className="text-sm text-muted-foreground">Produtos aprovados pela ANVISA</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-semibold">Entrega Ágil</h4>
              <p className="text-sm text-muted-foreground">24-48h para São Paulo</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💯</span>
              </div>
              <h4 className="font-semibold">Garantia Total</h4>
              <p className="text-sm text-muted-foreground">Satisfação ou reembolso</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;