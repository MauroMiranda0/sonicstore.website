# Sonic Store Website

Landing page en React + Vite para catálogo multimarca (sin carrito) con conversión principal a WhatsApp.

## Stack

- React 19
- Vite 7
- Sass (SCSS Modules)
- Swiper
- Sharp (pipeline de imágenes)

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
npm install
```

## Scripts

```bash
# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Normalizar imágenes de productos al estándar visual (1200x1000, zona segura centrada)
npm run images:normalize-products

# Generar variantes modernas (AVIF/WebP) para imágenes usadas por el data layer
npm run images:modern
```

## Arquitectura

```text
src/
  components/          # UI por sección + componentes comunes
  data/                # Contenido de marcas, catálogos PDF, pagos, etc.
  config/constants.js  # WA_NUMBER, SITE_NAME, buildWaUrl, stats
  styles/              # tokens y estilos globales
scripts/
  normalize-product-images.mjs
  generate-modern-images.mjs
img/
  Marcas/              # logos de marcas
  productos/           # fuente original de productos
  productos_std/       # productos normalizados (6:5, 1200x1000)
```

## Fuente de verdad (v2)

Este repositorio sigue:

- `constitution_v2.md`
- `specification_v2.md`
- `technical_plan_v2.md`

## Conversión a WhatsApp

Toda apertura de WhatsApp se centraliza en:

- `src/config/constants.js`
  - `WA_NUMBER`
  - `buildWaUrl(message)`

Actualiza `WA_NUMBER` para producción.

## Flujo de imágenes (rendimiento + consistencia)

### 1) Estandarizar productos

`npm run images:normalize-products` procesa únicamente las imágenes de producto usadas en `src/data/brands.js` y `src/data/pdfCatalogs.js` y genera archivos en `img/productos_std/` con:

- Relación: `6:5`
- Tamaño: `1200x1000`
- Producto centrado en zona segura (~78%)

### 2) Servir formatos modernos con fallback

`npm run images:modern` genera variantes `AVIF` y `WebP` para imágenes del data layer (productos, logos de marca y métodos de pago).

En UI se usa `src/components/common/SmartImage.jsx`, que renderiza:

1. `AVIF` (si el navegador soporta)
2. `WebP` (si soporta)
3. Fallback al formato original (`PNG`, `JPG/JPEG`, `WEBP` o `SVG`)

## Dónde editar contenido

- Catálogos online: `src/data/brands.js`
- Catálogos PDF: `src/data/pdfCatalogs.js`
- Métodos de pago: `src/data/paymentMethods.js`
- Marquee: `src/data/marqueeItems.js`
- Pasos: `src/data/steps.js`

## Notas de diseño

- Sistema visual editorial v2 (aristas vivas, tipografía Kaisei/DM Sans, bordes estructurales).
- Botón flotante de WhatsApp es la única excepción con forma pill.
- Botones de WhatsApp internos usan estilo verde discreto consistente.

## Checklist rápido antes de publicar

1. Verificar `WA_NUMBER` en `src/config/constants.js`.
2. Ejecutar:
   ```bash
   npm run images:normalize-products
   npm run images:modern
   npm run build
   ```
3. Revisar visual en desktop y mobile.
