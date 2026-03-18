import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get('x-strapi-webhook-secret');
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
    }

    const body = await request.json();
    const { model } = body;

    // Si el cambio viene de la colección 'catalogo'
    if (model === 'catalogo') {
      // @ts-expect-error: Falso positivo de TS
      revalidateTag('catalogo');
      
      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: 'Caché de catálogo destruido exitosamente' 
      });
    }

    return NextResponse.json({ message: 'Modelo no soportado' }, { status: 400 });

  } catch (err) {
    return NextResponse.json({ message: 'Error procesando el webhook', error: err }, { status: 500 });
  }
}