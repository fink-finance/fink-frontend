/**
 * Types específicos para a entidade Meta
 */

import type { BaseFilters } from './base';

// ✅ Resposta completa da API (GET)
export interface Meta {
  id_meta: number;
  fk_pessoa_id_pessoa: number;
  titulo: string;
  descricao: string;
  valor_alvo: number;
  valor_atual: number;
  criada_em: string; // "YYYY-MM-DD" format
  termina_em: string; // "YYYY-MM-DD" format
  status: string; // "em_andamento", "concluida", "cancelada"
}

// ✅ Tipo para criação de meta (POST) - apenas dados necessários
export interface CreateMetaData {
  titulo: string;
  descricao: string;
  valor_alvo: number;
  termina_em: string; // "YYYY-MM-DD" format
}

// ✅ Tipo para atualização de meta (PUT/PATCH) - campos opcionais
export interface UpdateMetaData {
  titulo?: string;
  descricao?: string;
  valor_alvo?: number;
  termina_em?: string;
  valor_atual?: number;
  status?: string;
}

// Filtros para listagem de metas
export interface MetasFilters extends BaseFilters {
  titulo?: string;
  status?: string;
  fk_pessoa_id_pessoa?: number;
  // TODO: Implementar quando houver paginação no backend
  // page?: number;
  // limit?: number;
}
