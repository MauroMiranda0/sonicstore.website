export function resolveAssetPath(src) {
  if (!src || !src.startsWith('/')) return src;
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${src.slice(1)}`;
}
