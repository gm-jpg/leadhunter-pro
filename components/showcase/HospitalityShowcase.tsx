'use client';

import React from 'react';
import { MapPin, MessageSquare, Compass, Sun, Coffee, Waves, Check, ArrowUpRight } from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead;
  developerDirectLink: string;
}

export function HospitalityShowcase({ lead, developerDirectLink }: Props) {
  const city = lead.city || 'Bahia';
  const whatsappUrl = lead.whatsapp
    ? `https://wa.me/${lead.whatsapp}?text=${encodeURIComponent(
        `Olá! Gostaria de consultar a disponibilidade de suítes e valores para uma estadia na ${lead.name}.`
      )}`
    : developerDirectLink;

  return (
    <div className="bg-[#FAF8F5] text-[#2C2825] font-sans antialiased selection:bg-[#283618] selection:text-white">
      {/* 1. Header Minimalista e Sofisticado */}
      <header className="px-6 md:px-12 py-6 border-b border-[#EBE5DC] flex items-center justify-between sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-30">
        <div>
          <span className="text-xl md:text-2xl font-serif tracking-tight text-[#1A1816] font-medium">
            {lead.name}
          </span>
          <span className="text-[11px] uppercase tracking-widest text-[#7A7268] block mt-0.5">
            {lead.category} • {city}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#283618] hover:bg-[#1C2611] text-white text-xs tracking-wide uppercase font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consultar Datas</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Editorial com Impacto Visual e Composição Limpa */}
      <section className="relative min-h-[520px] md:min-h-[640px] flex items-end p-6 md:p-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
          alt={lead.name}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-[#141210]/35 to-transparent"></div>

        <div className="relative z-10 max-w-2xl text-white space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#E9DFCE] border-b border-[#E9DFCE]/40 pb-1">
            <Sun className="w-3.5 h-3.5 text-[#DDA15E]" />
            <span>Hospedagem & Natureza em {city}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight font-normal leading-[1.1] text-white drop-shadow-sm">
            Descanso autêntico, ar puro e hospitalidade.
          </h1>

          <p className="text-sm md:text-base text-[#F4EFE6] font-light leading-relaxed max-w-xl">
            Acomodações acolhedoras pensadas para casais e famílias que desejam relaxar e aproveitar o melhor de {city} com reserva direta sem taxas.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] text-[#141210] font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <span>Verificar Suítes no WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. Momento de Respiro e História (Visual Rhythm & Whitespace) */}
      <section className="py-20 md:py-28 px-6 md:px-16 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs uppercase tracking-widest text-[#8F7E6B] font-semibold">
          A Experiência na {lead.name}
        </span>
        <h2 className="text-2xl md:text-4xl font-serif text-[#1C1A17] font-normal leading-snug">
          "Um refúgio acolhedor onde cada detalhe foi preparado para que você se sinta em casa longe de casa."
        </h2>
        <p className="text-sm md:text-base text-[#615B52] leading-relaxed max-w-2xl mx-auto font-light">
          Localizada em {lead.address || city}, combinamos a tranquilidade da natureza local com atendimento acolhedor. Nossa equipe atende diretamente pelo WhatsApp para esclarecer dúvidas, enviar fotos e confirmar sua estadia sem complicações.
        </p>
      </section>

      {/* 4. Acomodações & Espaços (Composição Assimétrica Editorial) */}
      <section className="py-12 md:py-20 px-6 md:px-16 border-t border-[#EBE5DC] max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8F7E6B] font-semibold block mb-2">
              Espaços & Suítes
            </span>
            <h3 className="text-3xl md:text-4xl font-serif text-[#1A1816] font-normal">
              Conforto para o seu descanso
            </h3>
          </div>
          <p className="text-xs text-[#7A7268] max-w-xs">
            Consulte fotos detalhadas de cada suíte e tire dúvidas sobre tarifas de acordo com as datas da sua viagem.
          </p>
        </div>

        {/* Galeria com Ritmo Visual Variado */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Suíte Principal - Destaque Amplo */}
          <div className="md:col-span-7 space-y-4">
            <div className="relative h-[380px] md:h-[460px] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
                alt="Suíte de casal aconchegante"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div>
              <span className="text-[11px] tracking-wider uppercase text-[#8F7E6B] font-medium">Acomodação Casal</span>
              <h4 className="text-xl font-serif text-[#1C1A17] font-medium mt-1">Suíte Conforto com Varanda</h4>
              <p className="text-xs text-[#6B645B] mt-1 leading-relaxed">
                Ambiente arejado, cama queen-size, ar-condicionado silencioso e rede para relaxar ouvindo os sons da natureza.
              </p>
            </div>
          </div>

          {/* Segunda Foto - Área de Lazer & Piscina */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="relative h-[220px] md:h-[260px] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"
                  alt="Piscina e área verde"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h4 className="text-lg font-serif text-[#1C1A17] font-medium">Deck da Piscina & Jardim</h4>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                Área ao ar livre integrada com espreguiçadeiras para aproveitar o sol e descansar após passeios.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative h-[220px] md:h-[260px] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80"
                  alt="Café da manhã acolhedor"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <h4 className="text-lg font-serif text-[#1C1A17] font-medium">Café da Manhã Fresquinho</h4>
              <p className="text-xs text-[#6B645B] leading-relaxed">
                Pães artesanais, frutas da estação, bolos caseiros e café passado na hora para começar bem o dia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Informações Práticas e Reais (Sem Invenção de Fatos) */}
      <section className="py-16 md:py-24 bg-[#F3EFE9] border-t border-[#E5DDD2]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <Compass className="w-5 h-5 text-[#283618]" />
            <h5 className="font-serif text-lg font-medium text-[#1A1816]">Localização</h5>
            <p className="text-xs text-[#665F55] leading-relaxed">
              {lead.address || `${city} - Bahia`}
            </p>
          </div>

          <div className="space-y-2">
            <Waves className="w-5 h-5 text-[#283618]" />
            <h5 className="font-serif text-lg font-medium text-[#1A1816]">Atendimento Direto</h5>
            <p className="text-xs text-[#665F55] leading-relaxed">
              Tire dúvidas sobre disponibilidade de quartos e rotas direto com os proprietários.
            </p>
          </div>

          <div className="space-y-2">
            <Coffee className="w-5 h-5 text-[#283618]" />
            <h5 className="font-serif text-lg font-medium text-[#1A1816]">Reserva Segura</h5>
            <p className="text-xs text-[#665F55] leading-relaxed">
              Sem intermediários de plataformas. Confirmação instantânea com quem cuida do local.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Rodapé Limpo com Chamada Convidativa */}
      <footer className="py-16 px-6 md:px-12 text-center bg-[#1E1C1A] text-white">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#BFA88F] block font-medium">
            Planejando sua viagem para {city}?
          </span>
          <h3 className="text-2xl md:text-4xl font-serif font-normal">
            Estamos de portas abertas para receber você na {lead.name}.
          </h3>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#DDA15E] hover:bg-[#BC6C25] text-[#141210] font-semibold text-xs tracking-wider uppercase transition-all shadow-xl"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
          <p className="text-[11px] text-[#8C847B] pt-6">
            © {lead.name} • {city} • Atendimento pelo WhatsApp
          </p>
        </div>
      </footer>
    </div>
  );
}
