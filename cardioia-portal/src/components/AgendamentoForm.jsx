import { useReducer } from 'react';
import { useAgendamentos } from '../hooks/useAgendamentos';
import { usePacientes } from '../hooks/usePacientes';
import styles from './AgendamentoForm.module.css';

const TIPOS = ['Consulta de rotina', 'Retorno', 'Exame (ECG)', 'Exame (Ecocardiograma)', 'Teste ergométrico'];

const estadoInicial = {
  pacienteId: '',
  data: '',
  hora: '',
  tipo: TIPOS[0],
  observacao: '',
  erros: {},
  sucesso: false,
};

// useReducer controla todo o estado do formulário em um só lugar
function formReducer(estado, acao) {
  switch (acao.tipo) {
    case 'CAMPO':
      return {
        ...estado,
        [acao.campo]: acao.valor,
        erros: { ...estado.erros, [acao.campo]: undefined },
        sucesso: false,
      };
    case 'ERROS':
      return { ...estado, erros: acao.erros, sucesso: false };
    case 'SUCESSO':
      return { ...estadoInicial, sucesso: true };
    default:
      return estado;
  }
}

function validar(f) {
  const erros = {};
  if (!f.pacienteId) erros.pacienteId = 'Selecione um paciente.';
  if (!f.data) erros.data = 'Informe a data.';
  else if (f.data < new Date().toISOString().slice(0, 10)) erros.data = 'A data não pode estar no passado.';
  if (!f.hora) erros.hora = 'Informe o horário.';
  return erros;
}

export default function AgendamentoForm() {
  const [form, dispatch] = useReducer(formReducer, estadoInicial);
  const { pacientes, carregando } = usePacientes();
  const { dispatch: dispatchAgendamentos } = useAgendamentos();

  const alterar = (e) => dispatch({ tipo: 'CAMPO', campo: e.target.name, valor: e.target.value });

  const enviar = (e) => {
    e.preventDefault();
    const erros = validar(form);
    if (Object.keys(erros).length > 0) {
      dispatch({ tipo: 'ERROS', erros });
      return;
    }
    const paciente = pacientes.find((p) => String(p.id) === String(form.pacienteId));
    dispatchAgendamentos({
      tipo: 'ADICIONAR',
      payload: {
        pacienteId: paciente.id,
        pacienteNome: paciente.nome,
        data: form.data,
        hora: form.hora,
        tipo: form.tipo,
        observacao: form.observacao.trim(),
      },
    });
    dispatch({ tipo: 'SUCESSO' });
  };

  return (
    <form className={styles.form} onSubmit={enviar} noValidate>
      <h2>Agendar consulta</h2>

      <label className={styles.campo}>
        Paciente
        <select name="pacienteId" value={form.pacienteId} onChange={alterar} disabled={carregando}>
          <option value="">{carregando ? 'Carregando pacientes...' : 'Selecione...'}</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        {form.erros.pacienteId && <span className={styles.erro}>{form.erros.pacienteId}</span>}
      </label>

      <div className={styles.linha}>
        <label className={styles.campo}>
          Data
          <input type="date" name="data" value={form.data} onChange={alterar} />
          {form.erros.data && <span className={styles.erro}>{form.erros.data}</span>}
        </label>
        <label className={styles.campo}>
          Horário
          <input type="time" name="hora" value={form.hora} onChange={alterar} />
          {form.erros.hora && <span className={styles.erro}>{form.erros.hora}</span>}
        </label>
      </div>

      <label className={styles.campo}>
        Tipo
        <select name="tipo" value={form.tipo} onChange={alterar}>
          {TIPOS.map((t) => <option key={t}>{t}</option>)}
        </select>
      </label>

      <label className={styles.campo}>
        Observações (opcional)
        <textarea name="observacao" rows="3" value={form.observacao} onChange={alterar} />
      </label>

      <button type="submit" className={styles.botao}>Agendar</button>
      {form.sucesso && <p className={styles.sucesso} role="status">Consulta agendada com sucesso!</p>}
    </form>
  );
}
