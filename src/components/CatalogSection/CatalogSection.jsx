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
        <h2 className="section-title">Catálogos Online</h2>
        <p className="section-subtitle">Explora las marcas disponibles y solicita el catálogo que necesitas en un solo clic.</p>
        <div className={styles.grid}>
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} onCtaClick={handleCtaClick} />
          ))}
        </div>
      </div>
    </section>
  );
}