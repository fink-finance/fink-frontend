/**
 * Hook para gerenciar autenticação
 * Usa validação de token da API
 */

'use client';

import { useRouter } from 'next/navigation';
import { useValidateSession } from './queries/use-validate-session';
import { useLogout } from './mutations/use-logout';

export const useAuth = () => {
  const router = useRouter();

  // ✅ Valida token com a API
  const { data: session, isLoading, isError } = useValidateSession();

  // ✅ Hook de logout que chama a API
  const { mutate: logoutMutation, isPending: isLoggingOut } = useLogout();

  // ✅ Estado de autenticação baseado na validação da API
  const isAuthenticated = !isLoading && !isError && !!session;

  const logout = () => {
    logoutMutation(undefined, {
      onSettled: () => {
        // Redireciona independente de sucesso ou erro
        router.push('/login');
      },
    });
  };

  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  };

  return {
    isAuthenticated,
    isLoading,
    isLoggingOut,
    session, // ✅ Dados da sessão validada
    logout,
    requireAuth,
  };
};
