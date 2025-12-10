/**
 * Types específicos para a entidade Sessão (Autenticação)
 */

// ✅ Dados para fazer login
export interface LoginData {
  email: string;
  senha: string;
}

// ✅ Resposta do login
export interface LoginResponse {
  id_sessao: number;
  fk_pessoa_id_pessoa: string;
  token: string;
  criada_em: string; // "YYYY-MM-DD" format
  expira_em: string; // "YYYY-MM-DD" format
}

// ✅ Sessão completa
export interface Sessao {
  id_sessao: number;
  fk_pessoa_id_pessoa: string;
  token: string;
  criada_em: string;
  expira_em: string;
}
