'use client';

import React from 'react';
import {
  Sparkles,
  MessageCircle,
  Globe,
  Lock,
  Smartphone,
  Zap,
  Check,
  Eye,
  Layers,
  MapPin,
  ArrowRight,
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
 * Traduz as evidências reais do comércio em uma identidade visual autêntica
 * universalmente adaptativa para QUALQUER categoria pesquisada.
 */
export function resolveVisualDNA(lead: Lead): EnrichedVisualDNA {
  const existing =
    lead.developerPitch?.visualConcept?.visualDNA ||
    (lead as any).pitch?.visualConcept?.visualDNA;

  const name = lead.name || '';
  const category = lead.category || '';
  const city = lead.city || 'Porto Seguro';
  const reviews = lead.reviews || [];
  const lower = (category + ' ' + name).toLowerCase();
  const reviewsText = reviews.map((r) => r.text).join(' ').toLowerCase();

  // 1. Saúde, Odontologia & Clínicas
  if (
    lower.includes('odonto') ||
    lower.includes('dent') ||
    lower.includes('clinica') ||
    lower.includes('clínica') ||
    lower.includes('saude') ||
    lower.includes('saúde') ||
    lower.includes('medic') ||
    lower.includes('médic') ||
    lower.includes('consultorio') ||
    lower.includes('consultório') ||
    lower.includes('fisioterapi') ||
    lower.includes('psicolog') ||
    lower.includes('oftalm') ||
    lower.includes('dermatol')
  ) {
    return {
      vibe: 'clinico_humano',
      vibeLabel: 'Cuidado Humano & Confiança Médica',
      vibeDescription: 'Acolhimento humanizado, clareza nos procedimentos e segurança que tranquiliza cada paciente.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#091522',
        cardBg: '#0E1F33',
        innerCardBg: '#152C47',
        primaryAccent: '#06B6D4',
        secondaryAccent: '#10B981',
        textColor: '#F0F9FF',
        textMuted: '#94A3B8',
        borderColor: '#1E3E61',
        accentBadgeBg: 'rgba(6, 182, 212, 0.16)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Ambiente impecável, profissionais atenciosos e atendimento de ponta.',
      elevationConcept: 'Apresentação clara dos tratamentos e agendamento instantâneo via WhatsApp.',
      actionLabel: 'Agendar Consulta',
      actionSubtext: 'Atendimento direto com a recepção',
      nicheTag: 'Saúde & Odontologia',
      interfaceFeature: 'Agendamento Direto & Informações de Especialidades',
      curiosityHook: 'Apresentação humanizada dos profissionais, dúvidas frequentes dos pacientes e pré-agendamento rápido no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 2. Academia, Fitness, CrossFit & Lutas
  if (
    lower.includes('academia') ||
    lower.includes('fitness') ||
    lower.includes('crossfit') ||
    lower.includes('treino') ||
    lower.includes('musculação') ||
    lower.includes('musculacao') ||
    lower.includes('pilates') ||
    lower.includes('artes marciais') ||
    lower.includes('luta') ||
    lower.includes('boxe')
  ) {
    return {
      vibe: 'energia_performance',
      vibeLabel: 'Energia, Foco & Resultados Reais',
      vibeDescription: 'Ambiente motivador, equipamentos de primeira linha e acompanhamento focado nos seus objetivos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#101418',
        cardBg: '#181F26',
        innerCardBg: '#222B35',
        primaryAccent: '#84CC16',
        secondaryAccent: '#EAB308',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2D3A47',
        accentBadgeBg: 'rgba(132, 204, 22, 0.16)',
        accentBadgeText: '#A3E635',
        buttonBg: '#84CC16',
        buttonText: '#0F172A',
      },
      highlightedRealAsset: 'Equipamentos modernos, instrutores preparados e clima inspirador para treinar.',
      elevationConcept: 'Grade de aulas interativa no celular e convite para aula experimental sem burocracia.',
      actionLabel: 'Aula Experimental Grátis',
      actionSubtext: 'Fale direto com a recepção no WhatsApp',
      nicheTag: 'Fitness & Saúde Ativa',
      interfaceFeature: 'Horários de Treinos & Planos no Celular',
      curiosityHook: 'Tour visual dos espaços de treino, depoimentos de alunos e recepção automatizada no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 3. Salão de Beleza, Estética, Esmalteria & Spa
  if (
    lower.includes('salão') ||
    lower.includes('salao') ||
    lower.includes('beleza') ||
    lower.includes('estética') ||
    lower.includes('estetica') ||
    lower.includes('spa') ||
    lower.includes('unha') ||
    lower.includes('manicure') ||
    lower.includes('sobrancelha') ||
    lower.includes('cabel') ||
    lower.includes('hair') ||
    lower.includes('lash')
  ) {
    return {
      vibe: 'beleza_sofisticada',
      vibeLabel: 'Beleza, Cuidado & Bem-Estar',
      vibeDescription: 'Técnica refinada, produtos nobres e uma experiência de relaxamento e transformação pessoal.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#181216',
        cardBg: '#241B21',
        innerCardBg: '#32262E',
        primaryAccent: '#F472B6',
        secondaryAccent: '#F59E0B',
        textColor: '#FDF2F8',
        textMuted: '#D8B4E2',
        borderColor: '#4A3343',
        accentBadgeBg: 'rgba(244, 114, 182, 0.18)',
        accentBadgeText: '#F472B6',
        buttonBg: '#EC4899',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Espaço requintado, profissionais caprichosas e resultados impecáveis.',
      elevationConcept: 'Catálogo de serviços fotográficos e agendamento VIP no WhatsApp.',
      actionLabel: 'Agendar Horário VIP',
      actionSubtext: 'Confirmação rápida com a equipe',
      nicheTag: 'Beleza & Bem-Estar',
      interfaceFeature: 'Menu Visual de Procedimentos & Portfólio',
      curiosityHook: 'Galeria dos melhores resultados reais, detalhamento dos cuidados e seleção rápida de procedimentos.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 4. Barbearia & Grooming Masculino
  if (
    lower.includes('barbearia') ||
    lower.includes('barber') ||
    lower.includes('barba') ||
    lower.includes('corte masculino') ||
    lower.includes('navalha')
  ) {
    return {
      vibe: 'barber_craft',
      vibeLabel: 'Estilo Clássico & Cuidado Masculino',
      vibeDescription: 'Cortes precisos, toalha quente, navalha afiada e a clássica resenha entre amigos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#131314',
        cardBg: '#1E1E20',
        innerCardBg: '#28282C',
        primaryAccent: '#F59E0B',
        secondaryAccent: '#D97706',
        textColor: '#F5F5F5',
        textMuted: '#A3A3A3',
        borderColor: '#3D3D42',
        accentBadgeBg: 'rgba(245, 158, 11, 0.16)',
        accentBadgeText: '#FBBF24',
        buttonBg: '#D97706',
        buttonText: '#131314',
      },
      highlightedRealAsset: 'Cortes com acabamento perfeito, ambiente descontraído e cerveja gelada.',
      elevationConcept: 'Cardápio de serviços, fotos dos barbeiros e reserva de cadeira sem filas.',
      actionLabel: 'Reservar Cadeira',
      actionSubtext: 'Escolha seu profissional no WhatsApp',
      nicheTag: 'Barbearia Clássica',
      interfaceFeature: 'Reserva Direta de Horário & Estilos de Corte',
      curiosityHook: 'Apresentação dos cortes mais pedidos, escolha do barbeiro de preferência e confirmação instantânea.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 5. Pet Shop & Clínica Veterinária
  if (
    lower.includes('pet') ||
    lower.includes('veterinár') ||
    lower.includes('veterinar') ||
    lower.includes('banho e tosa') ||
    lower.includes('ração') ||
    lower.includes('racao') ||
    lower.includes('animal') ||
    lower.includes('cão') ||
    lower.includes('gato')
  ) {
    return {
      vibe: 'cuidado_pet',
      vibeLabel: 'Carinho & Proteção para seu Pet',
      vibeDescription: 'Dedicação total à saúde, conforto e felicidade dos membros de quatro patas da família.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0C1717',
        cardBg: '#132424',
        innerCardBg: '#1B3333',
        primaryAccent: '#14B8A6',
        secondaryAccent: '#F59E0B',
        textColor: '#F0FDFA',
        textMuted: '#99F6E4',
        borderColor: '#234444',
        accentBadgeBg: 'rgba(20, 184, 166, 0.18)',
        accentBadgeText: '#2DD4BF',
        buttonBg: '#0D9488',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Equipe carinhosa, cuidado exemplar com os animais e ambiente limpo.',
      elevationConcept: 'Agendamento de banho e tosa e catálogo de rações direto no WhatsApp.',
      actionLabel: 'Agendar Banho & Tosa',
      actionSubtext: 'Atendimento rápido e com carinho',
      nicheTag: 'Cuidado Animal & Pet Shop',
      interfaceFeature: 'Serviços Pet & Catálogo com Pedido Rápido',
      curiosityHook: 'Agendamento simplificado de banho e tosa, consulta veterinária e entrega de rações direto no celular.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 6. Oficina Mecânica, Auto Center & Estética Automotiva
  if (
    lower.includes('oficina') ||
    lower.includes('mecânica') ||
    lower.includes('mecanica') ||
    lower.includes('auto center') ||
    lower.includes('pneu') ||
    lower.includes('funilaria') ||
    lower.includes('lava rápido') ||
    lower.includes('estética automotiva') ||
    lower.includes('detail') ||
    lower.includes('troca de óleo') ||
    lower.includes('retífica')
  ) {
    return {
      vibe: 'precisao_automotiva',
      vibeLabel: 'Engenharia, Precisão & Confiança',
      vibeDescription: 'Diagnóstico transparente, equipamentos de precisão e cuidado minucioso com o seu veículo.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0F1318',
        cardBg: '#161C24',
        innerCardBg: '#202833',
        primaryAccent: '#2563EB',
        secondaryAccent: '#38BDF8',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2B3746',
        accentBadgeBg: 'rgba(37, 99, 235, 0.18)',
        accentBadgeText: '#60A5FA',
        buttonBg: '#2563EB',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Serviço honesto, mecânicos experientes e entrega no prazo combinado.',
      elevationConcept: 'Solicitação de orçamento fotográfico e acompanhamento do serviço no celular.',
      actionLabel: 'Pedir Orçamento Rápido',
      actionSubtext: 'Envie fotos do problema no WhatsApp',
      nicheTag: 'Serviços Automotivos',
      interfaceFeature: 'Check-in Digital & Tabela de Manutenção Preventiva',
      curiosityHook: 'Diagnóstico transparente, explicação clara de peças e serviços e canal prioritário para orçamentos.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 7. Imobiliária & Corretores
  if (
    lower.includes('imobiliária') ||
    lower.includes('imobiliaria') ||
    lower.includes('corretor') ||
    lower.includes('imóve') ||
    lower.includes('imove') ||
    lower.includes('aluguel de imóveis') ||
    lower.includes('condomínio')
  ) {
    return {
      vibe: 'imobiliaria_premium',
      vibeLabel: 'Arquitetura & Negócios Exclusivos',
      vibeDescription: 'Curadoria dos melhores endereços, assessoria jurídica segura e o imóvel certo para viver ou investir.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#0B131E',
        cardBg: '#131E2D',
        innerCardBg: '#1C2B3F',
        primaryAccent: '#EAB308',
        secondaryAccent: '#38BDF8',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#233750',
        accentBadgeBg: 'rgba(234, 179, 8, 0.16)',
        accentBadgeText: '#FDE047',
        buttonBg: '#CA8A04',
        buttonText: '#0B131E',
      },
      highlightedRealAsset: 'Portfólio selecionado, corretores transparentes e negociações seguras.',
      elevationConcept: 'Apresentação imersiva em fotos panorâmicas e agendamento de visitas no WhatsApp.',
      actionLabel: 'Ver Imóveis Disponíveis',
      actionSubtext: 'Fale com um corretor especialista',
      nicheTag: 'Imóveis & Investimentos',
      interfaceFeature: 'Filtros Rápidos por Região & Tour Fotográfico',
      curiosityHook: 'Apresentação refinada das oportunidades de compra e locação, fotos em alta resolução e contato direto do corretor.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 8. Escolas, Cursos, Creches & Educação
  if (
    lower.includes('escola') ||
    lower.includes('colégio') ||
    lower.includes('colegio') ||
    lower.includes('curso') ||
    lower.includes('creche') ||
    lower.includes('idioma') ||
    lower.includes('educação') ||
    lower.includes('educacao') ||
    lower.includes('berçário')
  ) {
    return {
      vibe: 'educacao_futuro',
      vibeLabel: 'Aprendizado, Afeto & Futuro',
      vibeDescription: 'Formação sólida, acolhimento pedagógico e estímulo ao potencial e curiosidade de cada aluno.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0E1326',
        cardBg: '#161E38',
        innerCardBg: '#202B4F',
        primaryAccent: '#6366F1',
        secondaryAccent: '#F59E0B',
        textColor: '#EEF2FF',
        textMuted: '#A5B4FC',
        borderColor: '#2A3866',
        accentBadgeBg: 'rgba(99, 102, 241, 0.18)',
        accentBadgeText: '#818CF8',
        buttonBg: '#4F46E5',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Professores dedicados, ambiente seguro e proposta pedagógica que inspira os alunos.',
      elevationConcept: 'Apresentação da metodologia, fotos do espaço e agendamento de visita escolar no celular.',
      actionLabel: 'Agendar Visita Pedagógica',
      actionSubtext: 'Fale com a coordenação no WhatsApp',
      nicheTag: 'Educação & Aprendizado',
      interfaceFeature: 'Apresentação da Metodologia & Calendário Escolar',
      curiosityHook: 'Conheça o espaço por fotos, entenda a proposta pedagógica e tire dúvidas de matrículas em um toque.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 9. Lojas, Boutique, Moda, Calçados & Varejo
  if (
    lower.includes('loja') ||
    lower.includes('boutique') ||
    lower.includes('roupa') ||
    lower.includes('moda') ||
    lower.includes('calçado') ||
    lower.includes('calcado') ||
    lower.includes('joalheria') ||
    lower.includes('ótica') ||
    lower.includes('otica') ||
    lower.includes('presentes') ||
    lower.includes('decoração') ||
    lower.includes('acessor')
  ) {
    return {
      vibe: 'moda_design',
      vibeLabel: 'Estilo, Curadoria & Bom Gosto',
      vibeDescription: 'Peças selecionadas a dedo, atendimento consultivo e coleções que valorizam o seu estilo.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#151318',
        cardBg: '#201D24',
        innerCardBg: '#2D2833',
        primaryAccent: '#FB7185',
        secondaryAccent: '#F43F5E',
        textColor: '#FAF5F8',
        textMuted: '#D4C4D1',
        borderColor: '#3D3445',
        accentBadgeBg: 'rgba(251, 113, 133, 0.18)',
        accentBadgeText: '#FDA4AF',
        buttonBg: '#E11D48',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Coleções atualizadas, produtos de qualidade e atendimento próximo e simpático.',
      elevationConcept: 'Catálogo de novidades no celular e reserva de peças no WhatsApp.',
      actionLabel: 'Ver Catálogo & Novidades',
      actionSubtext: 'Consulte tamanhos e reserve peças',
      nicheTag: 'Moda & Varejo Exclusivo',
      interfaceFeature: 'Catálogo Visual com Fotos Reais & Encomenda Fácil',
      curiosityHook: 'Lançamentos da semana, disponibilidade de tamanhos e compra guiada direto no WhatsApp da loja.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 10. Supermercados, Empórios & Hortifruti
  if (
    lower.includes('supermercado') ||
    lower.includes('mercado') ||
    lower.includes('empório') ||
    lower.includes('emporio') ||
    lower.includes('hortifruti') ||
    lower.includes('mercearia') ||
    lower.includes('distribuidora') ||
    lower.includes('açougue') ||
    lower.includes('acougue')
  ) {
    return {
      vibe: 'frescor_variedade',
      vibeLabel: 'Frescor, Variedade & Economia',
      vibeDescription: 'Produtos selecionados diariamente, açougue com cortes nobres e hortifruti fresco para sua casa.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0A1813',
        cardBg: '#10241D',
        innerCardBg: '#173329',
        primaryAccent: '#10B981',
        secondaryAccent: '#F59E0B',
        textColor: '#ECFDF5',
        textMuted: '#A7F3D0',
        borderColor: '#1F4738',
        accentBadgeBg: 'rgba(16, 185, 129, 0.18)',
        accentBadgeText: '#34D399',
        buttonBg: '#059669',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Variedade nas prateleiras, hortifruti fresquinho e preços competitivos na região.',
      elevationConcept: 'Encarte digital de ofertas e canal de pedidos no WhatsApp.',
      actionLabel: 'Ver Ofertas da Semana',
      actionSubtext: 'Economize e peça pelo WhatsApp',
      nicheTag: 'Supermercado & Alimentos',
      interfaceFeature: 'Encarte de Ofertas Semanal & Pedidos de Feira',
      curiosityHook: 'Tabloide atualizado em tempo real, avisos de promoções e atendimento prático para listas de compras.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 11. Pizzarias, Cantinas & Trattorias
  if (
    lower.includes('pizz') ||
    lower.includes('cantina') ||
    lower.includes('italiana') ||
    lower.includes('trattoria') ||
    reviewsText.includes('forno') ||
    reviewsText.includes('massa')
  ) {
    return {
      vibe: 'rustico',
      vibeLabel: 'Forno a Lenha & Tradição Familiar',
      vibeDescription: 'Calor do forno a lenha, massas de fermentação artesanal e mesas para reunir a família.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#16110F',
        cardBg: '#211A16',
        innerCardBg: '#2C221D',
        primaryAccent: '#E05A38',
        secondaryAccent: '#F59E0B',
        textColor: '#FFF7ED',
        textMuted: '#D5C4B5',
        borderColor: '#423229',
        accentBadgeBg: 'rgba(224, 90, 56, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#E05A38',
        buttonText: '#16110F',
      },
      highlightedRealAsset: 'Clientes elogiam com entusiasmo a massa leve, o sabor autêntico e o ambiente acolhedor.',
      elevationConcept: 'Cardápio interativo no celular, fotografia dos pratos valorizada e canal direto de pedidos.',
      actionLabel: 'Pedir pelo WhatsApp',
      actionSubtext: 'Cardápio completo sem taxas de aplicativo',
      nicheTag: 'Gastronomia & Pizzaria',
      interfaceFeature: 'Cardápio Digital com Sabores & Fotos Reais',
      curiosityHook: 'Cardápio com fotos reais dos pratos, escolha de bordas e sabores e envio do pedido formatado no WhatsApp da equipe.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579684947550-22e945225d9a?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 12. Hamburguerias, Bares & Pubs
  if (
    lower.includes('hamburg') ||
    lower.includes('burger') ||
    lower.includes('pub') ||
    lower.includes('bar') ||
    lower.includes('chopp') ||
    lower.includes('cervejaria') ||
    lower.includes('petisc') ||
    lower.includes('espeto')
  ) {
    return {
      vibe: 'urbano_artesanal',
      vibeLabel: 'Burgers Artesanais & Clima Descontraído',
      vibeDescription: 'Blend suculento grelhado no ponto certo, cerveja gelada e o ponto de encontro perfeito com os amigos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#121214',
        cardBg: '#1A1A1E',
        innerCardBg: '#24242A',
        primaryAccent: '#F97316',
        secondaryAccent: '#EAB308',
        textColor: '#FAFAFA',
        textMuted: '#A1A1AA',
        borderColor: '#33333C',
        accentBadgeBg: 'rgba(249, 115, 22, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#EA580C',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Hambúrguer suculento, porções generosas e ambiente descontraído.',
      elevationConcept: 'Cardápio com combos em destaque e pedido direto no WhatsApp da cozinha.',
      actionLabel: 'Ver Cardápio & Fazer Pedido',
      actionSubtext: 'Chega quentinho na sua casa',
      nicheTag: 'Burger & Bebidas',
      interfaceFeature: 'Monte seu Burger & Combos Especiais',
      curiosityHook: 'Cardápio interativo onde o cliente monta o lanche e envia o pedido já calculado direto para o balcão.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 13. Restaurantes, Frutos do Mar & Culinária Geral
  if (
    lower.includes('restaurante') ||
    lower.includes('peix') ||
    lower.includes('frutos do mar') ||
    lower.includes('baiana') ||
    lower.includes('moqueca') ||
    lower.includes('bistrô') ||
    lower.includes('bistro') ||
    lower.includes('sushi') ||
    lower.includes('japones') ||
    lower.includes('culinária')
  ) {
    return {
      vibe: 'gastronomia_autoral',
      vibeLabel: 'Alta Gastronomia & Sabor Regional',
      vibeDescription: 'Pratos preparados com ingredientes nobres, apresentação impecável e uma experiência memorável à mesa.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#151113',
        cardBg: '#211A1E',
        innerCardBg: '#2E232A',
        primaryAccent: '#F59E0B',
        secondaryAccent: '#E11D48',
        textColor: '#FFFBEB',
        textMuted: '#CBC0B6',
        borderColor: '#42333B',
        accentBadgeBg: 'rgba(245, 158, 11, 0.18)',
        accentBadgeText: '#FBBF24',
        buttonBg: '#D97706',
        buttonText: '#151113',
      },
      highlightedRealAsset: 'Tempero inigualável, pratos generosos e atendimento de excelência.',
      elevationConcept: 'Apresentação refinada dos pratos, carta de bebidas e reservas de mesa no WhatsApp.',
      actionLabel: 'Reservar Mesa / Pedidos',
      actionSubtext: 'Atendimento direto com o maitre',
      nicheTag: 'Gastronomia & Restaurante',
      interfaceFeature: 'Carta Gastronômica & Reserva de Mesas',
      curiosityHook: 'Apresentação editorial dos pratos principais, sugestões do chef e canal direto para reservas e pedidos.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 14. Cafeterias, Confeitarias & Padarias
  if (
    lower.includes('padaria') ||
    lower.includes('confeitaria') ||
    lower.includes('café') ||
    lower.includes('cafe') ||
    lower.includes('panificadora') ||
    lower.includes('doceria') ||
    lower.includes('bolo') ||
    lower.includes('torta')
  ) {
    return {
      vibe: 'artesanal_acolhedor',
      vibeLabel: 'Fornadas Frescas & Café Especial',
      vibeDescription: 'Aroma de pão saindo do forno, doces tradicionais e o ponto de encontro acolhedor da vizinhança.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#171310',
        cardBg: '#221C17',
        innerCardBg: '#2E251E',
        primaryAccent: '#D97706',
        secondaryAccent: '#B45309',
        textColor: '#FEF3C7',
        textMuted: '#D5C4B5',
        borderColor: '#42342B',
        accentBadgeBg: 'rgba(217, 119, 6, 0.18)',
        accentBadgeText: '#FBBF24',
        buttonBg: '#D97706',
        buttonText: '#171310',
      },
      highlightedRealAsset: 'Clientela fiel que valoriza os produtos frescos e o atendimento carinhoso de balcão.',
      elevationConcept: 'Catálogo de encomendas de doces e salgados e aviso de fornadas no WhatsApp.',
      actionLabel: 'Ver Cardápio de Delícias',
      actionSubtext: 'Encomendas e pedidos no balcão',
      nicheTag: 'Café & Confeitaria Artesanal',
      interfaceFeature: 'Catálogo de Encomendas & Fornadas Quentes',
      curiosityHook: 'Cardápio fotográfico com bolos, doces e salgados, com agendamento simples de encomendas para festas.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 15. Pousadas, Hotéis, Resorts & Hospedagem
  if (
    lower.includes('pousada') ||
    lower.includes('hotel') ||
    lower.includes('resort') ||
    lower.includes('hosped') ||
    lower.includes('chalé') ||
    lower.includes('chale') ||
    lower.includes('hostel') ||
    lower.includes('temporada')
  ) {
    return {
      vibe: 'solar_praiano',
      vibeLabel: 'Refúgio Solar, Conforto & Beira-Mar',
      vibeDescription: 'Brisa leve, natureza e acolhimento inesquecível para quem busca descanso e momentos únicos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0C1824',
        cardBg: '#122234',
        innerCardBg: '#1A3048',
        primaryAccent: '#0284C7',
        secondaryAccent: '#14B8A6',
        textColor: '#F0FDF4',
        textMuted: '#94A3B8',
        borderColor: '#1E3C5C',
        accentBadgeBg: 'rgba(2, 132, 199, 0.18)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Avaliações destacando o descanso, o carinho da equipe e a localização privilegiada.',
      elevationConcept: 'Apresentação imersiva das suítes e canal direto de reservas sem cobrança de taxas de terceiros.',
      actionLabel: 'Reservar Direto Sem Taxas',
      actionSubtext: 'Melhor tarifa garantida no WhatsApp',
      nicheTag: 'Hotelaria & Pousadas',
      interfaceFeature: 'Galeria de Acomodações & Reservas Diretas',
      curiosityHook: 'Apresentação detalhada de cada suíte, fotos da área de lazer e cotação de diárias direto no WhatsApp.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 16. Serviços Profissionais, Consultorias & Escritórios
  if (
    lower.includes('advoca') ||
    lower.includes('advogad') ||
    lower.includes('contabil') ||
    lower.includes('contador') ||
    lower.includes('consultor') ||
    lower.includes('despachante') ||
    lower.includes('cartório')
  ) {
    return {
      vibe: 'corporativo_confianca',
      vibeLabel: 'Assessoria Estratégica & Credibilidade',
      vibeDescription: 'Rigor técnico, segurança jurídica e soluções sob medida para proteger e acelerar seus projetos.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#0D131D',
        cardBg: '#141D2C',
        innerCardBg: '#1C293E',
        primaryAccent: '#3B82F6',
        secondaryAccent: '#D4AF37',
        textColor: '#F1F5F9',
        textMuted: '#94A3B8',
        borderColor: '#253751',
        accentBadgeBg: 'rgba(59, 130, 246, 0.18)',
        accentBadgeText: '#60A5FA',
        buttonBg: '#2563EB',
        buttonText: '#FFFFFF',
      },
      highlightedRealAsset: 'Profissionais experientes, clareza na comunicação e pontualidade nos compromissos.',
      elevationConcept: 'Posicionamento de autoridade digital e canal direto para triagem de clientes.',
      actionLabel: 'Falar com Especialista',
      actionSubtext: 'Atendimento corporativo e seguro',
      nicheTag: 'Serviços Especializados',
      interfaceFeature: 'Áreas de Atuação & Agendamento de Reunião',
      curiosityHook: 'Apresentação da banca e áreas de atuação, cases de sucesso e canal seguro para análise preliminar.',
      fallbackPhotos: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      ],
    };
  }

  // 17. Default Adaptativo Universal
  return {
    vibe: 'artesanal',
    vibeLabel: 'Qualidade & Atendimento de Confiança',
    vibeDescription: 'Comércio que construiu sua história com seriedade e carinho pelos clientes locais.',
    typographyStyle: 'sans',
    theme: {
      boardBg: '#0F131A',
      cardBg: '#171D27',
      innerCardBg: '#212A38',
      primaryAccent: '#3B82F6',
      secondaryAccent: '#6366F1',
      textColor: '#F8FAFC',
      textMuted: '#94A3B8',
      borderColor: '#2A3649',
      accentBadgeBg: 'rgba(59, 130, 246, 0.18)',
      accentBadgeText: '#60A5FA',
      buttonBg: '#3B82F6',
      buttonText: '#FFFFFF',
    },
    highlightedRealAsset: 'Reconhecimento comprovado pelos clientes da cidade.',
    elevationConcept: 'Presença mobile própria, fotos tratadas e canal direto no WhatsApp.',
    actionLabel: 'Falar no WhatsApp',
    actionSubtext: 'Atendimento direto com a equipe',
    nicheTag: lead.category || 'Comércio Local',
    interfaceFeature: 'Apresentação Completa & Contato Rápido',
    curiosityHook: 'Estrutura pensada para valorizar sua história, facilitar a localização do comércio e conectar com novos clientes.',
    fallbackPhotos: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    ],
  };
}

export const ProposalImageCard = React.forwardRef<HTMLDivElement, Props>(
  ({ lead, id = 'proposal-concept-board' }, ref) => {
    const city = lead.city || 'Porto Seguro';
    const dna = resolveVisualDNA(lead);
    const { theme } = dna;

    // Fotografias reais do estabelecimento (com proxy seguro de CORS) ou fotografia editorial contextual de alto padrão
    const rawHero = lead.photos && lead.photos.length > 0 ? lead.photos[0] : '';
    const rawSec = lead.photos && lead.photos.length > 1 ? lead.photos[1] : '';
    const rawTer = lead.photos && lead.photos.length > 2 ? lead.photos[2] : '';

    const heroImage = resolveSafePhotoUrl(rawHero) || dna.fallbackPhotos[0];
    const secondaryPhoto = resolveSafePhotoUrl(rawSec) || dna.fallbackPhotos[1];
    const tertiaryPhoto = resolveSafePhotoUrl(rawTer) || dna.fallbackPhotos[2];

    // Headline autêntica baseada na identidade real
    const headline =
      lead.developerPitch?.visualConcept?.headline ||
      (lead as any).pitch?.visualConcept?.headline ||
      (dna.vibe === 'rustico'
        ? 'Massa artesanal, forno a lenha e a tradição que reúne famílias.'
        : dna.vibe === 'solar_praiano'
        ? 'Seu refúgio de tranquilidade, conforto e bem-estar em Porto Seguro.'
        : dna.vibe === 'artesanal_acolhedor'
        ? 'Pão quentinho, receitas artesanais e carinho em cada detalhe.'
        : dna.vibe === 'clinico_humano'
        ? 'Cuidado humanizado, tecnologia e bem-estar para toda a sua família.'
        : dna.vibe === 'energia_performance'
        ? 'Treinos de alta intensidade, equipamentos modernos e resultados reais.'
        : dna.vibe === 'beleza_sofisticada'
        ? 'Técnica refinada, produtos nobres e o seu momento de beleza.'
        : dna.vibe === 'barber_craft'
        ? 'Cortes precisos, barba alinhada e tradição no atendimento masculino.'
        : dna.vibe === 'cuidado_pet'
        ? 'Amor, proteção e o melhor cuidado para seu pet.'
        : dna.vibe === 'precisao_automotiva'
        ? 'Diagnóstico transparente, peças de procedência e confiança mecânica.'
        : dna.vibe === 'imobiliaria_premium'
        ? 'Os melhores imóveis e assessoria exclusiva para seu novo projeto de vida.'
        : dna.vibe === 'moda_design'
        ? 'Coleções exclusivas, peças selecionadas e bom gosto em cada detalhe.'
        : dna.vibe === 'gastronomia_autoral'
        ? 'Ingredientes selecionados, sabor autêntico e momentos memoráveis à mesa.'
        : dna.vibe === 'urbano_artesanal'
        ? 'Blend artesanal suculento, cerveja gelada e ambiente entre amigos.'
        : `A experiência autêntica e a tradição de atendimento da ${lead.name}.`);

    // Slug limpo para simulação de domínio próprio
    const cleanDomain = (lead.name || 'empresa')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 18);

    return (
      <div
        ref={ref}
        id={id}
        className="w-[1000px] p-9 rounded-[36px] shadow-[0_25px_80px_rgba(0,0,0,0.92)] relative overflow-hidden"
        style={{
          minHeight: '1240px',
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
        {/* Iluminação ambiente orgânica adaptada à paleta da empresa */}
        <div
          className="absolute -top-32 -right-32 w-[580px] h-[580px] rounded-full blur-[170px] pointer-events-none opacity-25"
          style={{ backgroundColor: theme.primaryAccent }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[580px] h-[580px] rounded-full blur-[170px] pointer-events-none opacity-20"
          style={{ backgroundColor: theme.secondaryAccent }}
        />

        {/* ============================================================ */}
        {/* 1. CABEÇALHO EDITORIAL (Contexto Discreto: 15% do Espaço)    */}
        {/* ============================================================ */}
        <header
          className="pb-5 mb-7 relative z-10 flex items-start justify-between border-b"
          style={{ borderColor: `${theme.borderColor}90` }}
        >
          <div className="space-y-1.5 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: theme.accentBadgeBg,
                color: theme.accentBadgeText,
                borderColor: `${theme.primaryAccent}40`,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Conceito Visual Exclusivo • {dna.vibeLabel}</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight leading-tight" style={{ color: theme.textColor }}>
              A nova experiência digital da{' '}
              <span
                className="underline underline-offset-4"
                style={{
                  color: theme.primaryAccent,
                  textDecorationColor: `${theme.primaryAccent}50`,
                }}
              >
                {lead.name}
              </span>
            </h1>

            <p className="text-xs leading-relaxed font-medium" style={{ color: theme.textMuted }}>
              Estudo visual desenhado para destacar a sua excelência no celular e transformar pesquisas locais no Google em contatos diretos no WhatsApp da sua equipe.
            </p>
          </div>

          <div className="text-right shrink-0">
            <span
              className="text-xs font-mono font-bold uppercase block tracking-wider"
              style={{ color: theme.textMuted }}
            >
              {city} • Bahia
            </span>
            <span
              className="text-[11px] font-bold px-3 py-1 rounded-xl border inline-flex items-center gap-1.5 mt-1.5 shadow-xs"
              style={{
                backgroundColor: theme.cardBg,
                color: theme.primaryAccent,
                borderColor: `${theme.primaryAccent}45`,
              }}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Prévia Sob Medida</span>
            </span>
          </div>
        </header>

        {/* ============================================================ */}
        {/* 2. O GRANDE PROTAGONISTA VISUAL (75-80% do Espaço Total)     */}
        {/*    Mockup Mobile Expansivo (Esq) + Visão Editorial (Dir)     */}
        {/* ============================================================ */}
        <div className="grid grid-cols-12 gap-7 relative z-10 mb-7 items-start">
          {/* ---------------------------------------------------------- */}
          {/* COLUNA ESQUERDA (7 colunas): SMARTPHONE EXPANSIVO          */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs px-1" style={{ color: theme.textMuted }}>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[11px]" style={{ color: theme.primaryAccent }}>
                <Smartphone className="w-3.5 h-3.5" />
                <span>O Seu Site em Tela de Celular</span>
              </div>
              <span className="text-[11px] font-medium">Design fluido & carregamento instantâneo</span>
            </div>

            {/* Chassis do Smartphone */}
            <div
              className="rounded-[40px] p-2.5 shadow-2xl border-2 relative"
              style={{
                backgroundColor: '#090B10',
                borderColor: `${theme.borderColor}`,
                boxShadow: `0 20px 60px -10px rgba(0,0,0,0.8), 0 0 35px -5px ${theme.primaryAccent}20`,
              }}
            >
              {/* Dynamic Island / Notch Superior */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A1D24]" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
              </div>

              {/* Tela Interna do Smartphone */}
              <div
                className="rounded-[32px] overflow-hidden border relative"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: '#1E2330',
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

                {/* Barra de Navegação Superior do App/Site */}
                <div
                  className="px-4 py-2.5 border-b flex items-center justify-between"
                  style={{
                    backgroundColor: theme.innerCardBg,
                    borderColor: `${theme.borderColor}80`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shadow-xs"
                      style={{
                        backgroundColor: theme.primaryAccent,
                        color: theme.buttonText,
                      }}
                    >
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-xs block leading-tight" style={{ color: theme.textColor }}>
                        {lead.name}
                      </span>
                      <span className="text-[10px] block opacity-70" style={{ color: theme.textMuted }}>
                        {dna.nicheTag}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border"
                    style={{
                      backgroundColor: `${theme.primaryAccent}15`,
                      color: theme.primaryAccent,
                      borderColor: `${theme.primaryAccent}30`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WhatsApp Ativo</span>
                  </div>
                </div>

                {/* Hero Section do Site no Celular com Foto Real */}
                <div className="relative h-64 overflow-hidden flex flex-col justify-end p-5">
                  <img
                    src={heroImage}
                    alt={lead.name}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, ${theme.cardBg} 0%, ${theme.cardBg}CC 55%, transparent 100%)`,
                    }}
                  />

                  <div className="relative z-10 space-y-2">
                    <div
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border backdrop-blur-xs"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: theme.primaryAccent,
                        borderColor: `${theme.primaryAccent}40`,
                      }}
                    >
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{city} • BA</span>
                    </div>

                    <h2
                      className="text-xl font-black leading-tight tracking-tight drop-shadow-sm"
                      style={{ color: theme.textColor }}
                    >
                      {headline}
                    </h2>

                    <p className="text-[11px] line-clamp-2 leading-relaxed font-normal" style={{ color: theme.textMuted }}>
                      {dna.vibeDescription}
                    </p>

                    {/* Botão de Ação Direta Hero no Celular */}
                    <div
                      className="pt-1 flex items-center justify-between"
                    >
                      <div
                        className="px-4 py-2 rounded-xl font-black text-xs flex items-center gap-2 shadow-lg"
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

                {/* Seção de Fotos e Destaques Reais do Negócio */}
                <div
                  className="p-4 border-t space-y-3"
                  style={{
                    backgroundColor: theme.innerCardBg,
                    borderColor: `${theme.borderColor}80`,
                  }}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold uppercase tracking-wider" style={{ color: theme.primaryAccent }}>
                      Destaques & Experiência
                    </span>
                    <span className="text-[10px]" style={{ color: theme.textMuted }}>
                      {lead.name}
                    </span>
                  </div>

                  {/* Grade de 2 Fotos Tratadas com Badges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div
                      className="rounded-xl overflow-hidden h-28 border relative group"
                      style={{ borderColor: theme.borderColor }}
                    >
                      <img
                        src={secondaryPhoto}
                        alt="Espaço e produtos reais"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <span className="text-[9px] font-black uppercase text-amber-300 block tracking-wide">
                          Ambiente Real
                        </span>
                        <span className="text-[10px] font-bold text-white leading-tight block truncate">
                          Qualidade & Tradição
                        </span>
                      </div>
                    </div>

                    <div
                      className="rounded-xl overflow-hidden h-28 border relative group"
                      style={{ borderColor: theme.borderColor }}
                    >
                      <img
                        src={tertiaryPhoto}
                        alt="Detalhes e atendimento"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <div className="absolute bottom-1.5 left-2 right-2">
                        <span className="text-[9px] font-black uppercase text-cyan-300 block tracking-wide">
                          Atendimento
                        </span>
                        <span className="text-[10px] font-bold text-white leading-tight block truncate">
                          Experiência do Cliente
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Barra de Acesso Rápido no Rodapé do Celular */}
                  <div
                    className="pt-2.5 border-t grid grid-cols-3 gap-1 text-center"
                    style={{ borderColor: `${theme.borderColor}60` }}
                  >
                    <div className="p-1.5 rounded-lg bg-black/25 border border-white/5">
                      <span className="block text-[9px] font-bold uppercase opacity-70">Estrutura</span>
                      <span className="text-[10px] font-extrabold block truncate" style={{ color: theme.textColor }}>
                        Espaço Próprio
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/25 border border-white/5">
                      <span className="block text-[9px] font-bold uppercase opacity-70">Contato</span>
                      <span className="text-[10px] font-extrabold block truncate" style={{ color: theme.primaryAccent }}>
                        WhatsApp 1-Clique
                      </span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/25 border border-white/5">
                      <span className="block text-[9px] font-bold uppercase opacity-70">Localização</span>
                      <span className="text-[10px] font-extrabold block truncate" style={{ color: theme.textColor }}>
                        {city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Home Indicator Bar */}
                <div className="py-2 flex justify-center bg-black/50">
                  <div className="w-28 h-1 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* COLUNA DIREITA (5 colunas): DETALHE EDITORIAL & TEASER     */}
          {/* ---------------------------------------------------------- */}
          <div className="col-span-5 space-y-4">
            {/* Bloco 1: Visão Widescreen / Navegador Desktop */}
            <div
              className="rounded-2xl p-4 border space-y-3 shadow-lg"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.borderColor,
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[11px] uppercase tracking-widest font-extrabold flex items-center gap-1.5"
                  style={{ color: theme.primaryAccent }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  Experiência Multiplataforma
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10" style={{ color: theme.textMuted }}>
                  Desktop & Celular
                </span>
              </div>

              {/* Simulação de Navegador Web */}
              <div
                className="rounded-xl overflow-hidden border"
                style={{
                  backgroundColor: theme.innerCardBg,
                  borderColor: theme.borderColor,
                }}
              >
                {/* Barra do Navegador com Dots */}
                <div className="px-3 py-1.5 border-b flex items-center justify-between text-[10px] bg-black/30" style={{ borderColor: `${theme.borderColor}70` }}>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-black/50 border border-white/10 font-mono text-[9px] text-slate-300">
                    <Lock className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{cleanDomain}.com.br</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Banner Panorâmico Widescreen */}
                <div className="h-28 relative overflow-hidden">
                  <img
                    src={tertiaryPhoto}
                    alt="Visão ampla do comércio"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      ⚡ Carregamento Ultrarrápido
                    </span>
                    <span className="text-xs font-black text-white leading-tight">
                      Apresentação profissional que converte visitantes em clientes
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-semibold text-[10px]" style={{ color: theme.textColor }}>
                    Abertura Instantânea
                  </span>
                </div>
                <div className="flex items-center gap-1.5 p-2 rounded-lg bg-black/20 border border-white/5">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-[10px]" style={{ color: theme.textColor }}>
                    Sem Taxas ou Comissões
                  </span>
                </div>
              </div>
            </div>

            {/* Bloco 2: O Visual DNA Autêntico da Marca */}
            <div
              className="rounded-2xl p-4 border space-y-3 shadow-lg"
              style={{
                backgroundColor: theme.cardBg,
                borderColor: theme.borderColor,
              }}
            >
              <span
                className="text-[11px] uppercase tracking-widest font-extrabold flex items-center gap-1.5"
                style={{ color: theme.secondaryAccent }}
              >
                <Layers className="w-3.5 h-3.5" />
                Identidade Visual Harmônica
              </span>

              <div className="flex items-center gap-3 p-3 rounded-xl border bg-black/20" style={{ borderColor: theme.borderColor }}>
                {/* Color Swatches */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: theme.primaryAccent }}
                    title="Cor Primária"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: theme.secondaryAccent }}
                    title="Cor Secundária"
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-white/20 shadow-xs"
                    style={{ backgroundColor: theme.cardBg }}
                    title="Fundo Harmônico"
                  />
                </div>

                <div className="text-xs">
                  <span className="font-bold block" style={{ color: theme.textColor }}>
                    {dna.vibeLabel}
                  </span>
                  <span className="text-[10px]" style={{ color: theme.textMuted }}>
                    {dna.typographyStyle === 'serif' ? 'Tipografia Editorial Elegante' : 'Tipografia Moderna Sans-Serif'}
                  </span>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed" style={{ color: theme.textMuted }}>
                Cada cor e elemento foram calibrados a partir das características autênticas da {lead.name} para transmitir autoridade e confiança.
              </p>
            </div>

            {/* Bloco 3: O TEASER DE CURIOSIDADE & DESEJO ("O que mais preparamos?") */}
            <div
              className="rounded-2xl p-4 border space-y-2.5 relative overflow-hidden shadow-xl"
              style={{
                backgroundColor: theme.innerCardBg,
                borderColor: `${theme.primaryAccent}45`,
              }}
            >
              <div
                className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full blur-2xl pointer-events-none opacity-25"
                style={{ backgroundColor: theme.primaryAccent }}
              />

              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: `${theme.primaryAccent}25`,
                    color: theme.primaryAccent,
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: theme.textColor }}>
                    O que mais preparamos para vocês?
                  </h3>
                  <span className="text-[10px] font-semibold" style={{ color: theme.primaryAccent }}>
                    Esta imagem é apenas a primeira demonstração
                  </span>
                </div>
              </div>

              <p className="text-[11px] leading-relaxed" style={{ color: theme.textColor }}>
                {dna.curiosityHook}
              </p>

              <div
                className="pt-2 border-t flex items-center justify-between text-[10px] font-bold"
                style={{ borderColor: `${theme.borderColor}90` }}
              >
                <span style={{ color: theme.textMuted }}>
                  Estrutura 100% pronta para ativar
                </span>
                <span className="flex items-center gap-1 font-extrabold" style={{ color: theme.primaryAccent }}>
                  <span>Converse com o José</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. RODAPÉ DE HUMANIZAÇÃO DISCRETA (10% do Espaço)            */}
        {/* ============================================================ */}
        <footer
          className="pt-4 flex items-center justify-between relative z-10 border-t"
          style={{ borderColor: `${theme.borderColor}80` }}
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
                <span style={{ color: theme.textMuted }}>•</span>
                <span className="font-semibold text-[11px]" style={{ color: theme.primaryAccent }}>
                  Estudo Autoral Exclusivo
                </span>
              </div>
              <p className="text-[10px]" style={{ color: theme.textMuted }}>
                Demonstração visual criada com respeito à trajetória da {lead.name} • Sem qualquer custo ou compromisso.
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shrink-0 border shadow-xs"
            style={{
              backgroundColor: theme.cardBg,
              color: theme.primaryAccent,
              borderColor: `${theme.primaryAccent}40`,
            }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Direto: (21) 97285-0211</span>
          </div>
        </footer>
      </div>
    );
  }
);

ProposalImageCard.displayName = 'ProposalImageCard';
