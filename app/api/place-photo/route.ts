import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const photoName = searchParams.get('name');

    if (!photoName) {
      return NextResponse.json({ error: 'Parâmetro name é obrigatório' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyBSWVYMG8hi2iK1M5uViY3dhIwmKYo-MF0';
    const googleUrl = `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=800&maxWidthPx=1200&key=${apiKey}`;

    const res = await fetch(googleUrl, { redirect: 'follow' });

    if (!res.ok) {
      return NextResponse.json({ error: 'Falha ao buscar foto no Google' }, { status: res.status });
    }

    const blob = await res.arrayBuffer();
    const contentType = res.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(Buffer.from(blob), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    console.error('Erro no proxy de foto:', err);
    return NextResponse.json({ error: 'Erro interno ao processar foto' }, { status: 500 });
  }
}
