import { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import FAQItem from "./FAQ/FAQItem";
import FAQContact from "./FAQ/FAQContact";
import { faqData } from "./FAQ/FAQData";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useScrollAnimation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-gradient-to-b from-background via-muted/10 to-background scroll-animate">
      
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-10 lg:mb-12 scroll-animate animate-fade-in">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full border border-accent/20">
                Dúvidas Frequentes
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Encontre respostas rápidas para as principais dúvidas sobre nossos produtos e serviços
            </p>
          </header>

          {/* FAQ Items */}
          <div className="space-y-3 mb-12 lg:mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {faqData.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
                index={index}
              />
            ))}
          </div>

          {/* Contact Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <FAQContact />
          </div>
        </div>
      </div>

    </section>
  );
};

export default FAQ;