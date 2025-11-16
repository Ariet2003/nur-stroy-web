import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
  // Настройки для Vercel
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Включаем Prisma в серверный бандл
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Webpack конфигурация для Prisma
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });
    }
    return config;
  },
};

export default nextConfig;
