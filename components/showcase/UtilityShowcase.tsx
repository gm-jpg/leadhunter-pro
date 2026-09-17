'use client';

import React, { useState } from 'react';
import { MessageSquare, Clock, MapPin, Truck, Zap, ShoppingBag, ShieldCheck, Check, ArrowRight, Beer, Sparkles } from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead;
  developerDirectLink: string;
}

export function UtilityShowcase({ lead, developerDirectLink }: Props) {
  const city = lead.city || 'Sua Região';
  const [selectedCategory, setSelectedCategory] = useState('Bebidas Geladas');
  const [customNotes, setCustomNotes] = useState('');

  const isDistributor = lead.category.toLowerCase().includes('distribuidora') || lead.category.toLowerCase().includes('bebida');

  const categories = isDistributor
    ? [
        { name: 'Bebidas Geladas', desc: 'Cervejas, refrigerantes, energéticos e sucos na temperatura certa' },
        { name: 'Kits Churrasco & Festas', desc: 'Carvão, gelo em cubo/escama, descartáveis e destilados' },
        { name: 'Fardos & Atacado', desc: 'Caixas fechadas e embalagens econômicas para eventos' },
        { name: 'Barril de Chopp', desc: 'Opções sob encomenda com chopeira para confraternizações' },
      ]
    : [
        { name: 'Alimentos & Mercearia', desc: 'Itens essenciais para o seu dia a dia com reposição diária' },
        { name: 'Hortifrúti & Frescos', desc: 'Frutas, legumes e verduras selecionados' },
        { name: 'Bebidas & Congelados', desc: 'Refrigeração contínua e praticidade para sua casa' },
        { name: 'Higiene & Limpeza', desc: 'Variedade de marcas e produtos de utilidade imediata' },
      ];

  const handleSendCustomList = () => {
    const text = `Olá! Gostaria de fazer um pedido na ${lead.name} (${city}):\n- Categoria: ${selectedCategory}${customNotes ? `\n- Itens de interesse: ${customNotes}` : ''}\nFavor confirmar disponibilidade e taxa de entrega!`;
    const url = lead.whatsapp
      ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(text)}`
      : developerDirectLink;
    window.open(url, '_blank');
  };

  const whatsappDirect = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
        `Olá! Gostaria de consultar o catálogo e fazer um pedido para entrega rápida na ${lead.name}.`
      )}`
    : developerDirectLink;

  return (
    <div className="bg-[#0A0F1D] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* 1. Header Utilitário de Alta Eficiência */}
      <header className="px-5 md:px-10 py-4 border-b border-slate-800/80 bg-[#0E1626]/95 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            {isDistributor ? <Beer className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-base md:text-lg font-bold tracking-tight text-white block leading-tight">
              {lead.name}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                {lead.category} • Delivery & Balcão
              </span>
            </div>
          </div>
        </div>

        <a
          href={whatsappDirect}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#0A0F1D] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.25)]"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">Pedir no WhatsApp</span>
          <span className="sm:hidden">Pedir</span>
        </a>
      </header>

      {/* 2. Banner de Status e Entrega Rápida */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 px-5 md:px-10 py-3 text-xs flex flex-wrap items-center justify-between gap-4 text-slate-300">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Truck className="w-4 h-4" /> Entrega em {city} e região
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-4 h-4 text-amber-400" /> Pediu, separou, entregou
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-[11px]">
          <span>Pagamento no Pix ou Cartão na entrega</span>
        </div>
      </section>

      {/* 3. Hero Visual Utilitário e Direto */}
      <section className="relative px-5 md:px-10 py-12 md:py-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Sem intermediários • Atendimento direto via WhatsApp</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
              {isDistributor ? (
                <>
                  Bebidas trincando de geladas <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    direto no seu endereço.
                  </span>
                </>
              ) : (
                <>
                  Tudo o que sua casa precisa <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    com rapidez e conveniência.
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              {isDistributor
                ? `Na ${lead.name}, você pede cervejas, fardos fechados, carvão e gelo sem complicação. Atendimento ágil, preços justos de balcão e entrega no prazo.`
                : `A ${lead.name} é o ponto certo em ${city} para você abastecer sua despensa com agilidade, produtos frescos e entrega facilitada.`}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Iniciar Pedido Agora</span>
              </a>
              <a
                href="#catalogo"
                className="px-6 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2"
              >
                <span>Ver Categorias</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <img
                src={
                  isDistributor
                    ? 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80'
                    : 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80'
                }
                alt={lead.name}
                fetchPriority="high"
                className="w-full h-72 md:h-80 object-cover"
              />
              <div className="p-5 border-t border-slate-800 bg-slate-900/90 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Atendimento em {city}</span>
                  <span className="text-emerald-400 font-medium">Entrega Expressa</span>
                </div>
                <div className="text-sm font-semibold text-white">
                  {lead.address || `Região Central e Bairros de ${city}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Categorias com Seletor Rápido de Pedido (Zero Fake Prices) */}
      <section id="catalogo" className="px-5 md:px-10 py-12 md:py-16 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-1">
              Catálogo Operacional
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              O que você precisa hoje?
            </h2>
          </div>
          <p className="text-slate-400 text-xs md:text-sm max-w-md">
            Selecione o setor e envie uma mensagem com o que você procura para confirmarmos as marcas disponíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={idx}
                onClick={() => setSelectedCategory(cat.name)}
                className={`cursor-pointer p-5 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/30 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{cat.name}</span>
                      {isSelected && (
                        <span className="text-[10px] uppercase font-bold bg-cyan-500 text-black px-1.5 py-0.5 rounded">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                      isSelected ? 'border-cyan-400 bg-cyan-400 text-black' : 'border-slate-700 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simulador de Envio de Lista para WhatsApp */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Fazer cotação ou pedido imediato</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Setor Selecionado: <span className="text-white font-bold">{selectedCategory}</span>
            </label>
            <input
              type="text"
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Ex: 2 caixas de cerveja lata, 1 saco de gelo 5kg e carvão..."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:outline-none text-sm text-white placeholder-slate-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Resposta direta sem cadastro prévio</span>
            </div>

            <button
              onClick={handleSendCustomList}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultar Valores & Disponibilidade</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Como Funciona a Entrega e Retirada */}
      <section className="border-t border-slate-800 bg-[#0B101E] px-5 md:px-10 py-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-6">Como funciona o atendimento na {lead.name}</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Etapa 01</span>
              <h4 className="text-sm font-bold text-white">Envie sua lista no WhatsApp</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Você manda mensagem informando os itens, quantidade e o endereço de entrega em {city}.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Etapa 02</span>
              <h4 className="text-sm font-bold text-white">Separação Imediata</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Confirmamos os itens em estoque com os valores exatos e já colocamos para gelar e embalar.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Etapa 03</span>
              <h4 className="text-sm font-bold text-white">Receba ou Retire</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entregamos no seu endereço com máquina de cartão ou chave Pix, sem atraso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Operacional com Endereço e Ação */}
      <footer className="border-t border-slate-800/80 bg-slate-950 px-5 md:px-10 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-sm font-bold text-white block">{lead.name}</span>
            <span className="text-xs text-slate-400 block">
              {lead.address || `${city} • Atendimento Presencial & Delivery`}
            </span>
            {lead.phoneRaw && (
              <span className="text-xs text-slate-500 block">Contato: {lead.phoneRaw}</span>
            )}
          </div>

          <a
            href={whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar no WhatsApp da {lead.name}</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
