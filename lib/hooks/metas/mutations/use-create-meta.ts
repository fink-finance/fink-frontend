/**
 * Hook para criar nova meta
 * POST /api/v1/metas/
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta, CreateMetaData } from '@/lib/api/types';
import { metasKeys } from '../queries/use-metas';

export const useCreateMeta = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateMetaData): Promise<Meta> => {
      return api.post<Meta>(API_ENDPOINTS.METAS.CREATE, data);
    },
    onSuccess: (newMeta) => {
      // Invalidar lista geral de metas para refetch
      queryClient.invalidateQueries({
        queryKey: metasKeys.lists(),
      });

      // Adicionar nova meta ao cache de detalhes
      if (newMeta.id_meta) {
        queryClient.setQueryData(metasKeys.detail(newMeta.id_meta), newMeta);
      }

      // Invalidar metas da pessoa específica
      if (newMeta.fk_pessoa_id_pessoa) {
        queryClient.invalidateQueries({
          queryKey: metasKeys.byPessoa(newMeta.fk_pessoa_id_pessoa),
        });
      }

      // Opcional: Otimistic update na lista
      queryClient.setQueryData(
        metasKeys.lists(),
        (oldData: Meta[] | undefined) => {
          if (!oldData) return [newMeta];
          return [newMeta, ...oldData];
        }
      );
    },
    onError: (error) => {
      console.error('Erro ao criar meta:', error);
    },
  });
};
