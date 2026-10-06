// Persistência simples dos agendamentos no localStorage (sem back-end).
const CHAVE = 'cardioia_agendamentos';

const INICIAIS = [
  { id: 'a1', pacienteId: 1, pacienteNome: 'Ana Beatriz Souza', data: '2026-10-20', hora: '09:00', tipo: 'Consulta de rotina', observacao: 'Retorno após ajuste de medicação.', status: 'agendada' },
  { id: 'a2', pacienteId: 4, pacienteNome: 'João Pedro Almeida', data: '2026-10-22', hora: '14:30', tipo: 'Exame (ECG)', observacao: '', status: 'agendada' },
  { id: 'a3', pacienteId: 2, pacienteNome: 'Carlos Eduardo Lima', data: '2026-10-25', hora: '10:15', tipo: 'Retorno', observacao: 'Avaliar dor no peito aos esforços.', status: 'agendada' },
];

export function carregarAgendamentos() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo);
  } catch { /* usa os iniciais */ }
  return INICIAIS;
}

export function salvarAgendamentos(lista) {
  try { localStorage.setItem(CHAVE, JSON.stringify(lista)); } catch { /* ignora */ }
}
