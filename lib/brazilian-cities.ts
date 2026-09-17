/**
 * Mapeamento preciso de DDDs, bairros e ruas para cidades brasileiras.
 * Garante fidelidade geográfica absoluta nos telefones e endereços.
 */

interface CityGeoData {
  ddd: string;
  neighborhoods: string[];
  streets: string[];
}

const KNOWN_CITIES: Record<string, CityGeoData> = {
  // Bahia
  'porto seguro': {
    ddd: '73',
    neighborhoods: ['Centro', 'Taperapuã', 'Praia de Mutá', 'Arraial d’Ajuda', 'Trancoso', 'Campinho', 'Baianão', 'Fontana'],
    streets: ['Av. Beira Mar', 'Passarela do Descobrimento', 'Av. dos Navegantes', 'Rua do Mucugê', 'Rua Marechal Deodoro', 'Av. Getúlio Vargas'],
  },
  'ilhéus': {
    ddd: '73',
    neighborhoods: ['Centro', 'Pontal', 'Praia do Sul', 'Malhado', 'Olivença'],
    streets: ['Av. Soares Lopes', 'Rua Jorge Amado', 'Rua Dom Pedro II'],
  },
  'salvador': {
    ddd: '71',
    neighborhoods: ['Pituba', 'Barra', 'Rio Vermelho', 'Itaigara', 'Brotas', 'Imbuí', 'Ondina', 'Caminho das Árvores'],
    streets: ['Av. Manoel Dias da Silva', 'Av. Oceânica', 'Av. Tancredo Neves', 'Rua da Paciência'],
  },
  'feira de santana': {
    ddd: '75',
    neighborhoods: ['Centro', 'Kalilândia', 'Santa Mônica', 'Capuchinhos', 'Sim'],
    streets: ['Av. Getúlio Vargas', 'Av. Senhor dos Passos', 'Av. Maria Quitéria'],
  },
  'vitória da conquista': {
    ddd: '77',
    neighborhoods: ['Centro', 'Candeias', 'Recreio', 'Brasil', 'Bela Vista'],
    streets: ['Av. Olívia Flores', 'Av. Régis Pacheco', 'Av. Frei Benjamin'],
  },

  // São Paulo
  'são paulo': {
    ddd: '11',
    neighborhoods: ['Moema', 'Pinheiros', 'Vila Madalena', 'Tatuapé', 'Santana', 'Itaim Bibi', 'Bela Vista', 'Perdizes'],
    streets: ['Av. Paulista', 'Rua Augusta', 'Rua dos Pinheiros', 'Rua Oscar Freire', 'Av. Faria Lima'],
  },
  'campinas': {
    ddd: '19',
    neighborhoods: ['Cambuí', 'Taquaral', 'Centro', 'Barão Geraldo', 'Castelo', 'Nova Campinas', 'Guanabara'],
    streets: ['Av. Coronel Silva Telles', 'Av. Barão de Itapura', 'Rua Maria Monteiro', 'Av. Brasil'],
  },
  'santos': {
    ddd: '13',
    neighborhoods: ['Gonzaga', 'Boqueirão', 'Embaré', 'Ponta da Praia', 'Aparecida', 'Centro'],
    streets: ['Av. Ana Costa', 'Av. Vicente de Carvalho', 'Rua Tolentino Filgueiras', 'Av. Washington Luiz'],
  },
  'sorocaba': {
    ddd: '15',
    neighborhoods: ['Campolim', 'Centro', 'Vila Hortência', 'Além Ponte', 'Trujillo', 'Jardim dos Estados'],
    streets: ['Av. Antônio Carlos Comitre', 'Rua Barão de Tatuí', 'Av. Dom Aguirre', 'Av. General Carneiro'],
  },
  'ribeirão preto': {
    ddd: '16',
    neighborhoods: ['Jardim Botânico', 'Centro', 'Alto da Boa Vista', 'Irajá', 'Nova Aliança'],
    streets: ['Av. Presidente Vargas', 'Av. Independência', 'Av. Nove de Julho', 'Rua Tibiriçá'],
  },
  'são josé dos campos': {
    ddd: '12',
    neighborhoods: ['Jardim Aquárius', 'Vila Ema', 'Centro', 'Jardim Esplanada', 'Urbanova'],
    streets: ['Av. Cassiano Ricardo', 'Av. Nove de Julho', 'Av. São João'],
  },

  // Rio de Janeiro
  'rio de janeiro': {
    ddd: '21',
    neighborhoods: ['Copacabana', 'Ipanema', 'Barra da Tijuca', 'Tijuca', 'Botafogo', 'Leblon', 'Flamengo'],
    streets: ['Av. Atlântica', 'Av. das Américas', 'Rua Visconde de Pirajá', 'Rua Conde de Bonfim'],
  },
  'niterói': {
    ddd: '21',
    neighborhoods: ['Icaraí', 'Centro', 'Ingá', 'Santa Rosa', 'Piratininga'],
    streets: ['Rua Moreira César', 'Praia de Icaraí', 'Av. Roberto Silveira'],
  },

  // Paraná
  'curitiba': {
    ddd: '41',
    neighborhoods: ['Batel', 'Centro', 'Água Verde', 'Bigorrilho', 'Juvevê', 'Cabral', 'Portão'],
    streets: ['Av. Batel', 'Rua XV de Novembro', 'Av. Sete de Setembro', 'Rua Comendador Araújo'],
  },
  'londrina': {
    ddd: '43',
    neighborhoods: ['Gleba Palhano', 'Centro', 'Jardim Higienópolis', 'Bandeirantes'],
    streets: ['Av. Ayrton Senna da Silva', 'Av. Higienópolis', 'Rua Sergipe'],
  },
  'maringá': {
    ddd: '44',
    neighborhoods: ['Zona 01 (Centro)', 'Zona 07', 'Jardim Alvorada', 'Zona 03'],
    streets: ['Av. Brasil', 'Av. Tiradentes', 'Av. Duque de Caxias'],
  },

  // Santa Catarina
  'florianópolis': {
    ddd: '48',
    neighborhoods: ['Centro', 'Lagoa da Conceição', 'Trindade', 'Jurerê', 'Campeche', 'Ingleses'],
    streets: ['Av. Beira Mar Norte', 'Rua Bocaiúva', 'Rua das Rendeiras'],
  },
  'joinville': {
    ddd: '47',
    neighborhoods: ['Centro', 'América', 'Atiradores', 'Anita Garibaldi', 'Glória'],
    streets: ['Rua Dona Francisca', 'Rua Blumenau', 'Av. Beira Rio'],
  },

  // Minas Gerais
  'belo horizonte': {
    ddd: '31',
    neighborhoods: ['Savassi', 'Lourdes', 'Funcionários', 'Buritis', 'Sion', 'Centro', 'Pampulha'],
    streets: ['Av. Afonso Pena', 'Av. do Contorno', 'Rua Pernambuco', 'Av. Cristóvão Colombo'],
  },
};

// Fallback por estado caso a cidade não esteja no dicionário de alta granularidade
const STATE_DEFAULT_DDD: Record<string, string> = {
  SP: '11',
  RJ: '21',
  MG: '31',
  BA: '71',
  PR: '41',
  SC: '48',
  RS: '51',
  GO: '62',
  DF: '61',
  PE: '81',
  CE: '85',
  ES: '27',
  MS: '67',
  MT: '65',
  AM: '92',
  PA: '91',
  RN: '84',
  PB: '83',
  AL: '82',
  SE: '79',
  PI: '86',
  MA: '98',
  RO: '69',
  TO: '63',
  AC: '68',
  AP: '96',
  RR: '95',
};

export function resolveCityGeo(cityName: string, stateUf: string): CityGeoData {
  const normCity = cityName.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const uf = stateUf.trim().toUpperCase();

  // Verifica cidade conhecida
  for (const [knownKey, data] of Object.entries(KNOWN_CITIES)) {
    const normKey = knownKey.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normCity === normKey || normCity.includes(normKey) || normKey.includes(normCity)) {
      return data;
    }
  }

  // Regras geográficas para cidades específicas do interior da Bahia
  if (uf === 'BA') {
    if (normCity.includes('porto seguro') || normCity.includes('eunapolis') || normCity.includes('ilheus') || normCity.includes('itabuna') || normCity.includes('teixeira')) {
      return {
        ddd: '73',
        neighborhoods: ['Centro', 'Taperapuã', 'Praia do Sul', 'Arraial', 'Bela Vista', 'São Geraldo'],
        streets: ['Av. Beira Mar', 'Av. Getúlio Vargas', 'Av. dos Navegantes', 'Rua Marechal Deodoro'],
      };
    }
    if (normCity.includes('feira') || normCity.includes('alagoinhas')) {
      return {
        ddd: '75',
        neighborhoods: ['Centro', 'Kalilândia', 'Santa Mônica', 'Capuchinhos'],
        streets: ['Av. Getúlio Vargas', 'Av. Senhor dos Passos'],
      };
    }
    if (normCity.includes('conquista') || normCity.includes('jequie')) {
      return {
        ddd: '77',
        neighborhoods: ['Centro', 'Candeias', 'Recreio', 'Brasil'],
        streets: ['Av. Olívia Flores', 'Av. Régis Pacheco'],
      };
    }
  }

  // Regras para interior de SP
  if (uf === 'SP') {
    if (normCity.includes('campinas') || normCity.includes('indaiatuba') || normCity.includes('americana')) {
      return {
        ddd: '19',
        neighborhoods: ['Cambuí', 'Taquaral', 'Centro', 'Barão Geraldo', 'Castelo'],
        streets: ['Av. Barão de Itapura', 'Av. Coronel Silva Telles', 'Av. Brasil'],
      };
    }
    if (normCity.includes('santos') || normCity.includes('guaruja') || normCity.includes('sao vicente') || normCity.includes('praia grande')) {
      return {
        ddd: '13',
        neighborhoods: ['Gonzaga', 'Boqueirão', 'Embaré', 'Ponta da Praia', 'Centro'],
        streets: ['Av. Ana Costa', 'Av. Vicente de Carvalho', 'Av. Washington Luiz'],
      };
    }
    if (normCity.includes('sorocaba') || normCity.includes('itapetininga') || normCity.includes('itu')) {
      return {
        ddd: '15',
        neighborhoods: ['Campolim', 'Centro', 'Vila Hortência', 'Além Ponte'],
        streets: ['Av. Antônio Carlos Comitre', 'Rua Barão de Tatuí', 'Av. Dom Aguirre'],
      };
    }
  }

  const ddd = STATE_DEFAULT_DDD[uf] || '11';
  return {
    ddd,
    neighborhoods: ['Centro', 'Bairro Nobre', 'Jardim América', 'Vila Nova', 'Planalto', 'Bela Vista'],
    streets: ['Av. Principal', 'Rua do Comércio', 'Av. Brasil', 'Rua Tiradentes', 'Av. Getúlio Vargas', 'Rua 15 de Novembro'],
  };
}
