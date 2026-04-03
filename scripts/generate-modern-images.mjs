import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { brands } from '../src/data/brands.js';
import { pdfCatalogs } from '../src/data/pdfCatalogs.js';
import { paymentMethods } from '../src/data/paymentMethods.js';

const PROJECT_ROOT = process.cwd();

const imagePaths = new Set([
  ...brands.map((item) => item.logoSrc),
  ...brands.map((item) => item.productImageSrc),
  ...pdfCatalogs.map((item) => item.logoSrc),
  ...pdfCatalogs.map((item) => item.productImageSrc),
  ...paymentMethods.map((item) => item.icon),
]);

const convertibleExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function toAbsoluteSrc(src) {
  if (!src || !src.startsWith('/')) return null;
  return path.join(PROJECT_ROOT, src.slice(1));
}

async function ensureModernVariants(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!convertibleExtensions.has(ext)) return { generated: 0, skipped: 1 };
  if (!fs.existsSync(filePath)) return { generated: 0, skipped: 1 };

  const base = filePath.slice(0, -ext.length);
  const webpPath = `${base}.webp`;
  const avifPath = `${base}.avif`;

  const input = sharp(filePath, { failOn: 'none' }).withMetadata();

  let generated = 0;

  if (ext !== '.webp') {
    await input.clone().webp({ quality: 92, effort: 6 }).toFile(webpPath);
    generated += 1;
  }

  if (ext !== '.avif') {
    await input.clone().avif({ quality: 68, effort: 7 }).toFile(avifPath);
    generated += 1;
  }

  return { generated, skipped: 0 };
}

async function main() {
  let generated = 0;
  let skipped = 0;

  for (const src of imagePaths) {
    const absolute = toAbsoluteSrc(src);
    if (!absolute) {
      skipped += 1;
      continue;
    }

    const result = await ensureModernVariants(absolute);
    generated += result.generated;
    skipped += result.skipped;
  }

  console.log(`GENERATED:${generated}`);
  console.log(`SKIPPED:${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
