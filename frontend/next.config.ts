import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // Cualquier proyecto de Strapi Cloud (*.strapiapp.com)
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        port: '',
        pathname: '/**',
      },
      // Strapi local (desarrollo)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
