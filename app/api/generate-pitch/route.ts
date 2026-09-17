import { NextRequest, NextResponse } from 'next/server';
import { generatePitchForLead } from '@/lib/gemini';
import { buildWhatsAppLink } from '@/lib/phone-utils';
import { supabase } from '@/lib/supabase';
import { Lead } from '@/types/lead';

export async function POST(req: NextRequest) {
  try {
    const {
      lead,
      developerName,
      geminiApiKey,
    }: { lead: Lead; developerName?: string; geminiApiKey?: string } = await req.json();

    if (!lead || !lead.name) {
      return NextResponse.json(
        { error: 'Dados do estabelecimento são obrigatórios.' },
        { status: 400 }
      );
    }

    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    const devName =
      developerName ||
      process.env.NEXT_PUBLIC_DEVELOPER_NAME ||
      'Desenvolvedor Web & Automação';

    // Gerar pitch completo com IA e conceito visual
    const pitch = await generatePitchForLead(lead, baseUrl, devName, geminiApiKey);

    // Gerar link direto do WhatsApp (wa.me)
    const whatsAppLink = lead.whatsapp
      ? buildWhatsAppLink(lead.whatsapp, pitch.whatsappMessage)
      : '';

    // Se o Supabase estiver conectado, salvamos/atualizamos o lead
    if (supabase) {
      try {
        await supabase.from('leads').upsert(
          {
            place_id: lead.placeId || lead.id,
            name: lead.name,
            category: lead.category,
            address: lead.address,
            city: lead.city,
            state: lead.state,
            phone_raw: lead.phoneRaw,
            whatsapp: lead.whatsapp,
            is_mobile: lead.isMobile,
            google_maps_url: lead.googleMapsUrl,
            website: lead.website,
            rating: lead.rating,
            user_ratings_total: lead.userRatingsTotal,
            photos_count: lead.photosCount,
            opportunity_score: lead.opportunityScore,
            opportunity_factors: lead.opportunityFactors,
            developer_pitch: pitch,
            status: 'proposta_pronta',
          },
          { onConflict: 'place_id' }
        );
      } catch (dbErr) {
        console.warn('Erro ao salvar no Supabase (prosseguindo sem bloquear):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      pitch,
      whatsAppLink,
      proposalUrl: `${baseUrl}/proposta/${lead.id}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Falha ao gerar proposta comercial.', details: err.message },
      { status: 500 }
    );
  }
}
