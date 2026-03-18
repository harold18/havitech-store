import { notFound } from "next/navigation";
import { getIphoneByDocumentId, getLatestIphones, iPhoneProps } from "@/services/iphones"; 
import ImageGallery from "@/components/ImageGallery";
import Link from "next/link";
import { getImageUrl } from "@/services/strapi-image"; 
import IphoneCard from "@/components/IphoneCard";

interface Props {
  params: Promise<{
    documentId: string;
  }>;
}

export default async function DetalleIphonePage({ params }: Props) {
  const { documentId } = await params;

  const [iphone, recomendados] = await Promise.all([
    getIphoneByDocumentId(documentId),
    getLatestIphones(4)
  ]);

  if (!iphone) {
    notFound();
  }

  const recomendadosFiltrados = recomendados.filter(
    (item: iPhoneProps) => item.documentId !== iphone.documentId
  ).slice(0, 4);

  const descripLines = iphone.descrip ? iphone.descrip.split('\n') : [];

  // CORRECCIÓN APLICADA AQUÍ: Filtrado estricto de nulos
  const urlsAbsolutas = iphone.fotos && iphone.fotos.length > 0
    ? iphone.fotos.map((foto: { url: string }) => getImageUrl(foto.url)).filter((url): url is string => typeof url === 'string')
    : [];

  const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "";
  const WHATSAPP_MESSAGE = `Hola HaviTech, estoy interesado en comprar el ${iphone.modelo} ${iphone.almacenamiento ? `(${iphone.almacenamiento})` : ''} listado a $${iphone.precio}. ¿Aún está disponible?`;
  const whatsappUrl = WHATSAPP_PHONE 
    ? `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` 
    : "#";

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-8 pb-12 px-4 sm:px-8 flex flex-col items-center justify-center">
      
      {/* Contenedor principal limitado a 4xl */}
      <div className="w-full mb-10 relative max-w-4xl">

        <div className="w-full bg-[#111111] rounded-[2rem] border border-white/5 flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="w-full md:w-1/2 shrink-0 relative">
            <Link 
              href="/#comprar" 
              className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/70 hover:bg-black backdrop-blur-sm border border-white/10 text-white hover:text-white transition-all duration-300 hover:scale-105"
            >
              <span className="material-symbols-outlined text-lg font-bold">close</span>
            </Link>

            <ImageGallery urls={urlsAbsolutas} />
          </div>

          <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
            
            <div className="mb-2 text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                HAVITECH | {iphone.categoria || 'CATÁLOGO'}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
              {iphone.modelo}
            </h1>

            {/* Cuadrícula Dinámica */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              
              <div className="bg-[#181818] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                <span className="text-gray-400 text-xs font-medium">Precio</span> 
                <span className="text-white font-bold text-lg">${iphone.precio}</span>
              </div>
              
              {iphone.almacenamiento && (
                <div className="bg-[#181818] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-medium">Capacidad</span> 
                  <span className="text-white font-medium text-sm md:text-base">{iphone.almacenamiento}</span>
                </div>
              )}
              
              {iphone.color && (
                <div className="bg-[#181818] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-medium">Color</span> 
                  <span className="text-white font-medium text-sm md:text-base">{iphone.color}</span>
                </div>
              )}
              
              {iphone.estado && (
                <div className="bg-[#181818] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-medium">Estado</span> 
                  <span className="text-[#135bec] font-bold text-sm md:text-base">{iphone.estado}</span>
                </div>
              )}
              
              {typeof iphone.liberado === 'boolean' && (
                <div className="bg-[#181818] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-medium">Liberado</span> 
                  <span className={`font-bold text-sm md:text-base ${iphone.liberado ? 'text-green-500' : 'text-red-500'}`}>
                    {iphone.liberado ? 'Sí' : 'No'}
                  </span>
                </div>
              )}
            </div>

            <div className="text-gray-400 text-xs leading-relaxed mb-4 space-y-1 max-h-[90px] overflow-y-auto pr-2">
              {descripLines.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <div className="mt-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full gap-2 cursor-pointer items-center justify-center rounded-2xl h-12 px-4 bg-[#135bec] text-white text-sm font-bold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(19,91,236,0.3)] glow-primary"
              >
                <span className="material-symbols-outlined text-base">shopping_bag</span> 
                Comprar ahora
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Recomendados limitada también a 4xl */}
      {recomendadosFiltrados.length > 0 && (
        <section className="w-full max-w-4xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-white">También te puede interesar</h2>
            <Link href="/catalogo" className="text-sm text-[#135bec] hover:underline">Ver todo →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recomendadosFiltrados.map((item: iPhoneProps) => (
              <IphoneCard key={item.documentId} iphone={item} />
            ))}
          </div>
        </section>
      )}

    </main>
  );
}