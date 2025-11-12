/**
 * Hook para buscar pessoa por email
 * GET /api/v1/pessoas/by-email/{email}
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Pessoa } from '@/lib/api/types';
import { pessoasKeys } from './use-pessoas';

export const usePessoaByEmail = (
  email: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: pessoasKeys.byEmail(email),
    queryFn: async (): Promise<Pessoa> => {
      const url = API_ENDPOINTS.PESSOAS.GET_BY_EMAIL(email);
      return api.get<Pessoa>(url);
    },
    enabled: options?.enabled ?? (!!email && email.includes('@')), // só executa se email for válido
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  });
};
