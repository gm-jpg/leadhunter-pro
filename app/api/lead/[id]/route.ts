import { NextRequest, NextResponse } from 'next/server';
import { Lead } from '@/types/lead';
import { parseBrazilianPhone } from '@/lib/phone-utils';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leadId = params.id;
    if (!leadId) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBSWVYMG8hi2iK1M5uViY3dhIwmKYo-MF0';

    // Se for um Place ID do Google (como ChIJz_icwOqVNgcRuo0p_BP_RGQ)
    if (leadId.startsWith('ChIJ') || leadId.length > 20) {
      const gRes = await fetch(
        `https://places.googleapis.com/v1/places/${leadId}?fields=id,displayName,formattedAddress,nationalPhoneNumber,rating,userRatingCount,reviews,primaryTypeDisplayName,photos&key=${apiKey}&languageCode=pt-BR`
      );

      if (gRes.ok) {
        const place = await gRes.json();
        const rawPhone = place.nationalPhoneNumber || '';
        const phoneInfo = parseBrazilianPhone(rawPhone);
        const name = place.displayName?.text || 'Estabelecimento Comercial';
        const address = place.formattedAddress || 'Porto Seguro, BA';
        const category = place.primaryTypeDisplayName?.text || 'Restaurante';

        // Extrair fotos reais do Google Places via proxy seguro de CORS
        const photos: string[] = [];
        if (Array.isArray(place.photos)) {
          place.photos.slice(0, 5).forEach((p: any) => {
            if (p.name) {
              photos.push(`/api/place-photo?name=${encodeURIComponent(p.name)}`);
            }
          });
        }

        // Extrair reviews reais
        const reviews = Array.isArray(place.reviews)
          ? place.reviews.slice(0, 4).map((r: any) => ({
              author: r.authorAttribution?.displayName || 'Cliente Google',
              rating: r.rating || 5,
              relativeTime: r.relativePublishTimeDescription || 'recente',
              text: r.originalText?.text || r.text?.text || '',
              sentiment: 'positive' as const,
            }))
          : [];

        const isBahia = address.toLowerCase().includes('ba') || address.toLowerCase().includes('seguro');
        const city = isBahia ? 'Porto Seguro' : 'Brasil';
        const state = isBahia ? 'BA' : 'BR';

        const lead: Lead = {
          id: leadId,
          placeId: leadId,
          name,
          category,
          address,
          city,
          state,
          phoneRaw: rawPhone,
          whatsapp: phoneInfo.internationalWhatsApp || phoneInfo.clean,
          isMobile: phoneInfo.isMobile,
          googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`,
          website: null,
          rating: place.rating || 4.8,
          userRatingsTotal: place.userRatingCount || 20,
          photosCount: photos.length || 5,
          photos,
          reviews,
          opportunityScore: 92,
          opportunityFactors: ['Sem website próprio indexado', 'Demanda reprimida em buscas mobile'],
          status: 'oportunidade',
          createdAt: new Date().toISOString(),
          developerPitch: {
            leadName: name,
            developerName: 'José | Morador & Desenvolvedor em Porto Seguro',
            whatsappMessage: '',
            summaryReason: `A ${name} possui excelente reputação em Porto Seguro com nota ${place.rating || 4.8}★, mas quem pesquisa no Google pelo celular não encontra um site próprio com cardápio e pedido direto.`,
            audit: {
              businessDiagnosis: `Comércio conceituado em ${city} com forte potencial de pedidos diretos.`,
              profileGaps: [],
              customerSentiment: {
                praisedPoints: ['Qualidade comprovada', 'Excelente nota no Google'],
                recurringComplaints: [],
                sentimentSummary: 'Clientes satisfeitos com o atendimento e produtos',
                hasExplicitComplaints: false,
              },
              revenueLeaks: {
                description: 'Clientes em busca de contato rápido no Google acabam sem um canal próprio e direto.',
                estimatedLoss: '',
              },
              tailoredSolutions: [],
              suggestedFee: '',
              potentialClientRevenue: '',
              objectionHandling: [],
            },
            suggestedServices: [],
            visualConcept: {
              headline: name,
              subheadline: `O melhor da gastronomia em ${city}`,
              primaryColor: '#E05A47',
              secondaryColor: '#0F0D0E',
              badge: 'Conceito Exclusivo',
              keyBenefits: [],
              features: [],
              chatbotSample: { customerQuestion: '', botReply: '' },
              revenueProjection: '',
            },
          },
        };

        return NextResponse.json({ lead });
      }
    }

    // Lead de Demonstração Porto Seguro padrão
    const demoLead: Lead = {
      id: leadId,
      placeId: leadId,
      name: 'PortoFino Pizzaria & Restaurante',
      category: 'Pizzaria & Restaurante',
      address: 'Av. Bahia, 158 - Porto Seguro, BA',
      city: 'Porto Seguro',
      state: 'BA',
      phoneRaw: '(73) 98129-2866',
      whatsapp: '5573981292866',
      isMobile: true,
      googleMapsUrl: 'https://maps.google.com/?q=PortoFino+Pizzaria+Porto+Seguro',
      website: null,
      rating: 4.8,
      userRatingsTotal: 173,
      photosCount: 8,
      photos: [
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      ],
      reviews: [
        {
          author: 'Carlos Alberto',
          rating: 5,
          relativeTime: 'há 1 mês',
          text: 'Melhor pizza de Porto Seguro! Massa leve, ambiente muito agradável e atendimento nota 10.',
          sentiment: 'positive',
        },
        {
          author: 'Juliana Costa',
          rating: 5,
          relativeTime: 'há 2 semanas',
          text: 'Comida maravilhosa e muito farta. Sempre que venho a Porto Seguro faço questão de jantar aqui.',
          sentiment: 'positive',
        },
      ],
      opportunityScore: 95,
      opportunityFactors: ['Avaliações excelentes no Google', 'Potencial de reservas diretas sem taxas'],
      status: 'oportunidade',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ lead: demoLead });
  } catch (err: any) {
    console.error('Erro ao buscar lead por ID:', err);
    return NextResponse.json({ error: 'Falha ao recuperar lead' }, { status: 500 });
  }
}
