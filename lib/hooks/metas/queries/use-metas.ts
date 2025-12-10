/**
 * Hook para listar metas
 * GET /api/v1/metas/
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS, buildUrl } from '@/lib/api/endpoints';
import type { Meta, MetasFilters } from '@/lib/api/types';

// Query Key Factory
export const metasKeys = {
  all: ['metas'] as const,
  lists: () => [...metasKeys.all, 'list'] as const,
  list: (filters?: MetasFilters) => [...metasKeys.lists(), filters] as const,
  details: () => [...metasKeys.all, 'detail'] as const,
  detail: (id: number) => [...metasKeys.details(), id] as const,
  movimentacoes: () => [...metasKeys.all, 'movimentacoes'] as const,
  movimentacoesByMeta: (id: number) => [...metasKeys.movimentacoes(), id] as const,
};

// ✅ Hook para listar metas do usuário autenticado
export const useMetas = (filters?: MetasFilters) => {
  return useQuery({
    queryKey: metasKeys.list(filters),
    queryFn: async (): Promise<Meta[]> => {
      // ✅ Backend identifica usuário pelo token
      const url = API_ENDPOINTS.METAS.LIST;
      return api.get<Meta[]>(url);
    },
    // Configurações opcionais
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};

// Hook alternativo com paginação (preparado para futuro)
/*
export const useMetasPaginated = (filters?: MetasFilters) => {
  return useQuery({
    queryKey: metasKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Meta>> => {
      const url = buildUrl(API_ENDPOINTS.METAS.LIST, filters);
      return api.get<PaginatedResponse<Meta>>(url);
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
*/
