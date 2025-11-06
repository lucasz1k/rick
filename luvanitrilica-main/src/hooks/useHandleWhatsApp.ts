import { useCallback } from "react";

const DEFAULT_WHATSAPP_NUMBER = "5511949326324";
const DEFAULT_MESSAGE = "Olá, tudo bem? Gostaria de luvas 😁";

export const useHandleWhatsApp = (customMessage?: string) => {
  const handleWhatsApp = useCallback(() => {
    const message = customMessage || DEFAULT_MESSAGE;
    const url = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }, [customMessage]);

  return handleWhatsApp;
};

