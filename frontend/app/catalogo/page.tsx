import { getFilteredCatalog } from "@/services/iphones";
import IphoneCard from "@/components/IphoneCard";
import Link from "next/link";

interface Props {
  // En Next.js 15+ los searchParams son una promesa
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogoPage({ searchParams }: Props) {
  // 1. Extraemos los parámetros de la URL
  const params = await searchParams;
  const q = typeof params?.q === 'string' ? params.q : undefined;
  const page = Number(params?.page) || 1;

  // 2. Ejecutamos la búsqueda en el servidor
  const { data: productos, meta } = await getFilteredCatalog({ page, search: q });
  const { pageCount, total } = meta.pagination;

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4 sm:px-8">
      <div className="container mx-auto max-w-6xl">

        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6 text-sm font-medium w-fit"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Volver al inicio
        </Link>
        
        {/* HEADER Y BUSCADOR */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">
              Catálogo
            </h1>
            <p className="text-gray-400 text-sm">
              Mostrando {total} resultado{total !== 1 ? 's' : ''} {q ? `para "${q}"` : 'disponibles'}
            </p>
          </div>

          {/* Formulario Nativo: Actualiza la URL sin necesidad de JavaScript pesado */}
          <form method="GET" action="/catalogo" className="w-full md:w-80 relative">
            <input 
              type="text" 
              name="q" 
              defaultValue={q} 
              placeholder="Buscar por modelo o descrip..." 
              className="w-full h-12 bg-[#111] border border-white/10 rounded-xl pl-4 pr-12 text-white text-sm focus:outline-none focus:border-[#135bec]/50 transition-colors"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
              aria-label="Buscar"
            >
              <span className="material-symbols-outlined text-lg">search</span>
            </button>
            {/* Si ya estamos buscando algo, mostramos un botón para limpiar la búsqueda */}
            {q && (
              <Link 
                href="/catalogo"
                className="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors"
                title="Limpiar búsqueda"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </Link>
            )}
          </form>
        </div>

        {/* GRID DE RESULTADOS */}
        {productos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {productos.map((producto) => (
              <IphoneCard key={producto.documentId} iphone={producto} />
            ))}
          </div>
        ) : (
          <div className="w-full py-20 flex flex-col items-center justify-center bg-[#111] border border-white/5 rounded-2xl">
            <span className="material-symbols-outlined text-4xl text-gray-600 mb-4">search_off</span>
            <h3 className="text-white text-xl font-bold mb-2">No se encontraron resultados</h3>
            <p className="text-gray-500 text-sm mb-6">Intenta buscar con otros términos o limpia los filtros.</p>
            <Link 
              href="/catalogo"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-all border border-white/10"
            >
              Ver todo el catálogo
            </Link>
          </div>
        )}

        {/* CONTROLES DE PAGINACIÓN MATEMÁTICA */}
        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-4">
            {page > 1 ? (
              <Link 
                href={`/catalogo?page=${page - 1}${q ? `&q=${q}` : ''}`}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111] border border-white/10 text-white hover:bg-[#135bec] hover:border-[#135bec] transition-all"
              >
                <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
              </Link>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/5 text-gray-700 cursor-not-allowed">
                <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
              </div>
            )}

            <span className="text-gray-400 text-sm font-medium">
              Página <strong className="text-white">{page}</strong> de {pageCount}
            </span>

            {page < pageCount ? (
              <Link 
                href={`/catalogo?page=${page + 1}${q ? `&q=${q}` : ''}`}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#111] border border-white/10 text-white hover:bg-[#135bec] hover:border-[#135bec] transition-all"
              >
                <span className="material-symbols-outlined text-sm pl-1">arrow_forward_ios</span>
              </Link>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0a0a0a] border border-white/5 text-gray-700 cursor-not-allowed">
                <span className="material-symbols-outlined text-sm pl-1">arrow_forward_ios</span>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}