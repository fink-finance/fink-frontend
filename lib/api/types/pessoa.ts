/**
 * Types específicos para a entidade Pessoa
 */

import type { BaseFilters } from './base';

export interface Pessoa {
  id_pessoa?: string;
  email: string;
  nome: string;
  data_nascimento: string; // "YYYY-MM-DD" format
  telefone: string;
  genero: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
  cep: string;
  data_criacao?: string; // "YYYY-MM-DD" format
  admin?: boolean;
}

// Tipo para criação (inclui senha)
export interface CreatePessoaData
  extends Omit<Pessoa, 'id_pessoa' | 'data_criacao' | 'admin'> {
  senha: string;
}

// Tipo para atualização (campos opcionais, exceto senha e IDs)
export interface UpdatePessoaData
  extends Partial<Omit<CreatePessoaData, 'senha'>> {
  senha?: string; // senha opcional no update
}

// Filtros para listagem de pessoas
export interface PessoasFilters extends BaseFilters {
  email?: string;
  nome?: string;
  estado?: string;
  cidade?: string;
  admin?: boolean;
  // TODO: Implementar quando houver paginação no backend
  // page?: number;
  // limit?: number;
}
