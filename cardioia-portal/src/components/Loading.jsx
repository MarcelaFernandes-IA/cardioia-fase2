import styles from './Loading.module.css';

export default function Loading({ texto = 'Carregando...' }) {
  return (
    <div className={styles.caixa} role="status">
      <span className={styles.spinner} />
      <span>{texto}</span>
    </div>
  );
}
