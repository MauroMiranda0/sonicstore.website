# technical_plan.md — SonicStore
> Versión 1.0 · Plan de migración HTML/CSS → React + SCSS por fases, con criterios de aceptación.

---

## Resumen Ejecutivo

| Ítem | Detalle |
|---|---|
| **Estado actual** | Landing page estática en HTML + CSS vanilla (un único archivo) |
| **Estado objetivo** | Aplicación React con SCSS Modules, datos en capa separada, componentes reutilizables |
| **Motivación** | Escalabilidad (agregar/quitar marcas sin tocar JSX), mantenibilidad, rediseño visual |
| **Duración estimada** | 4–5 semanas (trabajo individual, part-time) |
| **Riesgo principal** | Paridad visual con el diseño original durante la migración |

---

## Prerequisitos

Antes de iniciar la Fase 1, verificar que el entorno cumple:

```bash
# Node.js >= 18
node -v

# Crear proyecto con Vite (recomendado sobre CRA por velocidad y simplicidad)
npm create vite@latest sonicstore -- --template react
cd sonicstore
npm install

# Instalar dependencias de estilos
npm install sass

# Instalar dependencias opcionales (decidir en Fase 3)
# npm install framer-motion   ← solo si se necesita animación JS
```

**Estructura de archivos inicial que debes tener antes de la Fase 2:**
```
sonicstore/
├── src/
│   ├── styles/
│   │   ├── _tokens.scss    ← copiar tokens del HTML original
│   │   └── globals.scss    ← reset + body + html
│   ├── config/
│   │   └── constants.js
│   ├── data/               ← vacío, se completa en Fase 2
│   ├── components/         ← vacío, se completa en Fases 3-4
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── logo.png            ← copiar tu logo aquí
```

---

## Fase 1 — Fundación (Días 1–3)

**Objetivo:** El proyecto compila, los tokens existen, y hay una sola fuente de verdad de configuración.

### Tareas

#### 1.1 Extraer Design Tokens
Copiar los tokens CSS del `:root` del HTML original a `src/styles/_tokens.scss`.

```scss
// ANTES (HTML original):
:root {
  --ink: #1D1318;
  --blush: #A63B4E;
  // ...
}

// DESPUÉS (_tokens.scss):
$ink:   #1D1318;
$blush: #A63B4E;
// ... (ver constitution.md §2.1 para la lista completa)
```

> **Nota:** Cuando entregues el logo definitivo, actualiza aquí la paleta. Solo en este archivo.

#### 1.2 Crear `globals.scss`
Migrar el reset, `html`, `body`, y la animación de grain del HTML original.

```scss
// globals.scss
@use 'tokens' as *;

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  background: $surface;
  color: $ink;
  font-family: $font-body;
  font-weight: 300;
  overflow-x: hidden;
  line-height: 1.6;

  // Grain overlay (migrar el SVG inline del body::after original)
  &::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    background-image: url("data:image/svg+xml,..."); // copiar del original
    opacity: 0.5;
  }
}
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
```

#### 1.3 Crear `constants.js`
Copiar la estructura del §4 de `specification.md`. Reemplazar el número de WhatsApp real.

#### 1.4 Importar Google Fonts
En `index.html` (raíz del proyecto Vite), agregar los `<link>` de preconnect y las fuentes Playfair Display + DM Sans.

### Criterio de Aceptación — Fase 1
- `npm run dev` compila sin errores.
- `App.jsx` renderiza un `<h1>` con el texto "Sonic Store" usando `$font-display` de `_tokens.scss`.
- `constants.js` exporta `buildWaUrl` y produce una URL válida al llamarla.

---

## Fase 2 — Capa de Datos (Días 4–5)

**Objetivo:** Todos los datos de contenido viven en archivos JS, listos para ser consumidos por componentes.

### Tareas

#### 2.1 Completar `brands.js`
Agregar las marcas online faltantes (se tienen 5 en el HTML; el negocio maneja 9–15). Por cada marca nueva:
- Buscar URL del logo oficial.
- Definir `bgColor` que contraste bien con el logo.
- Escribir `waMessage` contextual.

#### 2.2 Completar `pdfCatalogs.js`
Agregar los catálogos PDF restantes siguiendo el tipo `PdfItem`.

#### 2.3 Verificar todos los data files
Los archivos `steps.js`, `paymentMethods.js`, y `marqueeItems.js` pueden copiarse directamente desde `specification.md` §2.3, §2.4, §2.5.

### Criterio de Aceptación — Fase 2
- `brands.js` tiene mínimo 9 entradas con todos los campos del tipo `BrandItem`.
- `console.log(brands)` en el browser no produce `undefined` en ningún campo.
- `buildWaUrl(brands[0].waMessage)` produce una URL funcional de WhatsApp.

---

## Fase 3 — Componentes de Infraestructura (Días 6–9)

**Objetivo:** Los componentes estructurales (Navbar, Footer, WaFloat) funcionan y son responsivos.

### Orden de implementación (prioridad)

```
1. <WaFloat>          ← más simple, valida el patrón de SCSS Modules
2. <MarqueeBar>       ← valida animaciones CSS en SCSS Modules
3. <Navbar>           ← más complejo (estado, scroll listener, mobile overlay)
4. <Footer>           ← simple, pero depende de constants.js
```

### Patrón de migración por componente

Para cada componente, seguir este proceso:

**Paso A — Identificar el CSS del componente en el HTML original**
Buscar el bloque de comentario `/* ═══ NOMBRE ═══ */` en el CSS original.

**Paso B — Crear el SCSS Module**
```scss
// Navbar.module.scss
@use '../../styles/tokens' as *;

.nav {
  position: fixed;
  // ... migrar propiedades CSS
  transition: box-shadow $transition;
}
.scrolled {
  box-shadow: 0 4px 30px rgba(26,23,20,.08);
}
// ... etc
```

**Paso C — Crear el componente JSX**
```jsx
// Navbar.jsx
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';
import { SITE_NAME } from '../../config/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ... resto del componente
}
```

### Criterio de Aceptación — Fase 3
- `<WaFloat>` aparece en la esquina inferior derecha, pulsa, y abre WhatsApp al hacer click.
- `<MarqueeBar>` anima continuamente y pausa en hover.
- `<Navbar>` muestra el logo, los links de navegación, y el hamburger en mobile funciona.
- `<Footer>` renderiza correctamente con el logo y los links.
- En mobile (375px), el nav colapsa al hamburger y el overlay cubre la pantalla.

---

## Fase 4 — Secciones de Contenido (Días 10–16)

**Objetivo:** Todas las secciones visibles de la landing están implementadas y consumen el data layer.

### Orden de implementación

```
1. <PaymentSection>   ← más simple, valida el patrón card con datos
2. <HowItWorks>       ← valida steps con estado hover
3. <PdfSection> + <PdfCard>
4. <CatalogSection> + <BrandCard>
5. <CtaSection>
6. <Hero>             ← más complejo (visual flotante, stats, animaciones)
```

### Notas de migración críticas

#### BrandCard — Logo fallback
El HTML original usa `onerror` inline en el `<img>`. En React esto se traduce al handler `onError`:

```jsx
// ANTES (HTML):
<img src="..." onerror="this.outerHTML='<div>Natura</div>'" />

// DESPUÉS (React):
const [imgError, setImgError] = useState(false);
{!imgError
  ? <img src={brand.logoSrc} alt={brand.logoAlt} onError={() => setImgError(true)} />
  : <div className={styles.logoFallback}>{brand.name}</div>
}
```

#### CatalogSection — Handler de WhatsApp
```jsx
// CatalogSection.jsx
import { buildWaUrl } from '../../config/constants';

function handleCtaClick(waMessage) {
  window.open(buildWaUrl(waMessage), '_blank', 'noopener');
}

// Se pasa como prop a cada BrandCard:
<BrandCard brand={b} onCtaClick={handleCtaClick} key={b.id} />
```

#### Hero — Floating Cards
Las 3 cards flotantes del hero usan las primeras 3 entradas de `brands[]`:

```jsx
// Hero.jsx
import { brands } from '../../data/brands';
const featuredBrands = brands.slice(0, 3);
```

#### Scroll Reveal — Hook personalizado
Reemplazar el `IntersectionObserver` vanilla del HTML original:

```jsx
// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

export function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Uso en componente:
// const revealRef = useScrollReveal();
// <div ref={revealRef} className={`${styles.reveal} ${styles.secHead}`}>
```

### Criterio de Aceptación — Fase 4
- Las secciones online y PDF renderizan todas las marcas desde el data layer.
- Cada card de `Catálogos Online` muestra un producto representativo por marca.
- Cada card de `Catálogos PDF` muestra un producto representativo por marca.
- Agregar una nueva entrada a `brands.js` aparece en la UI sin cambiar ningún JSX.
- El hero renderiza con las animaciones `fadeUp` en el texto y `float` en las cards.
- El scroll reveal funciona en todas las secciones.
- En mobile (375px), todos los grids colapsan a 1 columna.

---

## Fase 5 — Identidad Visual y QA (Días 17–21)

**Objetivo:** Aplicar el nuevo logo y paleta; verificar paridad visual y funcional con el diseño original.

### 5.1 Aplicar nuevo logo
1. Colocar el archivo del logo en `public/logo.png` (reemplazar el placeholder).
2. Verificar que el `<img src="/logo.png">` carga correctamente en Navbar y Footer.
3. Ajustar `width` y `height` del logo en los SCSS Modules si el nuevo logo tiene proporciones distintas.

### 5.2 Definir nueva paleta (pendiente entrega del logo)
Una vez que tengas el logo:
1. Extraer los colores principales del logo.
2. Actualizar `$blush`, `$blush-dk`, `$gold`, `$gold-lt` en `_tokens.scss` para alinear con la paleta del logo.
3. Verificar contraste con herramienta online (ej. contrast-ratio.com) — mínimo 4.5:1 sobre fondos claros.

### 5.3 Checklist de QA Visual

| Elemento | Desktop (1440px) | Tablet (768px) | Mobile (375px) |
|---|---|---|---|
| Navbar fija y con blur | ✓ | ✓ | ✓ |
| Hero grid 2 columnas | ✓ | 1 col | 1 col |
| Marquee continuo | ✓ | ✓ | ✓ |
| Brand cards grid auto-fill | ✓ | ✓ | 1 col |
| PDF cards grid auto-fill | ✓ | ✓ | 1 col |
| Steps con línea conectora | ✓ (4 cols) | — | 1 col |
| Payment cards grid | ✓ | ✓ | 1 col |
| CTA section con watermark | ✓ | ✓ | ✓ |
| WA Float visible | ✓ | ✓ | ✓ |
| Mobile nav overlay | — | ✓ | ✓ |

### 5.4 Checklist de QA Funcional

- [ ] Todos los botones de catálogos online abren WhatsApp con mensaje correcto
- [ ] Todos los botones de catálogos PDF abren WhatsApp con mensaje correcto
- [ ] Botón flotante de WA abre WhatsApp con mensaje genérico
- [ ] CTA section abre WhatsApp con mensaje genérico
- [ ] Links de navegación hacen scroll suave a la sección correcta
- [ ] Mobile nav se cierra al hacer click en un link
- [ ] Logo fallback se muestra cuando la imagen falla al cargar
- [ ] Scroll reveal se activa en todas las secciones al hacer scroll
- [ ] Navbar cambia sombra al hacer scroll

---

## Mapa de Migración CSS → SCSS Modules

| Bloque CSS original (comentario) | Destino en React |
|---|---|
| `/* NAV */` | `Navbar.module.scss` |
| `/* HERO */` | `Hero.module.scss` |
| `/* MARQUEE */` | `MarqueeBar.module.scss` |
| `/* SECTION COMMON */` | `globals.scss` (clases utilitarias compartidas) |
| `/* CATÁLOGOS ONLINE */` | `CatalogSection.module.scss` |
| `/* CATÁLOGOS PDF */` | `PdfSection.module.scss` |
| `/* CÓMO FUNCIONA */` | `HowItWorks.module.scss` |
| `/* PAGOS */` | `PaymentSection.module.scss` |
| `/* CTA WHATSAPP */` | `CtaSection.module.scss` |
| `/* FOOTER */` | `Footer.module.scss` |
| `/* WA FLOAT */` | `WaFloat.module.scss` |
| `/* ANIMATIONS */` | `globals.scss` (keyframes globales) o en cada module |
| `/* RESPONSIVE */` | Distribuido en cada `.module.scss` |

---

## Decisiones de Arquitectura Pendientes

Estos puntos requieren tu decisión antes o durante la Fase 3:

| Decisión | Opción A | Opción B | Recomendación |
|---|---|---|---|
| Animaciones hero | CSS keyframes en SCSS | `framer-motion` | **A** — evitar dependencia extra |
| Gestión de estado del Navbar | `useState` local | Context API | **A** — no hay estado compartido entre componentes |
| Fuente de imágenes de logos | URLs externas (Wikipedia/CDN) | Logos locales en `public/logos/` | **B** a largo plazo — más control y velocidad |
| Deploy | Vercel / Netlify (recomendado para landing estática) | GitHub Pages | **Vercel** — cero configuración con Vite |

---

## Deuda Técnica Identificada en el HTML Original

Estos issues se corrigen durante la migración:

1. **`!important` en `.nav-cta`** — Eliminar; usar especificidad CSS correcta.
2. **Número de WhatsApp hardcodeado** (`5491100000000`) en múltiples lugares — Centralizar en `constants.js`.
3. **`onclick` inline en HTML** — Reemplazar por props `onCtaClick` en componentes.
4. **Mezcla de español rioplatense ("vos") con neutro** — Normalizar todo el copy a español neutro en la capa de datos.
5. **Stat "7+ Marcas"** en el hero no coincide con el catálogo real (9–15) — Actualizar `HERO_STATS` en `constants.js`.
