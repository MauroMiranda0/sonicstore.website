import styles from './PaymentSection.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function PaymentSection({ methods }) {
  const revealRef = useScrollReveal();

  return (
    <section id="pagos" className={`section ${styles.wrap}`}>
      <div ref={revealRef} className="container reveal">
        <h2 className="section-title">Métodos de Pago</h2>
        <p className="section-subtitle">Elige la opción que te resulte más cómoda para cerrar tu pedido.</p>
        <div className={styles.grid}>
          {methods.map((method) => (
            <article key={method.id} className={styles.card}>
              <span aria-hidden="true">{method.icon}</span>
              <h3>{method.name}</h3>
              <p>{method.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}