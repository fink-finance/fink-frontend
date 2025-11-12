/**
 * Hook para buscar meta específica por ID
 * GET /api/v1/metas/{id_meta}
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta } from '@/lib/api/types';
import { metasKeys } from './use-metas';

export const useMeta = (id: number, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: metasKeys.detail(id),
    queryFn: async (): Promise<Meta> => {
      const url = API_ENDPOINTS.METAS.GET_BY_ID(String(id));
      return api.get<Meta>(url);
    },
    enabled: options?.enabled ?? !!id, // só executa se tiver ID válido
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};
