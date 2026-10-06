import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PacientesProvider } from '../contexts/PacientesContext';
import { AgendamentosProvider } from '../contexts/AgendamentosContext';
import Layout from './Layout.jsx';
import Loading from './Loading.jsx';

/**
 * Proteção de rotas: só mostra o conteúdo se o usuário estiver logado.
 * Os dados (pacientes e agendamentos) só são carregados depois do login.
 */
export default function ProtectedRoute() {
  const { autenticado, carregando } = useAuth();
  const local = useLocation();

  if (carregando) return <Loading texto="Verificando sessão..." />;

  if (!autenticado) {
    // guarda de onde o usuário veio para voltar depois do login
    return <Navigate to="/login" replace state={{ de: local.pathname }} />;
  }

  return (
    <PacientesProvider>
      <AgendamentosProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AgendamentosProvider>
    </PacientesProvider>
  );
}
