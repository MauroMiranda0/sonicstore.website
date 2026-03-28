import styles from './Footer.module.scss';
import { SITE_NAME, SITE_TAGLINE, WA_NUMBER, buildWaUrl } from '../../config/constants';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <a href="#" className={styles.brand} aria-label="Ir al inicio">
            <img src="/logo.png" alt={`${SITE_NAME} logo`} width="34" height="34" loading="lazy" />
            <span>{SITE_NAME}</span>
          </a>
          <p>{SITE_TAGLINE}</p>
        </div>

        <nav aria-label="Navegación secundaria" className={styles.links}>
          <a href="#online">Catálogos Online</a>
          <a href="#pdf">Catálogos PDF</a>
          <a href="#pagos">Métodos de Pago</a>
          <a href={buildWaUrl('Hola. Quiero información sobre catálogos.')} target="_blank" rel="noreferrer noopener">WhatsApp</a>
        </nav>
      </div>
      <small>© {new Date().getFullYear()} {SITE_NAME} · WhatsApp: +{WA_NUMBER}</small>
    </footer>
  );
}