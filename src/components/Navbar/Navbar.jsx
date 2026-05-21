import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import { SITE_NAME } from '../../config/constants';
import { resolveAssetPath } from '../../utils/assets';

const NAV_LINKS = [
  { href: '#online', label: 'Catálogos Online' },
  { href: '#pdf', label: 'Catálogos PDF' },
  { href: '#como-funciona', label: 'Cómo Funciona' },
  { href: '#pagos', label: 'Pagos' },
  { href: '#pedido', label: 'Pedir Ahora', cta: true },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.brand} aria-label="Ir al inicio">
          <picture>
            <source srcSet={resolveAssetPath('/public/img/logo.webp')} type="image/webp" />
            <img
              src={resolveAssetPath('/public/img/logo.png')}
              alt={`Logo oficial de ${SITE_NAME}`}
              width="180"
              height="58"
            />
          </picture>
        </a>

        <nav className={styles.links} aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={link.cta ? styles.navCta : styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Abrir menú"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-nav" className={`${styles.overlay} ${isMenuOpen ? styles.open : ''}`} aria-label="Navegación móvil">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu} className={link.cta ? styles.mobileCta : styles.mobileLink}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
