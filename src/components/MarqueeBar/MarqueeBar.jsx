import styles from './MarqueeBar.module.scss';

export default function MarqueeBar({ items, speed = 22 }) {
  const loopItems = [...items, ...items];

  return (
    <section className={styles.wrap} aria-label="Beneficios de compra">
      <div className={styles.track} style={{ '--duration': `${speed}s` }}>
        {loopItems.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}