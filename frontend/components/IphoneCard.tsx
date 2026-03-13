import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/services/strapi-image";
import { iPhoneProps } from "@/services/iphones";

interface IphoneCardProps {
  iphone: iPhoneProps;
}

export default function IphoneCard({ iphone }: IphoneCardProps) {
  const primeraFotoPath = iphone.fotos && iphone.fotos.length > 0 ? iphone.fotos[0].url : null;
  const imageUrl = getImageUrl(primeraFotoPath);

  return (
    // REDUCCIÓN 1: Padding de contenedor (p-6 -> p-4) y bordes menos exagerados (rounded-2xl -> rounded-xl)
    <div className="bg-[#111] border border-white/5 rounded-xl p-4 flex flex-col items-center group shadow-lg hover:border-[#135bec]/30 transition-all duration-300">
      
      {/* REDUCCIÓN 2: Altura de la caja de imagen cortada drásticamente (h-56 -> h-40) */}
      <div className="relative w-full h-40 mb-3 flex items-center justify-center p-2">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={iphone.modelo || "iPhone"}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="text-gray-600 text-xs">Sin imagen</div>
        )}
      </div>

      <div className="text-center w-full mt-auto">
        <span className="text-gray-500 text-[10px] font-mono tracking-widest block mb-1">HAVITECH</span>
        
        {/* REDUCCIÓN 3: Jerarquía tipográfica. Título de text-xl a text-base */}
        <h3 className="text-white text-base font-bold mb-1 truncate pr-2">
          {iphone.modelo}
        </h3>
        
        {/* REDUCCIÓN 4: Precio de text-lg a text-sm para no gritarle al usuario */}
        <p className="text-[#135bec] text-sm font-bold mb-3">${iphone.precio}</p>
        
        {/* REDUCCIÓN 5: Botón más delgado y sutil (h-10 -> h-8) */}
        <Link 
          href={`/catalogo/${iphone.documentId}`}
          className="inline-flex w-full items-center justify-center rounded-lg h-8 px-4 bg-white/5 text-white text-[11px] font-bold transition-all hover:bg-white/10 border border-white/10"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}