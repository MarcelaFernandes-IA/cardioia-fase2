import { useContext } from 'react';
import { PacientesContext } from '../contexts/PacientesContext';

export function usePacientes() {
  const ctx = useContext(PacientesContext);
  if (!ctx) throw new Error('usePacientes deve ser usado dentro de <PacientesProvider>');
  return ctx;
}
