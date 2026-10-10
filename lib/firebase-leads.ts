import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from './firebase';
import { Lead, ContactHistoryItem } from '@/types/lead';

const LEADS_COLLECTION = 'leads';
const CONTACTS_COLLECTION = 'contacts';

/**
 * Busca todos os leads persistidos no Firebase Firestore
 */
export async function fetchLeadsFromFirebase(): Promise<Lead[]> {
  try {
    const colRef = collection(db, LEADS_COLLECTION);
    const snap = await getDocs(colRef);
    if (snap.empty) return [];

    const list: Lead[] = [];
    snap.forEach((d) => {
      list.push(d.data() as Lead);
    });
    return list;
  } catch (err) {
    console.warn('[Firebase] Erro ao buscar leads no Firestore:', err);
    return [];
  }
}

/**
 * Salva ou atualiza um lead especifico no Firebase Firestore
 */
export async function syncLeadToFirebase(lead: Lead): Promise<boolean> {
  try {
    const docRef = doc(db, LEADS_COLLECTION, lead.id);
    await setDoc(docRef, lead, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase] Erro ao salvar lead:', err);
    return false;
  }
}

/**
 * Salva em lote varios leads no Firestore
 */
export async function syncBatchLeadsToFirebase(leads: Lead[]): Promise<void> {
  try {
    const promises = leads.map((l) => syncLeadToFirebase(l));
    await Promise.all(promises);
  } catch (err) {
    console.warn('[Firebase] Erro na sincronizacao em lote:', err);
  }
}

/**
 * Registra um contato no historico do Firebase Firestore
 */
export async function saveContactToFirebase(contact: ContactHistoryItem): Promise<boolean> {
  try {
    const docId = contact.id || `${contact.phone || 'lead'}_${Date.now()}`;
    const docRef = doc(db, CONTACTS_COLLECTION, docId);
    await setDoc(docRef, contact, { merge: true });
    return true;
  } catch (err) {
    console.warn('[Firebase] Erro ao salvar contato:', err);
    return false;
  }
}

/**
 * Busca o historico de contatos no Firebase Firestore
 */
export async function fetchContactsFromFirebase(): Promise<ContactHistoryItem[]> {
  try {
    const colRef = collection(db, CONTACTS_COLLECTION);
    const q = query(colRef, orderBy('contactedAt', 'desc'), limit(100));
    const snap = await getDocs(q);
    const list: ContactHistoryItem[] = [];
    snap.forEach((d) => {
      list.push(d.data() as ContactHistoryItem);
    });
    return list;
  } catch (err) {
    console.warn('[Firebase] Erro ao buscar contatos:', err);
    return [];
  }
}
