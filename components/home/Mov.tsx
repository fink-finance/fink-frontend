'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { DashboardCard } from '../shared/DashboardCard';
import { useMovimentacoes } from '@/lib/hooks/movimentacoes';
import type { Movimentacao } from '@/lib/api/types/movimentacoes';

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

const LIMITE_MENSAL = 1000;

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export const MovCard = () => {
  const ACCOUNT_ID = '619196f3-2474-44ce-ae30-0f5481bb66b7';

  const {
    data: movimentacoes = [],
    isLoading,
    isError,
  } = useMovimentacoes({
    accountId: ACCOUNT_ID,
  });

  const totalEntradas = movimentacoes
    .filter((m) => m.tipo === 'entrada')
    .reduce((acc, m) => acc + m.valor, 0);

  const totalSavidas = movimentacoes
    .filter((m) => m.tipo === 'saida')
    .reduce((acc, m) => acc + m.valor, 0);

  const monthlyTotals = useMemo(() => {
    const base = MONTHS_PT_SHORT.map(() => ({
      gastos: 0,
      ganhos: 0,
    }));

    movimentacoes.forEach((m) => {
      const d = new Date(m.data);
      if (Number.isNaN(d.getTime())) return;

      const monthIndex = d.getMonth();
      if (m.tipo === 'entrada') {
        base[monthIndex].ganhos += m.valor;
      } else if (m.tipo === 'saida') {
        base[monthIndex].gastos += m.valor;
      }
    });

    return base;
  }, [movimentacoes]);

  // ✅ agora mostra 5 movimentações
  const ultimasMovimentacoes = movimentacoes.slice(0, 5);

  if (isLoading) {
    return (
      <DashboardCard
        title="Movimentações"
        subtitle="Gerencie todas as suas transações"
        className="h-full"
        hasArrow
        arrowHref="/movimentacoes"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-32 rounded bg-slate-200" />
          <div className="h-24 rounded-2xl bg-slate-100" />
          <div className="space-y-2">
            <div className="h-10 rounded bg-slate-100" />
            <div className="h-10 rounded bg-slate-100" />
          </div>
        </div>
      </DashboardCard>
    );
  }

  if (isError) {
    return (
      <DashboardCard
        title="Movimentações"
        subtitle="Gerencie todas as suas transações"
        className="h-full"
        hasArrow
        arrowHref="/movimentacoes"
      >
        <p className="text-sm text-red-500">
          Erro ao carregar movimentações. Tente novamente mais tarde.
        </p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Movimentações"
      subtitle="Gerencie todas as suas transações"
      className="h-full"
      hasArrow
      arrowHref="/movimentacoes"
    >
      {/* RESUMO GASTOS / GANHOS */}
      <div className="grid grid-cols-2 border-b border-slate-200 pb-4">
        <div className="pr-4">
          <span className="text-xs font-medium text-slate-600">Gastos</span>
          <div className="mt-1 text-2xl font-semibold text-rose-600">
            {formatCurrency(totalSavidas)}
          </div>
        </div>

        <div className="border-l border-slate-200 pl-4">
          <span className="text-xs font-medium text-slate-600">Ganhos</span>
          <div className="mt-1 text-2xl font-semibold text-emerald-600">
            {formatCurrency(totalEntradas)}
          </div>
        </div>
      </div>

      {/* GRÁFICO MENSAL COM EIXO CENTRAL ALINHADO (BARRAS AZUIS) */}
      <div className="mt-4 rounded-2xl bg-[#f7f8ff] px-4 py-6">
        <div className="flex h-60 items-stretch justify-between gap-3">
          {MONTHS_PT_SHORT.map((month, index) => {
            const { gastos, ganhos } = monthlyTotals[index];

            const ganhoPct = Math.min(ganhos, LIMITE_MENSAL) / LIMITE_MENSAL;
            const gastoPct = Math.min(gastos, LIMITE_MENSAL) / LIMITE_MENSAL;

            const ganhoHeight = ganhoPct > 0 ? ganhoPct * 100 : 0;
            const gastoHeight = gastoPct > 0 ? gastoPct * 100 : 0;

            return (
              <div
                key={month}
                className="group relative flex flex-1 flex-col items-center"
              >
                {(ganhos > 0 || gastos > 0) && (
                  <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-2 rounded-md bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                    {gastos > 0 && (
                      <div>Gastos: {formatCurrency(gastos)}</div>
                    )}
                    {ganhos > 0 && (
                      <div>Ganhos: {formatCurrency(ganhos)}</div>
                    )}
                  </div>
                )}

                {/* metade de cima: ganhos (azul claro) */}
                <div className="flex flex-1 items-end justify-center">
                  <div className="relative h-full w-7">
                    <div className="absolute inset-0 rounded-t-lg bg-[#dde2ff]" />
                    {ganhoHeight > 0 && (
                      <div
                        className="absolute bottom-0 w-7 rounded-t-lg bg-[#60A5FA]"
                        style={{ height: `${ganhoHeight}%` }}
                      />
                    )}
                  </div>
                </div>

                {/* linha do eixo 0 */}
                <div className="h-px w-full bg-slate-400" />

                {/* metade de baixo: gastos (azul escuro) */}
                <div className="flex flex-1 items-start justify-center">
                  <div className="relative h-full w-7">
                    <div className="absolute inset-0 rounded-b-lg bg-[#dde2ff]" />
                    {gastoHeight > 0 && (
                      <div
                        className="absolute top-0 w-7 rounded-b-lg bg-[#1D4ED8]"
                        style={{ height: `${gastoHeight}%` }}
                      />
                    )}
                  </div>
                </div>

                <span className="mt-2 text-xs font-medium text-slate-900">
                  {month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TABELA DE MOVIMENTAÇÕES (layout original, só que com 5 itens) */}
      <div className="mt-9 overflow-hidden rounded-2xl bg-[#eef0ff]">
        <div className="grid grid-cols-[70px_minmax(0,1fr)_110px] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
          <span>Data</span>
          <span>Descrição</span>
          <span className="text-right">Valor</span>
        </div>

        <div className="divide-y divide-slate-100 bg-white">
          {ultimasMovimentacoes.map((mov: Movimentacao) => {
            const date = new Date(mov.data);
            const day = String(date.getDate()).padStart(2, '0');
            const monthLabel = MONTHS_PT_SHORT[date.getMonth()] ?? '';

            const isEntrada = mov.tipo === 'entrada';

            return (
              <div
                key={mov.id}
                className="grid grid-cols-[70px_minmax(0,1fr)_110px] items-center px-4 py-3 text-sm"
              >
                {/* Data */}
                <div className="text-xs font-medium text-slate-700">
                  <div>{`${day} ${monthLabel}`}</div>
                </div>

                {/* Descrição + Nubank */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#8A05BE]">
                    <Image
                      src="/images/banks/nubank-logo.png"
                      alt="Nubank"
                      width={24}
                      height={24}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="max-w-[190px] truncate text-sm font-medium text-slate-900">
                      {mov.descricao}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {mov.origemPagamento}
                    </div>
                  </div>
                </div>

                {/* Valor (verde / vermelho) */}
                <div className="text-right">
                  <div
                    className={
                      isEntrada
                        ? 'text-sm font-semibold text-emerald-600'
                        : 'text-sm font-semibold text-rose-600'
                    }
                  >
                    {formatCurrency(mov.valor)}
                  </div>
                  <div className="text-[11px] text-slate-500">Conta</div>
                </div>
              </div>
            );
          })}

          {ultimasMovimentacoes.length === 0 && (
            <div className="px-4 py-6 text-center text-xs text-slate-500">
              Nenhuma movimentação encontrada.
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
};
