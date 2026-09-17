'use client';

import React from 'react';
import { MessageSquare, Clock, MapPin, Sparkles, Check, ArrowRight, ShieldCheck, Flame } from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead;
  developerDirectLink: string;
}

export function ArtisanalShowcase({ lead, developerDirectLink }: Props) {
  const isBakery = lead.category.toLowerCase().includes('padaria') || lead.category.toLowerCase().includes('confeitaria');
  const city = lead.city || 'Brasil';

  const defaultHero = isBakery
    ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80'
    : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80';

  const photo1 = isBakery
    ? 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    : 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80';

  const photo2 = isBakery
    ? 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
    : 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80';

  const whatsappUrl = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
        isBakery
          ? `Olá! Gostaria de consultar os pães, bolos e opções frescas disponíveis hoje na ${lead.name}.`
          : `Olá! Gostaria de consultar os cortes especiais e kits churrasco disponíveis na ${lead.name}.`
      )}`
    : developerDirectLink;

  return (
    <div className="bg-[#121214] text-[#EDEDED] font-sans antialiased selection:bg-[#E11D48] selection:text-white">
      {/* 1. Header Focado em Ação Direta */}
      <header className="px-6 md:px-12 py-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#121214]/90 backdrop-blur-md z-30">
        <div>
          <span className="text-xl md:text-2xl font-black tracking-tight text-white uppercase">
            {lead.name}
          </span>
          <span className="text-[11px] text-emerald-400 font-bold tracking-wider uppercase block mt-0.5">
            ● Aberto • Balcão & Encomendas WhatsApp
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-black tracking-wide uppercase transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/50"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Fazer Pedido</span>
        </a>
      </header>

      {/* 2. Hero Section com Fotografia de Textura & Foco no Produto */}
      <section className="relative min-h-[480px] md:min-h-[580px] flex items-center p-6 md:p-16 overflow-hidden">
        <img
          src={defaultHero}
          alt={lead.name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A09]/95 via-[#0C0A09]/80 to-transparent"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-white/10 text-white backdrop-blur-md border border-white/10">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBakery ? 'Fornadas do Dia' : 'Cortes Nobres & Churrasco'} • {city}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white">
            {isBakery
              ? 'Pão quentinho, confeitaria fina e café passado na hora.'
              : 'Qualidade no corte, procedência rigorosa e sabor inconfundível.'}
          </h1>

          <p className="text-sm md:text-base text-slate-300 font-normal leading-relaxed max-w-lg">
            {isBakery
              ? `Tradição de balcão e atendimento acolhedor em ${city}. Peça encomendas de bolos, salgados e café da manhã direto pelo nosso WhatsApp.`
              : `Kits churrasco preparados, carnes nobres e atendimento especializado em ${city}. Peça pelo WhatsApp e receba pronto para a grelha.`}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs tracking-wider uppercase transition-all flex items-center gap-2 shadow-xl"
            >
              <span>{isBakery ? 'Ver Cardápio no WhatsApp' : 'Pedir Carnes no WhatsApp'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Declaração de Ofício / Manifesto (Whitespace & Editorial Rhythm) */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/10">
        <div className="md:col-span-5 space-y-3">
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
            Nosso Compromisso com {city}
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
            {isBakery ? 'Receitas artesanais que valorizam o seu dia.' : 'A procedência da carne que vai para a sua mesa.'}
          </h2>
        </div>
        <div className="md:col-span-7 space-y-4 text-slate-300 text-sm leading-relaxed font-light">
          <p>
            {isBakery
              ? `Na ${lead.name}, cada fornada é acompanhada com rigor. Não usamos pré-misturas industriais sem identidade: nosso foco é textura crocante por fora, maciez por dentro e aquele aroma que reúne a família.`
              : `Na ${lead.name}, tratamos o churrasco e as refeições da semana com seriedade. Trabalhamos com padrão uniforme de espessura, marmoreio e limpeza dos cortes, para que você não perca tempo preparando a carne.`}
          </p>
          <p className="text-xs text-slate-400">
            Você pode encomendar com antecedência para evitar filas no balcão e retirar com tudo embalado e separado.
          </p>
        </div>
      </section>

      {/* 4. Destaques Visuais Sem Preços Fictícios (Fotografia Realista) */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase block mb-1">
              {isBakery ? 'Produção Diária' : 'Especialidades do Açougue'}
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-white">
              {isBakery ? 'O que sai do forno com frequência' : 'Cortes selecionados para o seu churrasco'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-xs">
            Consulte a disponibilidade do dia e valores atualizados chamando nossa equipe direto no WhatsApp.
          </p>
        </div>

        {/* Grade Assimétrica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={photo1}
                alt="Destaque de produto"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">
                {isBakery ? 'Pães de Fermentação Natural & Crostas Douradas' : 'Cortes Nobres (Picanha, Bife de Chorizo & Ancho)'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isBakery
                  ? 'Farinha selecionada, descanso de massa equilibrado e fermentação lenta para garantir leveza digestiva.'
                  : 'Embalados a vácuo ou cortados na hora com espessura personalizada ao gosto do mestre churrasqueiro.'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative h-[300px] md:h-[360px] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src={photo2}
                alt="Segundo destaque de produto"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <h4 className="text-xl font-black text-white">
                {isBakery ? 'Confeitaria Artesanal & Encomendas de Festas' : 'Kits de Fim de Semana & Cortes Práticos para o Dia a Dia'}
              </h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {isBakery
                  ? 'Tortas, bolos recheados e salgados fritos ou assados na hora sob encomenda para aniversários e reuniões.'
                  : 'Combinados de carnes temperadas, linguiças artesanais e acompanhamentos prontos para agilizar seu almoço.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Como Funciona o Pedido (Fluxo sem atrito) */}
      <section className="py-16 bg-[#18181B] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-10">
          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
              Sem Complicação
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Como pedir na {lead.name} pelo WhatsApp
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/5 space-y-2">
              <span className="text-2xl font-black text-emerald-400">01</span>
              <h5 className="font-bold text-white text-sm">Chame nossa equipe</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clique no botão de WhatsApp para abrir a conversa instantânea.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121214] border border-white/5 space-y-2">
              <span className="text-2xl font-black text-emerald-400">02</span>
              <h5 className="font-bold text-white text-sm">Escolha suas opções</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Informamos o que está saindo fresquinho na hora ou separamos seu kit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#121214] border border-white/5 space-y-2">
              <span className="text-2xl font-black text-emerald-400">03</span>
              <h5 className="font-bold text-white text-sm">Retire ou receba</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Retire no balcão sem filas ou combine a entrega direta no seu endereço.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer Direto */}
      <footer className="py-12 px-6 border-t border-white/10 text-center bg-[#0C0A09]">
        <div className="max-w-xl mx-auto space-y-4">
          <h4 className="text-xl font-black text-white">
            {lead.name} • {city}
          </h4>
          <p className="text-xs text-slate-400">
            {lead.address || `Atendimento presencial e pedidos via WhatsApp em ${city}`}
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Abrir Conversa no WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
