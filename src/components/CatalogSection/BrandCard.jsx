import { useState } from 'react';
import styles from './CatalogSection.module.scss';
import HoverCard from '../HoverCard/HoverCard';

export default function BrandCard({ brand, onCtaClick }) {
  const [imgError, setImgError] = useState(false);
  const [productImgError, setProductImgError] = useState(false);

  return (
    <article className={styles.cardWrap}>
      <HoverCard className={styles.card} tone="blush">
        <div className={styles.cardContent}>
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
          <button type="button" onClick={() => onCtaClick(brand.waMessage)}>
            Pedir Catálogo
          </button>
        </div>
      </HoverCard>
    </article>
  );
}
