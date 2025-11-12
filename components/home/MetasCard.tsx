'use client';

import { useMetasByPessoa } from '@/lib/hooks/metas';
import { DashboardCard } from '../shared/DashboardCard';

export const MetasCard = () => {
  const { data: metas, isLoading, isError } = useMetasByPessoa(1);

  return (
    <DashboardCard title='Metas' height='lg' colSpan={4}>
      {isLoading && <p>Carregando metas...</p>}
      {isError && <p>Erro ao carregar metas.</p>}

      {metas && (
        <>
          <p className='text-sm text-zinc-600 mb-4'>
            O quão perto você está de realizar seus sonhos
          </p>
          <div className='mb-4'>
            <div className='flex justify-between items-center'>
              <span className='text-2xl font-bold'>R$ 1470,50</span>
              <span className='text-sm text-zinc-600'>de R$ 4.000,00</span>
            </div>
            <p className='text-sm text-blue-600'>
              Você já economizou R$ 1470,50
            </p>
          </div>

          <div className='space-y-3'>
            {metas.map((meta) => {
              const progresso =
                (Number(meta.valor_atual) / Number(meta.valor_alvo)) * 100;
              return (
                <div key={meta.titulo} className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm font-medium'>{meta.titulo}</span>
                    <span className='text-sm text-zinc-600'>
                      {progresso.toFixed(0)}%
                    </span>
                  </div>
                  <div className='w-full bg-zinc-200 rounded-full h-2'>
                    <div
                      className='bg-blue-500 h-2 rounded-full transition-all'
                      style={{ width: `${Math.min(progresso, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </DashboardCard>
  );
};
