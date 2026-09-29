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

// Martian Mono sets every piece of "instrument" text: the console,
// logprobs, trace spans, model card, tool call. It's a variable font with a
// width axis; the site uses it slightly condensed (see globals.css). Not
// preloaded, so it never competes with the first paint for bandwidth.
export const MartianMono = localFont({
  src: "../../node_modules/@fontsource-variable/martian-mono/files/martian-mono-latin-standard-normal.woff2",
  variable: "--font-martian-mono",
  weight: "100 800",
  display: "swap",
  preload: false,
  declarations: [{ prop: "font-stretch", value: "75% 112.5%" }],
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Liberation Mono", "Courier New", "monospace"],
});
