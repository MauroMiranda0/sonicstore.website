/**
 * Helper para construir rutas absolutas de imágenes
 * Considera la configuración de "base" en vite.config.js
 */

const getImageUrl = (path) => {
  const basePath = import.meta.env.BASE_URL || '/';
  // Eliminar la barra inicial si existe para evitar duplicados
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${basePath}${cleanPath}`;
};

export default getImageUrl;
