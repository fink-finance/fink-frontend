/**
 * Hook para listar alertas não lidos
 * GET /api/v1/alertas/
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Alerta } from '@/lib/api/types';

// Query Key Factory
export const alertasKeys = {
  all: ['alertas'] as const,
  lists: () => [...alertasKeys.all, 'list'] as const,
  list: (lida?: boolean) => [...alertasKeys.lists(), { lida }] as const,
  details: () => [...alertasKeys.all, 'detail'] as const,
  detail: (id: number) => [...alertasKeys.details(), id] as const,
};

/**
 * Hook para listar alertas do usuário autenticado
 * Por padrão, retorna apenas alertas não lidos (lida: false)
 */
export const useAlertas = (lida?: boolean) => {
  return useQuery({
    queryKey: alertasKeys.list(lida),
    queryFn: async (): Promise<Alerta[]> => {
      // Backend identifica usuário pelo token
      // Endpoint retorna apenas alertas não lidos por padrão
      const url = API_ENDPOINTS.ALERTAS.LIST;
      return api.get<Alerta[]>(url);
    },
    // Configurações opcionais
    staleTime: 1 * 60 * 1000, // 1 minuto (alertas devem ser atualizados frequentemente)
    gcTime: 5 * 60 * 1000, // 5 minutos
    refetchInterval: 2 * 60 * 1000, // Refetch a cada 2 minutos
  });
};

/**
 * Hook para listar apenas alertas não lidos
 * Alias para facilitar o uso
 */
export const useAlertasNaoLidos = () => {
  return useAlertas(false);
};
