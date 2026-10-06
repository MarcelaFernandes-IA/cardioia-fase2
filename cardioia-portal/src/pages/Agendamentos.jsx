import AgendamentoForm from '../components/AgendamentoForm.jsx';
import AgendamentoLista from '../components/AgendamentoLista.jsx';
import styles from './Agendamentos.module.css';

export default function Agendamentos() {
  return (
    <section>
      <h1>Agendamentos</h1>
      <div className={styles.colunas}>
        <AgendamentoForm />
        <div>
          <h2 className={styles.subtitulo}>Consultas</h2>
          <AgendamentoLista />
        </div>
      </div>
    </section>
  );
}
