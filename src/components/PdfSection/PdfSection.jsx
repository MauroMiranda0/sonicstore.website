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
        <div className={styles.sectionHead}>
          <p className={styles.eyebrow}>Formato Descargable</p>
          <h2 className={styles.sectionTitle}>Catálogos PDF</h2>
          <p className="section-subtitle">Pide fichas completas en PDF para revisar detalles y disponibilidad de productos.</p>
        </div>
        <div className={styles.pdfGrid}>
          {catalogs.map((catalog) => (
            <div key={catalog.id} className={styles.cardSlot}>
              <PdfCard catalog={catalog} onCtaClick={handleCtaClick} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
