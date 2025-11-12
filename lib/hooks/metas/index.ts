/**
 * Barrel export para todos os hooks de metas
 * Centralize todas as operações de metas aqui
 */

// Queries (leitura)
export { useMetas, useMeta, useMetasByPessoa, metasKeys } from './queries';

// Mutations (escrita)
export { useCreateMeta, useUpdateMeta, useDeleteMeta } from './mutations';
