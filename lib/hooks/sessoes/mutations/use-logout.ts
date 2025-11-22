/**
 * Hook para fazer logout
 * DELETE /api/v1/sessoes/logout
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (): Promise<void> => {
      return api.delete<void>(API_ENDPOINTS.SESSOES.LOGOUT);
    },
    onSuccess: () => {
      // Limpar token do localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('sessionId');
      }

      // Limpar todos os caches do React Query
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Erro ao fazer logout:', error);

      // Mesmo com erro, limpar token local
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('sessionId');
      }

      // Limpar caches
      queryClient.clear();
    },
  });
};
