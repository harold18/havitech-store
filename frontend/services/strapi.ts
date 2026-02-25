import qs from 'qs';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export async function getHomePageData() {
  const query = qs.stringify({
    populate: {
      blocks: {
        // Sintaxis especial de Strapi v5 para Zonas Dinámicas
        on: {
          // AQUÍ ES IMPORTANTE: Debes usar el UID de tu componente.
          // Formato: 'categoria.nombre_componente'
          // Basado en tu imagen anterior, tu categoría es 'Herosection' y el nombre 'hero_section'
          'blocks.hero': {
            populate: '*' // Esto trae la imagen y todos los campos del Hero
          },
          'blocks.about-us': {
            populate: '*'
          },
          'blocks.faq': { 
            populate: '*' 
          }
        },
      },
    },
  });

  try {
    const res = await fetch(`${STRAPI_URL}/api/homepage?${query}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      // Esto nos ayudará a ver el error exacto en la consola del navegador/servidor si falla
      const errorBody = await res.text(); 
      throw new Error(`Error Strapi ${res.status}: ${errorBody}`);
    }

    const data = await res.json();
    return data.data;

  } catch (error) {
    console.error("Error en getHomePageData:", error);
    return null;
  }
}