-- Criar tabela para armazenar contatos/leads dos clientes
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção pública (formulário de contato público)
CREATE POLICY "Anyone can create contacts" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Política para visualização apenas por administradores (futuro)
-- Por enquanto, vamos permitir visualização pública para testes
CREATE POLICY "Anyone can view contacts" 
ON public.contacts 
FOR SELECT 
USING (true);

-- Criar índices para melhor performance
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_contacts_status ON public.contacts(status);
CREATE INDEX idx_contacts_email ON public.contacts(email);

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_contacts_updated_at
  BEFORE UPDATE ON public.contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Comentários para documentação
COMMENT ON TABLE public.contacts IS 'Tabela para armazenar contatos e leads vindos do formulário do site';
COMMENT ON COLUMN public.contacts.status IS 'Status do contato: new, contacted, converted, closed';
COMMENT ON COLUMN public.contacts.source IS 'Origem do contato: website, whatsapp, phone, etc';