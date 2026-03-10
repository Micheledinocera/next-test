import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Obbligatorio per GitHub Pages
  images: {
    unoptimized: true, // Necessario se usi l'esportazione statica
  },
};

export default nextConfig;
