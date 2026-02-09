import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Only add the path prefix when building for production (GitHub Pages)
  basePath: isProd ? "/francescalabig-portfolio" : "",
  assetPrefix: isProd ? "/francescalabig-portfolio/" : "",
};

export default nextConfig;
