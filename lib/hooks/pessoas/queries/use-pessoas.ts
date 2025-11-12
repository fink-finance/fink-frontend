/**
 * Hook para listar pessoas
 * GET /api/v1/pessoas/
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS, buildUrl } from '@/lib/api/endpoints';
import type { Pessoa, PessoasFilters } from '@/lib/api/types';

// Query Key Factory
export const pessoasKeys = {
  all: ['pessoas'] as const,
  lists: () => [...pessoasKeys.all, 'list'] as const,
  list: (filters?: PessoasFilters) =>
    [...pessoasKeys.lists(), filters] as const,
  details: () => [...pessoasKeys.all, 'detail'] as const,
  detail: (id: number) => [...pessoasKeys.details(), id] as const,
  byEmail: (email: string) => [...pessoasKeys.all, 'by-email', email] as const,
};

// Hook para listar pessoas
export const usePessoas = (filters?: PessoasFilters) => {
  return useQuery({
    queryKey: pessoasKeys.list(filters),
    queryFn: async (): Promise<Pessoa[]> => {
      // TODO: Implementar quando houver paginação no backend
      // const url = buildUrl(API_ENDPOINTS.PESSOAS.LIST, filters);
      const url = API_ENDPOINTS.PESSOAS.LIST;

      return api.get<Pessoa[]>(url);
    },
    // Configurações opcionais
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antigo cacheTime)
  });
};

// Hook alternativo com paginação (preparado para futuro)
/*
export const usePessoasPaginated = (filters?: PessoasFilters) => {
  return useQuery({
    queryKey: pessoasKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Pessoa>> => {
      const url = buildUrl(API_ENDPOINTS.PESSOAS.LIST, filters);
      return api.get<PaginatedResponse<Pessoa>>(url);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
*/
