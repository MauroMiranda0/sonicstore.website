import { useState } from 'react';
import styles from './PdfSection.module.scss';
import HoverCard from '../HoverCard/HoverCard';

export default function PdfCard({ catalog, onCtaClick }) {
  const [imgError, setImgError] = useState(false);
  const [productImgError, setProductImgError] = useState(false);

  return (
    <article className={styles.cardWrap}>
      <HoverCard className={styles.card} tone="gold">
        <div className={styles.cardContent}>
          <div className={styles.logoSurface} style={{ background: catalog.bgGradient }}>
            {!imgError ? (
              <img src={catalog.logoSrc} alt={catalog.logoAlt} loading="lazy" onError={() => setImgError(true)} />
            ) : (
              <div className={styles.logoFallback}>{catalog.name}</div>
            )}
          </div>
          <h3>{catalog.name}</h3>
          <p>{catalog.description}</p>
          <div className={styles.product}>
            {!productImgError ? (
              <img
                src={catalog.productImageSrc}
                alt={catalog.productImageAlt}
                loading="lazy"
                onError={() => setProductImgError(true)}
              />
            ) : (
              <div className={styles.productFallback}>{catalog.productName}</div>
            )}
            <span className={styles.productName}>{catalog.productName}</span>
          </div>
          <button type="button" onClick={() => onCtaClick(catalog.waMessage)}>
            Solicitar PDF
          </button>
        </div>
      </HoverCard>
    </article>
  );
}
