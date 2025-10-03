import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Calendar, User, MessageSquare } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  source: string;
  created_at: string;
  updated_at: string;
}

const ContactsManager = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro ao carregar contatos",
          description: "Não foi possível carregar a lista de contatos.",
          variant: "destructive",
        });
        return;
      }

      setContacts(data?.map(contact => ({
        ...contact,
        status: contact.status as Contact['status']
      })) || []);
    } catch (error) {
      toast({
        title: "Erro inesperado",
        description: "Algo deu errado ao carregar os contatos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (contactId: string, newStatus: Contact['status']) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status: newStatus })
        .eq('id', contactId);

      if (error) {
        toast({
          title: "Erro ao atualizar status",
          description: "Não foi possível atualizar o status do contato.",
          variant: "destructive",
        });
        return;
      }

      // Atualizar estado local
      setContacts(prev =>
        prev.map(contact =>
          contact.id === contactId
            ? { ...contact, status: newStatus }
            : contact
        )
      );

      toast({
        title: "Status atualizado",
        description: "O status do contato foi atualizado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchContacts();

    // Setup realtime subscription for new contacts
    const channel = supabase
      .channel('contacts-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contacts'
        },
        (payload) => {
          const newContact = {
            ...payload.new,
            status: payload.new.status as Contact['status']
          } as Contact;
          
          setContacts(prev => [newContact, ...prev]);
          
          toast({
            title: "Novo contato recebido!",
            description: `${newContact.name} enviou uma mensagem.`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500 text-white';
      case 'contacted': return 'bg-yellow-500 text-white';
      case 'converted': return 'bg-green-500 text-white';
      case 'closed': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: Contact['status']) => {
    switch (status) {
      case 'new': return 'Novo';
      case 'contacted': return 'Contatado';
      case 'converted': return 'Convertido';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando contatos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contatos Recebidos</h1>
        <p className="text-muted-foreground">
          Gerencie os contatos vindos do formulário do site
        </p>
      </div>

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum contato ainda</h3>
            <p className="text-muted-foreground">
              Os contatos enviados pelo formulário aparecerão aqui.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{contact.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(contact.status)}>
                          {getStatusLabel(contact.status)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {contact.source}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{formatDate(contact.created_at)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <h4 className="font-medium mb-2">Mensagem:</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                    {contact.message}
                  </p>
                </div>

                <div className="flex gap-2 pt-2">
                  {contact.status === 'new' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact.id, 'contacted')}
                    >
                      Marcar como Contatado
                    </Button>
                  )}
                  {contact.status === 'contacted' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact.id, 'converted')}
                    >
                      Marcar como Convertido
                    </Button>
                  )}
                  {(contact.status === 'new' || contact.status === 'contacted') && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact.id, 'closed')}
                    >
                      Fechar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsManager;