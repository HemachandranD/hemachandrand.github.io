import type { NextConfig } from "next";

// Static export for GitHub Pages: every route is prerendered to
// `out/<route>/index.html`, so no server (and no SPA 404 trick) is needed.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactCompiler: true,
  poweredByHeader: false,
};

export default nextConfig;
