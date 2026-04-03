export const WA_NUMBER = '+527712650312';
export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;
export const SITE_NAME = 'Sonic Store';
export const SITE_TAGLINE = 'Belleza · Moda · Skincare';

export const buildWaUrl = (message) => `${WA_BASE_URL}?text=${encodeURIComponent(message)}`;

export const HERO_STATS = [
  { value: '9+', label: 'Marcas' },
  { value: '300+', label: 'Productos' },
  { value: '3', label: 'Formas de pago' },
];