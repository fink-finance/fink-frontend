'use client';

import { useMetas } from '@/lib/hooks/metas';
import { DashboardCard } from '../shared/DashboardCard';
import { toBRCurrency } from '@/lib/utils/to-br-currency';
import { SpinLoader } from '../shared/SpinLoader';

export const MetasCard = () => {
  const { data: metas, isLoading, isError } = useMetas();

  return (
    <DashboardCard
      title='Metas'
      subtitle='O quão perto você está de realizar seus sonhos'
      className='h-full'
    >
      {isLoading && <SpinLoader />}
      {isError && <p>Erro ao carregar metas.</p>}

      {metas && (
        <>
          {metas.map((meta) => {
            const progress =
              (Number(meta.valor_atual) / Number(meta.valor_alvo)) * 100;
            return (
              <div key={meta.titulo} className='space-y-2 pt-5'>
                <div className='flex justify-between pb-2'>
                  <span className='font-bold text-3xl'>
                    {toBRCurrency(Number(meta.valor_atual))}
                  </span>
                  <span className='text-md font-normal'>{meta.titulo}</span>
                </div>
                <div className='w-full bg-emptyCardBg rounded-full h-3'>
                  <div
                    className='bg-blue-600 h-full rounded-full transition-all'
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className='flex justify-between'>
                  <span className='text-base text-blue-600 font-medium'>
                    Você já economizou{' '}
                    <span className='font-bold'>
                      {toBRCurrency(Number(meta.valor_atual))}
                    </span>
                  </span>
                  <span className='text-gray-500'>
                    de {toBRCurrency(Number(meta.valor_alvo))}
                  </span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </DashboardCard>
  );
};
