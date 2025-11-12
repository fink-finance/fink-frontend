/**
 * Barrel export para todos os hooks de pessoas
 * Centralize todas as operações de pessoas aqui
 */

// Queries (leitura)
export {
  usePessoas,
  usePessoa,
  usePessoaByEmail,
  pessoasKeys,
} from './queries';

// Mutations (escrita)
export { useCreatePessoa, useUpdatePessoa, useDeletePessoa } from './mutations';
