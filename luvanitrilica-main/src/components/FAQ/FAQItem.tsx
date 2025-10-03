import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => {
  return (
    <article className="scroll-animate bg-card rounded-2xl shadow-brand border border-border overflow-hidden group hover:shadow-brand-lg transition-all duration-500">
      <button
        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-muted/30 hover:to-accent/5 transition-all duration-300 group-hover:scale-[1.02] transform-gpu"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <h3 className="text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors duration-300">
          {question}
        </h3>
        <div className="flex-shrink-0 bg-accent/10 rounded-full p-2 group-hover:bg-accent/20 transition-all duration-300">
          <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            {isOpen ? (
              <Minus className="w-4 h-4 text-accent" />
            ) : (
              <Plus className="w-4 h-4 text-accent" />
            )}
          </div>
        </div>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        id={`faq-answer-${index}`}
        aria-labelledby={`faq-question-${index}`}
        role="region"
      >
        <div className="px-8 pb-6">
          <div className="border-t border-gradient-to-r from-border via-accent/20 to-border pt-6 relative">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"></div>
            <p className="text-muted-foreground leading-relaxed animate-fade-in-up">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FAQItem;