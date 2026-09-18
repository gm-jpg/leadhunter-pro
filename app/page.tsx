'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchBar, SearchFilters } from '@/components/SearchBar';
import { LeadCard } from '@/components/LeadCard';
import { WhatsAppModal } from '@/components/WhatsAppModal';
import { ProposalPreviewModal } from '@/components/ProposalPreviewModal';
import { OpportunityReportModal } from '@/components/OpportunityReportModal';
import { SettingsModal } from '@/components/SettingsModal';
import { ContactsDatabaseModal } from '@/components/ContactsDatabaseModal';
import { ProposalImageModal } from '@/components/ProposalImageModal';
import { Lead, LeadStatus } from '@/types/lead';
import {
  Building2,
  MessageCircle,
  Sparkles,
  Flame,
  Zap,
  RotateCcw,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Send,
  ShieldCheck,
} from 'lucide-react';

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [generatingLeadId, setGeneratingLeadId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'high_opportunity' | 'ready' | 'contacted' | 'already_contacted' | 'negotiating_closed'
  >('all');

  // Perfil do Desenvolvedor & Chaves de Busca (Salvo no navegador)
  const [developerName, setDeveloperName] = useState('José | LeadHunter Brasil');
  const [developerPhone, setDeveloperPhone] = useState('5521972850211');
  const [googleApiKey, setGoogleApiKey] = useState('AIzaSyBSWVYMG8hi2iK1M5uViY3dhIwmKYo-MF0');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);

  // Modais
  const [selectedWhatsAppLead, setSelectedWhatsAppLead] = useState<Lead | null>(null);
  const [selectedPreviewLead, setSelectedPreviewLead] = useState<Lead | null>(null);
  const [selectedReportLead, setSelectedReportLead] = useState<Lead | null>(null);
  const [selectedImageLead, setSelectedImageLead] = useState<Lead | null>(null);

  // Carregar dados salvos no navegador ao iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cachedLeads = localStorage.getItem('lead_hunter_leads');
      if (cachedLeads) {
        try {
          setLeads(JSON.parse(cachedLeads));
        } catch (e) {
          console.error(e);
        }
      }

      const cachedProfile = localStorage.getItem('lead_hunter_profile');
      if (cachedProfile) {
        try {
          const profile = JSON.parse(cachedProfile);
          if (profile.name) setDeveloperName(profile.name);
          if (profile.phone) setDeveloperPhone(profile.phone);
          if (profile.googleApiKey) setGoogleApiKey(profile.googleApiKey);
          if (profile.geminiApiKey) setGeminiApiKey(profile.geminiApiKey);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleSaveProfile = (
    name: string,
    phone: string,
    gKey: string,
    gemKey: string
  ) => {
    setDeveloperName(name);
    setDeveloperPhone(phone);
    setGoogleApiKey(gKey);
    setGeminiApiKey(gemKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'lead_hunter_profile',
        JSON.stringify({ name, phone, googleApiKey: gKey, geminiApiKey: gemKey })
      );
    }
  };

  const updateAndSaveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lead_hunter_leads', JSON.stringify(newLeads));
    }
  };

  const handleUpdateStatus = (id: string, status: LeadStatus) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    updateAndSaveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    updateAndSaveLeads(updated);
  };

  const handleClearAll = () => {
    if (confirm('Deseja limpar todos os comércios da lista atual?')) {
      updateAndSaveLeads([]);
    }
  };

  // Realizar busca e triagem com filtros avançados
  const handleSearch = async (filters: SearchFilters) => {
    setIsSearching(true);
    try {
      const res = await fetch('/api/search-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...filters, googleApiKey }),
      });

      if (!res.ok) throw new Error('Erro ao buscar estabelecimentos no Google.');

      const data = await res.json();
      const fetchedLeads: Lead[] = data.leads || [];

      // Mescla com leads já existentes preservando propostas e status
      const mergedMap = new Map<string, Lead>();
      leads.forEach((l) => mergedMap.set(l.id, l));
      fetchedLeads.forEach((l) => {
        if (!mergedMap.has(l.id)) {
          mergedMap.set(l.id, l);
        }
      });

      const updated = Array.from(mergedMap.values());
      updateAndSaveLeads(updated);
    } catch (err: any) {
      alert(`Falha na busca: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  // Gerar proposta comercial e diagnóstico completo de oportunidade
  const handleGeneratePitch = async (lead: Lead) => {
    setGeneratingLeadId(lead.id);
    try {
      const res = await fetch('/api/generate-pitch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead, developerName, geminiApiKey }),
      });

      if (!res.ok) throw new Error('Erro ao gerar proposta com IA.');

      const data = await res.json();
      const updatedLead: Lead = {
        ...lead,
        developerPitch: data.pitch,
        status: 'proposta_pronta',
      };

      const updatedList = leads.map((l) => (l.id === lead.id ? updatedLead : l));
      updateAndSaveLeads(updatedList);

      // Abre automaticamente o relatório de oportunidade para você conferir
      setSelectedReportLead(updatedLead);
    } catch (err: any) {
      alert(`Falha ao gerar proposta: ${err.message}`);
    } finally {
      setGeneratingLeadId(null);
    }
  };

  // Ao abrir o modal de WhatsApp para enviar
  const handleOpenWhatsAppModal = (lead: Lead) => {
    setSelectedWhatsAppLead(lead);
  };

  // Ao confirmar o disparo de mensagem ou registrar contato na base
  const handleContactSaved = (leadId: string, record: any) => {
    const now = new Date();
    const formatted = now.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const updatedList = leads.map((l) =>
      l.id === leadId
        ? {
            ...l,
            status: l.status === 'fechado' || l.status === 'negociando' ? l.status : ('contatado' as LeadStatus),
            isContacted: true,
            contactedAt: record?.contactedAt || now.toISOString(),
            contactedRecord: record,
            sentAt: formatted,
          }
        : l
    );
    updateAndSaveLeads(updatedList);
  };

  // Filtros de pipeline otimizados com useMemo (Zero overhead de re-renderização)
  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      if (activeFilter === 'high_opportunity') return lead.opportunityScore >= 70 || !lead.website;
      if (activeFilter === 'ready') return Boolean(lead.developerPitch);
      if (activeFilter === 'contacted') return lead.status === 'contatado';
      if (activeFilter === 'already_contacted') return lead.isContacted;
      if (activeFilter === 'negotiating_closed')
        return lead.status === 'negociando' || lead.status === 'fechado';
      return true;
    });
  }, [leads, activeFilter]);

  // Métricas do funil em passagem única O(N)
  const {
    totalLeads,
    highOppCount,
    readyProposalsCount,
    contactedCount,
    closedCount,
    estimatedRevenue,
  } = React.useMemo(() => {
    const total = leads.length;
    let highOpp = 0;
    let ready = 0;
    let contacted = 0;
    let closed = 0;

    for (let i = 0; i < total; i++) {
      const l = leads[i];
      if (l.opportunityScore >= 70 || !l.website) highOpp++;
      if (l.developerPitch) ready++;
      if (l.status === 'contatado' || l.isContacted) contacted++;
      if (l.status === 'fechado') closed++;
    }

    return {
      totalLeads: total,
      highOppCount: highOpp,
      readyProposalsCount: ready,
      contactedCount: contacted,
      closedCount: closed,
      estimatedRevenue: closed * 1200,
    };
  }, [leads]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenContacts={() => setIsContactsModalOpen(true)}
        developerName={developerName}
        isGoogleLiveActive={Boolean(googleApiKey)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Barra de Pesquisa com Filtros Avançados */}
        <SearchBar onSearch={handleSearch} isLoading={isSearching} />

        {/* Funil de Vendas & Métricas de Geração de Renda */}
        {totalLeads > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
            <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-violet-600" />
                <span>Total de Leads</span>
              </div>
              <p className="text-3xl font-black text-slate-900 mt-2">{totalLeads}</p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 shadow-sm">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-black uppercase tracking-wider">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Oportunidades Quentes</span>
              </div>
              <p className="text-3xl font-black text-rose-700 mt-2">{highOppCount}</p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 text-blue-700 text-xs font-black uppercase tracking-wider">
                <Send className="w-4 h-4 text-blue-600" />
                <span>Enviados no WhatsApp</span>
              </div>
              <p className="text-3xl font-black text-blue-700 mt-2">{contactedCount}</p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/20 border border-emerald-300 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Sua Renda Fechada</span>
              </div>
              <p className="text-3xl font-black text-emerald-700 mt-2">
                R$ {estimatedRevenue.toLocaleString('pt-BR')}
                <span className="text-xs font-semibold text-emerald-800 block">
                  {closedCount} clientes fechados
                </span>
              </p>
            </div>
          </div>
        )}

        {/* Abas do Funil de Vendas */}
        {totalLeads > 0 && (
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                  activeFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white/90 text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Todos ({totalLeads})
              </button>

              <button
                onClick={() => setActiveFilter('high_opportunity')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeFilter === 'high_opportunity'
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-200'
                    : 'bg-white/90 text-rose-700 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                Oportunidades ({highOppCount})
              </button>

              <button
                onClick={() => setActiveFilter('ready')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeFilter === 'ready'
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                    : 'bg-white/90 text-violet-700 border border-violet-200 hover:bg-violet-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Propostas ({readyProposalsCount})
              </button>

              <button
                onClick={() => setActiveFilter('contacted')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeFilter === 'contacted'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                    : 'bg-white/90 text-blue-700 border border-blue-200 hover:bg-blue-50'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                Enviados ({contactedCount})
              </button>

              <button
                onClick={() => setActiveFilter('already_contacted')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeFilter === 'already_contacted'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'bg-white/90 text-indigo-700 border border-indigo-200 hover:bg-indigo-50'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Já Contatados ({leads.filter((l) => l.isContacted).length})
              </button>

              <button
                onClick={() => setActiveFilter('negotiating_closed')}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  activeFilter === 'negotiating_closed'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : 'bg-white/90 text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                Negociando / Fechados
              </button>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs text-slate-400 font-bold hidden sm:block">
                Mostrando {filteredLeads.length} de {totalLeads} comércios
              </span>
              <button
                onClick={handleClearAll}
                className="text-xs text-slate-400 hover:text-rose-600 font-bold transition-colors flex items-center gap-1"
                title="Limpar lista"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Limpar</span>
              </button>
            </div>
          </div>
        )}

        {/* Grid de Estabelecimentos */}
        {filteredLeads.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLeads.map((lead) => (
              <LeadCard
                key={lead.id}
                lead={lead}
                onGeneratePitch={handleGeneratePitch}
                onOpenWhatsAppModal={handleOpenWhatsAppModal}
                onOpenPreview={(l) => setSelectedPreviewLead(l)}
                onOpenReport={(l) => setSelectedReportLead(l)}
                onOpenImageModal={(l) => setSelectedImageLead(l)}
                onUpdateStatus={handleUpdateStatus}
                onDeleteLead={handleDeleteLead}
                isGenerating={generatingLeadId === lead.id}
              />
            ))}
          </div>
        ) : (
          /* Estado Vazio com Atalho Instantâneo */
          <div className="text-center py-20 px-6 bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-xl max-w-2xl mx-auto space-y-4">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-violet-200">
              <Sparkles className="w-10 h-10 text-amber-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Pronto para Descobrir Clientes de Alto Retorno?
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Pesquise qualquer nicho no formulário acima ou clique no botão abaixo para carregar uma demonstração instantânea com dados reais e testar o envio de WhatsApp.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  handleSearch({
                    query: 'Pizzaria',
                    city: 'Campinas',
                    state: 'SP',
                    neighborhood: '',
                    onlyWithoutWebsite: true,
                    onlyMobile: true,
                    hideContacted: false,
                    minRating: 4.0,
                  })
                }
                disabled={isSearching}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-black text-sm shadow-xl shadow-violet-200 hover:shadow-violet-300 transition-all active:scale-95 flex items-center gap-2 mx-auto"
              >
                <Zap className="w-4 h-4 text-amber-300" />
                <span>Carregar Amostra com Filtros Ativos</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Disparo no WhatsApp */}
      <WhatsAppModal
        lead={selectedWhatsAppLead}
        myPhone={developerPhone}
        onClose={() => setSelectedWhatsAppLead(null)}
        onContactSaved={handleContactSaved}
        onOpenImageModal={(l) => setSelectedImageLead(l)}
      />

      {/* Modal da Base Anti-Duplicidade */}
      <ContactsDatabaseModal
        isOpen={isContactsModalOpen}
        onClose={() => setIsContactsModalOpen(false)}
        onRefreshLeads={() => {
          fetch('/api/contacts')
            .then((r) => r.json())
            .then((d) => {
              const contacts = d.contacts || [];
              const updated = leads.map((l) => {
                const matched = contacts.find((c: any) => c.phone === l.phoneRaw || c.whatsapp === l.whatsapp);
                return {
                  ...l,
                  isContacted: Boolean(matched),
                  contactedRecord: matched || null,
                  status: matched ? matched.status : l.status,
                };
              });
              updateAndSaveLeads(updated);
            })
            .catch(console.error);
        }}
      />

      {/* Modal de Prévia da Proposta */}
      <ProposalPreviewModal
        lead={selectedPreviewLead}
        onClose={() => setSelectedPreviewLead(null)}
        onOpenWhatsApp={handleOpenWhatsAppModal}
      />

      {/* Modal de Relatório Completo de Oportunidade */}
      <OpportunityReportModal
        lead={selectedReportLead}
        onClose={() => setSelectedReportLead(null)}
        onOpenWhatsApp={handleOpenWhatsAppModal}
      />

      {/* Modal de Exportação da Imagem da Proposta (Sem Link) */}
      <ProposalImageModal
        lead={selectedImageLead}
        isOpen={Boolean(selectedImageLead)}
        onClose={() => setSelectedImageLead(null)}
      />

      {/* Modal de Perfil Profissional */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveProfile}
        currentName={developerName}
        currentPhone={developerPhone}
        currentGoogleApiKey={googleApiKey}
        currentGeminiApiKey={geminiApiKey}
      />
    </div>
  );
}
