import type { MetadataRoute } from "next";

import { profile, site } from "@/data/portfolio";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: `${profile.shortName}.`,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d0f16",
    theme_color: "#0d0f16",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
