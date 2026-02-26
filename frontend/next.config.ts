import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // 1. Permiso para Strapi en la Nube (Producción)
      {
        protocol: 'https',
        hostname: 'superb-renewal-b5a5e75381.strapiapp.com', 
        port: '',
        pathname: '/**',
      },
      // 2. Permiso para Strapi Local (Desarrollo)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // El puerto de tu Strapi local
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
