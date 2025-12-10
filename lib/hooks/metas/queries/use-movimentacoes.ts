/**
 * Hook para buscar movimentações de uma meta
 * GET /api/v1/metas/movimentacao/{id_meta}
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Movimentacao } from '@/lib/api/types/meta';
import { metasKeys } from './use-metas';

export const useMovimentacoesMetas = (
  idMeta: number,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: metasKeys.movimentacoesByMeta(idMeta),
    queryFn: async (): Promise<Movimentacao[]> => {
      const url = API_ENDPOINTS.METAS.MOVIMENTACOES(String(idMeta));
      return api.get<Movimentacao[]>(url);
    },
    enabled: options?.enabled ?? !!idMeta,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  });
};
