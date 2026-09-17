import { NextRequest, NextResponse } from 'next/server';
import {
  getAllContactRecords,
  saveContactRecord,
  deleteContactRecord,
  getContactRecord,
} from '@/lib/db/contacts-db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const placeId = searchParams.get('placeId');
    const name = searchParams.get('name');
    const city = searchParams.get('city');

    // Se passou parâmetros específicos, faz busca unitária
    if (phone || placeId || (name && city)) {
      const match = getContactRecord({
        phone: phone || undefined,
        placeId: placeId || undefined,
        name: name || undefined,
        city: city || undefined,
      });
      return NextResponse.json({ isContacted: Boolean(match), record: match });
    }

    // Caso contrário, retorna todos os registros
    const all = getAllContactRecords();
    return NextResponse.json({
      contacts: all,
      total: all.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.businessName || (!body.phone && !body.whatsapp)) {
      return NextResponse.json(
        { error: 'Nome do comércio e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    const saved = saveContactRecord({
      phone: body.phone || body.whatsapp,
      whatsapp: body.whatsapp || body.phone,
      placeId: body.placeId,
      businessName: body.businessName,
      city: body.city || 'Não informada',
      state: body.state || 'BR',
      category: body.category || 'Comércio Local',
      status: body.status || 'contatado',
      channel: body.channel || 'whatsapp',
      notes: body.notes,
      messageSnippet: body.messageSnippet,
    });

    return NextResponse.json({
      success: true,
      message: 'Contato registrado na base anti-duplicidade.',
      record: saved,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID ou telefone é obrigatório.' }, { status: 400 });
    }

    const deleted = deleteContactRecord(id);
    return NextResponse.json({ success: deleted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
