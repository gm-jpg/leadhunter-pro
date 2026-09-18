'use client';

import React, { useRef, useState } from 'react';
import { toPng, toBlob } from 'html-to-image';
import { X, Download, Copy, Check, Sparkles, MessageCircle, Info } from 'lucide-react';
import { Lead } from '@/types/lead';
import { ProposalImageCard } from './ProposalImageCard';

interface Props {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProposalImageModal({ lead, isOpen, onClose }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen || !lead) return null;

  const defaultAccompanyMessage = `Olá! Tudo bem com vocês? 😊

Meu nome é José, moro aqui em Porto Seguro há muitos anos e minha família também tem comércio aqui na nossa cidade.

Acompanho o trabalho da *${lead.name}* e vejo o quanto vocês são elogiados pelo atendimento e pela dedicação (${lead.rating.toFixed(1)}★ no Google).

Como trabalho com design e presença digital para empresas locais, montei uma demonstração visual — sem custo algum nem compromisso — mostrando como a imagem da *${lead.name}* pode transmitir no celular o mesmo capricho que vocês já entregam no dia a dia (segue na imagem anexada).

Dá uma olhadinha quando tiver um tempinho! Se fizer sentido para vocês, vai ser um prazer trocar uma ideia rápida por aqui. Um abraço!`;

  const accompanyMessage = lead.developerPitch?.whatsappMessage || defaultAccompanyMessage;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      const link = document.createElement('a');
      const cleanName = lead.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      link.download = `conceito-visual-${cleanName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Erro ao baixar imagem do conceito visual:', err);
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    if (!cardRef.current) return;
    try {
      const blob = await toBlob(cardRef.current, { quality: 0.95, pixelRatio: 2 });
      if (blob && navigator.clipboard && (window as any).ClipboardItem) {
        await navigator.clipboard.write([
          new (window as any).ClipboardItem({ 'image/png': blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        // Fallback: faz o download caso o navegador restrinja escrita de imagem na área de transferência
        handleDownload();
      }
    } catch (err) {
      console.warn('Fallback para download após restrição de clipboard:', err);
      handleDownload();
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(accompanyMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#12141D] border border-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Cabeçalho */}
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#161924] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Conceito Visual (Teaser em Alta Resolução)
                </h3>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Teaser Mindset
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Envie a imagem direto no WhatsApp do cliente • Zero links externos • Zero menção a preços
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Área de Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Banner de Filosofia de Abordagem (Teaser Mindset) */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-900/40 border border-emerald-500/20 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <p className="text-emerald-300 font-bold uppercase tracking-wide text-[11px]">
                Diretriz de Prospecção: O Teaser não é o Produto
              </p>
              <p className="text-slate-300 leading-relaxed">
                <em>&ldquo;The preview is a teaser, not the product. Show enough to create desire. Leave enough to create curiosity.&rdquo;</em>
              </p>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                O objetivo exclusivo da primeira mensagem é <strong>ganhar a segunda mensagem</strong>. Não tente vender o projeto antecipadamente: envie a imagem anexada junto com o texto curto e deixe o capricho visual despertar a curiosidade do comerciante.
              </p>
            </div>
          </div>

          {/* Barra de Ações Rápidas */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-[#1A1D2A] border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-semibold">
                Pronto para enviar no WhatsApp (Copie e cole):
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={handleCopyImage}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                {copiedImage ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                <span>{copiedImage ? 'Copiada! (Dê Ctrl+V no Zap)' : '📋 Copiar Imagem (Ctrl+V)'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Gerando PNG...' : '📸 Baixar Imagem PNG'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopyText}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center gap-2 transition-all active:scale-95"
              >
                {copiedText ? <Check className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                <span>{copiedText ? 'Texto Copiado!' : '💬 Copiar Mensagem de Abordagem'}</span>
              </button>
            </div>
          </div>

          {/* Mensagem de Abordagem para WhatsApp */}
          <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Mensagem Curta para Enviar Junto com a Imagem no WhatsApp:
              </span>
              <button
                onClick={handleCopyText}
                className="text-slate-400 hover:text-white font-bold flex items-center gap-1 transition-colors"
              >
                {copiedText ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copiado!
                  </span>
                ) : (
                  'Copiar Texto'
                )}
              </button>
            </div>
            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-[#0E1017] p-3.5 rounded-xl border border-white/5 select-all">
              {accompanyMessage}
            </p>
          </div>

          {/* Renderização do Card do Conceito Visual */}
          <div className="overflow-x-auto flex justify-center py-4 bg-black/50 rounded-2xl border border-slate-800/80 p-4">
            <div className="scale-[0.85] sm:scale-100 origin-top">
              <ProposalImageCard ref={cardRef} lead={lead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
