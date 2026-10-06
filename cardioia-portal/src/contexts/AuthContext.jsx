import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import {
  autenticar,
  decodificarToken,
  lerToken,
  removerToken,
  salvarToken,
  tokenExpirado,
} from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true); // verificando token salvo
  const [erro, setErro] = useState('');

  // Ao abrir o app, tenta restaurar a sessão a partir do token no localStorage
  useEffect(() => {
    const token = lerToken();
    if (token) {
      const payload = decodificarToken(token);
      if (payload && !tokenExpirado(payload)) {
        setUsuario({ email: payload.sub, nome: payload.nome, perfil: payload.perfil });
      } else {
        removerToken(); // token inválido ou expirado
      }
    }
    setCarregando(false);
  }, []);

  const login = useCallback(async (email, senha) => {
    setErro('');
    try {
      const { token, usuario: dados } = await autenticar(email, senha);
      salvarToken(token);
      setUsuario(dados);
      return true;
    } catch (e) {
      setErro(e.message);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    removerToken();
    setUsuario(null);
  }, []);

  const valor = useMemo(
    () => ({ usuario, autenticado: Boolean(usuario), carregando, erro, login, logout }),
    [usuario, carregando, erro, login, logout]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}
