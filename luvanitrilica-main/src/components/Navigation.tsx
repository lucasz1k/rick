import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navItems = [
    { id: 'hero', label: 'Início', href: '#hero' },
    { id: 'benefits', label: 'Benefícios', href: '#benefits' },
    { id: 'products', label: 'Produtos', href: '#products' },
    { id: 'gallery', label: 'Galeria', href: '#gallery' },
    { id: 'testimonials', label: 'Depoimentos', href: '#testimonials' },
    { id: 'contact', label: 'Contato', href: '#contact' },
  ];

  // Show/hide back to top button with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const updateActiveSection = () => {
      const sections = navItems.map(item => document.getElementById(item.id.replace('#', '')));
      const currentSection = sections.find(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    // Debounced scroll handler for better performance
    const debouncedScrollHandler = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        toggleVisibility();
        updateActiveSection();
      }, 10); // Small delay for better performance
    };

    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.href)}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              activeSection === item.id.replace('#', '') 
                ? 'text-primary border-b-2 border-primary pb-1' 
                : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-left text-lg font-medium transition-colors hover:text-primary p-2 rounded-md ${
                    activeSection === item.id.replace('#', '') 
                      ? 'text-primary bg-primary/10' 
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-40 rounded-full shadow-brand-lg"
          size="icon"
          aria-label="Voltar ao topo"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};

export default Navigation;