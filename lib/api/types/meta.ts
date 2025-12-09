/**
 * Types específicos para a entidade Meta
 */

import type { BaseFilters } from './base';

// ✅ Status disponíveis para metas
export enum MetaStatus {
  EM_ANDAMENTO = 'em_andamento',
  CONCLUIDA = 'concluida',
  CANCELADA = 'cancelada',
  ATRASADA = 'atrasada',
}

// ✅ Categorias disponíveis para metas
export enum MetaCategoria {
  VIAGEM = 'Viagem',
  COMPRAS = 'Compras',
  EMERGENCIA = 'Emergência',
  OUTROS = 'Outros',
}

// ✅ Resposta completa da API (GET)
export interface Meta {
  id_meta: number;
  fk_pessoa_id_pessoa: string;
  titulo: string;
  categoria: string;
  valor_alvo: number;
  valor_atual: number;
  criada_em: string; // "YYYY-MM-DD" format
  termina_em: string; // "YYYY-MM-DD" format
  status: MetaStatus;
}

// ✅ Tipo para criação de meta (POST) - apenas dados necessários
export interface CreateMetaData {
  titulo: string;
  categoria?: string; // ✅ Opcional (backend usa "Outros" como padrão)
  valor_alvo: number;
  termina_em: string; // "YYYY-MM-DD" format
}

// ✅ Tipo para atualização de meta (PUT/PATCH) - campos opcionais
export interface UpdateMetaData {
  titulo?: string;
  categoria?: string;
  valor_alvo?: number;
  termina_em?: string;
  valor_atual?: number;
  status?: MetaStatus;
}

// Filtros para listagem de metas
export interface MetasFilters extends BaseFilters {
  titulo?: string;
  status?: MetaStatus;
  fk_pessoa_id_pessoa?: string;
  // TODO: Implementar quando houver paginação no backend
  // page?: number;
  // limit?: number;
}
