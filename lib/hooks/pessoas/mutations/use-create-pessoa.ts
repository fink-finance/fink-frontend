/**
 * Hook para criar nova pessoa
 * POST /api/v1/pessoas/
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Pessoa, CreatePessoaData } from '@/lib/api/types';
import { pessoasKeys } from '../queries/use-pessoas';

export const useCreatePessoa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePessoaData): Promise<Pessoa> => {
      return api.post<Pessoa>(API_ENDPOINTS.PESSOAS.CREATE, data);
    },
    onSuccess: (newPessoa) => {
      // Invalidar lista de pessoas para refetch
      queryClient.invalidateQueries({
        queryKey: pessoasKeys.lists(),
      });

      // Adicionar nova pessoa ao cache de detalhes
      if (newPessoa.id_pessoa) {
        queryClient.setQueryData(
          pessoasKeys.detail(newPessoa.id_pessoa),
          newPessoa
        );
      }

      // Opcional: Otimistic update na lista
      queryClient.setQueryData(
        pessoasKeys.lists(),
        (oldData: Pessoa[] | undefined) => {
          if (!oldData) return [newPessoa];
          return [newPessoa, ...oldData];
        }
      );
    },
    onError: (error) => {
      console.error('Erro ao criar pessoa:', error);
    },
  });
};
