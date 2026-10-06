import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import styles from './Login.module.css';

export default function Login() {
  const { login, autenticado, carregando, erro } = useAuth();
  const [email, setEmail] = useState('medico@cardioia.com');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();
  const local = useLocation();

  // se já está logado, não faz sentido ver a tela de login
  if (!carregando && autenticado) return <Navigate to="/" replace />;

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const ok = await login(email, senha);
    setEnviando(false);
    if (ok) navegar(local.state?.de || '/', { replace: true });
  };

  return (
    <div className={styles.tela}>
      <form className={styles.caixa} onSubmit={enviar}>
        <h1 className={styles.marca}>♥ CardioIA</h1>
        <p className={styles.sub}>Portal de diagnóstico em cardiologia</p>

        <label className={styles.campo}>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </label>
        <label className={styles.campo}>
          Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required autoComplete="current-password" />
        </label>

        {erro && <p className={styles.erro} role="alert">{erro}</p>}

        <button type="submit" className={styles.botao} disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className={styles.dica}>
          Demonstração: <code>medico@cardioia.com</code> / <code>123456</code>
        </p>
      </form>
    </div>
  );
}
