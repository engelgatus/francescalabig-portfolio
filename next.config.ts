import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // <=== Enables static export
  images: {
    unoptimized: true, // <=== Required for GitHub Pages
  },
  // IMPORTANT: This assumes your repo name is EXACTLY 'francescalabig-portfolio'
  // If you deploy to a custom domain later, remove this line.
  basePath: process.env.NODE_ENV === 'production' ? '/francescalabig-portfolio' : '',
};

export default nextConfig;
