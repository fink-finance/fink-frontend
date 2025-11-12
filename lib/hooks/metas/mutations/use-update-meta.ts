/**
 * Hook para atualizar meta existente
 * PATCH /api/v1/metas/{id_meta}
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta, UpdateMetaData } from '@/lib/api/types';
import { metasKeys } from '../queries/use-metas';

export const useUpdateMeta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: UpdateMetaData;
    }): Promise<Meta> => {
      const url = API_ENDPOINTS.METAS.UPDATE(String(id));
      return api.patch<Meta>(url, data);
    },
    onSuccess: (updatedMeta, variables) => {
      const { id } = variables;

      // Atualizar cache de detalhes específicos
      queryClient.setQueryData(metasKeys.detail(id), updatedMeta);

      // Atualizar na lista geral de metas
      queryClient.setQueryData(
        metasKeys.lists(),
        (oldData: Meta[] | undefined) => {
          if (!oldData) return [updatedMeta];

          return oldData.map((meta) =>
            meta.id_meta === id ? updatedMeta : meta
          );
        }
      );

      // Atualizar na lista de metas da pessoa
      if (updatedMeta.fk_pessoa_id_pessoa) {
        queryClient.setQueryData(
          metasKeys.byPessoa(updatedMeta.fk_pessoa_id_pessoa),
          (oldData: Meta[] | undefined) => {
            if (!oldData) return [updatedMeta];

            return oldData.map((meta) =>
              meta.id_meta === id ? updatedMeta : meta
            );
          }
        );
      }

      // Invalidar queries relacionadas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: metasKeys.lists(),
      });

      if (updatedMeta.fk_pessoa_id_pessoa) {
        queryClient.invalidateQueries({
          queryKey: metasKeys.byPessoa(updatedMeta.fk_pessoa_id_pessoa),
        });
      }
    },
    onError: (error) => {
      console.error('Erro ao atualizar meta:', error);
    },
  });
};
