import styles from './Footer.module.scss';
import { SITE_NAME, WA_NUMBER, buildWaUrl } from '../../config/constants';
import { resolveAssetPath } from '../../utils/assets';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <a href="#" className={styles.brand} aria-label="Ir al inicio">
            <picture>
              <source srcSet={resolveAssetPath('/public/img/logo.webp')} type="image/webp" />
              <img
                src={resolveAssetPath('/public/img/logo.png')}
                alt={`Logo oficial de ${SITE_NAME}`}
                width="170"
                height="54"
                loading="lazy"
              />
            </picture>
          </a>
        </div>

        <nav aria-label="Navegación secundaria" className={styles.links}>
          <a href="#online" className={styles.link}>Catálogos Online</a>
          <a href="#pdf" className={styles.link}>Catálogos PDF</a>
          <a href="#pagos" className={styles.link}>Métodos de Pago</a>
          <a href={buildWaUrl('Hola. Quiero información sobre catálogos.')} target="_blank" rel="noreferrer noopener" className={styles.link}>WhatsApp</a>
        </nav>
      </div>
      <small className={styles.copy}>© {new Date().getFullYear()} {SITE_NAME} · WhatsApp: +{WA_NUMBER}</small>
    </footer>
  );
}
