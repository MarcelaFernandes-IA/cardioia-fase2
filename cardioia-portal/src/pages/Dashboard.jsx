import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading.jsx';
import StatCard from '../components/StatCard.jsx';
import { useAgendamentos } from '../hooks/useAgendamentos';
import { useAuth } from '../hooks/useAuth';
import { usePacientes } from '../hooks/usePacientes';
import styles from './Dashboard.module.css';

const formatarData = (iso) => iso.split('-').reverse().join('/');

export default function Dashboard() {
  const { usuario } = useAuth();
  const { pacientes, carregando, fonte } = usePacientes();
  const { agendamentos } = useAgendamentos();

  const agendadas = useMemo(() => agendamentos.filter((a) => a.status === 'agendada'), [agendamentos]);
  const canceladas = agendamentos.length - agendadas.length;

  // quantidade de pacientes por condição
  const porCondicao = useMemo(() => {
    const contagem = {};
    pacientes.forEach((p) => { contagem[p.condicao] = (contagem[p.condicao] || 0) + 1; });
    return Object.entries(contagem).sort((a, b) => b[1] - a[1]);
  }, [pacientes]);

  const maior = porCondicao.length ? porCondicao[0][1] : 1;

  const proximas = useMemo(
    () => [...agendadas].sort((a, b) => `${a.data}${a.hora}`.localeCompare(`${b.data}${b.hora}`)).slice(0, 4),
    [agendadas]
  );

  if (carregando) return <Loading texto="Carregando dashboard..." />;

  return (
    <section>
      <h1 className={styles.titulo}>Olá, {usuario.nome}</h1>
      <p className={styles.sub}>Perfil: {usuario.perfil} · Fonte dos pacientes: {fonte}</p>

      <div className={styles.cards}>
        <StatCard titulo="Pacientes cadastrados" valor={pacientes.length} destaque />
        <StatCard titulo="Consultas agendadas" valor={agendadas.length} destaque />
        <StatCard titulo="Consultas canceladas" valor={canceladas} />
        <StatCard titulo="Condições acompanhadas" valor={porCondicao.length} />
      </div>

      <div className={styles.colunas}>
        <div className={styles.painel}>
          <h2>Pacientes por condição</h2>
          <ul className={styles.barras}>
            {porCondicao.map(([condicao, qtd]) => (
              <li key={condicao}>
                <span className={styles.rotulo}>{condicao}</span>
                <span className={styles.trilho}>
                  <span className={styles.barra} style={{ width: `${(qtd / maior) * 100}%` }} />
                </span>
                <strong>{qtd}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.painel}>
          <h2>Próximas consultas</h2>
          {proximas.length === 0 ? (
            <p className={styles.vazio}>Nenhuma consulta agendada.</p>
          ) : (
            <ul className={styles.proximas}>
              {proximas.map((a) => (
                <li key={a.id}>
                  <strong>{formatarData(a.data)} · {a.hora}</strong>
                  <span>{a.pacienteNome} — {a.tipo}</span>
                </li>
              ))}
            </ul>
          )}
          <Link to="/agendamentos" className={styles.link}>Gerenciar agendamentos →</Link>
        </div>
      </div>
    </section>
  );
}
