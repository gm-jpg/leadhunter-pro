import fs from 'fs';
import path from 'path';
import { ContactHistoryItem, LeadStatus } from '@/types/lead';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'contacts-database.json');

// Garante que a pasta e o arquivo de banco existam
function ensureDbExists(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
  }
}

function readAll(): ContactHistoryItem[] {
  ensureDbExists();
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw) || [];
  } catch (e) {
    console.error('Erro ao ler contacts-database.json:', e);
    return [];
  }
}

function writeAll(items: ContactHistoryItem[]): void {
  ensureDbExists();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2), 'utf8');
  } catch (e) {
    console.error('Erro ao salvar contacts-database.json:', e);
  }
}

/**
 * Normaliza um número para comparação eliminando caracteres especiais e DDI
 */
export function normalizePhone(phone: string | null | undefined): string {
  if (!phone) return '';
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = digits.substring(1);
  if (digits.startsWith('55') && digits.length >= 12) digits = digits.substring(2);
  return digits;
}

/**
 * Normaliza o nome da empresa e cidade para evitar duplicidade de nomes idênticos
 */
export function normalizeNameCityKey(name: string, city: string): string {
  const cleanName = (name || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  const cleanCity = (city || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `${cleanName}__${cleanCity}`;
}

/**
 * Verifica se o lead já foi contatado anteriormente
 */
export function getContactRecord(params: {
  phone?: string;
  whatsapp?: string;
  placeId?: string;
  name?: string;
  city?: string;
}): ContactHistoryItem | null {
  const items = readAll();
  const searchPhone = normalizePhone(params.whatsapp || params.phone);
  const searchPlaceId = params.placeId && params.placeId !== 'demo' ? params.placeId : '';
  const searchNameCity =
    params.name && params.city ? normalizeNameCityKey(params.name, params.city) : '';

  for (const item of items) {
    // 1. Checa por telefone normalizado
    if (searchPhone && normalizePhone(item.whatsapp || item.phone) === searchPhone) {
      return item;
    }
    // 2. Checa por placeId do Google Maps
    if (searchPlaceId && item.placeId && item.placeId === searchPlaceId) {
      return item;
    }
    // 3. Checa por nome + cidade
    if (searchNameCity && normalizeNameCityKey(item.businessName, item.city) === searchNameCity) {
      return item;
    }
  }

  return null;
}

/**
 * Salva ou atualiza um contato na base de dados
 */
export function saveContactRecord(data: {
  phone: string;
  whatsapp?: string;
  placeId?: string;
  businessName: string;
  city: string;
  state: string;
  category: string;
  status?: LeadStatus;
  channel?: 'whatsapp' | 'ligacao' | 'outro';
  notes?: string;
  messageSnippet?: string;
}): ContactHistoryItem {
  const items = readAll();
  const phoneClean = normalizePhone(data.whatsapp || data.phone);
  const placeId = data.placeId || '';
  const nameCity = normalizeNameCityKey(data.businessName, data.city);

  const existingIndex = items.findIndex((i) => {
    if (phoneClean && normalizePhone(i.whatsapp || i.phone) === phoneClean) return true;
    if (placeId && placeId !== 'demo' && i.placeId === placeId) return true;
    if (nameCity && normalizeNameCityKey(i.businessName, i.city) === nameCity) return true;
    return false;
  });

  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const record: ContactHistoryItem = {
    id: existingIndex >= 0 ? items[existingIndex].id : `contact_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    phone: data.phone,
    whatsapp: data.whatsapp || data.phone,
    placeId: data.placeId || '',
    businessName: data.businessName,
    city: data.city,
    state: data.state,
    category: data.category,
    contactedAt: now.toISOString(),
    formattedDate,
    status: data.status || 'contatado',
    channel: data.channel || 'whatsapp',
    notes: data.notes || (existingIndex >= 0 ? items[existingIndex].notes : ''),
    messageSnippet: data.messageSnippet || (existingIndex >= 0 ? items[existingIndex].messageSnippet : ''),
  };

  if (existingIndex >= 0) {
    items[existingIndex] = record;
  } else {
    items.unshift(record); // Adiciona no início da lista
  }

  writeAll(items);
  return record;
}

/**
 * Retorna todos os contatos gravados
 */
export function getAllContactRecords(): ContactHistoryItem[] {
  return readAll();
}

/**
 * Remove um registro da base se necessário
 */
export function deleteContactRecord(idOrPhone: string): boolean {
  const items = readAll();
  const cleanQuery = normalizePhone(idOrPhone);
  const filtered = items.filter(
    (i) => i.id !== idOrPhone && normalizePhone(i.whatsapp || i.phone) !== cleanQuery
  );
  if (filtered.length !== items.length) {
    writeAll(filtered);
    return true;
  }
  return false;
}
