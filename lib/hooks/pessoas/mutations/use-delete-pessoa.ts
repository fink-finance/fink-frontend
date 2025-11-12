/**
 * Hook para deletar pessoa
 * DELETE /api/v1/pessoas/{id_pessoa}
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Pessoa } from '@/lib/api/types';
import { pessoasKeys } from '../queries/use-pessoas';

export const useDeletePessoa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const url = API_ENDPOINTS.PESSOAS.DELETE(String(id));
      return api.delete<void>(url);
    },
    onSuccess: (_, deletedId) => {
      // Remover dos caches
      queryClient.removeQueries({
        queryKey: pessoasKeys.detail(deletedId),
      });

      // Remover da lista
      queryClient.setQueryData(
        pessoasKeys.lists(),
        (oldData: Pessoa[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((pessoa) => pessoa.id_pessoa !== deletedId);
        }
      );

      // Invalidar listas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: pessoasKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar pessoa:', error);
    },
  });
};
