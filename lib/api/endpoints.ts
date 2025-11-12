/**
 * Endpoints centralizados da API
 * Organize por feature/classe do backend
 */

export const API_ENDPOINTS = {
  // Pessoas
  PESSOAS: {
    LIST: '/pessoas',
    CREATE: '/pessoas',
    GET_BY_ID: (id: string) => `/pessoas/${id}`,
    UPDATE: (id: string) => `/pessoas/${id}`,
    DELETE: (id: string) => `/pessoas/${id}`,
    GET_BY_EMAIL: (email: string) => `/pessoas/by-email/${email}`,
  },

  // Alertas
  ALERTAS: {
    LIST: '/alertas',
    CREATE: '/alertas',
    GET_BY_ID: (id: string) => `/alertas/${id}`,
    UPDATE: (id: string) => `/alertas/${id}`,
    DELETE: (id: string) => `/alertas/${id}`,
    MARK_AS_READ: (id: string) => `/alertas/${id}/mark-read`,
  },

  // Metas
  METAS: {
    LIST: '/metas',
    CREATE: '/metas',
    GET_BY_ID: (id: string) => `/metas/${id}`,
    UPDATE: (id: string) => `/metas/${id}`,
    DELETE: (id: string) => `/metas/${id}`,
    BY_PESSOA: (id_pessoa: string) => `/metas/pessoa/${id_pessoa}`,
  },

  // Planos
  PLANOS: {
    LIST: '/planos',
    CREATE: '/planos',
    GET_BY_ID: (id: string) => `/planos/${id}`,
    UPDATE: (id: string) => `/planos/${id}`,
    DELETE: (id: string) => `/planos/${id}`,
    ACTIVATE: (id: string) => `/planos/${id}/activate`,
    DEACTIVATE: (id: string) => `/planos/${id}/deactivate`,
  },

  // Sessões
  SESSOES: {
    LIST: '/sessoes',
    CREATE: '/sessoes',
    GET_BY_ID: (id: string) => `/sessoes/${id}`,
    DELETE: (id: string) => `/sessoes/${id}`,
    CURRENT: '/sessoes/current',
    TERMINATE_ALL: '/sessoes/terminate-all',
  },

  // Assinaturas
  ASSINATURAS: {
    LIST: '/assinaturas',
    CREATE: '/assinaturas',
    GET_BY_ID: (id: string) => `/assinaturas/${id}`,
    UPDATE: (id: string) => `/assinaturas/${id}`,
    DELETE: (id: string) => `/assinaturas/${id}`,
    CANCEL: (id: string) => `/assinaturas/${id}/cancel`,
    RENEW: (id: string) => `/assinaturas/${id}/renew`,
  },

  // Tipos de Pagamento
  TIPOS_PAGAMENTO: {
    LIST: '/tipos-pagamento',
    CREATE: '/tipos-pagamento',
    GET_BY_ID: (id: string) => `/tipos-pagamento/${id}`,
    UPDATE: (id: string) => `/tipos-pagamento/${id}`,
    DELETE: (id: string) => `/tipos-pagamento/${id}`,
  },

  // Solicitações de Pagamento
  SOLICITACOES_PAGAMENTO: {
    LIST: '/solicitacoes-pagamento',
    CREATE: '/solicitacoes-pagamento',
    GET_BY_ID: (id: string) => `/solicitacoes-pagamento/${id}`,
    UPDATE: (id: string) => `/solicitacoes-pagamento/${id}`,
    DELETE: (id: string) => `/solicitacoes-pagamento/${id}`,
    APPROVE: (id: string) => `/solicitacoes-pagamento/${id}/approve`,
    REJECT: (id: string) => `/solicitacoes-pagamento/${id}/reject`,
    PROCESS: (id: string) => `/solicitacoes-pagamento/${id}/process`,
  },
} as const;

// Helper para construir URLs com query parameters
export const buildUrl = (
  endpoint: string,
  params?: Record<string, any>
): string => {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  });

  return `${endpoint}?${searchParams.toString()}`;
};
