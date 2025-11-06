import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import logo from "@/assets/logo-glovetec.png";
import Navigation from "@/components/Navigation";
import { SuperImage } from "@/components/ui/super-image";
import { useHandleWhatsApp } from '@/hooks/useHandleWhatsApp';

const Header = () => {
  const handleWhatsApp = useHandleWhatsApp();
  return <header className="w-full bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b border-border/50 shadow-brand header-ios-fix">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section - Balanced spacing */}
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <div className="flex items-center gap-3">
              <SuperImage
                src={logo} 
                alt="GloveTec - Luvas Descartáveis Profissionais Certificadas"
                className="h-11 flex-shrink-0 w-auto max-w-12"
                priority={true}
                quality="high"
              />
              <div className="min-w-0">
                <h2 className="font-inter font-black text-xl text-primary leading-tight">
                  GloveTec
                </h2>
                <p className="font-inter font-medium text-xs text-muted-foreground leading-tight">
                  Proteção Profissional
                </p>
              </div>
            </div>
          </div>

          {/* Center Navigation - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <Navigation />
          </div>

          {/* Right Actions - Responsive layout */}
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            
            {/* Desktop: Phone + WhatsApp */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-inter font-medium text-sm whitespace-nowrap">(11) 94932-6324
              </span>
              </div>
              <Button variant="cta-primary" size="default" onClick={handleWhatsApp} className="flex items-center gap-2 px-5 py-2 font-medium">
                <MessageCircle className="h-4 w-4" />
                <span className="whitespace-nowrap">WhatsApp</span>
              </Button>
            </div>

            {/* Tablet: Only WhatsApp button */}
            <div className="hidden md:flex lg:hidden">
              <Button variant="cta-primary" size="default" onClick={handleWhatsApp} className="flex items-center gap-2 px-4 py-2">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </Button>
            </div>

            {/* Mobile: Menu + WhatsApp icon */}
            <div className="flex md:hidden items-center gap-2">
              <div className="lg:hidden">
                <Navigation />
              </div>
              <Button size="sm" onClick={handleWhatsApp} variant="cta-primary" className="p-2" aria-label="WhatsApp">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          
          </div>
        </div>
      </div>
    </header>;
};
export default Header;