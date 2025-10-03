export interface FAQItemData {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItemData[] = [
  {
    question: "Quais tipos de luvas vocês oferecem?",
    answer: "Oferecemos 3 tipos: Nitrílicas (cozinhas), Plásticas (limpeza) e Cirúrgicas (hospitais). Todas certificadas pela ANVISA.",
    category: "produtos"
  },
  {
    question: "Qual o prazo de entrega?",
    answer: "24-48h para São Paulo capital e região metropolitana. Interior: 3-5 dias úteis.",
    category: "entrega"
  },
  {
    question: "Qual o pedido mínimo?",
    answer: "Sem pedido mínimo. Atendemos desde pequenos restaurantes até grandes hospitais.",
    category: "atendimento"
  },
  {
    question: "As luvas têm certificação?",
    answer: "Sim! Todas possuem certificação ANVISA para uso profissional em alimentos e saúde.",
    category: "certificação"
  },
  {
    question: "Como funciona a garantia?",
    answer: "Garantia total de qualidade. Se não ficar satisfeito, devolvemos seu dinheiro.",
    category: "garantia"
  },
  {
    question: "Atendem empresas pequenas?",
    answer: "Sim! Atendemos desde pequenos restaurantes até grandes redes hospitalares.",
    category: "atendimento"
  }
];

export const whatsappContactMessage = "Olá! Tenho uma dúvida sobre os produtos da GloveTec que não está no FAQ.";
export const whatsappNumber = "5511949326324";