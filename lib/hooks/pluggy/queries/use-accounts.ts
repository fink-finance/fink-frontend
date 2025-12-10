// lib/hooks/pluggy/queries/use-accounts.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { PluggyAccount } from '@/lib/api/types/pluggy';

// Query Key Factory
export const pluggyAccountsKeys = {
  all: ['pluggy', 'accounts'] as const,
  list: (itemId: string) => ['pluggy', 'accounts', itemId] as const,
};

export function usePluggyAccounts(itemId: string) {
  return useQuery({
    queryKey: pluggyAccountsKeys.list(itemId),
    queryFn: async (): Promise<PluggyAccount[]> => {
      const url = API_ENDPOINTS.PLUGGY.ACCOUNTS(itemId);

      const accounts = await api.get<PluggyAccount[]>(url);

      // 🔹 filtro global: remove conta "platinum"
      return accounts.filter((acc) => {
        const name = acc.name?.toLowerCase() ?? '';
        const type = acc.type?.toLowerCase() ?? '';

        // ajuste aqui se quiser ser mais específico
        const isPlatinumByName = name.includes('platinum');
        const isPlatinumByType = type === 'platinum';

        return !isPlatinumByName && !isPlatinumByType;
      });
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

