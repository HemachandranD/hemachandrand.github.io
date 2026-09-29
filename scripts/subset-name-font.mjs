// Fraunces is only used for the name in the hero, so ship just those glyphs
// (all variable axes kept). Re-run after changing the name:
//   npm run fonts:name
import { readFile, writeFile } from "node:fs/promises";
import subsetFont from "subset-font";

const NAME = "Hemachandran Dhinakaran";
const src = "node_modules/@fontsource-variable/fraunces/files";
const out = "src/app/fonts";
// (loaded by src/app/name-font.ts)

for (const style of ["normal", "italic"]) {
  const input = await readFile(`${src}/fraunces-latin-full-${style}.woff2`);
  const subset = await subsetFont(input, NAME, { targetFormat: "woff2", preserveNameIds: [0, 1, 2, 3, 4, 5, 6] });
  await writeFile(`${out}/fraunces-name-${style}.woff2`, subset);
  console.log(`fraunces-name-${style}.woff2: ${(input.length / 1024).toFixed(0)} KB → ${(subset.length / 1024).toFixed(1)} KB`);
}
