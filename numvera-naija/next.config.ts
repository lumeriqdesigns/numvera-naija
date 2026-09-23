import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    // Modern formats when the source supports them
    formats: ["image/avif", "image/webp"],

    // Responsive breakpoints used by next/image `sizes`
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache optimized files for 30 days (seconds)
    minimumCacheTTL: 60 * 60 * 24 * 30,

    // Allow common CDNs if you later hotlink logos/photos
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "**.vercel.app" },
      { protocol: "https", hostname: "naijatools.vercel.app" },
    ],

    // SVG in /public can be used with next/image when needed
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Faster production builds / smaller client JS where safe
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
