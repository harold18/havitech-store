"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ urls }: { urls: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!urls || urls.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-[4/5] flex items-center justify-center bg-[#050505] text-gray-600 rounded-t-[2rem] md:rounded-tr-none md:rounded-l-[2rem]">
        Sin imagen disponible
      </div>
    );
  }

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % urls.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + urls.length) % urls.length);

  return (
    // AQUÍ ESTÁ EL CAMBIO: Forzamos h-[400px] en móvil y h-[480px] en PC.
    <div className="relative w-full h-[400px] md:h-[480px] bg-[#050505] rounded-t-[2rem] md:rounded-tr-none md:rounded-l-[2rem] overflow-hidden group">
      
      {/* IMAGEN PRINCIPAL */}
      <div className="absolute inset-0 p-4 md:p-8 flex items-center justify-center">
        <Image
          src={urls[currentIndex]}
          alt={`Vista del equipo - ${currentIndex + 1}`}
          fill
          className="object-contain p-2 md:p-4"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* CONTROLES (Solo si hay más de 1 foto) */}
      {urls.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all border border-white/10 md:opacity-0 md:group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/80 backdrop-blur-sm text-white rounded-full transition-all border border-white/10 md:opacity-0 md:group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-sm pl-1">arrow_forward_ios</span>
          </button>

          {/* Puntos Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/40 px-3 py-2 rounded-full backdrop-blur-md border border-white/5">
            {urls.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-[#135bec] w-6" 
                    : "bg-white/40 hover:bg-white w-2"
                }`}
                aria-label={`Ir a la imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}