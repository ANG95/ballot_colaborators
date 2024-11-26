import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // serverActions: true, // Habilitar acciones en el servidor
  },
};

export default nextConfig;
