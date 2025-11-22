/**
 * Hook para fazer login
 * POST /api/v1/sessoes/login
 */

import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { LoginData, LoginResponse } from '@/lib/api/types';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginData): Promise<LoginResponse> => {
      return api.post<LoginResponse>(API_ENDPOINTS.SESSOES.LOGIN, data);
    },
    onSuccess: (loginResponse) => {
      // ✅ Salvar token no localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', loginResponse.token);
        // Opcional: salvar dados do usuário
        localStorage.setItem(
          'userId',
          String(loginResponse.fk_pessoa_id_pessoa)
        );
        localStorage.setItem('sessionId', String(loginResponse.id_sessao));
      }
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error);
      // ❌ NÃO limpar token aqui, pois pode não existir
      // Apenas loga o erro
    },
    // ✅ Não tentar novamente em caso de erro
    retry: false,
  });
};
