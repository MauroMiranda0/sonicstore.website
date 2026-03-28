import PdfCard from './PdfCard';
import styles from './PdfSection.module.scss';
import { buildWaUrl } from '../../config/constants';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PdfSection({ catalogs }) {
  const revealRef = useScrollReveal();

  const handleCtaClick = (waMessage) => {
    window.open(buildWaUrl(waMessage), '_blank', 'noopener');
  };

  return (
    <section id="pdf" className={`section ${styles.wrap}`}>
      <div ref={revealRef} className="container reveal">
        <h2 className="section-title">Catálogos PDF</h2>
        <p className="section-subtitle">Pide fichas completas en PDF para revisar detalles y disponibilidad de productos.</p>
        <div className={styles.grid}>
          {catalogs.map((catalog) => (
            <PdfCard key={catalog.id} catalog={catalog} onCtaClick={handleCtaClick} />
          ))}
        </div>
      </div>
    </section>
  );
}