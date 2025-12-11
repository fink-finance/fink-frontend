'use client';

import { useMemo } from 'react';
import { DashboardCard } from '../shared/DashboardCard';
import { useMovimentacoes } from '@/lib/hooks/movimentacoes';
import type { Movimentacao } from '@/lib/api/types/movimentacoes';

const ACCOUNT_ID = '619196f3-2474-44ce-ae30-0f5481bb66b7';
const LIMITE_CATEGORIA = 1000; // 100% = R$ 1.000

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export const GastosCard = () => {
  const {
    data: movimentacoes = [],
    isLoading,
    isError,
  } = useMovimentacoes({
    accountId: ACCOUNT_ID,
  });

  const categoriasOrdenadas = useMemo(() => {
    const totals = new Map<string, number>();

    movimentacoes.forEach((m: Movimentacao) => {
      const cat = m.categoria || 'Outros';
      const signedValue = m.tipo === 'entrada' ? m.valor : -m.valor;
      totals.set(cat, (totals.get(cat) ?? 0) + signedValue);
    });

    const entries = Array.from(totals.entries());

    // Ordena pelo impacto (valor absoluto)
    entries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

    // Top 5 categorias
    return entries.slice(0, 5);
  }, [movimentacoes]);

  if (isLoading) {
    return (
      <DashboardCard
        title="Meus gastos e ganhos"
        subtitle="Para onde vai o seu dinheiro"
        className="h-full"
        hasArrow   // seta aparece, não redireciona
      >
        <div className="mt-4 space-y-4">
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
          <div className="h-10 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-10 rounded-xl bg-slate-100 animate-pulse" />
          <div className="h-10 rounded-xl bg-slate-100 animate-pulse" />
        </div>
      </DashboardCard>
    );
  }

  if (isError) {
    return (
      <DashboardCard
        title="Meus gastos e ganhos"
        subtitle="Para onde vai o seu dinheiro"
        className="h-full"
        hasArrow   // seta aparece, não redireciona
      >
        <p className="text-sm text-red-500">
          Erro ao carregar dados. Tente novamente mais tarde.
        </p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard
      title="Meus gastos e ganhos"
      subtitle="Para onde vai o seu dinheiro"
      className="h-full"
      hasArrow   // seta aparece, não redireciona
    >
      <div className="mt-5 space-y-4">
        {categoriasOrdenadas.map(([categoria, total]) => {
          const isPositivo = total >= 0;

          const magnitude = Math.min(Math.abs(total), LIMITE_CATEGORIA);
          const perc = magnitude / LIMITE_CATEGORIA; // 0–1
          const barPercent = Math.max(perc * 100, 8); // mínimo visível

          return (
            <div
              key={categoria}
              className="grid grid-cols-[minmax(0,1.5fr)_minmax(0,3fr)_100px] items-center gap-3"
            >
              {/* Nome da categoria */}
              <div className="text-base font-semibold text-slate-900">
                {categoria}
              </div>

              {/* Barra proporcional (cor depende do sinal) */}
              <div className="flex items-center">
                <div
                  className={
                    'h-11 rounded-xl border-2 ' +
                    (isPositivo
                      ? 'border-emerald-300 bg-[#e6fff5]'
                      : 'border-rose-300 bg-[#ffeef1]')
                  }
                  style={{ width: `${barPercent}%` }}
                />
              </div>

              {/* Valor à direita (verde / vermelho) */}
              <div
                className={`text-base font-semibold text-right ${
                  isPositivo ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {formatCurrency(total)}
              </div>
            </div>
          );
        })}

        {categoriasOrdenadas.length === 0 && (
          <p className="text-xs text-slate-500">
            Ainda não há movimentações suficientes para montar o gráfico.
          </p>
        )}
      </div>
    </DashboardCard>
  );
};
