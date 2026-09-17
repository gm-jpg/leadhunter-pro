'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Globe,
  MessageSquare,
  Smartphone,
  Laptop,
  ArrowRight,
  Star,
  Zap,
  Award,
  Lock,
  Calendar,
  Send,
  UserCheck,
  DollarSign,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShoppingBag,
  Check,
} from 'lucide-react';
import { Lead } from '@/types/lead';
import { getNicheShowcase, NicheShowcaseData } from '@/lib/niche-photos';
import { HospitalityShowcase } from '@/components/showcase/HospitalityShowcase';
import { ArtisanalShowcase } from '@/components/showcase/ArtisanalShowcase';
import { UtilityShowcase } from '@/components/showcase/UtilityShowcase';
import { GastronomyShowcase } from '@/components/showcase/GastronomyShowcase';

function renderArchetypeShowcase(lead: Lead, developerDirectLink: string) {
  const cat = (lead.category || '').toLowerCase();

  // 1. Hotelaria, Pousadas & Hospedagem
  if (
    cat.includes('hotel') ||
    cat.includes('pousada') ||
    cat.includes('hospedagem') ||
    cat.includes('resort') ||
    cat.includes('chalé') ||
    cat.includes('chale') ||
    cat.includes('suíte') ||
    cat.includes('suite')
  ) {
    return <HospitalityShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 2. Açougues, Padarias & Ofício Artesanal
  if (
    cat.includes('açougue') ||
    cat.includes('acougue') ||
    cat.includes('carne') ||
    cat.includes('padaria') ||
    cat.includes('confeitaria') ||
    cat.includes('panificadora')
  ) {
    return <ArtisanalShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 3. Distribuidoras, Mercados, Conveniência & Drogarias
  if (
    cat.includes('distribuidora') ||
    cat.includes('bebida') ||
    cat.includes('mercado') ||
    cat.includes('mercadinho') ||
    cat.includes('conveniência') ||
    cat.includes('conveniencia') ||
    cat.includes('depósito') ||
    cat.includes('deposito') ||
    cat.includes('farmácia') ||
    cat.includes('drogaria')
  ) {
    return <UtilityShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 4. Gastronomia (Pizzarias, Hamburguerias, Restaurantes, Bares)
  return <GastronomyShowcase lead={lead} developerDirectLink={developerDirectLink} />;
}

export default function PublicProposalPage() {
  const params = useParams();
  const leadId = params?.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'site' | 'chatbot' | 'sobre'>('site');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Chatbot interativo com IA simulada
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'bot'; text: string; time: string }[]
  >([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    let foundLead: Lead | null = null;
    let devName = 'Desenvolvedor Parceiro';
    let devPhone = '5511999999999';

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lead_hunter_leads');
      if (saved) {
        try {
          const list: Lead[] = JSON.parse(saved);
          foundLead = list.find((l) => l.id === leadId) || null;
        } catch (e) {
          console.error(e);
        }
      }

      const profile = localStorage.getItem('lead_hunter_profile');
      if (profile) {
        try {
          const parsed = JSON.parse(profile);
          if (parsed.name) devName = parsed.name;
          if (parsed.phone) devPhone = parsed.phone;
        } catch (e) {}
      }
    }

    if (!foundLead) {
      foundLead = {
        id: leadId,
        placeId: 'demo',
        name: 'Pousada Recanto das Palmeiras',
        category: 'Pousada',
        address: 'Av. Beira Mar, 100 - Taperapuã',
        city: 'Porto Seguro',
        state: 'BA',
        phoneRaw: '(73) 98112-1387',
        whatsapp: '5573981121387',
        isMobile: true,
        googleMapsUrl: '#',
        website: null,
        rating: 4.9,
        userRatingsTotal: 48,
        photosCount: 4,
        photos: [],
        reviews: [
          {
            author: 'Mariana Silva',
            rating: 5,
            relativeTime: 'há 2 semanas',
            text: 'Suítes maravilhosas, ambiente impecável e café da manhã delicioso! Só demoraram um pouco para confirmar as diárias no WhatsApp.',
            sentiment: 'positive',
            detectedPraise: 'Ambiente aconchegante e excelente café da manhã',
            detectedIssue: 'Demora no retorno de diárias pelo WhatsApp',
          },
          {
            author: 'Carlos Andrade',
            rating: 5,
            relativeTime: 'há 1 mês',
            text: 'Recomendo muito a estadia! Se tivessem um site com fotos reais de cada quarto facilitaria muito.',
            sentiment: 'positive',
            detectedPraise: 'Recomendação máxima',
            detectedIssue: 'Falta de site com fotos detalhadas das suítes',
          },
        ],
        opportunityScore: 85,
        opportunityFactors: [],
        status: 'proposta_pronta',
        createdAt: new Date().toISOString(),
        developerPitch: {
          leadName: 'Pousada Recanto das Palmeiras',
          developerName: devName,
          summaryReason: 'Alta demanda por reservas diretas via WhatsApp com fotos das acomodações.',
          audit: {
            businessDiagnosis: 'Pousada de excelente reputação e alta procura turística.',
            profileGaps: [],
            customerSentiment: {
              praisedPoints: ['Suítes aconchegantes', 'Café da manhã colonial artesanal'],
              recurringComplaints: ['Demora para envio de fotos e valores de diárias'],
              sentimentSummary: 'Clientes adoram o local. O gap é 100% estrutural: falta de site próprio.',
              hasExplicitComplaints: false,
            },
            revenueLeaks: {
              description: 'Perda de clientes que pesquisam no Google pelo celular e não encontram reserva direta.',
              estimatedLoss: 'R$ 4.000 a R$ 9.000/mês em reservas que vão para terceiros',
            },
            tailoredSolutions: [],
            suggestedFee: 'R$ 1.200 a R$ 2.500',
            potentialClientRevenue: '+ R$ 5.000 a R$ 12.000/mês em reservas diretas sem taxas',
            objectionHandling: [],
          },
          suggestedServices: [],
          visualConcept: {
            headline: 'Transforme visualizações no Google em reservas e vendas todos os dias',
            subheadline: 'Uma presença digital elegante criada para valorizar o excelente serviço que você já entrega.',
            primaryColor: '#0284c7',
            secondaryColor: '#0d9488',
            badge: 'Portfólio & Demonstração Visual Exclusiva',
            keyBenefits: [
              'Mais clientes chegando direto no seu WhatsApp prontos para fechar',
              'Atendimento rápido mesmo fora do horário comercial',
              'Segurança técnica total e carregamento ultra-rápido',
              'Preços acessíveis pensados para o comércio local',
            ],
            features: [],
            chatbotSample: {
              customerQuestion: 'Olá! Gostaria de saber os valores e opções disponíveis hoje?',
              botReply: 'Olá! É um prazer atender você! 🌟 Nossas opções completas estão disponíveis aqui. Gostaria de agendar ou fazer seu pedido agora?',
            },
            revenueProjection: 'Estimativa de aumento de 30% a 50% em novos contatos.',
          },
          whatsappMessage: '',
        },
      };
    }

    setLead(foundLead);

    // Inicializar chat simulado com mensagem acolhedora
    const showcase = getNicheShowcase(foundLead.category, foundLead.name, foundLead.city);
    setChatMessages([
      {
        sender: 'bot',
        text: 'Olá! Bem-vindo(a) à *' + foundLead.name + '*! 🌟 Como posso te ajudar hoje? Você pode ver nosso catálogo de opções ou consultar valores direto por aqui!',
        time: 'Agora',
      },
    ]);

    setLoading(false);
  }, [leadId]);

  if (loading || !lead) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 font-semibold text-sm">Carregando portfólio e demonstração visual...</p>
        </div>
      </div>
    );
  }

  const pitch = lead.developerPitch;
  const devName = pitch?.developerName || 'Desenvolvedor Parceiro';
  const devWhatsApp = process.env.NEXT_PUBLIC_DEVELOPER_WHATSAPP || '5511999999999';
  const showcase: NicheShowcaseData = getNicheShowcase(lead.category, lead.name, lead.city);

  const developerDirectLink = `https://wa.me/${devWhatsApp}?text=${encodeURIComponent(
    `Olá ${devName}! Vi a demonstração visual e o site modelo que você preparou para a *${lead.name}*. Ficou sensacional! Gostaria de entender prazos e valores para colocar no ar!`
  )}`;

  const handleSimulateChatReply = (userQuestion: string, botAnswer: string) => {
    if (isBotTyping) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prev) => [...prev, { sender: 'user', text: userQuestion, time: now }]);
    setIsBotTyping(true);

    setTimeout(() => {
      setIsBotTyping(false);
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botAnswer, time: now }]);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-violet-600 selection:text-white font-sans">
      {/* Top Banner de Portfólio do Desenvolvedor */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 border-b border-white/10 text-white px-4 py-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-black text-amber-300 uppercase tracking-wider text-[11px]">
              Portfólio & Demonstração Visual Ativa
            </span>
            <span className="text-slate-300 hidden md:inline">• Criado sob medida para a {lead.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Seletor de Dispositivo Desktop / Mobile */}
            <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Celular</span>
              </button>
            </div>

            <a
              href={developerDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-emerald-900/40 transition-all text-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Falar com {devName}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Hero Header de Apresentação */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-violet-500/10 text-violet-400 border border-violet-500/30">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Conceito Moderno de Alta Conversão</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Uma nova presença digital para a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-sky-300 to-emerald-400">
                {lead.name}
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Veja abaixo como o seu comércio ganha autoridade no Google com fotos de altíssimo padrão, catálogo interativo e um atendente automático que recebe os pedidos e reservas prontos no seu WhatsApp.
            </p>
          </div>

          {/* Badge de Reputação Real no Google */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shrink-0 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-2xl font-black text-white">{lead.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400 font-bold">no Google</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              {lead.userRatingsTotal} avaliações reais de clientes em {lead.city}
            </p>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-emerald-400 font-extrabold">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Excelente Reputação Pronta para Escalar</span>
            </div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="mt-8 flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl max-w-md">
          <button
            onClick={() => setActiveTab('site')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'site'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>1. Website Modelo</span>
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'chatbot'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>2. Atendente WhatsApp</span>
          </button>
          <button
            onClick={() => setActiveTab('sobre')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'sobre'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>3. Prazos & Valores</span>
          </button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 pb-28">
        {/* ABA 1: WEBSITE MODELO COM FOTOS ELABORADAS */}
        {activeTab === 'site' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* CONTAINER DO MOCKUP (DESKTOP OU MOBILE) */}
            <div
              className={`mx-auto transition-all duration-300 ${
                deviceView === 'mobile'
                  ? 'max-w-sm rounded-[42px] border-[8px] border-slate-800 shadow-2xl overflow-hidden bg-slate-900'
                  : 'w-full rounded-3xl border border-slate-800 shadow-2xl overflow-hidden bg-slate-900'
              }`}
            >
              {/* Barra do Navegador */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="flex-1 bg-slate-950/80 rounded-xl px-3.5 py-1.5 text-xs text-slate-400 font-mono font-bold flex items-center justify-between border border-white/5">
                  <span className="truncate">
                    https://{lead.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com.br
                  </span>
                  <Lock className="w-3 h-3 text-emerald-400" />
                </div>
              </div>

              {/* CORPO DO SITE MODELO DINÂMICO CONFORME O NEGÓCIO REAL */}
              {renderArchetypeShowcase(lead, developerDirectLink)}
            </div>
          </div>
        )}

        {/* ABA 2: SIMULADOR DE CHATBOT DE WHATSAPP INTERATIVO */}
        {activeTab === 'chatbot' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Atendimento Inteligente 24 Horas
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Como funciona o Atendente Virtual no WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                O cliente clica em qualquer opção e recebe a resposta na mesma hora, sem deixar ninguém esperando no fim de semana ou à noite.
              </p>
            </div>

            {/* Simulador Visual do WhatsApp */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
              {/* Header do Chat */}
              <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center font-black text-sm shadow">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm">{lead.name}</div>
                    <div className="text-[11px] text-emerald-200 flex items-center gap-1 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Online • Atendente Automático</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] bg-emerald-950/40 px-3 py-1 rounded-full font-bold">
                  Simulação Ativa
                </div>
              </div>

              {/* Mensagens do Chat */}
              <div className="p-4 sm:p-6 space-y-3 min-h-[280px] bg-[#0b141a] bg-opacity-95">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-md ${
                        msg.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <span className="text-[10px] opacity-70 block text-right mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isBotTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none px-4 py-2 text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200"></span>
                      <span className="text-[11px] font-semibold ml-1">Atendente digitando...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Botões Interativos de Teste para o Dono do Comércio */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Clique para testar as respostas automáticas:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleSimulateChatReply(
                        'Quais são os horários de atendimento e opções?',
                        'Com certeza! Atendemos com muito carinho aqui em ' + lead.city + '. Nosso catálogo atualizado com todas as opções e valores está no link oficial do site. Posso reservar seu atendimento agora?'
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    1. Ver Horários & Opções
                  </button>
                  <button
                    onClick={() =>
                      handleSimulateChatReply(
                        'Vocês fazem entrega ou reserva para o fim de semana?',
                        'Sim! Realizamos entregas e reservas programadas para todo o município. Me informe seu nome e qual opção do catálogo você deseja para eu já deixar separado para você!'
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    2. Consultar Entregas/Reservas
                  </button>
                  <button
                    onClick={() =>
                      handleSimulateChatReply(
                        'Gostaria de falar com uma pessoa da equipe',
                        'Perfeito! Já notifiquei nossa equipe presencial aqui na ' + lead.name + '. Um atendente humano vai assumir este chat em instantes para tirar suas dúvidas com atenção total!'
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    3. Falar com Atendente Humano
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: SOBRE O DESENVOLVEDOR, PRAZOS E SEGURANÇA */}
        {activeTab === 'sobre' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="text-center space-y-2">
              <span className="text-xs font-black text-sky-400 uppercase tracking-wider bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                Parceria Direta & Sem Complicação
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Como funciona a implementação para a {lead.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Trabalho independente com foco em gerar faturamento real, sem mensalidades abusivas e com entrega em tempo recorde.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">No Ar em 48 a 72 Horas</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Toda a estrutura de site, fotos tratadas e bot do WhatsApp configurada rapidamente sem tomar o tempo da sua equipe.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20">
                  <DollarSign className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Valores Justos & Acessíveis</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Investimento de setup único pensado para a realidade do comércio local. Com poucas vendas extras o projeto já se paga.
                </p>
              </div>

              <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-white">Segurança & Suporte</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sem contratos de fidelidade engessados. Você tem controle total dos seus domínios, fotos e clientes.
                </p>
              </div>
            </div>

            {/* Chamada para Bater um Papo Descontraído */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-950/60 via-slate-900 to-slate-900 border border-violet-800/40 text-center space-y-4 shadow-xl">
              <h4 className="text-xl font-black text-white">
                Vamos bater um papo descontraído e sem compromisso?
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                Posso personalizar as cores, fotos e textos exatamente como você preferir para a {lead.name}. Me chame no WhatsApp e alinhamos os detalhes!
              </p>
              <a
                href={developerDirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950 transition-all hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar com {devName} no WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Barra Flutuante de Conversão Fixa no Rodapé */}
      <div className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-50">
        <div className="p-3 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center justify-between gap-3">
          <div className="truncate">
            <p className="text-xs font-extrabold text-white truncate">
              Gostou da demonstração para a {lead.name}?
            </p>
            <p className="text-[11px] text-emerald-400 font-semibold truncate">
              Podemos colocar no ar em 48 horas!
            </p>
          </div>
          <a
            href={developerDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
