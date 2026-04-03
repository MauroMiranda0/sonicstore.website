import styles from './PaymentSection.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import SmartImage from '../common/SmartImage';

export default function PaymentSection({ methods }) {
  const revealRef = useScrollReveal();

  return (
    <section id="pagos" className={`section ${styles.wrap}`}>
      <div ref={revealRef} className="container reveal">
        <h2 className="section-title">Métodos de Pago</h2>
        <p className="section-subtitle">Elige la opción que te resulte más cómoda para cerrar tu pedido.</p>
        <div className={styles.methodsGrid}>
          {methods.map((method) => (
            <div key={method.id} className={styles.methodSlot}>
              <article className={styles.methodCard}>
                <div className={styles.methodIconWrap}>
                  {method.icon.startsWith('/') ? (
                    <SmartImage
                      className={`${styles.methodIconImage} ${method.id === 'mercadopago' ? styles.methodIconImageMercadoPago : ''}`.trim()}
                      src={method.icon}
                      alt={method.iconAlt ?? `Icono de ${method.name}`}
                      loading="lazy"
                    />
                  ) : (
                    <span className={styles.methodIcon} aria-hidden="true">{method.icon}</span>
                  )}
                </div>
                <h3 className={styles.methodName}>{method.name}</h3>
                <p className={styles.methodDescription}>{method.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
