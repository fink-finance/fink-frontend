/**
 * Cliente HTTP usando fetch nativo
 * Abordagem funcional com interceptors automáticos
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface FetchConfig extends RequestInit {
  timeout?: number;
}

// Interceptor para adicionar headers automaticamente
type RequestInterceptor = (
  config: RequestInit
) => RequestInit | Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

// Adicionar interceptors
export const addRequestInterceptor = (interceptor: RequestInterceptor) => {
  requestInterceptors.push(interceptor);
};

export const addResponseInterceptor = (interceptor: ResponseInterceptor) => {
  responseInterceptors.push(interceptor);
};

// ✅ Interceptor de autenticação
const authInterceptor: RequestInterceptor = (config) => {
  const token = getAuthToken();
  if (token) {
    const headers = new Headers(config.headers);
    headers.set('Authorization', `Bearer ${token}`);
    return { ...config, headers };
  }
  return config;
};

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

const clearAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

// ✅ Adicionar interceptor de auth automaticamente
addRequestInterceptor(authInterceptor);

// Função para tratar erros de resposta
const handleErrorResponse = async (response: Response): Promise<never> => {
  let errorMessage = `HTTP Error: ${response.status}`;
  let errorDetails = null;

  try {
    const errorData = await response.json();
    errorDetails = errorData;
    errorMessage = errorData.message || errorData.detail || errorMessage;

    // ✅ Log detalhado do erro para debug
    console.error('🔴 API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      data: errorData,
    });
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  // ✅ Tratamento de erro 401 (não autorizado)
  if (response.status === 401) {
    clearAuthToken();
    // Redirecionar para login se necessário
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    throw new Error('Token expirado. Faça login novamente.');
  }

  const error = new Error(errorMessage) as any;
  error.status = response.status;
  error.details = errorDetails;
  throw error;
};

// Função base para requisições HTTP
const fetchApi = async <T>(
  endpoint: string,
  config: FetchConfig = {}
): Promise<T> => {
  const { timeout = 10000, ...fetchConfig } = config;
  const url = `${API_BASE_URL}${endpoint}`;

  // Headers padrão
  let headers = new Headers({
    'Content-Type': 'application/json',
    ...fetchConfig.headers,
  });

  // Aplicar interceptors de request
  let requestConfig: RequestInit = { ...fetchConfig, headers };
  for (const interceptor of requestInterceptors) {
    requestConfig = await interceptor(requestConfig);
  }

  // Controller para timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    let response = await fetch(url, {
      ...requestConfig,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Aplicar interceptors de response
    for (const interceptor of responseInterceptors) {
      response = await interceptor(response);
    }

    if (!response.ok) {
      await handleErrorResponse(response);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    throw error;
  }
};

// Métodos HTTP exportados
export const api = {
  get: <T>(endpoint: string, config?: FetchConfig): Promise<T> =>
    fetchApi<T>(endpoint, { ...config, method: 'GET' }),

  post: <T>(endpoint: string, data?: any, config?: FetchConfig): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: any, config?: FetchConfig): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  patch: <T>(endpoint: string, data?: any, config?: FetchConfig): Promise<T> =>
    fetchApi<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, config?: FetchConfig): Promise<T> =>
    fetchApi<T>(endpoint, { ...config, method: 'DELETE' }),
};
