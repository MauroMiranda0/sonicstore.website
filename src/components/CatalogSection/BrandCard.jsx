import { useState } from 'react';
import styles from './CatalogSection.module.scss';

export default function BrandCard({ brand, onCtaClick }) {
  const [imgError, setImgError] = useState(false);
  const [productImgError, setProductImgError] = useState(false);

  return (
    <article className={styles.brandCard}>
      <div className={styles.logoArea} style={{ '--card-gradient': brand.bgColor }}>
        <span className={styles.onlineBadge}>ONLINE</span>
        {!imgError ? (
          <img src={brand.logoSrc} alt={brand.logoAlt} loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <div className={styles.logoFallback}>{brand.name}</div>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.brandName}>{brand.name}</h3>
        <p className={styles.brandDescription}>{brand.description}</p>
        <div className={styles.product}>
          {!productImgError ? (
            <img
              src={brand.productImageSrc}
              alt={brand.productImageAlt}
              loading="lazy"
              onError={() => setProductImgError(true)}
            />
          ) : (
            <div className={styles.productFallback}>{brand.productName}</div>
          )}
          <span className={styles.productName}>{brand.productName}</span>
        </div>
        <div className={styles.cardCta}>
          <button type="button" onClick={() => onCtaClick(brand.waMessage)}>
            Pedir Catálogo
          </button>
        </div>
      </div>
    </article>
  );
}
