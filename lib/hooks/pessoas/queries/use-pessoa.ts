/**
 * Hook para buscar pessoa específica por ID
 * GET /api/v1/pessoas/{id_pessoa}
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Pessoa } from '@/lib/api/types';
import { pessoasKeys } from './use-pessoas';

export const usePessoa = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: pessoasKeys.detail(id),
    queryFn: async (): Promise<Pessoa> => {
      const url = API_ENDPOINTS.PESSOAS.GET_BY_ID(String(id));
      return api.get<Pessoa>(url);
    },
    enabled: options?.enabled ?? !!id, // só executa se tiver ID válido
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};
