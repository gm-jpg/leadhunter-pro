import React, { useState, useEffect } from 'react';
import {
  X,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  UserCheck,
  DollarSign,
  Send,
  AlertCircle,
  Sparkles,
  Smartphone,
  FlaskConical,
} from 'lucide-react';
import { Lead } from '@/types/lead';
import { buildWhatsAppLink, parseBrazilianPhone } from '@/lib/phone-utils';

interface Props {
  lead: Lead | null;
  myPhone?: string;
  onClose: () => void;
  onContactSaved?: (leadId: string, record: any) => void;
}

export function WhatsAppModal({ lead, myPhone, onClose, onContactSaved }: Props) {
  if (!lead || !lead.developerPitch) return null;

  const defaultMyPhone =
    myPhone ||
    process.env.NEXT_PUBLIC_DEVELOPER_WHATSAPP ||
    '5521972850211';

  const [message, setMessage] = useState(lead.developerPitch.whatsappMessage);
  const [copied, setCopied] = useState(false);
  const [destinationMode, setDestinationMode] = useState<'client' | 'test'>('client');
  const [clientPhone, setClientPhone] = useState(lead.phoneRaw || '');
  const [testPhone, setTestPhone] = useState(defaultMyPhone);

  useEffect(() => {
    if (lead?.developerPitch?.whatsappMessage) {
      setMessage(lead.developerPitch.whatsappMessage);
    }
    if (lead?.phoneRaw) {
      setClientPhone(lead.phoneRaw);
    }
    if (myPhone) {
      setTestPhone(myPhone);
    }
  }, [lead, myPhone]);

  const activePhone = destinationMode === 'test' ? testPhone : clientPhone;
  const phoneInfo = parseBrazilianPhone(activePhone);
  const myPhoneInfo = parseBrazilianPhone(testPhone);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Envio de teste para o WhatsApp do próprio desenvolvedor
  const handleSendTestToMe = () => {
    const link = buildWhatsAppLink(testPhone, message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Envio oficial para o cliente (registra na base anti-duplicidade)
  const handleSendToClient = async () => {
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: clientPhone,
          whatsapp: clientPhone,
          placeId: lead.placeId,
          businessName: lead.name,
          city: lead.city,
          state: lead.state,
          category: lead.category,
          status: 'contatado',
          messageSnippet: message.substring(0, 160),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (onContactSaved) onContactSaved(lead.id, data.record);
      }
    } catch (e) {
      console.warn('Erro ao salvar contato no banco:', e);
    }

    const link = buildWhatsAppLink(clientPhone, message);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/80 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-emerald-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                  Disparo WhatsApp & Prévia
                </h3>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                  Custo Zero
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Lead: <span className="font-bold text-slate-800">{lead.name}</span> ({lead.city} - {lead.state})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo do Modal com Scroll */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Seletor de Modo: Enviar para Cliente OU Testar no Próprio Celular */}
          <div className="p-1.5 bg-slate-100 rounded-2xl flex items-center gap-1.5 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setDestinationMode('client')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                destinationMode === 'client'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>👤 Enviar para o Cliente</span>
              <span className="text-[10px] text-slate-400">({clientPhone || 'Lead'})</span>
            </button>

            <button
              type="button"
              onClick={() => setDestinationMode('test')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                destinationMode === 'test'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md font-extrabold'
                  : 'text-blue-700 hover:text-blue-900 bg-blue-50/60'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>🧪 Enviar pro Meu WhatsApp</span>
              <span className="text-[10px] opacity-80">(Polir antes)</span>
            </button>
          </div>

          {/* Banner Explicativo do Modo de Teste */}
          {destinationMode === 'test' ? (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 shadow-xs">
              <Smartphone className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-blue-950">
                  🧪 Modo de Teste Ativo (Seu Celular: +55 {myPhoneInfo.formattedDisplay})
                </h4>
                <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
                  A mensagem e o link serão abertos no <strong>seu próprio WhatsApp</strong>. Você poderá abrir no celular, ver como a mensagem chega, testar o link da proposta e polir os detalhes com calma antes de enviar para o cliente. O lead <strong>não</strong> será marcado como contatado ainda.
                </p>
              </div>
            </div>
          ) : (
            lead.isContacted && (
              <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex items-start gap-3 shadow-xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-black text-amber-900">
                    ⚠️ Atenção Anti-Duplicidade: Comércio já Contatado
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed font-medium">
                    Este estabelecimento já foi registrado no banco como contatado em{' '}
                    <span className="font-bold">
                      {lead.contactedRecord?.formattedDate || 'data anterior'}
                    </span>
                    . O envio atual servirá como mensagem de acompanhamento (follow-up).
                  </p>
                </div>
              </div>
            )
          )}

          {/* Posicionamento Estratégico do Desenvolvedor */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-2xl bg-violet-50/80 border border-violet-100 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-violet-600 shrink-0" />
              <span className="text-[11px] font-bold text-violet-900">
                Foco em Gerar Receita
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-bold text-emerald-900">
                Preços Justos & Acessíveis
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="text-[11px] font-bold text-blue-900">
                Segurança & Sem Travamentos
              </span>
            </div>
          </div>

          {/* Campo de Telefone e Validação */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {destinationMode === 'test' ? 'Seu Número de Teste:' : 'WhatsApp do Comércio:'}
              </label>
              {phoneInfo.isMobile ? (
                <span className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  ✓ Válido (+55 {phoneInfo.formattedDisplay})
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Fixo / Ajuste o número se necessário
                </span>
              )}
            </div>
            <input
              type="text"
              value={destinationMode === 'test' ? testPhone : clientPhone}
              onChange={(e) => {
                if (destinationMode === 'test') {
                  setTestPhone(e.target.value);
                } else {
                  setClientPhone(e.target.value);
                }
              }}
              placeholder="Ex: (21) 97285-0211"
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 font-mono text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-inner"
            />
          </div>

          {/* Mensagem Personalizada */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mensagem que será enviada (edite e personalize à vontade):
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs text-violet-600 hover:text-violet-800 flex items-center gap-1 font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
              </button>
            </div>

            {/* Seletor de Tom */}
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => {
                  const devName = lead.developerPitch?.developerName || 'José | LeadHunter Brasil';
                  const propUrl = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/proposta/${lead.id}`;
                  setMessage(
                    `Olá pessoal da *${lead.name}*, tudo bem com vocês? Espero que a semana esteja ótima por aí! 😊\n\nMeu nome é ${devName}, sou desenvolvedor aqui na região e estava pesquisando os comércios de ${lead.city} no Google. Fiquei muito bem impressionado com os elogios e as avaliações de vocês! 👏\n\nReparei que vocês têm um trabalho super elogiado, mas quem procura pelo celular no Google acaba não encontrando um site com fotos profissionais, catálogo fácil e atendimento direto no WhatsApp.\n\nPensando nisso, preparei com muito carinho uma demonstração visual — bem moderna e sem compromisso algum — de como ficaria um site modelo da *${lead.name}* com fotos elaboradas, catálogo interativo e um atendente no WhatsApp que agiliza as respostas pra equipe de vocês:\n\n👉 ${propUrl}\n\nDá uma olhadinha quando tiver 1 minuto livre! Se curtirem o conceito, a gente bate um papo descontraído pra eu mostrar como funciona. Um abraço e ótimas vendas por aí!`
                  );
                }}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-violet-100 hover:bg-violet-200 text-violet-800 transition-colors flex items-center gap-1.5"
              >
                <span>✨ Descontraída & Educada (Recomendada)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const propUrl = `${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/proposta/${lead.id}`;
                  setMessage(
                    `Olá! Tudo bem com vocês? Passando rápido para parabenizar a equipe da *${lead.name}* pela nota no Google! 🌟\n\nNotei que vocês poderiam atrair muito mais clientes locais tendo um site moderno com fotos de alto padrão e pedidos automáticos pelo WhatsApp.\n\nMontei uma prévia visual exclusiva para vocês conferirem sem compromisso:\n👉 ${propUrl}\n\nO que acharam da demonstração? Um abraço!`
                  );
                }}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <span>⚡ Curta & Objetiva</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-sans leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-none shadow-inner"
            />
          </div>

          {/* Link Público da Proposta Visual */}
          <div className="p-4 bg-violet-50/70 rounded-2xl border border-violet-100 flex items-center justify-between gap-3">
            <div className="truncate">
              <p className="text-[11px] font-extrabold text-violet-900 uppercase tracking-wider">
                Página da Proposta que o Cliente verá:
              </p>
              <p className="text-xs font-mono font-bold text-violet-700 truncate mt-0.5">
                /proposta/{lead.id}
              </p>
            </div>
            <a
              href={`/proposta/${lead.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-violet-200"
            >
              <span>Abrir Proposta</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Rodapé com Disparos (Teste para Mim ou Envio Oficial) */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors"
          >
            Fechar
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Botão de Envio de Teste para o Meu WhatsApp */}
            <button
              type="button"
              onClick={handleSendTestToMe}
              className="flex-1 sm:flex-initial px-5 py-3.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              title="Abre a mensagem no seu próprio WhatsApp para você conferir antes"
            >
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span>Testar no Meu WhatsApp</span>
            </button>

            {/* Botão Oficial para o Cliente */}
            <button
              type="button"
              onClick={destinationMode === 'test' ? handleSendTestToMe : handleSendToClient}
              className={`flex-1 sm:flex-initial px-6 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] ${
                destinationMode === 'test'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-200'
                  : 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-200 hover:shadow-emerald-300'
              }`}
            >
              {destinationMode === 'test' ? (
                <>
                  <FlaskConical className="w-4 h-4" />
                  <span>Abrir Teste no Meu Celular</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Disparar para o Cliente</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
