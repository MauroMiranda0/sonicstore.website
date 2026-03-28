import { useState } from 'react';
import styles from './CatalogSection.module.scss';

export default function BrandCard({ brand, onCtaClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className={styles.card}>
      <div className={styles.logoSurface} style={{ backgroundColor: brand.bgColor }}>
        {!imgError ? (
          <img src={brand.logoSrc} alt={brand.logoAlt} loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <div className={styles.logoFallback}>{brand.name}</div>
        )}
      </div>

      <span className={styles.badge}>{`${brand.categoryEmoji} ${brand.category}`}</span>
      <h3>{brand.name}</h3>
      <p>{brand.description}</p>
      <button type="button" onClick={() => onCtaClick(brand.waMessage)}>
        Pedir Catálogo
      </button>
    </article>
  );
}