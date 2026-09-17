import {
  DeveloperPitch,
  Lead,
  OpportunityAudit,
  ProfileGap,
  TailoredSolution,
  VisualConcept,
} from '@/types/lead';

/**
 * Motor de Inteligência de Negócios:
 * Analisa o perfil do comércio e comentários no Google Maps.
 * Se não houver reclamações explícitas, analisa minuciosamente os GAPS ESTRUTURAIS DO PERFIL
 * (ex: só tem Instagram, não tem site, não tem catálogo, poucas fotos) e desenha
 * automações intuitivas sob medida com website de alta conversão.
 */
export async function generatePitchForLead(
  lead: Partial<Lead>,
  baseUrl: string = 'http://localhost:3000',
  developerName: string = 'Desenvolvedor Parceiro',
  customApiKey?: string
): Promise<DeveloperPitch> {
  const apiKey = customApiKey || process.env.GEMINI_API_KEY;
  const proposalUrl = `${baseUrl}/proposta/${lead.id || 'preview'}`;

  // Se tiver chave do Gemini configurada
  if (apiKey) {
    try {
      const reviewsContext = (lead.reviews || [])
        .map((r) => `- [${r.rating}★] "${r.text}" (Autor: ${r.author})`)
        .join('\n');

      const prompt = `Você é um consultor sênior de negócios digitais e desenvolvedor de software no Brasil.
Realize um ESTUDO DE PERFIL INTELIGENTE do comércio abaixo:
Nome: ${lead.name}
Nicho: ${lead.category}
Cidade: ${lead.city} - ${lead.state}
Nota no Google: ${lead.rating} (${lead.userRatingsTotal} avaliações)
Tem Website: ${lead.website ? 'Sim (' + lead.website + ')' : 'NÃO POSSUI WEBSITE (Depende só de Instagram/indicação)'}
Quantidade de Fotos no Maps: ${lead.photosCount || 0}
Comentários dos Clientes:
${reviewsContext || 'Sem comentários negativos registrados (avaliações positivas).' }

REGRA FUNDAMENTAL:
- Se houver reclamações reais nos comentários (ex: demora no WhatsApp, falta de preços), use-as como ponto de melhoria.
- SE NÃO HOUVER RECLAMAÇÕES (ou quase não tiver comentários), FAÇA UMA LEITURA INTUITIVA DO QUE FALTA NO PERFIL:
  Exemplo: O comércio só tem Instagram e não tem site próprio; o cliente que pesquisa no Google fica sem catálogo e sem saber preços; falta um atendente de WhatsApp com automação que receba o pedido já pronto.
- Desenhe a solução: Website One-Page de alta conversão com automação intuitiva no WhatsApp.
- Apresente o desenvolvedor: profissional com experiência prática, focado na experiência do cliente, geração de receita, preços acessíveis e segurança técnica.
- Forneça a mensagem humanizada para WhatsApp com o link: ${proposalUrl}

Retorne estritamente um JSON:
{
  "summaryReason": "...",
  "audit": {
    "businessDiagnosis": "...",
    "profileGaps": [
      {
        "badge": "...",
        "title": "...",
        "description": "...",
        "impactOnSales": "...",
        "intuitiveAutomationSolution": "..."
      }
    ],
    "customerSentiment": {
      "praisedPoints": ["...", "..."],
      "recurringComplaints": ["...", "..."],
      "sentimentSummary": "...",
      "hasExplicitComplaints": false
    },
    "revenueLeaks": {
      "description": "...",
      "estimatedLoss": "R$ 3.000 a R$ 7.000/mês"
    },
    "tailoredSolutions": [
      {
        "pillar": "Website & Conversão",
        "deficiencyFound": "...",
        "solutionTitle": "...",
        "deliverable": "...",
        "revenueImpact": "..."
      }
    ],
    "suggestedFee": "R$ 950 a R$ 2.200",
    "potentialClientRevenue": "+ R$ 4.000 a R$ 9.000/mês",
    "objectionHandling": [
      {"objection": "...", "suggestedAnswer": "..."}
    ]
  },
  "suggestedServices": [
    {"title": "...", "description": "...", "deliverable": "..."}
  ],
  "visualConcept": {
    "headline": "...",
    "subheadline": "...",
    "primaryColor": "#...",
    "secondaryColor": "#...",
    "badge": "...",
    "keyBenefits": ["...", "..."],
    "features": [{"title": "...", "description": "...", "icon": "..."}],
    "chatbotSample": {"customerQuestion": "...", "botReply": "..."},
    "revenueProjection": "..."
  },
  "whatsappMessage": "..."
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
          return {
            leadName: lead.name || 'Estabelecimento',
            developerName,
            summaryReason: parsed.summaryReason,
            audit: parsed.audit,
            suggestedServices: parsed.suggestedServices,
            visualConcept: parsed.visualConcept,
            whatsappMessage: parsed.whatsappMessage,
          };
        }
      }
    } catch (e) {
      console.warn('Fallback para motor estrutural inteligente:', e);
    }
  }

  // Motor Contextual Nativo com Análise de Gaps Estruturais do Perfil
  return buildProfileGapsPitch(lead, proposalUrl, developerName);
}

function buildProfileGapsPitch(
  lead: Partial<Lead>,
  proposalUrl: string,
  developerName: string
): DeveloperPitch {
  const name = lead.name || 'Estabelecimento Comercial';
  const category = lead.category || 'Comércio Local';
  const city = lead.city || 'sua cidade';
  const rating = lead.rating || 4.8;
  const reviews = lead.reviews || [];

  // 1. Verificar se há reclamações reais nos comentários
  const praisedPoints: string[] = [];
  const recurringComplaints: string[] = [];

  reviews.forEach((r) => {
    if (r.detectedPraise) praisedPoints.push(r.detectedPraise);
    if (r.detectedIssue) recurringComplaints.push(r.detectedIssue);
  });

  const hasExplicitComplaints = recurringComplaints.length > 0;

  if (praisedPoints.length === 0) {
    praisedPoints.push('Excelente atendimento e reputação comprovada');
    praisedPoints.push('Nota alta de avaliações 5 estrelas no Google');
  }

  // 2. Análise Intuitiva de O QUE FALTA NO PERFIL (Mesmo sem reclamações)
  const profileGaps: ProfileGap[] = [];

  // Gap 1: Não tem site (ou só tem Instagram)
  if (!lead.website || lead.website.includes('instagram.com')) {
    profileGaps.push({
      badge: '📱 Dependência Apenas do Instagram',
      title: 'Ausência de Website Próprio / Foco Restrito a Redes Sociais',
      description: `A ${name} depende exclusivamente do Instagram ou indicações boca-a-boca. O cliente que pesquisa pelo serviço no Google Maps não encontra cardápio, tabela de valores ou botão de compra direta, e acaba fechando com quem tem site próprio.`,
      impactOnSales: 'Perda estimada de 35% a 50% dos novos clientes que pesquisam no Google na região de ' + city + '.',
      intuitiveAutomationSolution: 'Desenvolver um Website One-Page interativo com catálogo digital. O cliente acessa, escolhe o produto/serviço com 1 toque e o WhatsApp da equipe já recebe a mensagem formatada com o pedido pronto.',
    });
  }

  // Gap 2: Falta de Automação de Agendamento ou Cardápio com Preços
  profileGaps.push({
    badge: '⚡ Falta de Atendente Automático',
    title: 'Processo de Atendimento 100% Dependente de Resposta Manual',
    description: `Quando um cliente envia mensagem fora do horário comercial, feriados ou quando a equipe está ocupada na loja física, o cliente fica sem resposta e procura o concorrente mais rápido.`,
    impactOnSales: 'Perda de orçamentos noturnos e de fins de semana que poderiam ser agendados automaticamente.',
    intuitiveAutomationSolution: 'Implementar um Chatbot inteligente no WhatsApp com IA que responde dúvidas frequentes instantaneamente, envia catálogo/preços e faz pré-agendamento 24 horas por dia.',
  });

  // Gap 3: Apresentação Visual & Fotos
  if (!lead.photosCount || lead.photosCount <= 4) {
    profileGaps.push({
      badge: '📸 Presença Visual Limitada',
      title: 'Poucas Fotos de Qualidade no Perfil do Google Maps',
      description: `O perfil possui pouquíssimas fotos e não transmite visualmente todo o capricho e a qualidade que a equipe entrega presencialmente.`,
      impactOnSales: 'Menor percepção de valor, dificultando a cobrança de preços mais altos.',
      intuitiveAutomationSolution: 'Otimização das imagens com inteligência artificial e criação de banners modernos que valorizam o ambiente e os produtos.',
    });
  }

  // 3. Soluções Sob Medida
  const tailoredSolutions: TailoredSolution[] = [
    {
      pillar: 'Website & Conversão',
      deficiencyFound: !lead.website
        ? 'O perfil não possui website oficial, dependendo apenas do Instagram.'
        : 'Site desatualizado sem fluxo direto para fechar venda no celular.',
      solutionTitle: 'Website One-Page de Alta Conversão',
      deliverable: 'Página exclusiva ultra-rápida no celular, com catálogo/serviços e botão WhatsApp integrado.',
      revenueImpact: '+35% a 50% de clientes que pesquisam no Google e chamam na hora.',
    },
    {
      pillar: 'Automação de WhatsApp',
      deficiencyFound: 'Demora para enviar cardápio ou responder orçamentos repetitivos manualmente.',
      solutionTitle: 'Automação de Triagem & Envio Imediato',
      deliverable: 'Fluxo automático que entrega cardápio/preços instantaneamente no primeiro "olá".',
      revenueImpact: 'Zero clientes perdidos para a concorrência por demora de retorno.',
    },
    {
      pillar: 'IA & Atendente Virtual',
      deficiencyFound: 'Clientes que chamam à noite ou aos fins de semana ficam sem atendimento.',
      solutionTitle: 'Atendente Virtual com IA 24 Horas',
      deliverable: 'Assistente treinado que tira dúvidas frequentes e faz pré-agendamento automático.',
      revenueImpact: 'Recuperação de 10 a 25 agendamentos/pedidos adicionais por semana.',
    },
    {
      pillar: 'Identidade Visual & SEO',
      deficiencyFound: 'Poucas fotos de apresentação cadastrada no Google Maps.',
      solutionTitle: 'Otimização Visual com IA & Google Meu Negócio',
      deliverable: 'Banners profissionais, fotos tratadas em alta definição e SEO local.',
      revenueImpact: 'Posicionamento premium que eleva a autoridade da marca na cidade.',
    },
  ];

  // 4. Adaptação por nicho
  let primaryColor = '#7c3aed';
  let secondaryColor = '#0ea5e9';
  let suggestedFee = 'R$ 950 a R$ 2.200 (Setup completo) + R$ 90 a R$ 150/mês manutenção';
  let potentialRevenue = '+ R$ 4.000 a R$ 9.500/mês em novos negócios fechados';

  const lowerCat = category.toLowerCase();
  if (lowerCat.includes('pousada') || lowerCat.includes('hotel') || lowerCat.includes('resort') || lowerCat.includes('hosped')) {
    primaryColor = '#0284c7';
    secondaryColor = '#0d9488';
    suggestedFee = 'R$ 1.200 a R$ 2.600 (Portal de Acomodações + Central de Reservas WhatsApp)';
    potentialRevenue = '+ 6 a 15 reservas diretas/mês economizando comissões de plataformas';
  } else if (lowerCat.includes('acougue') || lowerCat.includes('açougue') || lowerCat.includes('carne')) {
    primaryColor = '#b91c1c';
    secondaryColor = '#ea580c';
    suggestedFee = 'R$ 950 a R$ 1.950 (Catálogo de Cortes Nobres + Delivery WhatsApp)';
    potentialRevenue = '+ R$ 4.000 a R$ 9.500/mês em kits churrasco e carnes especiais';
  } else if (lowerCat.includes('padaria') || lowerCat.includes('confeitaria') || lowerCat.includes('panificadora')) {
    primaryColor = '#d97706';
    secondaryColor = '#b45309';
    suggestedFee = 'R$ 900 a R$ 1.850 (Cardápio Digital de Fornadas + Pedidos Express)';
    potentialRevenue = '+ R$ 3.500 a R$ 8.000/mês em combos matinais e encomendas de doces';
  } else if (lowerCat.includes('distribuidora') || lowerCat.includes('bebida') || lowerCat.includes('adega')) {
    primaryColor = '#059669';
    secondaryColor = '#0284c7';
    suggestedFee = 'R$ 900 a R$ 1.950 (Catálogo de Bebidas Geladas + Bot WhatsApp 1-Clique)';
    potentialRevenue = '+ R$ 5.000 a R$ 14.000/mês em entregas rápidas de bebidas e kits de festa';
  } else if (lowerCat.includes('mercado') || lowerCat.includes('conveniencia') || lowerCat.includes('supermercado')) {
    primaryColor = '#16a34a';
    secondaryColor = '#eab308';
    suggestedFee = 'R$ 950 a R$ 2.100 (Catálogo de Ofertas + Envio de Listas no WhatsApp)';
    potentialRevenue = '+ R$ 4.000 a R$ 10.000/mês em compras recorrentes de bairro';
  } else if (lowerCat.includes('pizz') || lowerCat.includes('restaurante') || lowerCat.includes('hamburguer')) {
    primaryColor = '#ea580c';
    secondaryColor = '#f59e0b';
    suggestedFee = 'R$ 900 a R$ 1.950 (Cardápio Digital + Chatbot WhatsApp Pedidos)';
    potentialRevenue = '+ R$ 4.500 a R$ 12.000/mês de pedidos próprios sem pagar comissão';
  } else if (lowerCat.includes('odont') || lowerCat.includes('dent') || lowerCat.includes('clinic')) {
    primaryColor = '#0284c7';
    secondaryColor = '#10b981';
    suggestedFee = 'R$ 1.200 a R$ 2.800 (Portal de Consultas + Agendador Inteligente)';
    potentialRevenue = '+ 8 a 16 novas consultas particulares no mês';
  } else if (lowerCat.includes('oficina') || lowerCat.includes('mecanic') || lowerCat.includes('auto')) {
    primaryColor = '#dc2626';
    secondaryColor = '#475569';
    suggestedFee = 'R$ 950 a R$ 2.100 (Central de Orçamentos + WhatsApp Automotivo)';
    potentialRevenue = '+ 6 a 14 serviços mecânicos de alto valor por mês';
  }

  const revenueLeaks = {
    description: !hasExplicitComplaints
      ? `Embora não haja reclamações abertas, a ausência de um website próprio e a dependência exclusiva de canais manuais como o Instagram faz com que a ${name} perca diariamente clientes em ${city} que pesquisam no Google e preferem comprar com quem tem resposta automática e catálogo com preços.`
      : `Pelos comentários e pela falta de um canal digital rápido, estima-se que clientes desistem da compra por demora na resposta no WhatsApp ou falta de cardápio com preços visíveis.`,
    estimatedLoss: 'R$ 3.500 a R$ 8.500/mês em vendas que escorrem para concorrentes',
  };

  const audit: OpportunityAudit = {
    businessDiagnosis: `A ${name} possui nota de ${rating}★ no Google Maps e excelente reputação com seus clientes, porém apresenta um gap estrutural claro: depende apenas de canais manuais ou redes sociais (Instagram), sem um website próprio de alta conversão e sem automação de atendimento no WhatsApp.`,
    profileGaps,
    customerSentiment: {
      praisedPoints,
      recurringComplaints: hasExplicitComplaints
        ? recurringComplaints
        : ['Nenhuma reclamação grave (reputação excelente! O gap é 100% estrutural: falta de site e automação de resposta)'],
      sentimentSummary: hasExplicitComplaints
        ? 'Clientes elogiam o serviço, mas reclamam de lentidão no WhatsApp ou falta de preços claros.'
        : 'Clientes amam o comércio. A oportunidade é puramente estrutural: transformar a reputação do Instagram em um canal de vendas automático no Google.',
      hasExplicitComplaints,
    },
    revenueLeaks,
    tailoredSolutions,
    suggestedFee,
    potentialClientRevenue: potentialRevenue,
    objectionHandling: [
      {
        objection: 'Nós já temos Instagram e WhatsApp, realmente precisamos de site?',
        suggestedAnswer:
          'O Instagram de vocês é ótimo para quem já segue a marca, mas quem pesquisa no Google Maps normalmente está com pressa para comprar. Ter um site próprio rápido garante que esse cliente veja o cardápio/catálogo de imediato e já clique no WhatsApp com o pedido montado, sem você perder a venda para o concorrente!',
      },
      {
        objection: 'Essa automação não fica parecendo um robô frio?',
        suggestedAnswer:
          'De forma alguma! A automação é totalmente humanizada e acolhedora. Ela apenas agiliza o primeiro contato, enviando os valores e cardápio na hora, e já encaminha o cliente pronto e qualificado para você ou sua equipe fechar com todo o carinho.',
      },
      {
        objection: 'Quanto custa para implementar?',
        suggestedAnswer:
          'Como trabalho direto e independente com comércios de ' +
          city +
          ', meus valores são justos e acessíveis, sem taxas abusivas de agências. Com poucos clientes extras que a estrutura trouxer, o serviço já se paga por completo.',
      },
    ],
  };

  const visualConcept: VisualConcept = {
    headline: `Aumente as vendas da ${name} com uma estrutura digital moderna e atendimento automático`,
    subheadline: `Conecte mais clientes em ${city} direto ao seu WhatsApp com catálogo online interativo e agendamento 24h.`,
    primaryColor,
    secondaryColor,
    badge: 'Estudo de Oportunidade & Automação Inteligente',
    keyBenefits: [
      'Site One-Page próprio sem depender apenas de redes sociais',
      'Atendimento imediato no WhatsApp com envio automático de catálogo/preços',
      'Agendamentos e pedidos salvos mesmo fora do horário comercial',
      'Totalmente otimizado para celulares com carregamento instantâneo',
    ],
    features: [
      {
        title: 'Website de Alta Conversão',
        description: 'Página exclusiva rápida no smartphone, com catálogo, história e botão direto para o WhatsApp.',
        icon: 'Globe',
      },
      {
        title: 'Automação de Atendimento no WhatsApp',
        description: 'Envio automático de cardápio, tabela de preços e respostas instantâneas a dúvidas frequentes.',
        icon: 'MessageSquare',
      },
      {
        title: 'Identidade Visual & Tratamento de Fotos',
        description: 'Fotos melhoradas para transmitir o mesmo nível de excelência que você entrega presencialmente.',
        icon: 'Sparkles',
      },
    ],
    chatbotSample: {
      customerQuestion: `Olá! Gostaria de saber os valores e opções disponíveis hoje?`,
      botReply: `Olá! É um prazer atender você na ${name}! 🌟 Temos nossas opções completas disponíveis aqui. Posso já adiantar o seu pedido ou agendamento agora?`,
    },
    revenueProjection: 'Projeção de aumento de 30% a 50% em novos contatos e pedidos mensais.',
  };

  const praiseHook = praisedPoints[0] || 'a reputação e o carinho que vocês construíram';

  const whatsappMessage = `Olá pessoal da *${name}*, tudo bem com vocês? Espero que a semana esteja ótima por aí! 😊

Meu nome é ${developerName}, sou desenvolvedor aqui na região e estava pesquisando os comércios de ${city} no Google. Fiquei muito bem impressionado com os elogios e as avaliações de vocês! 👏

Reparei que vocês têm um trabalho super elogiado, mas quem procura pelo celular no Google acaba não encontrando um site com fotos profissionais, catálogo fácil e atendimento direto no WhatsApp.

Pensando nisso, preparei com muito carinho uma demonstração visual — bem moderna e sem compromisso algum — de como ficaria um site modelo da *${name}* com fotos elaboradas, catálogo interativo e um atendente no WhatsApp que agiliza as respostas pra equipe de vocês:

👉 ${proposalUrl}

Dá uma olhadinha quando tiver 1 minuto livre! Se curtirem o conceito, a gente bate um papo descontraído pra eu mostrar como funciona. Um abraço e ótimas vendas por aí!`;

  return {
    leadName: name,
    developerName,
    summaryReason: `Comércio de excelente reputação. Não há reclamações graves, mas há um gap estrutural claro: depende só de redes sociais e não tem website próprio com automação de WhatsApp. Solução: Website One-Page + Automação de Catálogo.`,
    audit,
    suggestedServices: [
      {
        title: 'Website One-Page com Catálogo Interativo',
        description: 'Desenvolvimento moderno projetado para converter quem busca no Google em clientes pagantes.',
        deliverable: 'Site completo no ar com domínio próprio e SSL.',
      },
      {
        title: 'Automação de Atendimento & Catálogo WhatsApp',
        description: 'Configuração de fluxo que envia cardápio/preços e coleta pedidos de forma automática e intuitiva.',
        deliverable: 'Automação configurada e testada no WhatsApp Business.',
      },
      {
        title: 'Tratamento Visual das Fotos & SEO Local',
        description: 'Melhoria das fotos do perfil e ranqueamento no topo do Google em ' + city + '.',
        deliverable: 'Fotos em alta definição tratadas e perfil otimizado.',
      },
    ],
    visualConcept,
    whatsappMessage,
  };
}
