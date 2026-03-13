import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface iPhoneProps {
  id: number;
  documentId: string;
  modelo: string;
  precio: number;
  almacenamiento: string;
  color: string;
  estado: string;
  descrip: string;
  categoria?: string;
  liberado?: boolean; // <-- AÑADE ESTO (Opcional, porque unos AirPods no están "liberados")
  fotos: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
}

// 2. Usamos la interfaz en la promesa de retorno para asegurar que Next.js sepa qué esperar
// Le añadimos el parámetro "categoria" con valor por defecto undefined
export async function getLatestIphones(limit: number = 4, categoria?: string): Promise<iPhoneProps[]> {
  
  // Construimos los filtros dinámicamente
  const filters: any = {};
  if (categoria) {
    filters.categoria = { $eq: categoria }; // Solo traemos la categoría que pidas
  }

  const query = qs.stringify({
    filters, // Aplicamos el filtro
    populate: {
      fotos: {
        fields: ['url', 'alternativeText'] 
      }
    },
    pagination: {
      limit: limit,
    },
    sort: ['createdAt:desc'],
  }, { encodeValuesOnly: true });

  try {
    const res = await fetch(`${STRAPI_URL}/api/catalogos?${query}`, {
      next: { revalidate: 60 }, 
    });

    if (!res.ok) {
      throw new Error(`Error fetching items: ${res.status}`);
    }

    const data = await res.json();
    return data.data || []; 

  } catch (error) {
    console.error("Error en getLatestIphones:", error);
    return [];
  }
}

export async function getIphoneByDocumentId(documentId: string): Promise<iPhoneProps | null> {
  // Construimos la consulta filtrando por el documentId exacto
  const query = qs.stringify({
    filters: {
      documentId: {
        $eq: documentId,
      },
    },
    populate: {
      fotos: {
        fields: ['url', 'alternativeText'] // Pedimos las fotos para el carrusel
      }
    }
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/catalogos?${query}`, {
      // Usamos revalidación corta. Un producto específico debe estar actualizado.
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Error fetching iPhone: ${res.status}`);
    }

    const data = await res.json();
    
    // Como usamos 'filters', Strapi devuelve un array. 
    // Tomamos el primer elemento, o devolvemos null si el array está vacío (no existe).
    return data.data.length > 0 ? data.data[0] : null;

  } catch (error) {
    console.error("Error en getIphoneByDocumentId:", error);
    return null;
  }
}

export interface PaginatedCatalog {
  data: iPhoneProps[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface FilterParams {
  page?: number;
  search?: string;
}

export async function getFilteredCatalog(params: FilterParams): Promise<PaginatedCatalog> {
  const { page = 1, search } = params;
  const pageSize = 12; // Paginación

  const filters: any = {};

  // Búsqueda insensible a mayúsculas/minúsculas en modelo o descripción
  if (search) {
    filters.$or = [
      { modelo: { $containsi: search } },
      { descrip: { $containsi: search } }
    ];
  }

  const query = qs.stringify({
    filters,
    populate: {
      fotos: {
        fields: ['url', 'alternativeText'] 
      }
    },
    pagination: {
      page,
      pageSize,
    },
    sort: ['createdAt:desc'],
  }, { encodeValuesOnly: true });

  try {
    const res = await fetch(`${STRAPI_URL}/api/catalogos?${query}`, {
      // Si hay parámetros de búsqueda, evitamos la caché estática para tener resultados en tiempo real
      cache: search ? 'no-store' : 'force-cache',
      next: search ? undefined : { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Error en el catálogo: ${res.status}`);
    }

    const json = await res.json();
    return {
      data: json.data || [],
      meta: json.meta || { pagination: { page: 1, pageSize: 12, pageCount: 0, total: 0 } }
    };

  } catch (error) {
    console.error("Falla crítica en getFilteredCatalog:", error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 12, pageCount: 0, total: 0 } }
    };
  }
}