import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "your-backend-domain.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "your-backend-domain.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "gold-stats.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
