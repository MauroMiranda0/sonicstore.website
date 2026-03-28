import styles from './HowItWorks.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HowItWorks({ steps }) {
  const revealRef = useScrollReveal();

  return (
    <section id="como-funciona" className="section">
      <div ref={revealRef} className="container reveal">
        <h2 className="section-title">Cómo Funciona</h2>
        <p className="section-subtitle">Proceso simple para pedir tus productos en minutos.</p>
        <div className={styles.grid}>
          {steps.map((step) => (
            <article key={step.id} className={styles.step}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}