// =================================================================
// EDGE FUNCTION: Captação de Contatos
// =================================================================
// Esta função processa submissões do formulário de contato
// Funciona como um backend Node.js, mas usa Deno (runtime do Supabase)
// =================================================================

import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.56.1';

// =================================================================
// CONFIGURAÇÃO DE CORS
// =================================================================
// Permite que o frontend faça requisições para esta função
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Permite qualquer origem
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// =================================================================
// TIPOS / INTERFACES
// =================================================================
// Define a estrutura dos dados que esperamos receber
interface ContactFormData {
  name: string;        // Nome completo do cliente
  email: string;       // Email para contato
  phone: string;       // Telefone (formato brasileiro)
  message: string;     // Mensagem/pedido do cliente
}

// =================================================================
// FUNÇÃO DE VALIDAÇÃO
// =================================================================
// Valida os dados recebidos antes de salvar no banco
function validateContactData(data: ContactFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validação do nome
  if (!data.name || data.name.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres');
  }
  if (data.name.length > 100) {
    errors.push('Nome muito longo (máximo 100 caracteres)');
  }

  // Validação do email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Email inválido');
  }
  if (data.email.length > 255) {
    errors.push('Email muito longo (máximo 255 caracteres)');
  }

  // Validação do telefone (formato brasileiro)
  // Remove caracteres não numéricos
  const phoneNumbers = data.phone.replace(/\D/g, '');
  if (phoneNumbers.length < 10 || phoneNumbers.length > 11) {
    errors.push('Telefone deve ter 10 ou 11 dígitos');
  }

  // Validação da mensagem
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  }
  if (data.message.length > 5000) {
    errors.push('Mensagem muito longa (máximo 5000 caracteres)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// =================================================================
// FUNÇÃO PRINCIPAL
// =================================================================
const handler = async (req: Request): Promise<Response> => {
  
  // -----------------------------------------------------------------
  // TRATAMENTO DE CORS (Preflight)
  // -----------------------------------------------------------------
  // Responde a requisições OPTIONS (pré-voo do navegador)
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // -----------------------------------------------------------------
  // INICIALIZAÇÃO DO CLIENTE SUPABASE
  // -----------------------------------------------------------------
  // Cria cliente para acessar o banco de dados
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    console.log('📨 Nova requisição de contato recebida');

    // -----------------------------------------------------------------
    // PARSING DOS DADOS
    // -----------------------------------------------------------------
    // Extrai os dados do corpo da requisição
    const requestData: ContactFormData = await req.json();
    
    console.log('📋 Dados recebidos:', {
      name: requestData.name,
      email: requestData.email,
      phone: requestData.phone,
      messageLength: requestData.message?.length || 0
    });

    // -----------------------------------------------------------------
    // VALIDAÇÃO DOS DADOS
    // -----------------------------------------------------------------
    const validation = validateContactData(requestData);
    
    if (!validation.valid) {
      console.error('❌ Validação falhou:', validation.errors);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Dados inválidos',
          details: validation.errors
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // -----------------------------------------------------------------
    // VERIFICAÇÃO DE RATE LIMITING
    // -----------------------------------------------------------------
    // Pega o IP do cliente para verificar se não está abusando
    const clientIp = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    
    console.log('🔍 Verificando rate limit para IP:', clientIp);

    // Chama função do banco que verifica e atualiza rate limit
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .rpc('check_and_update_rate_limit', {
        client_ip: clientIp
      });

    if (rateLimitError) {
      console.error('❌ Erro ao verificar rate limit:', rateLimitError);
      // Continua mesmo com erro (não bloqueia o contato)
    }

    // Se retornou false, significa que excedeu o limite
    if (rateLimitData === false) {
      console.warn('⚠️ Rate limit excedido para IP:', clientIp);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Limite de submissões excedido. Tente novamente mais tarde.'
        }),
        {
          status: 429, // Too Many Requests
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // -----------------------------------------------------------------
    // INSERÇÃO NO BANCO DE DADOS
    // -----------------------------------------------------------------
    // Salva o contato na tabela 'contacts'
    const { data: contactData, error: insertError } = await supabase
      .from('contacts')
      .insert([
        {
          name: requestData.name.trim(),
          email: requestData.email.trim().toLowerCase(),
          phone: requestData.phone,
          message: requestData.message.trim(),
          status: 'new',        // Status inicial
          source: 'website'     // Origem do contato
        }
      ])
      .select()
      .single();

    if (insertError) {
      console.error('❌ Erro ao inserir contato:', insertError);
      throw insertError;
    }

    console.log('✅ Contato salvo com sucesso:', contactData.id);

    // -----------------------------------------------------------------
    // ENVIO DE EMAIL DE CONFIRMAÇÃO (OPCIONAL)
    // -----------------------------------------------------------------
    // DESCOMENTAR SE QUISER ENVIAR EMAIL AUTOMÁTICO
    // Você precisará configurar Resend (https://resend.com)
    /*
    try {
      await supabase.functions.invoke('send-confirmation-email', {
        body: {
          to: requestData.email,
          name: requestData.name
        }
      });
      console.log('📧 Email de confirmação enviado');
    } catch (emailError) {
      console.error('⚠️ Erro ao enviar email (não crítico):', emailError);
      // Não falha a requisição se o email falhar
    }
    */

    // -----------------------------------------------------------------
    // NOTIFICAÇÃO PARA ADMIN (OPCIONAL)
    // -----------------------------------------------------------------
    // DESCOMENTAR SE QUISER NOTIFICAR ADMIN POR EMAIL
    /*
    try {
      await supabase.functions.invoke('notify-admin-new-contact', {
        body: {
          contactId: contactData.id,
          name: requestData.name,
          email: requestData.email
        }
      });
      console.log('📧 Admin notificado');
    } catch (notifyError) {
      console.error('⚠️ Erro ao notificar admin:', notifyError);
    }
    */

    // -----------------------------------------------------------------
    // RESPOSTA DE SUCESSO
    // -----------------------------------------------------------------
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contato recebido com sucesso! Entraremos em contato em breve.',
        contactId: contactData.id
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error: any) {
    // -----------------------------------------------------------------
    // TRATAMENTO DE ERROS
    // -----------------------------------------------------------------
    console.error('❌ Erro ao processar contato:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erro ao processar contato. Tente novamente.',
        details: error.message
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

// =================================================================
// INICIALIZAÇÃO DO SERVIDOR
// =================================================================
serve(handler);

// =================================================================
// COMO USAR ESTA FUNÇÃO:
// =================================================================
// 
// 1. DO FRONTEND (React):
//    const { data, error } = await supabase.functions.invoke('submit-contact', {
//      body: { name, email, phone, message }
//    });
//
// 2. VARIÁVEIS DE AMBIENTE NECESSÁRIAS:
//    - SUPABASE_URL (automático)
//    - SUPABASE_SERVICE_ROLE_KEY (automático)
//
// 3. TABELA NO BANCO:
//    - 'contacts' com colunas: id, name, email, phone, message, status, source
//
// 4. RATE LIMITING:
//    - Usa função RPC 'check_and_update_rate_limit'
//    - Limite configurado no banco de dados
//
// =================================================================
