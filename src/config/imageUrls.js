/**
 * Helper para construir rutas absolutas de imágenes
 * Considera la configuración de "base" en vite.config.js
 */

const getImageUrl = (path) => {
  const basePath = import.meta.env.BASE_URL || '/';
  // Soporta rutas "public/img/..." y las normaliza a "img/..."
  const withoutPublic = path.replace(/^\/?public\//, '');
  const cleanPath = withoutPublic.startsWith('/') ? withoutPublic.slice(1) : withoutPublic;
  return `${basePath}${cleanPath}`;
};

export default getImageUrl;
