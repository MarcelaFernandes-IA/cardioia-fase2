import { useMemo, useState } from 'react';
import Loading from '../components/Loading.jsx';
import PacienteCard from '../components/PacienteCard.jsx';
import { usePacientes } from '../hooks/usePacientes';
import styles from './Pacientes.module.css';

export default function Pacientes() {
  const { pacientes, carregando, fonte, recarregar } = usePacientes();
  const [busca, setBusca] = useState('');

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return pacientes;
    return pacientes.filter(
      (p) => p.nome.toLowerCase().includes(termo) || p.condicao.toLowerCase().includes(termo) || p.cidade.toLowerCase().includes(termo)
    );
  }, [pacientes, busca]);

  if (carregando) return <Loading texto="Buscando pacientes..." />;

  return (
    <section>
      <div className={styles.topo}>
        <div>
          <h1>Pacientes</h1>
          <p className={styles.sub}>{filtrados.length} de {pacientes.length} · Fonte: {fonte}</p>
        </div>
        <button type="button" className={styles.recarregar} onClick={recarregar}>Atualizar</button>
      </div>

      <input
        className={styles.busca}
        type="search"
        placeholder="Buscar por nome, condição ou cidade..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        aria-label="Buscar pacientes"
      />

      {filtrados.length === 0 ? (
        <p className={styles.vazio}>Nenhum paciente encontrado.</p>
      ) : (
        <div className={styles.grade}>
          {filtrados.map((p) => <PacienteCard key={p.id} paciente={p} />)}
        </div>
      )}
    </section>
  );
}
