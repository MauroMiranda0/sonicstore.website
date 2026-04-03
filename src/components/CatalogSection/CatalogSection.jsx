import BrandCard from './BrandCard';
import styles from './CatalogSection.module.scss';
import { buildWaUrl } from '../../config/constants';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function CatalogSection({ brands }) {
  const revealRef = useScrollReveal();

  const handleCtaClick = (waMessage) => {
    window.open(buildWaUrl(waMessage), '_blank', 'noopener');
  };

  return (
    <section id="online" className="section">
      <div ref={revealRef} className="container reveal">
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Catálogo Digital</p>
          <h2 className={styles.sectionTitle}>Catálogos Online</h2>
          <p className="section-subtitle">Explora las marcas disponibles y solicita el catálogo que necesitas en un solo clic.</p>
        </div>
        <div className={styles.brandGrid}>
          {brands.map((brand) => (
            <div key={brand.id} className={styles.cardSlot}>
              <BrandCard brand={brand} onCtaClick={handleCtaClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
