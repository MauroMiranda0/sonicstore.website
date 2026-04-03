# constitution_v2.md — SonicStore
> Versión 2.0 · Actualización de sistema de diseño: lenguaje visual editorial-contundente.
> Cambios respecto a v1: §2.1 tokens de tipografía, §2.2 tokens de forma, §3 principios P3/P5 actualizados.

---

## 1. Identidad de Marca

*(Sin cambios respecto a v1)*

| Atributo | Valor |
|---|---|
| **Nombre** | Sonic Store |
| **Tagline** | Belleza · Moda · Skincare |
| **Categorías** | Cosméticos · Skincare · Cabello · Calzado · Ropa · Lencería · Hogar |
| **Modelo de negocio** | Catálogo multi-marca sin carrito. Captación de leads → WhatsApp → cobro externo |
| **Mercado** | LATAM hispanohablante (México / Argentina) |

### Jerarquía de tono
*(Sin cambios respecto a v1)*

1. **Aspiracional** — Evocar deseo y aspiración sin resultar inaccesible.
2. **Accesible / Familiar** — El cliente debe sentir que puede comprar hoy, no en algún futuro.
3. **Moderno / Minimalista** — Limpieza visual; el producto es el protagonista.
4. **Energético** — Llamadas a la acción con energía; nunca aburridas.

---

## 2. Sistema de Diseño (Design Tokens)

> **PRINCIPIO DE VERSIÓN 2:** El lenguaje de diseño pasa de "beauty suave" a "editorial contundente".
> La paleta de color se mantiene (blush/gold/nude son la identidad de marca).
> Lo que cambia es la **morfología**: sin redondeos, tipografía de peso fuerte, contraste duro.
> Esto produce una estética que combina feminidad de marca con autoridad visual.

### 2.1 Paleta de Color

*(Sin cambios — los tokens de color son estables hasta entrega de logo definitivo)*

```scss
// _tokens.scss
// ── Superficies ──────────────────────────────────────
$surface:    #FCF8F6;
$nude:       #F3E8E2;
$nude-dk:    #E2D2CA;

// ── Tipografía / Tinta ───────────────────────────────
$ink:        #1D1318;
$ink-soft:   #5D4A51;

// ── Acento Primario (Blush) ──────────────────────────
$blush:      #A63B4E;
$blush-dk:   #7E2838;

// ── Acento Secundario (Gold) ─────────────────────────
$gold:       #C68562;
$gold-lt:    #DEAA84;

// ── Neutros ──────────────────────────────────────────
$white:      #FFFFFF;
$wa-green:   #25D366;

// ── Semánticos ───────────────────────────────────────
$color-primary:    $blush;
$color-secondary:  $gold;
$color-background: $surface;
$color-text:       $ink;
$color-text-muted: $ink-soft;
```

### 2.2 Tipografía — ACTUALIZADO v2

**Cambio clave:** Se adopta el patrón serif-de-carácter / sans-utilitario del CSS fuente.
`Kaisei HarunoUmi` reemplaza a `Playfair Display` para headings.
`DM Sans` se mantiene para cuerpo pero pesos cambian a 400/700 (sin 300).

```scss
// ── Fuentes ───────────────────────────────────────────
// Importar en index.html:
// Kaisei HarunoUmi: weights 400, 700
// DM Sans: weights 400, 700
$font-display: 'Kaisei HarunoUmi', Georgia, serif;  // Headings — carácter, no decoración
$font-body:    'DM Sans', Arial, sans-serif;         // Cuerpo — utilitario, sin concesiones

// ── Pesos — ACTUALIZADO v2 ────────────────────────────
// Se elimina el peso 300 (light). Mínimo permitido: 400.
// UI elements (botones, nav links, labels): siempre 700.
$weight-regular: 400;
$weight-bold:    700;

// ── Escala tipográfica ────────────────────────────────
$text-xs:   0.65rem;
$text-sm:   0.8rem;    // ← era 0.75; ajustado para legibilidad en peso 700
$text-base: 0.95rem;
$text-lg:   1rem;      // ← títulos de card: DM Sans 700, no serif
$text-xl:   1.45rem;
$text-hero: clamp(2.6rem, 5.5vw, 5rem);
$text-sec:  clamp(1.7rem, 3.5vw, 2.8rem);

// ── Tamaño de heading aplicado — ACTUALIZADO v2 ───────
// H2 de sección: 3rem fijo (alineado con $h2-font-size del CSS fuente)
// H3 / nombre de marca en cards: 2.6rem máx → usar $text-sec
$h2-size: 3rem;
$h3-size: 2.6rem;
```

### 2.3 Morfología (Shape Tokens) — NUEVO v2

**Este bloque es nuevo.** El CSS fuente establece un lenguaje de forma sin redondeos.
Se aplica a toda la UI de SonicStore como reemplazo del sistema de radios anterior.

```scss
// ── Shape — ACTUALIZADO v2 ────────────────────────────
// REGLA: Radio cero en elementos interactivos y estructurales.
// Excepción única: WaFloat (pill) — es un elemento flotante de acción rápida,
// su forma circular es funcional (indica "botón siempre presente"), no decorativa.

$radius:        0px;    // ← era 6px — botones, inputs, badges
$radius-card:   0px;    // ← era 12px — cards de marca, cards PDF
$radius-pill:   999px;  // Solo para WaFloat

// ── Bordes como estructura ────────────────────────────
// En v2, los bordes reemplazan a las sombras como delimitadores visuales.
// Cards y badges usan border en lugar de box-shadow para separarse del fondo.
$border-subtle:  1px solid $nude-dk;       // Separadores suaves entre secciones
$border-strong:  1px solid $ink-soft;      // Badges de categoría, filtros
$border-accent:  2px solid $blush;         // Hover de cards, elementos activos

// ── Transiciones ─────────────────────────────────────
$transition: 0.25s cubic-bezier(.4,0,.2,1);  // ← era 0.3s; más snappy

// ── Espaciado ─────────────────────────────────────────
$viewport-content:        min(90vw, 1440px);
$section-padding-y:        5.5rem;
$section-padding-y-mobile: 4rem;
$section-padding-x:        2rem;
$section-padding-x-mobile: 1.1rem;
```

---

## 3. Principios de Componentes — ACTUALIZADO v2

### P1 — Componente = Contrato *(sin cambios)*
Todo componente expone una interfaz de props tipada. Ningún componente accede a estado global que no le haya sido pasado explícitamente como prop.

### P2 — Datos en Data Layer, no en JSX *(sin cambios)*
Los datos de marcas, métodos de pago y pasos del proceso viven en archivos `data/`. El JSX solo renderiza.

### P3 — Estilos via SCSS Modules *(actualizado)*
Cada componente tiene su propio `.module.scss`. Los tokens de `_tokens.scss` se importan via `@use`.

**Regla nueva v2:** No se usan `box-shadow` decorativas en cards. Se usan bordes (`$border-subtle`, `$border-strong`) como único mecanismo de delimitación visual. Las sombras quedan reservadas para elementos de elevación real (Navbar scrolled, WaFloat).

### P4 — Accesibilidad Mínima Requerida *(sin cambios)*
- Todos los `<img>` tienen `alt` descriptivo.
- Elementos interactivos sin texto visible tienen `aria-label`.
- Hamburger menu: `aria-expanded` + `aria-controls`.
- Contraste mínimo: 4.5:1 texto normal, 3:1 texto grande (WCAG AA).

### P5 — Tipografía como jerarquía estructural — ACTUALIZADO v2
En v2, el peso tipográfico **es** la jerarquía. Las reglas son:

| Elemento | Fuente | Peso | Notas |
|---|---|---|---|
| H1 Hero | Kaisei HarunoUmi | 700 | Display serif de impacto |
| H2 de sección | Kaisei HarunoUmi | 700 | `font-size: $h2-size` (3rem) |
| Nombre de marca en card | DM Sans | 700 | `$text-lg` — legibilidad en grid denso |
| Body copy / descripción | DM Sans | 400 | `$text-base` |
| Nav links | DM Sans | 700 | `$text-sm` — siempre bold en nav |
| Botones | DM Sans | 700 | Uppercase opcional para CTAs primarios |
| Eyebrows / badges | DM Sans | 700 | `$text-xs`, uppercase, letter-spacing |
| Instructor / metadata | DM Sans | 400 | `$text-sm`, color `$ink-soft` |

### P6 — Grid de Densidad Progresiva — NUEVO v2
El CSS fuente establece un patrón de grid de 5 columnas en desktop para listas de elementos.
SonicStore adopta este principio para `CatalogSection` y `PdfSection`:

```
Mobile  (< 576px):  1 columna
Tablet  (≥ 576px):  2 columnas
Tablet+ (≥ 768px):  3 columnas
Desktop (≥ 992px):  4–5 columnas (según cantidad de marcas disponibles)
```

Esto maximiza la densidad de catálogo visible sin scroll, aumentando la probabilidad de conversión por exposición a marcas.

---

## 4. Secciones y Responsabilidades *(sin cambios estructurales)*

| Sección | ID Anchor | Componente React | Responsabilidad |
|---|---|---|---|
| Navegación | — | `<Navbar>` | Logo, links, hamburger, mobile overlay |
| Hero | — | `<Hero>` | H1, subtítulo, stats, visual flotante |
| Marquee | — | `<MarqueeBar>` | Ticker animado de beneficios |
| Catálogos Online | `#online` | `<CatalogSection>` | Grid denso de brand cards con link a WA |
| Catálogos PDF | `#pdf` | `<PdfSection>` | Grid de PDF cards con CTA a WA |
| Cómo funciona | `#como-funciona` | `<HowItWorks>` | Steps numerados con conector visual |
| Métodos de pago | `#pagos` | `<PaymentSection>` | Cards de métodos de pago |
| CTA WhatsApp | `#pedido` | `<CtaSection>` | Call to action principal |
| Footer | — | `<Footer>` | Logo, links, copyright |
| Botón flotante WA | — | `<WaFloat>` | Acceso rápido a WhatsApp (fixed) |

---

## 5. Canales de Conversión *(sin cambios)*

El sitio tiene **un único punto de conversión**: WhatsApp.

```
https://wa.me/{NUMERO}?text={MENSAJE_CODIFICADO}
```

`WA_NUMBER` definido en `src/config/constants.js`. No se hardcodea en ningún componente.

---

## 6. Restricciones Explícitas — ACTUALIZADO v2

Estas acciones están **prohibidas**:

- ❌ Importar colores como strings literales — usar tokens SCSS
- ❌ Lógica de negocio dentro de archivos `.jsx`
- ❌ Uso de `!important`
- ❌ Estilos globales fuera de `globals.scss` y `_tokens.scss`
- ❌ Componentes con más de una responsabilidad
- ❌ Mezcla de variantes regionales en copy (español neutro)
- ❌ **NUEVO v2:** `border-radius` distinto de `$radius` (0px) en cards y botones
- ❌ **NUEVO v2:** `box-shadow` decorativas en cards — usar `$border-subtle` o `$border-strong`
- ❌ **NUEVO v2:** `font-weight: 300` en cualquier elemento de UI — mínimo 400
- ❌ **NUEVO v2:** Tipografía de display que no sea `Kaisei HarunoUmi`

---

## 7. Control de Cambios

| Versión | Fecha | Cambios |
|---|---|---|
| 1.0 | — | Versión inicial |
| 2.0 | — | Sistema de tipografía (Kaisei HarunoUmi), morfología sin radios, bordes como estructura, grid de densidad progresiva, P5/P6 actualizados |
