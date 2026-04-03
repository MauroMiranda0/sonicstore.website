# technical_plan_v2.md — SonicStore
> Versión 2.0 · Plan de migración actualizado con lenguaje visual editorial-contundente.
> Cambios respecto a v1: Fase 1 actualizada (nuevos tokens), notas de migración CSS en Fase 3/4, tabla de mapping actualizada.

---

## Resumen Ejecutivo *(sin cambios)*

| Ítem | Detalle |
|---|---|
| **Estado actual** | Landing page estática en HTML + CSS vanilla |
| **Estado objetivo** | React + SCSS Modules, datos en capa separada, lenguaje visual v2 |
| **Motivación** | Escalabilidad + rediseño editorial-contundente |
| **Duración estimada** | 4–5 semanas (trabajo individual, part-time) |
| **Riesgo principal** | Paridad visual durante migración + consistencia del nuevo lenguaje de forma |

---

## Prerequisitos *(sin cambios)*

```bash
node -v  # >= 18
npm create vite@latest sonicstore -- --template react
cd sonicstore && npm install
npm install sass
```

---

## Fase 1 — Fundación (Días 1–3) — ACTUALIZADA v2

**Objetivo:** Tokens v2 instalados. El sistema de forma y tipografía nuevo es la única fuente de verdad desde el día 1.

### 1.1 Extraer Design Tokens v2

```scss
// _tokens.scss — VERSIÓN 2 COMPLETA

// ── Paleta (sin cambios de color) ────────────────────
$surface:    #FCF8F6;
$nude:       #F3E8E2;
$nude-dk:    #E2D2CA;
$ink:        #1D1318;
$ink-soft:   #5D4A51;
$blush:      #A63B4E;
$blush-dk:   #7E2838;
$gold:       #C68562;
$gold-lt:    #DEAA84;
$white:      #FFFFFF;
$wa-green:   #25D366;
$color-primary:    $blush;
$color-secondary:  $gold;
$color-background: $surface;
$color-text:       $ink;
$color-text-muted: $ink-soft;

// ── Tipografía v2 ─────────────────────────────────────
$font-display: 'Kaisei HarunoUmi', Georgia, serif;
$font-body:    'DM Sans', Arial, sans-serif;
$weight-regular: 400;
$weight-bold:    700;
$text-xs:   0.65rem;
$text-sm:   0.8rem;
$text-base: 0.95rem;
$text-lg:   1rem;
$text-xl:   1.45rem;
$text-hero: clamp(2.6rem, 5.5vw, 5rem);
$text-sec:  clamp(1.7rem, 3.5vw, 2.8rem);
$h2-size:   3rem;
$h3-size:   2.6rem;

// ── Morfología v2 ─────────────────────────────────────
$radius:      0px;               // botones, inputs, cards, badges
$radius-card: 0px;
$radius-pill: 999px;             // SOLO WaFloat

// ── Bordes v2 ─────────────────────────────────────────
$border-subtle: 1px solid $nude-dk;
$border-strong: 1px solid $ink-soft;
$border-accent: 2px solid $blush;

// ── Spacing y layout ──────────────────────────────────
$viewport-content:        min(90vw, 1440px);
$section-padding-y:        5.5rem;
$section-padding-y-mobile: 4rem;
$section-padding-x:        2rem;
$section-padding-x-mobile: 1.1rem;
$transition: 0.25s cubic-bezier(.4,0,.2,1);
```

### 1.2 Actualizar Google Fonts en `index.html`

```html
<!-- Eliminar: Playfair Display -->
<!-- Agregar: Kaisei HarunoUmi -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Kaisei+HarunoUmi:wght@400;700&display=swap" rel="stylesheet">
```

> **Nota:** `display=swap` garantiza que el texto sea visible durante la carga. Kaisei HarunoUmi tiene menor cobertura de caracteres que Playfair; verificar que los caracteres especiales del catálogo (acentos, ñ) rendericen correctamente.

### 1.3 Crear `globals.scss` v2

```scss
@use 'tokens' as *;

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  background: $surface;
  color: $ink;
  font-family: $font-body;
  font-weight: $weight-regular;    // ← era 300; v2 usa 400 como mínimo
  overflow-x: hidden;
  line-height: 1.6;

  &::after {                       // grain overlay — migrar del HTML original
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    background-image: url("data:image/svg+xml,...");
    opacity: 0.5;
  }
}

img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }

// Animaciones globales (keyframes compartidos)
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
}

// Clase utilitaria de reveal (usada por useScrollReveal hook)
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: calc(var(--stagger-index, 0) * 0.1s);

  &.in {
    opacity: 1;
    transform: none;
  }
}
```

### Criterio de Aceptación — Fase 1 (v2)
- `npm run dev` compila sin errores.
- `App.jsx` renderiza un `<h1>` con texto "Sonic Store" en `Kaisei HarunoUmi`.
- Un botón de prueba renderiza con `border-radius: 0`.
- `constants.js` exporta `buildWaUrl` y produce URL válida.

---

## Fase 2 — Capa de Datos (Días 4–5) *(sin cambios)*

*(Idéntico a technical_plan_v1.md §Fase 2. Los datos de marca son independientes del sistema de diseño.)*

**Criterio de Aceptación:** `brands.js` tiene mínimo 9 entradas. `buildWaUrl(brands[0].waMessage)` produce URL funcional.

---

## Fase 3 — Componentes de Infraestructura (Días 6–9) — NOTAS v2

**Orden de implementación:** igual que v1 (`WaFloat → MarqueeBar → Navbar → Footer`)

### Nota crítica v2 para Navbar

Al migrar el CSS de `.nav` del HTML original, **reemplazar** estas propiedades:

```scss
// ANTES (HTML original — eliminar):
border-bottom: none;
box-shadow: 0 4px 30px rgba(26,23,20,.08);  // en .scrolled

// DESPUÉS (v2):
border-bottom: $border-subtle;
// .scrolled: intensificar borde, NO agregar sombra
border-bottom-color: $nude-dk;
backdrop-filter: blur(12px);
```

### Nota crítica v2 para MarqueeBar

```scss
// ANTES (HTML original — probable):
background: $nude;
color: $ink;

// DESPUÉS (v2): inversión de contraste para separación visual
background: $ink;
color: $white;
border-top: 2px solid $blush;
border-bottom: 2px solid $blush;
```

### Criterio de Aceptación — Fase 3 (v2)
- `<WaFloat>` pulsa y abre WhatsApp. Es el **único** elemento con `border-radius` > 0.
- `<MarqueeBar>` tiene fondo `$ink` con bordes blush. Pausa en hover.
- `<Navbar>` usa border-bottom como delimitador, no sombra. Nav links en 700/uppercase.
- `<Footer>` tiene fondo `$ink` y borde-top blush.

---

## Fase 4 — Secciones de Contenido (Días 10–16) — NOTAS v2

**Orden de implementación:** igual que v1 (`PaymentSection → HowItWorks → PdfSection → CatalogSection → CtaSection → Hero`)

### Nota crítica v2 — BrandCard: sin border-radius, sin box-shadow

```jsx
// El estilo inline sigue siendo necesario para bgColor dinámico:
<div
  className={styles.logoArea}
  style={{ '--card-bg': brand.bgColor }}
>
```

```scss
// PROHIBIDO en BrandCard.module.scss:
border-radius: 12px;   // ← era el valor de v1
box-shadow: 0 4px 20px rgba(...);

// CORRECTO v2:
border-radius: 0;
border: $border-subtle;
// hover: border-color: $blush (no sombra)
```

### Nota crítica v2 — HowItWorks: border-left reemplaza círculos numerados

```scss
// ANTES (HTML original — probable):
.stepNumber {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;         // círculo
  background: $blush;
  color: $white;
  // ...
}

// DESPUÉS (v2):
.step {
  border-left: 2px solid $blush;
  padding-left: 1.25rem;
}
.stepNumber {
  font-family: $font-display;   // Kaisei HarunoUmi
  font-size: $h3-size;          // 2.6rem
  color: $nude-dk;              // decorativo, no protagonista
}
```

### Nota crítica v2 — Grid de densidad (P6)

```scss
// CatalogSection y PdfSection — aplicar en ambas:
// Desktop (≥ 992px): width: 20% → 5 columnas
// Tablet (≥ 768px):  width: 33.333% → 3 columnas
// Mobile (≥ 576px):  width: 50% → 2 columnas
// Mobile (<576px):   width: 100% → 1 columna
```

### Criterio de Aceptación — Fase 4 (v2)
- Ninguna card en el proyecto tiene `border-radius` > 0 (excepto WaFloat).
- Ninguna card usa `box-shadow` decorativa.
- El grid de catálogos muestra 5 columnas en desktop (≥ 992px).
- H1 del hero renderiza en Kaisei HarunoUmi.
- HowItWorks muestra border-left blush, sin círculos.
- Todos los botones tienen aristas vivas.

---

## Fase 5 — Identidad Visual y QA (Días 17–21) — ACTUALIZADA v2

### 5.1 Aplicar nuevo logo *(sin cambios)*
`public/logo.png` → verificar proporciones en Navbar y Footer.

### 5.2 Actualizar paleta *(sin cambios)*
Al recibir el logo, actualizar solo `_tokens.scss`.

### 5.3 Checklist de QA Visual v2

| Elemento | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| Navbar: border-bottom (no sombra) | ✓ | ✓ | ✓ |
| Hero H1 en Kaisei HarunoUmi | ✓ | ✓ | ✓ |
| Botones con aristas vivas (0px) | ✓ | ✓ | ✓ |
| Marquee: fondo ink, bordes blush | ✓ | ✓ | ✓ |
| Brand cards: borde, no sombra | ✓ | ✓ | ✓ |
| Brand grid: 5 cols en desktop | ✓ | 3 cols | 1 col |
| PDF grid: 5 cols en desktop | ✓ | 3 cols | 1 col |
| HowItWorks: border-left, no círculo | ✓ | ✓ | ✓ |
| Footer: fondo ink, borde blush | ✓ | ✓ | ✓ |
| WaFloat: única excepción pill | ✓ | ✓ | ✓ |
| Nav links: peso 700 + uppercase | ✓ | ✓ | ✓ |

### 5.4 Checklist de QA Funcional *(sin cambios)*
- [ ] Catálogos online → WhatsApp con mensaje correcto
- [ ] Catálogos PDF → WhatsApp con mensaje correcto
- [ ] WaFloat → WhatsApp mensaje genérico
- [ ] CTA section → WhatsApp mensaje genérico
- [ ] Links de nav → scroll suave a sección
- [ ] Mobile nav se cierra al hacer click
- [ ] Logo fallback al fallar imagen
- [ ] Scroll reveal en todas las secciones
- [ ] Navbar border-bottom se intensifica en scroll

---

## Mapa de Migración CSS → SCSS Modules v2

| Bloque CSS original | Destino React | Cambio v2 clave |
|---|---|---|
| `/* NAV */` | `Navbar.module.scss` | Border-bottom reemplaza sombra |
| `/* HERO */` | `Hero.module.scss` | Kaisei HarunoUmi, botones 0px |
| `/* MARQUEE */` | `MarqueeBar.module.scss` | Fondo ink, bordes blush |
| `/* SECTION COMMON */` | `globals.scss` | `.reveal` utility class |
| `/* CATÁLOGOS ONLINE */` | `CatalogSection.module.scss` | Grid 5col, cards sin radio |
| `/* CATÁLOGOS PDF */` | `PdfSection.module.scss` | Ídem CatalogSection |
| `/* CÓMO FUNCIONA */` | `HowItWorks.module.scss` | Border-left, número serif grande |
| `/* PAGOS */` | `PaymentSection.module.scss` | Cards sin radio |
| `/* CTA WHATSAPP */` | `CtaSection.module.scss` | Fondo ink, botón 0px |
| `/* FOOTER */` | `Footer.module.scss` | Fondo ink, borde blush |
| `/* WA FLOAT */` | `WaFloat.module.scss` | Mantiene pill (excepción) |
| `/* ANIMATIONS */` | `globals.scss` | fadeUp, float, waPulse |
| `/* RESPONSIVE */` | En cada `.module.scss` | Grid 5/3/2/1 cols |

---

## Decisiones de Arquitectura — ACTUALIZADO v2

| Decisión | Opción A | Opción B | Decisión v2 |
|---|---|---|---|
| Animaciones hero | CSS keyframes | `framer-motion` | **A** — sin dependencia extra |
| Estado Navbar | `useState` local | Context API | **A** |
| Fuente de logos | URLs externas | Logos en `public/logos/` | **B** a largo plazo |
| Deploy | Vercel | GitHub Pages | **Vercel** |
| Tipografía display | Playfair Display | Kaisei HarunoUmi | **B** — adoptado en v2 |
| Cards | Sombra + radio | Borde + arista viva | **B** — adoptado en v2 |
| Grid catálogos | 3-4 cols desktop | 5 cols desktop | **B** — densidad progresiva v2 |

---

## Deuda Técnica — ACTUALIZADO v2

*(Items de v1 más nuevos específicos del rediseño)*

1. **`!important` en `.nav-cta`** — Eliminar en migración.
2. **Número WA hardcodeado** — Centralizar en `constants.js`.
3. **`onclick` inline** — Reemplazar por props `onCtaClick`.
4. **Mezcla español rioplatense/neutro** — Normalizar en capa de datos.
5. **Stat "7+ Marcas"** — Actualizar en `HERO_STATS`.
6. **NUEVO v2:** Verificar cobertura de caracteres de Kaisei HarunoUmi para ñ y tildes en todos los textos del catálogo.
7. **NUEVO v2:** Auditar contraste de `$ink-soft` (#5D4A51) sobre `$white` (#FFF) — puede caer por debajo de 4.5:1 en elementos de cuerpo pequeño. Si falla, usar `$ink` directo.
