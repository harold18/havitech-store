import Image from 'next/image';
import Link from 'next/link';
import { getCatalogoPage } from '@/services/iphones';
import { getImageUrl } from '@/services/strapi-image';

interface Props {
  searchParams: { page?: string };
}

export default async function CatalogoPage({ searchParams }: Props) {
  const page = Number(searchParams.page ?? '1');
  const { data: iphones, pagination } = await getCatalogoPage(page, 9);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <section className="container mx-auto w-full px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Catálogo Completo iPhones
          </h1>
          <p className="text-lg text-slate-600">
            Página {pagination?.page || 1} de {pagination?.pageCount || 1} ({pagination?.total || 0} disponibles)
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {iphones.map((iphone: any) => {
            // Extracción plana para Strapi v5. Se elimina '.attributes'
            const { documentId, id, modelo, precio, almacenamiento, color, estado, fotos } = iphone;
            
            // Las fotos vienen en un arreglo directo, no dentro de '.data'
            const foto = fotos?.[0];
            const imgSrc = getImageUrl(foto?.url) ?? '/placeholder.jpg';

            return (
              <article
                key={documentId || id}
                className="group relative h-full overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <div className="relative mx-auto mt-6 h-48 w-36 overflow-hidden rounded-2xl bg-gray-100 flex justify-center items-center">
                  <Image
                    src={imgSrc}
                    alt={foto?.alternativeText || modelo || 'Imagen del iPhone'}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 px-6 py-4 text-xs text-slate-600">
                  <h3 className="text-lg font-semibold text-slate-800 text-center">
                    {modelo}
                  </h3>
                  <div className="flex justify-between font-bold text-slate-900 mt-2">
                    <span className="text-xl">USD {precio}</span>
                    <span className="text-sm bg-slate-100 px-2 py-1 rounded-md">{almacenamiento}</span>
                  </div>
                  <div className="flex justify-between text-[12px] mt-1 text-slate-500">
                    <span className="capitalize">{color}</span>
                    <span className="capitalize">{estado}</span>
                  </div>

                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE}?text=Hola%20quiero%20el%20${encodeURIComponent(modelo)}%20(${almacenamiento}%2C%20${color})%20USD%20${precio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full rounded-full border border-slate-700 bg-white px-4 py-2.5 text-[12px] font-semibold text-slate-800 hover:bg-slate-900 hover:text-white transition-all group-hover:scale-105 text-center block"
                  >
                    Comprar ahora
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Paginación */}
        {pagination?.pageCount > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-4">
            {pagination.page > 1 && (
              <Link
                href={`/catalogo?page=${pagination.page - 1}`}
                className="rounded-xl bg-white px-6 py-2.5 shadow-md hover:shadow-lg transition-all text-slate-700 font-medium"
              >
                ← Anterior
              </Link>
            )}
            <span className="text-sm text-slate-600 font-medium">
              {pagination.page} de {pagination.pageCount}
            </span>
            {pagination.page < pagination.pageCount && (
              <Link
                href={`/catalogo?page=${pagination.page + 1}`}
                className="rounded-xl bg-white px-6 py-2.5 shadow-md hover:shadow-lg transition-all text-slate-700 font-medium"
              >
                Siguiente →
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  );
}