import styles from './HoverCard.module.scss';

export default function HoverCard({ children, className = '', tone = 'blush' }) {
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.setProperty('--mouse-x', '50%');
    event.currentTarget.style.setProperty('--mouse-y', '50%');
  };

  return (
    <div
      className={`${styles.card} ${styles[tone]} ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}