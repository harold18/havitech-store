import Image from "next/image";

import { getHomePageData } from "@/services/strapi";
import HeroSection from "@/components/herosection";
import AboutusSection from "@/components/aboutussection";
import CompraAsistida from "@/components/compra-asistida";
import FaqSection from "@/components/faqsection";

export default async function Home() {
  const strapiData = await getHomePageData();

  if (!strapiData) {
    return <div className="p-10">No hay datos o conexion con Strapi.</div>;
  }

  const { blocks } = strapiData;

  return (
    <main>
      <div style={{ padding: '20px', borderBottom: '1px solid #ccc' }} className="flex justify-between font-medium fixed z-50 inset-0 h-15 bg-white/10">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="font-bold text-xl text-center">HaviTech</h1>
          <li className="flex gap-4">
            <ul>inicio</ul>
            <ul>otra vaina</ul>
            <ul>otra vainaaa</ul>
            <ul>un vainon</ul>
          </li>
        </div>
      </div>

      {/* Renderizado de Bloques */}
      <div className="flex flex-col gap-0">
        {blocks.map((block: any, index: number) => {
          // CREAMOS UNA LLAVE ÚNICA combinando tipo + id
          // Ejemplo: "blocks.hero-section-3" vs "blocks.faq-3"
          const uniqueKey = `${block.__component}-${index}`;

           console.log("Componente detectado:", block.__component);

          switch (block.__component) {
            // CASO 1: Hero Section (Nueva categoría 'blocks')
            case "blocks.hero":
              return <HeroSection key={uniqueKey} data={block} />;
            case "blocks.about-us":
              return <AboutusSection key={uniqueKey} data={block} />;
            case "blocks.compra-asistida":
              return <CompraAsistida key={uniqueKey} data={block} />;
            case "blocks.faq":
              return <FaqSection key={uniqueKey} data={block} />;

            default:
              return <div key={uniqueKey} className="p-4 bg-red-100 text-red-600">Componente desconocido: {block.__component}</div>;
          }
        })}
      </div>
    </main>
  );
}