import React, { useState } from 'react';
import {
  X,
  Sparkles,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  ExternalLink,
  Building2,
  ShieldCheck,
  Send,
  Zap,
  ThumbsUp,
  ThumbsDown,
  Layers,
  ArrowRight,
  Flame,
  Smartphone,
} from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onOpenWhatsApp: (lead: Lead) => void;
}

export function OpportunityReportModal({ lead, onClose, onOpenWhatsApp }: Props) {
  if (!lead || !lead.developerPitch) return null;

  const pitch = lead.developerPitch;
  const audit = pitch.audit;
  const concept = pitch.visualConcept;
  const [activeTab, setActiveTab] = useState<'perfil' | 'solucoes' | 'objecoes'>('perfil');

  const hasComplaints = audit.customerSentiment?.hasExplicitComplaints;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/80 w-full max-w-4xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Sparkles className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  Estudo de Perfil & Automação Inteligente
                </h3>
                <span className="text-[11px] font-bold bg-white/20 px-2.5 py-0.5 rounded-full">
                  Score {lead.opportunityScore}%
                </span>
              </div>
              <p className="text-xs text-white/90">
                {lead.name} • {lead.city} - {lead.state} ({lead.rating}★ Google Maps)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Navegação Interna */}
        <div className="px-6 pt-3 pb-2 border-b border-slate-100 bg-slate-50/70 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('perfil')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'perfil'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            1. Análise do Perfil & Gaps Estruturais
          </button>
          <button
            onClick={() => setActiveTab('solucoes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'solucoes'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            2. Automações & Soluções (Website + IA)
          </button>
          <button
            onClick={() => setActiveTab('objecoes')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'objecoes'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            3. Como Contornar Dúvidas do Dono
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'perfil' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Diagnóstico Geral do Negócio */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-black text-violet-700 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                  <Building2 className="w-3.5 h-3.5" /> Raio-X Geral do Estabelecimento
                </span>
                <p className="text-sm text-slate-800 font-semibold leading-relaxed">
                  {audit.businessDiagnosis}
                </p>
              </div>

              {/* Gaps Estruturais do Perfil (Intuitivo: quando não tem site ou depende só de Instagram) */}
              {audit.profileGaps && audit.profileGaps.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-violet-600" />
                      Gaps Estruturais Identificados no Perfil:
                    </h4>
                    <span className="text-[11px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md border border-violet-100">
                      Análise Inteligente
                    </span>
                  </div>

                  <div className="space-y-3">
                    {audit.profileGaps.map((gap, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-violet-300 transition-all shadow-xs space-y-2"
                      >
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="text-xs font-extrabold text-violet-800 bg-violet-50 px-2.5 py-0.5 rounded-lg border border-violet-200">
                            {gap.badge}
                          </span>
                          <span className="text-xs font-bold text-rose-600">
                            {gap.impactOnSales}
                          </span>
                        </div>

                        <h5 className="font-bold text-sm text-slate-900">{gap.title}</h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          {gap.description}
                        </p>

                        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                          <strong className="text-emerald-800 font-bold block mb-0.5 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-600" /> Automação Intuitiva Recomendada:
                          </strong>
                          {gap.intuitiveAutomationSolution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Análise de Sentimento (O que elogiam vs reclamações se houver) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" /> O que os Clientes Elogiam (Seu Gancho)
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {audit.customerSentiment?.praisedPoints?.map((praise, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{praise}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    {hasComplaints ? 'Dores nos Comentários' : 'Status das Avaliações'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-medium">
                    {audit.customerSentiment?.recurringComplaints?.map((comp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vazamento de Receita Estimado */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-orange-500/10 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-rose-600" /> Estimativa de Vendas Perdidas
                  </span>
                  <p className="text-base font-black text-slate-900 mt-1">
                    {audit.revenueLeaks?.estimatedLoss}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 font-medium leading-relaxed max-w-xl">
                    {audit.revenueLeaks?.description}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-2xl border border-amber-200 text-center shrink-0">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Honorários Recomendados:</span>
                  <span className="text-base font-black text-emerald-600">{audit.suggestedFee}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'solucoes' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                  Plano de Soluções Inteligentes para Apresentar ao Cliente:
                </h4>
                <span className="text-xs font-bold text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-lg border border-violet-100">
                  Website + Automação WhatsApp + IA
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {audit.tailoredSolutions?.map((sol, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-3xl border border-slate-200 bg-white hover:border-violet-300 transition-all shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-black text-violet-700 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100">
                          {sol.pillar}
                        </span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 text-sm mt-1">
                        {sol.solutionTitle}
                      </h5>
                      <p className="text-xs text-slate-500 mt-1.5 font-medium leading-relaxed">
                        <strong className="text-slate-700">O que resolve:</strong> {sol.deficiencyFound}
                      </p>
                      <p className="text-xs text-slate-600 mt-1 font-medium">
                        <strong className="text-slate-700">Entregável:</strong> {sol.deliverable}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{sol.revenueImpact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'objecoes' && (
            <div className="space-y-3.5 animate-in fade-in duration-200">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Como Responder às Dúvidas do Comerciante com Firmeza:
              </h4>

              {audit.objectionHandling?.map((item, i) => (
                <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-1.5">
                  <p className="text-xs font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-violet-600" />
                    <span>"{item.objection}"</span>
                  </p>
                  <p className="text-xs text-slate-600 pl-6 font-medium leading-relaxed">
                    <strong className="text-emerald-700 font-bold block mb-0.5">Sua resposta recomendada:</strong>
                    {item.suggestedAnswer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <a
            href={`/proposta/${lead.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Ver Protótipo Visual</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenWhatsApp(lead);
            }}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-black flex items-center gap-2 shadow-xl shadow-emerald-200 transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Disparar Proposta no WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
