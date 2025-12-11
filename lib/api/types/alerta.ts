/**
 * Tipos relacionados a Alertas
 */

export interface Alerta {
  id_alerta: number;
  fk_pessoa_id_pessoa: string;
  data: string; // ISO 8601 format
  conteudo: string;
  lida: boolean;
}

export interface CreateAlertaData {
  conteudo: string;
  data?: string;
  lida?: boolean;
}

export interface UpdateAlertaData {
  conteudo?: string;
  data?: string;
  lida?: boolean;
}

export interface MarkAlertaAsReadData {
  lida: boolean;
}

export interface AlertasFilters {
  lida?: boolean;
  data_inicio?: string;
  data_fim?: string;
}
