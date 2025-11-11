'use client';
import { QueryClient } from '@tanstack/react-query';

declare global {
  // evita duplicar tipo no hot reload
  // // eslint-disable-next-line no-var
  var __queryClient__: QueryClient | undefined;
}

const g = globalThis as typeof globalThis & { __queryClient__?: QueryClient };

export const queryClient =
  g.__queryClient__ ??
  (g.__queryClient__ = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
      },
    },
  }));
