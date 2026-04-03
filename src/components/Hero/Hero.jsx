import styles from './Hero.module.scss';
import { SITE_TAGLINE, HERO_STATS } from '../../config/constants';
import { brands } from '../../data/brands';
import { heroSlides } from '../../data/heroSlides';
import BackgroundSlider from '../BackgroundSlider/BackgroundSlider';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SmartImage from '../common/SmartImage';

export default function Hero() {
  const revealRef = useScrollReveal();
  const featuredBrands = brands.slice(0, 3);

  return (
    <section className={`${styles.hero} section`}>
      <div ref={revealRef} className={`container reveal ${styles.grid}`}>
        <div>
          <p className={styles.eyebrow}>{SITE_TAGLINE}</p>
          <h1 className={styles.title}>Tu tienda de belleza y moda en un solo lugar</h1>
          <p className={styles.copy}>Catálogos online y en PDF con atención personalizada por WhatsApp para ayudarte a comprar rápido y fácil.</p>
          <div className={styles.actions}>
            <a href="#online" className={styles.primary}>Ver Catálogos</a>
            <a href="#pedido" className={styles.secondary}>Pedir por WhatsApp</a>
          </div>
          <ul className={styles.stats}>
            {HERO_STATS.map((stat) => (
              <li key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.visual}>
          <BackgroundSlider slides={heroSlides} />
          {featuredBrands.map((brand, index) => (
            <div key={brand.id} className={styles.logoWrap} style={{ backgroundColor: brand.bgColor }}>
              <SmartImage
                src={brand.logoSrc}
                alt={brand.logoAlt}
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className={styles.logoFallback}>{brand.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
