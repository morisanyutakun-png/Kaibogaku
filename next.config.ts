import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Allow common AI-image-generation hosts so users can paste URLs
      // into `src/data/imagery.ts` without further configuration.
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.midjourney.com" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
