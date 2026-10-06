import Navbar from './Navbar.jsx';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.pagina}>
      <Navbar />
      <main className={styles.conteudo}>{children}</main>
      <footer className={styles.rodape}>
        CardioIA – projeto acadêmico com dados simulados. Não substitui avaliação médica.
      </footer>
    </div>
  );
}
