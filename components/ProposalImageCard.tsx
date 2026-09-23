'use client';

import React from 'react';
import {
  Sparkles,
  MessageCircle,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Lead, VisualDNA } from '@/types/lead';

interface Props {
  lead: Lead;
  id?: string;
}

export interface EnrichedVisualDNA extends VisualDNA {
  actionLabel: string;
  actionSubtext: string;
  fallbackPhotos: [string, string, string];
  nicheTag: string;
  interfaceFeature: string;
  curiosityHook: string;
}

/**
 * Garante URLs seguras com proxy de CORS para fotos do Google Places,
 * prevenindo tainted canvas na exportação com html-to-image / html2canvas.
 */
function resolveSafePhotoUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('/api/place-photo')) {
    return url;
  }
  if (url.includes('places.googleapis.com/v1/')) {
    const match = url.match(/places\/[^/]+\/photos\/[^/]+/);
    if (match) {
      return `/api/place-photo?name=${encodeURIComponent(match[0])}`;
    }
  }
  if (url.startsWith('places/')) {
    return `/api/place-photo?name=${encodeURIComponent(url)}`;
  }
  return url;
}

/**
 * Normaliza e resolve a identidade visual (Visual DNA) de forma precisa e autêntica
 * para qualquer categoria pesquisada, sem falsos positivos de substring.
 */
export function resolveVisualDNA(lead: Lead): EnrichedVisualDNA {
  const name = lead.name || '';
  const category = lead.category || '';
  const fullText = (category + ' ' + name).toLowerCase();

  // Função auxiliar para testar palavras inteiras ou expressões
  const has = (...terms: string[]) =>
    terms.some((term) => fullText.includes(term.toLowerCase()));

  // 1. DISTRIBUIDORAS DE BEBIDAS, ADEGAS, CONVENIÊNCIA & GELO (Alta Prioridade para evitar conflitos)
  if (
    has('bebida', 'adega', 'distribuidora', 'deposito de bebida', 'depósito de bebida', 'conveniencia', 'conveniência', 'cerveja', 'gelo', 'chopp', 'whisky', 'vinhos')
  ) {
    return {
      vibe: 'bebidas_delivery',
      vibeLabel: 'Bebidas Geladas & Atendimento Rápido',
      vibeDescription: 'Bebidas trincando de geladas, combos completos e atendimento ágil sem complicação.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#09101A',
        cardBg: '#0F1A28',
        innerCardBg: '#162438',
        primaryAccent: '#06B6D4',
        secondaryAccent: '#10B981',
        textColor: '#F0F9FF',
        textMuted: '#94A3B8',
        borderColor: '#1E324D',
        accentBadgeBg: 'rgba(6, 182, 212, 0.16)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#06B6D4',
        buttonText: '#09101A',
      },
      highlightedRealAsset: 'Variedade de marcas, bebidas estupidamente geladas e entrega pontual.',
      elevationConcept: 'Catálogo de bebidas no celular com envio direto do pedido no WhatsApp sem intermediários.',
      actionLabel: 'Pedir pelo WhatsApp',
      actionSubtext: 'Atendimento direto com o depósito',
      nicheTag: 'Depósito de Bebidas & Conveniência',
      interfaceFeature: 'Catálogo de Bebidas Geladas & Pedido no WhatsApp',
      curiosityHook: 'Catálogo completo com fotos das marcas, opções de combos para churrasco e pedidos automáticos no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1518176258769-f227c798150e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 2. PIZZARIAS, CANTINAS & TRATTORIAS
  if (has('pizz', 'cantina', 'trattoria', 'massa artesanal', 'forno a lenha')) {
    return {
      vibe: 'rustico',
      vibeLabel: 'Forno a Lenha & Tradição Familiar',
      vibeDescription: 'Calor do forno a lenha, massas de fermentação artesanal e sabores autênticos.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#140E0C',
        cardBg: '#1E1613',
        innerCardBg: '#2A1F1B',
        primaryAccent: '#E05A38',
        secondaryAccent: '#F59E0B',
        textColor: '#FFF7ED',
        textMuted: '#D5C4B5',
        borderColor: '#3D2C24',
        accentBadgeBg: 'rgba(224, 90, 56, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#E05A38',
        buttonText: '#140E0C',
      },
      highlightedRealAsset: 'Massa leve, forno a lenha tradicional e clientes fiéis.',
      elevationConcept: 'Cardápio interativo e canal direto de pedidos sem comissões.',
      actionLabel: 'Ver Cardápio & Pedir',
      actionSubtext: 'Pedidos diretos sem taxa de app',
      nicheTag: 'Gastronomia & Pizzaria',
      interfaceFeature: 'Cardápio Visual com Sabores & Fotos Reais',
      curiosityHook: 'Cardápio digital com seleção de bordas, sabores especiais e envio do pedido formatado no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 3. POUSADAS, HOTÉIS, RESORTS & HOSPEDAGEM
  if (has('pousada', 'hotel', 'resort', 'hospedagem', 'chale', 'chalé', 'suite', 'suíte')) {
    return {
      vibe: 'solar_praiano',
      vibeLabel: 'Aconchego, Conforto & Bem-Estar',
      vibeDescription: 'Acomodações acolhedoras, café da manhã colonial e tranquilidade para relaxar.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#09151F',
        cardBg: '#0E1F2E',
        innerCardBg: '#152C3E',
        primaryAccent: '#0284C7',
        secondaryAccent: '#F59E0B',
        textColor: '#F0F9FF',
        textMuted: '#94A3B8',
        borderColor: '#1C3B53',
        accentBadgeBg: 'rgba(2, 132, 199, 0.18)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Acomodações acolhedoras e atendimento elogiado por quem se hospeda.',
      elevationConcept: 'Apresentação refinada das suítes e canal de reserva direta no WhatsApp.',
      actionLabel: 'Reservar Suíte no WhatsApp',
      actionSubtext: 'Melhor tarifa garantida sem taxas',
      nicheTag: 'Hospedagem & Conforto',
      interfaceFeature: 'Galeria das Suítes & Reservas Diretas',
      curiosityHook: 'Tour fotográfico de cada quarto, café da manhã e consulta de disponibilidade em 1 toque.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 4. RESTAURANTES, HAMBURGUERIAS, BARES & GASTRONOMIA
  if (has('restaurante', 'hamburg', 'burger', 'bar', 'churrascaria', 'culinaria', 'culinária', 'gastronomia', 'espeto', 'peixe', 'frutos do mar')) {
    return {
      vibe: 'gastronomia_autoral',
      vibeLabel: 'Sabor Autêntico & Experiência Marcante',
      vibeDescription: 'Ingredientes frescos selecionados, preparo artesanal e ambiente acolhedor.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#121115',
        cardBg: '#1C1921',
        innerCardBg: '#27232E',
        primaryAccent: '#F97316',
        secondaryAccent: '#FBBF24',
        textColor: '#FAFAF9',
        textMuted: '#A8A29E',
        borderColor: '#393342',
        accentBadgeBg: 'rgba(249, 115, 22, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#EA580C',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Pratos saborosos, ambiente aconchegante e equipe atenciosa.',
      elevationConcept: 'Cardápio digital visual com fotos apetitosas e pedidos diretos no WhatsApp.',
      actionLabel: 'Ver Cardápio & Reservar Mesa',
      actionSubtext: 'Atendimento direto com a casa',
      nicheTag: 'Gastronomia & Restaurante',
      interfaceFeature: 'Cardápio Digital & Reservas de Mesas',
      curiosityHook: 'Cardápio interativo com fotos reais dos pratos mais elogiados e canal direto de reservas.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 5. SAÚDE, ODONTOLOGIA & CLÍNICAS MÉDICAS
  if (has('odonto', 'dent', 'clinica', 'clínica', 'saude', 'saúde', 'medic', 'médic', 'consultorio', 'consultório', 'fisioterapi', 'psicolog', 'oftalm', 'dermatol')) {
    return {
      vibe: 'clinico_humano',
      vibeLabel: 'Cuidado Humano & Confiança Médica',
      vibeDescription: 'Acolhimento humanizado, procedimentos de alta precisão e segurança para toda a família.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#08131E',
        cardBg: '#0D1E2D',
        innerCardBg: '#142A3D',
        primaryAccent: '#0EA5E9',
        secondaryAccent: '#10B981',
        textColor: '#F0F9FF',
        textMuted: '#94A3B8',
        borderColor: '#1C3A54',
        accentBadgeBg: 'rgba(14, 165, 233, 0.16)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Ambiente impecável, profissionais experientes e atendimento acolhedor.',
      elevationConcept: 'Apresentação clara dos tratamentos e agendamento de consultas via WhatsApp.',
      actionLabel: 'Agendar Consulta no WhatsApp',
      actionSubtext: 'Atendimento direto com a recepção',
      nicheTag: 'Saúde & Odontologia',
      interfaceFeature: 'Apresentação de Especialidades & Agendamento',
      curiosityHook: 'Apresentação humanizada dos tratamentos, dúvidas frequentes e canal seguro de agendamento.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 6. OFICINAS MECÂNICAS, AUTO CENTERS & FUNILARIA
  if (has('oficina', 'mecanic', 'mecânica', 'mecanica', 'auto center', 'autocenter', 'pneu', 'funilaria', 'martelinho', 'troca de oleo', 'troca de óleo')) {
    return {
      vibe: 'tecnico_confiavel',
      vibeLabel: 'Tecnologia Automotiva & Confiança',
      vibeDescription: 'Diagnóstico transparente, equipe experiente e agilidade com o seu veículo.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0F1218',
        cardBg: '#161B24',
        innerCardBg: '#1E2532',
        primaryAccent: '#F97316',
        secondaryAccent: '#38BDF8',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2A3446',
        accentBadgeBg: 'rgba(249, 115, 22, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#F97316',
        buttonText: '#0F1218',
      },
      highlightedRealAsset: 'Honestidade nos orçamentos, peças de procedência e pontualidade na entrega.',
      elevationConcept: 'Apresentação clara dos serviços prestados e canal de agendamento de revisão pelo WhatsApp.',
      actionLabel: 'Agendar Revisão no WhatsApp',
      actionSubtext: 'Orçamento rápido com a equipe',
      nicheTag: 'Serviços Automotivos & Mecânica',
      interfaceFeature: 'Tabela de Serviços & Agendamento Rápido',
      curiosityHook: 'Apresentação dos serviços automotivos, fotos da oficina e solicitação rápida de orçamento.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 7. SALÕES DE BELEZA, ESTÉTICA & BARBEARIAS
  if (has('salao', 'salão', 'barbearia', 'barber', 'beleza', 'estetica', 'estética', 'manicure', 'unha', 'sobrancelha', 'cabelo', 'corte')) {
    return {
      vibe: 'estilo_autocuidado',
      vibeLabel: 'Estilo, Cuidado & Bem-Estar',
      vibeDescription: 'Técnica refinada, ambiente aconchegante e valorização do seu estilo pessoal.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#131016',
        cardBg: '#1C1721',
        innerCardBg: '#26202D',
        primaryAccent: '#EC4899',
        secondaryAccent: '#F59E0B',
        textColor: '#FAF5FF',
        textMuted: '#C4B5FD',
        borderColor: '#382D42',
        accentBadgeBg: 'rgba(236, 72, 153, 0.18)',
        accentBadgeText: '#F472B6',
        buttonBg: '#EC4899',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Profissionais dedicadas, ambiente caprichado e resultados impecáveis.',
      elevationConcept: 'Catálogo de procedimentos e agendamento descomplicado de horários no WhatsApp.',
      actionLabel: 'Agendar Horário no WhatsApp',
      actionSubtext: 'Atendimento direto com a equipe',
      nicheTag: 'Beleza, Cuidado & Estética',
      interfaceFeature: 'Menu de Procedimentos & Agendamento',
      curiosityHook: 'Galeria com resultados reais, catálogo de procedimentos e confirmação de horário sem filas.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 8. ACADEMIAS, CROSSFIT, PILATES & FITNESS (Verificação estrita por palavras inteiras)
  if (
    has('academia', 'fitness', 'crossfit', 'pilates', 'musculacao', 'musculação', 'centro de treinamento') ||
    /\b(lutas?|boxe|treino)\b/i.test(fullText)
  ) {
    return {
      vibe: 'energia_performance',
      vibeLabel: 'Energia, Foco & Resultados Reais',
      vibeDescription: 'Ambiente motivador, equipamentos de primeira linha e acompanhamento focado nos seus objetivos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0D1117',
        cardBg: '#151C26',
        innerCardBg: '#1D2736',
        primaryAccent: '#84CC16',
        secondaryAccent: '#EAB308',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2A374A',
        accentBadgeBg: 'rgba(132, 204, 22, 0.16)',
        accentBadgeText: '#A3E635',
        buttonBg: '#84CC16',
        buttonText: '#0F172A',
      },
      highlightedRealAsset: 'Equipamentos modernos, professores atenciosos e clima inspirador.',
      elevationConcept: 'Grade de modalidades no celular e canal direto no WhatsApp para agendar visita.',
      actionLabel: 'Falar com a Recepção no WhatsApp',
      actionSubtext: 'Conheça nossos planos e horários',
      nicheTag: 'Fitness & Saúde Ativa',
      interfaceFeature: 'Modalidades & Grade de Horários no Celular',
      curiosityHook: 'Apresentação dos espaços de treino, modalidades oferecidas e canal direto com a recepção.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 9. PET SHOPS & CLÍNICAS VETERINÁRIAS
  if (has('pet', 'veterin', 'banho e tosa', 'tosa', 'racao', 'ração', 'animal')) {
    return {
      vibe: 'afetivo_pet',
      vibeLabel: 'Carinho, Cuidado & Saúde Animal',
      vibeDescription: 'Acolhimento dedicado, cuidado com bem-estar dos pets e tranquilidade para os tutores.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0B1418',
        cardBg: '#121F26',
        innerCardBg: '#192C36',
        primaryAccent: '#10B981',
        secondaryAccent: '#F59E0B',
        textColor: '#F0FDF4',
        textMuted: '#94A3B8',
        borderColor: '#213D4B',
        accentBadgeBg: 'rgba(16, 185, 129, 0.18)',
        accentBadgeText: '#34D399',
        buttonBg: '#10B981',
        buttonText: '#0B1418',
      },
      highlightedRealAsset: 'Higiene rigorosa, paciência com os animais e dedicação da equipe.',
      elevationConcept: 'Apresentação dos serviços de banho, tosa e cuidados com agendamento ágil no WhatsApp.',
      actionLabel: 'Agendar Horário do Pet no WhatsApp',
      actionSubtext: 'Atendimento com carinho e agilidade',
      nicheTag: 'Pet Shop & Cuidados Animais',
      interfaceFeature: 'Serviços para Pets & Agendamento de Horários',
      curiosityHook: 'Galeria dos pets atendidos, tabela de cuidados e confirmação rápida de horários no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 10. PADARIAS, CONFEITARIAS & CAFÉS
  if (has('padaria', 'confeitaria', 'café', 'cafe', 'panificadora', 'bolos', 'doceria')) {
    return {
      vibe: 'artesanal_acolhedor',
      vibeLabel: 'Fornadas Frescas & Café Aconchegante',
      vibeDescription: 'Pão quentinho saindo do forno, doces artesanais e o sabor inconfundível que acolhe.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#16120E',
        cardBg: '#211B15',
        innerCardBg: '#2D241C',
        primaryAccent: '#D97706',
        secondaryAccent: '#B45309',
        textColor: '#FEF3C7',
        textMuted: '#D4C3B3',
        borderColor: '#403328',
        accentBadgeBg: 'rgba(217, 119, 6, 0.18)',
        accentBadgeText: '#FBBF24',
        buttonBg: '#D97706',
        buttonText: '#16120E',
      },
      highlightedRealAsset: 'Variedade nas fornadas, produtos frescos todos os dias e atendimento acolhedor.',
      elevationConcept: 'Catálogo de encomendas de bolos, tortas e salgados com pedidos pelo WhatsApp.',
      actionLabel: 'Ver Cardápio & Encomendar',
      actionSubtext: 'Pedidos diretos com a produção',
      nicheTag: 'Panificação & Confeitaria Artesanal',
      interfaceFeature: 'Catálogo de Fornadas & Encomendas no WhatsApp',
      curiosityHook: 'Apresentação das receitas da casa, opções para encomendas de festas e contato facilitado no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 11. MERCADOS, SUPERMERCADOS, EMPÓRIOS & AÇOUGUES
  if (has('mercado', 'supermercado', 'empório', 'emporio', 'açougue', 'acougue', 'hortifruti', 'mercearia', 'carne')) {
    return {
      vibe: 'frescor_variedade',
      vibeLabel: 'Frescor, Variedade & Economia',
      vibeDescription: 'Itens selecionados diariamente, cortes de procedência e variedade para abastecer a sua casa.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#091510',
        cardBg: '#0F2119',
        innerCardBg: '#163024',
        primaryAccent: '#10B981',
        secondaryAccent: '#F59E0B',
        textColor: '#ECFDF5',
        textMuted: '#A7F3D0',
        borderColor: '#1D4233',
        accentBadgeBg: 'rgba(16, 185, 129, 0.18)',
        accentBadgeText: '#34D399',
        buttonBg: '#059669',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Prateleiras bem abastecidas, produtos frescos e bom atendimento no bairro.',
      elevationConcept: 'Encarte digital de novidades e canal direto para pedidos de entrega no WhatsApp.',
      actionLabel: 'Ver Produtos & Fazer Pedido',
      actionSubtext: 'Atendimento direto com a loja',
      nicheTag: 'Mercado, Carnes & Alimentos',
      interfaceFeature: 'Produtos em Destaque & Pedidos Express no WhatsApp',
      curiosityHook: 'Vitrine digital com os principais itens da semana e canal rápido para envio de pedidos no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 12. DEFAULT ADAPTATIVO UNIVERSAL (Para qualquer outro comércio local pesquisado)
  return {
    vibe: 'comercio_confianca',
    vibeLabel: 'Qualidade & Atendimento de Confiança',
    vibeDescription: `A tradição, o capricho e a seriedade com que a ${name} atende seus clientes.`,
    typographyStyle: 'sans',
    theme: {
      boardBg: '#0B111A',
      cardBg: '#111A26',
      innerCardBg: '#182434',
      primaryAccent: '#38BDF8',
      secondaryAccent: '#10B981',
      textColor: '#F8FAFC',
      textMuted: '#94A3B8',
      borderColor: '#223247',
      accentBadgeBg: 'rgba(56, 189, 248, 0.16)',
      accentBadgeText: '#7DD3FC',
      buttonBg: '#0284C7',
      buttonText: '#FFFFFF',
    },
    highlightedRealAsset: 'Atendimento elogiado pelos clientes e compromisso com a qualidade.',
    elevationConcept: 'Apresentação mobile autêntica com fotos reais e botão direto no WhatsApp da equipe.',
    actionLabel: 'Falar no WhatsApp',
    actionSubtext: 'Atendimento direto com a equipe',
    nicheTag: category || 'Comércio Local',
    interfaceFeature: 'Apresentação Institucional & Contato Rápido',
    curiosityHook: 'Estrutura desenvolvida para valorizar a marca, facilitar a localização do negócio e gerar contatos imediatos.',
    fallbackPhotos: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    ],
  };
}

/**
 * ProposalImageCard: Peça Visual Única, Limpa e sem Divisões Excessivas.
 * Formato Editorial Imersivo: O dono do comércio bate o olho e reconhece o negócio dele imediatamente.
 */
export const ProposalImageCard = React.forwardRef<HTMLDivElement, Props>(
  ({ lead, id = 'proposal-concept-board' }, ref) => {
    const city = lead.city || 'Porto Seguro';
    const dna = resolveVisualDNA(lead);
    const { theme } = dna;

    // Foto real ou foto editorial contextual autêntica
    const rawPhoto = lead.photos && lead.photos.length > 0 ? lead.photos[0] : '';
    const safeHeroPhoto = resolveSafePhotoUrl(rawPhoto) || dna.fallbackPhotos[0];

    // Headline autêntica baseada na categoria
    const headline =
      lead.developerPitch?.visualConcept?.headline ||
      (dna.vibe === 'bebidas_delivery'
        ? 'Bebidas trincando de geladas direto no seu endereço.'
        : dna.vibe === 'rustico'
        ? 'Massa artesanal, forno a lenha e a tradição que reúne famílias.'
        : dna.vibe === 'solar_praiano'
        ? 'Seu refúgio de tranquilidade, conforto e bem-estar.'
        : dna.vibe === 'artesanal_acolhedor'
        ? 'Pão quentinho, receitas artesanais e carinho em cada detalhe.'
        : dna.vibe === 'clinico_humano'
        ? 'Cuidado humanizado, tecnologia e bem-estar para você e sua família.'
        : dna.vibe === 'tecnico_confiavel'
        ? 'Precisão técnica, transparência e confiança com o seu veículo.'
        : dna.vibe === 'estilo_autocuidado'
        ? 'Técnica refinada, produtos nobres e o seu momento de cuidado.'
        : dna.vibe === 'afetivo_pet'
        ? 'O carinho e a dedicação que o seu melhor amigo merece.'
        : dna.vibe === 'frescor_variedade'
        ? 'Frescor, cortes selecionados e economia para o seu dia a dia.'
        : `A qualidade e a tradição de atendimento da ${lead.name}.`);

    return (
      <div
        ref={ref}
        id={id}
        className="w-[920px] p-8 rounded-[36px] shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative overflow-hidden"
        style={{
          minHeight: '1150px',
          backgroundColor: theme.boardBg,
          color: theme.textColor,
          borderColor: theme.borderColor,
          borderWidth: '1px',
          fontFamily:
            dna.typographyStyle === 'serif'
              ? 'ui-serif, Georgia, Cambria, serif'
              : 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Iluminação ambiente suave calibrada com a cor da marca */}
        <div
          className="absolute -top-36 -right-36 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
          style={{ backgroundColor: theme.primaryAccent }}
        />
        <div
          className="absolute -bottom-36 -left-36 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
          style={{ backgroundColor: theme.secondaryAccent }}
        />

        {/* ============================================================ */}
        {/* 1. CABEÇALHO ELEGANTE & DIRETO                               */}
        {/* ============================================================ */}
        <header
          className="pb-5 mb-6 relative z-10 flex items-center justify-between border-b"
          style={{ borderColor: `${theme.borderColor}80` }}
        >
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 border"
              style={{
                backgroundColor: theme.accentBadgeBg,
                color: theme.accentBadgeText,
                borderColor: `${theme.primaryAccent}40`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conceito Visual Exclusivo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight" style={{ color: theme.textColor }}>
              Como a presença digital da{' '}
              <span style={{ color: theme.primaryAccent }}>{lead.name}</span>{' '}
              se destaca no celular
            </h1>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-bold uppercase block tracking-wider" style={{ color: theme.textMuted }}>
              {city} • BA
            </span>
            <span
              className="text-[11px] font-extrabold px-3 py-1 rounded-xl border inline-block mt-1 shadow-xs"
              style={{
                backgroundColor: theme.cardBg,
                color: theme.primaryAccent,
                borderColor: `${theme.primaryAccent}40`,
              }}
            >
              Demonstração Autoral
            </span>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. O GRANDE PROTAGONISTA VISUAL (PÁGINA ÚNICA E SEM DIVISÕES) */}
        {/* ============================================================ */}
        <div className="relative z-10 mb-6">
          {/* Mockup do Smartphone Central com o Conceito do Site */}
          <div
            className="max-w-[540px] mx-auto rounded-[36px] p-3 shadow-2xl border-2 relative"
            style={{
              backgroundColor: '#0A0D14',
              borderColor: theme.borderColor,
              boxShadow: `0 25px 70px -15px rgba(0,0,0,0.85), 0 0 35px -5px ${theme.primaryAccent}25`,
            }}
          >
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1E29]" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
            </div>

            {/* Tela Interna */}
            <div
              className="rounded-[28px] overflow-hidden border relative"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: '#1C2333',
              }}
            >
              {/* Status Bar */}
              <div className="pt-2 px-5 pb-1 flex items-center justify-between text-[10px] font-bold text-slate-400 bg-black/40">
                <span>09:41</span>
                <div className="flex items-center gap-1.5 text-[9px] tracking-wider">
                  <span>5G</span>
                  <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.5">
                    <div className="w-full h-full bg-slate-300 rounded-2xs" />
                  </div>
                </div>
              </div>

              {/* Barra de Navegação do Estabelecimento */}
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{
                  backgroundColor: theme.innerCardBg,
                  borderColor: `${theme.borderColor}80`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shadow-xs"
                    style={{
                      backgroundColor: theme.primaryAccent,
                      color: theme.buttonText,
                    }}
                  >
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-extrabold text-xs block leading-tight truncate max-w-[240px]" style={{ color: theme.textColor }}>
                      {lead.name}
                    </span>
                    <span className="text-[10px] block opacity-80" style={{ color: theme.textMuted }}>
                      {dna.nicheTag}
                    </span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                  style={{
                    backgroundColor: `${theme.primaryAccent}15`,
                    color: theme.primaryAccent,
                    borderColor: `${theme.primaryAccent}30`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WhatsApp 1-Clique</span>
                </div>
              </div>

              {/* Hero Section do Site no Celular */}
              <div className="relative h-72 sm:h-80 overflow-hidden flex flex-col justify-end p-5">
                <img
                  src={safeHeroPhoto}
                  alt={lead.name}
                  crossOrigin="anonymous"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${theme.cardBg} 0%, ${theme.cardBg}E6 45%, ${theme.cardBg}50 80%, transparent 100%)`,
                  }}
                />

                <div className="relative z-10 space-y-2.5">
                  <div
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border backdrop-blur-xs"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: theme.primaryAccent,
                      borderColor: `${theme.primaryAccent}40`,
                    }}
                  >
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{city} • Atendimento Local</span>
                  </div>

                  <h2
                    className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-sm"
                    style={{ color: theme.textColor }}
                  >
                    {headline}
                  </h2>

                  <p className="text-xs line-clamp-2 leading-relaxed font-normal" style={{ color: theme.textMuted }}>
                    {dna.vibeDescription}
                  </p>

                  {/* Botão de Conversão Principal */}
                  <div className="pt-2 flex items-center justify-between">
                    <div
                      className="px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg"
                      style={{
                        backgroundColor: theme.buttonBg,
                        color: theme.buttonText,
                      }}
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>{dna.actionLabel}</span>
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: theme.textMuted }}>
                      {dna.actionSubtext}
                    </span>
                  </div>
                </div>
              </div>

              {/* Destaques Rápidos da Operação */}
              <div
                className="p-4 border-t grid grid-cols-3 gap-2 text-center"
                style={{
                  backgroundColor: theme.innerCardBg,
                  borderColor: `${theme.borderColor}80`,
                }}
              >
                <div className="p-2 rounded-xl bg-black/25 border border-white/5">
                  <span className="block text-[9px] font-bold uppercase opacity-70">Estrutura</span>
                  <span className="text-[11px] font-extrabold block truncate" style={{ color: theme.textColor }}>
                    Espaço Próprio
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-black/25 border border-white/5">
                  <span className="block text-[9px] font-bold uppercase opacity-70">Atendimento</span>
                  <span className="text-[11px] font-extrabold block truncate" style={{ color: theme.primaryAccent }}>
                    Direto no Zap
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-black/25 border border-white/5">
                  <span className="block text-[9px] font-bold uppercase opacity-70">Localização</span>
                  <span className="text-[11px] font-extrabold block truncate" style={{ color: theme.textColor }}>
                    {city}
                  </span>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="py-2 flex justify-center bg-black/50">
                <div className="w-24 h-1 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. TEASER DE CURIOSIDADE & IDENTIDADE (BLOCO LIMPO E ÚNICO)   */}
        {/* ============================================================ */}
        <div
          className="rounded-2xl p-5 border relative overflow-hidden mb-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: `${theme.primaryAccent}35`,
          }}
        >
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: theme.primaryAccent }} />
              <span className="text-xs font-black uppercase tracking-wider" style={{ color: theme.textColor }}>
                Esta imagem é apenas a primeira demonstração visual
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: theme.textMuted }}>
              {dna.curiosityHook}
            </p>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 border"
            style={{
              backgroundColor: theme.innerCardBg,
              color: theme.primaryAccent,
              borderColor: `${theme.primaryAccent}40`,
            }}
          >
            <span>Converse com o José</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. RODAPÉ DE HUMANIZAÇÃO DISCRETA                             */}
        {/* ============================================================ */}
        <footer
          className="pt-4 flex items-center justify-between relative z-10 border-t"
          style={{ borderColor: `${theme.borderColor}70` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl font-black text-sm flex items-center justify-center shadow-md shrink-0"
              style={{
                backgroundColor: theme.primaryAccent,
                color: theme.buttonText,
              }}
            >
              J
            </div>
            <div className="space-y-0.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs" style={{ color: theme.textColor }}>
                  Conceito visual desenvolvido por José
                </span>
                <span style={{ color: theme.textMuted }}>•</span>
                <span style={{ color: theme.textMuted }}>Porto Seguro, BA</span>
              </div>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>
                Demonstração criada com respeito à trajetória da {lead.name} • Sem qualquer custo ou compromisso.
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs shrink-0 border shadow-xs"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.primaryAccent,
              borderColor: `${theme.primaryAccent}40`,
            }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp: (21) 97285-0211</span>
          </div>
        </footer>
      </div>
    );
  }
);

ProposalImageCard.displayName = 'ProposalImageCard';
