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
  // Turbopack конфигурация (пустая, чтобы убрать предупреждение)
  turbopack: {},
};

export default nextConfig;
