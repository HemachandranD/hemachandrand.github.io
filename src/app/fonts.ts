import localFont from "next/font/local";

export { GeistSans } from "geist/font/sans";

// Editorial serif for display type (headlines, names, the model card).
export const InstrumentSerif = localFont({
  src: [
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "../../node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
});

// Geist Mono sets data and labels; it isn't preloaded so it never
// competes with the first paint for bandwidth.
export const GeistMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Liberation Mono", "Courier New", "monospace"],
});
