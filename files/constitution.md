# constitution.md — SonicStore
> Versión 1.0 · Fuente de verdad para identidad, principios de diseño y reglas de componentes.

---

## 1. Identidad de Marca

| Atributo | Valor |
|---|---|
| **Nombre** | Sonic Store |
| **Tagline** | Belleza · Moda · Skincare |
| **Categorías** | Cosméticos · Skincare · Cabello · Calzado · Ropa · Lencería · Hogar |
| **Modelo de negocio** | Catálogo multi-marca sin carrito. Captación de leads → WhatsApp → cobro externo |
| **Mercado** | LATAM hispanohablante (México / Argentina) |

### Jerarquía de tono
El tono de marca opera en capas. En caso de conflicto, la capa superior prevalece:

1. **Aspiracional** — Evocar deseo y aspiración sin resultar inaccesible.
2. **Accesible / Familiar** — El cliente debe sentir que puede comprar hoy, no en algún futuro.
3. **Moderno / Minimalista** — Limpieza visual; el producto es el protagonista.
4. **Energético** — Llamadas a la acción con energía; nunca aburridas.

---

## 2. Sistema de Diseño (Design Tokens)

Estos tokens son la única fuente de verdad de color, tipografía y espaciado. Cualquier valor hardcodeado en un componente es una violación de spec.

### 2.1 Paleta de Color

```scss
// _tokens.scss
// ── Superficies ──────────────────────────────────────
$surface:    #FCF8F6;   // Fondo global
$nude:       #F3E8E2;   // Secciones alternadas / PDF section
$nude-dk:    #E2D2CA;   // Bordes suaves, separadores

// ── Tipografía / Tinta ───────────────────────────────
$ink:        #1D1318;   // Texto principal
$ink-soft:   #5D4A51;   // Texto secundario, descripciones

// ── Acento Primario (Blush) ──────────────────────────
$blush:      #A63B4E;   // CTAs primarios, énfasis
$blush-dk:   #7E2838;   // Hover de CTAs primarios

// ── Acento Secundario (Gold) ─────────────────────────
$gold:       #C68562;   // Eyebrows, badges, marquee
$gold-lt:    #DEAA84;   // Hover de elementos gold

// ── Neutros ──────────────────────────────────────────
$white:      #FFFFFF;   // Cards, superficies elevadas
$wa-green:   #25D366;   // WhatsApp (no modificar — brand color)

// ── Semánticos ───────────────────────────────────────
$color-primary:    $blush;
$color-secondary:  $gold;
$color-background: $surface;
$color-text:       $ink;
$color-text-muted: $ink-soft;
```

> **REGLA:** La paleta nueva se define una vez que el logo sea entregado. Los tokens de color son el único lugar donde se actualiza; los componentes los consumen automáticamente.

### 2.2 Tipografía

```scss
// Fuentes — importar desde Google Fonts en index.html o via @import en globals.scss
$font-display: 'Playfair Display', Georgia, serif;   // Headings, logotipo, nombres de marca
$font-body:    'DM Sans', sans-serif;                // Cuerpo, UI, labels, botones

// Escala tipográfica (rem base = 16px)
$text-xs:   0.65rem;   // Eyebrows, badges, labels uppercase
$text-sm:   0.75rem;   // Botones, nav links, copy secundario
$text-base: 0.95rem;   // Body copy
$text-lg:   1.15rem;   // Card names
$text-xl:   1.45rem;   // Nav logo
$text-hero: clamp(2.6rem, 5.5vw, 5rem);  // H1 hero
$text-sec:  clamp(1.7rem, 3.5vw, 2.8rem); // H2 de sección
```

### 2.3 Espaciado y Layout

```scss
$viewport-content: min(90vw, 1440px);  // Ancho máximo de contenido
$radius:           6px;                 // Radio base de botones
$radius-card:      12px;               // Radio de cards
$transition:       0.3s cubic-bezier(.4,0,.2,1);

// Padding de secciones
$section-padding-y:        5.5rem;
$section-padding-y-mobile: 4rem;
$section-padding-x:        2rem;
$section-padding-x-mobile: 1.1rem;
```

---

## 3. Principios de Componentes

### P1 — Componente = Contrato
Todo componente expone una interfaz de props tipada. Ningún componente accede a estado global que no le haya sido pasado explícitamente como prop.

### P2 — Datos en Data Layer, no en JSX
Los datos de marcas, métodos de pago y pasos del proceso viven en archivos `data/` en formato JSON/JS. El JSX solo renderiza; nunca contiene strings de contenido hardcodeados (excepto UI chrome: labels de navegación, textos de botones fijos).

### P3 — Estilos via SCSS Modules
Cada componente tiene su propio archivo `.module.scss`. Los tokens de `_tokens.scss` se importan via `@use`. No se usan estilos inline salvo para valores dinámicos computados en JavaScript (ej. colores de fondo de cards).

### P4 — Accesibilidad Mínima Requerida
- Todos los `<img>` tienen `alt` descriptivo.
- Todos los elementos interactivos sin texto visible tienen `aria-label`.
- El hamburger menu tiene `aria-expanded` y `aria-controls`.
- Contraste mínimo: 4.5:1 para texto normal, 3:1 para texto grande (WCAG AA).

### P5 — Performance
- Imágenes de logos: `loading="lazy"` excepto logos en el viewport inicial.
- El hero visual (collage flotante) no bloquea el LCP.
- Animaciones CSS-only donde sea posible; `framer-motion` solo para interacciones que requieran lógica JS.

---

## 4. Secciones y Responsabilidades

| Sección | ID Anchor | Componente React | Responsabilidad |
|---|---|---|---|
| Navegación | — | `<Navbar>` | Logo, links, hamburger, mobile overlay |
| Hero | — | `<Hero>` | H1, subtítulo, stats, visual flotante |
| Marquee | — | `<MarqueeBar>` | Ticker animado de beneficios |
| Catálogos Online | `#online` | `<CatalogSection>` | Grid de brand cards con link a WA |
| Catálogos PDF | `#pdf` | `<PdfSection>` | Grid de PDF cards con CTA a WA |
| Cómo funciona | `#como-funciona` | `<HowItWorks>` | Steps numerados con conector visual |
| Métodos de pago | `#pagos` | `<PaymentSection>` | Cards de métodos de pago |
| CTA WhatsApp | `#pedido` | `<CtaSection>` | Call to action principal |
| Footer | — | `<Footer>` | Logo, links, copyright |
| Botón flotante WA | — | `<WaFloat>` | Acceso rápido a WhatsApp (fixed) |

---

## 5. Canales de Conversión

El sitio tiene **un único punto de conversión**: WhatsApp. Toda interacción de usuario que no sea navegación interna debe terminar en una apertura de WhatsApp con un mensaje pre-cargado contextual.

```
https://wa.me/{NUMERO}?text={MENSAJE_CODIFICADO}
```

La constante `WA_NUMBER` se define en `src/config/constants.js`. No se hardcodea en ningún componente.

### Métodos de pago disponibles (a documentar en sección `#pagos`)
- Aplazo (cuotas sin tarjeta)
- MercadoPago (con/sin tarjeta, cuotas o contado)
- Transferencia bancaria electrónica

---

## 6. Restricciones Explícitas

Estas acciones están **prohibidas** en cualquier componente:

- ❌ Importar colores como strings literales (`color: '#A63B4E'`) — usar tokens SCSS
- ❌ Lógica de negocio (datos de marcas, número de WA) dentro de archivos `.jsx`
- ❌ Uso de `!important` en estilos (excepto el patrón existente en `.nav-cta` que será eliminado en la migración)
- ❌ Estilos globales fuera de `globals.scss` y `_tokens.scss`
- ❌ Componentes con más de una responsabilidad (ej. un componente que renderiza Y maneja estado global)
- ❌ Textos de UI en español neutro mezclados con variantes regionales (usar siempre español neutro sin "vos/tú" — actualmente el HTML usa "vos"; esto se normaliza en la migración)

---

## 7. Control de Cambios

Cualquier cambio a este documento requiere:
1. Actualizar la versión en el encabezado.
2. Reflejar el cambio en `specification.md` si afecta la interfaz de un componente.
3. Reflejar el cambio en `technical_plan.md` si afecta el plan de trabajo.
