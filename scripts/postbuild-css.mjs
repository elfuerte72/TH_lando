/**
 * Post-build script: downgrade modern CSS for older browsers.
 * Runs Lightning CSS transform on all CSS files in dist/_astro/
 * to convert oklch(), color-mix(), @property, etc. into
 * browser-compatible equivalents.
 */
import { transform } from 'lightningcss';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const targets = browserslistToTargets(
  browserslist('chrome >= 80, safari >= 13, firefox >= 80'),
);

const dir = 'dist/_astro';
const files = readdirSync(dir).filter((f) => f.endsWith('.css'));

for (const file of files) {
  const filePath = join(dir, file);
  const code = readFileSync(filePath);
  const result = transform({
    filename: file,
    code,
    minify: true,
    targets,
  });
  writeFileSync(filePath, result.code);
  console.log(`✓ ${file}: ${code.length} → ${result.code.length} bytes`);
}

console.log(`Processed ${files.length} CSS file(s) for older browser compatibility.`);
