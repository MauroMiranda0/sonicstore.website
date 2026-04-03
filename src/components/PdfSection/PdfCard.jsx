import { useState } from 'react';
import styles from './PdfSection.module.scss';

export default function PdfCard({ catalog, onCtaClick }) {
  const [imgError, setImgError] = useState(false);
  const [productImgError, setProductImgError] = useState(false);

  return (
    <article className={styles.pdfCard}>
      <div className={styles.logoArea} style={{ '--card-gradient': catalog.bgGradient }}>
        <span className={styles.pdfBadge}>PDF</span>
        {!imgError ? (
          <img src={catalog.logoSrc} alt={catalog.logoAlt} loading="lazy" onError={() => setImgError(true)} />
        ) : (
          <div className={styles.logoFallback}>{catalog.name}</div>
        )}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.catalogName}>{catalog.name}</h3>
        <p className={styles.catalogDescription}>{catalog.description}</p>
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
        <div className={styles.cardCta}>
          <button type="button" onClick={() => onCtaClick(catalog.waMessage)}>
            Solicitar PDF
          </button>
        </div>
      </div>
    </article>
  );
}
