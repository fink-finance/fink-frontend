'use client';

import { FilterBarLayout } from '../shared/FilterBarLayout';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import type { PeriodKey } from '@/app/movimentacoes/page';

interface MovimentacoesFilterBarProps {
  selectedPeriod: PeriodKey;
  onChangePeriod: (period: PeriodKey) => void;
}

export function MovimentacoesFilterBar({
  selectedPeriod,
  onChangePeriod,
}: MovimentacoesFilterBarProps) {
  const chipBase = 'h-10 px-5 text-sm font-medium rounded-full border';

  const chipVariant = (key: PeriodKey) =>
    selectedPeriod === key
      ? 'border-blue-500 bg-blue-50 text-blue-600'
      : 'border-slate-200 bg-white text-slate-700';

  return (
    <FilterBarLayout title="Suas movimentações">
      {/* Linha única: chips + botão */}
      <div className="mt-3 flex w-full items-end justify-between gap-4">
        {/* Chips de período – maiores e alinhados pela base */}
        <div className="flex flex-wrap items-end gap-3">
          <Button
            variant="outline"
            radius="full"
            className={`${chipBase} ${chipVariant('historico_completo')}`}
            onClick={() => onChangePeriod('historico_completo')}
          >
            Histórico completo
          </Button>

          <Button
            variant="outline"
            radius="full"
            className={`${chipBase} ${chipVariant('mes_atual')}`}
            onClick={() => onChangePeriod('mes_atual')}
          >
            Mês atual
          </Button>

          <Button
            variant="outline"
            radius="full"
            className={`${chipBase} ${chipVariant('ultimo_mes')}`}
            onClick={() => onChangePeriod('ultimo_mes')}
          >
            Último mês
          </Button>

          <Button
            variant="outline"
            radius="full"
            className={`${chipBase} ${chipVariant('ultimo_ano')}`}
            onClick={() => onChangePeriod('ultimo_ano')}
          >
            Este ano
          </Button>
        </div>

        {/* Botão principal à direita */}
        <div className="flex items-end">
          <Button
            size="lg"
            className="whitespace-nowrap rounded-full px-6 text-sm font-semibold"
          >
            <CirclePlus className="mr-2 h-4 w-4" />
            Adicionar movimentação
          </Button>
        </div>
      </div>
    </FilterBarLayout>
  );
}
