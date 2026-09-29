import localFont from "next/font/local";

// Fraunces, for the name in the hero only. Kept out of the shared fonts
// module so it's preloaded on the home page alone. The files are subsets
// holding just the name's letters (all variable axes kept): ~30 KB for both
// styles instead of ~270 KB. Regenerate with `npm run fonts:name` if the
// name changes.
export const FrauncesName = localFont({
  src: [
    { path: "./fonts/fraunces-name-normal.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/fraunces-name-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces-name",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});
