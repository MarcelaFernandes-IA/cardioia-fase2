import { createContext, useEffect, useMemo, useReducer } from 'react';
import { carregarAgendamentos, salvarAgendamentos } from '../services/agendamentosService';

export const AgendamentosContext = createContext(null);

// useReducer: todas as mudanças da lista passam por ações bem definidas
export function agendamentosReducer(estado, acao) {
  switch (acao.tipo) {
    case 'ADICIONAR':
      return [...estado, { ...acao.payload, id: `a${Date.now()}`, status: 'agendada' }];
    case 'CANCELAR':
      return estado.map((a) => (a.id === acao.id ? { ...a, status: 'cancelada' } : a));
    case 'REMOVER':
      return estado.filter((a) => a.id !== acao.id);
    default:
      return estado;
  }
}

export function AgendamentosProvider({ children }) {
  // 3º argumento (função) = estado inicial lido do localStorage
  const [agendamentos, dispatch] = useReducer(agendamentosReducer, null, carregarAgendamentos);

  useEffect(() => {
    salvarAgendamentos(agendamentos);
  }, [agendamentos]);

  const valor = useMemo(() => ({ agendamentos, dispatch }), [agendamentos]);

  return <AgendamentosContext.Provider value={valor}>{children}</AgendamentosContext.Provider>;
}
