import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { listarPacientes } from '../services/pacientesService';

export const PacientesContext = createContext(null);

export function PacientesProvider({ children }) {
  const [pacientes, setPacientes] = useState([]);
  const [fonte, setFonte] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    const resultado = await listarPacientes();
    setPacientes(resultado.pacientes);
    setFonte(resultado.fonte);
    setCarregando(false);
  }, []);

  // Busca os pacientes uma única vez quando o provider é montado
  useEffect(() => {
    carregar();
  }, [carregar]);

  const valor = useMemo(
    () => ({ pacientes, fonte, carregando, recarregar: carregar }),
    [pacientes, fonte, carregando, carregar]
  );

  return <PacientesContext.Provider value={valor}>{children}</PacientesContext.Provider>;
}
