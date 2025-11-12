/**
 * Types específicos para a entidade Meta
 */

import type { BaseFilters } from './base';

export interface Meta {
  id_meta?: number;
  titulo: string;
  descricao: string;
  valor_alvo: string; // Mantendo como string baseado na API
  termina_em: string; // "YYYY-MM-DD" format
  fk_pessoa_id_pessoa: number;
  valor_atual?: string;
  criada_em?: string; // "YYYY-MM-DD" format
  status?: string; // "em_andamento", etc.
}

// Tipo para criação de meta
export interface CreateMetaData
  extends Omit<Meta, 'id_meta' | 'valor_atual' | 'criada_em' | 'status'> {}

// Tipo para atualização de meta
export interface UpdateMetaData
  extends Partial<
    Omit<Meta, 'id_meta' | 'criada_em' | 'fk_pessoa_id_pessoa'>
  > {}

// Filtros para listagem de metas
export interface MetasFilters extends BaseFilters {
  titulo?: string;
  status?: string;
  fk_pessoa_id_pessoa?: number;
  // TODO: Implementar quando houver paginação no backend
  // page?: number;
  // limit?: number;
}
