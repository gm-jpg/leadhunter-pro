import React, { useState, useEffect } from 'react';
import { X, User, Phone, Key, Sparkles, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { parseBrazilianPhone } from '@/lib/phone-utils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, phone: string, googleApiKey: string, geminiApiKey: string) => void;
  currentName: string;
  currentPhone: string;
  currentGoogleApiKey: string;
  currentGeminiApiKey: string;
}

export function SettingsModal({
  isOpen,
  onClose,
  onSave,
  currentName,
  currentPhone,
  currentGoogleApiKey,
  currentGeminiApiKey,
}: Props) {
  const [name, setName] = useState(currentName);
  const [phone, setPhone] = useState(currentPhone);
  const [googleApiKey, setGoogleApiKey] = useState(currentGoogleApiKey);
  const [geminiApiKey, setGeminiApiKey] = useState(currentGeminiApiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setName(currentName);
    setPhone(currentPhone);
    setGoogleApiKey(currentGoogleApiKey);
    setGeminiApiKey(currentGeminiApiKey);
  }, [currentName, currentPhone, currentGoogleApiKey, currentGeminiApiKey, isOpen]);

  if (!isOpen) return null;

  const phoneInfo = parseBrazilianPhone(phone);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(name, phone, googleApiKey, geminiApiKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/80 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        {/* Cabeçalho */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-violet-500/10 to-indigo-500/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-violet-200">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Seu Perfil & Chaves de Busca</h3>
              <p className="text-xs text-slate-500">100% Autônomo • Salvo no seu navegador</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário com Scroll */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Nome */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Seu Nome ou Marca Profissional
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: José | Desenvolvedor Web"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Seu WhatsApp (Onde o cliente vai te responder)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: (11) 99999-9999 ou 5511999999999"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {phone && (
              <p className="text-[11px] font-bold text-emerald-600 mt-1">
                ✓ Destino formatado: +55 {phoneInfo.formattedDisplay}
              </p>
            )}
          </div>

          {/* Chave Google Maps / Places API */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-600" />
                Chave Google Places API (Para Leads 100% Reais ao Vivo)
              </label>
            </div>
            <input
              type="password"
              value={googleApiKey}
              onChange={(e) => setGoogleApiKey(e.target.value)}
              placeholder="Cole sua chave AIzaSy... do Google Cloud"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />

            <div className="mt-2 p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 space-y-1">
              <p className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                O Google Cloud dá $200 USD gratuitos todo mês!
              </p>
              <p className="text-[11px] text-indigo-800 leading-relaxed font-medium">
                Com esse crédito grátis você pode fazer milhares de buscas reais de comércios no Google Maps sem pagar nada. Se deixar vazio, o app usa o motor de demonstração.
              </p>
              <a
                href="https://console.cloud.google.com/google/maps-apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:underline pt-0.5"
              >
                <span>Obter chave gratuita no Google Cloud Console</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Chave Gemini AI (Opcional) */}
          <div className="pt-3 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              Chave Google Gemini AI (Opcional - Para diagnósticos com IA avançada)
            </label>
            <input
              type="password"
              value={geminiApiKey}
              onChange={(e) => setGeminiApiKey(e.target.value)}
              placeholder="Cole sua chave AIzaSy... do Google AI Studio (Opcional)"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Obtenha gratuitamente em <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-violet-600 font-bold hover:underline">Google AI Studio</a>.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-xs font-black shadow-md shadow-violet-200 flex items-center gap-1.5 transition-all"
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Salvo com Sucesso!</span>
                </>
              ) : (
                <span>Salvar Configurações</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
