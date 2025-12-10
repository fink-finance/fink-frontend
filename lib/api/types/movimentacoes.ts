export type TipoMovimentacao = 'entrada' | 'saida';

export type Movimentacao = {
  id: string;              // id da transação (Pluggy)
  data: string;            // 'YYYY-MM-DD' (depois formatamos)
  descricao: string;
  categoria: string;
  recorrencia: string;     // por enquanto "Variável"
  valor: number;           // sempre valor absoluto
  tipo: TipoMovimentacao;  // 'entrada' ou 'saida'
  origemPagamento: string; // ex: 'Cartão de crédito', 'Pix'
  bancoSigla: string;      // ex: 'nu', 'it' (por enquanto mock)
  bancoCor: string;        // ex: '#8A05BE' (por enquanto default)
};
