import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { usuario, logout } = useAuth();
  const navegar = useNavigate();

  const sair = () => {
    logout();
    navegar('/login');
  };

  const classeLink = ({ isActive }) => (isActive ? `${styles.link} ${styles.ativo}` : styles.link);

  return (
    <header className={styles.barra}>
      <div className={styles.interno}>
        <span className={styles.marca}>♥ CardioIA</span>

        <nav className={styles.menu} aria-label="Navegação principal">
          <NavLink to="/" end className={classeLink}>Dashboard</NavLink>
          <NavLink to="/pacientes" className={classeLink}>Pacientes</NavLink>
          <NavLink to="/agendamentos" className={classeLink}>Agendamentos</NavLink>
        </nav>

        <div className={styles.usuario}>
          <span className={styles.nome}>{usuario?.nome}</span>
          <button type="button" className={styles.sair} onClick={sair}>Sair</button>
        </div>
      </div>
    </header>
  );
}
