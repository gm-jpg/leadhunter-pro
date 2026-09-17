import React from 'react';
import {
  X,
  ExternalLink,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Globe,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { Lead } from '@/types/lead';

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onOpenWhatsApp: (lead: Lead) => void;
}

export function ProposalPreviewModal({ lead, onClose, onOpenWhatsApp }: Props) {
  if (!lead || !lead.developerPitch) return null;

  const pitch = lead.developerPitch;
  const concept = pitch.visualConcept;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/80 w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-violet-50 to-indigo-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-md shadow-violet-200">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Diagnóstico & Proposta IA: {lead.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium">Prévia da apresentação personalizada</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Resumo do Diagnóstico */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
            <span className="text-[11px] font-extrabold text-violet-600 uppercase tracking-wider">
              Diagnóstico de Oportunidade
            </span>
            <p className="text-sm text-slate-800 mt-1 font-semibold leading-relaxed">
              {pitch.summaryReason}
            </p>
          </div>

          {/* Headline Visual & Cores Geradas */}
          <div
            className="p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${concept.primaryColor}, ${concept.secondaryColor})`,
            }}
          >
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/20 backdrop-blur-md mb-3 border border-white/20">
              {concept.badge}
            </span>
            <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
              {concept.headline}
            </h4>
            <p className="text-sm text-white/95 mt-2 font-medium leading-relaxed">
              {concept.subheadline}
            </p>

            <div className="mt-5 pt-4 border-t border-white/20 flex items-center gap-2 text-xs font-bold text-white">
              <TrendingUp className="w-4 h-4 text-emerald-300" />
              <span>{concept.revenueProjection}</span>
            </div>
          </div>

          {/* Serviços Sugeridos & Entregáveis */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Soluções Técnicas & Entregáveis
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {pitch.suggestedServices.map((srv, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-violet-300 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                      {srv.title}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed font-medium">
                      {srv.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-2.5 border-t border-slate-100 text-[11px] font-bold text-violet-700 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{srv.deliverable}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exemplo do Chatbot WhatsApp */}
          <div className="p-5 rounded-3xl bg-slate-900 text-slate-100 shadow-xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-extrabold text-emerald-400">
              <MessageSquare className="w-4 h-4" />
              <span>Exemplo do Atendente WhatsApp em Ação:</span>
            </div>
            <div className="space-y-2.5 text-xs">
              <div className="bg-slate-800 p-3 rounded-2xl max-w-[85%] text-slate-200 font-medium">
                <span className="text-[10px] text-slate-400 font-bold block mb-0.5">Cliente pergunta:</span>
                "{concept.chatbotSample.customerQuestion}"
              </div>
              <div className="bg-emerald-900/60 border border-emerald-500/40 p-3 rounded-2xl max-w-[85%] ml-auto text-emerald-100 font-medium shadow-md">
                <span className="text-[10px] text-emerald-300 font-bold block mb-0.5">Atendente Virtual responde:</span>
                "{concept.chatbotSample.botReply}"
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          <a
            href={`/proposta/${lead.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span>Página Pública</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenWhatsApp(lead);
            }}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-200 transition-all active:scale-[0.98]"
          >
            <span>Disparar WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
