import styles from './CtaSection.module.scss';
import { buildWaUrl } from '../../config/constants';

export default function CtaSection() {
  const openWhatsApp = () => {
    window.open(buildWaUrl('Hola. Quiero hacer un pedido en Sonic Store.'), '_blank', 'noopener');
  };

  return (
    <section id="pedido" className={`section ${styles.wrap}`}>
      <div className={`container ${styles.box}`}>
        <p className={styles.ctaEyebrow}>Atención Personalizada</p>
        <h2 className={styles.ctaTitle}>¿Lista para pedir?</h2>
        <p className={styles.ctaCopy}>Escríbenos por WhatsApp y recibe atención personalizada para elegir tus productos.</p>
        <button type="button" onClick={openWhatsApp} className={styles.ctaBtn}>Iniciar Pedido</button>
      </div>
    </section>
  );
}
