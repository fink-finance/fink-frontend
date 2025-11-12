/**
 * Types base e genéricos para a API
 * Tipos compartilhados entre todas as entidades
 */

// Response wrapper padrão da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}

// Response para listas paginadas
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  links?: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
}

// Error response padrão
export interface ApiErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: Record<string, any>;
  };
  timestamp: string;
}

// Base entity (entidade com ID e timestamps)
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Filtros base para listagem
export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Status genéricos
export type StatusType = 'ATIVO' | 'INATIVO' | 'PENDENTE' | 'CANCELADO';

// Tipos para autenticação
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'ADMIN' | 'USER';
  status: StatusType;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}
