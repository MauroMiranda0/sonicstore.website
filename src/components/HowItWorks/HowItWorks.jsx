import styles from './HowItWorks.module.scss';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HowItWorks({ steps }) {
  const revealRef = useScrollReveal();

  return (
    <section id="como-funciona" className="section">
      <div ref={revealRef} className="container reveal">
        <h2 className="section-title">Cómo Funciona</h2>
        <p className="section-subtitle">Proceso simple para pedir tus productos en minutos.</p>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.id} className={styles.stepSlot}>
              <article className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
