import styles from './PacienteCard.module.css';

export default function PacienteCard({ paciente }) {
  const rotina = paciente.condicao === 'Acompanhamento de rotina';
  return (
    <article className={styles.card}>
      <header className={styles.topo}>
        <h3>{paciente.nome}</h3>
        <span className={rotina ? styles.etiquetaRotina : styles.etiqueta}>{paciente.condicao}</span>
      </header>
      <dl className={styles.dados}>
        <div><dt>Idade</dt><dd>{paciente.idade} anos</dd></div>
        <div><dt>Cidade</dt><dd>{paciente.cidade}</dd></div>
        <div><dt>E-mail</dt><dd>{paciente.email}</dd></div>
        <div><dt>Telefone</dt><dd>{paciente.telefone}</dd></div>
      </dl>
    </article>
  );
}
