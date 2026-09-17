export interface NicheShowcaseItem {
  id: string;
  title: string;
  categoryTag: string;
  description: string;
  priceTag?: string;
  imageUrl: string;
  badge?: string;
}

export interface NicheShowcaseData {
  themeColor: string;
  accentColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroTag: string;
  heroImage: string;
  catalogTitle: string;
  catalogSubtitle: string;
  items: NicheShowcaseItem[];
  benefits: string[];
  ctaLabel: string;
}

export function getNicheShowcase(categoryName: string, businessName: string, city: string): NicheShowcaseData {
  const cat = (categoryName || '').toLowerCase();

  // 1. POUSADAS & HOTÉIS
  if (cat.includes('pousada') || cat.includes('hotel') || cat.includes('resort') || cat.includes('hosped')) {
    return {
      themeColor: '#0284c7',
      accentColor: '#0d9488',
      heroHeadline: 'Viva dias inesquecíveis com conforto e tranquilidade em ' + city,
      heroSubheadline: 'Café da manhã colonial, suítes aconchegantes e atendimento acolhedor. Reserve direto pelo WhatsApp sem intermediários e com a melhor tarifa garantida.',
      heroTag: '🌴 Hospedagem & Conforto',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Nossas Acomodações & Experiências',
      catalogSubtitle: 'Suítes preparadas com todo carinho para casais e famílias',
      ctaLabel: 'Consultar Tarifas & Reservar',
      benefits: [
        'Reserva direta sem taxas de comissão de intermediários',
        'Fotos reais e confirmação instantânea no WhatsApp',
        'Café da manhã artesanal e piscina exclusiva',
        'Localização privilegiada com fácil acesso às praias e centro',
      ],
      items: [
        {
          id: 'p1',
          title: 'Suíte Master com Vista Panorâmica',
          categoryTag: 'Casal VIP',
          description: 'Cama Queen-size, ar split silencioso, varanda privativa com rede e banheira de hidromassagem.',
          priceTag: 'A partir de R$ 280/diária',
          badge: 'Mais Desejada',
          imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'p2',
          title: 'Chalé Família Conforto',
          categoryTag: 'Até 4 Pessoas',
          description: 'Dois ambientes independentes, cozinha compacta de apoio, ar-condicionado e vista para o jardim.',
          priceTag: 'A partir de R$ 390/diária',
          badge: 'Espaço Amplo',
          imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'p3',
          title: 'Café da Manhã & Deck da Piscina',
          categoryTag: 'Experiência',
          description: 'Bolos caseiros assados no dia, frutas da estação, pães artesanais e tapiocas preparadas na hora.',
          priceTag: 'Incluso na diária',
          badge: '100% Caseiro',
          imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'p4',
          title: 'Área de Lazer & Piscina ao Pôr do Sol',
          categoryTag: 'Lazer & Relax',
          description: 'Ambiente integrado à natureza, espreguiçadeiras confortáveis e bar molhado para relaxar.',
          priceTag: 'Exclusivo Hóspedes',
          badge: 'Natureza & Paz',
          imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 2. AÇOUGUES & CASAS DE CARNES
  if (cat.includes('acougue') || cat.includes('açougue') || cat.includes('carne') || cat.includes('boutique de carne')) {
    return {
      themeColor: '#b91c1c',
      accentColor: '#ea580c',
      heroHeadline: 'O melhor do churrasco e cortes nobres selecionados para você',
      heroSubheadline: 'Carnes com procedência garantida, marmoreio especial e kits churrasco prontos para o fim de semana. Peça pelo WhatsApp e receba em casa.',
      heroTag: '🥩 Cortes Especiais & Churrasco',
      heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Cortes Nobres & Kits Churrasco',
      catalogSubtitle: 'Embalados a vácuo, temperados ou in natura para os paladares mais exigentes',
      ctaLabel: 'Pedir Kit Churrasco no WhatsApp',
      benefits: [
        'Cortes nobres com padrão de maciez e padrão gourmet',
        'Kits churrasco sob medida para 5, 10 ou 20 pessoas',
        'Entrega rápida refrigerada na região de ' + city,
        'Embalagem a vácuo para máxima durabilidade e sabor',
      ],
      items: [
        {
          id: 'c1',
          title: 'Kit Churrasco Fim de Semana (10 Pessoas)',
          categoryTag: 'Campeão de Vendas',
          description: 'Picanha Angus, Fraldinha Premium, Linguiça Artesanal com Queijo Coalho, Pão de Alho Especial e Farofa Crocante.',
          priceTag: 'R$ 189,90',
          badge: 'Mais Pedido',
          imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'c2',
          title: 'Picanha Prime com Capa Alta de Gordura',
          categoryTag: 'Corte Especial',
          description: 'Marmoreio excelente, maciez inigualável e peso controlado. Cortada no ponto exato para grelha.',
          priceTag: 'R$ 89,90 / kg',
          badge: 'Angus Certificado',
          imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'c3',
          title: 'Prime Rib & Tomahawk na Brasa',
          categoryTag: 'Para Grelha',
          description: 'Corte com osso longo que concentra sabor e suculência extrema. O astro de qualquer churrasco.',
          priceTag: 'R$ 79,90 / kg',
          badge: 'Seleção do Mestre',
          imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'c4',
          title: 'Linguiças Artesanais Recheadas',
          categoryTag: 'Artesanal',
          description: 'Receita da casa recheada com queijo provolone e ervas finas. Sem conservantes pesados.',
          priceTag: 'R$ 34,90 / kg',
          badge: 'Receita Exclusiva',
          imageUrl: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 3. PADARIAS & CONFEITARIAS
  if (cat.includes('padaria') || cat.includes('confeitaria') || cat.includes('panificadora') || cat.includes('pao') || cat.includes('pão')) {
    return {
      themeColor: '#d97706',
      accentColor: '#b45309',
      heroHeadline: 'O cheirinho de pão quentinho e doces finos que encantam ' + city,
      heroSubheadline: 'Fermentação natural, fornadas frescas durante todo o dia, bolos confeitados para ocasiões especiais e combos completos de café da manhã.',
      heroTag: '🥖 Panificação Artesanal & Doces',
      heroImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Fornadas Quentes & Delícias do Dia',
      catalogSubtitle: 'Tradição, ingredientes puros e sabor inconfundível',
      ctaLabel: 'Fazer Pedido ou Encomenda',
      benefits: [
        'Fornadas de pão francês saindo a cada 40 minutos',
        'Pães de fermentação natural (Sourdough) e grãos nobres',
        'Encomendas de bolos festivos e tortas artesanais',
        'Entregas de combos de café da manhã em domicílio',
      ],
      items: [
        {
          id: 'b1',
          title: 'Pão de Fermentação Natural (Sourdough)',
          categoryTag: 'Artesanal',
          description: 'Casca crocante e dourada, miolo aerado e leve com sabor suave e digestão perfeita.',
          priceTag: 'R$ 22,00',
          badge: 'Fornada Especial',
          imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'b2',
          title: 'Combo Café da Manhã Completo',
          categoryTag: 'Combos Especiais',
          description: 'Pães quentinhos, croissants folhados amanteigados, queijo minas, fatias de presunto e suco natural.',
          priceTag: 'R$ 38,00',
          badge: 'Mais Pedido',
          imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'b3',
          title: 'Bolos Confeitados & Tortas Finas',
          categoryTag: 'Encomendas',
          description: 'Bolo de brigadeiro gourmet com morangos frescos, massa fofinha e acabamento impecável para festas.',
          priceTag: 'Sob encomenda',
          badge: 'Festas & Eventos',
          imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'b4',
          title: 'Croissants Folhados Amanteigados',
          categoryTag: 'Folhados',
          description: 'Massa folhada autêntica com manteiga pura, leve, crocante e dourada. Opção tradicional ou chocolate.',
          priceTag: 'R$ 9,50 un',
          badge: 'Receita Francesa',
          imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 4. DISTRIBUIDORAS DE BEBIDAS & ADEGAS
  if (cat.includes('distribuidora') || cat.includes('bebida') || cat.includes('adega') || cat.includes('deposito') || cat.includes('depósito')) {
    return {
      themeColor: '#059669',
      accentColor: '#0284c7',
      heroHeadline: 'Bebidas trincando de geladas na sua porta em tempo recorde',
      heroSubheadline: 'Cervejas especiais, chopes, destilados, vinhos, gelo e carvão. Peça pelo catálogo rápido no WhatsApp e não deixe o churrasco parar.',
      heroTag: '🍺 Bebidas Geladas & Delivery Rápido',
      heroImage: 'https://images.unsplash.com/photo-1608270172506-641571d9d40b?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Mais Pedidos para o seu Evento',
      catalogSubtitle: 'Preço justo de distribuidora e entrega expressa em todo o município',
      ctaLabel: 'Pedir Bebidas Geladas Agora',
      benefits: [
        'Cervejas garantidamente estupidamente geladas',
        'Pacotes de gelo e carvão entregues juntos',
        'Descontos especiais para compras em quantidade/engradado',
        'Atendimento rápido e automatizado sem fila no WhatsApp',
      ],
      items: [
        {
          id: 'd1',
          title: 'Pack Cervejas Especiais Trincando (12 un)',
          categoryTag: 'Cervejas',
          description: 'Cervejas puro malte selecionadas, super geladas e prontas para consumo imediato no seu churrasco.',
          priceTag: 'R$ 49,90',
          badge: 'Super Gelada',
          imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'd2',
          title: 'Kit Festas: Gelo 10kg + Carvão 5kg',
          categoryTag: 'Churrasco & Eventos',
          description: 'Saco de gelo filtrado em cubo de 10kg com alta durabilidade + carvão vegetal selecionado para brasa forte.',
          priceTag: 'R$ 32,00',
          badge: 'Indispensável',
          imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'd3',
          title: 'Adega & Vinhos Nacionais e Importados',
          categoryTag: 'Vinhos & Espumantes',
          description: 'Rótulos consagrados de Cabernet, Malbec e espumantes para brindar em momentos especiais.',
          priceTag: 'A partir de R$ 39,00',
          badge: 'Seleção da Adega',
          imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'd4',
          title: 'Destilados Nobres & Combos de Gin / Whisky',
          categoryTag: 'Destilados',
          description: 'Garrafas lacradas originais com tônicas ou energéticos para curtir o fim de semana com amigos.',
          priceTag: 'A partir de R$ 79,00',
          badge: '100% Original',
          imageUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 5. MERCADOS & LOJAS DE CONVENIÊNCIA
  if (cat.includes('mercado') || cat.includes('conveniencia') || cat.includes('conveniência') || cat.includes('supermercado') || cat.includes('mercearia')) {
    return {
      themeColor: '#16a34a',
      accentColor: '#eab308',
      heroHeadline: 'Tudo o que você precisa no dia a dia com praticidade e entrega rápida',
      heroSubheadline: 'Hortifrúti fresquinho, laticínios, itens essenciais para a casa e lanches rápidos. Faça sua lista no WhatsApp e receba sem sair de casa.',
      heroTag: '🛒 Mercado Prático & Conveniência',
      heroImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Seções do Mercado & Praticidade',
      catalogSubtitle: 'Produtos frescos selecionados a dedo pela nossa equipe',
      ctaLabel: 'Fazer Pedido de Compras no WhatsApp',
      benefits: [
        'Frutas, verduras e legumes selecionados um a um',
        'Lista de compras enviada pelo WhatsApp sem burocracia',
        'Entrega expressa no mesmo dia no seu bairro',
        'Pagamento facilitado no Pix ou maquininha na entrega',
      ],
      items: [
        {
          id: 'm1',
          title: 'Cesta Hortifrúti Fresca da Semana',
          categoryTag: 'Orgânicos & Frescos',
          description: 'Maçãs, bananas, tomates, alface americana fresca, cenouras e batatas selecionadas de produtores locais.',
          priceTag: 'R$ 49,90',
          badge: 'Fresquinho do Dia',
          imageUrl: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'm2',
          title: 'Queijos, Frios & Laticínios Especiais',
          categoryTag: 'Frios Fatiados',
          description: 'Queijo prato, mussarela fatiada fina na hora, requeijão cremoso e iogurtes artesanais.',
          priceTag: 'Diversas opções',
          badge: 'Fatiado na Hora',
          imageUrl: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'm3',
          title: 'Snacks, Chocolates & Conveniência 24h',
          categoryTag: 'Conveniência',
          description: 'Chocolates importados e nacionais, salgadinhos crocantes, sorvetes e guloseimas para a família.',
          priceTag: 'A partir de R$ 5,00',
          badge: 'Para Beliscar',
          imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'm4',
          title: 'Despensa & Matinais Essenciais',
          categoryTag: 'Básicos do Dia',
          description: 'Café torrado especial, açúcares, cereais matinais, azeites de oliva extra virgem e massas premium.',
          priceTag: 'Preço Justo',
          badge: 'Cesta Básica',
          imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 6. PIZZARIAS, RESTAURANTES & HAMBURGUERIAS
  if (cat.includes('pizz') || cat.includes('burger') || cat.includes('hamburg') || cat.includes('restaurante') || cat.includes('lanchonete')) {
    return {
      themeColor: '#ea580c',
      accentColor: '#f59e0b',
      heroHeadline: 'Sabor inigualável e receitas artesanais feitas para encantar você',
      heroSubheadline: 'Ingredientes selecionados, massa fresca de longa fermentação e recheios generosos. Peça pelo nosso canal oficial no WhatsApp e receba quentinho.',
      heroTag: '🍕 Gastronomia & Delivery Oficial',
      heroImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=85',
      catalogTitle: 'Destaques do Cardápio Mais Pedidos',
      catalogSubtitle: 'Preparados com ingredientes frescos e amor pela boa comida',
      ctaLabel: 'Pedir no WhatsApp sem Taxa Extra',
      benefits: [
        'Pedido direto sem taxas ou comissões de aplicativos de entrega',
        'Entrega rápida em embalagem térmica protetora',
        'Promoções e cupons exclusivos para pedidos no site',
        'Atendimento ágil com confirmação imediata no WhatsApp',
      ],
      items: [
        {
          id: 'f1',
          title: 'Pizza Especial da Casa com Borda Vulcão',
          categoryTag: 'Artesanal',
          description: 'Massa artesanal italiana, molho de tomate rústico pelati, mussarela especial, manjericão fresco e queijo cremoso na borda.',
          priceTag: 'R$ 68,00',
          badge: 'Mais Pedida',
          imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'f2',
          title: 'Burger Artesanal Prime com Cheddar & Bacon',
          categoryTag: 'Smash & Gourmet',
          description: 'Blend nobre 180g grelhado no fogo, fatias de bacon artesanal crocante, queijo cheddar inglês e maionese defumada no pão brioche.',
          priceTag: 'R$ 38,90',
          badge: 'Sabor Explosivo',
          imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'f3',
          title: 'Porção Especial de Batatas Rústicas com Alecrim',
          categoryTag: 'Acompanhamentos',
          description: 'Batatas com corte especial, douradas e crocantes, temperadas com sal marinho, alecrim fresco e molho da casa.',
          priceTag: 'R$ 24,00',
          badge: 'Crocância Perfeita',
          imageUrl: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
        },
        {
          id: 'f4',
          title: 'Sobremesa Especial de Brigadeiro Belga',
          categoryTag: 'Doces & Sobremesas',
          description: 'Textura cremosa inesquecível, chocolate nobre meio amargo e confeitos belgas para fechar sua refeição.',
          priceTag: 'R$ 18,00',
          badge: 'Doce Tentação',
          imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
        },
      ],
    };
  }

  // 7. DEFAULT GENERICO
  return {
    themeColor: '#7c3aed',
    accentColor: '#0ea5e9',
    heroHeadline: 'Excelência, pontualidade e o melhor atendimento para você em ' + city,
    heroSubheadline: 'Conheça nossos serviços e produtos com transparência total. Atendimento ágil e personalizado direto pelo canal oficial no WhatsApp.',
    heroTag: '⭐ Referência & Qualidade Comprovada',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    catalogTitle: 'Soluções & Serviços em Destaque',
    catalogSubtitle: 'Trabalho de alto padrão realizado com seriedade e dedicação',
    ctaLabel: 'Chamar no WhatsApp e Agendar',
    benefits: [
      'Atendimento humanizado e rápido sem filas de espera',
      'Orçamentos claros e sem taxas surpresa',
      'Profissionais experientes prontos para te atender',
      'Facilidade total de pagamento e agendamento',
    ],
    items: [
      {
        id: 'g1',
        title: 'Atendimento & Diagnóstico Personalizado',
        categoryTag: 'Serviço Premium',
        description: 'Análise detalhada das suas necessidades com proposta clara, ágil e focada na melhor solução.',
        priceTag: 'Consulte Condições',
        badge: 'Mais Procurado',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g2',
        title: 'Serviços Especializados com Garantia',
        categoryTag: 'Comprovação Técnica',
        description: 'Execução de alto padrão respeitando prazos, especificações técnicas e satisfação máxima.',
        priceTag: 'Sob Medida',
        badge: 'Garantia Total',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g3',
        title: 'Pacotes Especiais para Clientes Recorrentes',
        categoryTag: 'Condições Exclusivas',
        description: 'Benefícios e descontos diferenciados para você contar sempre com o nosso apoio e parceria.',
        priceTag: 'Planos Vantajosos',
        badge: 'Vantagem Real',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'g4',
        title: 'Suporte & Acompanhamento Pós-Atendimento',
        categoryTag: 'Compromisso',
        description: 'Nossa equipe permanece à disposição para tirar qualquer dúvida e garantir que tudo funcione com perfeição.',
        priceTag: 'Incluso no Serviço',
        badge: 'Pós-Venda Ativo',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
      },
    ],
  };
}
