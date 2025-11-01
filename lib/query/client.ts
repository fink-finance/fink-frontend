'use client'
import { QueryClient } from "@tanstack/react-query";

declare global {
  // evita duplicar tipo no hot reload
  // // eslint-disable-next-line no-var
  var __queryClient__: QueryClient | undefined;
}


export const queryClient = global.__queryClient__ ?? (global.__queryClient__ = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
        }
    }
}))