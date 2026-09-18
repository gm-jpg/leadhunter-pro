import React from 'react';
import {
  Star,
  Globe,
  Camera,
  MapPin,
  ExternalLink,
  MessageCircle,
  Sparkles,
  Phone,
  AlertCircle,
  Eye,
  Trash2,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Lead, LeadStatus } from '@/types/lead';
import { OpportunityBadge } from './OpportunityBadge';

interface Props {
  lead: Lead;
  onGeneratePitch: (lead: Lead) => void;
  onOpenWhatsAppModal: (lead: Lead) => void;
  onOpenPreview: (lead: Lead) => void;
  onOpenReport: (lead: Lead) => void;
  onOpenImageModal?: (lead: Lead) => void;
  onUpdateStatus?: (id: string, status: LeadStatus) => void;
  onDeleteLead?: (id: string) => void;
  isGenerating: boolean;
}

export function LeadCard({
  lead,
  onGeneratePitch,
  onOpenWhatsAppModal,
  onOpenPreview,
  onOpenReport,
  onOpenImageModal,
  onUpdateStatus,
  onDeleteLead,
  isGenerating,
}: Props) {
  const hasPitch = Boolean(lead.developerPitch);

  const statusConfig: Record<LeadStatus, { label: string; color: string }> = {
    novo: { label: 'Novo Lead', color: 'bg-slate-100 text-slate-700' },
    oportunidade: { label: 'Oportunidade', color: 'bg-amber-100 text-amber-800' },
    proposta_pronta: { label: 'Proposta Pronta', color: 'bg-violet-100 text-violet-800' },
    contatado: { label: 'Enviado no WhatsApp', color: 'bg-blue-100 text-blue-800' },
    negociando: { label: 'Em Negociação', color: 'bg-amber-100 text-amber-900 border border-amber-300' },
    fechado: { label: 'Fechado (Ganho!)', color: 'bg-emerald-100 text-emerald-900 font-extrabold border border-emerald-300' },
    arquivado: { label: 'Arquivado', color: 'bg-slate-100 text-slate-500' },
  };

  const currentStatus = statusConfig[lead.status] || statusConfig.novo;

  return (
    <div
      className={`glass-card lead-card-optimized rounded-3xl border p-6 flex flex-col justify-between shadow-sm hover:shadow-card-hover transition-all duration-300 relative group ${
        lead.opportunityScore >= 70
          ? 'border-violet-200/90 bg-gradient-to-b from-white via-white to-violet-50/30 ring-1 ring-violet-200/50'
          : 'border-slate-200/80 bg-white'
      }`}
    >
      <div>
        {/* Cabeçalho do Card com Categoria e Status */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-md border border-violet-100">
                {lead.category}
              </span>

              {/* Seletor de Status do Funil */}
              {onUpdateStatus ? (
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-md cursor-pointer border border-transparent hover:border-slate-300 transition-colors ${currentStatus.color}`}
                >
                  <option value="novo">📥 Novo Lead</option>
                  <option value="proposta_pronta">✨ Proposta Pronta</option>
                  <option value="contatado">🚀 Enviado no WhatsApp</option>
                  <option value="negociando">🤝 Em Negociação</option>
                  <option value="fechado">💰 Fechado (Venda!)</option>
                  <option value="arquivado">📁 Arquivado</option>
                </select>
              ) : (
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${currentStatus.color}`}>
                  {currentStatus.label}
                </span>
              )}

              {/* Badge de Anti-Duplicidade */}
              {lead.isContacted && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center gap-1 shadow-xs">
                  <CheckCircle className="w-3 h-3 text-indigo-600" />
                  <span>Já Contatado{lead.contactedRecord?.formattedDate ? ` (${lead.contactedRecord.formattedDate})` : ''}</span>
                </span>
              )}
            </div>

            <h3 className="text-lg font-black text-slate-900 leading-snug">
              {lead.name}
            </h3>
          </div>

          <OpportunityBadge score={lead.opportunityScore} />
        </div>

        {/* Endereço & Avaliação */}
        <div className="space-y-2 mb-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
            <span className="truncate">{lead.address}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Avaliação Google */}
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-950 px-2.5 py-0.5 rounded-xl font-bold shadow-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{lead.rating.toFixed(1)}</span>
              <span className="text-amber-700 font-normal">
                ({lead.userRatingsTotal} reviews)
              </span>
            </div>

            {/* Fotos */}
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-xl text-slate-600 font-medium">
              <Camera className="w-3.5 h-3.5 text-slate-400" />
              <span>{lead.photosCount} fotos</span>
            </div>

            {/* Link Google Maps */}
            <a
              href={lead.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-violet-600 hover:text-violet-800 transition-colors font-bold ml-auto"
            >
              <span>Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Diagnóstico de Oportunidades (Website, fotos, etc.) */}
        <div className="p-3.5 bg-slate-50/90 rounded-2xl mb-4 border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-slate-700">Presença Digital:</span>
            {lead.website ? (
              <span className="flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                <Globe className="w-3 h-3 text-emerald-600" /> Possui site
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-700 font-black bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200 shadow-xs animate-pulse">
                <AlertCircle className="w-3 h-3 text-rose-600" /> Sem Website (Depende só do Instagram)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {lead.opportunityFactors.map((factor, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold shadow-xs"
              >
                • {factor}
              </span>
            ))}
          </div>
        </div>

        {/* Telefone e WhatsApp */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-mono font-bold text-slate-800">{lead.phoneRaw || 'Sem telefone'}</span>
          </div>

          {lead.isMobile ? (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              WhatsApp Celular
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Fixo
            </span>
          )}
        </div>

        {/* Aviso se já foi enviado */}
        {lead.sentAt && (
          <div className="mt-2 text-[11px] font-semibold text-blue-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Enviado via WhatsApp em {lead.sentAt}</span>
          </div>
        )}
      </div>

      {/* Ações: Gerar Oportunidade, Relatório ou Enviar WhatsApp */}
      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
        {!hasPitch ? (
          <button
            onClick={() => onGeneratePitch(lead)}
            disabled={isGenerating}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-700 hover:to-indigo-800 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md shadow-violet-200 transition-all active:scale-[0.98] disabled:opacity-60"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Criar Oportunidade & Proposta IA</span>
          </button>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenReport(lead)}
                className="flex-1 py-2.5 px-3 rounded-2xl bg-violet-50 hover:bg-violet-100 text-violet-800 border border-violet-200 text-xs font-black flex items-center justify-center gap-1.5 transition-colors"
                title="Ver diagnóstico detalhado de oportunidade e precificação"
              >
                <FileText className="w-3.5 h-3.5 text-violet-600" />
                <span>Relatório</span>
              </button>

              <button
                onClick={() => onOpenPreview(lead)}
                className="flex-1 py-2.5 px-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Ver Proposta</span>
              </button>
            </div>

            {onOpenImageModal && (
              <button
                type="button"
                onClick={() => onOpenImageModal(lead)}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                title="Criar Imagem/Print em alta resolução sem link para colar no WhatsApp"
              >
                <Camera className="w-4 h-4 text-slate-950" />
                <span>📸 Gerar Imagem do Conceito (Sem Link)</span>
              </button>
            )}

            <button
              onClick={() => onOpenWhatsAppModal(lead)}
              className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                lead.isContacted
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-emerald-500/40'
              }`}
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>
                {lead.isContacted ? 'Reenviar no WhatsApp (Já Contatado)' : 'Enviar Mensagem no WhatsApp'}
              </span>
            </button>
          </div>
        )}

        {onDeleteLead && (
          <div className="flex justify-end pt-1">
            <button
              onClick={() => onDeleteLead(lead.id)}
              className="text-[11px] text-slate-300 hover:text-rose-600 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Remover lead</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
