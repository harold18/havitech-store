import Image from "next/image";
import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface HeroProps {
  data: {
    id: number;
    // NOMBRES NUEVOS basados en tu captura:
    hero_title: string;
    hero_descrip: string;
    hero_cta_descrip: string;
    hero_image: {
      url: string;
      alternativeText: string;
    } | null;
  };
}

export default function HeroSection({ data }: HeroProps) {
  // Construimos la URL de la imagen
  const imageUrl = data.hero_image ? `${STRAPI_URL}${data.hero_image.url}` : null;

  const renderStyledTitle = (text: string) => {
    if (!text) return null;

    // PASO 1: Dividimos el texto cada vez que encontremos un "<br>"
    const lines = text.split('<br>');

    return lines.map((line, lineIndex) => {
      
      // PASO 2: Dentro de cada línea, buscamos los asteriscos (*) para el color
      const parts = line.split('*');
      const styledLine = parts.map((part, partIndex) => {
        if (partIndex % 2 === 1) {
          // Texto entre asteriscos -> AZUL
          return (
            <span key={partIndex} className="text-[#135bec] text-glow">
              {part}
            </span>
          );
        }
        // Texto normal -> BLANCO
        return part;
      });

      // PASO 3: Devolvemos la línea completa
      // Usamos 'block' para asegurar que cada fragmento ocupe su propia línea
      return (
        <span key={lineIndex} className="block w-full">
          {styledLine}
        </span>
      );
    });
  };

  return (
    <section className="container mx-auto w-full py-25 px-6">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] shadow-[-38px_23px_36px_-32px_rgba(0,0,0,0.1)]">
        {imageUrl && (
          <div
            className="flex min-h-[650px] flex-col justify-center bg-cover bg-[position:80%_center] lg:bg-[position:right_center] bg-no-repeat px-8 lg:px-20"
            style={{
              backgroundImage:
                `linear-gradient(90deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.2) 100%), url('${imageUrl}')`
            }}>
            <div className="container-text max-w-2xl flex flex-col gap-4">
              
              <h1 className="text-white text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter text-center md:text-start">
                {renderStyledTitle(data.hero_title)}
              </h1>

              <p className="text-gray md:text-lg font-medium leading-relaxed max-w-lg text-center md:text-start">
                {data.hero_descrip}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                <Link
                  href="#comprar"
                  className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#135bec] text-white text-base font-bold transition-all hover:scale-105 glow-primary">
                  Comprar ahora
                </Link>
                <Link
                  href="#vender"
                  className="flex min-w-[180px] cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white/10 hover:bg-white/20 text-white text-base font-bold transition-all border border-white/10">
                  Vender ahora
                </Link>
              </div>

              <p className="text-gray-500 text-sm mt-2 italic flex items-center gap-2 text-center md:text-start">
              <span className="material-symbols-outlined text-sm">security</span>
                {data.hero_cta_descrip}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}