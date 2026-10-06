import styles from './StatCard.module.css';

export default function StatCard({ titulo, valor, detalhe, destaque = false }) {
  return (
    <div className={destaque ? `${styles.card} ${styles.destaque}` : styles.card}>
      <span className={styles.titulo}>{titulo}</span>
      <strong className={styles.valor}>{valor}</strong>
      {detalhe && <span className={styles.detalhe}>{detalhe}</span>}
    </div>
  );
}
