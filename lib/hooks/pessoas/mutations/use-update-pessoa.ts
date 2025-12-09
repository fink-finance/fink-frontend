/**
 * Hook para atualizar pessoa existente
 * PATCH /api/v1/pessoas/{id_pessoa}
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Pessoa, UpdatePessoaData } from '@/lib/api/types';
import { pessoasKeys } from '../queries/use-pessoas';

export const useUpdatePessoa = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdatePessoaData;
    }): Promise<Pessoa> => {
      const url = API_ENDPOINTS.PESSOAS.UPDATE(id);
      return api.patch<Pessoa>(url, data);
    },
    onSuccess: (updatedPessoa, variables) => {
      const { id } = variables;

      // Atualizar cache de detalhes específicos
      queryClient.setQueryData(pessoasKeys.detail(id), updatedPessoa);

      // Atualizar na lista de pessoas
      queryClient.setQueryData(
        pessoasKeys.lists(),
        (oldData: Pessoa[] | undefined) => {
          if (!oldData) return [updatedPessoa];

          return oldData.map((pessoa) =>
            pessoa.id_pessoa === id ? updatedPessoa : pessoa
          );
        }
      );

      // Invalidar queries relacionadas para garantir sincronização
      queryClient.invalidateQueries({
        queryKey: pessoasKeys.lists(),
      });

      // Se email foi alterado, invalidar cache by-email
      if (updatedPessoa.email) {
        queryClient.invalidateQueries({
          queryKey: pessoasKeys.byEmail(updatedPessoa.email),
        });
      }
    },
    onError: (error) => {
      console.error('Erro ao atualizar pessoa:', error);
    },
  });
};
