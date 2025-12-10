'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import type { Movimentacao } from '@/lib/api/types/movimentacoes';

interface MovimentacaoDetailModalProps {
  movimentacao: Movimentacao | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

const MONTHS_PT_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return '';

  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;

  const day = d.getDate().toString().padStart(2, '0');
  const month = MONTHS_PT_SHORT[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
}

export function MovimentacaoDetailModal({
  movimentacao,
  open,
  onOpenChange,
}: MovimentacaoDetailModalProps) {
  if (!movimentacao) {
    return null;
  }

  const isEntrada = movimentacao.tipo === 'entrada';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Detalhamento da movimentação
          </DialogTitle>
          <DialogDescription className="sr-only">
            Informações completas da movimentação selecionada.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-6">
          {/* Tipo + valor + descrição */}
          <div className="space-y-3">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                isEntrada
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isEntrada ? 'Entrada' : 'Saída'}
            </span>

            <div className="text-3xl font-semibold text-slate-900">
              {formatCurrency(movimentacao.valor)}
            </div>

            <div className="text-base font-medium text-slate-900">
              {movimentacao.descricao}
            </div>
          </div>

          {/* Grade de informações */}
          <div className="grid grid-cols-1 gap-6 text-sm text-slate-800 md:grid-cols-2">
            {/* Coluna esquerda */}
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Data
                </div>
                <div className="mt-1">{formatDate(movimentacao.data)}</div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Conta vinculada
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#8A05BE]">
                    <Image
                      src="/images/banks/nubank-logo.png"
                      alt="Nubank"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-900">
                    Nubank
                  </span>
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Categoria
                </div>
                <div className="mt-1">{movimentacao.categoria}</div>
              </div>
            </div>

            {/* Coluna direita */}
            <div className="space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Forma de pagamento
                </div>
                <div className="mt-1">
                  {movimentacao.origemPagamento || 'Conta'}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Recorrência
                </div>
                <div className="mt-1">{movimentacao.recorrencia}</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
