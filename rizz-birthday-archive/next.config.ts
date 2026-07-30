import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tkdvvizbihmeqjnvjjab.supabase.co",
      },
    ],
  },
};

export default nextConfig;