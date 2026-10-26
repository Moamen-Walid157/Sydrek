import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": [
        {
          condition: { path: /[\\/]node_modules[\\/]/ },
          type: "css",
        },
        {
          condition: { not: { path: /[\\/]node_modules[\\/]/ } },
          loaders: ["@tailwindcss/turbopack"],
          as: "*.css",
        },
      ],
    },
  },
};

export default nextConfig;
