export function resolveAssetPath(src) {
  if (!src || !src.startsWith('/')) return src;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedSrc = src.replace(/^\/public\//, '/');
  if (normalizedSrc.startsWith(normalizedBase)) return normalizedSrc;
  return `${normalizedBase}${normalizedSrc.slice(1)}`;
}
