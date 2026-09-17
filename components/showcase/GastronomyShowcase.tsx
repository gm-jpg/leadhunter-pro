'use client';

import React, { useState } from 'react';
import { Flame, Clock, MapPin, MessageSquare, UtensilsCrossed, Sparkles, Check, ArrowRight, Wine, Star } from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead;
  developerDirectLink: string;
}

export function GastronomyShowcase({ lead, developerDirectLink }: Props) {
  const city = lead.city || 'sua cidade';
  const isPizzeria = lead.category.toLowerCase().includes('pizza');
  const isBurger = lead.category.toLowerCase().includes('hamburguer');

  const [serviceType, setServiceType] = useState<'delivery' | 'reserva'>('delivery');
  const [partySize, setPartySize] = useState('2 pessoas');

  const whatsappReservationUrl = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
        serviceType === 'reserva'
          ? `Olá! Gostaria de verificar a disponibilidade para reservar uma mesa (${partySize}) hoje na ${lead.name}.`
          : `Olá! Gostaria de consultar o cardápio atualizado e fazer um pedido para entrega na ${lead.name}.`
      )}`
    : developerDirectLink;

  const heroImage = isPizzeria
    ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80'
    : isBurger
    ? 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1600&q=80'
    : 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80';

  const specialties = isPizzeria
    ? [
        {
          title: 'Massas de Longa Fermentação',
          desc: 'Farinha de moagem especial, descanso de mais de 48h para leveza e bordas alveoladas inconfundíveis.',
        },
        {
          title: 'Forno em Alta Temperatura',
          desc: 'Assadas rapidamente sob chama viva, garantindo queijo derretido no ponto e crocância perfeita.',
        },
        {
          title: 'Molho de Tomate San Marzano',
          desc: 'Pomodori pelati selecionados com acidez equilibrada, azeite extravirgem e manjericão fresco.',
        },
      ]
    : isBurger
    ? [
        {
          title: 'Blends Nobres Moídos no Dia',
          desc: 'Combinação artesanal de cortes frescos grelhados na chapa bem quente com crosta caramelizada.',
        },
        {
          title: 'Pães Artesanais Selecionados',
          desc: 'Brioche amanteigado tostado na manteiga para sustentar a suculência da carne sem desmontar.',
        },
        {
          title: 'Queijos Fundidos & Molhos da Casa',
          desc: 'Receitas próprias desenvolvidas para harmonizar perfeitamente com a intensidade do corte.',
        },
      ]
    : [
        {
          title: 'Ingredientes de Produtores Locais',
          desc: 'Priorizamos insumos frescos da estação para manter sabor autêntico e qualidade superior.',
        },
        {
          title: 'Técnicas Clássicas & Toque Autoral',
          desc: 'Preparo cuidadoso que valoriza cada etapa da cocção e a apresentação de cada prato.',
        },
        {
          title: 'Carta de Vinhos & Drinks Autorais',
          desc: 'Harmonizações pensadas para enriquecer os sabores do prato e sua experiência à mesa.',
        },
      ];

  return (
    <div className="bg-[#0F0D0E] text-[#F3EFEA] font-sans antialiased selection:bg-[#E05A47] selection:text-white">
      {/* 1. Header Atmosférico */}
      <header className="px-6 md:px-12 py-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0F0D0E]/95 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E05A47]/10 border border-[#E05A47]/30 flex items-center justify-center text-[#E05A47]">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white block leading-tight font-serif">
              {lead.name}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-[#B3A89F] block">
              {lead.category} • {city}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={whatsappReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#E05A47] hover:bg-[#C94735] text-white text-xs tracking-wider uppercase font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#E05A47]/20"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Fazer Pedido / Mesa</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Cinematográfico com Iluminação Quente */}
      <section className="relative min-h-[500px] md:min-h-[580px] flex items-end p-6 md:p-14 overflow-hidden">
        <img
          src={heroImage}
          alt={lead.name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0D0E] via-[#0F0D0E]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0D0E]/80 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E05A47] text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[#F3EFEA] tracking-wide">Gastronomia Autêntica em {city}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
            {isPizzeria ? (
              <>O sabor do fogo e da tradição na {lead.name}.</>
            ) : isBurger ? (
              <>Sabor potente, brasa viva e receitas artesanais.</>
            ) : (
              <>Uma mesa farta, bons momentos e cozinha de verdade.</>
            )}
          </h1>

          <p className="text-[#C5BCB4] text-sm md:text-base leading-relaxed max-w-xl">
            {isPizzeria
              ? `Pizzas assadas com maestria, bordas leves e ingredientes nobres. Venha desfrutar no nosso salão ou receba fumegando na sua porta.`
              : isBurger
              ? `Carne fresca moída diariamente, ponto perfeito e montagens equilibradas para quem não abre mão do melhor burger de ${city}.`
              : `Na ${lead.name}, cada prato carrega afeto, respeito aos ingredientes e o prazer de compartilhar uma excelente refeição.`}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={whatsappReservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#E05A47] hover:bg-[#C94735] text-white text-sm font-semibold transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Pedir pelo WhatsApp</span>
            </a>
            <a
              href="#preparo"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium backdrop-blur-md border border-white/15 transition-all flex items-center gap-2"
            >
              <span>Conhecer o Preparo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Pilares da Cozinha (Sem Fórmulas Clichês) */}
      <section id="preparo" className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs uppercase tracking-widest text-[#E05A47] font-semibold block mb-2">
            Nossa Identidade
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Respeito ao tempo e ao sabor de cada ingrediente.
          </h2>
          <p className="text-sm text-[#A89F96] mt-3 leading-relaxed">
            Acreditamos que uma boa refeição começa na escolha rigorosa dos insumos e termina no cuidado com que chega à sua mesa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {specialties.map((item, idx) => (
            <div
              key={idx}
              className="border-t border-white/15 pt-6 space-y-3 group hover:border-[#E05A47] transition-colors"
            >
              <span className="text-xs font-mono text-[#E05A47]">0{idx + 1}</span>
              <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#E05A47] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-[#A89F96] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Reserva / Pedido Interativo via WhatsApp (Zero Fake Prices) */}
      <section className="bg-[#181416] border-y border-white/10 px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E05A47] font-semibold">
              Atendimento Direto
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              Como você prefere saborear hoje?
            </h2>
            <p className="text-xs text-[#A89F96]">
              Seja para uma noite especial no salão ou um jantar no conforto do seu sofá.
            </p>
          </div>

          <div className="bg-[#0F0D0E] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-3 p-1 bg-white/5 rounded-xl border border-white/5">
              <button
                onClick={() => setServiceType('delivery')}
                className={`py-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  serviceType === 'delivery'
                    ? 'bg-[#E05A47] text-white shadow-md'
                    : 'text-[#A89F96] hover:text-white'
                }`}
              >
                🛵 Delivery em Casa
              </button>
              <button
                onClick={() => setServiceType('reserva')}
                className={`py-3 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  serviceType === 'reserva'
                    ? 'bg-[#E05A47] text-white shadow-md'
                    : 'text-[#A89F96] hover:text-white'
                }`}
              >
                🍷 Mesa no Salão
              </button>
            </div>

            {serviceType === 'reserva' && (
              <div className="space-y-3">
                <label className="block text-xs text-[#A89F96] uppercase tracking-wider font-medium">
                  Tamanho da Mesa:
                </label>
                <div className="flex flex-wrap gap-2">
                  {['2 pessoas', '4 pessoas', '6+ pessoas', 'Comemoração / Aniversário'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPartySize(size)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                        partySize === size
                          ? 'border-[#E05A47] bg-[#E05A47]/10 text-white'
                          : 'border-white/10 text-[#A89F96] hover:border-white/20'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-sm font-semibold text-white block">
                  {serviceType === 'reserva'
                    ? `Reserva para ${partySize} na ${lead.name}`
                    : `Receba os pratos do dia quentinhos no seu endereço`}
                </span>
                <span className="text-xs text-[#A89F96] block">
                  Envie uma mensagem instantânea sem taxas de intermediação de aplicativos.
                </span>
              </div>

              <a
                href={whatsappReservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3 rounded-full bg-[#E05A47] hover:bg-[#C94735] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Endereço e Localização */}
      <footer className="px-6 md:px-12 py-12 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 text-xs text-[#A89F96]">
        <div className="space-y-1 text-center md:text-left">
          <span className="font-serif font-bold text-white text-base block">{lead.name}</span>
          <span>{lead.address || `Endereço em ${city} • Consulte horário de funcionamento no WhatsApp`}</span>
          {lead.phoneRaw && <span className="block text-[#7A7268]">Telefone: {lead.phoneRaw}</span>}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={whatsappReservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#E05A47] transition-colors font-medium"
          >
            Fazer Pedido
          </a>
          <span>•</span>
          <span className="text-emerald-400">● Cozinha em Atividade</span>
        </div>
      </footer>
    </div>
  );
}
