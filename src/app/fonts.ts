import localFont from "next/font/local";

export { GeistSans } from "geist/font/sans";

// Geist Mono only sets small labels, so it isn't preloaded: it never
// competes with the page's first paint for bandwidth.
export const GeistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Liberation Mono", "Courier New", "monospace"],
});
