import {
  DeveloperPitch,
  Lead,
  OpportunityAudit,
  ProfileGap,
  TailoredSolution,
  VisualConcept,
  VisualDNA,
} from '@/types/lead';

interface NicheVisualConfig {
  vibe: string;
  vibeLabel: string;
  vibeDescription: string;
  typographyStyle: 'serif' | 'sans';
  theme: {
    boardBg: string;
    cardBg: string;
    innerCardBg: string;
    primaryAccent: string;
    secondaryAccent: string;
    textColor: string;
    textMuted: string;
    borderColor: string;
    accentBadgeBg: string;
    accentBadgeText: string;
    buttonBg: string;
    buttonText: string;
  };
  headline: string;
  subheadline: string;
  highlightedRealAsset: string;
  elevationConcept: string;
  actionLabel: string;
  keyBenefits: string[];
  features: { title: string; description: string; icon: string }[];
  chatbotSample: { customerQuestion: string; botReply: string };
  suggestedServices: { title: string; description: string; deliverable: string }[];
  profileGaps: ProfileGap[];
  tailoredSolutions: TailoredSolution[];
}

/**
 * Motor de Inteligência de Negócios & Tradução de Identidade (AGENTE C):
 * - UNIVERSALIDADE DE NICHOS: gera diagnósticos e conceitos visuais sob medida para QUALQUER segmento
 *   (oficinas mecânicas, pet shops, salões, clínicas, academias, imobiliárias, escolas, hotéis, restaurantes, etc.).
 * - TEASER MINDSET: "The preview is a teaser, not the product. Show enough to create desire. Leave enough to create curiosity."
 * - OBJETIVO DA 1ª MENSAGEM: "The goal of the first message is to earn the second message."
 * - ZERO promessas comerciais não comprovadas ("aumente 50%", "multiplique clientes", "domine o Google").
 * - ZERO links e ZERO menção a preços/valores na abordagem de WhatsApp.
 * - SEPARAÇÃO DE DADOS: OpportunityAudit armazena a inteligência técnica interna para o José;
 *   visualConcept e whatsappMessage focam 100% no teaser positivo da marca.
 */
export async function generatePitchForLead(
  lead: Partial<Lead>,
  baseUrl: string = 'http://localhost:3000',
  developerName: string = 'José',
  customApiKey?: string
): Promise<DeveloperPitch> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  const proposalUrl = `${baseUrl}/proposta/${lead.id || 'preview'}`;

  // Se houver chave do Gemini configurada, executa o motor com IA
  if (apiKey) {
    try {
      const reviewsContext = (lead.reviews || [])
        .map((r) => `- [${r.rating}★] "${r.text}" (Autor: ${r.author})`)
        .join('\n');

      const prompt = `Você é um diretor de arte e estrategista sênior de negócios digitais no Brasil.
Seu papel é analisar a presença real deste comerciante e desenhar um CONCEITO VISUAL SOB MEDIDA (TEASER) para ser enviado em primeira abordagem.

DADOS REAIS DO ESTABELECIMENTO:
Nome: ${lead.name}
Nicho / Categoria: ${lead.category || 'Comércio Local'}
Endereço: ${lead.address || 'Porto Seguro - BA'}
Cidade: ${lead.city || 'Porto Seguro'} - ${lead.state || 'BA'}
Nota no Google Maps: ${lead.rating || 4.8}★ (${lead.userRatingsTotal || 0} avaliações reais de clientes)
Website Atual: ${lead.website ? 'Possui (' + lead.website + ')' : 'NÃO POSSUI WEBSITE OFICIAL (depende de Instagram ou boca a boca)'}
Total de Fotos: ${lead.photosCount || 0}
Avaliações reais dos clientes:
${reviewsContext || 'Avaliações calorosas destacando a qualidade e a dedicação do atendimento presencial.'}

══════════════════════════════════════════════════════════════════
DIRETRIZES CENTRAIS DE ABORDAGEM & CRIAÇÃO:
══════════════════════════════════════════════════════════════════
1. UNIVERSALIDADE DE NICHOS:
   - O estabelecimento pode pertencer a QUALQUER segmento do mercado:
     * Oficinas mecânicas, auto centers, funilaria e estética automotiva
     * Clínicas médicas, consultórios odontológicos, fisioterapia e saúde
     * Pet shops, clínicas veterinárias e serviços de banho e tosa
     * Salões de beleza, barbearias, esmalterias e clínicas de estética
     * Academias, estúdios de pilates, yoga, crossfit e artes marciais
     * Imobiliárias, corretores de imóveis e construtoras
     * Escolas, creches, centros de idiomas e cursos
     * Hotéis, pousadas, chalés e hospedagens
     * Restaurantes, pizzarias, hamburguerias, cafeterias e padarias
     * Lojas do comércio varejista (moda, calçados, óticas, decoração, etc.)
     * Escritórios e serviços especializados (advocacia, contabilidade, etc.)
   - NUNCA assuma genericamente que o negócio é restaurante! NUNCA use termos como "cardápio", "pratos", "forno", "reservas de mesa" para estabelecimentos de outros segmentos.
   - Interprete a real operação do negócio e adapte a linguagem (ex: serviços, orçamentos, consultas, agendamentos, tratamentos, planos, produtos).

2. A PRIMEIRA PEÇA É UM TEASER VISUAL:
   - "THE PREVIEW IS A TEASER, NOT THE PRODUCT. SHOW ENOUGH TO CREATE DESIRE. LEAVE ENOUGH TO CREATE CURIOSITY."
   - "THE GOAL OF THE FIRST MESSAGE IS TO EARN THE SECOND MESSAGE."
   - ELIMINE completamente promessas comerciais não comprovadas ("aumente suas vendas em 50%", "multiplique seus clientes", "domine o Google").
   - Foque em copy contextual e de visão de marca: como a presença digital da empresa pode transmitir o mesmo capricho, organização e profissionalismo que ela já entrega no mundo físico.

3. MENSAGEM DO WHATSAPP DE PRIMEIRA ABORDAGEM:
   - Curta, elegante, calorosa, respeitosa, sem textão explicativo longo.
   - Apresenta José como morador de Porto Seguro há muitos anos e cuja família tem comércio local na cidade.
   - Apresenta a imagem anexada do conceito visual como uma demonstração sob medida feita sem custo e sem compromisso.
   - Objetivo único: ganhar a segunda mensagem (despertar curiosidade para o comerciante responder "gostei", "como funciona?", "podemos conversar?").
   - ZERO links externos (o prospect não clica em links de desconhecidos) e ZERO menção a preços/valores em R$.

4. SEPARAÇÃO DE DADOS INTERNOS E EXTERNOS:
   - "audit" (OpportunityAudit): armazena a análise estratégica interna para o José consultar no painel (diagnóstico de maturidade digital, gaps estruturais, sentimento dos clientes, vazamento de oportunidades e manejo de objeções).
   - "visualConcept" e "whatsappMessage": focam 100% no lado positivo, no capricho da marca e no teaser visual para o comerciante.

5. PRESERVAÇÃO DA IDENTIDADE EXISTENTE (REFINE, NÃO REINVENTE):
   - Não imponha um padrão escuro genérico.
   - Descubra e respeite as cores, o tom de voz e a essência do negócio.
   - Critério de sucesso: o proprietário deve bater o olho e exclamar: "ISSO É A GENTE!".

Retorne estritamente um JSON no seguinte formato:
{
  "summaryReason": "Resumo de 1 frase destacando o capricho da casa e a oportunidade de valorização digital.",
  "audit": {
    "businessDiagnosis": "Diagnóstico interno detalhado da presença digital atual.",
    "profileGaps": [
      {
        "badge": "...",
        "title": "...",
        "description": "...",
        "impactOnSales": "Descrição realista do impacto da ausência de canal próprio.",
        "intuitiveAutomationSolution": "..."
      }
    ],
    "customerSentiment": {
      "praisedPoints": ["...", "..."],
      "recurringComplaints": ["..."],
      "sentimentSummary": "...",
      "hasExplicitComplaints": false
    },
    "revenueLeaks": {
      "description": "Oportunidades que escapam quando o cliente pesquisa no Google pelo celular e não encontra canal ágil.",
      "estimatedLoss": "Demanda qualificada que pesquisa no celular e opta por estabelecimentos com atendimento mais imediato"
    },
    "tailoredSolutions": [
      {
        "pillar": "Website & Conversão",
        "deficiencyFound": "...",
        "solutionTitle": "...",
        "deliverable": "...",
        "revenueImpact": "Valorização da marca e atendimento ágil sem intermediários."
      }
    ],
    "objectionHandling": [
      {"objection": "...", "suggestedAnswer": "..."}
    ]
  },
  "suggestedServices": [
    {"title": "...", "description": "...", "deliverable": "..."}
  ],
  "visualConcept": {
    "headline": "Headline contextual de marca que reflete a identidade autêntica.",
    "subheadline": "Como elevar a experiência dos clientes no celular com atendimento direto no WhatsApp.",
    "primaryColor": "#...",
    "secondaryColor": "#...",
    "badge": "Selo de identidade adaptado ao nicho",
    "keyBenefits": ["...", "...", "...", "..."],
    "features": [{"title": "...", "description": "...", "icon": "..."}],
    "chatbotSample": {"customerQuestion": "Pergunta comum do cliente no nicho", "botReply": "Resposta cordial e ágil"},
    "visualDNA": {
      "vibe": "...",
      "vibeLabel": "...",
      "vibeDescription": "...",
      "typographyStyle": "serif | sans",
      "theme": {
        "boardBg": "#...",
        "cardBg": "#...",
        "innerCardBg": "#...",
        "primaryAccent": "#...",
        "secondaryAccent": "#...",
        "textColor": "#...",
        "textMuted": "#...",
        "borderColor": "#...",
        "accentBadgeBg": "#...",
        "accentBadgeText": "#...",
        "buttonBg": "#...",
        "buttonText": "#..."
      },
      "highlightedRealAsset": "O que eles já têm de mais autêntico e elogiado pelos clientes",
      "elevationConcept": "Como a presença digital transmitirá no celular o mesmo capricho do mundo físico"
    }
  },
  "whatsappMessage": "Mensagem curta, calorosa e elegante de José apresentando a imagem anexada (zero links, zero valores em R$)"
}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const contentText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (contentText) {
          const parsed = JSON.parse(contentText);
          const fallbackPitch = buildProfileGapsPitch(lead, proposalUrl, developerName);

          const safeVisualDNA: VisualDNA = {
            ...fallbackPitch.visualConcept.visualDNA!,
            ...(parsed.visualConcept?.visualDNA || {}),
            theme: {
              ...fallbackPitch.visualConcept.visualDNA?.theme,
              ...(parsed.visualConcept?.visualDNA?.theme || {}),
            },
          };

          const safeVisualConcept: VisualConcept = {
            ...fallbackPitch.visualConcept,
            ...parsed.visualConcept,
            visualDNA: safeVisualDNA,
          };

          return {
            leadName: lead.name || 'Estabelecimento',
            developerName: 'José',
            summaryReason: parsed.summaryReason || fallbackPitch.summaryReason,
            audit: parsed.audit || fallbackPitch.audit,
            suggestedServices: parsed.suggestedServices || fallbackPitch.suggestedServices,
            visualConcept: safeVisualConcept,
            whatsappMessage: parsed.whatsappMessage || fallbackPitch.whatsappMessage,
          };
        }
      }
    } catch (e) {
      console.warn('Fallback para motor estrutural universal:', e);
    }
  }

  // Motor Contextual Nativo com Análise de Identidade e Universalidade de Nichos
  return buildProfileGapsPitch(lead, proposalUrl, developerName);
}

/**
 * Motor Estrutural Universal (Fallback inteligente e robusto para qualquer nicho):
 * Classifica e adapta diagnóstico, visual concept e mensagem para qualquer segmento pesquisado.
 */
function buildProfileGapsPitch(
  lead: Partial<Lead>,
  proposalUrl: string,
  developerName: string = 'José'
): DeveloperPitch {
  const name = lead.name || 'Estabelecimento Comercial';
  const category = lead.category || 'Comércio Local';
  const city = lead.city || 'Porto Seguro';
  const rating = lead.rating || 4.8;
  const reviews = lead.reviews || [];

  // 1. Mineração de sentimentos reais nos comentários
  const praisedPoints: string[] = [];
  const recurringComplaints: string[] = [];

  reviews.forEach((r) => {
    if (r.detectedPraise) praisedPoints.push(r.detectedPraise);
    if (r.detectedIssue) recurringComplaints.push(r.detectedIssue);
  });

  const hasExplicitComplaints = recurringComplaints.length > 0;

  if (praisedPoints.length === 0) {
    praisedPoints.push('Excelente atendimento e reputação reconhecida na cidade');
    praisedPoints.push('Avaliações positivas de clientes satisfeitos no Google Maps');
  }

  // 2. Classificação Universal de Nicho e Configuração Visual & Funcional
  const config = resolveUniversalNicheConfig(lead, name, category, city, rating, reviews);

  // 3. Montagem dos Gaps Estruturais Internos (OpportunityAudit)
  const profileGaps: ProfileGap[] = [...config.profileGaps];

  // Gap Geral de Ausência de Site Oficial se não possuir
  if (!lead.website || lead.website.includes('instagram.com')) {
    profileGaps.unshift({
      badge: '📱 Dependência Exclusiva de Redes Sociais',
      title: 'Ausência de Website Oficial / Foco Restrito ao Instagram',
      description: `A ${name} não possui website próprio indexado no Google. O cliente que pesquisa no celular na região de ${city} não encontra uma vitrine organizada com os serviços e facilidade de contato direto, dependendo de busca manual no Instagram ou indicação.`,
      impactOnSales: `Clientes com pressa pelo celular que buscam no Google Maps priorizam locais que oferecem informações claras e botão direto de WhatsApp.`,
      intuitiveAutomationSolution: `Desenvolvimento de uma Presença Mobile One-Page profissional, com visual sob medida, apresentação dos serviços e canal direto de atendimento.`,
    });
  }

  // Gap de Fotos se houver poucas
  if (!lead.photosCount || lead.photosCount <= 4) {
    profileGaps.push({
      badge: '📸 Presença Visual em Aberto',
      title: 'Poucas Fotos em Alta Definição no Google Maps',
      description: `O perfil possui poucas fotos cadastradas e não transmite digitalmente o capricho, o acolhimento e o padrão de excelência que a equipe entrega presencialmente.`,
      impactOnSales: `A percepção inicial de quem pesquisa pelo celular fica aquém do valor real entregue no dia a dia.`,
      intuitiveAutomationSolution: `Curadoria e tratamento visual das imagens em alta definição, destacando o ambiente, o atendimento e a essência da marca.`,
    });
  }

  // 4. Audit Interno (OpportunityAudit para o painel de José)
  const audit: OpportunityAudit = {
    businessDiagnosis: `A ${name} possui excelente reputação (${rating.toFixed(1)}★) e clientes fiéis em ${city}. No entanto, sua presença digital ainda não reflete todo o capricho do negócio físico, dependendo principalmente de canais manuais e sem um website mobile próprio conectado diretamente ao WhatsApp.`,
    profileGaps,
    customerSentiment: {
      praisedPoints,
      recurringComplaints: hasExplicitComplaints
        ? recurringComplaints
        : ['Nenhuma reclamação crítica detectada. A reputação é sólida e o potencial está em valorizar a presença digital com canal próprio.'],
      sentimentSummary: hasExplicitComplaints
        ? 'Clientes elogiam a qualidade, mas sinalizam oportunidades de agilidade no retorno inicial pelo WhatsApp.'
        : 'Clientes reconhecem e elogiam o trabalho da casa. A oportunidade é consolidar essa autoridade com uma presença digital própria.',
      hasExplicitComplaints,
    },
    revenueLeaks: {
      description: `Clientes que procuram por ${category.toLowerCase()} no Google pelo celular priorizam estabelecimentos que facilitam o primeiro contato imediato no WhatsApp. A ausência de um canal próprio faz parte dessa procura migrar para concorrentes com maior visibilidade online.`,
      estimatedLoss: 'Oportunidades diárias de novos clientes que pesquisam pelo celular e priorizam atendimento imediato',
    },
    tailoredSolutions: config.tailoredSolutions,
    suggestedFee: 'Projeto sob medida (Apresentação consultiva)',
    potentialClientRevenue: 'Maior captação de clientes qualificados e valorização da marca',
    objectionHandling: [
      {
        objection: 'Já temos Instagram e WhatsApp, realmente precisamos de um site próprio?',
        suggestedAnswer:
          'O Instagram de vocês é fantástico para relacionamento, mas quem pesquisa no Google Maps no celular quase sempre está decidido a contratar ou comprar na hora. Ter uma página própria rápida garante que esse cliente encontre a apresentação impecável de vocês e chame no WhatsApp imediatamente com a demanda definida.',
      },
      {
        objection: 'Uma automação no WhatsApp não soa fria ou impessoal?',
        suggestedAnswer:
          'De jeito nenhum! A proposta valoriza o calor humano do atendimento de vocês. O que ela faz é apenas agilizar a primeira resposta (enviando opções, horários ou informações básicas) e já direcionar o cliente prontinho para a equipe atender.',
      },
      {
        objection: 'Quanto custa para implementar esse conceito?',
        suggestedAnswer:
          'Como moro aqui em Porto Seguro e trabalho de forma independente, combinamos tudo com transparência e flexibilidade, focando exatamente no que faz sentido para o momento de vocês.',
      },
    ],
  };

  // 5. Conceito Visual (Teaser externo focado no capricho e na marca)
  const visualDNA: VisualDNA = {
    vibe: config.vibe,
    vibeLabel: config.vibeLabel,
    vibeDescription: config.vibeDescription,
    typographyStyle: config.typographyStyle,
    theme: config.theme,
    highlightedRealAsset: config.highlightedRealAsset,
    elevationConcept: config.elevationConcept,
  };

  const visualConcept: VisualConcept = {
    headline: config.headline,
    subheadline: config.subheadline,
    primaryColor: config.theme.primaryAccent,
    secondaryColor: config.theme.secondaryAccent,
    badge: config.vibeLabel,
    keyBenefits: config.keyBenefits,
    features: config.features,
    chatbotSample: config.chatbotSample,
    visualDNA,
  };

  // 6. Mensagem de WhatsApp de Primeira Abordagem (Curta, elegante, teaser, sem links, sem valores)
  const whatsappMessage = `Olá! Tudo bem com vocês? 😊

Meu nome é José, moro aqui em Porto Seguro há muitos anos e minha família também tem comércio aqui na nossa cidade.

Acompanho o trabalho da *${name}* e vejo o quanto vocês são elogiados pelo atendimento e pela dedicação (${rating.toFixed(1)}★ no Google).

Como trabalho com design e presença digital para empresas locais, montei uma demonstração visual — sem custo algum nem compromisso — mostrando como a imagem da *${name}* pode transmitir no celular o mesmo capricho que vocês já entregam no dia a dia (segue na imagem anexada).

Dá uma olhadinha quando tiver um tempinho! Se fizer sentido para vocês, vai ser um prazer trocar uma ideia rápida por aqui. Um abraço!`;

  return {
    leadName: name,
    developerName: 'José',
    summaryReason: `Comércio conceituado (${rating.toFixed(1)}★). Oportunidade: transmitir no celular o mesmo capricho e atendimento entregues no mundo físico.`,
    audit,
    suggestedServices: config.suggestedServices,
    visualConcept,
    whatsappMessage,
  };
}

/**
 * Resolvedor Universal de Nicho:
 * Mapeia inteligentemente qualquer nicho para uma identidade visual harmoniosa,
 * fluxos adequados de atendimento e comunicação precisa.
 */
function resolveUniversalNicheConfig(
  lead: Partial<Lead>,
  name: string,
  category: string,
  city: string,
  rating: number,
  reviews: { text: string }[]
): NicheVisualConfig {
  const lowerCat = (category + ' ' + name).toLowerCase();
  const reviewsText = reviews.map((r) => r.text).join(' ').toLowerCase();

  // 1. Oficinas Mecânicas, Auto Centers, Funilaria & Estética Automotiva
  if (
    lowerCat.includes('mecanic') ||
    lowerCat.includes('mecânica') ||
    lowerCat.includes('mecanica') ||
    lowerCat.includes('oficina') ||
    lowerCat.includes('auto') ||
    lowerCat.includes('pneu') ||
    lowerCat.includes('funilaria') ||
    lowerCat.includes('martelinho') ||
    lowerCat.includes('lava') ||
    lowerCat.includes('veicul') ||
    lowerCat.includes('carro')
  ) {
    return {
      vibe: 'tecnico_confiavel',
      vibeLabel: 'Tecnologia Automotiva & Confiança',
      vibeDescription: 'Precisão técnica, transparência nos diagnósticos e respeito ao veículo e ao tempo do cliente.',
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
      headline: `Precisão, agilidade e total transparência com seu veículo.`,
      subheadline: `Apresentação clara dos serviços automotivos com canal direto no WhatsApp para orçamentos e agendamentos em ${city}.`,
      highlightedRealAsset: `Avaliações destacam a honestidade dos orçamentos, o diagnóstico preciso e a pontualidade na entrega.`,
      elevationConcept: `Vitrine mobile profissional dos serviços prestados e botão direto no WhatsApp para agendamento de revisão.`,
      actionLabel: 'Agendar Revisão no WhatsApp',
      keyBenefits: [
        'Apresentação clara dos serviços e especialidades mecânicas',
        'Canal rápido no WhatsApp para envio de orçamentos e fotos de peças',
        'Facilidade para o motorista agendar revisões preventivas no celular',
        'Visualização profissional que transmite autoridade e transparência',
      ],
      features: [
        {
          title: 'Apresentação Mobile dos Serviços',
          description: 'Página exclusiva com lista de serviços, fotos reais da oficina e localização no mapa.',
          icon: 'Wrench',
        },
        {
          title: 'Agendamento Direto no WhatsApp',
          description: 'O cliente informa modelo do veículo e serviço desejado com poucos toques.',
          icon: 'MessageSquare',
        },
        {
          title: 'Galeria Visual de Confiança',
          description: 'Fotos nítidas da oficina organizada, equipamentos modernos e equipe trabalhando.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de agendar uma revisão e orçamento para o meu carro.`,
        botReply: `Olá! Que bom falar com você! 🚗 Já recebemos seu contato na ${name}. Qual o modelo e ano do seu veículo para agilizarmos seu atendimento?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile & Vitrine de Serviços Automotivos',
          description: 'Desenvolvimento visual moderno para motoristas encontrarem a oficina no Google e chamarem no WhatsApp.',
          deliverable: 'Página One-Page rápida com serviços, fotos e botão direto.',
        },
        {
          title: 'Tratamento de Imagens da Oficina & Equipe',
          description: 'Fotos profissionais da estrutura, ferramentas e diagnósticos.',
          deliverable: 'Galeria visual tratada em alta definição.',
        },
        {
          title: 'Canal Direto de Orçamento no WhatsApp',
          description: 'Fluxo estruturado para receber solicitações de orçamento com dados do carro já formatados.',
          deliverable: 'Integração direta com o WhatsApp da recepção.',
        },
      ],
      profileGaps: [
        {
          badge: '⚡ Orçamentos Manuais',
          title: 'Falta de Triagem Automática para Demandas Mecânicas',
          description: `Motoristas que pesquisam socorro mecânico ou revisão pelo celular muitas vezes esperam retorno manual demorado enquanto procuram outro auto center.`,
          impactOnSales: `Perda de contatos de motoristas que precisam de socorro ou revisão rápida e optam por quem atende imediatamente.`,
          intuitiveAutomationSolution: `Canal direto no WhatsApp com mensagem padronizada que já solicita placa, modelo e problema do carro.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Ausência de página mobile rápida com a lista clara de especialidades e diagnósticos.',
          solutionTitle: 'Presença Mobile Automotiva de Alta Confiança',
          deliverable: 'Página veloz no celular com serviços prestados, fotos da estrutura e botão WhatsApp.',
          revenueImpact: 'Atendimento direto de motoristas que buscam mecânica de confiança no Google Maps.',
        },
      ],
    };
  }

  // 2. Pet Shops, Clínicas Veterinárias & Banho e Tosa
  if (
    lowerCat.includes('pet') ||
    lowerCat.includes('veterin') ||
    lowerCat.includes('veterinár') ||
    lowerCat.includes('banho') ||
    lowerCat.includes('tosa') ||
    lowerCat.includes('racao') ||
    lowerCat.includes('ração') ||
    lowerCat.includes('canil') ||
    lowerCat.includes('animal')
  ) {
    return {
      vibe: 'afetivo_pet',
      vibeLabel: 'Carinho, Cuidado & Saúde Animal',
      vibeDescription: 'Acolhimento dedicado, cuidado com bem-estar dos pets e tranquilidade para os tutores.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0D1418',
        cardBg: '#131F25',
        innerCardBg: '#1B2B33',
        primaryAccent: '#10B981',
        secondaryAccent: '#F59E0B',
        textColor: '#F0FDF4',
        textMuted: '#94A3B8',
        borderColor: '#213B44',
        accentBadgeBg: 'rgba(16, 185, 129, 0.18)',
        accentBadgeText: '#34D399',
        buttonBg: '#10B981',
        buttonText: '#0D1418',
      },
      headline: `O carinho e a dedicação que o seu melhor amigo merece.`,
      subheadline: `Catálogo de serviços, cuidados veterinários e agendamento descomplicado pelo WhatsApp em ${city}.`,
      highlightedRealAsset: `Tutores elogiam a paciência com os animais, a higiene do ambiente e o carinho da equipe.`,
      elevationConcept: `Apresentação acolhedora do espaço, serviços de banho & tosa e canal de agendamento ágil no WhatsApp.`,
      actionLabel: 'Agendar Banho & Tosa / Consulta',
      keyBenefits: [
        'Apresentação clara dos serviços de banho, tosa e consultas veterinárias',
        'Agendamento rápido de horários pelo WhatsApp sem filas',
        'Galeria com fotos de pets felizes e bem cuidados no espaço',
        'Visual que transmite segurança, carinho e profissionalismo aos tutores',
      ],
      features: [
        {
          title: 'Espaço dos Pets no Celular',
          description: 'Página acolhedora que apresenta a equipe, os cuidados e os serviços oferecidos.',
          icon: 'Heart',
        },
        {
          title: 'Agendamento Ágil no WhatsApp',
          description: 'O tutor informa o porte do pet e escolhe o melhor dia/horário com facilidade.',
          icon: 'Calendar',
        },
        {
          title: 'Galeria dos Bichinhos',
          description: 'Fotos reais com contraste acolhedor demonstrando o carinho com cada animal.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de agendar banho e tosa para o meu cachorrinho nesta semana.`,
        botReply: `Olá! Que alegria atender você e seu pet na ${name}! 🐾 Qual é o porte e raça dele para já verificarmos os melhores horários disponíveis?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Acolhedora para Pets & Tutores',
          description: 'Design pensado para transmitir amor pelos animais e facilitar o agendamento de cuidados.',
          deliverable: 'Página One-Page responsiva conectada ao WhatsApp.',
        },
        {
          title: 'Curadoria Visual de Pets & Estrutura',
          description: 'Fotos reais tratadas dos pets no banho, tosa e consultório.',
          deliverable: 'Imagens em alta definição para Google e redes.',
        },
        {
          title: 'Canal Direto de Agendamento Pet',
          description: 'Fluxo para receber mensagens com nome do pet, porte e serviços desejados.',
          deliverable: 'Integração pronta para o WhatsApp da equipe.',
        },
      ],
      profileGaps: [
        {
          badge: '🐾 Agendamento Descentralizado',
          title: 'Falta de Fluxo Organizado para Marcação de Horários',
          description: `Tutores procuram agilidade para encaixar banho e tosa na rotina da semana, mas encontram apenas números sem opções visuais organizadas.`,
          impactOnSales: `Tutores que pesquisam pelo celular acabam optando por locais onde é mais rápido agendar.`,
          intuitiveAutomationSolution: `Página clara com os pacotes de cuidados e botão que já envia o pedido de agendamento pronto.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação organizada dos serviços para pets no celular.',
          solutionTitle: 'Presença Mobile Aconchegante para Tutores',
          deliverable: 'Página rápida no smartphone com serviços, horários e agendamento direto.',
          revenueImpact: 'Fidelização de tutores locais que valorizam facilidade e carinho.',
        },
      ],
    };
  }

  // 3. Salões de Beleza, Barbearias, Esmalterias & Estética
  if (
    lowerCat.includes('salao') ||
    lowerCat.includes('salão') ||
    lowerCat.includes('barbearia') ||
    lowerCat.includes('barber') ||
    lowerCat.includes('estetica') ||
    lowerCat.includes('estética') ||
    lowerCat.includes('cabel') ||
    lowerCat.includes('manicure') ||
    lowerCat.includes('unha') ||
    lowerCat.includes('sobrancelha') ||
    lowerCat.includes('spa') ||
    lowerCat.includes('massagem')
  ) {
    return {
      vibe: 'estilo_autocuidado',
      vibeLabel: 'Autoestima, Estilo & Cuidado Pessoal',
      vibeDescription: 'Elegância, atenção aos detalhes, técnicas modernas e valorização da beleza de cada cliente.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#120F16',
        cardBg: '#1C1823',
        innerCardBg: '#272132',
        primaryAccent: '#EC4899',
        secondaryAccent: '#A855F7',
        textColor: '#FAF5FF',
        textMuted: '#C4B5FD',
        borderColor: '#3B2E4D',
        accentBadgeBg: 'rgba(236, 72, 153, 0.18)',
        accentBadgeText: '#F472B6',
        buttonBg: '#EC4899',
        buttonText: '#FFFFFF',
      },
      headline: `Realçando o seu estilo e bem-estar com atendimento exclusivo.`,
      subheadline: `Apresentação dos procedimentos, fotos dos resultados e agendamento rápido pelo WhatsApp em ${city}.`,
      highlightedRealAsset: `Clientes elogiam o bom gosto dos profissionais, a pontualidade e a atmosfera acolhedora do espaço.`,
      elevationConcept: `Catálogo visual dos procedimentos com fotos em alta definição e botão direto para agendamento.`,
      actionLabel: 'Agendar Horário no WhatsApp',
      keyBenefits: [
        'Galeria de resultados com fotos nítidas dos cortes, procedimentos e produções',
        'Tabela clara dos serviços prestados para consulta imediata no celular',
        'Botão direto no WhatsApp para marcar horários com agilidade',
        'Identidade visual sofisticada que valoriza o posicionamento do espaço',
      ],
      features: [
        {
          title: 'Portfólio Visual no Celular',
          description: 'Apresentação moderna dos estilos, cores, maquiagens e procedimentos.',
          icon: 'Sparkles',
        },
        {
          title: 'Agendamento Direto no WhatsApp',
          description: 'O cliente escolhe o profissional e o serviço desejado sem burocracia.',
          icon: 'Calendar',
        },
        {
          title: 'Ambiente & Experiência',
          description: 'Destaque do aconchego e do clima agradável do espaço físico.',
          icon: 'Camera',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de consultar os horários disponíveis para corte e procedimento esta semana.`,
        botReply: `Olá! Que prazer atender você na ${name}! ✨ Já separamos nossos horários para esta semana. Qual procedimento você deseja realizar?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile de Estilo & Procedimentos',
          description: 'Apresentação visual elegante para clientes conhecerem o trabalho e marcarem horário.',
          deliverable: 'Página One-Page exclusiva conectada ao WhatsApp.',
        },
        {
          title: 'Curadoria de Portfólio & Fotos Reais',
          description: 'Tratamento de fotos dos trabalhos reais com iluminação profissional.',
          deliverable: 'Galeria de fotos tratadas em alta definição.',
        },
        {
          title: 'Canal de Agendamento Facilitado',
          description: 'Fluxo que envia a solicitação de horário diretamente para a recepção.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '✂️ Agendamento Fragmentado',
          title: 'Dependência de DMs no Instagram para Marcar Horários',
          description: `Muitos clientes pesquisam no Google Maps mas precisam ir ao Instagram e esperar resposta em DM, onde mensagens acabam se perdendo.`,
          impactOnSales: `Perda de clientes que desejam agendamento rápido de última hora ou para eventos.`,
          intuitiveAutomationSolution: `Canal direto no WhatsApp com lista clara dos procedimentos para escolha imediata.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de página própria com fotos profissionais e botão rápido de agendamento.',
          solutionTitle: 'Presença Mobile Sofisticada de Beleza & Bem-Estar',
          deliverable: 'Página veloz com catálogo de serviços e agendamento no WhatsApp.',
          revenueImpact: 'Maior atração de clientes qualificados que valorizam estética impecável.',
        },
      ],
    };
  }

  // 4. Academias, Crossfit, Studios de Pilates, Yoga & Fitness
  if (
    lowerCat.includes('academia') ||
    lowerCat.includes('fitness') ||
    lowerCat.includes('crossfit') ||
    lowerCat.includes('pilates') ||
    lowerCat.includes('yoga') ||
    lowerCat.includes('personal') ||
    lowerCat.includes('treino') ||
    lowerCat.includes('musculacao') ||
    lowerCat.includes('musculação') ||
    lowerCat.includes('luta') ||
    lowerCat.includes('artes marciais')
  ) {
    return {
      vibe: 'energia_vital',
      vibeLabel: 'Saúde, Energia & Qualidade de Vida',
      vibeDescription: 'Treinos dinâmicos, acompanhamento profissional e o ambiente ideal para superar limites.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0E1117',
        cardBg: '#151A24',
        innerCardBg: '#1D2433',
        primaryAccent: '#E11D48',
        secondaryAccent: '#F59E0B',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2E384D',
        accentBadgeBg: 'rgba(225, 29, 72, 0.18)',
        accentBadgeText: '#FB7185',
        buttonBg: '#E11D48',
        buttonText: '#FFFFFF',
      },
      headline: `Estrutura moderna, motivação e o incentivo para sua melhor versão.`,
      subheadline: `Grade de aulas, planos e agendamento de aula experimental direto no WhatsApp em ${city}.`,
      highlightedRealAsset: `Alunos ressaltam a atenção dos professores, a conservação dos equipamentos e a energia dos treinos.`,
      elevationConcept: `Apresentação dinâmica do espaço, horários de aulas e botão direto para agendar aula experimental.`,
      actionLabel: 'Agendar Aula Experimental no WhatsApp',
      keyBenefits: [
        'Apresentação clara dos planos, modalidades e grade de horários',
        'Agendamento simples de aula experimental pelo WhatsApp',
        'Galeria moderna exibindo equipamentos, vestiários e estrutura',
        'Visual enérgico que inspira saúde e disciplina imediata',
      ],
      features: [
        {
          title: 'Modalidades & Grade de Aulas',
          description: 'Horários organizados para consulta rápida no celular.',
          icon: 'Clock',
        },
        {
          title: 'Aula Experimental com 1 Toque',
          description: 'O aluno interessado agenda o primeiro treino sem complicação.',
          icon: 'Activity',
        },
        {
          title: 'Tour da Estrutura',
          description: 'Fotos reais com contraste que destacam a qualidade dos aparelhos.',
          icon: 'Camera',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de saber os horários das aulas e agendar uma aula experimental!`,
        botReply: `Olá! Seja muito bem-vindo à ${name}! 💪 Temos treinos sob medida para o seu objetivo. Qual modalidade você gostaria de experimentar?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Fitness & Grade de Treinos',
          description: 'Apresentação moderna da estrutura para converter quem busca academia no Google.',
          deliverable: 'Página One-Page dinâmica conectada ao WhatsApp.',
        },
        {
          title: 'Curadoria Visual da Estrutura & Treinos',
          description: 'Fotos de alta energia dos treinos, equipamentos e professores.',
          deliverable: 'Galeria visual tratada em alta resolução.',
        },
        {
          title: 'Fluxo de Aula Experimental no WhatsApp',
          description: 'Canal que recebe os dados do aluno interessado e agenda a visita.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🏋️ Dúvidas de Horários',
          title: 'Ausência de Grade de Horários e Modalidades Online',
          description: `Pessoas que querem começar a treinar pesquisam no celular e desistem se não encontram os horários das aulas e modalidades.`,
          impactOnSales: `Perda de potenciais alunos novos que optam por estúdios com informações mais transparentes.`,
          intuitiveAutomationSolution: `Grade interativa de treinos com botão para agendamento de aula experimental no WhatsApp.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação das modalidades e canal de aula experimental no celular.',
          solutionTitle: 'Presença Mobile de Alta Energia & Atração de Alunos',
          deliverable: 'Página interativa com grade de treinos e botão de aula experimental.',
          revenueImpact: 'Crescimento constante na captação de novos alunos semanais.',
        },
      ],
    };
  }

  // 5. Clínicas Médicas, Consultórios Odontológicos, Fisioterapia & Saúde
  if (
    lowerCat.includes('odonto') ||
    lowerCat.includes('dentista') ||
    lowerCat.includes('clinica') ||
    lowerCat.includes('clínica') ||
    lowerCat.includes('saude') ||
    lowerCat.includes('saúde') ||
    lowerCat.includes('médic') ||
    lowerCat.includes('medic') ||
    lowerCat.includes('terapia') ||
    lowerCat.includes('psicolog') ||
    lowerCat.includes('fisioterap')
  ) {
    return {
      vibe: 'clinico_humano',
      vibeLabel: 'Cuidado Humano & Confiança Médica',
      vibeDescription: 'Profissionalismo, clareza, ambiente acolhedor e profundo respeito à saúde do paciente.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0A121D',
        cardBg: '#101D2D',
        innerCardBg: '#17273D',
        primaryAccent: '#0EA5E9',
        secondaryAccent: '#10B981',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#1D3552',
        accentBadgeBg: 'rgba(14, 165, 233, 0.18)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0EA5E9',
        buttonText: '#FFFFFF',
      },
      headline: `Cuidado dedicado, acolhimento e o bem-estar da sua família.`,
      subheadline: `Informações claras sobre especialidades e agendamento humanizado pelo WhatsApp em ${city}.`,
      highlightedRealAsset: `Pacientes ressaltam a pontualidade, a paciência da equipe e a clareza nas orientações de tratamento.`,
      elevationConcept: `Apresentação serena das especialidades e triagem rápida de horários no WhatsApp.`,
      actionLabel: 'Agendar Consulta no WhatsApp',
      keyBenefits: [
        'Apresentação clara das especialidades atendidas e do corpo clínico',
        'Facilidade para o paciente solicitar informações e horários de consulta',
        'Ambiente sereno que transmite segurança, higiene e acolhimento',
        'Total respeito e clareza sobre os procedimentos e convênios/atendimentos',
      ],
      features: [
        {
          title: 'Especialidades & Cuidados',
          description: 'Apresentação detalhada dos tratamentos e cuidados preventivos.',
          icon: 'Shield',
        },
        {
          title: 'Agendamento Humanizado',
          description: 'Contato direto com a recepção para confirmação de consultas e exames.',
          icon: 'MessageCircle',
        },
        {
          title: 'Espaço Confortável & Acessível',
          description: 'Fotos reais do consultório limpo, equipado e preparado para acolher.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de consultar os horários disponíveis para agendamento de consulta.`,
        botReply: `Olá! É um prazer cuidar de você na ${name}. 🩺 Para qual especialidade ou procedimento você gostaria de agendar?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile de Saúde & Confiança Médica',
          description: 'Apresentação clara das especialidades médicas/odontológicas para pacientes.',
          deliverable: 'Página One-Page responsiva com botão direto para a recepção.',
        },
        {
          title: 'Curadoria de Imagens do Consultório & Estrutura',
          description: 'Fotografia serena com foco em higiene, tecnologia e conforto.',
          deliverable: 'Imagens tratadas em alta definição.',
        },
        {
          title: 'Canal de Pré-Agendamento de Consultas',
          description: 'Fluxo estruturado para solicitação de consultas e triagem inicial de horários.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🩺 Dúvidas de Atendimento',
          title: 'Ausência de Informações Claras de Especialidades no Celular',
          description: `Pacientes que pesquisam no Google Maps precisam saber exatamente quais especialidades são atendidas antes de chamar.`,
          impactOnSales: `Pacientes com urgência acabam chamando outra clínica que lista seus serviços com maior clareza.`,
          intuitiveAutomationSolution: `Apresentação limpa das especialidades com botão direto para a recepção no WhatsApp.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação serena das especialidades e botão direto para consultas.',
          solutionTitle: 'Presença Mobile Médica de Alta Confiança',
          deliverable: 'Página clara com especialidades e agendamento no WhatsApp.',
          revenueImpact: 'Atração de novos pacientes que buscam tratamentos com segurança.',
        },
      ],
    };
  }

  // 6. Pousadas, Hotéis, Chalés & Hospedagem
  if (
    lowerCat.includes('pousada') ||
    lowerCat.includes('hotel') ||
    lowerCat.includes('resort') ||
    lowerCat.includes('hosped') ||
    lowerCat.includes('chale') ||
    lowerCat.includes('chalé') ||
    lowerCat.includes('hostel')
  ) {
    return {
      vibe: 'solar_praiano',
      vibeLabel: 'Refúgio Solar & Hospitalidade Baiana',
      vibeDescription: 'Ambiente de descanso, brisa do mar e tranquilidade que convida o hóspede a desacelerar.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0B1520',
        cardBg: '#112030',
        innerCardBg: '#182C42',
        primaryAccent: '#0284C7',
        secondaryAccent: '#14B8A6',
        textColor: '#F0FDF4',
        textMuted: '#94A3B8',
        borderColor: '#1E3A56',
        accentBadgeBg: 'rgba(2, 132, 199, 0.18)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      headline: `O seu refúgio de tranquilidade e aconchego em Porto Seguro.`,
      subheadline: `Apresentação imersiva das acomodações com botão direto de reservas no WhatsApp.`,
      highlightedRealAsset: `Hóspedes destacam o café da manhã caseiro, a limpeza impecável e a gentileza da equipe.`,
      elevationConcept: `Galeria visual das suítes e canal de reserva direta pelo WhatsApp sem comissões de terceiros.`,
      actionLabel: 'Consultar Disponibilidade / Reservas',
      keyBenefits: [
        'Galeria imersiva das suítes, área de lazer e café da manhã',
        'Canal de reserva direta no WhatsApp sem intermediários nem taxas de OTAs',
        'Apresentação clara da localização, comodidades e passeios da região',
        'Experiência solar e acolhedora que convida o viajante a reservar de imediato',
      ],
      features: [
        {
          title: 'Acomodações & Suítes',
          description: 'Apresentação detalhada com fotos nítidas de cada categoria de quarto.',
          icon: 'Home',
        },
        {
          title: 'Reservas Diretas no WhatsApp',
          description: 'O hóspede escolhe as datas e tira dúvidas diretamente com a recepção.',
          icon: 'CalendarCheck',
        },
        {
          title: 'Hospitalidade & Lazer',
          description: 'Fotos do café da manhã, piscina, jardim e atmosfera relaxante.',
          icon: 'Sun',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de consultar disponibilidade e valores para casal no próximo mês.`,
        botReply: `Olá! Que alegria receber seu contato na ${name}! 🌊 Temos suítes acolhedoras perfeitas para vocês. Quais datas vocês pretendem vir?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Solar de Hospedagem',
          description: 'Vitrine imersiva das suítes para turistas que buscam hospedagem em Porto Seguro.',
          deliverable: 'Página One-Page veloz conectada diretamente ao WhatsApp da recepção.',
        },
        {
          title: 'Curadoria Fotográfica das Suítes & Lazer',
          description: 'Tratamento de fotos dos quartos, iluminação natural e café da manhã.',
          deliverable: 'Imagens em alta definição prontas para o Google e redes.',
        },
        {
          title: 'Canal de Reservas Diretas sem Intermediários',
          description: 'Fluxo para o hóspede solicitar datas sem pagar comissões para plataformas terceiras.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🏖️ Dependência de OTAs',
          title: 'Falta de Canal Oficial de Reserva Direta no Celular',
          description: `Muitos turistas encontram a pousada no Google Maps mas acabam fechando por plataformas intermediárias que cobram altas taxas percentuais.`,
          impactOnSales: `Perda de margem em reservas que poderiam ser fechadas diretamente pelo WhatsApp.`,
          intuitiveAutomationSolution: `Página com galeria das suítes e botão de reserva direta no WhatsApp com benefícios exclusivos.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação imersiva das suítes e canal de reserva direta no smartphone.',
          solutionTitle: 'Presença Mobile de Hospitalidade Solar',
          deliverable: 'Página imersiva com fotos das suítes e botão de reserva direta.',
          revenueImpact: 'Aumento significativo nas reservas diretas sem taxas de intermediação.',
        },
      ],
    };
  }

  // 7. Imobiliárias, Corretores & Construtoras
  if (
    lowerCat.includes('imobiliari') ||
    lowerCat.includes('imobiliária') ||
    lowerCat.includes('imoveis') ||
    lowerCat.includes('imóveis') ||
    lowerCat.includes('corretor') ||
    lowerCat.includes('locacao') ||
    lowerCat.includes('locação') ||
    lowerCat.includes('construtora')
  ) {
    return {
      vibe: 'solidez_imobiliaria',
      vibeLabel: 'Patrimônio, Segurança & Novos Começos',
      vibeDescription: 'Transparência nas negociações, curadoria de imóveis e assessoria dedicada para cada família.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0C111A',
        cardBg: '#131A26',
        innerCardBg: '#1A2436',
        primaryAccent: '#0284C7',
        secondaryAccent: '#F59E0B',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#24324A',
        accentBadgeBg: 'rgba(2, 132, 199, 0.18)',
        accentBadgeText: '#38BDF8',
        buttonBg: '#0284C7',
        buttonText: '#FFFFFF',
      },
      headline: `Os melhores imóveis e a segurança para o seu próximo grande passo.`,
      subheadline: `Apresentação dos destaques imobiliários e contato direto com corretores em ${city}.`,
      highlightedRealAsset: `Clientes valorizam o atendimento transparente, a agilidade na documentação e a atenção aos detalhes.`,
      elevationConcept: `Catálogo limpo de imóveis em destaque no celular com botão direto para agendar visitas.`,
      actionLabel: 'Falar com Corretor / Agendar Visita',
      keyBenefits: [
        'Apresentação dos imóveis em destaque com fotos de qualidade',
        'Canal ágil no WhatsApp para agendamento de visitas presenciais',
        'Apresentação da credibilidade, registro profissional e história da empresa',
        'Fácil localização e informações claras sobre compras, vendas e locações',
      ],
      features: [
        {
          title: 'Imóveis em Destaque',
          description: 'Apresentação visual nítida das melhores oportunidades da região.',
          icon: 'Building',
        },
        {
          title: 'Visitas Rápidas pelo WhatsApp',
          description: 'O cliente agenda horário de visita diretamente com o corretor responsável.',
          icon: 'MessageSquare',
        },
        {
          title: 'Assessoria Completa',
          description: 'Informações claras sobre documentação, financiamento e suporte.',
          icon: 'CheckCircle',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de mais informações sobre os imóveis para compra/locação em Porto Seguro.`,
        botReply: `Olá! Seja bem-vindo à ${name}! 🏡 Temos excelentes opções disponíveis. Você busca imóveis para moradia ou investimento?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Imobiliária de Alta Conversão',
          description: 'Apresentação dos imóveis selecionados para quem busca no Google.',
          deliverable: 'Página One-Page veloz conectada ao WhatsApp dos corretores.',
        },
        {
          title: 'Tratamento de Imagens Imobiliárias',
          description: 'Ajuste de iluminação e ângulos das fotos dos imóveis.',
          deliverable: 'Galeria visual tratada em alta definição.',
        },
        {
          title: 'Canal de Agendamento de Visitas',
          description: 'Fluxo estruturado para receber o interesse no imóvel com código e dados do cliente.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🏢 Dificuldade de Contato',
          title: 'Falta de Apresentação Rápida dos Destaques no Celular',
          description: `Interessados em imóveis que pesquisam no Google Maps querem ver fotos nítidas e chamar no WhatsApp imediatamente para agendar visita.`,
          impactOnSales: `Clientes decididos acabam procurando imobiliárias com canais de atendimento mais acessíveis no celular.`,
          intuitiveAutomationSolution: `Página mobile com os principais imóveis e botão direto para o corretor de plantão.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação ágil dos imóveis e botão de visita direta no celular.',
          solutionTitle: 'Presença Mobile Imobiliária de Autoridade',
          deliverable: 'Página rápida com imóveis em destaque e contato com corretores.',
          revenueImpact: 'Maior captação de compradores e locatários qualificados.',
        },
      ],
    };
  }

  // 8. Escolas, Creches, Cursos & Educação
  if (
    lowerCat.includes('escola') ||
    lowerCat.includes('colegio') ||
    lowerCat.includes('colégio') ||
    lowerCat.includes('curso') ||
    lowerCat.includes('idiomas') ||
    lowerCat.includes('infantil') ||
    lowerCat.includes('educacao') ||
    lowerCat.includes('educação') ||
    lowerCat.includes('ensino') ||
    lowerCat.includes('bercario') ||
    lowerCat.includes('berçário')
  ) {
    return {
      vibe: 'educacao_formacao',
      vibeLabel: 'Desenvolvimento, Afeto & Futuro',
      vibeDescription: 'Ambiente seguro, estímulo ao aprendizado e parceria sólida entre família e educadores.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0A131C',
        cardBg: '#101E2B',
        innerCardBg: '#172C3E',
        primaryAccent: '#3B82F6',
        secondaryAccent: '#F59E0B',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#1D3B54',
        accentBadgeBg: 'rgba(59, 130, 246, 0.18)',
        accentBadgeText: '#60A5FA',
        buttonBg: '#3B82F6',
        buttonText: '#FFFFFF',
      },
      headline: `Ambiente acolhedor e formação completa para o futuro dos seus filhos.`,
      subheadline: `Apresentação pedagógica, estrutura física e agendamento de visitas em ${city}.`,
      highlightedRealAsset: `Pais elogiam o carinho dos professores, a segurança do espaço e o desenvolvimento visível das crianças.`,
      elevationConcept: `Apresentação acolhedora da metodologia, fotos do espaço e botão para agendar visita pedagógica.`,
      actionLabel: 'Agendar Visita Pedagógica no WhatsApp',
      keyBenefits: [
        'Apresentação clara da proposta pedagógica e dos ciclos de ensino',
        'Agendamento simples de visitas para as famílias conhecerem o espaço',
        'Galeria com fotos do ambiente seguro, salas de aula e pátios',
        'Comunicação transparente que transmite segurança e acolhimento aos pais',
      ],
      features: [
        {
          title: 'Proposta Pedagógica',
          description: 'Apresentação clara dos valores, métodos e atividades extracurriculares.',
          icon: 'BookOpen',
        },
        {
          title: 'Visita Pedagógica no WhatsApp',
          description: 'Os pais agendam o melhor dia para conhecer a coordenação e o espaço.',
          icon: 'Calendar',
        },
        {
          title: 'Segurança & Estrutura',
          description: 'Fotos reais demonstrando o cuidado, a higiene e a segurança do local.',
          icon: 'ShieldCheck',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de conhecer a escola e agendar uma visita pedagógica para o próximo ano.`,
        botReply: `Olá! Que alegria receber você na ${name}! 📚 Ficaremos muito felizes em apresentar nossa escola para sua família. Para qual série/ano seria a matrícula?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Escolar & Apresentação às Famílias',
          description: 'Apresentação acolhedora da estrutura e metodologia para pais que pesquisam no Google.',
          deliverable: 'Página One-Page moderna conectada à secretaria/coordenação.',
        },
        {
          title: 'Curadoria de Imagens do Ambiente Escolar',
          description: 'Fotografia cuidada das salas, áreas de recreação e atividades.',
          deliverable: 'Galeria visual tratada em alta definição.',
        },
        {
          title: 'Canal de Agendamento de Visitas das Famílias',
          description: 'Fluxo para os pais escolherem dia e horário de visitação.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '📚 Informações Pedagógicas',
          title: 'Falta de Apresentação Clara da Proposta Pedagógica no Celular',
          description: `Pais que pesquisam escolas querem entender rapidamente os ciclos atendidos, horários e marcar uma visita sem burocracia.`,
          impactOnSales: `Famílias acabam priorizando colégios com canais mais acolhedores e fáceis de agendar visita.`,
          intuitiveAutomationSolution: `Página dedicada com a metodologia e botão direto para agendamento com a coordenação.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de apresentação das atividades e canal de visitas no celular.',
          solutionTitle: 'Presença Mobile Educacional de Acolhimento',
          deliverable: 'Página com proposta pedagógica e agendamento de visita no WhatsApp.',
          revenueImpact: 'Maior atração e conversão de matrículas para o ano letivo.',
        },
      ],
    };
  }

  // 9. Pizzarias & Gastronomia Italiana / Forno a Lenha
  if (
    lowerCat.includes('pizz') ||
    lowerCat.includes('cantina') ||
    lowerCat.includes('italiana') ||
    lowerCat.includes('trattoria') ||
    reviewsText.includes('forno') ||
    reviewsText.includes('massa')
  ) {
    return {
      vibe: 'rustico',
      vibeLabel: 'Forno a Lenha & Tradição Familiar',
      vibeDescription: 'Massas artesanais de fermentação natural, calor do forno a lenha e mesas para reunir a família.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#141110',
        cardBg: '#1C1714',
        innerCardBg: '#251F1A',
        primaryAccent: '#E05A38',
        secondaryAccent: '#EAB308',
        textColor: '#FAF5EE',
        textMuted: '#C7BDB3',
        borderColor: '#3D2D24',
        accentBadgeBg: 'rgba(224, 90, 56, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#E05A38',
        buttonText: '#141110',
      },
      headline: `Massa artesanal, forno a lenha e o sabor que reúne famílias.`,
      subheadline: `Experiência visual criada para despertar apetite imediato e receber pedidos diretos no WhatsApp em ${city}.`,
      highlightedRealAsset: `Clientes elogiam o sabor autêntico das pizzas, a massa leve e o ambiente agradável para jantar.`,
      elevationConcept: `Cardápio interativo no celular, fotos reais das pizzas em destaque e pedidos diretos sem comissões.`,
      actionLabel: 'Fazer Pedido / Ver Cardápio no WhatsApp',
      keyBenefits: [
        'Cardápio interativo no celular com fotos apetitosas das pizzas',
        'Pedidos diretos no WhatsApp sem taxas abusivas de aplicativos de entrega',
        'Apresentação acolhedora do ambiente para jantares em família e celebrações',
        'Experiência rápida que reduz o tempo de atendimento da cozinha',
      ],
      features: [
        {
          title: 'Cardápio Visual no Smartphone',
          description: 'Pizzas tradicionais, especiais e bebidas com fotos atraentes.',
          icon: 'Utensils',
        },
        {
          title: 'Pedido Pronto no WhatsApp',
          description: 'O cliente escolhe os sabores e a mensagem chega pronta para a cozinha.',
          icon: 'MessageSquare',
        },
        {
          title: 'Atmosfera do Forno a Lenha',
          description: 'Destaque visual do preparo artesanal e do ambiente da casa.',
          icon: 'Flame',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de ver o cardápio e fazer um pedido para hoje à noite!`,
        botReply: `Olá! Que alegria receber você na ${name}! 🍕 Já separamos nosso cardápio de pizzas quentinhas no forno a lenha. Para entrega ou retirada?`,
      },
      suggestedServices: [
        {
          title: 'Cardápio Digital & Presença Mobile para Pizzaria',
          description: 'Página ultra-rápida no celular para o cliente escolher sabores e pedir no WhatsApp.',
          deliverable: 'Página One-Page responsiva conectada ao WhatsApp da equipe.',
        },
        {
          title: 'Fotografia Apetitosa das Pizzas & Forno',
          description: 'Fotos das pizzas saindo do forno com queijo derretido e borda aerada.',
          deliverable: 'Imagens em alta definição prontas para o Google.',
        },
        {
          title: 'Canal de Pedidos sem Intermediários',
          description: 'Fluxo direto no WhatsApp para receber pedidos completos sem pagar comissões.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🍕 Pedidos Descentralizados',
          title: 'Falta de Cardápio Interativo Direto no Celular',
          description: `Clientes no Google Maps pesquisam pelo cardápio e encontram apenas fotos antigas desatualizadas ou PDFs pesados.`,
          impactOnSales: `Clientes desistem ou procuram opções com visualização mais rápida no celular.`,
          intuitiveAutomationSolution: `Cardápio digital leve com botão de pedido direto no WhatsApp.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de cardápio digital rápido e canal direto de pedidos no celular.',
          solutionTitle: 'Cardápio Visual & Canal Direto de Pizzas',
          deliverable: 'Página veloz com cardápio e envio do pedido pronto no WhatsApp.',
          revenueImpact: 'Aumento nos pedidos diretos sem intermediários.',
        },
      ],
    };
  }

  // 10. Padarias, Confeitarias & Cafés
  if (
    lowerCat.includes('padaria') ||
    lowerCat.includes('confeitaria') ||
    lowerCat.includes('café') ||
    lowerCat.includes('cafe') ||
    lowerCat.includes('panificadora') ||
    lowerCat.includes('doceria') ||
    lowerCat.includes('bolos')
  ) {
    return {
      vibe: 'artesanal_acolhedor',
      vibeLabel: 'Fornadas Frescas & Café Aconchegante',
      vibeDescription: 'O aroma de pão quentinho, doces artesanais e a parada indispensável do dia a dia.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#181411',
        cardBg: '#221B17',
        innerCardBg: '#2D231E',
        primaryAccent: '#D97706',
        secondaryAccent: '#B45309',
        textColor: '#FEF3C7',
        textMuted: '#D4C3B3',
        borderColor: '#42332B',
        accentBadgeBg: 'rgba(217, 119, 6, 0.18)',
        accentBadgeText: '#FBBF24',
        buttonBg: '#D97706',
        buttonText: '#181411',
      },
      headline: `Pão quentinho, café passado e receitas feitas com carinho.`,
      subheadline: `Cardápio visual de encomendas e fornadas do dia direto no WhatsApp em ${city}.`,
      highlightedRealAsset: `Fidelidade dos clientes que elogiam a variedade dos salgados, os bolos caseiros e o atendimento simpático.`,
      elevationConcept: `Catálogo online de encomendas com fotos apetitosas e canal direto no WhatsApp.`,
      actionLabel: 'Ver Cardápio / Encomendar no WhatsApp',
      keyBenefits: [
        'Catálogo de bolos, tortas e salgados para encomendas de eventos',
        'Canal ágil no WhatsApp para recebimento de encomendas sem erros',
        'Fotos apetitosas das fornadas diárias e doces artesanais',
        'Atmosfera acolhedora que valoriza o carinho de produção da casa',
      ],
      features: [
        {
          title: 'Catálogo de Encomendas',
          description: 'Opções de bolos, salgados e kits para festas e café da tarde.',
          icon: 'Coffee',
        },
        {
          title: 'Encomendas no WhatsApp',
          description: 'O cliente escolhe o tamanho do bolo e recheio de forma simples.',
          icon: 'MessageSquare',
        },
        {
          title: 'Aconchego & Frescor',
          description: 'Fotos que despertam vontade imediata de saborear as receitas da casa.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de ver as opções de bolos e tortas para encomenda neste fim de semana!`,
        botReply: `Olá! Que alegria atender você na ${name}! ☕ Já separamos nosso catálogo de doces e bolos caseiros para sua festa. Para quantas pessoas seria?`,
      },
      suggestedServices: [
        {
          title: 'Catálogo Mobile de Encomendas & Padaria',
          description: 'Apresentação apetitosa dos produtos para clientes que buscam no Google.',
          deliverable: 'Página One-Page responsiva conectada ao WhatsApp.',
        },
        {
          title: 'Curadoria Visual de Pães, Cafés & Bolos',
          description: 'Fotos tratadas dos produtos artesanais com iluminação quente.',
          deliverable: 'Galeria visual tratada em alta resolução.',
        },
        {
          title: 'Canal de Encomendas sem Erros',
          description: 'Fluxo para o cliente montar o pedido de festa com data e sabores especificados.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🥖 Encomendas Manuais',
          title: 'Falta de Catálogo Digital de Encomendas',
          description: `Clientes precisam telefonar ou ir ao balcão para conhecer as opções e tamanhos de bolos e kits festa.`,
          impactOnSales: `Perda de encomendas para aniversários e reuniões corporativas de clientes com pressa no celular.`,
          intuitiveAutomationSolution: `Catálogo digital de encomendas com envio direto do pedido formatado no WhatsApp.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de catálogo digital de encomendas e fornadas no celular.',
          solutionTitle: 'Catálogo Visual de Encomendas & Padaria Artesanal',
          deliverable: 'Página veloz com fotos dos produtos e canal direto de pedidos.',
          revenueImpact: 'Crescimento nas encomendas antecipadas de bolos e kits festa.',
        },
      ],
    };
  }

  // 11. Hamburguerias, Bares & Gastronomia Contemporânea
  if (
    lowerCat.includes('hamburguer') ||
    lowerCat.includes('burger') ||
    lowerCat.includes('bar') ||
    lowerCat.includes('pub') ||
    lowerCat.includes('cerveja') ||
    lowerCat.includes('chopp') ||
    lowerCat.includes('petisc') ||
    lowerCat.includes('espet')
  ) {
    return {
      vibe: 'contemporaneo',
      vibeLabel: 'Sabor Marcante & Encontros Vibrantes',
      vibeDescription: 'Hambúrguer artesanal, brasa acesa, chopp trincando e boa música entre amigos.',
      typographyStyle: 'sans',
      theme: {
        boardBg: '#0F1015',
        cardBg: '#181922',
        innerCardBg: '#222430',
        primaryAccent: '#F97316',
        secondaryAccent: '#EF4444',
        textColor: '#F8FAFC',
        textMuted: '#94A3B8',
        borderColor: '#2B2E3E',
        accentBadgeBg: 'rgba(249, 115, 22, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#F97316',
        buttonText: '#0F1015',
      },
      headline: `Blend artesanal, queijo derretido e ponto perfeito na brasa.`,
      subheadline: `Cardápio digital ágil no celular com envio de pedidos prontos para a equipe em ${city}.`,
      highlightedRealAsset: `Clientes destacam o sabor suculento dos lanches, as porções caprichadas e a agilidade da cozinha.`,
      elevationConcept: `Cardápio visual responsivo para escolher o combo e pedir em poucos toques no WhatsApp.`,
      actionLabel: 'Fazer Pedido no WhatsApp',
      keyBenefits: [
        'Cardápio visual moderno dos hambúrgueres, porções e drinks',
        'Envio de pedido completo diretamente no WhatsApp da casa',
        'Destaque dos combos promocionais e chopps especiais',
        'Economia total de comissões cobradas por aplicativos de delivery',
      ],
      features: [
        {
          title: 'Cardápio na Palma da Mão',
          description: 'Hambúrgueres artesanais, acompanhamentos e bebidas bem organizados.',
          icon: 'Flame',
        },
        {
          title: 'Pedido Ágil no WhatsApp',
          description: 'O cliente escolhe o ponto da carne e adicionais sem complicação.',
          icon: 'MessageSquare',
        },
        {
          title: 'Vibe Noturna & Encontros',
          description: 'Fotos com luz contemporânea destacando o clima animado da casa.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de ver o cardápio e fazer um pedido de hambúrguer para entrega hoje!`,
        botReply: `Fala! Beleza? 🍔 Bem-vindo à ${name}! A brasa já tá acesa e os burgers saindo no ponto. Dá uma olhada no nosso cardápio de hoje!`,
      },
      suggestedServices: [
        {
          title: 'Cardápio Mobile de Hamburgueria & Chopp',
          description: 'Página moderna para escolher combos e fechar pedidos no WhatsApp.',
          deliverable: 'Página One-Page responsiva veloz conectada ao WhatsApp.',
        },
        {
          title: 'Fotografia Gastronômica Suculenta',
          description: 'Fotos com contraste acentuado dos burgers, queijo derretido e drinks.',
          deliverable: 'Galeria visual tratada em alta resolução.',
        },
        {
          title: 'Canal de Delivery sem Intermediários',
          description: 'Fluxo direto no WhatsApp para receber o pedido com endereço de entrega.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🍔 Taxas de Delivery',
          title: 'Dependência de Aplicativos com Altas Comissões',
          description: `A hamburgueria perde boa parte da margem de lucro pagando comissões para aplicativos de entrega.`,
          impactOnSales: `Perda considerável de margem em pedidos de clientes fiéis que prefeririam pedir direto.`,
          intuitiveAutomationSolution: `Cardápio digital próprio onde o cliente pede direto no WhatsApp sem taxa extra.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de cardápio digital próprio e dependência de aplicativos terceiros.',
          solutionTitle: 'Cardápio Digital Próprio & Pedidos Diretos',
          deliverable: 'Página moderna de pedidos no celular conectada ao WhatsApp.',
          revenueImpact: 'Recuperação de margem de lucro e fidelização dos clientes.',
        },
      ],
    };
  }

  // 12. Restaurantes em Geral, Frutos do Mar & Culinária Regional
  if (
    lowerCat.includes('restaurante') ||
    lowerCat.includes('churrasc') ||
    lowerCat.includes('frutos do mar') ||
    lowerCat.includes('peixe') ||
    lowerCat.includes('culinaria') ||
    lowerCat.includes('culinária') ||
    lowerCat.includes('buffet') ||
    lowerCat.includes('gastronomia')
  ) {
    return {
      vibe: 'gastronomia_local',
      vibeLabel: 'Gastronomia Autêntica & Sabor Local',
      vibeDescription: 'Ingredientes frescos, tempero equilibrado e a acolhida que torna cada refeição memorável.',
      typographyStyle: 'serif',
      theme: {
        boardBg: '#121417',
        cardBg: '#1A1E24',
        innerCardBg: '#232932',
        primaryAccent: '#EA580C',
        secondaryAccent: '#F59E0B',
        textColor: '#FAF5EE',
        textMuted: '#94A3B8',
        borderColor: '#2D3542',
        accentBadgeBg: 'rgba(234, 88, 12, 0.18)',
        accentBadgeText: '#FB923C',
        buttonBg: '#EA580C',
        buttonText: '#FAF5EE',
      },
      headline: `Ingredientes frescos, sabor inconfundível e acolhimento em cada prato.`,
      subheadline: `Cardápio visual e facilidade para reservas e pedidos pelo WhatsApp em ${city}.`,
      highlightedRealAsset: `Avaliações destacam a fartura dos pratos, o tempero equilibrado e o atendimento caloroso.`,
      elevationConcept: `Apresentação dos pratos principais com fotos reais e canal direto para reservas de mesa no WhatsApp.`,
      actionLabel: 'Ver Cardápio / Reservar Mesa no WhatsApp',
      keyBenefits: [
        'Apresentação dos pratos principais com fotos reais e apetitosas',
        'Canal ágil no WhatsApp para reservas de mesas e encomendas',
        'Destaque da localização e atmosfera acolhedora do restaurante',
        'Facilidade para turistas e moradores consultarem o cardápio no celular',
      ],
      features: [
        {
          title: 'Especialidades da Casa',
          description: 'Pratos principais, entradas e sobremesas com fotos que encantam.',
          icon: 'Utensils',
        },
        {
          title: 'Reservas no WhatsApp',
          description: 'Garantia de mesa para a família ou grupos com atendimento direto.',
          icon: 'Users',
        },
        {
          title: 'Ambiente & Tradição',
          description: 'Apresentação do espaço físico com iluminação acolhedora.',
          icon: 'Sparkles',
        },
      ],
      chatbotSample: {
        customerQuestion: `Olá! Gostaria de consultar o cardápio de hoje e reservar uma mesa para almoço em família.`,
        botReply: `Olá! Seja muito bem-vindo à ${name}! 🍽️ Será uma honra receber vocês. Para quantas pessoas seria a reserva?`,
      },
      suggestedServices: [
        {
          title: 'Página Mobile Gastronômica & Cardápio',
          description: 'Apresentação visual dos pratos e ambiente para quem pesquisa restaurantes no Google.',
          deliverable: 'Página One-Page responsiva conectada ao WhatsApp.',
        },
        {
          title: 'Curadoria Fotográfica dos Pratos & Salão',
          description: 'Fotografia com iluminação quente valorizando texturas e apresentação dos pratos.',
          deliverable: 'Galeria visual tratada em alta definição.',
        },
        {
          title: 'Canal de Reservas de Mesa & Encomendas',
          description: 'Fluxo para o cliente reservar horários de almoço/jantar sem complicações.',
          deliverable: 'Integração pronta para o WhatsApp.',
        },
      ],
      profileGaps: [
        {
          badge: '🍽️ Consultas de Cardápio',
          title: 'Ausência de Cardápio Acessível no Celular',
          description: `Turistas e moradores que pesquisam no Google Maps querem ver fotos reais e opções de pratos antes de escolher onde almoçar ou jantar.`,
          impactOnSales: `Perda de clientes que optam por restaurantes com fotos dos pratos e cardápio de fácil acesso.`,
          intuitiveAutomationSolution: `Cardápio digital mobile com fotos dos pratos e botão direto de WhatsApp.`,
        },
      ],
      tailoredSolutions: [
        {
          pillar: 'Website & Conversão',
          deficiencyFound: 'Falta de cardápio digital atraente e canal de reservas no celular.',
          solutionTitle: 'Presença Mobile Gastronômica & Reservas',
          deliverable: 'Página veloz com pratos em destaque e reservas no WhatsApp.',
          revenueImpact: 'Maior atração de turistas e moradores decidindo refeições pelo celular.',
        },
      ],
    };
  }

  // 13. Varejo, Lojas, Comércio em Geral & Serviços Especializados (Universal Fallback)
  return {
    vibe: 'comercio_local',
    vibeLabel: 'Qualidade & Atendimento de Confiança',
    vibeDescription: 'Comércio sério que construiu sua história com carinho, dedicação e respeito aos clientes locais.',
    typographyStyle: 'sans',
    theme: {
      boardBg: '#10131A',
      cardBg: '#171C26',
      innerCardBg: '#212736',
      primaryAccent: '#3B82F6',
      secondaryAccent: '#10B981',
      textColor: '#F8FAFC',
      textMuted: '#94A3B8',
      borderColor: '#293245',
      accentBadgeBg: 'rgba(59, 130, 246, 0.18)',
      accentBadgeText: '#60A5FA',
      buttonBg: '#3B82F6',
      buttonText: '#FFFFFF',
    },
    headline: `Qualidade, dedicação e o carinho no atendimento da ${name}.`,
    subheadline: `Como valorizar a tradição da sua empresa no celular com canal direto no WhatsApp em ${city}.`,
    highlightedRealAsset: `Avaliações no Google (${rating.toFixed(1)}★) ressaltando o atendimento atencioso, a variedade e a confiança dos clientes.`,
    elevationConcept: `Presença mobile própria, fotos reais com iluminação profissional e canal direto no WhatsApp.`,
    actionLabel: 'Falar no WhatsApp / Ver Catálogo',
    keyBenefits: [
      'Presença profissional no Google Maps sem depender apenas de redes sociais',
      'Atendimento facilitado no WhatsApp para responder clientes na hora',
      'Totalmente otimizado para celulares com carregamento instantâneo',
      'Destaque das fotos reais e da identidade que vocês construíram na cidade',
    ],
    features: [
      {
        title: 'Presença Mobile Própria',
        description: 'Página exclusiva rápida no celular com apresentação completa e localização.',
        icon: 'Globe',
      },
      {
        title: 'Facilidade de Contato no WhatsApp',
        description: 'O cliente pesquisa no Google e inicia a conversa com poucos toques.',
        icon: 'MessageSquare',
      },
      {
        title: 'Curadoria Visual das Fotos Reais',
        description: 'Imagens reais do estabelecimento com contraste e iluminação profissional.',
        icon: 'Sparkles',
      },
    ],
    chatbotSample: {
      customerQuestion: `Olá! Gostaria de saber mais sobre os produtos e serviços da ${name}.`,
      botReply: `Olá! Que alegria atender você na ${name}! 🌟 Como podemos te ajudar hoje? Já separamos nossas principais opções para você!`,
    },
    suggestedServices: [
      {
        title: 'Website One-Page com Conceito Visual Autêntico',
        description: 'Desenvolvimento moderno projetado para converter quem busca no Google em clientes da casa.',
        deliverable: 'Página ultra-rápida no celular conectada ao WhatsApp da equipe.',
      },
      {
        title: 'Tratamento de Imagens Reais & Vitrine',
        description: 'Tratamento de enquadramento, cores e iluminação das fotos do estabelecimento.',
        deliverable: 'Imagens em alta definição prontas para o Google e redes.',
      },
      {
        title: 'Canal Direto de Atendimento no WhatsApp',
        description: 'Fluxo direto no WhatsApp para receber solicitações e pedidos organizados.',
        deliverable: 'Integração pronta para o WhatsApp da equipe.',
      },
    ],
    profileGaps: [
      {
        badge: '📱 Atendimento Descentralizado',
        title: 'Falta de Página Própria de Contato no Google Maps',
        description: `O cliente que pesquisa pela categoria em ${city} no celular não encontra uma apresentação estruturada dos produtos e serviços da ${name}.`,
        impactOnSales: `Clientes priorizam estabelecimentos que facilitam o primeiro contato no WhatsApp.`,
        intuitiveAutomationSolution: `Página mobile One-Page rápida com apresentação dos diferenciais e botão direto de WhatsApp.`,
      },
    ],
    tailoredSolutions: [
      {
        pillar: 'Website & Conversão',
        deficiencyFound: 'Ausência de página mobile própria para apresentar produtos e serviços no celular.',
        solutionTitle: 'Presença Mobile de Alta Conversão & Credibilidade',
        deliverable: 'Página One-Page rápida conectada ao WhatsApp.',
        revenueImpact: 'Maior atração de novos clientes que pesquisam no Google Maps.',
      },
    ],
  };
}
