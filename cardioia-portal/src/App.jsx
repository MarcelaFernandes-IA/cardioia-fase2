import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Pacientes from './pages/Pacientes.jsx';
import Agendamentos from './pages/Agendamentos.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Tudo dentro desta rota exige usuário logado */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/agendamentos" element={<Agendamentos />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
