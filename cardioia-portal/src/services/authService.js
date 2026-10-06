// Autenticação SIMULADA. Não existe back-end: o "JWT" é gerado no navegador
// apenas para fins didáticos e NÃO é seguro para uso real.

const CHAVE_TOKEN = 'cardioia_token';

// Usuários de demonstração
const USUARIOS = [
  { email: 'medico@cardioia.com', senha: '123456', nome: 'Dra. Helena Duarte', perfil: 'Cardiologista' },
  { email: 'admin@cardioia.com', senha: 'admin123', nome: 'Administrador', perfil: 'Administrador' },
];

// base64url com suporte a acentos
const codificar = (obj) =>
  btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const decodificar = (parte) => {
  const b64 = parte.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(decodeURIComponent(escape(atob(b64))));
};

// Cria um token no formato header.payload.assinatura (assinatura falsa)
function gerarTokenFalso(usuario) {
  const agora = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    sub: usuario.email,
    nome: usuario.nome,
    perfil: usuario.perfil,
    iat: agora,
    exp: agora + 60 * 60, // expira em 1 hora
  };
  return `${codificar(header)}.${codificar(payload)}.assinatura-falsa`;
}

export function decodificarToken(token) {
  try {
    return decodificar(token.split('.')[1]);
  } catch {
    return null;
  }
}

export function tokenExpirado(payload) {
  return !payload || payload.exp * 1000 < Date.now();
}

// Simula uma chamada de login a uma API (com atraso de rede)
export function autenticar(email, senha) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = USUARIOS.find(
        (u) => u.email === email.trim().toLowerCase() && u.senha === senha
      );
      if (!usuario) {
        reject(new Error('E-mail ou senha inválidos.'));
        return;
      }
      resolve({
        token: gerarTokenFalso(usuario),
        usuario: { email: usuario.email, nome: usuario.nome, perfil: usuario.perfil },
      });
    }, 600);
  });
}

// ---- persistência do token (localStorage pode estar indisponível) ----
export function salvarToken(token) {
  try { localStorage.setItem(CHAVE_TOKEN, token); } catch { /* ignora */ }
}
export function lerToken() {
  try { return localStorage.getItem(CHAVE_TOKEN); } catch { return null; }
}
export function removerToken() {
  try { localStorage.removeItem(CHAVE_TOKEN); } catch { /* ignora */ }
}
