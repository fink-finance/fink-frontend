// Tipagem mínima das transações que recebemos da Pluggy
export type PluggyTransaction = {
  id: string;
  description?: string;
  descriptionRaw?: string;
  amount?: number;         // >0 entrada, <0 saída
  date?: string;           // 'YYYY-MM-DD'
  category?: string;
  type?: string;           // INCOME, EXPENSE...
  paymentMethod?: string;  // se vier
  provider?: string;       // se vier
  [key: string]: any;
};

// lib/api/types/pluggy.ts

export interface PluggyAccount {
  id: string;
  name?: string;
  type?: string;
  balance?: number;
  currencyCode?: string;
  institution?: {
    name?: string;
    [key: string]: any;
  };
  [key: string]: any;
}
