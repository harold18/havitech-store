import Image from "next/image";
import Link from "next/link";
import { getLatestIphones } from "@/services/iphones";
import { getImageUrl } from "@/services/strapi-image";

// Ajusta esta interfaz según los campos exactos que le pusiste a tu componente "catalogo" en Strapi
interface CatalogoHeroProps {
  data: {
    id: number;
    titulo: string; // Cambia esto si en Strapi lo llamaste diferente
    descrip: string; // Cambia esto si en Strapi lo llamaste diferente
  };
}

export default async function CatalogoHero({ data }: CatalogoHeroProps) {
  // 1. Traemos los 4 iPhones más recientes (gracias a la función que ya probamos)
  const iphones = await getLatestIphones(4, 'iphone');

  return (
    <section id="comprar" className="container mx-auto w-full py-20 px-6">
      {/* 2. Renderizamos el contexto del bloque (Textos administrables desde Strapi) */}
      <div className="mb-12 flex flex-col items-center text-center md:text-start md:items-start">
        <h2 className="text-4xl font-extrabold text-white mb-4">
          {data.titulo || "Nuestro Catálogo"}
        </h2>
        <p className="text-gray-400 max-w-2xl">
          {data.descrip || "Equipos revisados y garantizados por HaviTech."}
        </p>
      </div>

      {/* 3. Renderizamos el Grid con los iPhones de la Collection Type */}
      <div className="flex justify-center gap-6 items-center w-full flex-wrap">
        {iphones.map((iphone) => {
          // Extraemos la URL de la primera foto. Si el array está vacío, evitamos que se rompa.
          const primeraFotoPath = iphone.fotos && iphone.fotos.length > 0 ? iphone.fotos[0].url : null;
          
          // Pasamos la ruta relativa por tu helper para tener la URL absoluta
          const imageUrl = getImageUrl(primeraFotoPath);

          return (
            <Link
              key={iphone.id}
              href={`/catalogo/${iphone.documentId}`}
              className="flex flex-col bg-[#111111] border border-white/10 rounded-2xl p-5 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Contenedor de la Imagen */}
              <div className="relative w-65 h-56 mb-4 bg-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={iphone.modelo}
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                ) : (
                  <div className="text-gray-600 text-sm">Sin imagen</div>
                )}
                <div className="absolute top-3 right-3 bg-[#135bec] text-white text-xs font-bold px-2 py-1 rounded-md">
                  {iphone.estado}
                </div>
              </div>

              {/* Información del Equipo */}
              <div className="flex flex-col">
                <h3 className="text-white text-xl font-bold mb-1">{iphone.modelo}</h3>
                <div className="flex gap-2 text-sm text-gray-400 mb-4">
                  <span>{iphone.almacenamiento}</span>
                  <span>•</span>
                  <span>{iphone.color}</span>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-white">
                    ${iphone.precio}
                  </span>
                  <span className="text-[#135bec] text-sm font-bold hover:underline">
                    Ver detalles
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {/* Botón para ir al catálogo completo (el archivo aparte que mencionaste al inicio) */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/catalogo"
          className="flex items-center justify-center rounded-xl h-12 px-8 bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all border border-white/10"
        >
          Ver toda la mercancia
        </Link>
      </div>
    </section>
  );
}