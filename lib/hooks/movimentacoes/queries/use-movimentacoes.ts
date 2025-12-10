/**
 * Hook para listar movimentações de uma conta Pluggy
 * GET /api/v1/pluggy/transactions/{account_id}?from_date=&to_date=
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS, buildUrl } from '@/lib/api/endpoints';
import type { PluggyTransaction } from '@/lib/api/types/pluggy';
import type { Movimentacao } from '@/lib/api/types/movimentacoes';

// Filtros aceitos pelo hook (por enquanto só conta e datas)
export type MovimentacoesFilters = {
  accountId: string;
  fromDate?: string; // 'YYYY-MM-DD'
  toDate?: string;   // 'YYYY-MM-DD'
};

// Query Key Factory (seguindo padrão das metas)
export const movimentacoesKeys = {
  all: ['movimentacoes'] as const,
  lists: () => [...movimentacoesKeys.all, 'list'] as const,
  list: (filters: MovimentacoesFilters) =>
    [...movimentacoesKeys.lists(), filters] as const,
  details: () => [...movimentacoesKeys.all, 'detail'] as const,
  detail: (id: string) => [...movimentacoesKeys.details(), id] as const,
};

// Mapeia transação da Pluggy -> modelo da UI
function mapPluggyToMovimentacao(t: PluggyTransaction): Movimentacao {
  const amount = t.amount ?? 0;
  const tipo = amount >= 0 ? 'entrada' : 'saida';
  const valorAbs = Math.abs(amount);

  return {
    id: t.id,
    data: t.date ?? '',
    descricao: t.description ?? t.descriptionRaw ?? 'Transação',
    categoria: t.category ?? 'Outros',
    recorrencia: 'Variável', // por enquanto fixo
    valor: valorAbs,
    tipo,
    origemPagamento: t.paymentMethod ?? t.provider ?? 'Conta',
    bancoSigla: 'PG',      // TODO: ligar com a conta/banco real
    bancoCor: '#111827',   // TODO: ajustar cor real por banco
  };
}

// ✅ Hook principal
export const useMovimentacoes = (filters: MovimentacoesFilters) => {
  const { accountId, fromDate, toDate } = filters;

  return useQuery({
    queryKey: movimentacoesKeys.list(filters),
    queryFn: async (): Promise<Movimentacao[]> => {
      const baseUrl = API_ENDPOINTS.PLUGGY.TRANSACTIONS(accountId);

      const url = buildUrl(baseUrl, {
        from_date: fromDate,
        to_date: toDate,
      });

      const raw = await api.get<PluggyTransaction[]>(url);
      return raw.map(mapPluggyToMovimentacao);
    },
    enabled: !!accountId, // só busca se tiver conta
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
