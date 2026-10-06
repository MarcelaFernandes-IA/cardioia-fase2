import { useMemo } from 'react';
import { useAgendamentos } from '../hooks/useAgendamentos';
import styles from './AgendamentoLista.module.css';

const formatarData = (iso) => iso.split('-').reverse().join('/');

export default function AgendamentoLista() {
  const { agendamentos, dispatch } = useAgendamentos();

  // ordena por data e hora
  const ordenados = useMemo(
    () => [...agendamentos].sort((a, b) => `${a.data}${a.hora}`.localeCompare(`${b.data}${b.hora}`)),
    [agendamentos]
  );

  if (ordenados.length === 0) {
    return <p className={styles.vazio}>Nenhuma consulta agendada.</p>;
  }

  return (
    <ul className={styles.lista}>
      {ordenados.map((a) => (
        <li key={a.id} className={a.status === 'cancelada' ? `${styles.item} ${styles.cancelada}` : styles.item}>
          <div className={styles.quando}>
            <strong>{formatarData(a.data)}</strong>
            <span>{a.hora}</span>
          </div>
          <div className={styles.info}>
            <strong>{a.pacienteNome}</strong>
            <span>{a.tipo}{a.observacao ? ` — ${a.observacao}` : ''}</span>
            <span className={styles.status}>{a.status === 'cancelada' ? 'Cancelada' : 'Agendada'}</span>
          </div>
          <div className={styles.acoes}>
            {a.status === 'agendada' && (
              <button type="button" onClick={() => dispatch({ tipo: 'CANCELAR', id: a.id })}>Cancelar</button>
            )}
            <button type="button" onClick={() => dispatch({ tipo: 'REMOVER', id: a.id })}>Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
