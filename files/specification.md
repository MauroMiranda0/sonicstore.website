# specification.md — SonicStore
> Versión 1.0 · Contratos de componentes React, estructura de datos y reglas de renderizado.

---

## 1. Estructura del Proyecto

```
src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.module.scss
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.module.scss
│   ├── MarqueeBar/
│   │   ├── MarqueeBar.jsx
│   │   └── MarqueeBar.module.scss
│   ├── CatalogSection/
│   │   ├── CatalogSection.jsx
│   │   ├── BrandCard.jsx
│   │   └── CatalogSection.module.scss
│   ├── PdfSection/
│   │   ├── PdfSection.jsx
│   │   ├── PdfCard.jsx
│   │   └── PdfSection.module.scss
│   ├── HowItWorks/
│   │   ├── HowItWorks.jsx
│   │   └── HowItWorks.module.scss
│   ├── PaymentSection/
│   │   ├── PaymentSection.jsx
│   │   └── PaymentSection.module.scss
│   ├── CtaSection/
│   │   ├── CtaSection.jsx
│   │   └── CtaSection.module.scss
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.scss
│   └── WaFloat/
│       ├── WaFloat.jsx
│       └── WaFloat.module.scss
├── data/
│   ├── brands.js          // Catálogos online
│   ├── pdfCatalogs.js     // Catálogos PDF
│   ├── steps.js           // Pasos "Cómo funciona"
│   ├── paymentMethods.js  // Métodos de pago
│   └── marqueeItems.js    // Textos del ticker
├── config/
│   └── constants.js       // WA_NUMBER, SITE_NAME, etc.
├── styles/
│   ├── _tokens.scss       // Design tokens (ver constitution.md §2)
│   └── globals.scss       // Reset, body, html, scroll behavior
├── App.jsx
└── main.jsx
```

---

## 2. Capa de Datos (`src/data/`)

### 2.1 `brands.js` — Catálogos Online

```js
// Tipo: BrandItem
// {
//   id: string           — slug único, usado como key React
//   name: string         — nombre de la marca
//   category: string     — badge de categoría (ej. "Cosmética Natural")
//   categoryEmoji: string
//   description: string  — 1-2 oraciones
//   logoSrc: string      — URL del logo (relativa o absoluta)
//   logoAlt: string      — texto alternativo accesible
//   bgColor: string      — color de fondo del área del logo (CSS value)
//   productName: string      — nombre del producto representativo
//   productImageSrc: string  — imagen del producto representativo
//   productImageAlt: string  — texto alternativo accesible del producto
//   waMessage: string    — mensaje pre-cargado para WhatsApp (sin encode)
// }

export const brands = [
  {
    id: 'natura',
    name: 'Natura',
    category: 'Cosmética Natural',
    categoryEmoji: '🌿',
    description: 'Productos de belleza sustentables. Perfumes, maquillaje y cuidado corporal.',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Natura_logo.svg/320px-Natura_logo.svg.png',
    logoAlt: 'Logo Natura Cosméticos',
    bgColor: '#f7f2ec',
    waMessage: 'Hola! Me gustaría ver el catálogo de Natura 🌿',
  },
  {
    id: 'lbel',
    name: "L'BEL",
    category: 'Lujo & Premium',
    categoryEmoji: '💎',
    description: 'Alta cosmética francesa. Tratamientos faciales, fragancias y maquillaje de lujo.',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/L%27BEL_logo.png',
    logoAlt: "Logo L'BEL",
    bgColor: '#1a1a2e',
    waMessage: "Hola! Me gustaría ver el catálogo de L'BEL 💄",
  },
  {
    id: 'esika',
    name: 'Ésika',
    category: 'Belleza Vibrante',
    categoryEmoji: '✨',
    description: 'Colores intensos, perfumes únicos y productos para toda la familia.',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/%C3%89sika_logo.svg/320px-%C3%89sika_logo.svg.png',
    logoAlt: 'Logo Ésika',
    bgColor: '#3b0a45',
    waMessage: 'Hola! Me gustaría ver el catálogo de Ésika ✨',
  },
  {
    id: 'cyzone',
    name: 'Cyzone',
    category: 'Tendencias Jóvenes',
    categoryEmoji: '🌟',
    description: 'Maquillaje de tendencia y cuidado personal para la generación joven.',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Cyzone_logo.svg/320px-Cyzone_logo.svg.png',
    logoAlt: 'Logo Cyzone',
    bgColor: '#ff3c6e',
    waMessage: 'Hola! Me gustaría ver el catálogo de Cyzone 🌟',
  },
  {
    id: 'andrea',
    name: 'Andrea',
    category: 'Moda & Calzado',
    categoryEmoji: '👠',
    description: 'Zapatos, ropa y accesorios de moda. Estilo para toda la familia.',
    logoSrc: 'https://mx.andrea.com/cdn/shop/files/Andrea-Logo.png',
    logoAlt: 'Logo Andrea',
    bgColor: '#fff8f0',
    waMessage: 'Hola! Me gustaría ver el catálogo de Andrea 👠',
  },
  // ── SLOTS PENDIENTES (9–15 marcas confirmadas) ──────
  // Agregar los registros restantes siguiendo el mismo tipo BrandItem.
  // Hasta completar el total de marcas del negocio.
];
```

### 2.2 `pdfCatalogs.js` — Catálogos PDF

```js
// Tipo: PdfItem
// {
//   id: string
//   name: string
//   description: string
//   logoSrc: string
//   logoAlt: string
//   bgGradient: string  — valor CSS para background (gradient o color sólido)
//   productName: string      — nombre del producto representativo
//   productImageSrc: string  — imagen del producto representativo
//   productImageAlt: string  — texto alternativo accesible del producto
//   waMessage: string
// }

export const pdfCatalogs = [
  {
    id: 'terramar',
    name: 'Terramar Brands',
    description: 'Belleza de alta tecnología con ingredientes del mar y la naturaleza. Skincare, fragancias y más.',
    logoSrc: 'https://www.terramarbrands.com/static/media/terramar-brands-logo.png',
    logoAlt: 'Logo Terramar Brands',
    bgGradient: 'linear-gradient(135deg, #0a4f7a 0%, #0e7db5 100%)',
    waMessage: 'Hola! Me gustaría recibir el catálogo PDF de Terramar Brands 📄',
  },
  {
    id: 'forever',
    name: 'Forever Living',
    description: 'Productos naturales de Aloe Vera. Suplementos, nutrición y cuidado personal de alta calidad.',
    logoSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Forever_Living_Products_logo.svg/320px-Forever_Living_Products_logo.svg.png',
    logoAlt: 'Logo Forever Living Products',
    bgGradient: 'linear-gradient(135deg, #1a6b2b 0%, #2d9c42 100%)',
    waMessage: 'Hola! Me gustaría recibir el catálogo PDF de Forever Living 📄',
  },
  // ── SLOTS PENDIENTES ────────────────────────────────
];
```

### 2.3 `steps.js` — Cómo funciona

```js
// Tipo: Step
// { id: string, number: string, title: string, description: string }

export const steps = [
  { id: 'step-1', number: '01', title: 'Explorá el catálogo',    description: 'Pedí el catálogo digital o PDF de la marca que te interesa.' },
  { id: 'step-2', number: '02', title: 'Elegí lo que querés',    description: 'Seleccioná productos, talles y cantidades sin apuro.' },
  { id: 'step-3', number: '03', title: 'Escribinos por WhatsApp', description: 'Mandanos tu pedido y coordinamos entrega y pago al instante.' },
  { id: 'step-4', number: '04', title: '¡Listo!',                description: 'Elegís cómo pagar y esperás tu pedido cómodamente.' },
];
```

### 2.4 `paymentMethods.js` — Métodos de pago

```js
// Tipo: PaymentMethod
// { id: string, icon: string, name: string, description: string }

export const paymentMethods = [
  {
    id: 'aplazo',
    icon: '📅',
    name: 'Aplazo',
    description: 'Compra ahora y paga en cuotas sin tarjeta de crédito. Fácil, rápido y seguro.',
  },
  {
    id: 'mercadopago',
    icon: '💳',
    name: 'Mercado Pago',
    description: 'Con o sin tarjeta, en cuotas o al contado. El método de pago más usado de LATAM.',
  },
  {
    id: 'transferencia',
    icon: '📲',
    name: 'Transferencia',
    description: 'Transferencia bancaria directa. Sin comisiones extra, rápido y confiable.',
  },
];
```

### 2.5 `marqueeItems.js` — Ticker

```js
export const marqueeItems = [
  'Catálogos Online',
  'Catálogos en PDF',
  'Pedidos por WhatsApp',
  'Aplazo — Paga en cuotas',
  'Mercado Pago',
  'Transferencia Electrónica',
  'Marcas Premium',
  'Atención Personalizada',
];
// El componente duplica el array internamente para el loop continuo.
```

---

## 3. Contratos de Componentes (Props Interface)

### 3.1 `<Navbar>`

```jsx
// Props: ninguna (consume constants.js internamente)
// Estado interno:
//   - isScrolled: boolean  → agrega clase .scrolled al nav
//   - isMenuOpen: boolean  → controla mobile overlay

// Comportamiento:
// - Scroll listener (passive) → isScrolled
// - Hamburger click → isMenuOpen toggle + overflow:hidden en body
// - Links del mobile nav al hacer click → cierra el overlay
```

### 3.2 `<Hero>`

```jsx
// Props: ninguna (datos estáticos de hero no viven en data layer — son copy de marca)
// Renderiza:
//   - Eyebrow, H1, subtítulo, botones CTA, stats
//   - HeroVisual: 3 floating cards (primeras 3 entradas de brands[])
//
// Nota: HeroVisual puede recibir prop:
//   featuredBrands: BrandItem[]  — slice de brands para las 3 cards flotantes
```

### 3.3 `<MarqueeBar>`

```jsx
// Props:
//   items: string[]   — textos del ticker (desde marqueeItems.js)
//   speed?: number    — duración de la animación en segundos (default: 22)
//
// El componente duplica items internamente para el loop.
// Pausa la animación en hover (via CSS animation-play-state).
```

### 3.4 `<BrandCard>`

```jsx
// Props:
//   brand: BrandItem  — objeto completo del data layer
//   onCtaClick: (waMessage: string) => void  — handler de apertura WA
//
// No abre WhatsApp directamente. Delega al handler del padre.
// Esto permite testear el componente sin side effects.
// Renderiza logo de marca y producto representativo.
```

### 3.5 `<CatalogSection>`

```jsx
// Props:
//   brands: BrandItem[]
//
// Responsabilidades:
//   - Renderiza el encabezado de sección
//   - Mapea brands[] → <BrandCard>
//   - Provee el handler openWhatsApp(message) a cada card
```

### 3.6 `<PdfCard>`

```jsx
// Props:
//   catalog: PdfItem
//   onCtaClick: (waMessage: string) => void
// Renderiza logo de marca y producto representativo.
```

### 3.7 `<PdfSection>`

```jsx
// Props:
//   catalogs: PdfItem[]
```

### 3.8 `<HowItWorks>`

```jsx
// Props:
//   steps: Step[]
```

### 3.9 `<PaymentSection>`

```jsx
// Props:
//   methods: PaymentMethod[]
```

### 3.10 `<CtaSection>`

```jsx
// Props: ninguna (consume WA_NUMBER de constants.js)
// Renderiza el CTA principal con el botón de WhatsApp.
```

### 3.11 `<Footer>`

```jsx
// Props: ninguna
// Consume SITE_NAME, WA_NUMBER de constants.js
// Links de navegación hardcodeados (son chrome de UI, no datos de negocio)
```

### 3.12 `<WaFloat>`

```jsx
// Props: ninguna
// Botón flotante fijo. Consume WA_NUMBER de constants.js.
// Animación pulse via SCSS keyframes.
```

---

## 4. `src/config/constants.js`

```js
export const WA_NUMBER    = '5491100000000'; // ← REEMPLAZAR con número real
export const WA_BASE_URL  = `https://wa.me/${WA_NUMBER}`;
export const SITE_NAME    = 'Sonic Store';
export const SITE_TAGLINE = 'Belleza · Moda · Skincare';

// Helper: genera URL de WhatsApp con mensaje codificado
export const buildWaUrl = (message) =>
  `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;

// Hero stats (actualizables sin tocar JSX)
export const HERO_STATS = [
  { value: '12+',  label: 'Marcas' },
  { value: '300+', label: 'Productos' },
  { value: '3',    label: 'Formas de pago' },
];
```

---

## 5. Utility: `useScrollReveal` Hook

```jsx
// src/hooks/useScrollReveal.js
// Encapsula el IntersectionObserver de reveal de secciones.
// Reemplaza el vanilla JS del HTML original.
//
// Uso:
//   const ref = useScrollReveal();
//   <div ref={ref} className={styles.reveal}>...</div>
//
// Aplica la clase CSS 'in' cuando el elemento entra al viewport.
// Soporta staggered delay via CSS custom property --stagger-index.
```

---

## 6. Reglas de Renderizado

### Logo fallback
Todos los `<img>` de logos deben implementar el patrón de fallback:

```jsx
<img
  src={brand.logoSrc}
  alt={brand.logoAlt}
  onError={(e) => {
    e.target.style.display = 'none';
    e.target.nextElementSibling.style.display = 'flex';
  }}
  loading="lazy"
/>
<div className={styles.logoFallback}>{brand.name}</div>
```

### Apertura de WhatsApp
Toda apertura de WhatsApp usa `buildWaUrl()` de `constants.js` y `window.open` con `'_blank', 'noopener'`.

### Scroll suave
El scroll suave entre secciones se maneja via CSS `scroll-behavior: smooth` en `globals.scss`, no con JavaScript.
