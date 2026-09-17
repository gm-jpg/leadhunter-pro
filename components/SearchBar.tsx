import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Loader2,
  Sparkles,
  Navigation,
  SlidersHorizontal,
  CheckCircle2,
  Flame,
  Phone,
  Star,
  ShieldCheck,
} from 'lucide-react';

export interface SearchFilters {
  query: string;
  city: string;
  state: string;
  neighborhood: string;
  onlyWithoutWebsite: boolean;
  onlyMobile: boolean;
  hideContacted?: boolean;
  minRating: number;
}

interface Props {
  onSearch: (filters: SearchFilters) => void;
  isLoading: boolean;
}

const BRAZILIAN_STATES = [
  'SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'PE', 'CE',
  'ES', 'MT', 'MS', 'DF', 'AM', 'PA', 'RN', 'PB', 'AL', 'SE',
  'PI', 'MA', 'RO', 'TO', 'AC', 'AP', 'RR'
];

export function SearchBar({ onSearch, isLoading }: Props) {
  const [query, setQuery] = useState('Pizzaria');
  const [city, setCity] = useState('Campinas');
  const [state, setState] = useState('SP');
  const [neighborhood, setNeighborhood] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filtros Avançados
  const [onlyWithoutWebsite, setOnlyWithoutWebsite] = useState(true);
  const [onlyMobile, setOnlyMobile] = useState(true);
  const [hideContacted, setHideContacted] = useState(false);
  const [minRating, setMinRating] = useState(4.0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || !city.trim()) return;
    onSearch({
      query: query.trim(),
      city: city.trim(),
      state,
      neighborhood: neighborhood.trim(),
      onlyWithoutWebsite,
      onlyMobile,
      hideContacted,
      minRating,
    });
  };

  const highTicketCategories = [
    { label: '🌴 Pousadas & Suítes', query: 'Pousada' },
    { label: '🏨 Hotéis & Resorts', query: 'Hotel' },
    { label: '🥩 Açougues & Carnes Nobres', query: 'Açougue' },
    { label: '🥖 Padarias & Confeitarias', query: 'Padaria' },
    { label: '🍺 Distribuidoras de Bebidas', query: 'Distribuidora de Bebidas' },
    { label: '🛒 Mercados & Hortifrúti', query: 'Mercado' },
    { label: '🏪 Lojas de Conveniência', query: 'Loja de Conveniência' },
    { label: '🍕 Pizzarias & Delivery', query: 'Pizzaria' },
    { label: '🍔 Hamburguerias', query: 'Hamburgueria' },
    { label: '🔧 Oficinas & Auto Centers', query: 'Oficina Mecânica' },
    { label: '🦷 Clínicas Odontológicas', query: 'Dentista' },
    { label: '🐾 Pet Shops & Veterinárias', query: 'Pet Shop' },
    { label: '✂️ Salões & Barbearias', query: 'Salão de Beleza' },
    { label: '🏢 Imobiliárias Locais', query: 'Imobiliária' },
  ];

  const popularCities = [
    { name: 'Porto Seguro', uf: 'BA' },
    { name: 'Campinas', uf: 'SP' },
    { name: 'Sorocaba', uf: 'SP' },
    { name: 'Santos', uf: 'SP' },
    { name: 'Ribeirão Preto', uf: 'SP' },
    { name: 'Curitiba', uf: 'PR' },
    { name: 'Niterói', uf: 'RJ' },
    { name: 'Belo Horizonte', uf: 'MG' },
    { name: 'Salvador', uf: 'BA' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-xl shadow-slate-200/60 border border-white/80 p-6 sm:p-8 mb-8 transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 text-violet-800 text-xs font-black mb-2 border border-violet-200">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span>Garimpo de Clientes Comerciais no Google Maps</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Pesquisa de Comércios & Triagem de Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Selecione o nicho comercial, a cidade e os filtros para encontrar clientes ideais para oferecer websites, chatbots e identidade visual.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 transition-all border ${
            showAdvanced
              ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filtros Avançados</span>
          {(onlyWithoutWebsite || onlyMobile) && (
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          )}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
          {/* Tipo de Estabelecimento / Nicho */}
          <div className="md:col-span-4 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Building2 className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: Pet Shop, Dentista, Pizzaria..."
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Cidade */}
          <div className="md:col-span-3 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade (ex: Campinas)"
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-inner"
            />
          </div>

          {/* Bairro / Região (Opcional) */}
          <div className="md:col-span-3 relative">
            <input
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              placeholder="Bairro (ex: Centro, Cambuí)"
              className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all placeholder:text-slate-400 shadow-inner"
            />
          </div>

          {/* Estado UF */}
          <div className="md:col-span-2 flex gap-2">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-1/2 px-2 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-extrabold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all shadow-inner cursor-pointer"
            >
              {BRAZILIAN_STATES.map((uf) => (
                <option key={uf} value={uf}>
                  {uf}
                </option>
              ))}
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 min-h-[50px] bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-700 hover:to-indigo-800 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-1.5 shadow-lg shadow-violet-200 transition-all disabled:opacity-70 active:scale-95"
              title="Iniciar busca e triagem"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Gaveta de Filtros Avançados de Triagem */}
        {showAdvanced && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 animate-in fade-in slide-in-from-top-2 duration-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyWithoutWebsite}
                onChange={(e) => setOnlyWithoutWebsite(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 accent-violet-600"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-500" />
                Apenas comércios SEM website (Foco quente)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyMobile}
                onChange={(e) => setOnlyMobile(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Apenas celular/WhatsApp (+55)
              </span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideContacted}
                onChange={(e) => setHideContacted(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
              />
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Ocultar já contatados (Anti-duplicidade)
              </span>
            </label>

            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-xs font-bold text-slate-700">Nota mínima Google:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="px-2 py-1 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:ring-2 focus:ring-violet-500"
              >
                <option value={0}>Qualquer nota</option>
                <option value={4.0}>4.0 ou mais ★</option>
                <option value={4.5}>4.5 ou mais ★ (Estelar)</option>
              </select>
            </div>
          </div>
        )}
      </form>

      {/* Categorias Pré-configuradas de Alto Retorno */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" /> Nichos recomendados:
          </span>
          {highTicketCategories.map((item) => (
            <button
              key={item.query}
              type="button"
              onClick={() => setQuery(item.query)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors ${
                query === item.query
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-violet-50 hover:text-violet-700 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-extrabold text-slate-500 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-indigo-500" /> Cidades rápidas:
          </span>
          {popularCities.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => {
                setCity(c.name);
                setState(c.uf);
              }}
              className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 font-medium transition-colors"
            >
              {c.name} ({c.uf})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
