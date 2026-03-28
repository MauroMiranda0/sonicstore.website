import styles from './CtaSection.module.scss';
import { buildWaUrl } from '../../config/constants';

export default function CtaSection() {
  const openWhatsApp = () => {
    window.open(buildWaUrl('Hola. Quiero hacer un pedido en Sonic Store.'), '_blank', 'noopener');
  };

  return (
    <section id="pedido" className={`section ${styles.wrap}`}>
      <div className={`container ${styles.box}`}>
        <h2>¿Lista para pedir?</h2>
        <p>Escríbenos por WhatsApp y recibe atención personalizada para elegir tus productos.</p>
        <button type="button" onClick={openWhatsApp}>Iniciar Pedido</button>
      </div>
    </section>
  );
}