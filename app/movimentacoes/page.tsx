'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { MovimentacoesFilterBar } from '@/components/movimentacoes/MovimentacoesFilterBar';
import { MovimentacoesGrid } from '@/components/movimentacoes/MovimentacoesGrid';

export type PeriodKey =
  | 'historico_completo'
  | 'mes_atual'
  | 'ultimo_mes'
  | 'ultimo_ano'
  | 'custom';

export default function MovimentacoesPage() {
  const [fromDate, setFromDate] = useState<string | undefined>(undefined);
  const [toDate, setToDate] = useState<string | undefined>(undefined);
  const [selectedPeriod, setSelectedPeriod] =
    useState<PeriodKey>('historico_completo');

  const handlePeriodChange = (period: PeriodKey) => {
    const now = new Date();
    let newFrom: string | undefined;
    let newTo: string | undefined;

    switch (period) {
      case 'historico_completo':
        newFrom = undefined;
        newTo = undefined;
        break;

      case 'mes_atual': {
        const from = new Date(now.getFullYear(), now.getMonth(), 1);
        newFrom = from.toISOString().slice(0, 10);
        newTo = now.toISOString().slice(0, 10);
        break;
      }

      case 'ultimo_mes': {
        const firstPrevMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1,
        );
        const lastPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        newFrom = firstPrevMonth.toISOString().slice(0, 10);
        newTo = lastPrevMonth.toISOString().slice(0, 10);
        break;
      }

      case 'ultimo_ano': {
        const from = new Date(now);
        from.setFullYear(from.getFullYear() - 1);

        newFrom = from.toISOString().slice(0, 10);
        newTo = now.toISOString().slice(0, 10);
        break;
      }

      case 'custom':
        // custom é controlado diretamente pelo Grid via onCustomDateChange
        break;
    }

    setFromDate(newFrom);
    setToDate(newTo);
    setSelectedPeriod(period);
  };

  const handleCustomDateChange = (from?: string, to?: string) => {
    setFromDate(from);
    setToDate(to);
    setSelectedPeriod('custom');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 pt-4">
        <MovimentacoesFilterBar
          selectedPeriod={selectedPeriod}
          onChangePeriod={handlePeriodChange}
        />
        <MovimentacoesGrid
          fromDate={fromDate}
          toDate={toDate}
          onCustomDateChange={handleCustomDateChange}
        />
      </div>
    </ProtectedRoute>
  );
}
