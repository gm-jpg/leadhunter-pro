import React from 'react';
import { Target, Sparkles, User, Zap, Globe, Key, ShieldCheck } from 'lucide-react';

interface Props {
  onOpenSettings: () => void;
  onOpenContacts?: () => void;
  developerName: string;
  isGoogleLiveActive?: boolean;
}

export function Navbar({ onOpenSettings, onOpenContacts, developerName, isGoogleLiveActive = false }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg">
                LeadHunter<span className="text-violet-600"> Brasil</span>
              </span>

              {isGoogleLiveActive ? (
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Google Maps Ao Vivo
                </span>
              ) : (
                <button
                  onClick={onOpenSettings}
                  className="bg-violet-50 hover:bg-violet-100 text-violet-700 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-violet-200 transition-colors"
                  title="Clique para ativar a busca 100% ao vivo no Google Maps"
                >
                  <Key className="w-3 h-3 text-violet-600" /> Modo Demo (Custo Zero)
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Triagem de Comércios • Propostas Visuais com IA • WhatsApp 1-Clique
            </p>
          </div>
        </div>

        {/* Ações e Perfil do Usuário */}
        <div className="flex items-center gap-2.5">
          {onOpenContacts && (
            <button
              onClick={onOpenContacts}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-black transition-all active:scale-95 shadow-xs"
              title="Abrir base de dados de clientes já contatados (Anti-duplicidade)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Base Contatados</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-violet-50 text-slate-700 hover:text-violet-700 border border-slate-200/80 transition-all text-xs font-semibold active:scale-95"
            title="Configurar seu perfil, WhatsApp e Chaves do Google/Gemini"
          >
            <div className="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">
              {developerName ? developerName.charAt(0).toUpperCase() : 'D'}
            </div>
            <span className="max-w-[120px] sm:max-w-[160px] truncate hidden sm:inline">
              {developerName || 'Meu Perfil'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
