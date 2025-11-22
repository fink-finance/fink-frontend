/**
 * Hook para validar token
 * GET /api/v1/sessoes/validar
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Sessao } from '@/lib/api/types';

export const useValidateSession = () => {
  return useQuery({
    queryKey: ['session', 'validate'],
    queryFn: async (): Promise<Sessao> => {
      return api.get<Sessao>(API_ENDPOINTS.SESSOES.VALIDATE);
    },
    retry: false, // Não tentar novamente se falhar
    staleTime: 5 * 60 * 1000, // 5 minutos
    // Só executa se houver token
    enabled:
      typeof window !== 'undefined' && !!localStorage.getItem('authToken'),
  });
};
