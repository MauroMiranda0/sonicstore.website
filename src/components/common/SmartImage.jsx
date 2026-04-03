import { resolveAssetPath } from '../../utils/assets';

const MODERN_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function buildModernSources(src) {
  const dot = src.lastIndexOf('.');
  if (dot === -1) return [];

  const ext = src.slice(dot).toLowerCase();
  if (!MODERN_EXTENSIONS.has(ext)) return [];

  const base = src.slice(0, dot);
  return [
    { type: 'image/avif', srcSet: resolveAssetPath(`${base}.avif`) },
    { type: 'image/webp', srcSet: resolveAssetPath(`${base}.webp`) },
  ];
}

export default function SmartImage({ src, alt, loading = 'lazy', ...imgProps }) {
  const resolvedSrc = resolveAssetPath(src);
  const modernSources = buildModernSources(src);

  if (modernSources.length === 0) {
    return <img src={resolvedSrc} alt={alt} loading={loading} {...imgProps} />;
  }

  return (
    <picture>
      {modernSources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} />
      ))}
      <img src={resolvedSrc} alt={alt} loading={loading} {...imgProps} />
    </picture>
  );
}
