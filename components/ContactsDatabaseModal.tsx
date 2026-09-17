'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Search,
  Download,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { ContactHistoryItem } from '@/types/lead';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRefreshLeads?: () => void;
}

export function ContactsDatabaseModal({ isOpen, onClose, onRefreshLeads }: Props) {
  const [contacts, setContacts] = useState<ContactHistoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setContacts(data.contacts || []);
      }
    } catch (e) {
      console.error('Erro ao buscar contatos:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = contacts.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.businessName.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Deseja remover "${name}" da base de contatados? O comércio voltará a aparecer como prospecto novo.`)) {
      return;
    }
    try {
      const res = await fetch(`/api/contacts?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
        if (onRefreshLeads) onRefreshLeads();
      }
    } catch (e) {
      console.error('Erro ao remover contato:', e);
    }
  };

  const handleExportCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['Nome da Empresa', 'Categoria', 'Cidade', 'Estado', 'Telefone / WhatsApp', 'Data do Contato', 'Status', 'Canal'];
    const rows = contacts.map((c) => [
      `"${c.businessName.replace(/"/g, '""')}"`,
      `"${c.category.replace(/"/g, '""')}"`,
      `"${c.city.replace(/"/g, '""')}"`,
      `"${c.state}"`,
      `"${c.phone}"`,
      `"${c.formattedDate}"`,
      `"${c.status}"`,
      `"${c.channel}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `base_contatados_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-white/80 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
        {/* Header do Modal */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 via-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900">
                  Base de Contatados (Anti-Duplicidade)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black border border-indigo-200">
                  {contacts.length} empresas registradas
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Controle inteligente para evitar enviar mensagens repetidas para o mesmo comércio.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={contacts.length === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Baixar lista completa em Excel/CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Exportar CSV</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de Busca e Filtro */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por empresa, cidade, nicho ou telefone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
            />
          </div>

          <button
            onClick={fetchContacts}
            className="p-2.5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold flex items-center gap-1.5 transition-colors"
            title="Atualizar lista"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Lista de Registros */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {loading ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-slate-500 font-semibold">Consultando base anti-duplicidade...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <p className="text-sm font-black text-slate-800">
                {contacts.length === 0
                  ? 'Nenhum comércio contatado ainda'
                  : 'Nenhum registro encontrado para esta busca'}
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {contacts.length === 0
                  ? 'Ao clicar em "Enviar no WhatsApp" em qualquer lead, a empresa é salva automaticamente aqui para nunca receber mensagens repetidas.'
                  : 'Tente outro termo de pesquisa.'}
              </p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-sm text-slate-900">{item.businessName}</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-100">
                      {item.category}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                      ✓ Contatado
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium flex-wrap pt-0.5">
                    <span className="flex items-center gap-1 text-slate-700 font-mono font-bold">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      {item.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.city} - {item.state}
                    </span>
                    <span className="flex items-center gap-1 text-indigo-700 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      {item.formattedDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleDelete(item.id, item.businessName)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remover da base (permitir recontato)"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            Registros gravados persistentemente em <code className="font-mono text-[11px] bg-slate-200 px-1.5 py-0.5 rounded">data/contacts-database.json</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
