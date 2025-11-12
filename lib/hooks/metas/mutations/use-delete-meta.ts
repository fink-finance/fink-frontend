/**
 * Hook para deletar meta
 * DELETE /api/v1/metas/{id_meta}
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta } from '@/lib/api/types';
import { metasKeys } from '../queries/use-metas';

export const useDeleteMeta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number): Promise<void> => {
      const url = API_ENDPOINTS.METAS.DELETE(String(id));
      return api.delete<void>(url);
    },
    onSuccess: (_, deletedId) => {
      // Buscar a meta que será deletada para obter fk_pessoa_id_pessoa
      const deletedMeta = queryClient.getQueryData<Meta>(
        metasKeys.detail(deletedId)
      );

      // Remover dos caches
      queryClient.removeQueries({
        queryKey: metasKeys.detail(deletedId),
      });

      // Remover da lista geral
      queryClient.setQueryData(
        metasKeys.lists(),
        (oldData: Meta[] | undefined) => {
          if (!oldData) return [];
          return oldData.filter((meta) => meta.id_meta !== deletedId);
        }
      );

      // Remover da lista de metas da pessoa
      if (deletedMeta?.fk_pessoa_id_pessoa) {
        queryClient.setQueryData(
          metasKeys.byPessoa(deletedMeta.fk_pessoa_id_pessoa),
          (oldData: Meta[] | undefined) => {
            if (!oldData) return [];
            return oldData.filter((meta) => meta.id_meta !== deletedId);
          }
        );
      }

      // Invalidar listas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: metasKeys.lists(),
      });

      if (deletedMeta?.fk_pessoa_id_pessoa) {
        queryClient.invalidateQueries({
          queryKey: metasKeys.byPessoa(deletedMeta.fk_pessoa_id_pessoa),
        });
      }
    },
    onError: (error) => {
      console.error('Erro ao deletar meta:', error);
    },
  });
};
