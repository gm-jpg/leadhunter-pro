'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Sparkles,
  MessageSquare,
  MapPin,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Phone,
} from 'lucide-react';
import { Lead } from '@/types/lead';
import { HospitalityShowcase } from '@/components/showcase/HospitalityShowcase';
import { ArtisanalShowcase } from '@/components/showcase/ArtisanalShowcase';
import { UtilityShowcase } from '@/components/showcase/UtilityShowcase';
import { GastronomyShowcase } from '@/components/showcase/GastronomyShowcase';

function renderArchetypeShowcase(lead: Lead, developerDirectLink: string) {
  const cat = (lead.category || '').toLowerCase();

  // 1. Hotelaria, Pousadas & Hospedagem
  if (
    cat.includes('hotel') ||
    cat.includes('pousada') ||
    cat.includes('hospedagem') ||
    cat.includes('resort') ||
    cat.includes('chalé') ||
    cat.includes('chale') ||
    cat.includes('suíte') ||
    cat.includes('suite')
  ) {
    return <HospitalityShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 2. Açougues, Padarias & Ofício Artesanal
  if (
    cat.includes('açougue') ||
    cat.includes('acougue') ||
    cat.includes('carne') ||
    cat.includes('padaria') ||
    cat.includes('confeitaria') ||
    cat.includes('panificadora')
  ) {
    return <ArtisanalShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 3. Distribuidoras, Mercados, Conveniência & Drogarias
  if (
    cat.includes('distribuidora') ||
    cat.includes('bebida') ||
    cat.includes('mercado') ||
    cat.includes('mercadinho') ||
    cat.includes('conveniência') ||
    cat.includes('conveniencia') ||
    cat.includes('depósito') ||
    cat.includes('deposito') ||
    cat.includes('farmácia') ||
    cat.includes('drogaria')
  ) {
    return <UtilityShowcase lead={lead} developerDirectLink={developerDirectLink} />;
  }

  // 4. Gastronomia (Pizzarias, Hamburguerias, Restaurantes, Bares)
  return <GastronomyShowcase lead={lead} developerDirectLink={developerDirectLink} />;
}

export default function PublicProposalPage() {
  const params = useParams();
  const leadId = (params?.id as string) || '';

  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let foundLead: Lead | null = null;

    // 1. Tenta recuperar do localStorage (caso o usuário esteja no mesmo navegador desktop)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lead_hunter_leads');
      if (saved) {
        try {
          const list: Lead[] = JSON.parse(saved);
          foundLead = list.find((l) => l.id === leadId || l.placeId === leadId) || null;
        } catch (e) {
          console.error(e);
        }
      }
    }

    if (foundLead) {
      setLead(foundLead);
      setLoading(false);
      return;
    }

    // 2. Se não estiver no localStorage (ex: link aberto no celular via WhatsApp), busca no servidor
    fetch(`/api/lead/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.lead) {
          setLead(data.lead);
        } else {
          // Fallback seguro caso a API não retorne
          setLead({
            id: leadId,
            placeId: leadId,
            name: 'PortoFino Pizzaria & Restaurante',
            category: 'Pizzaria & Restaurante',
            address: 'Av. Bahia, 158 - Porto Seguro, BA',
            city: 'Porto Seguro',
            state: 'BA',
            phoneRaw: '(73) 98129-2866',
            whatsapp: '5573981292866',
            isMobile: true,
            googleMapsUrl: 'https://maps.google.com/?q=PortoFino+Pizzaria+Porto+Seguro',
            website: null,
            rating: 4.8,
            userRatingsTotal: 173,
            photosCount: 8,
            photos: [],
            reviews: [
              {
                author: 'Carlos Alberto',
                rating: 5,
                relativeTime: 'há 1 mês',
                text: 'Melhor pizza de Porto Seguro! Massa leve, ambiente muito agradável e atendimento nota 10.',
                sentiment: 'positive',
              },
            ],
            opportunityScore: 95,
            opportunityFactors: [],
            status: 'oportunidade',
            createdAt: new Date().toISOString(),
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Falha ao carregar lead:', err);
        setLoading(false);
      });
  }, [leadId]);

  const devWhatsApp = process.env.NEXT_PUBLIC_DEVELOPER_WHATSAPP || '5521972850211';

  if (loading || !lead) {
    return (
      <div className="min-h-screen bg-[#0E0D0F] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-300 font-medium text-sm">Carregando apresentação exclusiva...</p>
        </div>
      </div>
    );
  }

  const developerDirectLink = `https://wa.me/${devWhatsApp}?text=${encodeURIComponent(
    `Olá José! Vi a demonstração visual que você preparou para a *${lead.name}* aqui em Porto Seguro. Gostei bastante! Vamos conversar.`
  )}`;

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-black">
      {/* 1. Barra de Apresentação com História e Conexão Local de Porto Seguro */}
      <header className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="text-xs md:text-sm font-bold text-white tracking-tight">
                  Demonstração Visual Exclusiva: <strong className="text-emerald-400">{lead.name}</strong>
                </span>
                <span className="text-[10px] bg-white/10 text-slate-300 px-2 py-0.5 rounded-full font-medium">
                  Porto Seguro • BA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                Criada por <strong>José</strong> • Morador de Porto Seguro há muitos anos • Família comerciante local
              </p>
            </div>
          </div>

          <a
            href={developerDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wide transition-all duration-300 flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>Falar com José no WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 2. O SITE EM SI (100% Tela Cheia, Fluido e sem Molduras Falsas de Navegador) */}
      <main className="w-full">
        {renderArchetypeShowcase(lead, developerDirectLink)}
      </main>

      {/* 3. Rodapé Editorial Pessoal: Quem Criou & Conexão com Porto Seguro (Zero Menção a Valores) */}
      <footer className="border-t border-white/10 bg-[#0B0C10] px-6 md:px-12 py-12 text-slate-300">
        <div className="max-w-4xl mx-auto space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-900/30 shrink-0">
              J
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="text-lg font-bold text-white">
                Sobre esta demonstração feita para a {lead.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Moro aqui em <strong>Porto Seguro há muitos anos</strong> e minha família também possui um comércio na nossa cidade. Sei de perto como é o dia a dia, os períodos de alta e baixa temporada, e a importância de valorizar quem trabalha com seriedade na nossa terra.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Desenvolvi esta prévia visual sob medida para que vocês possam ver na prática como a <strong>{lead.name}</strong> pode se destacar quando turistas e moradores procuram no Google, com pedidos e reservas chegando organizados direto no WhatsApp, sem intermediários.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Porto Seguro - Bahia • Atendimento Local & Direto</span>
            </div>

            <a
              href={developerDirectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Conversar com José no WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
