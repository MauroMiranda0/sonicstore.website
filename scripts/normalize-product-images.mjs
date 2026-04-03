import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { brands } from '../src/data/brands.js';
import { pdfCatalogs } from '../src/data/pdfCatalogs.js';

const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 1000;
const SAFE_ZONE_RATIO = 0.78;
const PRODUCTS_DIR = path.join(process.cwd(), 'img', 'productos');
const OUTPUT_DIR = path.join(process.cwd(), 'img', 'productos_std');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function processImage(filePath, fileName) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.has(ext)) return false;

  const maxInnerWidth = Math.round(TARGET_WIDTH * SAFE_ZONE_RATIO);
  const maxInnerHeight = Math.round(TARGET_HEIGHT * SAFE_ZONE_RATIO);

  const centeredProduct = await sharp(filePath)
    .rotate()
    .resize({
      width: maxInnerWidth,
      height: maxInnerHeight,
      fit: 'inside',
      withoutEnlargement: false,
    })
    .toBuffer();

  let pipeline = sharp({
    create: {
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      channels: 3,
      background: '#ffffff',
    },
  })
    .composite([{ input: centeredProduct, gravity: 'center' }])
    .withMetadata();

  if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: 95, mozjpeg: true, chromaSubsampling: '4:4:4' });
  } else if (ext === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, adaptiveFiltering: true });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: 95, effort: 6 });
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, fileName);
  await pipeline.toFile(outPath);
  return true;
}

async function main() {
  const dataProductPaths = new Set([
    ...brands.map((item) => item.productImageSrc),
    ...pdfCatalogs.map((item) => item.productImageSrc),
  ]);

  const targetFiles = [...dataProductPaths]
    .filter((src) => src.startsWith('/img/productos/'))
    .map((src) => src.replace('/img/productos/', ''));

  const dirEntries = await fs.readdir(PRODUCTS_DIR, { withFileTypes: true });
  const allowed = new Set(targetFiles);

  let processed = 0;
  let skipped = 0;

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  for (const entry of dirEntries) {
    if (!entry.isFile()) {
      skipped += 1;
      continue;
    }

    if (!allowed.has(entry.name)) {
      skipped += 1;
      continue;
    }

    const absolute = path.join(PRODUCTS_DIR, entry.name);
    const didProcess = await processImage(absolute, entry.name);
    if (didProcess) processed += 1;
    else skipped += 1;
  }

  console.log(`PRODUCTS_PROCESSED:${processed}`);
  console.log(`PRODUCTS_SKIPPED:${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
