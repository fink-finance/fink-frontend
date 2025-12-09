/**
 * Hook para buscar pessoa logada atual
 * Combina useValidateSession e usePessoa para buscar automaticamente
 * os dados da pessoa autenticada
 */

import { useValidateSession } from '@/lib/hooks/sessoes/queries/use-validate-session';
import { usePessoa } from './use-pessoa';

export const useCurrentPessoa = () => {
  // Busca a sessão atual para obter o ID da pessoa
  const {
    data: session,
    isLoading: isLoadingSession,
    isError: isSessionError,
  } = useValidateSession();

  // Busca os dados da pessoa usando o ID da sessão
  const {
    data: pessoa,
    isLoading: isLoadingPessoa,
    isError: isPessoaError,
    error: pessoaError,
  } = usePessoa(session?.fk_pessoa_id_pessoa ?? '', {
    enabled: !!session?.fk_pessoa_id_pessoa, // Só executa se tiver ID válido
  });

  return {
    data: pessoa,
    isLoading: isLoadingSession || isLoadingPessoa,
    isError: isSessionError || isPessoaError,
    error: pessoaError,
  };
};
