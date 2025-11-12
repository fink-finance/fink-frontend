/**
 * Hook para buscar metas de uma pessoa específica
 * GET /api/v1/metas/pessoa/{id_pessoa}
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta } from '@/lib/api/types';
import { metasKeys } from './use-metas';

export const useMetasByPessoa = (
  id_pessoa: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: metasKeys.byPessoa(id_pessoa),
    queryFn: async (): Promise<Meta[]> => {
      const url = API_ENDPOINTS.METAS.BY_PESSOA(String(id_pessoa));
      return api.get<Meta[]>(url);
    },
    enabled: options?.enabled ?? !!id_pessoa, // só executa se tiver ID válido
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};
