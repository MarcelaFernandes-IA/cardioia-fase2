import { useContext } from 'react';
import { AgendamentosContext } from '../contexts/AgendamentosContext';

export function useAgendamentos() {
  const ctx = useContext(AgendamentosContext);
  if (!ctx) throw new Error('useAgendamentos deve ser usado dentro de <AgendamentosProvider>');
  return ctx;
}
