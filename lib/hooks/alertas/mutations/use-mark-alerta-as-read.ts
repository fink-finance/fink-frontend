/**
 * Hook para marcar alerta como lido
 * PATCH /api/v1/alertas/{id_alerta}
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Alerta, MarkAlertaAsReadData } from '@/lib/api/types';
import { alertasKeys } from '../queries/use-alertas';

export const useMarkAlertaAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      lida = true,
    }: {
      id: number;
      lida?: boolean;
    }): Promise<Alerta> => {
      const url = API_ENDPOINTS.ALERTAS.UPDATE(String(id));
      const data: MarkAlertaAsReadData = { lida };
      return api.patch<Alerta>(url, data);
    },
    onSuccess: (updatedAlerta, variables) => {
      const { id } = variables;

      // Atualizar cache de detalhes específicos
      queryClient.setQueryData(alertasKeys.detail(id), updatedAlerta);

      // Remover da lista de não lidos se foi marcado como lido
      if (updatedAlerta.lida) {
        queryClient.setQueryData(
          alertasKeys.list(false),
          (oldData: Alerta[] | undefined) => {
            if (!oldData) return [];
            return oldData.filter((alerta) => alerta.id_alerta !== id);
          }
        );
      }

      // Atualizar na lista geral de alertas
      queryClient.setQueryData(
        alertasKeys.lists(),
        (oldData: Alerta[] | undefined) => {
          if (!oldData) return [updatedAlerta];

          return oldData.map((alerta) =>
            alerta.id_alerta === id ? updatedAlerta : alerta
          );
        }
      );

      // Invalidar queries relacionadas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: alertasKeys.lists(),
      });
    },
    onError: (error) => {
      console.error('Erro ao marcar alerta como lido:', error);
    },
  });
};
