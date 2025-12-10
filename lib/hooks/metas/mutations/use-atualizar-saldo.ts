/**
 * Hook para atualizar saldo da meta
 * POST /api/v1/metas/{id}/atualizar_saldo
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Meta, AtualizarSaldoData } from '@/lib/api/types';
import { metasKeys } from '../queries/use-metas';

export const useAtualizarSaldo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: AtualizarSaldoData;
    }): Promise<Meta> => {
      const url = API_ENDPOINTS.METAS.ATUALIZAR_SALDO(String(id));
      return api.post<Meta>(url, data);
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

      // ✅ Invalidar queries relacionadas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: metasKeys.lists(),
      });

      // Invalidar movimentações também
      queryClient.invalidateQueries({
        queryKey: metasKeys.movimentacoesByMeta(id),
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar saldo da meta:', error);
    },
  });
};

