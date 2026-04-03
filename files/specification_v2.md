# specification_v2.md — SonicStore
> Versión 2.0 · Contratos de componentes actualizados con lenguaje visual editorial-contundente.
> Cambios respecto a v1: Interfaces de SCSS de cada componente, tokens de forma y tipografía aplicados.

---

## 1. Estructura del Proyecto *(sin cambios)*

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
│   ├── brands.js
│   ├── pdfCatalogs.js
│   ├── steps.js
│   ├── paymentMethods.js
│   └── marqueeItems.js
├── config/
│   └── constants.js
├── styles/
│   ├── _tokens.scss       // Design tokens v2 (ver constitution_v2.md §2)
│   └── globals.scss
├── App.jsx
└── main.jsx
```

---

## 2. Capa de Datos (`src/data/`) *(sin cambios de estructura)*

*(Idéntico a specification_v1.md §2. Los datos de marca no cambian con el rediseño.)*

---

## 3. Contratos de Componentes — ACTUALIZADOS v2

Para cada componente se documenta:
- Props (sin cambios funcionales)
- **Reglas de estilo v2** — lo nuevo que aplica el lenguaje visual del CSS fuente

---

### 3.1 `<Navbar>`

**Props:** ninguna (consume `constants.js`)

**Reglas de estilo v2:**
```scss
// Navbar.module.scss
@use '../../styles/tokens' as *;

.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  background: $surface;
  border-bottom: $border-subtle;     // ← v2: borde inferior en lugar de sombra
  transition: border-color $transition, background $transition;
}

.scrolled {
  background: rgba(252, 248, 246, 0.96);
  backdrop-filter: blur(12px);
  border-bottom-color: $nude-dk;     // ← borde se intensifica al hacer scroll
}

// Nav links — peso 700 obligatorio (P5)
.navLink {
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-bold;         // ← 700, no 400
  color: $ink-soft;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color $transition;

  &:hover,
  &.active {
    color: $ink;                     // ← $dark en el CSS fuente = $ink aquí
  }
}

// CTA del nav — botón sin radio
.navCta {
  background: $blush;
  color: $white;
  font-weight: $weight-bold;
  border-radius: $radius;            // ← 0px
  padding: 0.55rem 1.2rem;
  border: 2px solid $blush;
  transition: background $transition, color $transition;

  &:hover {
    background: transparent;
    color: $blush;
  }
}
```

---

### 3.2 `<Hero>`

**Props:** ninguna

**Reglas de estilo v2:**
```scss
// Hero.module.scss
@use '../../styles/tokens' as *;

.hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  padding: $section-padding-y $section-padding-x;
  max-width: $viewport-content;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: $section-padding-y-mobile $section-padding-x-mobile;
  }
}

// Eyebrow — badge de categoría
.eyebrow {
  display: inline-block;
  font-family: $font-body;
  font-size: $text-xs;
  font-weight: $weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: $gold;
  border: $border-strong;            // ← v2: border en lugar de background pill
  border-color: $gold;
  padding: 0.25rem 0.6rem;
  border-radius: $radius;            // ← 0px
  margin-bottom: 1.5rem;
}

// H1 — Kaisei HarunoUmi (P5)
.heroTitle {
  font-family: $font-display;        // ← Kaisei HarunoUmi
  font-size: $text-hero;
  font-weight: $weight-bold;
  line-height: 1.05;
  color: $ink;
  margin-bottom: 1.5rem;
}

// Subtítulo
.heroSubtitle {
  font-family: $font-body;
  font-size: $text-base;
  font-weight: $weight-regular;
  color: $ink-soft;
  max-width: 38ch;
  margin-bottom: 2.5rem;
  line-height: 1.65;
}

// Botones CTA del hero
.heroCta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btnPrimary {
  background: $blush;
  color: $white;
  font-family: $font-body;
  font-weight: $weight-bold;
  font-size: $text-sm;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.85rem 2rem;
  border-radius: $radius;            // ← 0px
  border: 2px solid $blush;
  transition: background $transition, color $transition;

  &:hover {
    background: transparent;
    color: $blush;
  }
}

.btnSecondary {
  background: transparent;
  color: $ink;
  font-family: $font-body;
  font-weight: $weight-bold;
  font-size: $text-sm;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.85rem 2rem;
  border-radius: $radius;            // ← 0px
  border: 2px solid $ink;
  transition: background $transition, color $transition;

  &:hover {
    background: $ink;
    color: $white;
  }
}

// Stats del hero
.stats {
  display: flex;
  gap: 2.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: $border-subtle;        // ← v2: línea horizontal como separador
}

.statValue {
  font-family: $font-display;
  font-size: $text-xl;
  font-weight: $weight-bold;
  color: $blush;
  display: block;
}

.statLabel {
  font-family: $font-body;
  font-size: $text-xs;
  font-weight: $weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $ink-soft;
}
```

---

### 3.3 `<MarqueeBar>`

**Props:** `items: string[]`, `speed?: number`

**Reglas de estilo v2:**
```scss
// MarqueeBar.module.scss
@use '../../styles/tokens' as *;

.marqueeWrapper {
  background: $ink;                  // ← fondo oscuro, alto contraste
  border-top: 2px solid $blush;      // ← acento blush como borde superior
  border-bottom: 2px solid $blush;
  overflow: hidden;
  padding: 0.8rem 0;
}

.marqueeTrack {
  display: flex;
  gap: 0;
  animation: marqueeScroll var(--speed, 22s) linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

.marqueeItem {
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: $white;
  white-space: nowrap;
  padding: 0 2.5rem;

  // Separador entre items
  &::after {
    content: '·';
    margin-left: 2.5rem;
    color: $gold;
  }
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

### 3.4 `<BrandCard>` + `<CatalogSection>`

**Props BrandCard:** `brand: BrandItem`, `onCtaClick: (waMessage: string) => void`
**Props CatalogSection:** `brands: BrandItem[]`

**Reglas de estilo v2 — GRID (P6: Densidad Progresiva):**
```scss
// CatalogSection.module.scss
@use '../../styles/tokens' as *;

.sectionHead {
  margin-bottom: 3rem;
}

.eyebrow {
  // Mismo patrón que Hero.eyebrow — ver §3.2
}

.sectionTitle {
  font-family: $font-display;        // ← Kaisei HarunoUmi
  font-size: $h2-size;               // ← 3rem fijo
  font-weight: $weight-bold;
  color: $ink;
  line-height: 1.1;
}

// Grid de densidad progresiva (P6)
.brandGrid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(-0.5 * 1.5rem);    // gutter propio sin Bootstrap

  .cardSlot {
    flex-shrink: 0;
    padding: 0 calc(0.5 * 1.5rem);
    margin-bottom: 1.5rem;
    width: 100%;                     // mobile: 1 col

    @media (min-width: 576px) {
      width: 50%;                    // 2 cols
    }

    @media (min-width: 768px) {
      width: 33.333%;                // 3 cols
    }

    @media (min-width: 992px) {
      width: 20%;                    // 5 cols — catálogo denso en desktop
    }
  }
}
```

**Reglas de estilo v2 — CARD:**
```scss
// BrandCard dentro de CatalogSection.module.scss

.brandCard {
  background: $white;
  border: $border-subtle;            // ← v2: borde, no sombra
  border-radius: $radius;            // ← 0px
  overflow: hidden;
  transition: border-color $transition, transform $transition;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: $blush;            // ← acento blush en hover
    transform: translateY(-3px);
  }
}

// Área del logo de la marca
.logoArea {
  aspect-ratio: 4/3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--card-bg, $nude); // color de fondo dinámico desde brand.bgColor
  border-bottom: $border-subtle;     // ← v2: línea entre logo y metadata

  img {
    max-width: 7rem;
    max-height: 3.5rem;
    object-fit: contain;
  }
}

// Fallback cuando el logo falla (ver §6 de spec v1)
.logoFallback {
  font-family: $font-display;
  font-size: $text-lg;
  font-weight: $weight-bold;
  color: $ink;
  display: none;                     // controlado por onError en JSX
}

// Cuerpo de la card
.cardBody {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

// Badge de categoría
.categoryBadge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: $font-body;
  font-size: $text-xs;
  font-weight: $weight-bold;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: $gold;
  border: 1px solid $gold;          // ← v2: borde en lugar de background
  border-radius: $radius;           // ← 0px
  padding: 0.15rem 0.4rem;
  align-self: flex-start;
}

// Nombre de la marca
.brandName {
  font-family: $font-body;
  font-size: $text-lg;
  font-weight: $weight-bold;        // ← 700 siempre (P5)
  color: $ink;
  line-height: 1.2;
}

// Descripción
.brandDescription {
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-regular;
  color: $ink-soft;
  font-size: 0.8rem;                // ← alineado con .instructor del CSS fuente
  line-height: 1.45;
  flex: 1;
}

// Botón CTA de la card — sin radio, peso 700
.cardCta {
  margin-top: auto;
  padding-top: 1rem;
  border-top: $border-subtle;       // ← separador antes del CTA

  button {
    width: 100%;
    background: $blush;
    color: $white;
    font-family: $font-body;
    font-weight: $weight-bold;
    font-size: $text-sm;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.65rem 1rem;
    border: none;
    border-radius: $radius;         // ← 0px
    cursor: pointer;
    transition: background $transition;

    &:hover {
      background: $blush-dk;
    }
  }
}
```

---

### 3.5 `<PdfCard>` + `<PdfSection>`

**Props PdfCard:** `catalog: PdfItem`, `onCtaClick: (waMessage: string) => void`
**Props PdfSection:** `catalogs: PdfItem[]`

**Reglas de estilo v2:**
```scss
// PdfSection.module.scss — grid igual que CatalogSection (P6)
// PdfCard sigue el mismo patrón que BrandCard con una diferencia:

.pdfCard {
  // Hereda todo el patrón de BrandCard
  // Diferencia: el área superior muestra el gradiente de fondo del catálogo
  // en lugar de un logo sobre fondo plano

  .logoArea {
    background: var(--card-gradient);  // desde catalog.bgGradient via style prop
    border-bottom: none;               // el gradiente es el separador visual
    aspect-ratio: 3/2;
  }

  // Badge "PDF" distintivo
  .pdfBadge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: $ink;
    color: $white;
    font-family: $font-body;
    font-size: $text-xs;
    font-weight: $weight-bold;
    letter-spacing: 0.1em;
    padding: 0.2rem 0.5rem;
    border-radius: $radius;           // ← 0px
  }
}
```

---

### 3.6 `<HowItWorks>`

**Props:** `steps: Step[]`

**Reglas de estilo v2:**
```scss
// HowItWorks.module.scss
@use '../../styles/tokens' as *;

.stepsGrid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(-0.5 * 1.5rem);

  .stepSlot {
    padding: 0 calc(0.5 * 1.5rem);
    width: 100%;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      width: 50%;
    }

    @media (min-width: 992px) {
      width: 25%;                    // 4 steps en fila en desktop
      margin-bottom: 0;
    }
  }
}

.step {
  border-left: 2px solid $blush;    // ← v2: acento izquierdo en lugar de círculo
  padding-left: 1.25rem;
  height: 100%;
}

// Número del paso — display serif grande
.stepNumber {
  font-family: $font-display;
  font-size: $h3-size;              // ← 2.6rem, alineado con $h3-font-size
  font-weight: $weight-bold;
  color: $nude-dk;                  // ← tono apagado: decorativo, no protagonista
  line-height: 1;
  margin-bottom: 0.75rem;
}

.stepTitle {
  font-family: $font-body;
  font-size: $text-base;
  font-weight: $weight-bold;
  color: $ink;
  margin-bottom: 0.5rem;
}

.stepDescription {
  font-family: $font-body;
  font-size: 0.8rem;
  font-weight: $weight-regular;
  color: $ink-soft;
  line-height: 1.6;
}
```

---

### 3.7 `<PaymentSection>`

**Props:** `methods: PaymentMethod[]`

**Reglas de estilo v2:**
```scss
// PaymentSection.module.scss
@use '../../styles/tokens' as *;

.methodsGrid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 calc(-0.5 * 1.5rem);

  .methodSlot {
    padding: 0 calc(0.5 * 1.5rem);
    width: 100%;
    margin-bottom: 1.5rem;

    @media (min-width: 576px) {
      width: 50%;
    }

    @media (min-width: 992px) {
      width: 33.333%;
    }
  }
}

.methodCard {
  border: $border-subtle;           // ← v2: borde, no sombra
  border-radius: $radius;           // ← 0px
  padding: 2rem 1.5rem;
  height: 100%;
  transition: border-color $transition;

  &:hover {
    border-color: $blush;
  }
}

.methodIcon {
  font-size: 2rem;
  display: block;
  margin-bottom: 1rem;
}

.methodName {
  font-family: $font-body;
  font-size: $text-base;
  font-weight: $weight-bold;        // ← 700
  color: $ink;
  margin-bottom: 0.5rem;
}

.methodDescription {
  font-family: $font-body;
  font-size: 0.8rem;
  font-weight: $weight-regular;
  color: $ink-soft;
  line-height: 1.6;
}
```

---

### 3.8 `<CtaSection>`

**Props:** ninguna

**Reglas de estilo v2:**
```scss
// CtaSection.module.scss
@use '../../styles/tokens' as *;

.cta {
  background: $ink;                 // ← fondo oscuro para el CTA final
  padding: $section-padding-y $section-padding-x;
  text-align: center;
}

.ctaEyebrow {
  // mismo patrón eyebrow — pero en versión invertida
  color: $gold;
  border-color: $gold;
  border-radius: $radius;           // ← 0px
}

.ctaTitle {
  font-family: $font-display;       // ← Kaisei HarunoUmi
  font-size: $text-sec;
  font-weight: $weight-bold;
  color: $white;
  margin: 1.5rem 0;
  max-width: 18ch;
  margin-left: auto;
  margin-right: auto;
}

.ctaBtn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: $wa-green;
  color: $white;
  font-family: $font-body;
  font-weight: $weight-bold;
  font-size: $text-base;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 1rem 2.5rem;
  border-radius: $radius;           // ← 0px
  border: 2px solid $wa-green;
  transition: background $transition, color $transition;

  &:hover {
    background: transparent;
    color: $wa-green;
  }
}
```

---

### 3.9 `<WaFloat>`

**Props:** ninguna

**Reglas de estilo v2:**
```scss
// WaFloat.module.scss
@use '../../styles/tokens' as *;

// EXCEPCIÓN DOCUMENTADA: WaFloat usa border-radius pill.
// Justificación: forma circular = affordance de botón flotante persistente.
// Única excepción al $radius: 0px de v2.

.waFloat {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 1000;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: $radius-pill;      // ← excepción justificada
  background: $wa-green;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  animation: waPulse 2.5s ease-in-out infinite;
  transition: transform $transition;

  &:hover {
    transform: scale(1.1);
  }
}

@keyframes waPulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(37,211,102,.4); }
  50%       { box-shadow: 0 4px 40px rgba(37,211,102,.7); }
}
```

---

### 3.10 `<Footer>`

**Props:** ninguna

**Reglas de estilo v2:**
```scss
// Footer.module.scss
@use '../../styles/tokens' as *;

.footer {
  background: $ink;
  border-top: 2px solid $blush;    // ← acento blush consistente con Marquee
  padding: 3rem $section-padding-x 2rem;
}

.footerGrid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  max-width: $viewport-content;
  margin: 0 auto;
  padding-bottom: 2rem;
  border-bottom: $border-subtle;
  border-bottom-color: rgba(255,255,255,.1);
}

.footerLink {
  font-family: $font-body;
  font-size: $text-sm;
  font-weight: $weight-bold;        // ← 700 en nav del footer también
  color: rgba(255,255,255,.6);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color $transition;

  &:hover {
    color: $white;
  }
}

.copyright {
  font-family: $font-body;
  font-size: $text-xs;
  font-weight: $weight-regular;
  color: rgba(255,255,255,.4);
  text-align: center;
  margin-top: 2rem;
  max-width: $viewport-content;
  margin-left: auto;
  margin-right: auto;
}
```

---

## 4. `src/config/constants.js` *(sin cambios)*

```js
export const WA_NUMBER    = '5491100000000';
export const WA_BASE_URL  = `https://wa.me/${WA_NUMBER}`;
export const SITE_NAME    = 'Sonic Store';
export const SITE_TAGLINE = 'Belleza · Moda · Skincare';

export const buildWaUrl = (message) =>
  `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;

export const HERO_STATS = [
  { value: '12+',  label: 'Marcas' },
  { value: '300+', label: 'Productos' },
  { value: '3',    label: 'Formas de pago' },
];
```

---

## 5. Utility: `useScrollReveal` Hook *(sin cambios)*

*(Idéntico a specification_v1.md §5)*

---

## 6. Reglas de Renderizado *(sin cambios funcionales)*

### Logo fallback
```jsx
const [imgError, setImgError] = useState(false);
{!imgError
  ? <img src={brand.logoSrc} alt={brand.logoAlt} onError={() => setImgError(true)} loading="lazy" />
  : <div className={styles.logoFallback}>{brand.name}</div>
}
```

### Apertura de WhatsApp
Toda apertura usa `buildWaUrl()` + `window.open('_blank', 'noopener')`.

### Scroll suave
Via CSS `scroll-behavior: smooth` en `globals.scss`.

---

## 7. Tabla de Cambios v1 → v2 por Componente

| Componente | Cambio de forma | Cambio tipográfico | Cambio de color/borde |
|---|---|---|---|
| `<Navbar>` | Border-bottom reemplaza sombra | Nav links 700 + uppercase | Borde `$nude-dk` |
| `<Hero>` | Botones aristas vivas (0px) | H1 Kaisei HarunoUmi | Eyebrow con borde gold |
| `<MarqueeBar>` | — | Bold 700 uppercase | Fondo `$ink`, bordes blush |
| `<BrandCard>` | Card sin radio ni sombra | Nombre 700 DM Sans | Borde hover `$blush` |
| `<PdfCard>` | Card sin radio ni sombra | Ídem BrandCard | Badge `$ink` top-right |
| `<HowItWorks>` | Borde-izquierda reemplaza círculo | Número Kaisei `$h3-size` | Acento `$blush` |
| `<PaymentSection>` | Card sin radio ni sombra | Nombre 700 | Borde hover `$blush` |
| `<CtaSection>` | Botón WA aristas vivas | H2 Kaisei HarunoUmi | Fondo `$ink` |
| `<WaFloat>` | Mantiene pill (excepción doc.) | — | Sin cambios |
| `<Footer>` | — | Links 700 uppercase | Borde-top `$blush`, fondo `$ink` |
