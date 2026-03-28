import styles from './WaFloat.module.scss';
import { buildWaUrl } from '../../config/constants';

export default function WaFloat() {
  const handleClick = () => {
    window.open(buildWaUrl('Hola. Quiero recibir asesoría para hacer un pedido.'), '_blank', 'noopener');
  };

  return (
    <button
      type="button"
      className={styles.float}
      onClick={handleClick}
      aria-label="Abrir WhatsApp"
    >
      <span aria-hidden="true">💬</span>
    </button>
  );
}