import pacientesLocais from '../data/pacientes.json';

// API pública de exemplo (usuários fictícios)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const CONDICOES = [
  'Acompanhamento de rotina',
  'Hipertensão',
  'Angina',
  'Arritmia',
  'Insuficiência Cardíaca',
  'Taquicardia',
];

// Converte um "user" do JSONPlaceholder em um "paciente" do CardioIA.
// (idade e condição são geradas de forma determinística, só para a demonstração)
const paraPaciente = (u) => ({
  id: u.id,
  nome: u.name,
  idade: 25 + ((u.id * 7) % 50),
  email: u.email.toLowerCase(),
  telefone: u.phone.split(' x')[0],
  cidade: u.address.city,
  condicao: CONDICOES[u.id % CONDICOES.length],
});

/**
 * Busca a lista de pacientes.
 * Tenta a API pública; se estiver offline/fora do ar, usa a base local simulada.
 */
export async function listarPacientes() {
  const controlador = new AbortController();
  const limite = setTimeout(() => controlador.abort(), 6000);
  try {
    const resposta = await fetch(API_URL, { signal: controlador.signal });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    return { fonte: 'API pública (JSONPlaceholder)', pacientes: dados.map(paraPaciente) };
  } catch {
    return { fonte: 'Base local simulada (JSON)', pacientes: pacientesLocais };
  } finally {
    clearTimeout(limite);
  }
}
